#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
压缩新项目图片并生成缺失的占位图
"""
import os
from PIL import Image, ImageDraw, ImageFont

base = r'E:\portfolio\yier-studio\images'

projects = [
    ('光明府26-2603', '私人公寓'),
    ('国宸府', '私人公寓'),
    ('汇龙府', '私人公寓'),
    ('星愉湾103-1003', '私人公寓'),
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
    text = filename.replace('.jpg', '').replace('.png', '')
    try:
        font = ImageFont.truetype("arial.ttf", 40)
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (size[0] - text_width) // 2
        y = (size[1] - text_height) // 2
        draw.text((x, y), text, fill=(255, 255, 255), font=font)
    except:
        draw.text((size[0]//2, size[1]//2), text, fill=(255, 255, 255))
    
    file_path = os.path.join(folder_path, filename)
    img.save(file_path, 'JPEG', quality=85, optimize=True)
    return os.path.getsize(file_path)

print("=" * 60)
print("压缩新项目图片")
print("=" * 60)

total_before = 0
total_after = 0

for name, category in projects:
    folder_path = os.path.join(base, name)
    if not os.path.exists(folder_path):
        print(f"\n❌ 文件夹不存在: {name}")
        continue
    
    print(f"\n{name} ({category}):")
    
    # 收集所有图片文件（包括子文件夹）
    all_files = []
    for root, dirs, files in os.walk(folder_path):
        for f in files:
            if f.endswith(('.jpg', '.png')):
                all_files.append((os.path.join(root, f), f))
    
    # 压缩所有图片
    for file_path, filename in sorted(all_files):
        original_size = os.path.getsize(file_path)
        total_before += original_size
        
        if original_size < 100:
            # 空文件，生成占位图
            # 确定保存路径
            save_path = os.path.join(os.path.dirname(file_path), filename.replace('.png', '.jpg'))
            size = create_placeholder(os.path.dirname(file_path), os.path.basename(save_path), (1920, 1080))
            total_after += size
            print(f"  {os.path.relpath(file_path, folder_path)}: 生成占位图 ({size/1024:.1f}KB)")
        else:
            # 压缩
            _, compressed_size = compress_image(file_path)
            total_after += compressed_size
            ratio = (1 - compressed_size / original_size) * 100 if original_size > 0 else 0
            print(f"  {os.path.relpath(file_path, folder_path)}: {original_size/1024/1024:.1f}MB → {compressed_size/1024:.1f}KB ({ratio:.1f}%)")

print(f"\n{'=' * 60}")
print("压缩完成")
print("=" * 60)
print(f"原始大小: {total_before/1024/1024:.2f} MB")
print(f"压缩后: {total_after/1024/1024:.2f} MB")
print(f"节省: {(total_before-total_after)/1024/1024:.2f} MB ({(1-total_after/total_before)*100:.1f}%)")
