# 申聆空间设计 — 作品集网站

## 快速上手

### 1. 替换图片

把 `images/` 文件夹里的占位图替换成你自己的图片，**文件名必须保持一致**：

| 文件路径 | 用在哪个位置 | 建议尺寸 |
|---------|------------|---------|
| `images/logo.png` | 导航栏左上角 logo | 约 120×120px 或更宽，PNG 透明背景最佳 |
| `images/hero-bg.jpg` | 首页全屏背景图 | 1920×1080 |
| `images/about-me.jpg` | "关于我"板块的个人照片 | 800×1000 |
| `images/portfolio/project-1.jpg` | 作品 1 封面（城市山居） | 1200×800 |
| `images/portfolio/project-2.jpg` | 作品 2 封面（海边的房子） | 1200×800 |
| `images/portfolio/project-3.jpg` | 作品 3 封面（隐庐茶室） | 1200×800 |
| `images/portfolio/project-4.jpg` | 作品 4 封面（光之书房） | 1200×800 |
| `images/portfolio/project-5.jpg` | 作品 5 封面（素舍） | 1200×800 |
| `images/portfolio/project-6.jpg` | 作品 6 封面（云栖酒店） | 1200×800 |

替换方法：直接把你的图片复制进去，**覆盖同名文件**即可，不需要改代码。

### 2. 修改文字

#### 页面可见文字（在 `index.html` 中改）

用编辑器打开 `index.html`，搜索关键词修改：

- **品牌名**：搜索 `申聆`
- **首页标语**：搜索 `以空间为画布`
- **个人简介**：搜索 `我是郭校伸`
- **服务描述**：搜索 `住宅全案设计`
- **作品标题**：搜索 `城市山居`、`海边的房子` 等
- **联系邮箱**：搜索 `formsubmit.co`，把 `your@email.com` 换成你的真实邮箱
- **社交媒体**：搜索 `微信`、`小红书`

#### 弹窗详情文字（在 `js/main.js` 中改）

打开 `js/main.js`，找到 `var projects = {` 那一块，每个项目包含：

| 字段 | 说明 | 示例 |
|------|------|------|
| `title` | 项目名称 | `'城市山居'` |
| `loc` | 地点 + 年份 | `'上海 · 2024'` |
| `desc` | 详细描述 | `'位于上海市中心的一处高端住宅改造项目……'` |
| `area` | 面积 | `'128㎡'` |
| `style` | 设计风格 | `'现代东方'` |
| `year` | 年份 | `'2024'` |
| `type` | 项目类型 | `'住宅全案'` |
| `cost` | 费用 | `'全包 ¥38万 / 半包 ¥12万'` |

### 3. 增加或删除作品

在 `index.html` 的 `portfolio__grid` 区域复制或删除 `<div class="project">` 块，然后在 `js/main.js` 的 `projects` 对象里同步增删对应条目。注意编号要一一对应。

### 4. 修改配色

打开 `css/style.css`，找到最上方的 `:root` 区域，改 CSS 变量即可全局生效：

```css
:root {
  --color-accent: #B8956A;  /* 金色强调色，改成你喜欢的颜色 */
  --color-charcoal: #1A1A1A;  /* 深色文字 */
  /* ... */
}
```

## 部署到 GitHub Pages（免费）

1. 去 [github.com](https://github.com) 创建仓库（如 `portfolio`）
2. 把仓库地址告诉我，我帮你推送
3. 仓库 Settings → Pages → Source 选 `main` 分支
4. 网站上线：`https://你的用户名.github.io/portfolio/`
