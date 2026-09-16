#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
压缩首页轮播图和创始人占位图
"""
import os
from PIL import Image

base = r'E:\portfolio\yier-studio\images'

# 要压缩的文件
files_to_compress = [
    ('placeholder-founder-1.jpg', 1920, 500000),  # 1920px宽，<500KB
    ('placeholder-founder-2.jpg', 1920, 500000),
    ('项目-banner1.jpg', 1920, 500000),
    ('项目-banner2.jpg', 1920, 500000),
    ('项目-banner3.jpg', 1920, 500000),
    ('项目-banner5.jpg', 1920, 500000),
    ('项目-banner6.jpg', 1920, 500000),
]

print("=" * 60)
print("压缩首页轮播图和占位图")
print("=" * 60)

total_before = 0
total_after = 0

for filename, max_width, max_size in files_to_compress:
    file_path = os.path.join(base, filename)
    if not os.path.exists(file_path):
        print(f"  ⚠️  文件不存在: {filename}")
        continue
    
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
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # 压缩保存
            quality = 85
            temp_path = file_path + '.tmp'
            img.save(temp_path, 'JPEG', quality=quality, optimize=True)
            
            # 如果超过限制，降低质量
            compressed_size = os.path.getsize(temp_path)
            while compressed_size > max_size and quality > 50:
                quality -= 5
                img.save(temp_path, 'JPEG', quality=quality, optimize=True)
                compressed_size = os.path.getsize(temp_path)
            
            os.replace(temp_path, file_path)
            total_after += compressed_size
            
            print(f"  {filename}: {original_size/1024/1024:.2f}MB → {compressed_size/1024/1024:.2f}MB ({(1-compressed_size/original_size)*100:.1f}%)")
            
    except Exception as e:
        print(f"  ❌ {filename}: 失败 - {e}")

print(f"\n" + "=" * 60)
print("压缩完成")
print("=" * 60)
print(f"原始大小: {total_before/1024/1024:.2f} MB")
print(f"压缩后: {total_after/1024/1024:.2f} MB")
print(f"节省: {(total_before-total_after)/1024/1024:.2f} MB ({(1-total_after/total_before)*100:.1f}%)")
