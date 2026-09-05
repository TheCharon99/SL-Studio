Page({
  data: {
    favorites: []
  },

  onLoad: function() {
    this.loadFavorites()
  },

  onShow: function() {
    this.loadFavorites()
  },

  loadFavorites: function() {
    try {
      var ids = wx.getStorageSync('favorites') || []
      var activities = getApp().globalData.activities
      var favorites = []
      
      for (var i = 0; i < activities.length; i++) {
        if (ids.indexOf(activities[i].id) !== -1) {
          favorites.push(activities[i])
        }
      }
      
      this.setData({ favorites: favorites })
    } catch(e) {
      console.error('加载收藏失败', e)
    }
  },

  goToDetail: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id })
  },

  toggleFavorite: function(e) {
    var id = e.currentTarget.dataset.id
    var favorites = []
    try {
      favorites = wx.getStorageSync('favorites') || []
    } catch(e) {}
    
    var idx = favorites.indexOf(id)
    if (idx !== -1) {
      favorites.splice(idx, 1)
      wx.showToast({ title: '已取消收藏', icon: 'none' })
    } else {
      favorites.push(id)
      wx.showToast({ title: '已收藏', icon: 'success' })
    }
    
    try {
      wx.setStorageSync('favorites', favorites)
    } catch(e) {}
    
    this.loadFavorites()
  },

  onShareAppMessage: function() {
    return { title: '找个搭子一起做事', path: '/pages/index/index' }
  }
})
