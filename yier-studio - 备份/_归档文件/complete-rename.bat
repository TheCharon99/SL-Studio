@echo off
chcp 65001 >nul
echo ========================================
echo 懿贰设计 - 图片重命名完成脚本
echo ========================================
echo.
echo 正在执行重命名...
echo.
powershell -ExecutionPolicy Bypass -Command ^
    "$base = 'E:\portfolio\yier-studio\images'; ^
    $covers = @('杭州凤咏朝阳座.jpg', '中海·恒昌玖里.jpg', '成都金融城·锦宸府.jpg', '三亚华润海棠悦府.jpg', '顺德澐璟.jpg', '吴滨安吉度假屋.jpg', '吴滨武康路自宅.jpg', '上海露香园.jpg', '德钦梅里泊度酒店.jpg'); ^
    for ($i = 0; $i -lt $covers.Count; $i++) { ^
        $old = $covers[$i]; ^
        $new = '项目' + ($i + 10) + '.jpg'; ^
        $oldPath = Join-Path $base $old; ^
        $newPath = Join-Path $base $new; ^
        if (Test-Path $oldPath) { Move-Item $oldPath $newPath -Force; Write-Host ('  ' + $old + ' -> ' + $new); } ^
    }; ^
    $details = @('detail_1.jpg', 'detail_2.jpg', 'detail_3.jpg', 'detail_4.jpg', 'detail_5.jpg', 'detail_6.jpg'); ^
    for ($i = 0; $i -lt $details.Count; $i++) { ^
        $old = $details[$i]; ^
        $new = '项目-detail' + ($i + 1) + '.jpg'; ^
        $oldPath = Join-Path $base $old; ^
        $newPath = Join-Path $base $new; ^
        if (Test-Path $oldPath) { Move-Item $oldPath $newPath -Force; Write-Host ('  ' + $old + ' -> ' + $new); } ^
    }; ^
    Write-Host ''; Write-Host '完成！' -ForegroundColor Green"
echo.
pause
