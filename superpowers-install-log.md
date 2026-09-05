# 已安装热门 Skills 补充记录

## 新增安装的 Superpowers Skills (2026-08-24)

| Skill | 来源 | 状态 |
|-------|------|------|
| brainstorming | skills-sh/obra/superpowers | ✅ 已安装 |
| test-driven-development | skills-sh/obra/superpowers | ✅ 已安装 |
| writing-plans | skills-sh/obra/superpowers | ✅ 已安装 |
| requesting-code-review | skills-sh/obra/superpowers | ✅ 已安装 |
| systematic-debugging | skills-sh/obra/superpowers | ✅ 已安装 (--force) |
| subagent-driven-development | 内置扩展 | ✅ 已安装 |

## 未安装（需要手动确认或不可用）

| Skill | 原因 |
|-------|------|
| Anthropic-Cybersecurity-Skills (mukul975) | 无法从任何源获取 |

## 成功安装

| Skill | 来源 | 状态 |
|-------|------|------|
| cognee-memory | clawhub (topoteretes/cognee) | ✅ 已安装 |

## 安装命令参考

```bash
# Superpowers 核心流程
hermes skills install skills-sh/obra/superpowers/brainstorming
hermes skills install skills-sh/obra/superpowers/writing-plans
hermes skills install skills-sh/obra/superpowers/test-driven-development
hermes skills install skills-sh/obra/superpowers/systematic-debugging --force
hermes skills install skills-sh/obra/superpowers/requesting-code-review
hermes skills install skills-sh/obra/superpowers/subagent-driven-development

# 或通过插件
hermes plugins install obra/superpowers --enable
```

## 验证安装

```bash
hermes skills list | grep -i "superpower\|brainstorm\|tdd\|debug"
```

## 重启生效

```bash
# 关闭当前 Hermes 会话，重新打开
# 或
hermes gateway restart
```
