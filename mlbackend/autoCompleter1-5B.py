from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

MODEL_NAME = 'Qwen/Qwen2.5-Coder-1.5B-Instruct'
device = "cuda" if torch.cuda.is_available() else "cpu"

print("Loading model")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, torch_dtype=torch.float32).to(device)
print("Model loaded successfully")

app = FastAPI()

class codeRequest(BaseModel):
    prompt: str
    maxLen: int = 30

@app.post("/autocomplete")

async def autocomplete(request: codeRequest):
    try:   
        inputs = tokenizer(request.prompt, return_tensors="pt", padding=True, truncation=True, max_length=request.maxLen)
        input_ids = inputs.input_ids.to(device)
        attention_mask = inputs.attention_mask.to(device)

        with torch.no_grad():
            output = model.generate(
                input_ids=input_ids,
                attention_mask=attention_mask,
                max_length=request.maxLen,
                # temperature=0.5,
                top_k=50,
                # top_p=0.8,
                pad_token_id=tokenizer.eos_token_id,
                do_sample=False,
                no_repeat_ngram_size=2,
            )
            
        generatedCode = tokenizer.decode(output[0], skip_special_tokens=True)
        return {"completion": generatedCode[len(request.prompt):].strip()}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))