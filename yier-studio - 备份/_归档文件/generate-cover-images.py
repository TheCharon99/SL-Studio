#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有项目生成真实的封面图（使用PIL生成高质量占位图）
"""
import os
from PIL import Image, ImageDraw, ImageFont

base = r'E:\portfolio\yier-studio\images'

# 排除的文件夹
exclude_folders = {'ref-assets', '项目10', '项目11', '项目12', '项目13', '项目14', '项目15', '项目16', '项目17', '项目18'}

# 获取所有项目文件夹
folders = sorted([f for f in os.listdir(base) 
                  if os.path.isdir(os.path.join(base, f))
                  and f not in exclude_folders])

print("=== 重新生成封面图 ===\n")

fixed = 0
skipped = 0

for folder in folders:
    folder_path = os.path.join(base, folder)
    cover_path = os.path.join(folder_path, 'cover.jpg')
    
    # 检查 cover.jpg 大小
    if os.path.exists(cover_path):
        cover_size = os.path.getsize(cover_path)
        if cover_size >= 50000:
            print(f"✓  {folder}: 已有真实封面 ({cover_size} bytes)")
            skipped += 1
            continue
    
    # 生成新的封面图（800x600，黑色背景）
    img = Image.new('RGB', (800, 600), color='#1a1a1a')
    draw = ImageDraw.Draw(img)
    
    # 尝试加载字体
    try:
        font = ImageFont.truetype("arial.ttf", 48)
    except:
        font = ImageFont.load_default()
    
    # 居中显示项目名
    bbox = draw.textbbox((0, 0), folder, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (800 - text_width) // 2
    y = (600 - text_height) // 2 - 20
    
    draw.text((x, y), folder, fill='#c9a87c', font=font)
    
    # 添加副标题
    try:
        sub_font = ImageFont.truetype("arial.ttf", 24)
    except:
        sub_font = ImageFont.load_default()
    
    subtitle = "懿贰设计 · YiER-Studio"
    bbox = draw.textbbox((0, 0), subtitle, font=sub_font)
    text_width = bbox[2] - bbox[0]
    x = (800 - text_width) // 2
    y = bbox[3] - bbox[1] + 30
    draw.text((x, y), subtitle, fill='#666666', font=sub_font)
    
    # 保存为 JPEG
    img.save(cover_path, 'JPEG', quality=90)
    
    new_size = os.path.getsize(cover_path)
    print(f"✅ {folder}: 生成封面图 ({new_size} bytes)")
    fixed += 1

print(f"\n=== 完成 ===")
print(f"已生成: {fixed} 个封面图")
print(f"跳过: {skipped} 个项目（已有真实封面）")
