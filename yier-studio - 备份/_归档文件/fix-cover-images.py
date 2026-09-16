#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复所有项目的 cover.jpg 问题
"""
import os
import shutil

base = r'E:\portfolio\yier-studio\images'

# 排除的文件夹
exclude_folders = {'ref-assets', '项目10', '项目11', '项目12', '项目13', '项目14', '项目15', '项目16', '项目17', '项目18'}

# 获取所有项目文件夹
folders = sorted([f for f in os.listdir(base) 
                  if os.path.isdir(os.path.join(base, f))
                  and f not in exclude_folders])

print("=== 修复 cover.jpg ===\n")

repaired = 0
skipped = 0

for folder in folders:
    folder_path = os.path.join(base, folder)
    cover_path = os.path.join(folder_path, 'cover.jpg')
    
    if not os.path.exists(cover_path):
        print(f"❌ {folder}: cover.jpg 不存在")
        skipped += 1
        continue
    
    cover_size = os.path.getsize(cover_path)
    
    # 如果 cover.jpg 是占位图，找到最大的图片作为封面
    if cover_size < 50000:
        # 查找所有 jpg 文件
        jpg_files = []
        for f in os.listdir(folder_path):
            if f.endswith('.jpg') and f != 'cover.jpg':
                jpg_files.append((f, os.path.getsize(os.path.join(folder_path, f))))
        
        if jpg_files:
            # 按大小排序，取最大的
            jpg_files.sort(key=lambda x: x[1], reverse=True)
            best_file = jpg_files[0][0]
            best_path = os.path.join(folder_path, best_file)
            
            # 复制作为封面
            shutil.copy2(best_path, cover_path)
            print(f"✅ {folder}: 使用 {best_file} 作为封面 ({os.path.getsize(cover_path)} bytes)")
            repaired += 1
        else:
            print(f"⚠️  {folder}: 无其他图片，跳过")
            skipped += 1
    else:
        print(f"✓  {folder}: 已有真实 cover.jpg")
        skipped += 1

print(f"\n=== 完成 ===")
print(f"已修复: {repaired} 个项目")
print(f"跳过: {skipped} 个项目")
