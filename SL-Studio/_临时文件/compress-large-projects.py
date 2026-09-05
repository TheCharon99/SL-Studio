#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量压缩大图项目
"""
import os
import subprocess
from PIL import Image

base = r'E:\portfolio\yier-studio\images'

# 最大的项目（按文件夹大小排序）
large_projects = [
    '蕐诚律所',
    '大金展厅',
    '星愉湾上叠',
    '新未来樾湖',
    '懿贰办公室',
    '观唐府',
    '欢欢服装店',
    '棕榈湾',
    '星愉湾',
    '凤凰城',
    '禾禾咖啡咖啡店',
    '铂翠廷',
]

max_size = 1920  # 最大宽度
quality = 85     # JPEG质量

def compress_image(input_path, output_path, max_size=1920, quality=85):
    """压缩单张图片"""
    try:
        img = Image.open(input_path)
        
        # 如果是WebP或RGBA，转换为RGB
        if img.mode in ('RGBA', 'P', 'LA'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # 调整尺寸
        if img.width > max_size or img.height > max_size:
            ratio = max_size / max(img.width, img.height)
            new_size = (int(img.width * ratio), int(img.height * ratio))
            img = img.resize(new_size, Image.LANCZOS)
        
        # 保存
        img.save(output_path, 'JPEG', quality=quality, optimize=True)
        return True
    except Exception as e:
        print(f"  压缩失败: {e}")
        return False

print("=" * 70)
print("批量压缩大图项目")
print("=" * 70)
print()

total_original = 0
total_compressed = 0
stats = []

for project in large_projects:
    project_path = os.path.join(base, project)
    if not os.path.exists(project_path):
        print(f"跳过: {project} (文件夹不存在)")
        continue
    
    files = [f for f in os.listdir(project_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
    if not files:
        continue
    
    original_size = sum(os.path.getsize(os.path.join(project_path, f)) for f in files)
    compressed_size = original_size
    
    # 创建压缩后的文件夹
    compressed_dir = os.path.join(base, f"{project}-压缩")
    os.makedirs(compressed_dir, exist_ok=True)
    
    print(f"\n处理: {project}")
    print(f"  原大小: {original_size/1024/1024:.1f}MB")
    print(f"  文件数: {len(files)}")
    
    # 压缩每张图片
    for i, f in enumerate(files[:7], 1):  # 只压缩前7张
        src = os.path.join(project_path, f)
        dst = os.path.join(compressed_dir, f)
        
        if compress_image(src, dst, max_size, quality):
            compressed_size -= os.path.getsize(src) - os.path.getsize(dst)
            print(f"  ✅ {f}: {os.path.getsize(src)/1024:.0f}KB -> {os.path.getsize(dst)/1024:.0f}KB")
    
    stats.append({
        'project': project,
        'original': original_size,
        'compressed': compressed_size,
        'saved': original_size - compressed_size
    })

print("\n" + "=" * 70)
print("压缩统计")
print("=" * 70)

total_original = sum(s['original'] for s in stats)
total_compressed = sum(s['compressed'] for s in stats)
total_saved = total_original - total_compressed

for s in stats:
    ratio = (s['original'] - s['compressed']) / s['original'] * 100 if s['original'] > 0 else 0
    print(f"{s['project']}: {s['original']/1024/1024:.1f}MB -> {s['compressed']/1024/1024:.1f}MB (节省{ratio:.0f}%)")

print(f"\n总计: {total_original/1024/1024:.1f}MB -> {total_compressed/1024/1024:.1f}MB (节省{total_saved/1024/1024:.1f}MB)")
print(f"压缩率: {total_saved/total_original*100:.0f}%")
