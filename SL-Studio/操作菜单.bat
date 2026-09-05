@echo off
chcp 65001 >nul
cd /d E:\portfolio\yier-studio
echo.
echo ========================================
echo    YiER Studio 快捷操作菜单
echo ========================================
echo.
echo  [1] 查看Git状态
echo  [2] 创建新项目
echo  [3] 提交并推送
echo  [4] 仅推送
echo  [5] 检查大图
echo  [6] 批量压缩图片
echo  [7] 打开网站
echo  [8] 打开教程
echo  [9] 打开CSS文件
echo [10] 打开项目详情
echo [0] 退出
echo.
set /p choice="请输入选项: "
if "%choice%"=="1" python batch_tools.py status
if "%choice%"=="2" (
    set /p name="请输入项目名（如：紫金府-现代简约）: "
    python batch_tools.py add "%name%"
)
if "%choice%"=="3" (
    set /p msg="请输入提交说明: "
    python batch_tools.py commit "%msg%"
)
if "%choice%"=="4" python batch_tools.py push
if "%choice%"=="5" python batch_tools.py check-images
if "%choice%"=="6" python batch_tools.py compress
if "%choice%"=="7" python batch_tools.py open
if "%choice%"=="8" start https://TheCharon99.github.io/yier-studio/教程.html
if "%choice%"=="9" python batch_tools.py open-css
if "%choice%"=="10" python batch_tools.py open-detail
echo.
pause
