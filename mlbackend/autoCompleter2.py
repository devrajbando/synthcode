import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import re
from fastapi.middleware.cors import CORSMiddleware

def remove_prompt(output):
    corrected_code = re.sub(r'.*Fix the error and return only the corrected code.\s*', '', output, flags=re.DOTALL)
    return corrected_code.strip()

def remove_prompt_docstring(output):
    result = re.sub(r'.*Docstring:\s*', '', output, flags=re.DOTALL)
    correctedCode = re.sub(r'```.*', '', result, flags=re.DOTALL)
    return correctedCode.strip()

def remove_prompt_snippet(output):
    output = re.sub(r'.*Suggested Code Snippet:\s*', '', output, flags=re.DOTALL)

    output = re.sub(r'```[\w+]*\n', '', output, flags=re.DOTALL)
    output = re.sub(r'```', '', output)

    return output.strip()

def extract_code_features(code):
    features = {"variables": set(), "functions": set(), "structures": set()}

    var_matches = re.findall(r'(\w+)\s*=\s*[^=\n]+', code)
    features["variables"].update(var_matches)

    func_matches = re.findall(r'def\s+(\w+)\s*\(', code)
    features["functions"].update(func_matches)

    if re.search(r'for\s+\w+\s+in\s+', code):
        features["structures"].add("for loop")
    if re.search(r'while\s+', code):
        features["structures"].add("while loop")
    if re.search(r'if\s+', code):
        features["structures"].add("if statement")

    return features


MODEL_NAME = 'Qwen/Qwen2.5-Coder-0.5B-Instruct'
device = "cuda" if torch.cuda.is_available() else "cpu"

print("Loading model")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, torch_dtype=torch.float32).to(device)
print("Model loaded successfully")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "AI Code Assistant API is running"}

class autoCompleteRequest(BaseModel):
    prompt: str
    maxLen: int = 30

@app.post("/autocomplete")

async def autocomplete(request: autoCompleteRequest):
    try:   
        inputs = tokenizer(request.prompt, return_tensors="pt", padding=True, truncation=True, max_length=request.maxLen)
        input_ids = inputs.input_ids.to(device)
        attention_mask = inputs.attention_mask.to(device)

        with torch.no_grad():
            output = model.generate(
                input_ids=input_ids,
                attention_mask=attention_mask,
                max_length=request.maxLen,
                temperature = None,
                top_k=None,
                top_p=None,
                pad_token_id=tokenizer.eos_token_id,
                do_sample=False,
                no_repeat_ngram_size=2,
            )
            
        generatedCode = tokenizer.decode(output[0], skip_special_tokens=True)
        return {"completion": generatedCode[len(request.prompt):].strip()}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
class fixSyntaxRequest(BaseModel):
    codeSnippet : str
    # errorMessage : str
    maxLen : int = 200

@app.post("/fixsyntax")

async def fixsyntax(request: fixSyntaxRequest):
    try:
        prompt = f"""
        You are an AI code assistant. Given the following code snippet, identify the mistake and provide a corrected version.

        Code:
        {request.codeSnippet}

        

        Fix the error and return only the corrected code.
        """
        inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True, max_length=request.maxLen)
        input_ids = inputs.input_ids.to(device)
        attention_mask = inputs.attention_mask.to(device)

        with torch.no_grad():
            output = model.generate(
                input_ids=input_ids,
                attention_mask=attention_mask,
                max_length=request.maxLen,
                temperature = None,
                top_k=None,
                top_p=None,
                pad_token_id=tokenizer.eos_token_id,
                do_sample=False,
                no_repeat_ngram_size=2,
            )

        response = tokenizer.decode(output[0], skip_special_tokens=True)

        response = remove_prompt(response)
        return {"fixedCode": response}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class docStringRequest(BaseModel):
    codeSnippet: str
    maxLen: int = 200

@app.post("/generatedocstring")

async def generateDocstring(request: docStringRequest):
    try:
        if not request.codeSnippet:
            raise HTTPException(status_code=400, detail="Code snippet is required")

        prompt = f'''
        Generate a clear and concise documentation for the following code:

        Code:
        {request.codeSnippet}

        Docstring:
        '''
        
        inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True, max_length=request.maxLen)
        input_ids = inputs.input_ids.to(device)
        attention_mask = inputs.attention_mask.to(device)

        with torch.no_grad():
            output = model.generate(
                input_ids=input_ids,
                attention_mask=attention_mask,
                max_length=4096,
                temperature=None,
                top_k=None,
                top_p=None,
                pad_token_id=tokenizer.eos_token_id,
                do_sample=False,
                no_repeat_ngram_size=2,
            )

        generatedText = tokenizer.decode(output[0], skip_special_tokens=True)

        generatedText = remove_prompt_docstring(generatedText)
        # docstring = docs.group(1).strip() if docstringMatch else generatedText
        return {"docstring": generatedText}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
class snippetRequest(BaseModel):
    codeContext: str
    maxLen: int = 150

@app.post("/generateSnippet")

async def suggest_snippet(request: snippetRequest):
    try:
        if not request.codeContext:
            raise HTTPException(status_code=400, detail="Code context is required")

        # Extract relevant code features
        features = extract_code_features(request.codeContext)
        variable_names = ", ".join(features["variables"])
        function_names = ", ".join(features["functions"])
        detected_structures = ", ".join(features["structures"])

        # Modify the prompt based on detected elements
        prompt = f'''
        You are a coding assistant. Based on the following code context, generate a relevant and useful code snippet.
        Take into account the detected variables, functions, and existing structures.

        Code Context:
        {request.codeContext}

        Detected Features:
        Variables: {variable_names if variable_names else "None"}
        Functions: {function_names if function_names else "None"}
        Existing Structures: {detected_structures if detected_structures else "None"}

        Suggested Code Snippet:
        '''

        inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True, max_length=request.maxLen)
        input_ids = inputs.input_ids.to(device)
        attention_mask = inputs.attention_mask.to(device)

        with torch.no_grad():
            output = model.generate(
                input_ids=input_ids,
                attention_mask=attention_mask,
                max_length=request.maxLen,
                temperature=None,
                top_k=None,
                top_p=None,
                pad_token_id=tokenizer.eos_token_id,
                do_sample=False,
                no_repeat_ngram_size=2,
            )

        generated_snippet = tokenizer.decode(output[0], skip_special_tokens=True)
        cleaned_snippet = remove_prompt_snippet(generated_snippet)  # Apply cleaning

        return {"suggestedSnippet": cleaned_snippet}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))