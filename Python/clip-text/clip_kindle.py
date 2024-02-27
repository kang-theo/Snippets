# encoding: utf-8
import pyperclip
import time

last_string = pyperclip.paste()

# 要删除的字符串
clear_str = "澳大利亚教育部. 澳大利亚语文(套装共6册) (西方原版教材之语文系列) . 天津人民出版社. Kindle Edition."

while True:
    time.sleep(0.02)
    string = pyperclip.paste()
    # 当剪切板内容变化时
    if string != last_string and string != '':
        # 查找字符串是否包含要删除的字符串
        clear_index = string.find(clear_str)

        # 如果字符串包含要删除的字符串，则截取之前的内容
        if clear_index >= 0:
            string = string[0:clear_index]
            # 将新的字符串替换回剪切板
            pyperclip.copy(string)
        print(string)
        last_string = string
