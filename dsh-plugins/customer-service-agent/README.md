# AI 客服 Agent 插件

基于 DeepSeek Harness 的企业级客服 Agent 插件示例

## 目录结构

```
customer-service-agent/
├── package.json          # 插件元数据
├── index.ts              # 插件入口
├── tools/
│   ├── faq-retriever.ts  # FAQ 检索工具
│   ├── conversation.ts   # 对话管理工具
│   └── escalation.ts     # 人工转接工具
├── presets/
│   └── customer-service.ts  # Agent 预设配置
└── README.md
```

## 快速开始

```bash
# 1. 创建插件目录
mkdir -p ~/dsh-plugins/customer-service-agent
cd ~/dsh-plugins/customer-service-agent

# 2. 初始化插件
npm init -y
npm install @deepseek-ai/cordis @deepseek-ai/dsh-tools

# 3. 编写插件代码（见 index.ts）

# 4. 配置到 dsh
# 编辑 ~/.dsh/profiles/web/cordis.patch.yml
```

## 核心功能

### 1. FAQ 智能检索
- 支持导入 FAQ 文档（JSON/Markdown）
- 基于语义相似度检索
- 支持多轮对话上下文

### 2. 对话管理
- 保存对话历史
- 自动识别用户意图
- 支持多语言（中/英）

### 3. 人工转接
- 自动判断是否需要人工介入
- 无缝转接，保留对话上下文
- 支持多种联系方式（微信/电话）

## 配置示例

```yaml
# ~/.dsh/profiles/web/cordis.patch.yml
plugins:
  - path: ~/dsh-plugins/customer-service-agent
    name: customer-service-agent

# 配置 FAQ 文件
agent-preset:
  customer-service:
    model: agnes-2.5-pro  # 客服用高级模型
    system-prompt: |
      你是专业的客服助手，擅长解答用户问题。
      如果问题超出你的知识库，请礼貌地建议转接人工客服。
    tools:
      - faq-retriever
      - conversation
      - escalation
```

## 测试方法

```bash
# 启动 dsh
npx dsh web

# 在 Web UI 中选择 "customer-service" preset
# 测试对话：
# - 简单问题：直接回答
# - 复杂问题：建议转人工
# - 无法回答：礼貌告知并记录
