Page({
  data: {
    matches: []
  },

  onLoad: function() {
    this.loadMatches()
  },

  onShow: function() {
    this.loadMatches()
  },

  loadMatches: function() {
    var app = getApp()
    // 加载推荐搭子列表
    var matches = [
      { id: 1, name: '小李', emoji: '🧑', dist: 0.5, reason: '兴趣相投', activityId: 1 },
      { id: 2, name: '小王', emoji: '👩', dist: 1.2, reason: '距离很近', activityId: 2 },
      { id: 3, name: '小张', emoji: '🏃', dist: 2.0, reason: '都喜欢运动', activityId: 3 },
      { id: 4, name: '小陈', emoji: '☕', dist: 0.8, reason: '咖啡爱好者', activityId: 4 },
      { id: 5, name: '小刘', emoji: '🎬', dist: 1.5, reason: '电影搭子', activityId: 2 }
    ]
    this.setData({ matches: matches })
  },

  goToMatchRequest: function(e) {
    var id = e.currentTarget.dataset.id
    var activityId = e.currentTarget.dataset.activityid
    wx.navigateTo({
      url: '/pages/match-request/match-request?activityId=' + activityId
    })
  },

  ignore: function(e) {
    var id = e.currentTarget.dataset.id
    var matches = this.data.matches.filter(function(m) { return m.id !== id })
    this.setData({ matches: matches })
  },

  onShareAppMessage: function() {
    return { title: '找到搭子一起做事', path: '/pages/index/index' }
  }
})
