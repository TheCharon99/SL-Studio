# 客服 Agent Web 界面说明

## 界面功能

### 1. 聊天界面
- 左侧：对话列表
- 中间：聊天区域
- 右侧：FAQ 和统计面板

### 2. 快捷操作
- 欢迎界面的快捷问题按钮
- 侧边栏的 FAQ 快速提问

### 3. 智能功能
- **FAQ 检索**：自动匹配用户问题
- **意图识别**：检测用户情绪和意图
- **人工转接**：自动判断是否需要转人工
- **对话历史**：自动保存和加载

## 使用方法

1. 用浏览器打开 `index.html`
2. 点击快捷问题或输入您的问题
3. 查看右侧面板的 FAQ 和统计
4. 左侧切换不同对话

## 技术栈

- **前端**：纯 HTML/CSS/JavaScript
- **数据存储**：localStorage
- **无外部依赖**：可直接离线使用

## 后续扩展

可以接入真实 API：
```javascript
// 替换 generateResponse 函数
async function generateResponse(question) {
  const response = await fetch('http://localhost:3080/api/tools/faq_retriever', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  return await response.json();
}
```
