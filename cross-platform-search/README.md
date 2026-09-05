# SearchAI - 跨平台 AI 搜索助手

> 你的私人 AI 搜索助手，一个命令找到所有地方的信息

## ✨ 特性

- 🔍 **跨平台搜索** - Notion、Gmail、本地文件统一搜索
- 🧠 **AI 语义理解** - 不只是关键词，理解你的意图
- 🔒 **隐私优先** - 所有数据本地处理，永不上传
- ⚡ **极速启动** - 快捷键触发，3 秒出结果
- 💎 **一次买断** - ¥299 永久使用，无订阅

## 🚀 快速开始

### 环境要求
- Node.js 18+
- Rust 1.70+
- Python 3.11+

### 安装

```bash
# 克隆项目
git clone https://github.com/yourusername/search-ai.git
cd search-ai

# 运行初始化脚本
bash init-project.sh

# 安装前端依赖
cd src/frontend
npm install

# 安装 Python 依赖
cd ../../python
pip install -r requirements.txt

# 配置
cp ../config/config.example.json ../config/config.json
# 编辑 config.json 填入你的 API Key

# 启动开发模式
cd ../..
cargo tauri dev
```

### 快捷键
- `Ctrl/Cmd + Space` - 打开搜索框
- `Enter` - 执行搜索
- `↑/↓` - 选择结果
- `Esc` - 关闭搜索框

## 📦 数据源支持

| 数据源 | 状态 | 说明 |
|--------|------|------|
| Notion | ✅ 已支持 | 官方 API，实时同步 |
| 本地文件 | ✅ 已支持 | .md, .txt, .pdf, .docx |
| Gmail | 🔄 开发中 | OAuth 认证 |
| Obsidian | 🔄 插件 | Markdown 笔记 |
| 浏览器书签 | 🔄 插件 | Chrome/Edge |

## 🏗️ 技术栈

- **前端**: Tauri 2.0 + React + TypeScript
- **后端**: Python 3.11 + FastAPI
- **向量库**: ChromaDB（本地）
- **嵌入模型**: OpenAI text-embedding-3-small
- **数据库**: SQLite
- **搜索**: 混合搜索（BM25 + 向量）

## 💰 定价

| 版本 | 价格 | 功能 |
|------|------|------|
| 免费版 | ¥0 | 本地文件搜索，50 次/天 |
| 个人版 | ¥299 | 所有功能，永久授权 |
| 家庭版 | ¥499 | 5 个设备，永久授权 |

**一次买断，终身使用，无订阅！**

## 📝 开发计划

### Phase 1: MVP（已完成）
- [x] Notion 搜索
- [x] 本地文件搜索
- [x] 语义搜索
- [x] 快捷键启动

### Phase 2: Beta（进行中）
- [ ] Gmail 邮件搜索
- [ ] AI 智能总结
- [ ] 搜索结果收藏
- [ ] 搜索历史

### Phase 3: 正式发布
- [ ] Obsidian 插件
- [ ] 浏览器书签搜索
- [ ] 插件系统
- [ ] 团队协作

## 🔧 配置说明

编辑 `config/config.json`：

```json
{
  "ai": {
    "api_key": "YOUR_AGNES_API_KEY",
    "api_base": "https://apihub.agnes-ai.com/v1",
    "embedding_model": "text-embedding-3-small",
    "llm_model": "agnes-2.5-pro"
  },
  "sources": {
    "notion": {
      "enabled": true,
      "api_key": "YOUR_NOTION_API_KEY"
    },
    "local": {
      "enabled": true,
      "paths": ["/Users/username/Documents"],
      "file_types": [".md", ".txt", ".pdf", ".docx"]
    }
  }
}
```

## 🤝 贡献

欢迎 Pull Request！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License

## 📧 联系

- 问题反馈：GitHub Issues
- 邮箱：support@searchai.com

---

**让搜索变得更简单，让知识触手可及。** 🚀
