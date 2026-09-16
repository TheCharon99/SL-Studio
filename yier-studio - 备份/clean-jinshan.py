#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
整理金山豪庭文件夹中的大文件
将测试文件移到归档文件夹
"""
import os
import shutil

base = r'E:\portfolio\yier-studio\images'
archive_dir = r'E:\portfolio\yier-studio\_归档文件\金山豪庭备份'
os.makedirs(archive_dir, exist_ok=True)

# 要移动的文件模式
exclude_patterns = ['Camera*', '43_output*', '*.tmp']

# 金山豪庭文件夹
folder = '金山豪庭-中古奶油'
folder_path = os.path.join(base, folder)

if not os.path.exists(folder_path):
    print(f"文件夹不存在: {folder_path}")
    exit(1)

# 列出所有文件
files = os.listdir(folder_path)
print(f"金山豪庭文件夹共有 {len(files)} 个文件")

# 找出需要移动的大文件
large_files = []
for f in files:
    if f.endswith('.jpg') and not f.startswith('cover') and not f.isdigit():
        file_path = os.path.join(folder_path, f)
        size = os.path.getsize(file_path)
        if size > 100000:  # >100KB
            large_files.append((f, size))

print(f"\n发现 {len(large_files)} 个大文件需要移动:")
for filename, size in large_files[:10]:
    print(f"  - {filename}: {size/1024/1024:.2f}MB")

# 移动文件
moved = 0
for filename, size in large_files:
    src = os.path.join(folder_path, filename)
    dst = os.path.join(archive_dir, filename)
    shutil.move(src, dst)
    moved += 1
    print(f"  ✅ 已移动: {filename}")

print(f"\n共移动 {moved} 个文件到归档文件夹")
print(f"归档文件夹: {archive_dir}")

# 显示压缩后的文件夹内容
print(f"\n压缩后的金山豪庭文件夹:")
for f in sorted(os.listdir(folder_path)):
    file_path = os.path.join(folder_path, f)
    if os.path.isfile(file_path):
        size = os.path.getsize(file_path)
        print(f"  {f}: {size/1024:.1f}KB")
