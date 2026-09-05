# 静态网站部署指南

## Vercel 部署流程

### 第一步：导入 GitHub 仓库
1. 打开 https://vercel.com/dashboard
2. 点击 'Add New...' > 'Project'
3. 登录 GitHub 账号
4. 选择 yier-studio 仓库，点击 Import
5. Framework Preset 选 Other
6. 点击 Deploy

### 第二步：绑定自定义域名
1. 部署成功后，进入项目 Settings > Domains
2. 添加域名：先添加根域名验证，再添加 www 子域名

### 第三步：腾讯云 DNS 配置
```
记录1（验证根域名）：
  - 类型: CNAME 或 TXT
  - 主机记录: @ (或 _vercel)
  - 记录值: vercel-verification=xxxxx (Vercel 提示的值)
  - TTL: 600

记录2（www 子域名）：
  - 类型: CNAME
  - 主机记录: www
  - 记录值: cname.vercel-dns.com
  - TTL: 600
```

## 常见问题

### 域名显示 Unavailable
**原因**：域名已被其他 Vercel 账户绑定
**解决**：
1. 使用子域名：site.yier.site
2. 或直接使用 Vercel 自动生成的网址：https://yier-studio-xxx.vercel.app
3. 购买新域名

### GitHub Pages Save 按钮灰色
**原因**：Folder 选项导致冲突
**解决**：
1. 只选 Branch: main，不选 Folder
2. 或直接点 Save 跳过 Folder 选项

### CNAME 文件格式
正确格式（只写根域名）：
```
yier.site
```
错误格式（不要写多个域名）：
```
yier.site
www.yier.site
```

## Git 操作要点

### 推送失败处理
```bash
git pull origin main --no-rebase
git push origin main
```

### .gitignore 配置
必须排除：
```
_归档文件/
_多余文件/
server.py
启动服务器.bat
*.py（压缩脚本）
```

### 中文路径问题
- 本地 Python 服务器正确处理中文路径
- GitHub/Vercel 需要 UTF-8 编码
- 图片路径使用相对路径：`images/项目名/cover.jpg`

## 部署后验证
1. 访问 Vercel 自动生成的网址
2. 检查图片、CSS、JS 是否正常加载
3. 等待 DNS 生效（5-30 分钟）
4. 访问自定义域名验证
