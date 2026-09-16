#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
压缩项目图片并生成缺失的占位图
"""
import os
from PIL import Image

base = r'E:\portfolio\yier-studio\images'

projects = [
    ('平湖服装店', '商业空间'),
    ('上海宇植医疗科技', '办公室'),
    ('香颂湾', '私人公寓'),
    ('祥和帝景', '私人公寓'),
]

def compress_image(file_path, max_width=1920, max_size=300000):
    """压缩单张图片"""
    try:
        with Image.open(file_path) as img:
            # 转换为 RGB
            if img.mode in ('RGBA', 'P', 'LA'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            original_size = os.path.getsize(file_path)
            
            # 调整尺寸
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # 压缩保存
            quality = 85
            temp_path = file_path + '.tmp'
            img.save(temp_path, 'JPEG', quality=quality, optimize=True)
            
            compressed_size = os.path.getsize(temp_path)
            while compressed_size > max_size and quality > 50:
                quality -= 5
                img.save(temp_path, 'JPEG', quality=quality, optimize=True)
                compressed_size = os.path.getsize(temp_path)
            
            os.replace(temp_path, file_path)
            return original_size, compressed_size
            
    except Exception as e:
        return 0, 0

def create_placeholder(folder_path, filename, size=(1920, 1080)):
    """创建占位图"""
    img = Image.new('RGB', size, (128, 128, 128))
    draw = ImageDraw.Draw(img)
    
    # 添加文字
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except:
        font = None
    
    text = filename.replace('.jpg', '')
    if font:
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (size[0] - text_width) // 2
        y = (size[1] - text_height) // 2
        draw.text((x, y), text, fill=(255, 255, 255), font=font)
    
    file_path = os.path.join(folder_path, filename)
    img.save(file_path, 'JPEG', quality=85, optimize=True)
    return os.path.getsize(file_path)

from PIL import ImageDraw, ImageFont

print("=" * 60)
print("压缩项目图片")
print("=" * 60)

total_before = 0
total_after = 0

for name, category in projects:
    folder_path = os.path.join(base, name)
    if not os.path.exists(folder_path):
        print(f"\n❌ 文件夹不存在: {name}")
        continue
    
    print(f"\n{name} ({category}):")
    
    # 压缩所有图片
    for filename in sorted(os.listdir(folder_path)):
        if not filename.endswith('.jpg'):
            continue
        
        file_path = os.path.join(folder_path, filename)
        original_size, compressed_size = compress_image(file_path)
        
        if original_size > 0:
            total_before += original_size
            total_after += compressed_size
            print(f"  {filename}: {original_size/1024/1024:.1f}MB → {compressed_size/1024:.1f}KB ({(1-compressed_size/original_size)*100:.1f}%)")
        else:
            print(f"  {filename}: 跳过（无法处理）")
    
    # 为平湖服装店生成缺失的占位图
    if name == '平湖服装店':
        for i in range(3, 8):
            filename = f'{i}.jpg'
            file_path = os.path.join(folder_path, filename)
            if os.path.getsize(file_path) < 100:  # 空文件
                size = create_placeholder(folder_path, filename, (1920, 1080))
                print(f"  {filename}: 生成占位图 ({size/1024:.1f}KB)")
                total_before += 12  # 原来的12字节
                total_after += size

print(f"\n" + "=" * 60)
print("压缩完成")
print("=" * 60)
print(f"原始大小: {total_before/1024/1024:.2f} MB")
print(f"压缩后: {total_after/1024/1024:.2f} MB")
print(f"节省: {(total_before-total_after)/1024/1024:.2f} MB ({(1-total_after/total_before)*100:.1f}%)")
