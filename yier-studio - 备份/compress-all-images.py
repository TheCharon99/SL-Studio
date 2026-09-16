#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
压缩所有项目图片到适合网页展示的大小
"""
import os
import re
from PIL import Image

base = r'E:\portfolio\yier-studio\images'
exclude_folders = {'ref-assets', '项目10', '项目11', '项目12', '项目13', '项目14', '项目15', '项目16', '项目17', '项目18'}
folders = sorted([f for f in os.listdir(base) if os.path.isdir(os.path.join(base, f)) and f not in exclude_folders])

print("=" * 60)
print("项目图片压缩")
print("=" * 60)
print(f"项目数量: {len(folders)} 个\n")

total_before = 0
total_after = 0
compressed_count = 0
skipped_count = 0

for folder in folders:
    folder_path = os.path.join(base, folder)
    folder_before = 0
    folder_after = 0
    
    # 检查 cover.jpg
    cover_path = os.path.join(folder_path, 'cover.jpg')
    if os.path.exists(cover_path) and not cover_path.endswith('.tmp'):
        size = os.path.getsize(cover_path)
        folder_before += size
        total_before += size
        
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
                
                # 调整尺寸（封面图最大宽度 1920px）
                max_width = 1920
                if img.width > max_width:
                    ratio = max_width / img.width
                    new_height = int(img.height * ratio)
                    img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                
                # 压缩保存
                quality = 85
                temp_path = cover_path + '.tmp'
                img.save(temp_path, 'JPEG', quality=quality, optimize=True)
                
                # 如果超过 300KB，降低质量
                compressed_size = os.path.getsize(temp_path)
                while compressed_size > 300000 and quality > 50:
                    quality -= 5
                    img.save(temp_path, 'JPEG', quality=quality, optimize=True)
                    compressed_size = os.path.getsize(temp_path)
                
                os.replace(temp_path, cover_path)
                folder_after += compressed_size
                total_after += compressed_size
                compressed_count += 1
                
                if size > 100000:  # 只打印大于100KB的
                    print(f"  {folder}/cover.jpg: {size/1024:.1f}KB → {compressed_size/1024:.1f}KB ({(1-compressed_size/size)*100:.1f}%)")
                    
        except Exception as e:
            print(f"  ❌ {folder}/cover.jpg: 失败 - {e}")
    
    # 检查 1-7.jpg
    for i in range(1, 8):
        file_path = os.path.join(folder_path, f'{i}.jpg')
        if not os.path.exists(file_path) or file_path.endswith('.tmp'):
            continue
        
        size = os.path.getsize(file_path)
        folder_before += size
        total_before += size
        
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
                
                # 调整尺寸（最大宽度 1920px）
                max_width = 1920
                if img.width > max_width:
                    ratio = max_width / img.width
                    new_height = int(img.height * ratio)
                    img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                
                # 压缩保存
                quality = 85
                temp_path = file_path + '.tmp'
                img.save(temp_path, 'JPEG', quality=quality, optimize=True)
                
                # 如果超过 300KB，降低质量
                compressed_size = os.path.getsize(temp_path)
                while compressed_size > 300000 and quality > 50:
                    quality -= 5
                    img.save(temp_path, 'JPEG', quality=quality, optimize=True)
                    compressed_size = os.path.getsize(temp_path)
                
                os.replace(temp_path, file_path)
                folder_after += compressed_size
                total_after += compressed_size
                compressed_count += 1
                
                if size > 100000:  # 只打印大于100KB的
                    print(f"  {folder}/{i}.jpg: {size/1024:.1f}KB → {compressed_size/1024:.1f}KB ({(1-compressed_size/size)*100:.1f}%)")
                    
        except Exception as e:
            print(f"  ❌ {folder}/{i}.jpg: 失败 - {e}")
    
    if folder_before > 0:
        folder_ratio = (1 - folder_after/folder_before) * 100
        print(f"  📁 {folder}: {folder_before/1024:.1f}KB → {folder_after/1024:.1f}KB ({folder_ratio:.1f}%)")

# 清理临时文件
print(f"\n清理临时文件...")
for folder in folders:
    folder_path = os.path.join(base, folder)
    for f in os.listdir(folder_path):
        if f.endswith('.tmp'):
            os.remove(os.path.join(folder_path, f))

print(f"\n" + "=" * 60)
print("压缩完成")
print("=" * 60)
print(f"压缩图片数量: {compressed_count} 个")
print(f"跳过图片数量: {skipped_count} 个")
print(f"原始总大小: {total_before/1024/1024:.2f} MB")
print(f"压缩后总大小: {total_after/1024/1024:.2f} MB")
print(f"节省空间: {(total_before-total_after)/1024/1024:.2f} MB ({(1-total_after/total_before)*100:.1f}%)")
