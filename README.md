# 林悦设计工作室 — 作品集网站

极简高端风格的室内设计师作品集网站，纯 HTML/CSS/JS 实现，零依赖。

## 部署到 GitHub Pages

1. 在 GitHub 创建仓库（如 `username/portfolio`）
2. 将本项目推送到 `main` 分支
3. 进入仓库 Settings → Pages → Source 选择 `main` 分支
4. 网站将在 `https://username.github.io/portfolio/` 上线

## 自定义指南

### 替换图片
将所有 `images/` 目录下的占位图片替换为你的实际作品图：

| 文件 | 用途 | 建议尺寸 |
|------|------|----------|
| `images/hero-bg.jpg` | 首页背景图 | 1920×1080 |
| `images/about-me.jpg` | 设计师肖像 | 800×1000 |
| `images/portfolio/project-*.jpg` | 项目封面图 | 1200×800 |

格式推荐 WebP（更小体积），JPEG 作为 fallback。

### 修改联系邮箱
打开 `index.html`，找到 Contact 部分的 `<form>`：

```html
<form action="https://formsubmit.co/your@email.com" method="POST">
```

将 `your@email.com` 替换为你的真实邮箱。首次使用时 FormSubmit.co 会发送确认邮件。

### 修改文案
所有文字内容都在 `index.html` 中，搜索以下关键词快速定位：
- 姓名：`林悦`
- 标题：`以空间为画布`
- 服务项：`住宅全案设计`、`商业空间设计` 等
- 项目名：`城市山居`、`海边的房子` 等

### 修改配色
打开 `css/style.css`，找到 `:root` 部分，修改 CSS 变量即可全局换色：

```css
:root {
  --color-accent: #B8956A;  /* 主强调色 */
  --color-charcoal: #1A1A1A;  /* 深色文字 */
  /* ... */
}
```

## 技术栈

- **HTML5** — 语义化标签
- **CSS3** — Grid / Flexbox / Custom Properties / 响应式设计
- **JavaScript (ES6+)** — IntersectionObserver 动画、防抖滚动、移动端导航
- **Google Fonts** — Playfair Display + Inter
- **FormSubmit.co** — 免费表单提交服务（无需后端）

## 浏览器兼容

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
