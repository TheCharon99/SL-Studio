// 人工转接工具 - JS 版本
import { defineTool } from '@deepseek-ai/dsh-tools'

const escalationQueue = []

function shouldEscalate(intent, messageCount, lastMessage) {
  const urgentKeywords = ['投诉', '举报', '律师', '起诉', '媒体', '曝光', '报警']
  const highKeywords = ['退款', '退货', '赔偿', '愤怒', '生气']
  
  for (const kw of urgentKeywords) {
    if (lastMessage.includes(kw)) {
      return { should: true, reason: `包含紧急关键词: ${kw}`, priority: 'urgent' }
    }
  }
  
  for (const kw of highKeywords) {
    if (lastMessage.includes(kw)) {
      return { should: true, reason: `包含高优先级关键词: ${kw}`, priority: 'high' }
    }
  }
  
  if (messageCount > 10) {
    return { should: true, reason: '对话轮次过多', priority: 'medium' }
  }
  
  if (intent === 'escalation') {
    return { should: true, reason: '用户明确要求人工', priority: 'medium' }
  }
  
  return { should: false, reason: '', priority: 'low' }
}

async function createEscalation(conversationId, userId, reason, priority) {
  const record = {
    id: `esc_${Date.now()}`,
    conversation_id: conversationId,
    user_id: userId,
    reason,
    priority,
    status: 'pending',
    assigned_to: null,
    created_at: Date.now()
  }
  escalationQueue.push(record)
  return record
}

export const escalationTool = defineTool({
  name: 'escalation_manager',
  description: '管理人工转接',
  parameters: {
    action: { type: 'string', enum: ['check', 'create', 'list'] },
    conversation_id: { type: 'string' },
    user_id: { type: 'string' },
    intent: { type: 'string' },
    message_count: { type: 'number' },
    last_message: { type: 'string' },
    reason: { type: 'string' },
    priority: { type: 'string' }
  },
  output: {
    schema: { type: 'object', additionalProperties: true },
    render: (_args, value) => [{ type: 'text', text: JSON.stringify(value, null, 2) }]
  },
  async execute(args) {
    switch (args.action) {
      case 'check': {
        const result = shouldEscalate(args.intent, args.message_count, args.last_message)
        return { ...result, escalation_id: null, queue_size: escalationQueue.length }
      }
      case 'create': {
        const record = await createEscalation(
          args.conversation_id,
          args.user_id,
          args.reason || '自动转接',
          args.priority || 'medium'
        )
        return { success: true, escalation_id: record.id, queue_size: escalationQueue.length }
      }
      case 'list':
        return { success: true, queue: escalationQueue, queue_size: escalationQueue.length }
      default:
        return { error: 'Unknown action' }
    }
  }
})
