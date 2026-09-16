#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
图片重命名脚本 - 将项目图片重命名为匹配 HTML 中的项目名
运行: python3 rename-images.py
"""

import os
import re
import shutil

base_path = r"E:\portfolio\yier-studio\images"

# HTML 中定义的项目
projects = [
    ("观唐府", "观唐府 · 意式风格"),
    ("金山豪庭", "金山豪庭 · 中古奶油"),
    ("星愉湾-现代意式", "星愉湾 · 现代意式"),
    ("星愉湾-轻法式", "星愉湾 · 轻法式"),
    ("星愉湾-现代极简", "星愉湾 · 现代极简"),
    ("中山文化苑", "中山文化苑 · 现代简约"),
    ("凤凰城", "凤凰城"),
    ("国宸府", "国宸府"),
    ("国印东方", "国印东方"),
]

def rename_images():
    print("=" * 50)
    print("图片重命名脚本")
    print("=" * 50)

    # 获取所有 jpg 文件
    all_files = [f for f in os.listdir(base_path) if f.endswith('.jpg')]
    print(f"\n找到 {len(all_files)} 个 jpg 文件")

    # 分类文件
    cover_files = []
    detail_files = []
    banner_files = []
    detail_generic_files = []

    for f in all_files:
        if re.match(r'^banner\d+\.jpg$', f):
            banner_files.append(f)
        elif re.match(r'^detail_\d+\.jpg$', f):
            detail_generic_files.append(f)
        elif re.search(r'_\d+\.jpg$', f):
            detail_files.append(f)
        elif not any(x in f for x in ['logo', 'wx', 'lightbox', 'ref']):
            cover_files.append(f)

    print(f"  封面图: {len(cover_files)} 个")
    print(f"  详情图: {len(detail_files)} 个")
    print(f"  banner图: {len(banner_files)} 个")
    print(f"  通用detail: {len(detail_generic_files)} 个")

    # 收集重命名操作
    rename_ops = []

    # 1. 重命名封面图
    cover_files.sort()
    for i, old_name in enumerate(cover_files):
        if i < len(projects):
            new_name = f"{projects[i][0]}.jpg"
        else:
            new_name = f"项目{i+1}.jpg"
        rename_ops.append((old_name, new_name))

    # 2. 重命名详情图（按项目分组）
    # 解析详情图的项目名
    detail_by_project = {}
    for f in detail_files:
        # 提取项目名（去掉 _数字.jpg）
        match = re.match(r'^(.+?)_(\d+)\.jpg$', f)
        if match:
            project_name = match.group(1)
            num = match.group(2)
            if project_name not in detail_by_project:
                detail_by_project[project_name] = []
            detail_by_project[project_name].append((num, f))

    # 分配 HTML 项目名
    project_index = 0
    for project_name, images in sorted(detail_by_project.items()):
        if project_index < len(projects):
            new_base = projects[project_index][0]
        else:
            new_base = f"项目{project_index+1}"

        for num, old_name in sorted(images, key=lambda x: int(x[0])):
            new_name = f"{new_base}-{num}.jpg"
            rename_ops.append((old_name, new_name))

        project_index += 1

    # 3. 重命名 banner 图
    for i, f in enumerate(sorted(banner_files)):
        new_name = f"项目-banner{i+1}.jpg"
        rename_ops.append((f, new_name))

    # 4. 重命名 detail_*.jpg
    for i, f in enumerate(sorted(detail_generic_files)):
        new_name = f"项目-detail{i+1}.jpg"
        rename_ops.append((f, new_name))

    # 5. 清理现有的临时命名文件
    existing_temp = [f for f in all_files if re.match(r'^(项目|项目-)', f)]
    for f in existing_temp:
        old_path = os.path.join(base_path, f)
        if os.path.exists(old_path):
            os.remove(old_path)
            print(f"  清理: {f}")

    # 执行重命名
    print("\n" + "=" * 50)
    print("执行重命名...")
    print("=" * 50)

    success_count = 0
    skip_count = 0
    error_count = 0

    for old_name, new_name in rename_ops:
        if old_name == new_name:
            continue

        old_path = os.path.join(base_path, old_name)
        new_path = os.path.join(base_path, new_name)

        if not os.path.exists(old_path):
            print(f"  [错误] 文件不存在: {old_name}")
            error_count += 1
            continue

        if os.path.exists(new_path):
            print(f"  [跳过] 目标已存在: {new_name}")
            skip_count += 1
            continue

        try:
            os.rename(old_path, new_path)
            print(f"  {old_name} -> {new_name}")
            success_count += 1
        except Exception as e:
            print(f"  [错误] {old_name}: {e}")
            error_count += 1

    print("\n" + "=" * 50)
    print(f"完成! 成功: {success_count}, 跳过: {skip_count}, 错误: {error_count}")
    print("=" * 50)

if __name__ == "__main__":
    rename_images()
