const fs = require('fs')
const path = require('path')

// 创建 TabBar 图标目录
const dir = path.join(__dirname, '..', 'images', 'tab')
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

// 生成最小 PNG 图标（1x1 透明像素）
// 实际上微信小程序需要 81x81 的图标
// 这里只创建目录，图标需要手动下载或使用在线工具生成

console.log('图标目录已创建:', dir)
console.log('请手动下载图标或访问 https://www.iconfont.cn 下载 PNG 图标放入此目录')
console.log('需要的图标文件:')
console.log('  - discover.png (发现图标)')
console.log('  - discover-active.png (发现选中)')
console.log('  - publish.png (发布图标)')
console.log('  - publish-active.png (发布选中)')
console.log('  - profile.png (我的图标)')
console.log('  - profile-active.png (我的选中)')
