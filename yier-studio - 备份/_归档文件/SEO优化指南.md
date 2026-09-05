# YiER-Studio 懿贰设计 - SEO与性能优化指南

## 一、SEO优化（搜索引擎优化）

### 1.1 Favicon（网站图标）

**作用**：浏览器标签页显示的图标，提升品牌识别度

**添加方法**：
1. 准备 favicon 文件（建议尺寸：32×32px 或 64×64px）
2. 将文件保存为 `images/favicon.png`
3. 在每個页面的 `<head>` 中添加：

```html
<!-- PNG 格式 -->
<link rel="icon" type="image/png" href="images/favicon.png">

<!-- 苹果设备 -->
<link rel="apple-touch-icon" href="images/apple-touch-icon.png">

<!-- 多尺寸支持 -->
<link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
```

**生成工具**：
- https://www.favicon-generator.org/
- https://convertico.com/

---

### 1.2 Sitemap（站点地图）

**作用**：帮助搜索引擎抓取网站所有页面

**创建 sitemap.xml**：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yier-studio.com/</loc>
    <lastmod>2026-08-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yier-studio.com/projects.html</loc>
    <lastmod>2026-08-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://yier-studio.com/about.html</loc>
    <lastmod>2026-08-19</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yier-studio.com/career.html</loc>
    <lastmod>2026-08-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://yier-studio.com/contact.html</loc>
    <lastmod>2026-08-19</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**使用方法**：
1. 将以上内容保存为 `sitemap.xml`
2. 放在网站根目录
3. 在百度站长平台提交

---

### 1.3 Robots.txt

**作用**：告诉搜索引擎哪些页面可以抓取

**创建 robots.txt**：

```
User-agent: *
Allow: /

# 禁止抓取敏感目录（如果有）
# Disallow: /admin/
# Disallow: /private/

# 站点地图位置
Sitemap: https://yier-studio.com/sitemap.xml
```

**使用方法**：
1. 将以上内容保存为 `robots.txt`
2. 放在网站根目录

---

### 1.4 Meta 标签优化

**每个页面应包含**：

```html
<head>
    <title>【页面标题】 - YiER-Studio 懿贰设计</title>
    <meta name="description" content="【页面描述，150字以内】">
    <meta name="keywords" content="【关键词1】,【关键词2】,【关键词3】">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
```

**各页面推荐关键词**：

| 页面 | 推荐关键词 |
|------|-----------|
| 首页 | 懿贰设计，室内设计，高端住宅设计，上海设计工作室 |
| 项目精选 | 项目案例，设计作品，别墅设计，公寓设计 |
| 关于我们 | 公司介绍，设计理念，团队介绍 |
| 事业机会 | 招聘，设计师，职业发展 |
| 联系我们 | 联系方式，地址，电话 |

---

### 1.5 Open Graph 标签（社交分享优化）

**作用**：优化微信、QQ、微博等平台的分享预览

**添加方法**（在 `<head>` 中）：

```html
<!-- Facebook / LinkedIn -->
<meta property="og:title" content="页面标题">
<meta property="og:description" content="页面描述">
<meta property="og:image" content="封面图片URL">
<meta property="og:url" content="页面URL">
<meta property="og:type" content="website">

<!-- 微信（使用同样的OG标签） -->
<!-- 微信会自动读取OG标签 -->
```

**封面图片要求**：
- 尺寸：1200×630px 或更大
- 格式：JPG 或 PNG
- 大小：<5MB

---

### 1.6 百度统计（可选）

**作用**：网站流量分析

**添加方法**：
1. 访问 https://tongji.baidu.com/
2. 注册并添加网站
3. 复制代码添加到每个页面的 `</body>` 前：

```html
<!-- 百度统计代码 -->
<script>
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?【你的统计ID】";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
</script>
```

---

## 二、性能优化

### 2.1 图片优化

**压缩工具**：
- 在线：https://tinypng.com/
- 在线：https://squoosh.app/
- 本地：ImageOptim（Mac）、Smush（WordPress插件）

**优化建议**：
- JPEG 用于照片（质量 80-90%）
- PNG 用于图标和透明图片
- WebP 格式（兼容性更好，体积更小）

---

### 2.2 懒加载（Lazy Loading）

**作用**：图片只在滚动到可见区域时才加载

**添加方法**：

```html
<!-- 原生懒加载（推荐） -->
<img src="image.jpg" loading="lazy" alt="描述">

<!-- 或者使用 JS 库 -->
<script src="https://cdn.jsdelivr.net/npm/lazyload@2.0.0-rc.2/lazyload.min.js"></script>
<script>
  lazyload();
</script>
```

---

### 2.3 CSS/JS 压缩

**在线压缩工具**：
- CSS：https://cssnano.co/
- JS：https://javascript-minifier.com/
- HTML：https://htmlcompressor.com/

---

### 2.4 CDN 加速（可选）

**作用**：加速静态资源加载

**推荐服务商**：
- 七牛云：https://www.qiniu.com/
- 又拍云：https://www.upyun.com/
- 阿里云 OSS：https://www.aliyun.com/product/oss

**使用方法**：
1. 将图片上传到 CDN
2. 替换网站中的图片 URL 为 CDN 地址

---

## 三、内容管理建议

### 3.1 项目图片命名规范

**建议格式**：
```
项目名_序号.jpg
例如：
懿贰设计自宅_1.jpg
远洋鸿郡_1.jpg
```

**图片规格**：
- 项目详情页：1920×1080px
- 项目缩略图：600×400px
- 轮播图：1920×600px

---

### 3.2 项目数据管理

**项目数据位置**：`project-detail.html` 中的 `projects` 对象

**添加新项目示例**：

```javascript
var projects = {
    // ... 现有项目 ...
    '新项目名': {
        name: '新项目名',
        designer: '懿贰设计',
        location: '项目地址',
        desc: '项目描述',
        images: ['项目图1.jpg', '项目图2.jpg', '项目图3.jpg']
    }
};

// 在 projectOrder 中添加
var projectOrder = [
    // ... 现有项目 ...
    '新项目名'
];
```

---

### 3.3 翻译内容管理

**翻译数据位置**：`js/lang-switch.js` 中的 `pageTranslations` 对象

**添加新翻译示例**：

```javascript
var pageTranslations = {
    index: {
        // ... 现有翻译 ...
        'new-key': {
            cn: '中文内容',
            en: 'English Content'
        }
    }
};
```

**在 HTML 中使用**：
```html
<span data-i18n="new-key">中文内容</span>
```

---

## 四、部署上线

### 4.1 GitHub Pages 部署

**步骤**：
1. 创建 GitHub 仓库
2. 推送代码：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/你的用户名/仓库名.git
   git push -u origin main
   ```
3. 启用 GitHub Pages：
   - 进入仓库 Settings → Pages
   - Source 选择 main 分支
   - Folder 选择 / (root)

---

### 4.2 自定义域名绑定（可选）

**步骤**：
1. 购买域名（建议：.com 或 .cn）
2. 在 GitHub Pages 设置中添加 CNAME 文件：
   ```
   www.yourdomain.com
   ```
3. 在域名服务商处添加 DNS 记录：
   - CNAME: www → 你的用户名.github.io
   - A: @ → 185.199.108.153

---

## 五、后续维护

### 5.1 定期更新

**建议频率**：
- 项目案例：每月更新
- 公司新闻：每周更新
- 联系方式：及时更新

---

### 5.2 备份策略

**备份方法**：
1. GitHub 仓库自动备份
2. 本地定期备份
3. 重要数据导出为 PDF

---

## 六、常见问题

### Q1: 如何修改网站标题？
A: 修改每个 HTML 文件的 `<title>` 标签

### Q2: 如何添加新项目？
A: 在 `project-detail.html` 的 `projects` 对象中添加

### Q3: 如何修改联系信息？
A: 修改 `contact.html` 中的联系信息

### Q4: 如何修改翻译内容？
A: 修改 `js/lang-switch.js` 中的翻译对象

---

**文档更新时间**：2026-08-19
**维护者**：YiER-Studio 懿贰设计
