import re

# Read input text from file
with open("questions.txt", "r", encoding="utf-8") as file:
    input_text = file.read()

# Regular expression pattern to extract question numbers and prompts
pattern = r"问答题第(\d+)题：(.*?)\n"

# Find all matches
matches = re.findall(pattern, input_text)

# Format the matches
formatted_questions = [f"{num}：{prompt}" for num, prompt in matches]

# Join the formatted questions
formatted_text = "\n\n".join(formatted_questions)

print(formatted_text)
