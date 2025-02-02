import requests

API_URL = "http://127.0.0.1:8000/fixsyntax"

data = {
<<<<<<< HEAD
    "codeSnippet": "def hello_world()\n    print('World')",
    "maxLen": 100
=======
    "codeSnippet": '''function greet(name) {
        console.log("Hello, " + name + "!");
}

greet("Alex");''',
    "maxLen":  200
>>>>>>> e62fff1dffc0238e1e5185e19230f701e1ce2c0c
}

response = requests.post(API_URL, json=data)
print(response.json())