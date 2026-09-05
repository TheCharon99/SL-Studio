#!/bin/bash
# 跨平台搜索 - 项目初始化脚本

echo "🚀 初始化跨平台搜索项目..."

# 1. 创建项目结构
echo "📁 创建项目结构..."
mkdir -p src-tauri/src/search
mkdir -p src-tauri/src/index
mkdir -p src-tauri/src/ai
mkdir -p src-tauri/src/db
mkdir -p python/search
mkdir -p python/index
mkdir -p python/ai
mkdir -p python/db
mkdir -p src/frontend/src/components
mkdir -p src/frontend/src/hooks
mkdir -p src/frontend/src/stores
mkdir -p src/frontend/src/types
mkdir -p src/frontend/src/utils

# 2. 创建 Cargo.toml
echo "📦 创建 Cargo.toml..."
cat > src-tauri/Cargo.toml << 'EOF'
[package]
name = "search-ai"
version = "1.0.0"
edition = "2021"
description = "跨平台 AI 搜索助手"
authors = ["Your Name"]

[dependencies]
tauri = { version = "2.0", features = ["shell-open"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
tokio = { version = "1.0", features = ["full"] }
reqwest = { version = "0.11", features = ["json"] }
chromadb = "0.3"
sqlite = "0.31"
notify = "5.0"
anyhow = "1.0"

[build-dependencies]
tauri-build = { version = "2.0", features = [] }
EOF

# 3. 创建 tauri.conf.json
echo "⚙️ 创建配置文件..."
cat > src-tauri/tauri.conf.json << 'EOF'
{
  "productName": "SearchAI",
  "version": "1.0.0",
  "identifier": "com.searchai.app",
  "build": {
    "frontendDist": "../src/frontend/dist",
    "devUrl": "http://localhost:1420"
  },
  "app": {
    "windows": [
      {
        "label": "main",
        "title": "SearchAI",
        "width": 600,
        "height": 400,
        "resizable": true,
        "fullscreen": false
      }
    ],
    "security": {
      "csp": null
    }
  },
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": [
      "icons/16x16.png",
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/icon.ico"
    ]
  }
}
EOF

# 4. 创建前端 package.json
echo "🌐 创建前端配置..."
cat > src/frontend/package.json << 'EOF'
{
  "name": "search-ai-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@tauri-apps/api": "^2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
EOF

# 5. 创建 Python requirements.txt
echo "🐍 创建 Python 配置..."
cat > python/requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn==0.24.0
openai==1.3.0
chromadb==0.4.22
notion-client==2.2.1
google-api-python-client==2.110.0
google-auth-httplib2==0.1.1
google-auth-oauthlib==1.1.0
python-dotenv==1.0.0
pydantic==2.5.0
aiofiles==23.2.1
pymupdf==1.23.8
python-docx==1.1.0
EOF

# 6. 创建配置文件模板
echo "📋 创建配置模板..."
cat > config/config.example.json << 'EOF'
{
  "app": {
    "name": "SearchAI",
    "version": "1.0.0"
  },
  "search": {
    "default_sources": ["notion", "local"],
    "max_results": 20,
    "timeout_ms": 5000
  },
  "ai": {
    "embedding_model": "text-embedding-3-small",
    "llm_model": "agnes-2.5-pro",
    "api_base": "https://apihub.agnes-ai.com/v1",
    "api_key": "YOUR_AGNES_API_KEY"
  },
  "sources": {
    "notion": {
      "enabled": false,
      "api_key": ""
    },
    "gmail": {
      "enabled": false,
      "client_id": "",
      "client_secret": ""
    },
    "local": {
      "enabled": true,
      "paths": ["/Users/username/Documents"],
      "file_types": [".md", ".txt", ".pdf", ".docx"]
    }
  }
}
EOF

# 7. 创建 README
echo "📖 创建 README..."
cat > README.md << 'EOF'
# SearchAI - 跨平台 AI 搜索助手

你的私人 AI 搜索助手，一个命令找到所有地方的信息。

## 特性

- 🔍 **跨平台搜索**：Notion、Gmail、本地文件统一搜索
- 🧠 **AI 语义理解**：不只是关键词，理解你的意图
- 🔒 **隐私优先**：所有数据本地处理，永不上传
- ⚡ **极速启动**：快捷键触发，3 秒出结果
- 💎 **一次买断**：¥299 永久使用，无订阅

## 快速开始

### 环境要求
- Node.js 18+
- Rust 1.70+
- Python 3.11+

### 安装

```bash
# 1. 安装前端依赖
cd src/frontend
npm install

# 2. 安装 Python 依赖
cd ../../python
pip install -r requirements.txt

# 3. 配置
cp config/config.example.json config/config.json
# 编辑 config/config.json 填入你的 API Key

# 4. 运行
cd ../..
cargo tauri dev
```

### 快捷键
- `Ctrl/Cmd + Space` - 打开搜索框
- `Enter` - 执行搜索
- `↑/↓` - 选择结果
- `Esc` - 关闭搜索框

## 技术栈
- 前端：Tauri 2.0 + React + TypeScript
- 后端：Python 3.11 + FastAPI
- 向量库：ChromaDB
- 嵌入模型：OpenAI text-embedding-3-small
- 数据库：SQLite

## 数据源
- ✅ Notion（官方 API）
- ✅ 本地文件（.md, .txt, .pdf, .docx）
- 🔄 Gmail（OAuth）
- 🔄 Obsidian（插件）
- 🔄 浏览器书签（插件）

## 定价
- 免费版：本地文件搜索，50 次/天
- 个人版：¥299 永久授权（所有功能）
- 家庭版：¥499 永久授权（5 个设备）

## 许可证
MIT License

## 贡献
欢迎 Pull Request！

## 支持
- 问题反馈：GitHub Issues
- 邮箱：support@searchai.com
EOF

echo "✅ 项目初始化完成！"
echo ""
echo "📁 项目结构："
echo "   src/              - Rust 前端代码"
echo "   src-tauri/        - Tauri 配置"
echo "   python/           - Python 后端"
echo "   src/frontend/     - React 前端"
echo "   config/           - 配置文件"
echo "   data/             - 数据存储"
echo ""
echo "🚀 下一步："
echo "   1. 复制 config/config.example.json 为 config/config.json"
echo "   2. 填入你的 Agnes API Key"
echo "   3. 运行 cargo tauri dev 启动开发"
echo ""
