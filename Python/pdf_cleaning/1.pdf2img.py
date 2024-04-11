from pdf2image import convert_from_path

def pdf_to_images(pdf_path, output_folder):
    # 将 PDF 文件转换为图像
    images = convert_from_path(pdf_path)

    # 保存图像到指定文件夹
    for i, image in enumerate(images):
        image.save(f"{output_folder}/page_{i + 1}.png", "PNG")

# 示例用法
input_pdf = 'input.pdf'
output_folder = 'output_images'

pdf_to_images(input_pdf, output_folder)
