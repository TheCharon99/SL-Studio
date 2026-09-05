App({
  globalData: {
    userInfo: null,
    isLoggedIn: false,
    activities: [],
    messages: [],
    myJoinedIds: []
  },

  onLaunch: function() {
    this.loadFromStorage()
  },

  loadFromStorage: function() {
    var that = this
    // 加载用户信息
    try {
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        that.globalData.userInfo = userInfo
        that.globalData.isLoggedIn = true
      }
    } catch(e) {}

    // 加载活动数据
    try {
      var activities = wx.getStorageSync('activities')
      if (activities) {
        that.globalData.activities = activities
      } else {
        // 初始化示例数据
        that.initSampleData()
      }
    } catch(e) {}

    // 加载消息
    try {
      var messages = wx.getStorageSync('messages')
      if (messages) {
        that.globalData.messages = messages
      }
    } catch(e) {}

    // 加载已参与的活动
    try {
      var myJoined = wx.getStorageSync('myJoined')
      if (myJoined) {
        that.globalData.myJoinedIds = myJoined
      }
    } catch(e) {}
  },

  initSampleData: function() {
    var sampleActivities = [
      {
        id: 1,
        title: '周末火锅局，找饭搭子',
        type: '美食',
        location: '上海·静安区',
        address: '南京西路1266号恒隆广场',
        time: '本周六 18:00',
        date: '2025-08-30',
        people: '2/4人',
        maxPeople: 4,
        currentPeople: 2,
        tags: ['火锅', '聚餐'],
        emoji: '🧑',
        username: '美食家小王',
        userAvatar: '👨‍🍳',
        description: '周末想和大家一起吃火锅，寻找饭搭子！',
        status: '报名中',
        createTime: Date.now()
      },
      {
        id: 2,
        title: '一起去看艺术展',
        type: '娱乐',
        location: '上海·黄浦区',
        address: '外滩源美术馆',
        time: '本周日 14:00',
        date: '2025-08-31',
        people: '1/2人',
        maxPeople: 2,
        currentPeople: 1,
        tags: ['展览', '艺术'],
        emoji: '👩',
        username: '艺术控小李',
        userAvatar: '🎨',
        description: '周末有个艺术展想一起去看看，一个人去有点无聊。',
        status: '报名中',
        createTime: Date.now() - 100000
      },
      {
        id: 3,
        title: '晨跑打卡，一起运动',
        type: '运动',
        location: '上海·徐汇区',
        address: '徐汇滨江跑道',
        time: '明天 07:00',
        date: '2025-08-26',
        people: '3/5人',
        maxPeople: 5,
        currentPeople: 3,
        tags: ['跑步', '晨练'],
        emoji: '🏃',
        username: '跑步达人小张',
        userAvatar: '🏅',
        description: '每天早上跑步打卡，寻找运动搭子一起坚持！',
        status: '报名中',
        createTime: Date.now() - 200000
      },
      {
        id: 4,
        title: '周末咖啡探店',
        type: '美食',
        location: '上海·长宁区',
        address: '愚园路咖啡馆街',
        time: '周六 10:00',
        date: '2025-08-30',
        people: '1/3人',
        maxPeople: 3,
        currentPeople: 1,
        tags: ['咖啡', '探店'],
        emoji: '☕',
        username: '咖啡爱好者',
        userAvatar: '🤎',
        description: '周末想去愚园路探几家新店，寻找咖啡搭子！',
        status: '报名中',
        createTime: Date.now() - 300000
      },
      {
        id: 5,
        title: '羽毛球约战',
        type: '运动',
        location: '上海·浦东新区',
        address: '浦东体育馆',
        time: '周日 15:00',
        date: '2025-08-31',
        people: '4/6人',
        maxPeople: 6,
        currentPeople: 4,
        tags: ['羽毛球', '运动'],
        emoji: '🏸',
        username: '运动达人',
        userAvatar: '🏆',
        description: '周日晚上想打羽毛球，需要凑人！',
        status: '报名中',
        createTime: Date.now() - 400000
      }
    ]
    this.globalData.activities = sampleActivities
    this.saveToStorage()
  },

  saveToStorage: function() {
    try {
      wx.setStorageSync('activities', this.globalData.activities)
      wx.setStorageSync('messages', this.globalData.messages)
      wx.setStorageSync('myJoined', this.globalData.myJoinedIds)
      if (this.globalData.userInfo) {
        wx.setStorageSync('userInfo', this.globalData.userInfo)
      }
    } catch(e) {
      console.error('Storage error:', e)
    }
  },

  login: function(userInfo) {
    var that = this
    that.globalData.userInfo = userInfo
    that.globalData.isLoggedIn = true
    wx.setStorageSync('userInfo', userInfo)
  },

  // 发布新活动
  addActivity: function(activity) {
    activity.id = Date.now()
    activity.createTime = Date.now()
    activity.currentPeople = 1
    activity.people = '1/' + activity.maxPeople
    activity.status = '报名中'
    this.globalData.activities.unshift(activity)
    this.saveToStorage()
    return activity.id
  },

  // 报名活动
  joinActivity: function(activityId) {
    var activities = this.globalData.activities
    for (var i = 0; i < activities.length; i++) {
      if (activities[i].id === activityId) {
        if (activities[i].currentPeople >= activities[i].maxPeople) {
          return { success: false, msg: '活动已满员' }
        }
        activities[i].currentPeople++
        activities[i].people = activities[i].currentPeople + '/' + activities[i].maxPeople
        if (activities[i].currentPeople >= activities[i].maxPeople) {
          activities[i].status = '已满员'
        }
        break
      }
    }
    if (this.globalData.myJoinedIds.indexOf(activityId) === -1) {
      this.globalData.myJoinedIds.push(activityId)
    }
    this.saveToStorage()
    return { success: true, msg: '报名成功' }
  },

  // 获取我的活动
  getMyActivities: function() {
    var myIds = this.globalData.myJoinedIds
    var result = []
    var activities = this.globalData.activities
    for (var i = 0; i < activities.length; i++) {
      if (myIds.indexOf(activities[i].id) !== -1) {
        result.push(activities[i])
      }
    }
    return result
  },

  // 获取我的发布
  getMyPublished: function() {
    // 简化：返回所有活动（实际应该按用户过滤）
    return this.globalData.activities
  },

  // 退出登录
  clearLogin: function() {
    this.globalData.userInfo = null
    this.globalData.isLoggedIn = false
    try {
      wx.removeStorageSync('userInfo')
    } catch(e) {}
  }
})
