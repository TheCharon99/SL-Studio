@echo off
chcp 65001 >nul
title 懿贰设计网站 - 本地服务器
cd /d "%~dp0"
echo ========================================
echo   懿贰设计网站 - 本地服务器
echo ========================================
echo.
python server.py
pause
