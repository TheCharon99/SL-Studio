#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""懿贰设计网站 - 本地服务器 (端口 8888)"""
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

sys.stdout.reconfigure(encoding='utf-8')

PORT = 8888
ROOT_DIR = Path(__file__).parent

def get_local_ip():
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
    
    # 先尝试 UTF-8 解码
    try:
        decoded = urllib.parse.unquote(path)
        # 检查解码后的路径是否存在
        full_path = ROOT_DIR / decoded
        if full_path.exists():
            return decoded
    except:
        pass
    
    # 尝试 GBK 解码（Windows 常见编码）
    try:
        # 将 %XX 转换为字节
        byte_str = bytearray()
        i = 0
        while i < len(path):
            if path[i] == '%' and i + 2 < len(path):
                hex_str = path[i+1:i+3]
                try:
                    byte_str.append(int(hex_str, 16))
                    i += 3
                    continue
                except ValueError:
                    pass
            byte_str.append(ord(path[i]))
            i += 1
        
        # 尝试 GBK 解码
        decoded = byte_str.decode('gbk')
        full_path = ROOT_DIR / decoded
        if full_path.exists():
            return decoded
    except:
        pass
    
    # 回退：直接返回原始路径（去除 % 编码）
    return path

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        """重写路径翻译方法，支持中文路径"""
        # 先移除 URL 编码部分，只保留路径
        if '?' in path:
            path = path.split('?')[0]
        
        # 解码路径
        decoded_path = decode_path(path)
        
        # 构建完整路径
        file_path = ROOT_DIR / decoded_path
        
        # 安全检查：防止路径穿越
        if not file_path.resolve().is_relative_to(ROOT_DIR.resolve()):
            return ''
        
        return str(file_path)
    
    def log_message(self, format, *args):
        """自定义日志输出，显示解码后的路径"""
        path = args[0] if args else ''
        sys.stderr.write(f"{self.address_string()} - {path}\n")
        sys.stderr.flush()

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

if __name__ == "__main__":
    # 获取本地 IP
    ip = get_local_ip()
    print_banner(ip)
    
    # 设置服务器
    socketserver.TCPServer.allow_reuse_address = True
    httpd = ReusableTCPServer(("", PORT), MyHandler)
    
    # 在新线程中启动服务器
    server_thread = threading.Thread(target=httpd.serve_forever)
    server_thread.daemon = True
    server_thread.start()
    
    print(f"服务器已启动，监听端口 {PORT}")
    print(f"按 Ctrl+C 停止服务器")
    
    try:
        # 保持主线程运行
        while True:
            pass
    except KeyboardInterrupt:
        print("\n正在停止服务器...")
        httpd.shutdown()
        httpd.server_close()
        print("服务器已停止")
