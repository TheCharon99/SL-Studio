#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""转换所有 HTML/CSS/JS 文件为 UTF-8 without BOM, LF 换行"""
import os
import glob

def convert_file(filepath):
    """转换单个文件"""
    try:
        # 读取文件内容
        with open(filepath, 'rb') as f:
            content = f.read()
        
        # 移除 BOM
        if content.startswith(b'\xef\xbb\xbf'):
            content = content[3:]
        
        # 转换为 UTF-8
        try:
            text = content.decode('utf-8')
        except UnicodeDecodeError:
            text = content.decode('gbk')
        
        # 转换换行符
        text = text.replace('\r\n', '\n').replace('\r', '\n')
        
        # 写回文件
        with open(filepath, 'wb') as f:
            f.write(text.encode('utf-8'))
        
        return True
    except Exception as e:
        print(f"Error converting {filepath}: {e}")
        return False

def main():
    """主函数"""
    base_path = r"E:/portfolio/yier-studio"
    
    # 要转换的文件类型
    extensions = ['*.html', '*.css', '*.js', '*.json', '*.md']
    
    converted = 0
    for ext in extensions:
        pattern = os.path.join(base_path, '**', ext)
        for filepath in glob.glob(pattern, recursive=True):
            # 跳过归档和多余文件
            if '_归档文件' in filepath or '_多余文件' in filepath:
                continue
            
            if convert_file(filepath):
                print(f"Converted: {filepath}")
                converted += 1
    
    print(f"\nTotal converted: {converted} files")

if __name__ == '__main__':
    main()
