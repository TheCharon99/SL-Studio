#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
懿贰设计网站 - 本地局域网服务器
用法：python server.py
访问：http://localhost:8888 或 http://局域网IP:8888
"""

import http.server
import socketserver
import os
import socket
import threading
import webbrowser
from pathlib import Path
import urllib.parse
import sys
import re

# 设置标准输出编码
sys.stdout.reconfigure(encoding='utf-8')

PORT = 8888
ROOT_DIR = Path(__file__).parent

def get_local_ip():
    """获取局域网IP地址"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

def print_banner(ip):
    print()
    print("=" * 50)
    print("  懿贰设计网站 - 本地服务器")
    print("=" * 50)
    print()
    print(f"  本地访问：http://localhost:{PORT}")
    print(f"  局域网访问：http://{ip}:{PORT}")
    print()
    print("  按 Ctrl+C 停止服务器")
    print("=" * 50)
    print()

def decode_path(path):
    """解码路径，支持 UTF-8 和 GBK 编码"""
    # 移除查询字符串
    if '?' in path:
        path = path.split('?')[0]
    
    # 移除开头的斜杠
    if path.startswith('/'):
        path = path[1:]
    
    # 移除开头的空白
    path = path.lstrip()
    
    # 尝试 UTF-8 解码
    try:
        decoded = urllib.parse.unquote(path)
        # 检查是否解码成功（如果包含乱码字符，尝试 GBK）
        if '%' not in decoded and all(ord(c) < 128 or c.isprintable() for c in decoded):
            return decoded
    except:
        pass
    
    # 尝试 GBK 解码
    try:
        # 将 %XX 序列转换为字节
        byte_str = path.replace('%', '\\x').encode('ascii')
        return byte_str.decode('gbk')
    except:
        pass
    
    # 最后尝试 UTF-8
    return path

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT_DIR), **kwargs)
    
    def log_message(self, format, *args):
        # 静默日志
        pass
    
    def translate_path(self, path):
        """重写路径翻译，正确处理中文路径"""
        # 记录原始路径
        self.path = path
        
        # 解码路径
        decoded_path = decode_path(path)
        
        # 返回完整路径
        return str(ROOT_DIR / decoded_path)
    
    def send_error(self, code, message=None, explain=None):
        """重写错误处理"""
        if code == 404:
            print(f"404 - 请求: {getattr(self, 'path', 'N/A')}")
            print(f"404 - 解码: {decode_path(getattr(self, 'path', ''))}")
        super().send_error(code, message, explain)

def open_browser(ip):
    """延迟打开浏览器"""
    threading.Timer(0.5, lambda: webbrowser.open(f"http://{ip}:{PORT}")).start()

def main():
    ip = get_local_ip()
    print_banner(ip)
    open_browser(ip)
    
    # 设置目录
    os.chdir(ROOT_DIR)
    
    # 创建处理器
    handler = QuietHandler
    
    # 启动服务器
    with socketserver.TCPServer(("0.0.0.0", PORT), handler) as httpd:
        print(f"服务器已启动，等待访问...")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n服务器已停止")

if __name__ == "__main__":
    main()
