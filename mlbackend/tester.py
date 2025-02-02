import requests

prompt = input("Enter prompt: ")

url = "http://127.0.0.1:8000/autocomplete"
data = {"prompt": prompt, "maxLen": 30}

response = requests.post(url, json=data)
print(response.json())