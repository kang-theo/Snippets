from pdf2image import convert_from_path

from PIL import Image, ImageDraw
import os

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

import shutil

# import PyPDF2
import subprocess
import threading

"""common functions"""
# 按照 page_1, page_2, … page_10, page_11排序
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

# 检查文件夹是否存在，不存在则创建
def create_folder_if_not_exists(folder_path):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

# 删除生成的临时文件夹
def delete_folder(folder_path):
    if os.path.exists(folder_path):
        shutil.rmtree(folder_path)
        print(f"Deleted folder: {folder_path}")
    else:
        print(f"Folder not found: {folder_path}")

"""scanned pdf to images"""
def pdf_to_images(pdf_path, output_folder):
    # 将 PDF 文件转换为图像
    images = convert_from_path(pdf_path)

    # 保存图像到指定文件夹
    for i, image in enumerate(images):
        print(f'create {output_folder}/page_{i + 1}.png')
        image.save(f"{output_folder}/page_{i + 1}.png", "PNG")


"""remove specified part from images"""
def remove_part_from_even_pages(folder_path, region_to_remove):
    # 获取文件夹中的所有图片文件
    image_files = sorted([file for file in os.listdir(folder_path) if file.lower().endswith(('.jpg', '.jpeg', '.png'))], key = sort_by_page_number)

    for index, file_name in enumerate(image_files):
        file_path = os.path.join(folder_path, file_name)
        output_path = os.path.join(folder_path, f'{file_name}')  # 输出文件名为 page_1.png 等

        # 打开图像文件
        image = Image.open(file_path)

        # if index % 2 != 0:
        if index % 2 == 0:
            continue

        # # 获取图像的页数
        # num_pages = image.n_frames if hasattr(image, 'n_frames') else 1

        # # 处理偶数页的图像
        # for page_num in range(0, num_pages, 2):  # 从第二页开始，步长为 2

        # 创建遮罩图像，将要删除的区域填充为全透明的白色
        mask = Image.new('RGBA', image.size, (0, 0, 0, 0))
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rectangle(region_to_remove, fill=(255, 255, 255, 255))

        # 将遮罩图像应用到当前页上，实现删除指定区域的效果
        result = Image.alpha_composite(image.convert('RGBA'), mask)

        # 保存处理后的图像
        result.save(output_path)

        print(f'Removed specified part from {file_name}')

"""images merged to pdf"""
def convert_png_to_pdf(png_folder, pdf_output):
    # 获取文件夹中的所有 PNG 图像文件，并按文件名排序
    png_files = sorted([file for file in os.listdir(png_folder) if file.lower().endswith('.png')], key = sort_by_page_number)

    # 创建 PDF 文件
    c = canvas.Canvas(pdf_output, pagesize=letter)
    width, height = letter

    # 遍历 PNG 图像文件并将其插入到 PDF 中
    for png_file in png_files:
        print(f'merge {png_file}')
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

"""
/screen：适合用于屏幕查看的低分辨率输出。
/ebook：适合用于电子书查看的中等分辨率输出。
/printer：适合用于打印输出的高分辨率输出。
/default：默认压缩级别。
"""
def compress_pdf(input_path, output_path, compression_level='/screen'):
    print('pdf compressing...')
    # 使用 Ghostscript 来压缩 PDF 文件
    command = [
        'gs',
        '-sDEVICE=pdfwrite',
        '-dCompatibilityLevel=1.4',
        '-dPDFSETTINGS={}'.format(compression_level),
        '-dNOPAUSE',
        '-dBATCH',
        '-sOutputFile={}'.format(output_path),
        input_path
    ]
    # 使用 subprocess 模块运行命令
    subprocess.run(command)
    
    print(f'Compressed PDF saved to: {output_path}')

def pdf_cleaning(input_pdf, output_images_folder, pdf_output, pdf_compressed_output):
  # 1. pdf to images
    create_folder_if_not_exists(output_images_folder)
    pdf_to_images(input_pdf, output_images_folder)

    # 2. remove part from images
    region_to_remove = (100, 165, 495, 250)  # 指定要删除的区域的左上角和右下角坐标
    remove_part_from_even_pages(output_images_folder, region_to_remove)

    # 3. images merged to pdf
    create_folder_if_not_exists(output_folder)
    convert_png_to_pdf(output_images_folder, pdf_output)

    # 4. compress
    print(pdf_compressed_output)
    compress_pdf(pdf_output, pdf_compressed_output, compression_level='/printer') 

    # 5. clean up
    delete_folder(output_images_folder)

# # 1. pdf to images
# input_pdf = 'input.pdf'
# output_folder = 'output_images'

# pdf_to_images(input_pdf, output_folder)

# # 2. remove part from images
# folder_path = 'output_images'
# region_to_remove = (60, 165, 530, 220)  # 指定要删除的区域的左上角和右下角坐标

# remove_part_from_even_pages(folder_path, region_to_remove)

# # 3. images merged to pdf
# png_folder = 'output_images'
# pdf_output = 'output.pdf'

# convert_png_to_pdf(png_folder, pdf_output)

# 定义输入和输出文件夹
input_folder = 'input_pdfs'
output_folder = 'output_pdfs'

# 获取输入文件夹中的所有 PDF 文件，并按文件名排序
pdf_files = sorted([file for file in os.listdir(input_folder) if file.lower().endswith('.pdf')])

threads = []
# 遍历每个 PDF 文件，并对其执行转换、删除指定部分和合并操作
for pdf_file in pdf_files:
    input_pdf = os.path.join(input_folder, pdf_file)
    output_images_folder = os.path.join(output_folder, f'{pdf_file}_images')
    pdf_output = os.path.join(output_images_folder, f'{pdf_file}')
    pdf_compressed_output = os.path.join(output_folder, f'{pdf_file}')

    thread = threading.Thread(target=pdf_cleaning, args=(input_pdf, output_images_folder, pdf_output, pdf_compressed_output))
    threads.append(thread)
    thread.start()

# Wait for all threads to complete
for thread in threads:
    thread.join()