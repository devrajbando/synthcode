import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import re
from flask_cors import CORS
from fastapi.middleware.cors import CORSMiddleware
from flask import Flask, request, jsonify,current_app

application = Flask(__name__)

CORS(application)

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
    errorMessage : str
    maxLen : int = 200

@app.post("/fixsyntax")

async def fixsyntax(request: fixSyntaxRequest):
    try:
        prompt = f"""
        You are an AI code assistant. Given the following code snippet and error message, identify the mistake and provide a corrected version.

        Code:
        {request.codeSnippet}

        Error:
        {request.errorMessage}

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
                temperature = None,
                top_k=None,
                top_p=None,
                pad_token_id=tokenizer.eos_token_id,
                do_sample=False,
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

        prompt = f'''
        You are a coding assistant. Given the following code context, suggest a useful code snippet:
        
        Code Context:
        {request.codeContext}
        
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
    


if __name__ == '__main__':
    application.run(host='127.0.0.1', port=5020, debug=True)