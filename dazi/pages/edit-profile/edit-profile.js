Page({
  data: {
    userInfo: null,
    nickName: '',
    gender: 0,
    city: '',
    bio: '',
    interests: [],
    saving: false
  },

  onLoad: function() {
    this.loadUserInfo()
  },

  onShow: function() {
    this.loadUserInfo()
  },

  loadUserInfo: function() {
    var app = getApp()
    if (app.globalData.userInfo) {
      var info = app.globalData.userInfo
      this.setData({
        userInfo: info,
        nickName: info.nickName || '',
        gender: info.gender || 0,
        city: info.city || '',
        bio: info.bio || '',
        interests: info.interests || []
      })
    }
  },

  onChooseAvatar: function(e) {
    var userInfo = {
      avatarUrl: e.detail.avatarUrl,
      nickName: this.data.nickName || '搭子用户',
      gender: this.data.gender,
      city: this.data.city,
      bio: this.data.bio,
      interests: this.data.interests
    }
    getApp().login(userInfo)
    this.setData({ userInfo: userInfo })
  },

  onNickNameInput: function(e) {
    this.setData({ nickName: e.detail.value })
  },

  onBioInput: function(e) {
    this.setData({ bio: e.detail.value })
  },

  onCityInput: function(e) {
    this.setData({ city: e.detail.value })
  },

  toggleGender: function(e) {
    var gender = e.currentTarget.dataset.gender
    this.setData({ gender: gender })
  },

  toggleInterest: function(e) {
    var interest = e.currentTarget.dataset.interest
    var interests = this.data.interests
    var idx = interests.indexOf(interest)
    if (idx !== -1) {
      interests.splice(idx, 1)
    } else {
      if (interests.length >= 5) {
        wx.showToast({ title: '最多选择5个标签', icon: 'none' })
        return
      }
      interests.push(interest)
    }
    this.setData({ interests: interests })
  },

  saveProfile: function() {
    if (!this.data.nickName.trim()) {
      wx.showToast({ title: '请输入昵称', icon: 'none' })
      return
    }
    var that = this
    that.setData({ saving: true })
    
    setTimeout(function() {
      var app = getApp()
      var userInfo = {
        avatarUrl: that.data.userInfo ? that.data.userInfo.avatarUrl : '',
        nickName: that.data.nickName.trim(),
        gender: that.data.gender,
        city: that.data.city.trim(),
        bio: that.data.bio.trim(),
        interests: that.data.interests
      }
      app.login(userInfo)
      that.setData({ saving: false })
      wx.showToast({ title: '保存成功', icon: 'success' })
      setTimeout(function() {
        wx.navigateBack()
      }, 1500)
    }, 800)
  },

  cancel: function() {
    wx.navigateBack()
  },

  onShareAppMessage: function() {
    return { title: '找个搭子一起做事', path: '/pages/index/index' }
  }
})
