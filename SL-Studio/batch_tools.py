#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
YiER Studio 网站批量操作工具
用法: python batch_tools.py [命令] [参数]
"""

import os
import sys
import subprocess
from pathlib import Path

# 项目根目录
PROJECT_ROOT = Path(r"E:/portfolio/yier-studio")
IMAGES_DIR = PROJECT_ROOT / "images"
CSS_FILE = PROJECT_ROOT / "css" / "yier-style.css"
HTML_FILES = [
    PROJECT_ROOT / "index.html",
    PROJECT_ROOT / "projects.html",
    PROJECT_ROOT / "project-detail.html",
]

def cmd_help():
    """显示帮助信息"""
    print("""
YiER Studio 批量操作工具
========================

命令:
  status          查看Git状态和修改
  add <项目名>    创建新项目文件夹结构
  commit <说明>   提交并推送更改
  push            仅推送更改
  check-images    检查图片大小（超过2MB的）
  compress        批量压缩当前目录下的JPG图片
  open            在浏览器中打开网站
  open-css        用记事本打开CSS文件
  open-detail     用记事本打开项目详情页

示例:
  python batch_tools.py add "紫金府-现代简约"
  python batch_tools.py commit "添加新项目：紫金府"
  python batch_tools.py check-images
""")

def cmd_status():
    """查看Git状态"""
    result = subprocess.run(
        ["git", "-C", str(PROJECT_ROOT), "status"],
        capture_output=True, text=True
    )
    print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)

def cmd_add(project_name):
    """创建新项目文件夹结构"""
    # 创建文件夹
    folder = IMAGES_DIR / project_name
    folder.mkdir(exist_ok=True)
    
    # 创建占位文件
    placeholder = """
请在此文件夹放入以下图片：
- cover.jpg (封面图，建议1920x1080)
- 1.jpg 到 7.jpg (详情图，可选)

图片要求：
- 格式：JPG
- 大小：单张不超过2MB
- 建议先用 https://tinypng.com 压缩
"""
    (folder / "README.txt").write_text(placeholder, encoding="utf-8")
    
    print(f"✅ 已创建项目文件夹：{folder}")
    print(f"\n下一步：")
    print(f"1. 将图片放入 {folder}")
    print(f"2. 编辑 project-detail.html 添加项目数据")
    print(f"3. 执行: python batch_tools.py commit '添加新项目：{project_name}'")

def cmd_commit(message):
    """提交并推送"""
    if not message:
        print("❌ 请提供提交说明")
        return
    
    # 添加所有修改
    subprocess.run(["git", "-C", str(PROJECT_ROOT), "add", "."], check=True)
    
    # 提交
    result = subprocess.run(
        ["git", "-C", str(PROJECT_ROOT), "commit", "-m", message],
        capture_output=True, text=True
    )
    print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    
    # 推送
    print("📤 正在推送到GitHub...")
    result = subprocess.run(
        ["git", "-C", str(PROJECT_ROOT), "push", "origin", "main"],
        capture_output=True, text=True
    )
    print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    
    print("✅ 完成！请清除浏览器缓存测试网站")

def cmd_push():
    """仅推送"""
    result = subprocess.run(
        ["git", "-C", str(PROJECT_ROOT), "push", "origin", "main"],
        capture_output=True, text=True
    )
    print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)

def cmd_check_images():
    """检查超过2MB的图片"""
    large_files = []
    for jpg in IMAGES_DIR.rglob("*.jpg"):
        size_mb = jpg.stat().st_size / (1024 * 1024)
        if size_mb > 2:
            large_files.append((jpg, size_mb))
    
    if large_files:
        print(f"⚠️ 发现 {len(large_files)} 个超过2MB的图片：")
        for path, size in sorted(large_files, key=lambda x: -x[1]):
            print(f"  {path} ({size:.2f}MB)")
        print("\n建议使用 https://tinypng.com 压缩")
    else:
        print("✅ 所有图片都在2MB以下")

def cmd_compress():
    """批量压缩JPG图片"""
    try:
        from PIL import Image
    except ImportError:
        print("❌ 需要安装Pillow库")
        print("   执行: pip install Pillow")
        return
    
    compressed = 0
    total_saved = 0
    
    for jpg in IMAGES_DIR.rglob("*.jpg"):
        try:
            img = Image.open(jpg)
            original_size = jpg.stat().st_size
            
            # 压缩到75%质量
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            
            img.save(jpg, 'JPEG', quality=75, optimize=True)
            
            new_size = jpg.stat().st_size
            saved = original_size - new_size
            
            if saved > 0:
                compressed += 1
                total_saved += saved
                print(f"  {jpg.name}: {original_size//1024}KB -> {new_size//1024}KB")
        
        except Exception as e:
            print(f"  ❌ {jpg.name}: {e}")
    
    print(f"\n✅ 压缩完成：{compressed} 个文件")
    print(f"💾 节省空间：{total_saved//1024}KB")

def cmd_open():
    """在浏览器中打开网站"""
    subprocess.run(["start", "https://TheCharon99.github.io/yier-studio/"], shell=True)

def cmd_open_css():
    """用记事本打开CSS文件"""
    subprocess.run(["notepad", str(CSS_FILE)], shell=True)

def cmd_open_detail():
    """用记事本打开项目详情页"""
    subprocess.run(["notepad", str(PROJECT_ROOT / "project-detail.html")], shell=True)

def main():
    if len(sys.argv) < 2:
        cmd_help()
        return
    
    command = sys.argv[1].lower()
    
    commands = {
        "help": cmd_help,
        "status": cmd_status,
        "add": lambda: cmd_add(sys.argv[2]) if len(sys.argv) > 2 else print("❌ 请提供项目名"),
        "commit": lambda: cmd_commit(sys.argv[2]) if len(sys.argv) > 2 else print("❌ 请提供提交说明"),
        "push": cmd_push,
        "check-images": cmd_check_images,
        "compress": cmd_compress,
        "open": cmd_open,
        "open-css": cmd_open_css,
        "open-detail": cmd_open_detail,
    }
    
    if command in commands:
        try:
            commands[command]()
        except Exception as e:
            print(f"❌ 错误：{e}")
    else:
        print(f"❌ 未知命令：{command}")
        cmd_help()

if __name__ == "__main__":
    main()
