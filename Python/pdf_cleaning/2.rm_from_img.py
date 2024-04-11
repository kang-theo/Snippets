from PIL import Image, ImageDraw
import os

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

def remove_part_from_even_pages(folder_path, region_to_remove):
    # 获取文件夹中的所有图片文件
    image_files = sorted([file for file in os.listdir(folder_path) if file.lower().endswith(('.jpg', '.jpeg', '.png'))], key = sort_by_page_number)
    print(image_files)

    for index, file_name in enumerate(image_files):
        file_path = os.path.join(folder_path, file_name)
        output_path = os.path.join(folder_path, f'{file_name}')  # 输出文件名为 page_1.png 等

        # 打开图像文件
        image = Image.open(file_path)

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

# 示例用法
folder_path = 'output_images'
region_to_remove = (60, 165, 530, 220)  # 指定要删除的区域的左上角和右下角坐标

remove_part_from_even_pages(folder_path, region_to_remove)

