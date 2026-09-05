@echo off
chcp 65001 >nul
echo ========================================
echo 更新 HTML 中的图片引用
echo ========================================
echo.

set "BASE_PATH=E:\portfolio\yier-studio"

:: 更新 project-detail.html
echo [1] 更新 project-detail.html...
powershell -ExecutionPolicy Bypass -Command ^
    "$file = '%BASE_PATH%\project-detail.html'; ^
    $content = Get-Content $file -Raw -Encoding UTF8; ^
    $projects = @{ ^
        '观唐府' = @('banner1.jpg','banner2.jpg','banner3.jpg','banner4.jpg','banner5.jpg','banner6.jpg','banner1.jpg','banner2.jpg','banner3.jpg','banner4.jpg'); ^
        '金山豪庭' = @('banner2.jpg','banner3.jpg','banner4.jpg','banner5.jpg','banner6.jpg','banner1.jpg','banner2.jpg','banner3.jpg','banner4.jpg','banner5.jpg'); ^
        '星愉湾-现代意式' = @('banner3.jpg','banner4.jpg','banner5.jpg','banner6.jpg','banner1.jpg','banner2.jpg','banner3.jpg','banner4.jpg','banner5.jpg','banner6.jpg'); ^
        '星愉湾-轻法式' = @('banner4.jpg','banner5.jpg','banner6.jpg','banner1.jpg','banner2.jpg','banner3.jpg','banner4.jpg','banner5.jpg','banner6.jpg','banner1.jpg'); ^
        '星愉湾-现代极简' = @('banner5.jpg','banner6.jpg','banner1.jpg','banner2.jpg','banner3.jpg','banner4.jpg','banner5.jpg','banner6.jpg','banner1.jpg','banner2.jpg'); ^
        '中山文化苑' = @('banner6.jpg','banner1.jpg','banner2.jpg','banner3.jpg','banner4.jpg','banner5.jpg','banner6.jpg','banner1.jpg','banner2.jpg','banner3.jpg'); ^
        '凤凰城' = @('banner1.jpg','banner2.jpg','banner3.jpg','banner4.jpg','banner5.jpg','banner6.jpg','banner1.jpg','banner2.jpg','banner3.jpg','banner4.jpg'); ^
        '国宸府' = @('banner2.jpg','banner3.jpg','banner4.jpg','banner5.jpg','banner6.jpg','banner1.jpg','banner2.jpg','banner3.jpg','banner4.jpg','banner5.jpg'); ^
        '国印东方' = @('banner3.jpg','banner4.jpg','banner5.jpg','banner6.jpg','banner1.jpg','banner2.jpg','banner3.jpg','banner4.jpg','banner5.jpg','banner6.jpg') ^
    }; ^
    $order = @('观唐府', '金山豪庭', '星愉湾-现代意式', '星愉湾-轻法式', '星愉湾-现代极简', '中山文化苑', '凤凰城', '国宸府', '国印东方'); ^
    $newContent = $content; ^
    foreach ($key in $projects.Keys) { ^
        $vals = $projects[$key] -join \"','\"; ^
        $oldPattern = \"'$key':\\s*\\{[^}]*images:\\s*\\[[^]]+\\]\"; ^
        $newVals = $vals; ^
        $newContent = $newContent -replace $oldPattern, \"'$key': {`n        images: ['$vals']\"; ^
    }; ^
    $newContent = $newContent -replace \"var projectOrder = \\[.*?\\];\", \"var projectOrder = @('$($order -join \"','')');\"; ^
    Set-Content $file $newContent -Encoding UTF8 -NoNewline; ^
    Write-Host '  更新完成'"

echo.
echo ========================================
echo HTML 更新完成！
echo ========================================
pause
