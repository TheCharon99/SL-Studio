// FAQ 检索工具 - JS 版本
import { defineTool } from '@deepseek-ai/dsh-tools'
import * as fs from 'node:fs/promises'

let faqDatabase = []

export async function loadFAQ(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    faqDatabase = JSON.parse(content)
    console.log(`[FAQ] 已加载 ${faqDatabase.length} 条 FAQ`)
  } catch (error) {
    console.error('[FAQ] 加载失败:', error)
  }
}

function calculateSimilarity(q1, q2) {
  const words1 = new Set(q1.toLowerCase().split(/\s+/))
  const words2 = new Set(q2.toLowerCase().split(/\s+/))
  const intersection = new Set([...words1].filter(x => words2.has(x)))
  return intersection.size / Math.max(words1.size, words2.size, 1)
}

function retrieveFAQ(userQuestion, topK = 3) {
  if (faqDatabase.length === 0) return []
  
  const scored = faqDatabase.map(faq => ({
    ...faq,
    score: calculateSimilarity(userQuestion, faq.question)
  }))
  
  return scored
    .filter(f => f.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
}

export const faqRetrieverTool = defineTool({
  name: 'faq_retriever',
  description: '从知识库检索相关 FAQ',
  parameters: {
    question: { type: 'string', required: true },
    top_k: { type: 'number', default: 3 }
  },
  output: {
    schema: { type: 'object', additionalProperties: true },
    render: (_args, value) => {
      if (!value.found) {
        return [{ type: 'text', text: '未找到相关问题，建议转人工客服' }]
      }
      const answers = value.answers.map(a => 
        `问题：${a.question}\n回答：${a.answer}`
      ).join('\n\n')
      return [{ type: 'text', text: answers }]
    }
  },
  async execute(args) {
    const results = retrieveFAQ(args.question, args.top_k)
    
    if (results.length === 0) {
      return { found: false, answers: [] }
    }
    
    return {
      found: true,
      answers: results.map(r => ({
        question: r.question,
        answer: r.answer,
        similarity: r.score,
        category: r.category
      }))
    }
  }
})
