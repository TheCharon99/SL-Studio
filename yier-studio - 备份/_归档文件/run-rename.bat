@echo off
chcp 65001 >nul
echo ========================================
echo 图片重命名脚本
echo ========================================
echo.

set "BASE_PATH=E:\portfolio\yier-studio\images"

:: 清理现有的临时命名文件
echo [1] 清理现有临时文件...
for %%f in ("%BASE_PATH%\项目*.jpg") do (
    if exist "%%f" (
        del "%%f"
        echo   删除: %%~nxf
    )
)

:: 使用 PowerShell 执行重命名
echo.
echo [2] 执行重命名...
powershell -ExecutionPolicy Bypass -Command ^
    "$base = '%BASE_PATH%'; ^
    $covers = Get-ChildItem $base -Filter '*.jpg' | Where-Object { $_.Name -notmatch '(_\d+|banner|detail_|logo|wx|lightbox|ref)' } | Sort-Object Name; ^
    $details = Get-ChildItem $base -Filter '*_*.jpg' | Sort-Object Name; ^
    $banners = Get-ChildItem $base -Filter 'banner*.jpg' | Sort-Object Name; ^
    $details_generic = Get-ChildItem $base -Filter 'detail*.jpg' | Sort-Object Name; ^
    $projects = @('观唐府', '金山豪庭', '星愉湾-现代意式', '星愉湾-轻法式', '星愉湾-现代极简', '中山文化苑', '凤凰城', '国宸府', '国印东方'); ^
    for ($i = 0; $i -lt $covers.Count; $i++) { ^
        $old = $covers[$i].FullName; ^
        $new = Join-Path $base ($projects[$i % $projects.Count] + '.jpg'); ^
        if (-not (Test-Path $new)) { Move-Item $old $new -Force; Write-Host ('  ' + $covers[$i].Name + ' -> ' + $projects[$i % $projects.Count] + '.jpg'); } ^
    }; ^
    $detailByProject = @{}; ^
    foreach ($f in $details) { ^
        if ($f.Name -match '^(.+?)_(\d+)\.jpg$') { ^
            $proj = $matches[1]; $num = $matches[2]; ^
            if (-not $detailByProject.ContainsKey($proj)) { $detailByProject[$proj] = @(); } ^
            $detailByProject[$proj] += [PSCustomObject]@{Num=$num; File=$f}; ^
        } ^
    }; ^
    $idx = 0; ^
    foreach ($proj in ($detailByProject.Keys | Sort-Object)) { ^
        $newBase = $projects[$idx % $projects.Count]; ^
        foreach ($item in ($detailByProject[$proj] | Sort-Object Num)) { ^
            $old = $item.File.FullName; ^
            $new = Join-Path $base ($newBase + '-' + $item.Num + '.jpg'); ^
            if (-not (Test-Path $new)) { Move-Item $old $new -Force; Write-Host ('  ' + $item.File.Name + ' -> ' + $newBase + '-' + $item.Num + '.jpg'); } ^
        }; ^
        $idx++; ^
    }; ^
    for ($i = 0; $i -lt $banners.Count; $i++) { ^
        $old = $banners[$i].FullName; ^
        $new = Join-Path $base ('项目-banner' + ($i+1) + '.jpg'); ^
        if (-not (Test-Path $new)) { Move-Item $old $new -Force; Write-Host ('  ' + $banners[$i].Name + ' -> 项目-banner' + ($i+1) + '.jpg'); } ^
    }; ^
    for ($i = 0; $i -lt $details_generic.Count; $i++) { ^
        $old = $details_generic[$i].FullName; ^
        $new = Join-Path $base ('项目-detail' + ($i+1) + '.jpg'); ^
        if (-not (Test-Path $new)) { Move-Item $old $new -Force; Write-Host ('  ' + $details_generic[$i].Name + ' -> 项目-detail' + ($i+1) + '.jpg'); } ^
    }"

echo.
echo ========================================
echo 重命名完成！
echo ========================================
echo.
echo 请运行 update-html.ps1 更新 HTML 中的图片引用
pause
