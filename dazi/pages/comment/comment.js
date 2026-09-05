Page({
  data: {
    activityId: null,
    activityTitle: '',
    commentText: '',
    comments: [],
    submitting: false,
    replyTo: null,
    replyText: ''
  },

  onLoad: function(options) {
    var activityId = parseInt(options.activityId) || 0
    var activityTitle = decodeURIComponent(options.title || '活动')
    
    this.setData({ activityId: activityId, activityTitle: activityTitle })
    this.loadComments(activityId)
  },

  onShow: function() {
    if (this.data.activityId) {
      this.loadComments(this.data.activityId)
    }
  },

  loadComments: function(activityId) {
    var comments = []
    if (activityId === 1) {
      comments = [
        { id: 1, user: '吃货小王', avatar: '👨', content: '火锅很好吃，下次还来！', time: '2小时前', likes: 5, replies: [{ id: 11, user: '美食家小王', avatar: '👨‍🍳', content: '谢谢支持！' }] },
        { id: 2, user: '艺术控小李', avatar: '👩', content: '地点不错，推荐！', time: '5小时前', likes: 3, replies: [] }
      ]
    } else if (activityId === 2) {
      comments = [
        { id: 3, user: '看展达人', avatar: '🎨', content: '展览很棒，期待下次一起', time: '1天前', likes: 8, replies: [] }
      ]
    }
    
    this.setData({ comments: comments })
  },

  onCommentInput: function(e) {
    this.setData({ commentText: e.detail.value })
  },

  submitComment: function() {
    var that = this
    var text = this.data.commentText.trim()
    
    if (!text) {
      wx.showToast({ title: '请输入评论内容', icon: 'none' })
      return
    }
    
    that.setData({ submitting: true })
    
    setTimeout(function() {
      var newComment = {
        id: Date.now(),
        user: '我',
        avatar: '👤',
        content: text,
        time: '刚刚',
        likes: 0,
        replies: []
      }
      
      var comments = that.data.comments
      comments.unshift(newComment)
      
      that.setData({
        commentText: '',
        comments: comments,
        submitting: false
      })
      
      wx.showToast({ title: '评论成功', icon: 'success' })
    }, 500)
  },

  likeComment: function(e) {
    var id = e.currentTarget.dataset.id
    var comments = this.data.comments
    
    for (var i = 0; i < comments.length; i++) {
      if (comments[i].id === id) {
        comments[i].likes = (comments[i].likes || 0) + 1
        break
      }
    }
    
    this.setData({ comments: comments })
  },

  toggleReply: function(e) {
    var commentId = e.currentTarget.dataset.id
    var replyTo = this.data.replyTo === commentId ? null : commentId
    this.setData({ replyTo: replyTo })
  },

  onReplyInput: function(e) {
    this.setData({ replyText: e.detail.value })
  },

  submitReply: function(e) {
    var commentId = e.currentTarget.dataset.commentId
    var text = this.data.replyText ? this.data.replyText.trim() : ''
    
    if (!text) {
      wx.showToast({ title: '请输入回复内容', icon: 'none' })
      return
    }
    
    var comments = this.data.comments
    
    for (var i = 0; i < comments.length; i++) {
      if (comments[i].id === commentId) {
        if (!comments[i].replies) {
          comments[i].replies = []
        }
        comments[i].replies.push({
          id: Date.now(),
          user: '我',
          avatar: '👤',
          content: text,
          time: '刚刚'
        })
        break
      }
    }
    
    this.setData({
      comments: comments,
      replyTo: null,
      replyText: ''
    })
    
    wx.showToast({ title: '回复成功', icon: 'success' })
  },

  onShareAppMessage: function() {
    return {
      title: this.data.activityTitle + '的讨论',
      path: '/pages/comment/comment?activityId=' + this.data.activityId
    }
  }
})
