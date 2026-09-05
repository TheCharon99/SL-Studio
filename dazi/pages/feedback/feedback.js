Page({
  data: {
    category: '',
    content: '',
    images: [],
    contact: '',
    submitting: false,
    categories: ['功能建议', 'Bug反馈', '用户体验', '其他']
  },

  onCategoryChange: function(e) {
    var idx = e.detail.value
    this.setData({ category: this.data.categories[idx] })
  },

  onContentInput: function(e) {
    this.setData({ content: e.detail.value })
  },

  onContactInput: function(e) {
    this.setData({ contact: e.detail.value })
  },

  chooseImage: function() {
    var that = this
    wx.chooseImage({
      count: 9 - that.data.images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var newImages = that.data.images.concat(res.tempFilePaths)
        that.setData({ images: newImages })
      }
    })
  },

  deleteImage: function(e) {
    var idx = e.currentTarget.dataset.idx
    var images = this.data.images
    images.splice(idx, 1)
    this.setData({ images: images })
  },

  submit: function() {
    var category = this.data.category
    var content = this.data.content.trim()
    
    if (!category) {
      wx.showToast({ title: '请选择反馈类型', icon: 'none' })
      return
    }
    if (!content) {
      wx.showToast({ title: '请输入反馈内容', icon: 'none' })
      return
    }
    
    var that = this
    that.setData({ submitting: true })
    
    // 模拟提交
    setTimeout(function() {
      that.setData({ submitting: false })
      wx.showToast({ title: '提交成功', icon: 'success' })
      setTimeout(function() {
        wx.navigateBack()
      }, 1500)
    }, 1000)
  },

  onShareAppMessage: function() {
    return { title: '找搭子 - 意见反馈', path: '/pages/index/index' }
  }
})
