Page({
  data: {
    activityId: null,
    activityName: '',
    activityOrganizer: '',
    rating: 0,
    hoverRating: 0,
    comment: '',
    submitting: false,
    reviews: [],
    tagSelected: []
  },

  onLoad: function(options) {
    var activityId = parseInt(options.activityId) || 0
    var activityName = options.name || '活动'
    var organizer = options.organizer || '组织者'
    
    this.setData({
      activityId: activityId,
      activityName: activityName,
      activityOrganizer: organizer
    })
    
    this.loadReviews(activityId)
  },

  loadReviews: function(activityId) {
    var reviews = []
    if (activityId === 1) {
      reviews = [
        { id: 1, user: '吃货小王', avatar: '👨', rating: 5, comment: '火锅很好吃，组织者很热情！', time: '2025-08-25', tags: ['准时', '热情'] },
        { id: 2, user: '美食达人', avatar: '👩', rating: 4, comment: '活动安排得不错，下次还来', time: '2025-08-20', tags: ['有趣'] }
      ]
    } else if (activityId === 2) {
      reviews = [
        { id: 3, user: '艺术爱好者', avatar: '🎨', rating: 5, comment: '展览很棒，期待下次一起', time: '2025-08-18', tags: ['专业', '友好'] }
      ]
    }
    
    this.setData({ reviews: reviews })
  },

  setRating: function(e) {
    var rating = e.currentTarget.dataset.rating
    this.setData({ rating: rating })
  },

  onRatingHover: function(e) {
    var rating = e.currentTarget.dataset.rating
    this.setData({ hoverRating: rating })
  },

  onRatingLeave: function() {
    this.setData({ hoverRating: 0 })
  },

  onCommentInput: function(e) {
    this.setData({ comment: e.detail.value })
  },

  toggleTag: function(e) {
    var tag = e.currentTarget.dataset.tag
    var tags = this.data.tagSelected
    var idx = tags.indexOf(tag)
    if (idx !== -1) {
      tags.splice(idx, 1)
    } else {
      tags.push(tag)
    }
    this.setData({ tagSelected: tags })
  },

  submitReview: function() {
    var that = this
    var rating = this.data.rating
    var comment = this.data.comment.trim()
    var tags = this.data.tagSelected
    
    if (rating === 0) {
      wx.showToast({ title: '请选择评分', icon: 'none' })
      return
    }
    
    if (!comment) {
      wx.showToast({ title: '请输入评价内容', icon: 'none' })
      return
    }
    
    that.setData({ submitting: true })
    
    setTimeout(function() {
      var newReview = {
        id: Date.now(),
        user: '我',
        avatar: '👤',
        rating: rating,
        comment: comment,
        tags: tags,
        time: new Date().toISOString().slice(0, 10)
      }
      
      var reviews = that.data.reviews
      reviews.unshift(newReview)
      
      that.setData({
        rating: 0,
        comment: '',
        tagSelected: [],
        reviews: reviews,
        submitting: false
      })
      
      wx.showToast({ title: '评价成功', icon: 'success' })
      
      setTimeout(function() {
        wx.navigateBack()
      }, 1500)
    }, 800)
  },

  onCancel: function() {
    wx.navigateBack()
  },

  onShareAppMessage: function() {
    return {
      title: '这个活动真不错，一起来吧！',
      path: '/pages/index/index'
    }
  }
})
