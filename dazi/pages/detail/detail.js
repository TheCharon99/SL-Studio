Page({
  data: {
    activity: null,
    hasJoined: false,
    commentCount: 2
  },

  onLoad: function(options) {
    var id = parseInt(options.id)
    this.loadActivity(id)
  },

  onShow: function() {
    if (this.data.activity) {
      this.checkJoined()
    }
  },

  loadActivity: function(id) {
    var app = getApp()
    var activities = app.globalData.activities
    var activity = null
    
    for (var i = 0; i < activities.length; i++) {
      if (activities[i].id === id) {
        activity = activities[i]
        break
      }
    }
    
    if (activity) {
      this.setData({ 
        activity: activity,
        hasJoined: app.globalData.myJoinedIds.indexOf(id) !== -1
      })
      wx.setNavigationBarTitle({ title: activity.title })
    }
  },

  checkJoined: function() {
    var app = getApp()
    var id = this.data.activity.id
    this.setData({
      hasJoined: app.globalData.myJoinedIds.indexOf(id) !== -1
    })
  },

  joinActivity: function() {
    var app = getApp()
    var activity = this.data.activity
    if (!activity) return
    
    var result = app.joinActivity(activity.id)
    
    if (result.success) {
      this.setData({ hasJoined: true })
      this.loadActivity(activity.id)
      wx.showToast({
        title: result.msg,
        icon: 'success'
      })
      setTimeout(function() {
        wx.navigateBack()
      }, 1500)
    } else {
      wx.showToast({
        title: result.msg,
        icon: 'none'
      })
    }
  },

  onShareAppMessage: function() {
    var activity = this.data.activity
    if (activity) {
      return {
        title: '一起来参加这个活动吧！' + activity.title,
        path: '/pages/detail/detail?id=' + activity.id
      }
    }
  },

  goToReview: function(e) {
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/review/review?activityId=' + id + '&name=' + encodeURIComponent(name)
    })
  },

  goToComment: function(e) {
    var id = e.currentTarget.dataset.id
    var title = decodeURIComponent(e.currentTarget.dataset.title || '活动')
    wx.navigateTo({
      url: '/pages/comment/comment?activityId=' + id + '&title=' + encodeURIComponent(title)
    })
  }
})
