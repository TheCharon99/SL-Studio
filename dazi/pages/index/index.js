Page({
  data: {
    categories: ['全部', '美食', '运动', '娱乐', '学习', '旅行'],
    currentCategory: '全部',
    searchKeyword: '',
    searchHistory: [],
    activities: [
      { id: 1, title: '周末火锅局，找饭搭子', type: '美食', location: '上海·静安区', time: '本周六 18:00', people: '2/4人', tags: ['火锅', '聚餐'], username: '美食家小王', emoji: '🧑', favorited: false },
      { id: 2, title: '一起去看艺术展', type: '娱乐', location: '上海·黄浦区', time: '本周日 14:00', people: '1/2人', tags: ['展览', '艺术'], username: '艺术控小李', emoji: '👩', favorited: false },
      { id: 3, title: '晨跑打卡，一起运动', type: '运动', location: '上海·徐汇区', time: '明天 07:00', people: '3/5人', tags: ['跑步', '晨练'], username: '跑步达人小张', emoji: '🏃', favorited: false },
      { id: 4, title: '周末咖啡探店', type: '美食', location: '上海·长宁区', time: '周六 10:00', people: '1/3人', tags: ['咖啡', '探店'], username: '咖啡爱好者', emoji: '☕', favorited: false },
      { id: 5, title: '羽毛球约战', type: '运动', location: '上海·浦东新区', time: '周日 15:00', people: '4/6人', tags: ['羽毛球', '运动'], username: '运动达人', emoji: '🏸', favorited: false }
    ],
    filteredActivities: [],
    isLoading: false,
    emptyList: false
  },

  onLoad: function() {
    this.loadSearchHistory()
    this.filterActivities('')
    this.filterByCategory('全部')
  },

  onShow: function() {
    this.refreshActivities()
  },

  onPullDownRefresh: function() {
    var that = this
    this.setData({ isLoading: true })
    setTimeout(function() {
      that.refreshActivities()
      wx.stopPullDownRefresh()
    }, 800)
  },

  onReachBottom: function() {
    wx.showToast({ title: '没有更多活动了', icon: 'none' })
  },

  refreshActivities: function() {
    var activities = this.data.activities
    try {
      var favorites = wx.getStorageSync('favorites') || []
      for (var i = 0; i < activities.length; i++) {
        activities[i].favorited = favorites.indexOf(activities[i].id) !== -1
      }
    } catch(e) {}
    this.setData({ activities: activities })
    this.filterActivities(this.data.searchKeyword)
    this.setData({ isLoading: false })
  },

  onSearchInput: function(e) {
    var keyword = e.detail.value.trim()
    this.setData({ searchKeyword: keyword.toLowerCase() })
    if (keyword) {
      this.saveSearchHistory(keyword)
    }
    this.filterActivities(keyword.toLowerCase())
  },

  onSearchHistoryTap: function(e) {
    var keyword = e.currentTarget.dataset.value
    this.setData({ searchKeyword: keyword })
    this.filterActivities(keyword.toLowerCase())
  },

  filterActivities: function(keyword) {
    var activities = this.data.activities
    if (!keyword) {
      this.setData({ 
        filteredActivities: activities,
        emptyList: activities.length === 0
      })
      return
    }
    var filtered = activities.filter(function(item) {
      return item.title.toLowerCase().indexOf(keyword) !== -1 ||
             item.location.toLowerCase().indexOf(keyword) !== -1 ||
             item.tags.some(function(tag) { return tag.toLowerCase().indexOf(keyword) !== -1 }) ||
             item.username.toLowerCase().indexOf(keyword) !== -1
    })
    this.setData({ 
      filteredActivities: filtered,
      emptyList: filtered.length === 0
    })
  },

  filterByCategory: function(category) {
    var activities = this.data.activities
    var filtered = category === '全部' ? activities : activities.filter(function(a) { return a.type === category })
    this.setData({ filteredActivities: filtered, emptyList: filtered.length === 0 })
  },

  switchCategory: function(e) {
    var category = e.currentTarget.dataset.id
    this.setData({ currentCategory: category })
    this.filterByCategory(category)
  },

  clearSearch: function() {
    this.setData({ searchKeyword: '' })
    this.filterActivities('')
    this.filterByCategory(this.data.currentCategory)
    var that = this
    setTimeout(function() {
      wx.createSelectorQuery().select('#searchInput').focus()
    }, 100)
  },

  loadSearchHistory: function() {
    try {
      var history = wx.getStorageSync('searchHistory') || []
      this.setData({ searchHistory: history })
    } catch(e) {}
  },

  saveSearchHistory: function(keyword) {
    if (!keyword) return
    var history = this.data.searchHistory
    var idx = history.indexOf(keyword)
    if (idx !== -1) history.splice(idx, 1)
    history.unshift(keyword)
    if (history.length > 10) history = history.slice(0, 10)
    try {
      wx.setStorageSync('searchHistory', history)
    } catch(e) {}
    this.setData({ searchHistory: history })
  },

  clearHistory: function() {
    var that = this
    wx.showModal({
      title: '清除历史',
      content: '确定清除所有搜索历史吗？',
      success: function(res) {
        if (res.confirm) {
          try { wx.removeStorageSync('searchHistory') } catch(e) {}
          that.setData({ searchHistory: [] })
        }
      }
    })
  },

  goToDetail: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id })
  },

  toggleFavorite: function(e) {
    var id = e.currentTarget.dataset.id
    var activities = this.data.activities
    for (var i = 0; i < activities.length; i++) {
      if (activities[i].id === id) {
        activities[i].favorited = !activities[i].favorited
        break
      }
    }
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
    this.setData({ activities: activities })
  },

  goToCalendar: function() {
    wx.navigateTo({ url: '/pages/calendar/calendar' })
  },

  onShareAppMessage: function() {
    return { title: '找个搭子一起做事', path: '/pages/index/index' }
  }
})
