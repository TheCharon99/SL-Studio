@echo off
chcp 936 >nul
cd /d E:\portfolio\yier-studio
echo.
echo ================================
echo   YiER Studio 操作菜单
echo ================================
echo.
echo 1. 查看状态
echo 2. 添加新项目
echo 3. 提交推送
echo 4. 检查图片
echo 5. 压缩图片
echo 6. 打开网站
echo 0. 退出
echo.
set /p choice="输入数字: "
if "%choice%"=="1" python batch_tools.py status
if "%choice%"=="2" (
    set /p name="项目名: "
    python batch_tools.py add "%name%"
)
if "%choice%"=="3" (
    set /p msg="说明: "
    python batch_tools.py commit "%msg%"
)
if "%choice%"=="4" python batch_tools.py check-images
if "%choice%"=="5" python batch_tools.py compress
if "%choice%"=="6" python batch_tools.py open
echo.
pause
