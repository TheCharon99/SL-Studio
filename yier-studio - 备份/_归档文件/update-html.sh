#!/bin/bash
# ========================================
# 懿贰设计 - 更新 HTML 中的图片引用
# ========================================

HTML_FILE="$(dirname "$0")/project-detail.html"

echo "========================================"
echo "更新 HTML 中的图片引用"
echo "========================================"
echo ""

# 使用 sed 替换图片路径
# 将 banner1-6.jpg 替换为对应的图片

echo "[1] 更新项目图片引用..."

# 观唐府
sed -i "s|banner1.jpg|项目-banner1.jpg|g" "$HTML_FILE" 2>/dev/null
sed -i "s|banner2.jpg|项目-banner2.jpg|g" "$HTML_FILE" 2>/dev/null
sed -i "s|banner3.jpg|项目-banner3.jpg|g" "$HTML_FILE" 2>/dev/null
sed -i "s|banner4.jpg|项目-banner4.jpg|g" "$HTML_FILE" 2>/dev/null
sed -i "s|banner5.jpg|项目-banner5.jpg|g" "$HTML_FILE" 2>/dev/null
sed -i "s|banner6.jpg|项目-banner6.jpg|g" "$HTML_FILE" 2>/dev/null

# 更精确的替换 - 按项目顺序
# 注意：由于项目图片引用是循环的，需要特殊处理

echo ""
echo "========================================"
echo "HTML 更新完成！"
echo "========================================"
echo ""
echo "请检查 project-detail.html 中的图片引用是否正确"
