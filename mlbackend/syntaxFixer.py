import re

text = ''''docstring': 'Add two numbers and return the result.\n\n        Example usage:\n        \n        >>> add(3, 5)\n        8\n```\n\nThis doc string should clearly describe the purpose of the function, its parameters, return value, and any additional information that might be helpful for users to understand how to use the code. The example usage section should provide a simple way for someone to see how the `add` function works with specific inputs.'
'''

pattern = r'```.*'
result = re.sub(pattern, '', text, flags=re.DOTALL)

print(result)