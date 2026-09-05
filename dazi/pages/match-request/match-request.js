Page({
  data: {
    activityId: null,
    activityTitle: '',
    matchReason: '',
    submitMessage: ''
  },

  onLoad: function(options) {
    var activityId = parseInt(options.activityId) || 0
    var activityTitle = decodeURIComponent(options.title || '活动')
    this.setData({ activityId: activityId, activityTitle: activityTitle })
  },

  onReasonInput: function(e) {
    this.setData({ matchReason: e.detail.value })
  },

  submitMatch: function() {
    var that = this
    var reason = this.data.matchReason.trim()
    
    if (!reason) {
      wx.showToast({ title: '请输入申请理由', icon: 'none' })
      return
    }
    if (reason.length < 5) {
      wx.showToast({ title: '理由至少5个字', icon: 'none' })
      return
    }
    
    that.setData({ submitting: true })
    
    setTimeout(function() {
      // 模拟发送匹配申请
      var messages = getApp().globalData.messages || []
      messages.unshift({
        id: Date.now(),
        type: 'match',
        icon: '🤝',
        title: '匹配申请已发送',
        content: '您的搭子申请已发送给活动发起人',
        time: '刚刚',
        read: false,
        activityId: that.data.activityId
      })
      getApp().globalData.messages = messages
      getApp().saveToStorage()
      
      that.setData({ submitting: false })
      wx.showToast({ title: '申请已发送', icon: 'success' })
      setTimeout(function() {
        wx.navigateBack()
      }, 1500)
    }, 800)
  },

  onShareAppMessage: function() {
    return { title: '找个搭子一起做事', path: '/pages/index/index' }
  }
})
