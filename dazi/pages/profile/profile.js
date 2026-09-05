Page({
  data: {
    userInfo: null,
    isLoggedIn: false,
    stats: { acts: 0, joined: 0, dazi: 0 },
    unreadCount: 0,
    nickName: ''
  },

  onLoad: function() {
    this.checkLoginStatus()
  },

  onShow: function() {
    this.checkLoginStatus()
    this.updateStats()
  },

  checkLoginStatus: function() {
    var app = getApp()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        isLoggedIn: true,
        nickName: app.globalData.userInfo.nickName || ''
      })
    }
  },

  updateStats: function() {
    var app = getApp()
    var myJoined = app.getMyActivities()
    var myPublished = app.getMyPublished()
    
    this.setData({
      stats: {
        acts: myPublished.length,
        joined: myJoined.length,
        dazi: myJoined.length
      },
      unreadCount: app.globalData.messages ? 
        app.globalData.messages.filter(function(m) { return !m.read }).length : 0
    })
  },

  onChooseAvatar: function(e) {
    var that = this
    var userInfo = {
      avatarUrl: e.detail.avatarUrl,
      nickName: this.data.nickName || '搭子用户'
    }
    getApp().login(userInfo)
    that.setData({ userInfo: userInfo, isLoggedIn: true })
    wx.showToast({ title: '登录成功', icon: 'success' })
  },

  onNicknameInput: function(e) {
    this.setData({ nickName: e.detail.value })
  },

  oneKeyLogin: function() {
    var that = this
    wx.login({
      success: function(res) {
        if (res.code) {
          // 获取用户信息
          wx.getUserInfo({
            success: function(infoRes) {
              var userInfo = {
                avatarUrl: infoRes.userInfo.avatarUrl,
                nickName: infoRes.userInfo.nickName
              }
              getApp().login(userInfo)
              that.setData({ userInfo: userInfo, isLoggedIn: true })
              wx.showToast({ title: '登录成功', icon: 'success' })
            },
            fail: function() {
              // 如果获取失败，使用wx.login
              that.setData({ isLoggedIn: true })
              wx.showToast({ title: '登录成功', icon: 'success' })
            }
          })
        } else {
          wx.showToast({ title: '登录失败', icon: 'none' })
        }
      },
      fail: function() {
        wx.showToast({ title: '登录失败', icon: 'none' })
      }
    })
  },

  navToMessage: function() {
    wx.navigateTo({ url: '/pages/message/message' })
  },

  navToMyActivities: function() {
    wx.navigateTo({ url: '/pages/my-activities/my-activities' })
  },

  navToMyPublished: function() {
    wx.navigateTo({ url: '/pages/my-activities/my-activities' })
  },

  navToFavorites: function() {
    wx.navigateTo({ url: '/pages/favorites/favorites' })
  },

  navToSettings: function() {
    wx.navigateTo({ url: '/pages/settings/settings' })
  },

  logout: function() {
    var that = this
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          getApp().clearLogin()
          that.setData({ userInfo: null, isLoggedIn: false, nickName: '' })
          wx.showToast({ title: '已退出登录', icon: 'success' })
        }
      }
    })
  },

  onShareAppMessage: function() {
    return {
      title: '找个搭子一起做事',
      path: '/pages/index/index'
    }
  }
})
