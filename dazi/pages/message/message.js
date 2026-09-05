Page({
  data: {
    messages: [],
    unreadCount: 0
  },

  onLoad: function() {
    this.loadMessages()
  },

  onShow: function() {
    this.loadMessages()
  },

  loadMessages: function() {
    var app = getApp()
    var messages = app.globalData.messages || []
    var unreadCount = messages.filter(function(m) { return !m.read }).length
    this.setData({ 
      messages: messages,
      unreadCount: unreadCount
    })
  },

  handleMessage: function(e) {
    var id = e.currentTarget.dataset.id
    var app = getApp()
    var messages = app.globalData.messages
    
    for (var i = 0; i < messages.length; i++) {
      if (messages[i].id === id) {
        messages[i].read = true
        break
      }
    }
    
    app.globalData.messages = messages
    app.saveToStorage()
    this.setData({ unreadCount: this.data.unreadCount - 1 })
    
    // 如果是活动相关消息，跳转到详情页
    var msg = messages.find(function(m) { return m.id === id })
    if (msg && msg.activityId > 0) {
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + msg.activityId
      })
    }
  },

  handleDelete: function(e) {
    var id = e.currentTarget.dataset.id
    var app = getApp()
    var messages = app.globalData.messages.filter(function(m) { return m.id !== id })
    app.globalData.messages = messages
    app.saveToStorage()
    this.setData({ messages: messages, unreadCount: this.data.unreadCount - (messages.filter(function(m) { return !m.read }).length - this.data.unreadCount) })
    wx.showToast({ title: '已删除', icon: 'none' })
  },

  handleClearAll: function() {
    var that = this
    wx.showModal({
      title: '清空消息',
      content: '确定要清空所有消息吗？',
      success: function(res) {
        if (res.confirm) {
          var app = getApp()
          app.globalData.messages = []
          app.saveToStorage()
          that.setData({ messages: [], unreadCount: 0 })
          wx.showToast({ title: '已清空', icon: 'success' })
        }
      }
    })
  },

  onShareAppMessage: function() {
    return {
      title: '找搭子 - 找到你的活动伙伴',
      path: '/pages/index/index'
    }
  }
})
