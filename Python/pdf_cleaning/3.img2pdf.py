from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from PIL import Image
import os

def sort_by_page_number(file_name):
    # 提取文件名中的数字部分
    name_parts = file_name.split('_')
    if len(name_parts) == 2:
        page_number = name_parts[1].split('.')[0]
        try:
            return int(page_number)
        except ValueError:
            return float('inf')  # 处理无法转换为整数的情况
    else:
        return float('inf')  # 处理格式不符合要求的文件名

def convert_png_to_pdf(png_folder, pdf_output):
    # 获取文件夹中的所有 PNG 图像文件，并按文件名排序
    png_files = sorted([file for file in os.listdir(png_folder) if file.lower().endswith('.png')], key = sort_by_page_number)
    print(png_files)

    # 创建 PDF 文件
    c = canvas.Canvas(pdf_output, pagesize=letter)
    width, height = letter

    # 遍历 PNG 图像文件并将其插入到 PDF 中
    for png_file in png_files:
        png_path = os.path.join(png_folder, png_file)
        im = Image.open(png_path)
        im_width, im_height = im.size

        # 计算插入图像的缩放比例，使其适应页面尺寸
        scale = min(width / im_width, height / im_height)
        im_width_scaled = im_width * scale
        im_height_scaled = im_height * scale

        # 计算图像在页面中的位置
        x = (width - im_width_scaled) / 2
        y = (height - im_height_scaled) / 2

        # 将图像插入到 PDF 中
        c.drawImage(png_path, x, y, width=im_width_scaled, height=im_height_scaled)

        # 添加新页面
        c.showPage()

    # 保存 PDF 文件
    c.save()

# 示例用法
png_folder = 'output_images'
pdf_output = 'output.pdf'

convert_png_to_pdf(png_folder, pdf_output)
