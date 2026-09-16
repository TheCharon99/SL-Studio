#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
压缩剩余的大文件和 cover.jpg
"""
import os
from PIL import Image

base = r'E:\portfolio\yier-studio\images'
exclude_folders = {'ref-assets', '项目10', '项目11', '项目12', '项目13', '项目14', '项目15', '项目16', '项目17', '项目18'}
folders = sorted([f for f in os.listdir(base) if os.path.isdir(os.path.join(base, f)) and f not in exclude_folders])

print("=" * 60)
print("压缩剩余大文件和封面图")
print("=" * 60)

large_files = []
cover_files = []

# 找出所有大文件
for folder in folders:
    folder_path = os.path.join(base, folder)
    # 检查 1-7.jpg
    for i in range(1, 8):
        file_path = os.path.join(folder_path, f'{i}.jpg')
        if os.path.exists(file_path) and not file_path.endswith('.tmp'):
            size = os.path.getsize(file_path)
            if size > 300000:  # >300KB
                large_files.append((folder, f'{i}.jpg', file_path, size))
    # 检查 cover.jpg
    cover_path = os.path.join(folder_path, 'cover.jpg')
    if os.path.exists(cover_path):
        size = os.path.getsize(cover_path)
        if size > 300000:  # >300KB
            cover_files.append((folder, 'cover.jpg', cover_path, size))

print(f"\n发现 {len(large_files)} 个详情大图和 {len(cover_files)} 个封面大图")
print(f"\n=== 压缩详情大图 ===")

total_before = 0
total_after = 0

for folder, filename, file_path, original_size in large_files:
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
            
            # 如果还是太大，降低质量
            compressed_size = os.path.getsize(temp_path)
            while compressed_size > 300000 and quality > 50:
                quality -= 5
                img.save(temp_path, 'JPEG', quality=quality, optimize=True)
                compressed_size = os.path.getsize(temp_path)
            
            # 替换原文件
            os.replace(temp_path, file_path)
            
            total_before += original_size
            total_after += compressed_size
            
            print(f"  {folder}/{filename}: {original_size/1024:.1f}KB → {compressed_size/1024:.1f}KB ({(1-compressed_size/original_size)*100:.1f}%)")
            
    except Exception as e:
        print(f"  ❌ {folder}/{filename}: 失败 - {e}")

# 清理 .tmp 文件
print(f"\n清理临时文件...")
for folder in folders:
    folder_path = os.path.join(base, folder)
    for f in os.listdir(folder_path):
        if f.endswith('.tmp'):
            os.remove(os.path.join(folder_path, f))

print(f"\n=== 压缩封面图 ===")

for folder, filename, file_path, original_size in cover_files:
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
            
            # 调整尺寸（封面可以稍大，最大宽度 2400px）
            max_width = 2400
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # 压缩保存
            quality = 85
            temp_path = file_path + '.tmp'
            img.save(temp_path, 'JPEG', quality=quality, optimize=True)
            
            compressed_size = os.path.getsize(temp_path)
            while compressed_size > 500000 and quality > 50:  # 封面允许 500KB
                quality -= 5
                img.save(temp_path, 'JPEG', quality=quality, optimize=True)
                compressed_size = os.path.getsize(temp_path)
            
            os.replace(temp_path, file_path)
            
            total_before += original_size
            total_after += compressed_size
            
            print(f"  {folder}/{filename}: {original_size/1024:.1f}KB → {compressed_size/1024:.1f}KB ({(1-compressed_size/original_size)*100:.1f}%)")
            
    except Exception as e:
        print(f"  ❌ {folder}/{filename}: 失败 - {e}")

print("\n" + "=" * 60)
print("压缩完成")
print("=" * 60)
print(f"节省空间: {(total_before-total_after)/1024/1024:.2f} MB ({(1-total_after/total_before)*100:.1f}%)")
