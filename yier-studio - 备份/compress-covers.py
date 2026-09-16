#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
压缩所有大封面图
"""
import os
from PIL import Image

base = r'E:\portfolio\yier-studio\images'
exclude_folders = {'ref-assets', '项目10', '项目11', '项目12', '项目13', '项目14', '项目15', '项目16', '项目17', '项目18'}
folders = sorted([f for f in os.listdir(base) if os.path.isdir(os.path.join(base, f)) and f not in exclude_folders])

print("=" * 60)
print("压缩大封面图")
print("=" * 60)

large_covers = []
for folder in folders:
    folder_path = os.path.join(base, folder)
    cover_path = os.path.join(folder_path, 'cover.jpg')
    if os.path.exists(cover_path):
        size = os.path.getsize(cover_path)
        if size > 300000:  # >300KB
            large_covers.append((folder, cover_path, size))

print(f"发现 {len(large_covers)} 个封面图需要压缩\n")

for folder, cover_path, original_size in large_covers:
    try:
        with Image.open(cover_path) as img:
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
            temp_path = cover_path + '.tmp'
            img.save(temp_path, 'JPEG', quality=quality, optimize=True)
            
            compressed_size = os.path.getsize(temp_path)
            while compressed_size > 300000 and quality > 50:
                quality -= 5
                img.save(temp_path, 'JPEG', quality=quality, optimize=True)
                compressed_size = os.path.getsize(temp_path)
            
            os.replace(temp_path, cover_path)
            
            print(f"  {folder}/cover.jpg: {original_size/1024:.1f}KB → {compressed_size/1024:.1f}KB ({(1-compressed_size/original_size)*100:.1f}%)")
            
    except Exception as e:
        print(f"  ❌ {folder}/cover.jpg: 失败 - {e}")

# 清理临时文件
print(f"\n清理临时文件...")
for folder in folders:
    folder_path = os.path.join(base, folder)
    for f in os.listdir(folder_path):
        if f.endswith('.tmp'):
            os.remove(os.path.join(folder_path, f))

print(f"完成！")
