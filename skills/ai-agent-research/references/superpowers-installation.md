# Superpowers Installation Guide

## Overview

Superpowers is an agentic skills framework by Jesse Vincent (obra) that enforces TDD, structured planning, and subagent-driven development.

## Installation Methods

### Method 1: Hermes Agent Plugin (Recommended)

```bash
# Install
hermes plugins install obra/superpowers --enable

# Verify installation
hermes skills list | grep superpowers

# Restart gateway (from separate terminal)
hermes gateway restart
```

**Plugin Location**: `~/.hermes/plugins/superpowers/`

**Skills Included**:
- `brainstorming` - Structured brainstorming
- `writing-plans` - Write plan documents
- `test-driven-development` - TDD workflow
- `systematic-debugging` - Systematic debugging
- `requesting-code-review` - Code review requests
- `subagent-driven-development` - Subagent-driven development

### Method 2: Claude Code Marketplace

```bash
# Add marketplace
/plugin marketplace add obra/superpowers-marketplace

# Install
/plugin install superpowers@superpowers-marketplace
```

### Method 3: Manual Clone

```bash
# Clone repository
git clone https://github.com/obra/superpowers.git

# Install to Hermes
cp -r superpowers ~/.hermes/plugins/superpowers
hermes gateway restart
```

## Verification

After installation, verify skills are loaded:

```bash
hermes skills list
```

Expected output should include Superpowers-related skills:
- `brainstorming`
- `writing-plans`
- `test-driven-development`
- `systematic-debugging`
- `requesting-code-review`

## Workflow After Installation

1. **Brainstorm**: Agent will suggest structured brainstorming before coding
2. **Plan**: Write plan document before implementation
3. **TDD**: Tests first (RED), then implementation (GREEN), then refactor
4. **Review**: Auto-request code review after completing tasks
5. **Subagent**: Parallel task execution for complex features

## Troubleshooting

### Skills Not Loading

```bash
# Check plugin directory exists
ls ~/.hermes/plugins/superpowers/

# Restart Hermes session
# Close current conversation, open new one
```

### Gateway Restart Required

```bash
# Run from SEPARATE terminal
hermes gateway restart
```

### Verify Plugin Status

```bash
hermes plugins list
```

## Cross-Agent Compatibility

Superpowers supports multiple agents:
- Claude Code ✓
- Hermes Agent ✓
- Codex CLI ✓
- Cursor ✓
- Gemini CLI ✓
- Devin CLI ✓
- GitHub Copilot CLI ✓
- OpenCode ✓

## Resources

- **GitHub**: https://github.com/obra/superpowers
- **Stars**: 192K+
- **License**: MIT
- **Author**: Jesse Vincent (obra)
