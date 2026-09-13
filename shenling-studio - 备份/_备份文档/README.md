# YiER Studio 快速操作指南

## 最简单的使用方法

### 方法1：双击批处理文件（推荐）
```
打开文件夹：E:\portfolio\yier-studio
双击：menu.bat
按数字选择功能
```

### 方法2：命令行操作
```
1. 按 Win + R
2. 输入：cmd
3. 回车
4. 输入：cd E:\portfolio\yier-studio
5. 回车
6. 输入：python batch_tools.py [命令]
```

---

## 常用命令

### 添加新项目
```bash
python batch_tools.py add "紫金府-现代简约"
```

### 提交并推送
```bash
python batch_tools.py commit "添加新项目：紫金府"
```

### 检查大图
```bash
python batch_tools.py check-images
```

### 批量压缩图片
```bash
python batch_tools.py compress
```

### 打开网站
```bash
python batch_tools.py open
```

### 查看状态
```bash
python batch_tools.py status
```

---

## 完整流程（添加新项目）

```bash
# 1. 创建项目文件夹
python batch_tools.py add "紫金府-现代简约"

# 2. 将图片放入 images\紫金府-现代简约.jpg\ 文件夹

# 3. 编辑 project-detail.html 添加项目数据

# 4. 编辑 projects.html 添加项目链接

# 5. 提交并推送
python batch_tools.py commit "添加新项目：紫金府"
```

---

## 文件说明

| 文件 | 用途 |
|------|------|
| menu.bat | 图形化菜单（双击运行） |
| batch_tools.py | 批量操作脚本 |
| 工作流.md | 详细工作流程 |
| 快速指南.md | 命令速查 |
| 教程.html | 新手维护教程 |
| 快速操作手册.html | 可视化操作指南 |

---

## 注意事项

1. **每次修改后必须执行 commit 和 push**，否则网站不会更新
2. **图片必须先压缩**，使用 https://tinypng.com
3. **访问网站后按 Ctrl+Shift+R 强制刷新**，清除缓存

---

## 故障排查

### 问题：批处理文件显示乱码
**解决**：使用命令行方式操作

### 问题：网站不显示新内容
**解决**：按 Ctrl+Shift+R 强制刷新浏览器

### 问题：图片太大加载慢
**解决**：执行 `python batch_tools.py compress` 批量压缩

---

## 项目地址

- GitHub：https://github.com/TheCharon99/yier-studio
- 网站：https://TheCharon99.github.io/yier-studio/
- 教程：https://TheCharon99.github.io/yier-studio/教程.html
