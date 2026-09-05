# 懿贰设计 - 图片重命名完整脚本
# 在 PowerShell 中运行此脚本

$basePath = "E:\portfolio\yier-studio\images"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "懿贰设计 - 图片重命名脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 清理现有的临时文件
Write-Host "[1] 清理现有临时文件..." -ForegroundColor Yellow
$existing = Get-ChildItem $basePath -Filter "项目*.jpg" -ErrorAction SilentlyContinue
foreach ($f in $existing) {
    Remove-Item $f.FullName -Force -ErrorAction SilentlyContinue
    Write-Host "  删除: $($f.Name)"
}

# 定义项目映射
# 格式: 旧名称 -> 新名称
$mappings = @(
    # 封面图映射
    @{old="院半户外艺术生活馆.jpg"; new="观唐府.jpg"},
    @{old="杭州凤咏朝阳座.jpg"; new="金山豪庭.jpg"},
    @{old="中海·恒昌玖里.jpg"; new="星愉湾-现代意式.jpg"},
    @{old="融创外滩壹号院.jpg"; new="星愉湾-轻法式.jpg"},
    @{old="成都金融城·锦宸府.jpg"; new="星愉湾-现代极简.jpg"},
    @{old="上海壹号院.jpg"; new="中山文化苑.jpg"},
    @{old="三亚华润海棠悦府.jpg"; new="凤凰城.jpg"},
    @{old="汤臣君品瑄廷.jpg"; new="国宸府.jpg"},
    @{old="顺德澐璟.jpg"; new="国印东方.jpg"},
    @{old="西安浐灞玺宸上院.jpg"; new="项目10.jpg"},
    @{old="汤臣君品.jpg"; new="项目11.jpg"},
    @{old="懿贰设计自宅.jpg"; new="项目12.jpg"},
    @{old="懿贰设计度假屋.jpg"; new="项目13.jpg"},
    @{old="两日半.jpg"; new="项目14.jpg"},
    @{old="吴滨安吉度假屋.jpg"; new="项目15.jpg"},
    @{old="吴滨武康路自宅.jpg"; new="项目16.jpg"},
    @{old="上海露香园.jpg"; new="项目17.jpg"},
    @{old="德钦梅里泊度酒店.jpg"; new="项目18.jpg"}
)

# 执行封面图重命名
Write-Host ""
Write-Host "[2] 重命名封面图片..." -ForegroundColor Yellow
foreach ($map in $mappings) {
    $oldPath = Join-Path $basePath $map.old
    $newPath = Join-Path $basePath $map.new

    if (Test-Path $oldPath) {
        if (-not (Test-Path $newPath)) {
            Move-Item $oldPath $newPath -Force
            Write-Host "  $($map.old) -> $($map.new)" -ForegroundColor Green
        } else {
            Write-Host "  [跳过] $($map.new) 已存在" -ForegroundColor DarkYellow
        }
    } else {
        Write-Host "  [跳过] $($map.old) 不存在" -ForegroundColor DarkGray
    }
}

# 定义详情图映射（每个项目7张）
$detailMappings = @(
    # 西安浐灞玺宸上院 -> 观唐府
    @{old="西安浐灞玺宸上院_1.jpg"; new="观唐府-1.jpg"},
    @{old="西安浐灞玺宸上院_2.jpg"; new="观唐府-2.jpg"},
    @{old="西安浐灞玺宸上院_3.jpg"; new="观唐府-3.jpg"},
    @{old="西安浐灞玺宸上院_4.jpg"; new="观唐府-4.jpg"},
    @{old="西安浐灞玺宸上院_5.jpg"; new="观唐府-5.jpg"},
    @{old="西安浐灞玺宸上院_6.jpg"; new="观唐府-6.jpg"},
    @{old="西安浐灞玺宸上院_7.jpg"; new="观唐府-7.jpg"},
    # 院半户外艺术生活馆 -> 金山豪庭
    @{old="院半户外艺术生活馆_1.jpg"; new="金山豪庭-1.jpg"},
    @{old="院半户外艺术生活馆_2.jpg"; new="金山豪庭-2.jpg"},
    @{old="院半户外艺术生活馆_3.jpg"; new="金山豪庭-3.jpg"},
    @{old="院半户外艺术生活馆_4.jpg"; new="金山豪庭-4.jpg"},
    @{old="院半户外艺术生活馆_5.jpg"; new="金山豪庭-5.jpg"},
    @{old="院半户外艺术生活馆_6.jpg"; new="金山豪庭-6.jpg"},
    @{old="院半户外艺术生活馆_7.jpg"; new="金山豪庭-7.jpg"},
    # 上海壹号院 -> 星愉湾-现代意式
    @{old="上海壹号院_1.jpg"; new="星愉湾-现代意式-1.jpg"},
    @{old="上海壹号院_2.jpg"; new="星愉湾-现代意式-2.jpg"},
    @{old="上海壹号院_3.jpg"; new="星愉湾-现代意式-3.jpg"},
    @{old="上海壹号院_4.jpg"; new="星愉湾-现代意式-4.jpg"},
    @{old="上海壹号院_5.jpg"; new="星愉湾-现代意式-5.jpg"},
    @{old="上海壹号院_6.jpg"; new="星愉湾-现代意式-6.jpg"},
    @{old="上海壹号院_7.jpg"; new="星愉湾-现代意式-7.jpg"},
    # 汤臣君品 -> 星愉湾-轻法式
    @{old="汤臣君品_1.jpg"; new="星愉湾-轻法式-1.jpg"},
    @{old="汤臣君品_2.jpg"; new="星愉湾-轻法式-2.jpg"},
    @{old="汤臣君品_3.jpg"; new="星愉湾-轻法式-3.jpg"},
    @{old="汤臣君品_4.jpg"; new="星愉湾-轻法式-4.jpg"},
    @{old="汤臣君品_5.jpg"; new="星愉湾-轻法式-5.jpg"},
    @{old="汤臣君品_6.jpg"; new="星愉湾-轻法式-6.jpg"},
    @{old="汤臣君品_7.jpg"; new="星愉湾-轻法式-7.jpg"},
    # 汤臣君品瑄廷 -> 星愉湾-现代极简
    @{old="汤臣君品瑄廷_1.jpg"; new="星愉湾-现代极简-1.jpg"},
    @{old="汤臣君品瑄廷_2.jpg"; new="星愉湾-现代极简-2.jpg"},
    @{old="汤臣君品瑄廷_3.jpg"; new="星愉湾-现代极简-3.jpg"},
    @{old="汤臣君品瑄廷_4.jpg"; new="星愉湾-现代极简-4.jpg"},
    @{old="汤臣君品瑄廷_5.jpg"; new="星愉湾-现代极简-5.jpg"},
    @{old="汤臣君品瑄廷_6.jpg"; new="星愉湾-现代极简-6.jpg"},
    @{old="汤臣君品瑄廷_7.jpg"; new="星愉湾-现代极简-7.jpg"},
    # 懿贰设计自宅 -> 中山文化苑
    @{old="懿贰设计自宅_1.jpg"; new="中山文化苑-1.jpg"},
    @{old="懿贰设计自宅_2.jpg"; new="中山文化苑-2.jpg"},
    @{old="懿贰设计自宅_3.jpg"; new="中山文化苑-3.jpg"},
    @{old="懿贰设计自宅_4.jpg"; new="中山文化苑-4.jpg"},
    @{old="懿贰设计自宅_5.jpg"; new="中山文化苑-5.jpg"},
    @{old="懿贰设计自宅_6.jpg"; new="中山文化苑-6.jpg"},
    @{old="懿贰设计自宅_7.jpg"; new="中山文化苑-7.jpg"},
    # 懿贰设计度假屋 -> 凤凰城
    @{old="懿贰设计度假屋_1.jpg"; new="凤凰城-1.jpg"},
    @{old="懿贰设计度假屋_2.jpg"; new="凤凰城-2.jpg"},
    @{old="懿贰设计度假屋_3.jpg"; new="凤凰城-3.jpg"},
    @{old="懿贰设计度假屋_4.jpg"; new="凤凰城-4.jpg"},
    @{old="懿贰设计度假屋_5.jpg"; new="凤凰城-5.jpg"},
    @{old="懿贰设计度假屋_6.jpg"; new="凤凰城-6.jpg"},
    @{old="懿贰设计度假屋_7.jpg"; new="凤凰城-7.jpg"},
    # 融创外滩壹号院 -> 国宸府
    @{old="融创外滩壹号院_1.jpg"; new="国宸府-1.jpg"},
    @{old="融创外滩壹号院_2.jpg"; new="国宸府-2.jpg"},
    @{old="融创外滩壹号院_3.jpg"; new="国宸府-3.jpg"},
    @{old="融创外滩壹号院_4.jpg"; new="国宸府-4.jpg"},
    @{old="融创外滩壹号院_5.jpg"; new="国宸府-5.jpg"},
    @{old="融创外滩壹号院_6.jpg"; new="国宸府-6.jpg"},
    @{old="融创外滩壹号院_7.jpg"; new="国宸府-7.jpg"},
    # 两日半 -> 国印东方
    @{old="两日半_1.jpg"; new="国印东方-1.jpg"},
    @{old="两日半_2.jpg"; new="国印东方-2.jpg"},
    @{old="两日半_3.jpg"; new="国印东方-3.jpg"},
    @{old="两日半_4.jpg"; new="国印东方-4.jpg"},
    @{old="两日半_5.jpg"; new="国印东方-5.jpg"},
    @{old="两日半_6.jpg"; new="国印东方-6.jpg"},
    @{old="两日半_7.jpg"; new="国印东方-7.jpg"},
    # 顺德澐璟 -> 项目10
    @{old="顺德澐璟_1.jpg"; new="项目10-1.jpg"},
    @{old="顺德澐璟_2.jpg"; new="项目10-2.jpg"},
    @{old="顺德澐璟_3.jpg"; new="项目10-3.jpg"},
    @{old="顺德澐璟_4.jpg"; new="项目10-4.jpg"},
    @{old="顺德澐璟_5.jpg"; new="项目10-5.jpg"},
    @{old="顺德澐璟_6.jpg"; new="项目10-6.jpg"},
    @{old="顺德澐璟_7.jpg"; new="项目10-7.jpg"},
    # 中海恒昌玖里 -> 项目11
    @{old="中海恒昌玖里_1.jpg"; new="项目11-1.jpg"},
    @{old="中海恒昌玖里_2.jpg"; new="项目11-2.jpg"},
    @{old="中海恒昌玖里_3.jpg"; new="项目11-3.jpg"},
    @{old="中海恒昌玖里_4.jpg"; new="项目11-4.jpg"},
    @{old="中海恒昌玖里_5.jpg"; new="项目11-5.jpg"},
    @{old="中海恒昌玖里_6.jpg"; new="项目11-6.jpg"},
    @{old="中海恒昌玖里_7.jpg"; new="项目11-7.jpg"},
    # 德钦梅里泊度酒店 -> 项目12
    @{old="德钦梅里泊度酒店_1.jpg"; new="项目12-1.jpg"},
    @{old="德钦梅里泊度酒店_2.jpg"; new="项目12-2.jpg"},
    @{old="德钦梅里泊度酒店_3.jpg"; new="项目12-3.jpg"},
    @{old="德钦梅里泊度酒店_4.jpg"; new="项目12-4.jpg"},
    @{old="德钦梅里泊度酒店_5.jpg"; new="项目12-5.jpg"},
    @{old="德钦梅里泊度酒店_6.jpg"; new="项目12-6.jpg"},
    @{old="德钦梅里泊度酒店_7.jpg"; new="项目12-7.jpg"},
    # 上海露香园 -> 项目13
    @{old="上海露香园_1.jpg"; new="项目13-1.jpg"},
    @{old="上海露香园_2.jpg"; new="项目13-2.jpg"},
    @{old="上海露香园_3.jpg"; new="项目13-3.jpg"},
    @{old="上海露香园_4.jpg"; new="项目13-4.jpg"},
    @{old="上海露香园_5.jpg"; new="项目13-5.jpg"},
    @{old="上海露香园_6.jpg"; new="项目13-6.jpg"},
    @{old="上海露香园_7.jpg"; new="项目13-7.jpg"},
    # 三亚华润海棠悦府 -> 项目14
    @{old="三亚华润海棠悦府_1.jpg"; new="项目14-1.jpg"},
    @{old="三亚华润海棠悦府_2.jpg"; new="项目14-2.jpg"},
    @{old="三亚华润海棠悦府_3.jpg"; new="项目14-3.jpg"},
    @{old="三亚华润海棠悦府_4.jpg"; new="项目14-4.jpg"},
    @{old="三亚华润海棠悦府_5.jpg"; new="项目14-5.jpg"},
    @{old="三亚华润海棠悦府_6.jpg"; new="项目14-6.jpg"},
    @{old="三亚华润海棠悦府_7.jpg"; new="项目14-7.jpg"},
    # 杭州凤咏朝阳座 -> 项目15
    @{old="杭州凤咏朝阳座_1.jpg"; new="项目15-1.jpg"},
    @{old="杭州凤咏朝阳座_2.jpg"; new="项目15-2.jpg"},
    @{old="杭州凤咏朝阳座_3.jpg"; new="项目15-3.jpg"},
    @{old="杭州凤咏朝阳座_4.jpg"; new="项目15-4.jpg"},
    @{old="杭州凤咏朝阳座_5.jpg"; new="项目15-5.jpg"},
    @{old="杭州凤咏朝阳座_6.jpg"; new="项目15-6.jpg"},
    @{old="杭州凤咏朝阳座_7.jpg"; new="项目15-7.jpg"},
    # 成都金融城·锦宸府 -> 项目16
    @{old="成都金融城·锦宸府_1.jpg"; new="项目16-1.jpg"},
    @{old="成都金融城·锦宸府_2.jpg"; new="项目16-2.jpg"},
    @{old="成都金融城·锦宸府_3.jpg"; new="项目16-3.jpg"},
    @{old="成都金融城·锦宸府_4.jpg"; new="项目16-4.jpg"},
    @{old="成都金融城·锦宸府_5.jpg"; new="项目16-5.jpg"},
    @{old="成都金融城·锦宸府_6.jpg"; new="项目16-6.jpg"},
    @{old="成都金融城·锦宸府_7.jpg"; new="项目16-7.jpg"}
)

# 执行详情图重命名
Write-Host ""
Write-Host "[3] 重命名详情图片..." -ForegroundColor Yellow
foreach ($map in $detailMappings) {
    $oldPath = Join-Path $basePath $map.old
    $newPath = Join-Path $basePath $map.new

    if (Test-Path $oldPath) {
        if (-not (Test-Path $newPath)) {
            Move-Item $oldPath $newPath -Force
            Write-Host "  $($map.old) -> $($map.new)" -ForegroundColor Green
        } else {
            Write-Host "  [跳过] $($map.new) 已存在" -ForegroundColor DarkYellow
        }
    }
}

# 重命名 banner 和 detail 图
Write-Host ""
Write-Host "[4] 重命名 banner 和 detail 图片..." -ForegroundColor Yellow
$specialMappings = @(
    @{old="banner1.jpg"; new="项目-banner1.jpg"},
    @{old="banner2.jpg"; new="项目-banner2.jpg"},
    @{old="banner3.jpg"; new="项目-banner3.jpg"},
    @{old="banner4.jpg"; new="项目-banner4.jpg"},
    @{old="banner5.jpg"; new="项目-banner5.jpg"},
    @{old="banner6.jpg"; new="项目-banner6.jpg"},
    @{old="detail_1.jpg"; new="项目-detail1.jpg"},
    @{old="detail_2.jpg"; new="项目-detail2.jpg"},
    @{old="detail_3.jpg"; new="项目-detail3.jpg"},
    @{old="detail_4.jpg"; new="项目-detail4.jpg"},
    @{old="detail_5.jpg"; new="项目-detail5.jpg"},
    @{old="detail_6.jpg"; new="项目-detail6.jpg"}
)

foreach ($map in $specialMappings) {
    $oldPath = Join-Path $basePath $map.old
    $newPath = Join-Path $basePath $map.new

    if (Test-Path $oldPath) {
        if (-not (Test-Path $newPath)) {
            Move-Item $oldPath $newPath -Force
            Write-Host "  $($map.old) -> $($map.new)" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "重命名完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "下一步：请更新 project-detail.html 中的图片引用" -ForegroundColor Yellow
