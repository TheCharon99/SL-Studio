Page({
  data: {
    activities: []
  },

  onLoad: function() {
    this.loadMyActivities()
  },

  onShow: function() {
    this.loadMyActivities()
  },

  loadMyActivities: function() {
    var app = getApp()
    var myJoined = app.getMyActivities()
    this.setData({ activities: myJoined })
  },

  goToDetail: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },

  goToDiscover: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  cancelJoin: function(e) {
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '取消报名',
      content: '确定要取消报名吗？',
      success: function(res) {
        if (res.confirm) {
          var app = getApp()
          var activities = app.globalData.activities
          for (var i = 0; i < activities.length; i++) {
            if (activities[i].id === id) {
              if (activities[i].currentPeople > 0) {
                activities[i].currentPeople--
                activities[i].people = activities[i].currentPeople + '/' + activities[i].maxPeople
                if (activities[i].currentPeople < activities[i].maxPeople) {
                  activities[i].status = '报名中'
                }
              }
              break
            }
          }
          var idx = app.globalData.myJoinedIds.indexOf(id)
          if (idx !== -1) {
            app.globalData.myJoinedIds.splice(idx, 1)
          }
          app.saveToStorage()
          wx.showToast({ title: '已取消', icon: 'none' })
          setTimeout(function() {
            wx.navigateBack()
          }, 1000)
        }
      }
    })
  },

  onShareAppMessage: function() {
    return {
      title: '我的活动',
      path: '/pages/profile/profile'
    }
  }
})
