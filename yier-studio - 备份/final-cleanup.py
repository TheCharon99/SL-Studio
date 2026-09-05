#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
压缩项目-banner4.jpg 并清理归档文件夹中的备份
"""
import os
from PIL import Image

base = r'E:\portfolio\yier-studio\images'
archive_dir = r'E:\portfolio\yier-studio\_归档文件'

# 1. 压缩项目-banner4.jpg
banner_path = os.path.join(base, '项目-banner4.jpg')
if os.path.exists(banner_path):
    original_size = os.path.getsize(banner_path)
    print(f"压缩项目-banner4.jpg: {original_size/1024/1024:.2f}MB")
    
    with Image.open(banner_path) as img:
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
        temp_path = banner_path + '.tmp'
        img.save(temp_path, 'JPEG', quality=quality, optimize=True)
        
        compressed_size = os.path.getsize(temp_path)
        while compressed_size > 500000 and quality > 50:
            quality -= 5
            img.save(temp_path, 'JPEG', quality=quality, optimize=True)
            compressed_size = os.path.getsize(temp_path)
        
        os.replace(temp_path, banner_path)
        print(f"  → {compressed_size/1024:.1f}KB ({(1-compressed_size/original_size)*100:.1f}%)")

# 2. 清理归档文件夹中的金山豪庭备份
jinshan_backup = os.path.join(archive_dir, '金山豪庭备份')
if os.path.exists(jinshan_backup):
    files = os.listdir(jinshan_backup)
    if files:
        print(f"\n清理金山豪庭备份: {len(files)} 个文件")
        for f in files:
            os.remove(os.path.join(jinshan_backup, f))
        os.rmdir(jinshan_backup)
        print("  ✅ 已删除金山豪庭备份文件夹")

# 3. 统计最终大小
print(f"\n=== 最终统计 ===")
total_size = 0
for root, dirs, files in os.walk(base):
    for f in files:
        if f.endswith('.jpg') and not f.endswith('.tmp'):
            total_size += os.path.getsize(os.path.join(root, f))

print(f"images 文件夹总大小: {total_size/1024/1024:.2f} MB")

archive_size = 0
for root, dirs, files in os.walk(archive_dir):
    for f in files:
        if not f.endswith('.tmp'):
            archive_size += os.path.getsize(os.path.join(root, f))

print(f"_归档文件 总大小: {archive_size/1024/1024:.2f} MB")
print(f"总计: {(total_size + archive_size)/1024/1024:.2f} MB")
