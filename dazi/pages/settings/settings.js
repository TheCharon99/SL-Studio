Page({
  data: {
    version: '1.0.0',
    feedback: '',
    isLoggedIn: false
  },

  onLoad: function() {
    var app = getApp()
    this.setData({ isLoggedIn: app.globalData.isLoggedIn || false })
    try {
      var notification = wx.getStorageSync('notification')
      if (notification !== '') {
        this.setData({ notificationEnabled: notification === 'true' })
      }
    } catch(e) {}
  },

  onToggleNotification: function(e) {
    this.setData({ notificationEnabled: e.detail.value })
    try {
      wx.setStorageSync('notification', e.detail.value)
    } catch(e) {}
  },

  onFeedback: function(e) {
    this.setData({ feedback: e.detail.value })
  },

  onFeedbackInput: function(e) {
    this.setData({ feedback: e.detail.value })
  },

  submitFeedback: function() {
    var content = this.data.feedback.trim()
    if (!content) {
      wx.showToast({ title: '请输入反馈内容', icon: 'none' })
      return
    }
    wx.navigateTo({ url: '/pages/feedback/feedback' })
  },

  showFeedback: function() {
    wx.navigateTo({ url: '/pages/feedback/feedback' })
  },

  clearCache: function() {
    var that = this
    wx.showModal({
      title: '清除缓存',
      content: '确定清除所有缓存数据吗？',
      success: function(res) {
        if (res.confirm) {
          try {
            wx.clearStorageSync()
            wx.showToast({ title: '清除成功', icon: 'success' })
          } catch(e) {
            wx.showToast({ title: '清除失败', icon: 'none' })
          }
        }
      }
    })
  },

  navToProfile: function() {
    wx.navigateTo({ url: '/pages/edit-profile/edit-profile' })
  },

  navToSecurity: function() {
    wx.navigateTo({ url: '/pages/security/security' })
  },

  navToNotification: function() {
    wx.showToast({ title: '通知设置', icon: 'none' })
  },

  navToLocation: function() {
    wx.openSetting()
  },

  navToAbout: function() {
    wx.showModal({
      title: '关于找搭子',
      content: '找搭子是一款帮助职场人士找到志同道合伙伴的社交小程序。\n\n版本：v' + this.data.version + '\n开发：Nous Research',
      showCancel: false
    })
  },

  navToPrivacy: function() {
    wx.showModal({
      title: '隐私协议',
      content: '我们重视您的隐私保护...\n（详细内容请联系开发者）',
      showCancel: false
    })
  },

  navToTerms: function() {
    wx.showModal({
      title: '用户协议',
      content: '使用本服务即表示您同意我们的用户协议...\n（详细内容请联系开发者）',
      showCancel: false
    })
  },

  logout: function() {
    var that = this
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          getApp().clearLogin()
          that.setData({ isLoggedIn: false })
          wx.showToast({ title: '已退出登录', icon: 'success' })
        }
      }
    })
  },

  onShareAppMessage: function() {
    return { title: '找个搭子一起做事', path: '/pages/index/index' }
  }
})
