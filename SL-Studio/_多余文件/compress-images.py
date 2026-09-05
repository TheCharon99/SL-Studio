#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
压缩项目详情图片到适合网页展示的大小
- 最大宽度: 1920px
- 质量: 85%
- 目标大小: < 300KB/张
"""
import os
from PIL import Image
import glob

base = r'E:\portfolio\yier-studio\images'
exclude_folders = {'ref-assets', '项目10', '项目11', '项目12', '项目13', '项目14', '项目15', '项目16', '项目17', '项目18'}

# 获取所有项目文件夹
folders = sorted([f for f in os.listdir(base) if os.path.isdir(os.path.join(base, f)) and f not in exclude_folders])

print("=" * 60)
print("项目详情图片压缩")
print("=" * 60)
print(f"项目数量: {len(folders)} 个")
print(f"压缩参数: 最大宽度1920px, 质量85%, 目标<300KB\n")

total_before = 0
total_after = 0
compressed_count = 0
skipped_count = 0

for folder in folders:
    folder_path = os.path.join(base, folder)
    folder_size_before = 0
    folder_size_after = 0
    
    # 压缩 1.jpg 到 7.jpg
    for i in range(1, 8):
        file_path = os.path.join(folder_path, f'{i}.jpg')
        if not os.path.exists(file_path):
            continue
        
        # 获取原始大小
        original_size = os.path.getsize(file_path)
        folder_size_before += original_size
        total_before += original_size
        
        # 打开图片并压缩
        try:
            with Image.open(file_path) as img:
                # 转换为 RGB 模式（如果是 RGBA 或 P 模式）
                if img.mode in ('RGBA', 'P', 'LA'):
                    # 创建白色背景
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
                temp_path = file_path + '.tmp'
                img.save(temp_path, 'JPEG', quality=85, optimize=True)
                
                # 检查大小，如果超过 300KB 则进一步压缩
                compressed_size = os.path.getsize(temp_path)
                while compressed_size > 300000 and quality > 50:
                    quality -= 5
                    img.save(temp_path, 'JPEG', quality=quality, optimize=True)
                    compressed_size = os.path.getsize(temp_path)
                
                # 替换原文件
                os.replace(temp_path, file_path)
                
                folder_size_after += compressed_size
                total_after += compressed_size
                compressed_count += 1
                
                if original_size > 100000:  # 只打印大于100KB的图片
                    print(f"  {folder}/{i}.jpg: {original_size/1024:.1f}KB → {compressed_size/1024:.1f}KB ({(1-compressed_size/original_size)*100:.1f}%)")
                    
        except Exception as e:
            print(f"  ❌ {folder}/{i}.jpg: 压缩失败 - {e}")
    
    if folder_size_before > 0:
        folder_ratio = (1 - folder_size_after/folder_size_before) * 100
        print(f"  📁 {folder}: {folder_size_before/1024:.1f}KB → {folder_size_after/1024:.1f}KB ({folder_ratio:.1f}%)")

print("\n" + "=" * 60)
print("压缩完成")
print("=" * 60)
print(f"压缩图片数量: {compressed_count} 个")
print(f"跳过图片数量: {skipped_count} 个")
print(f"原始总大小: {total_before/1024/1024:.2f} MB")
print(f"压缩后总大小: {total_after/1024/1024:.2f} MB")
print(f"节省空间: {(total_before-total_after)/1024/1024:.2f} MB ({(1-total_after/total_before)*100:.1f}%)")
