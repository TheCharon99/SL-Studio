#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
压缩新项目图片并创建缺失文件
"""
import os
import shutil
from PIL import Image

base = r'E:\portfolio\yier-studio\images'

projects = [
    ('观唐府', '私人公寓', ['静态1.jpg', '静态2.jpg', '主卧静态1.jpg', '主卧静态2.jpg', '次卧.jpg', '次卫.jpg', '厨房.jpg', '主卫.jpg']),
    ('星愉湾', '私人公寓', ['微信图片_20251124180642_498_220.jpg', '微信图片_20251124180642_499_220.jpg', '微信图片_20251124180643_500_220.jpg', '微信图片_20251124180644_501_220.jpg', '微信图片_20251124180644_502_220.jpg']),
    ('星愉湾上叠', '私人豪宅', ['1.jpg', '主卧1.jpg', '主卧2.jpg', '多功能房1.jpg', '多功能房2.jpg', '小孩房1.jpg', '小孩房2.jpg', '楼梯间.jpg']),
    ('棕榈湾', '私人公寓', ['静态1.jpg', '静态2.jpg', '主卧静态.jpg', '儿童房静态.jpg', '衣帽间静态.jpg', '10.24-2厨房.jpg', '图片4.png']),
]

results = []

for folder, category, image_list in projects:
    folder_path = os.path.join(base, folder)
    if not os.path.exists(folder_path):
        print(f"跳过 {folder}: 文件夹不存在")
        continue
    
    files = os.listdir(folder_path)
    original_size = sum(os.path.getsize(os.path.join(folder_path, f)) for f in files if os.path.isfile(os.path.join(folder_path, f)))
    
    # 复制最佳图片作为1-7.jpg
    img_files = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    
    # 创建标准命名
    for i, src_name in enumerate(image_list[:7], 1):
        src_path = os.path.join(folder_path, src_name)
        dst_path = os.path.join(folder_path, f'{i}.jpg')
        if os.path.exists(src_path) and not os.path.exists(dst_path):
            shutil.copy2(src_path, dst_path)
    
    # 创建cover.jpg（使用第一张图）
    cover_src = os.path.join(folder_path, image_list[0]) if image_list else None
    if cover_src and os.path.exists(cover_src):
        shutil.copy2(cover_src, os.path.join(folder_path, 'cover.jpg'))
    
    # 压缩所有jpg图片
    compressed_size = 0
    for f in files:
        if f.lower().endswith('.jpg'):
            filepath = os.path.join(folder_path, f)
            try:
                img = Image.open(filepath)
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')
                max_size = 1920
                if img.width > max_size or img.height > max_size:
                    ratio = max_size / max(img.width, img.height)
                    new_size = (int(img.width * ratio), int(img.height * ratio))
                    img = img.resize(new_size, Image.LANCZOS)
                img.save(filepath, 'JPEG', quality=85, optimize=True)
                compressed_size += os.path.getsize(filepath)
            except Exception as e:
                pass
    
    # 转换PNG
    for f in files:
        if f.lower().endswith('.png'):
            filepath = os.path.join(folder_path, f)
            try:
                img = Image.open(filepath)
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGBA')
                else:
                    img = img.convert('RGB')
                # 保存为JPEG
                rgb = Image.new('RGB', img.size[:2])
                if img.mode == 'RGBA':
                    rgb.paste(img, mask=img.split()[3])
                else:
                    rgb.paste(img)
                jpg_path = os.path.splitext(filepath)[0] + '.jpg'
                rgb.save(jpg_path, 'JPEG', quality=85, optimize=True)
                os.remove(filepath)
            except Exception as e:
                print(f"  转换 {f} 失败: {e}")
    
    new_size = sum(os.path.getsize(os.path.join(folder_path, f)) for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f)))
    savings = original_size - new_size
    results.append(f"{folder}: {original_size/1024/1024:.1f}MB -> {new_size/1024/1024:.1f}MB (节省{savings/1024/1024:.1f}MB)")
    print(f"{folder}: 压缩完成")

print("\n" + "\n".join(results))
