import requests

API_URL = "http://127.0.0.1:8000/generatedocstring"

data = {
    "codeSnippet": "def subtract(a,b):\n return a-b"
}

response = requests.post(API_URL, json=data)
# print(response.json())

if response.status_code == 200:
    print(response.json())  # This should print the docstring or generated text
else:
    print(f"Error: {response.status_code} - {response.text}")