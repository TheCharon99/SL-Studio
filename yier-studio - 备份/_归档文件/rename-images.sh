#!/bin/bash
# ========================================
# 懿贰设计 - 图片重命名脚本
# ========================================

cd "$(dirname "$0")/images"

echo "========================================"
echo "懿贰设计 - 图片重命名脚本"
echo "========================================"
echo ""

# 清理现有的临时文件
echo "[1] 清理现有临时文件..."
for f in 项目*.jpg; do
    if [ -f "$f" ]; then
        rm -f "$f"
        echo "  删除: $f"
    fi
done

# 重命名 banner 图片
echo ""
echo "[2] 重命名 banner 图片..."
mv banner1.jpg "项目-banner1.jpg" 2>/dev/null && echo "  banner1.jpg -> 项目-banner1.jpg"
mv banner2.jpg "项目-banner2.jpg" 2>/dev/null && echo "  banner2.jpg -> 项目-banner2.jpg"
mv banner3.jpg "项目-banner3.jpg" 2>/dev/null && echo "  banner3.jpg -> 项目-banner3.jpg"
mv banner4.jpg "项目-banner4.jpg" 2>/dev/null && echo "  banner4.jpg -> 项目-banner4.jpg"
mv banner5.jpg "项目-banner5.jpg" 2>/dev/null && echo "  banner5.jpg -> 项目-banner5.jpg"
mv banner6.jpg "项目-banner6.jpg" 2>/dev/null && echo "  banner6.jpg -> 项目-banner6.jpg"

# 重命名 detail 图片
echo ""
echo "[3] 重命名 detail 图片..."
mv detail_1.jpg "项目-detail1.jpg" 2>/dev/null && echo "  detail_1.jpg -> 项目-detail1.jpg"
mv detail_2.jpg "项目-detail2.jpg" 2>/dev/null && echo "  detail_2.jpg -> 项目-detail2.jpg"
mv detail_3.jpg "项目-detail3.jpg" 2>/dev/null && echo "  detail_3.jpg -> 项目-detail3.jpg"
mv detail_4.jpg "项目-detail4.jpg" 2>/dev/null && echo "  detail_4.jpg -> 项目-detail4.jpg"
mv detail_5.jpg "项目-detail5.jpg" 2>/dev/null && echo "  detail_5.jpg -> 项目-detail5.jpg"
mv detail_6.jpg "项目-detail6.jpg" 2>/dev/null && echo "  detail_6.jpg -> 项目-detail6.jpg"

# 重命名封面图
echo ""
echo "[4] 重命名封面图片..."
mv "院半户外艺术生活馆.jpg" "观唐府.jpg" 2>/dev/null && echo "  院半户外艺术生活馆.jpg -> 观唐府.jpg"
mv "杭州凤咏朝阳座.jpg" "金山豪庭.jpg" 2>/dev/null && echo "  杭州凤咏朝阳座.jpg -> 金山豪庭.jpg"
mv "中海·恒昌玖里.jpg" "星愉湾-现代意式.jpg" 2>/dev/null && echo "  中海·恒昌玖里.jpg -> 星愉湾-现代意式.jpg"
mv "融创外滩壹号院.jpg" "星愉湾-轻法式.jpg" 2>/dev/null && echo "  融创外滩壹号院.jpg -> 星愉湾-轻法式.jpg"
mv "成都金融城·锦宸府.jpg" "星愉湾-现代极简.jpg" 2>/dev/null && echo "  成都金融城·锦宸府.jpg -> 星愉湾-现代极简.jpg"
mv "上海壹号院.jpg" "中山文化苑.jpg" 2>/dev/null && echo "  上海壹号院.jpg -> 中山文化苑.jpg"
mv "三亚华润海棠悦府.jpg" "凤凰城.jpg" 2>/dev/null && echo "  三亚华润海棠悦府.jpg -> 凤凰城.jpg"
mv "汤臣君品瑄廷.jpg" "国宸府.jpg" 2>/dev/null && echo "  汤臣君品瑄廷.jpg -> 国宸府.jpg"
mv "顺德澐璟.jpg" "国印东方.jpg" 2>/dev/null && echo "  顺德澐璟.jpg -> 国印东方.jpg"
mv "西安浐灞玺宸上院.jpg" "项目10.jpg" 2>/dev/null && echo "  西安浐灞玺宸上院.jpg -> 项目10.jpg"
mv "汤臣君品.jpg" "项目11.jpg" 2>/dev/null && echo "  汤臣君品.jpg -> 项目11.jpg"
mv "懿贰设计自宅.jpg" "项目12.jpg" 2>/dev/null && echo "  懿贰设计自宅.jpg -> 项目12.jpg"
mv "懿贰设计度假屋.jpg" "项目13.jpg" 2>/dev/null && echo "  懿贰设计度假屋.jpg -> 项目13.jpg"
mv "两日半.jpg" "项目14.jpg" 2>/dev/null && echo "  两日半.jpg -> 项目14.jpg"
mv "吴滨安吉度假屋.jpg" "项目15.jpg" 2>/dev/null && echo "  吴滨安吉度假屋.jpg -> 项目15.jpg"
mv "吴滨武康路自宅.jpg" "项目16.jpg" 2>/dev/null && echo "  吴滨武康路自宅.jpg -> 项目16.jpg"
mv "上海露香园.jpg" "项目17.jpg" 2>/dev/null && echo "  上海露香园.jpg -> 项目17.jpg"
mv "德钦梅里泊度酒店.jpg" "项目18.jpg" 2>/dev/null && echo "  德钦梅里泊度酒店.jpg -> 项目18.jpg"

# 重命名详情图
echo ""
echo "[5] 重命名详情图片..."

# 西安浐灞玺宸上院 -> 观唐府
for i in 1 2 3 4 5 6 7; do
    mv "西安浐灞玺宸上院_${i}.jpg" "观唐府-${i}.jpg" 2>/dev/null && echo "  西安浐灞玺宸上院_${i}.jpg -> 观唐府-${i}.jpg"
done

# 院半户外艺术生活馆 -> 金山豪庭
for i in 1 2 3 4 5 6 7; do
    mv "院半户外艺术生活馆_${i}.jpg" "金山豪庭-${i}.jpg" 2>/dev/null && echo "  院半户外艺术生活馆_${i}.jpg -> 金山豪庭-${i}.jpg"
done

# 上海壹号院 -> 星愉湾-现代意式
for i in 1 2 3 4 5 6 7; do
    mv "上海壹号院_${i}.jpg" "星愉湾-现代意式-${i}.jpg" 2>/dev/null && echo "  上海壹号院_${i}.jpg -> 星愉湾-现代意式-${i}.jpg"
done

# 汤臣君品 -> 星愉湾-轻法式
for i in 1 2 3 4 5 6 7; do
    mv "汤臣君品_${i}.jpg" "星愉湾-轻法式-${i}.jpg" 2>/dev/null && echo "  汤臣君品_${i}.jpg -> 星愉湾-轻法式-${i}.jpg"
done

# 汤臣君品瑄廷 -> 星愉湾-现代极简
for i in 1 2 3 4 5 6 7; do
    mv "汤臣君品瑄廷_${i}.jpg" "星愉湾-现代极简-${i}.jpg" 2>/dev/null && echo "  汤臣君品瑄廷_${i}.jpg -> 星愉湾-现代极简-${i}.jpg"
done

# 懿贰设计自宅 -> 中山文化苑
for i in 1 2 3 4 5 6 7; do
    mv "懿贰设计自宅_${i}.jpg" "中山文化苑-${i}.jpg" 2>/dev/null && echo "  懿贰设计自宅_${i}.jpg -> 中山文化苑-${i}.jpg"
done

# 懿贰设计度假屋 -> 凤凰城
for i in 1 2 3 4 5 6 7; do
    mv "懿贰设计度假屋_${i}.jpg" "凤凰城-${i}.jpg" 2>/dev/null && echo "  懿贰设计度假屋_${i}.jpg -> 凤凰城-${i}.jpg"
done

# 融创外滩壹号院 -> 国宸府
for i in 1 2 3 4 5 6 7; do
    mv "融创外滩壹号院_${i}.jpg" "国宸府-${i}.jpg" 2>/dev/null && echo "  融创外滩壹号院_${i}.jpg -> 国宸府-${i}.jpg"
done

# 两日半 -> 国印东方
for i in 1 2 3 4 5 6 7; do
    mv "两日半_${i}.jpg" "国印东方-${i}.jpg" 2>/dev/null && echo "  两日半_${i}.jpg -> 国印东方-${i}.jpg"
done

# 顺德澐璟 -> 项目10
for i in 1 2 3 4 5 6 7; do
    mv "顺德澐璟_${i}.jpg" "项目10-${i}.jpg" 2>/dev/null && echo "  顺德澐璟_${i}.jpg -> 项目10-${i}.jpg"
done

# 中海恒昌玖里 -> 项目11
for i in 1 2 3 4 5 6 7; do
    mv "中海恒昌玖里_${i}.jpg" "项目11-${i}.jpg" 2>/dev/null && echo "  中海恒昌玖里_${i}.jpg -> 项目11-${i}.jpg"
done

# 德钦梅里泊度酒店 -> 项目12
for i in 1 2 3 4 5 6 7; do
    mv "德钦梅里泊度酒店_${i}.jpg" "项目12-${i}.jpg" 2>/dev/null && echo "  德钦梅里泊度酒店_${i}.jpg -> 项目12-${i}.jpg"
done

# 上海露香园 -> 项目13
for i in 1 2 3 4 5 6 7; do
    mv "上海露香园_${i}.jpg" "项目13-${i}.jpg" 2>/dev/null && echo "  上海露香园_${i}.jpg -> 项目13-${i}.jpg"
done

# 三亚华润海棠悦府 -> 项目14
for i in 1 2 3 4 5 6 7; do
    mv "三亚华润海棠悦府_${i}.jpg" "项目14-${i}.jpg" 2>/dev/null && echo "  三亚华润海棠悦府_${i}.jpg -> 项目14-${i}.jpg"
done

# 杭州凤咏朝阳座 -> 项目15
for i in 1 2 3 4 5 6 7; do
    mv "杭州凤咏朝阳座_${i}.jpg" "项目15-${i}.jpg" 2>/dev/null && echo "  杭州凤咏朝阳座_${i}.jpg -> 项目15-${i}.jpg"
done

# 成都金融城·锦宸府 -> 项目16
for i in 1 2 3 4 5 6 7; do
    mv "成都金融城·锦宸府_${i}.jpg" "项目16-${i}.jpg" 2>/dev/null && echo "  成都金融城·锦宸府_${i}.jpg -> 项目16-${i}.jpg"
done

echo ""
echo "========================================"
echo "图片重命名完成！"
echo "========================================"
echo ""
echo "下一步：请更新 project-detail.html 中的图片引用"
echo "运行: ./update-html.sh"
