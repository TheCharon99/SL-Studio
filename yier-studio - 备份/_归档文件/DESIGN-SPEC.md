# YiER-Studio 懿贰设计 - 设计系统规范

## 品牌信息
- **品牌名**: YiER-Studio 懿贰设计
- **定位**: 上海高端室内设计工作室，18年别墅大宅设计经验
- **核心服务**: 私人豪宅、私人公寓、办公室、商业空间设计

## 设计方向
- **风格**: 极简高端 · 黑白灰为主 · 大量留白 · 精致排版
- **视觉气质**: 安静、权威、专业、有品味
- **参考**: wdesign.hk 的高品质设计感

## 色彩系统
```
--color-black:    #1a1a1a    主体文字
--color-dark:     #333333    次要文字
--color-gray:     #666666    辅助文字
--color-muted:    #999999    弱文字
--color-light:    #CCCCCC    分割线
--color-bg:       #F8F7F4    页面背景（暖灰）
--color-white:    #FFFFFF    内容背景
--color-accent:   #222222    hover/active状态
```

## 字型系统
- **Display**: "Noto Serif SC", "Songti SC", "Source Han Serif SC" — 衬线体，标题/品牌名
- **Body**: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif — 无衬线，正文
- **英文**: "Newsreader", serif — 用于英文品牌名

## 排版系统
- 正文字号: 17px，行高 1.8
- 标题字号: clamp(2rem, 1.2rem + 3vw, 3.5rem) 流式
- 章节标题: 24px, letter-spacing: 0.02em
- 标签: 12px, uppercase, letter-spacing: 0.1em
- 行长: max-width: 36em（中文舒适区）

## 间距系统
- 基础单位: 8px
- section padding: 80px 0（桌面），40px 0（移动端）
- 卡片间距: 24px

## 导航规范
- 统一5个菜单项：首页 | 关于我们 | 项目精选 | 事业机会 | 联系我们
- 当前页面高亮（底部1px黑线）
- 移动端：select下拉菜单，隐藏水平导航
- 语言切换：中 | EN，右上角固定

## 页面结构模板
```
[顶部语言切换栏]
[Logo + 社交图标]
[统一导航栏]
[页面内容区]
[统一页脚]
```

## 项目数据
共22个项目，分4类：
- 私人豪宅 (3个): 懿贰设计自宅、远洋鸿郡、清风别墅
- 私人公寓 (12个): 观唐府、金山豪庭、星愉湾系列、中山文化苑、凤凰城、国宸府、国印东方系列、旭辉府、光明府
- 办公室 (1个): 懿贰设计办公室
- 商业空间 (5个): 金山大金空调展厅、小酒馆、JUN服装店、禾禾咖啡、马连发旗舰店

## 修复清单
1. ✅ 统一导航栏（所有页面5个菜单项）
2. ✅ 修复projects.html重复的me2 div
3. ✅ 修复about.html缺失导航
4. ✅ 修复career.html缺失导航
5. ✅ 修复contact.html空表单
6. ✅ 修复project-detail.html的currentLang变量
7. ✅ 修复所有页面的响应式导航
8. ✅ 统一favicon、meta标签
9. ✅ 图片路径修复
