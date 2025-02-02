import requests

API_URL = "http://127.0.0.1:8000/fixsyntax"

data = {
    "codeSnippet": "def hello_world()\n    print('World')",
    "maxLen": 100
}

response = requests.post(API_URL, json=data)
print(response.json())