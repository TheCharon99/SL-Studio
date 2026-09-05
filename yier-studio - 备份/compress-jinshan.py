#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
压缩金山豪庭的详情图
"""
import os
from PIL import Image

base = r'E:\portfolio\yier-studio\images'
folder = '金山豪庭-中古奶油'
folder_path = os.path.join(base, folder)

print("=" * 60)
print(f"压缩 {folder} 的详情图")
print("=" * 60)

compressed_count = 0
for i in range(1, 8):
    file_path = os.path.join(folder_path, f'{i}.jpg')
    if not os.path.exists(file_path):
        continue
    
    original_size = os.path.getsize(file_path)
    
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
            
            print(f"  {i}.jpg: {original_size/1024:.1f}KB → {compressed_size/1024:.1f}KB ({(1-compressed_size/original_size)*100:.1f}%)")
            compressed_count += 1
            
    except Exception as e:
        print(f"  ❌ {i}.jpg: 失败 - {e}")

print(f"\n共压缩 {compressed_count} 个文件")
