// 对话管理工具 - JS 版本
import { defineTool } from '@deepseek-ai/dsh-tools'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

const conversations = new Map()

function getConversationPath(userId) {
  return path.join(process.env.DSH_HOME || '.', 'conversations', `${userId}.json`)
}

async function loadConversation(userId) {
  try {
    const content = await fs.readFile(getConversationPath(userId), 'utf-8')
    return JSON.parse(content)
  } catch {
    return null
  }
}

async function saveConversation(record) {
  const dir = path.dirname(getConversationPath(record.user_id))
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(getConversationPath(record.user_id), JSON.stringify(record, null, 2))
}

async function createConversation(userId) {
  const record = {
    id: `conv_${Date.now()}`,
    user_id: userId,
    messages: [],
    created_at: Date.now(),
    updated_at: Date.now(),
    status: 'active'
  }
  conversations.set(userId, record)
  await saveConversation(record)
  return record
}

async function addMessage(userId, role, content) {
  let record = conversations.get(userId)
  if (!record) {
    record = await createConversation(userId)
  }
  
  record.messages.push({ role, content, timestamp: Date.now() })
  record.updated_at = Date.now()
  
  conversations.set(userId, record)
  await saveConversation(record)
  return record
}

export const conversationTool = defineTool({
  name: 'conversation_manager',
  description: '管理对话历史',
  parameters: {
    action: { type: 'string', enum: ['create', 'add_message', 'get_history'] },
    user_id: { type: 'string' },
    message: { type: 'string' },
    role: { type: 'string' }
  },
  output: {
    schema: { type: 'object', additionalProperties: true },
    render: (_args, value) => [{ type: 'text', text: JSON.stringify(value, null, 2) }]
  },
  async execute(args) {
    switch (args.action) {
      case 'create':
        return await createConversation(args.user_id)
      case 'add_message':
        return await addMessage(args.user_id, args.role, args.message)
      case 'get_history': {
        let record = await loadConversation(args.user_id)
        if (!record) {
          record = await createConversation(args.user_id)
        }
        return record
      }
      default:
        return { error: 'Unknown action' }
    }
  }
})
