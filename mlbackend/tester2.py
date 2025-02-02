import requests

API_URL = "http://127.0.0.1:8000/fixsyntax"

data = {
    "codeSnippet": '''function greet(name) {
        console.log("Hello, " + name + "!");
}

greet("Alex");''',
    "maxLen": 200
}

response = requests.post(API_URL, json=data)
print(response.json())