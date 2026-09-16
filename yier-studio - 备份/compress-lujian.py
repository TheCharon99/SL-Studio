#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
压缩麓涧小酒馆的图片
"""
import os
from PIL import Image

base = r'E:\portfolio\yier-studio\images'
folder = '麓涧小酒馆'
folder_path = os.path.join(base, folder)

print(f"压缩 {folder} 的图片:\n")

total_before = 0
total_after = 0

for filename in sorted(os.listdir(folder_path)):
    if not filename.endswith('.jpg'):
        continue
    
    file_path = os.path.join(folder_path, filename)
    original_size = os.path.getsize(file_path)
    total_before += original_size
    
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
            
            # 调整尺寸
            max_width = 1920
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # 压缩保存
            quality = 85
            temp_path = file_path + '.tmp'
            img.save(temp_path, 'JPEG', quality=quality, optimize=True)
            
            compressed_size = os.path.getsize(temp_path)
            while compressed_size > 300000 and quality > 50:
                quality -= 5
                img.save(temp_path, 'JPEG', quality=quality, optimize=True)
                compressed_size = os.path.getsize(temp_path)
            
            os.replace(temp_path, file_path)
            total_after += compressed_size
            print(f"  {filename}: {original_size/1024/1024:.1f}MB → {compressed_size/1024:.1f}KB ({(1-compressed_size/original_size)*100:.1f}%)")
            
    except Exception as e:
        print(f"  {filename}: 失败 - {e}")

print(f"\n总大小: {total_before/1024/1024:.2f}MB → {total_after/1024/1024:.2f}MB")
print(f"节省: {(total_before-total_after)/1024/1024:.2f}MB ({(1-total_after/total_before)*100:.1f}%)")
