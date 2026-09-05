# AI Agent 生态速览 — 2026年8月

> 整理时间：2026-08-24  
> 涵盖：热门AI Agent项目、Hermes Agent Skills、Claude Code Skills、MCP协议

---

## 一、热门 AI Agent 项目（2025-2026）

### 1. Claude Code（Anthropic）
- **定位**：终端里的 AI 编程助手，直接读代码、改文件、跑测试、提交 Git
- **亮点**：Auto Mode 可自主执行安全审查；2026年3月推出 Code Review 工具
- **GitHub**: https://github.com/anthropics/claude-code
- **官网**: https://docs.anthropic.com/en/docs/claude-code
- **适用**：喜欢终端操作的开发者、需要代码审查的团队

### 2. Manus AI（Monica AI）
- **定位**：真正的自主执行 Agent，非聊天机器人
- **亮点**：在沙盒虚拟机中自主规划、执行多步任务；可打开浏览器、写代码、分析数据、生成文件
- **架构**：Planner Agent → Execution Agent → Verification Layer（截图验证）
- **价格**：$20/月起，有免费额度
- **官网**: https://manus.im
- **GitHub**: https://github.com/manus-ai
- **适用**：需要自动完成任务的普通用户和技术团队

### 3. Cursor（Anysphere）
- **定位**：AI 原生桌面 IDE
- **数据**：$5 亿 ARR，2022年成立，估值 $293 亿
- **特点**：Agent 模式可加速开发，支持项目级代码理解
- **官网**: https://cursor.sh
- **适用**：需要深度集成 AI 的开发者

### 4. Windsurf（Codeium）
- **定位**：AI 辅助开发工具，支持规则链和自动化工作流
- **特点**：本地运行支持离线；支持 GPT-4、Claude 等多模型
- **官网**: https://windsurf.com
- **适用**：新手和预算有限的开发者

### 5. Replit Agent
- **定位**：云端 AI 编程，端到端无需终端
- **特点**：告诉它"做一个任务管理器"，自动完成前端+后端+部署
- **官网**: https://replit.com
- **适用**：快速原型、非技术用户

### 6. AutoGen / MAF（Microsoft）
- **定位**：多 Agent 协作框架，Agent 间通过对话协调
- **现状**：2025年底与 Semantic Kernel 合并为 Microsoft Agent Framework (MAF)
- **特点**：支持 5-12 个 Agent 并行；Python + .NET 双语言
- **GitHub**: https://github.com/microsoft/autogen
- **官网**: https://microsoft.github.io/autogen
- **适用**：研究场景、企业级多 Agent 系统

### 7. LangGraph（LangChain）
- **定位**：AI Agent 编排框架，支持复杂工作流
- **数据**：GitHub 40,284 Stars，MIT 协议
- **特点**：Human-in-the-loop GA、LangGraph Platform 托管服务、deepagents 支持长期任务规划
- **GitHub**: https://github.com/langchain-ai/langgraph
- **官网**: https://www.langchain.com/langgraph
- **适用**：生产级 Agent 系统、需要精确控制的场景

### 8. CrewAI
- **定位**：企业级多 Agent 编排，基于角色的协作模型
- **数据**：60% Fortune 500 公司使用，约 20 亿次 Agent 执行
- **特点**：快速原型（<3小时）；CrewAI+ 企业版；与 NVIDIA NemoClaw 集成
- **官网**: https://crewai.com
- **GitHub**: https://github.com/joaomdmoura/crewAI
- **适用**：企业自动化、角色扮演式工作流

---

## 二、MCP（Model Context Protocol）

- **定义**：AI 应用与外部系统连接的标准协议，Anthropic 于 2024年11月开源
- **定位**：AI 应用的"USB-C 端口"
- **GitHub**: https://github.com/modelcontextprotocol
- **官网**: https://modelcontextprotocol.io
- **Anthropic 公告**: https://www.anthropic.com/news/model-context-protocol
- **适用**：所有需要 AI 连接外部工具/数据的场景

---

## 三、Hermes Agent Skills

### 官方资源
- **Skills Hub**: https://hermes-agent.nousresearch.com/docs/skills
- **Skills Catalog**: https://hermes-agent.nousresearch.com/docs/reference/skills-catalog
- **GitHub**: https://github.com/NousResearch/hermes-agent

### 内置 Skill 分类（共 88k+）

| 分类 | 代表 Skills |
|------|-------------|
| **autonomous-ai-agents** | claude-code, codex, computer-use, hermes-agent, merge-reconciler, opencode |
| **creative** | architecture-diagram, ascii-art, comfyui, manim-video, p5js, excalidraw |
| **productivity** | airtable, notion, docx, pdf, xlsx, google-workspace |
| **research** | arxiv, blogwatcher, grounded-citations, llm-wiki |
| **software-development** | dogfood, test-driven-development, systematic-debugging, simplify-code |
| **email** | himalaya, email-inbox-triage |
| **media** | gif-search, youtube-content |
| **github** | github-auth, github-pr-workflow, github-code-review |

### 热门社区 Skills
- **obra/superpowers** (276.7K Stars): Agentic 技能框架和软件开发方法论
- **mukul975/Anthropic-Cybersecurity-Skills** (30.8K): 817 个网络安全技能
- **topoteretes/cognee** (30.2K): Agent 长期记忆平台
- **conorbronsdon/avoid-ai-writing** (3.2K): 去除 AI 写作痕迹

### Skill 使用命令
```bash
# 列出所有技能
hermes skills list

# 搜索技能
hermes skills search airbnb

# 安装技能
hermes skills install <source>/<skill-name>
```

---

## 四、Claude Code Skills

### 官方资源
- **文档**: https://docs.anthropic.com/en/docs/claude-code/skills
- **Registry**: https://bythewei.dev/docs/skills-registry

### 核心概念
- **Skills**: 文件夹格式的指令包，按需加载，跨工具兼容（Claude Code、Cursor、Gemini CLI）
- **Hooks**: 确定性 shell 钩子，在生命周期事件触发
- **Subagents**: 隔离上下文的独立 Agent 实例

### 安装方式
```bash
# 方法1: npx skills CLI
npx skills add <owner>/<repo> --all

# 方法2: 手动复制
git clone <repo>
cp -r <skill-folder> ~/.claude/skills/  # 全局
cp -r <skill-folder> .claude/skills/    # 项目级
```

### 热门 Skills 项目
- **mattpocock/skills** (50K+ Stars): TDD、PRD 生成、任务分解
- **Everything Claude Code (ECC)**: 232 Skills + 60 Agents + Hooks

---

## 五、技术趋势（2026）

1. **框架整合**：LangGraph 和 CrewAI 成为主流，小框架被淘汰
2. **垂直 Agent 变现最快**：Cursor $5亿 ARR、Lovable $1亿 ARR
3. **Agent-to-Agent 协议标准化**：MCP 成为事实标准
4. **推理成本下降**：Claude Sonnet 4.6 成本降 60%，性能升 40%
5. **多模态感知**：文本、图像、音频、视频原生支持
6. **可观测性需求爆发**：监控和调试成为关键需求

---

## 六、相关链接汇总

### 官方/文档
- Claude Code: https://docs.anthropic.com/en/docs/claude-code
- MCP Protocol: https://modelcontextprotocol.io
- Hermes Agent: https://hermes-agent.nousresearch.com/docs
- LangGraph: https://docs.langchain.com/oss/python/langgraph
- CrewAI: https://docs.crewai.com
- AutoGen: https://microsoft.github.io/autogen

### GitHub
- Claude Code: https://github.com/anthropics/claude-code
- MCP: https://github.com/modelcontextprotocol
- Hermes Agent: https://github.com/NousResearch/hermes-agent
- LangGraph: https://github.com/langchain-ai/langgraph
- CrewAI: https://github.com/joaomdmoura/crewAI
- AutoGen: https://github.com/microsoft/autogen
- Superpowers: https://github.com/obra/superpowers
- ECC: https://github.com/affaan-m/everything-claude-code

### 产品官网
- Claude Code: https://claude.ai/code
- Manus AI: https://manus.im
- Cursor: https://cursor.sh
- Windsurf: https://windsurf.com
- Replit: https://replit.com

---

*数据来源：2026年8月网络搜索整理，含 Zhihu、腾讯云、Frost & Sullivan 等行业分析*
