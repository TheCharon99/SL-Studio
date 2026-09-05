# 图片重命名脚本 - 匹配 HTML 中的项目名
# 运行: powershell -File rename-images.ps1

$basePath = "E:\portfolio\yier-studio\images"

# HTML 中定义的项目（按顺序）
$projects = @(
    @{ name = "观唐府"; desc = "意式风格"; images = 10 },
    @{ name = "金山豪庭"; desc = "中古奶油"; images = 10 },
    @{ name = "星愉湾-现代意式"; desc = ""; images = 10 },
    @{ name = "星愉湾-轻法式"; desc = ""; images = 10 },
    @{ name = "星愉湾-现代极简"; desc = ""; images = 10 },
    @{ name = "中山文化苑"; desc = "现代简约"; images = 10 },
    @{ name = "凤凰城"; desc = ""; images = 10 },
    @{ name = "国宸府"; desc = ""; images = 10 },
    @{ name = "国印东方"; desc = ""; images = 10 }
)

Write-Host "========================================="
Write-Host "图片重命名脚本"
Write-Host "========================================="

# 1. 清理现有的临时文件
Write-Host "`n[1] 清理现有临时命名文件..."
$existingFiles = Get-ChildItem -Path $basePath -Filter "*.jpg" |
    Where-Object { $_.Name -match "^(项目|banner|detail)" -or $_.Name -match "_\d+\.jpg$" }
foreach ($f in $existingFiles) {
    Remove-Item -Path $f.FullName -Force -ErrorAction SilentlyContinue
    Write-Host "  删除: $($f.Name)"
}

# 2. 获取所有现有项目图片
Write-Host "`n[2] 扫描现有图片..."
$allJpg = Get-ChildItem -Path $basePath -Filter "*.jpg" |
    Where-Object { $_.Name -notmatch "banner|detail|logo|wx|lightbox|ref" } |
    Sort-Object Name

Write-Host "  找到 $($allJpg.Count) 个项目相关图片"

# 3. 分离封面图和详情图
$coverImages = $allJpg | Where-Object { $_.Name -notmatch "_\d+\.jpg$" }
$detailImages = $allJpg | Where-Object { $_.Name -match "_\d+\.jpg$" }

Write-Host "  封面图: $($coverImages.Count) 个"
Write-Host "  详情图: $($detailImages.Count) 个"

# 4. 重命名封面图
Write-Host "`n[3] 重命名封面图片..."
$coverIndex = 0
$coverImages | ForEach-Object {
    $project = $projects[$coverIndex % $projects.Count]
    $baseName = $project.name
    $newName = "$baseName.jpg"
    $oldPath = $_.FullName
    $newPath = Join-Path $basePath $newName

    if (Test-Path $newPath) {
        # 如果目标文件已存在，添加编号
        $newName = "$baseName-$coverIndex.jpg"
        $newPath = Join-Path $basePath $newName
    }

    Move-Item -Path $oldPath -Destination $newPath -Force
    Write-Host "  $($_.Name) -> $newName"
    $coverIndex++
}

# 5. 重命名详情图（按项目分组）
Write-Host "`n[4] 重命名详情图片..."
$projectGroups = $detailImages | Group-Object { $_.Name -replace "_\d+\.jpg$", "" }
$projectDetailIndex = 0

foreach ($group in $projectGroups) {
    $project = $projects[$projectDetailIndex % $projects.Count]
    $baseName = $project.name

    # 获取该项目的详情图并按数字排序
    $sortedImages = $group.Group | Sort-Object { [int]($_.Name -replace "$baseName|_\d+\.jpg$", "") -replace "_\d+", "" }
    $sortedImages = $group.Group | ForEach-Object {
        $num = [regex]::Match($_.Name, "_(\d+)\.jpg$").Groups[1].Value
        [PSCustomObject]@{ File = $_; Num = [int]$num }
    } | Sort-Object Num | ForEach-Object { $_.File }

    $sortedImages | ForEach-Object {
        $num = [regex]::Match($_.Name, "_(\d+)\.jpg$").Groups[1].Value
        $newName = "$baseName-$num.jpg"
        $oldPath = $_.FullName
        $newPath = Join-Path $basePath $newName

        if (Test-Path $newPath) {
            $newName = "$baseName-$num-$projectDetailIndex.jpg"
            $newPath = Join-Path $basePath $newName
        }

        Move-Item -Path $oldPath -Destination $newPath -Force
        Write-Host "  $($_.Name) -> $newName"
    }
    $projectDetailIndex++
}

# 6. 处理 banner 图片
Write-Host "`n[5] 处理 banner 图片..."
$bannerFiles = Get-ChildItem -Path $basePath -Filter "banner*.jpg"
$bannerFiles | ForEach-Object {
    $num = [regex]::Match($_.Name, "banner(\d+)\.jpg$").Groups[1].Value
    $newName = "项目-banner$num.jpg"
    $oldPath = $_.FullName
    $newPath = Join-Path $basePath $newName
    Move-Item -Path $oldPath -Destination $newPath -Force
    Write-Host "  $($_.Name) -> $newName"
}

# 7. 处理 detail 图片
Write-Host "`n[6] 处理 detail 图片..."
$detailFiles = Get-ChildItem -Path $basePath -Filter "detail*.jpg"
$detailFiles | ForEach-Object {
    $num = [regex]::Match($_.Name, "detail_(\d+)\.jpg$").Groups[1].Value
    $newName = "项目-detail$num.jpg"
    $oldPath = $_.FullName
    $newPath = Join-Path $basePath $newName
    Move-Item -Path $oldPath -Destination $newPath -Force
    Write-Host "  $($_.Name) -> $newName"
}

Write-Host "`n========================================="
Write-Host "重命名完成！"
Write-Host "========================================="
