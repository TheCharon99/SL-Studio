// SearchAI - 跨平台 AI 搜索助手
// React 前端主组件

import { useState, useEffect, useRef } from 'react'
import { invoke } from '@tauri-apps/api/core'
import SearchBox from './components/SearchBox'
import ResultList from './components/ResultList'
import HistoryPanel from './components/HistoryPanel'
import SettingsPanel from './components/SettingsPanel'
import SourceSelector from './components/SourceSelector'
import { useSearch } from './hooks/useSearch'
import { useSettings } from './hooks/useSettings'
import type { SearchResult, SearchOptions } from './types'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'search' | 'history' | 'settings'>('search')
  const { search, results, isLoading } = useSearch()
  const { settings, updateSetting } = useSettings()
  const inputRef = useRef<HTMLInputElement>(null)

  // 快捷键监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Space 打开/关闭搜索框
      if ((e.ctrlKey || e.metaKey) && e.code === 'Space') {
        e.preventDefault()
        setIsOpen(prev => !prev)
        if (!e.ctrlKey && !e.metaKey) {
          setTimeout(() => inputRef.current?.focus(), 100)
        }
      }
      
      // Esc 关闭
      if (e.code === 'Escape' && isOpen) {
        setIsOpen(false)
        setQuery('')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // 搜索处理
  const handleSearch = async (searchQuery: string, sources: string[]) => {
    setQuery(searchQuery)
    const options: SearchOptions = {
      sources,
      limit: settings.maxResults || 20
    }
    await search(searchQuery, options)
  }

  // 打开搜索框
  const openSearch = () => {
    setIsOpen(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  return (
    <div className="app">
      {/* 主界面（后台模糊） */}
      <div className={`main-content ${isOpen ? 'blur' : ''}`}>
        <header className="header">
          <h1>🔍 SearchAI</h1>
          <p>按 <kbd>Ctrl+Space</kbd> 或 <kbd>Cmd+Space</kbd> 开始搜索</p>
        </header>
        
        <main className="main">
          <div className="welcome">
            <div className="logo">🤖</div>
            <h2>你的私人 AI 搜索助手</h2>
            <p>跨平台搜索 · AI 语义理解 · 隐私优先</p>
            
            <div className="features">
              <div className="feature">
                <span className="icon">🔍</span>
                <span>Notion 搜索</span>
              </div>
              <div className="feature">
                <span className="icon">📧</span>
                <span>邮件搜索</span>
              </div>
              <div className="feature">
                <span className="icon">📁</span>
                <span>本地文件</span>
              </div>
              <div className="feature">
                <span className="icon">🧠</span>
                <span>AI 总结</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 搜索浮层 */}
      {isOpen && (
        <div className="search-overlay" onClick={() => setIsOpen(false)}>
          <div className="search-container" onClick={e => e.stopPropagation()}>
            {/* 搜索框 */}
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && query.trim()) {
                    const sources = settings.enabledSources || ['local']
                    handleSearch(query, sources)
                  }
                }}
                placeholder="搜索 Notion、邮件、本地文件..."
                className="search-input"
              />
              <button 
                className="clear-btn"
                onClick={() => { setQuery(''); setIsOpen(false) }}
              >
                ✕
              </button>
            </div>

            {/* 来源选择 */}
            <SourceSelector 
              enabledSources={settings.enabledSources || []}
              onToggle={source => {
                const sources = settings.enabledSources || []
                const newSources = sources.includes(source)
                  ? sources.filter(s => s !== source)
                  : [...sources, source]
                updateSetting('enabledSources', newSources)
              }}
            />

            {/* 标签页 */}
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'search' ? 'active' : ''}`}
                onClick={() => setActiveTab('search')}
              >
                🔍 搜索
              </button>
              <button 
                className={`tab ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                📜 历史
              </button>
              <button 
                className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                ⚙️ 设置
              </button>
            </div>

            {/* 搜索结果 */}
            {activeTab === 'search' && (
              <ResultList 
                results={results}
                isLoading={isLoading}
                query={query}
                onOpen={(result) => {
                  // 打开搜索结果
                  console.log('Opening result:', result)
                }}
              />
            )}

            {/* 历史记录 */}
            {activeTab === 'history' && (
              <HistoryPanel />
            )}

            {/* 设置面板 */}
            {activeTab === 'settings' && (
              <SettingsPanel />
            )}

            {/* 快捷键提示 */}
            <div className="shortcuts">
              <span><kbd>Enter</kbd> 搜索</span>
              <span><kbd>↑↓</kbd> 选择</span>
              <span><kbd>Esc</kbd> 关闭</span>
            </div>
          </div>
        </div>
      )}

      {/* 样式 */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        
        .app {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .main-content {
          min-height: 100vh;
          transition: filter 0.3s;
        }
        
        .main-content.blur {
          filter: blur(4px);
        }
        
        .header {
          padding: 20px;
          background: rgba(255,255,255,0.1);
          color: white;
        }
        
        .header h1 { font-size: 24px; margin-bottom: 4px; }
        .header p { font-size: 14px; opacity: 0.8; }
        
        .main {
          max-width: 800px;
          margin: 40px auto;
          padding: 0 20px;
        }
        
        .welcome {
          text-align: center;
          color: white;
        }
        
        .logo { font-size: 64px; margin-bottom: 20px; }
        .welcome h2 { font-size: 32px; margin-bottom: 10px; }
        .welcome p { font-size: 16px; opacity: 0.8; margin-bottom: 40px; }
        
        .features {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }
        
        .feature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        
        .feature .icon { font-size: 32px; }
        .feature span { font-size: 14px; opacity: 0.9; }
        
        /* 搜索浮层 */
        .search-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 10vh;
          z-index: 1000;
        }
        
        .search-container {
          background: white;
          border-radius: 16px;
          width: 600px;
          max-width: 90vw;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          overflow: hidden;
        }
        
        .search-box {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #eee;
          gap: 12px;
        }
        
        .search-icon { font-size: 20px; }
        
        .search-input {
          flex: 1;
          border: none;
          font-size: 16px;
          outline: none;
        }
        
        .clear-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #999;
        }
        
        .tabs {
          display: flex;
          border-bottom: 1px solid #eee;
        }
        
        .tab {
          flex: 1;
          padding: 12px;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 14px;
          color: #666;
          transition: all 0.2s;
        }
        
        .tab.active {
          color: #667eea;
          border-bottom: 2px solid #667eea;
        }
        
        .shortcuts {
          display: flex;
          justify-content: center;
          gap: 20px;
          padding: 12px;
          background: #f8f8f8;
          font-size: 12px;
          color: #999;
        }
        
        kbd {
          background: #eee;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
        }
      `}</style>
    </div>
  )
}

export default App
