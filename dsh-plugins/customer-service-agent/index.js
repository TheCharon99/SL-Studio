// AI 客服 Agent 插件入口 - JS 版本
import { faqRetrieverTool } from './tools/faq-retriever.js'
import { conversationTool } from './tools/conversation.js'
import { escalationTool } from './tools/escalation.js'
import { customerServicePreset } from './presets/customer-service.js'

export const name = 'customer-service-agent'

export function apply(ctx) {
  // 注册客服专用工具
  ctx.tools.register(faqRetrieverTool)
  ctx.tools.register(conversationTool)
  ctx.tools.register(escalationTool)
  
  // 注册 Agent 预设
  if (ctx.agents && ctx.agents.registerPreset) {
    ctx.agents.registerPreset(customerServicePreset)
  }
  
  console.log('[CustomerService] 插件已加载')
}

export { faqRetrieverTool, conversationTool, escalationTool, customerServicePreset }
