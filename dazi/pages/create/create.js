Page({
  data: {
    title: '',
    type: '',
    location: '',
    address: '',
    maxPeople: 4,
    time: '',
    date: '',
    description: '',
    publishing: false,
    types: ['美食', '运动', '娱乐', '学习', '旅行']
  },

  onTitleInput: function(e) {
    this.setData({ title: e.detail.value })
  },

  onLocationInput: function(e) {
    this.setData({ location: e.detail.value })
  },

  onAddressInput: function(e) {
    this.setData({ address: e.detail.value })
  },

  onDescriptionInput: function(e) {
    this.setData({ description: e.detail.value })
  },

  selectType: function(e) {
    this.setData({ type: e.currentTarget.dataset.type })
  },

  onDateChange: function(e) {
    this.setData({ date: e.detail.value })
  },

  onTimeChange: function(e) {
    this.setData({ time: e.detail.value })
  },

  onMaxPeopleChange: function(e) {
    this.setData({ maxPeople: parseInt(e.detail.value) || 4 })
  },

  publish: function() {
    if (!this.data.title.trim()) {
      wx.showToast({ title: '请输入活动标题', icon: 'none' })
      return
    }
    if (!this.data.type) {
      wx.showToast({ title: '请选择活动类型', icon: 'none' })
      return
    }
    if (!this.data.location.trim()) {
      wx.showToast({ title: '请输入地点', icon: 'none' })
      return
    }

    var that = this
    var app = getApp()
    
    that.setData({ publishing: true })
    
    setTimeout(function() {
      var activity = {
        title: that.data.title,
        type: that.data.type,
        location: that.data.location,
        address: that.data.address || that.data.location,
        time: that.data.time || '待定',
        date: that.data.date || '',
        people: '0/' + that.data.maxPeople,
        maxPeople: that.data.maxPeople,
        currentPeople: 0,
        tags: [that.data.type],
        emoji: that.getTypeEmoji(that.data.type),
        username: app.globalData.userInfo ? app.globalData.userInfo.nickName : '我',
        userAvatar: app.globalData.userInfo ? app.globalData.userInfo.avatarUrl : '👤',
        description: that.data.description || '暂无描述',
        status: '报名中',
        createTime: Date.now()
      }

      var newId = app.addActivity(activity)
      
      that.setData({ publishing: false })
      
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      })

      // 添加消息通知
      var messages = app.globalData.messages || []
      messages.unshift({
        id: Date.now(),
        type: 'system',
        icon: '🎉',
        title: '发布成功',
        content: '您的活动「' + activity.title + '」已发布',
        time: '刚刚',
        read: true,
        activityId: 0
      })
      app.globalData.messages = messages
      app.saveToStorage()

      setTimeout(function() {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }, 1500)
    }, 800)
  },

  getTypeEmoji: function(type) {
    var emojis = {
      '美食': '🍜',
      '运动': '⚽',
      '娱乐': '🎮',
      '学习': '📚',
      '旅行': '✈️'
    }
    return emojis[type] || '🎯'
  },

  onShareAppMessage: function() {
    return {
      title: this.data.title || '找个搭子一起做事',
      path: '/pages/index/index'
    }
  }
})
