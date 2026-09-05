Page({
  data: {
    passwordVisible: false,
    newPassword: '',
    confirmPassword: '',
    saving: false,
    tips: [
      { icon: '🔒', title: '定期更换密码', desc: '建议每3个月更换一次密码' },
      { icon: '🛡️', title: '设置安全问题', desc: '找回密码更安全' },
      { icon: '📱', title: '绑定手机', desc: '绑定后可接收安全验证' }
    ]
  },

  onTogglePassword: function() {
    this.setData({ passwordVisible: !this.data.passwordVisible })
  },

  onNewPasswordInput: function(e) {
    this.setData({ newPassword: e.detail.value })
  },

  onConfirmPasswordInput: function(e) {
    this.setData({ confirmPassword: e.detail.value })
  },

  changePassword: function() {
    var pwd = this.data.newPassword
    var confirm = this.data.confirmPassword
    
    if (!pwd) {
      wx.showToast({ title: '请输入新密码', icon: 'none' })
      return
    }
    if (pwd.length < 6) {
      wx.showToast({ title: '密码至少6位', icon: 'none' })
      return
    }
    if (pwd !== confirm) {
      wx.showToast({ title: '两次密码不一致', icon: 'none' })
      return
    }
    
    var that = this
    that.setData({ saving: true })
    
    setTimeout(function() {
      that.setData({ saving: false })
      wx.showToast({ title: '密码修改成功', icon: 'success' })
      setTimeout(function() {
        wx.navigateBack()
      }, 1500)
    }, 1000)
  },

  toggleLocation: function(e) {
    var enabled = e.detail.value
    wx.showToast({ 
      title: enabled ? '已开启定位' : '已关闭定位', 
      icon: 'none' 
    })
  },

  onShareAppMessage: function() {
    return { title: '找个搭子一起做事', path: '/pages/index/index' }
  }
})
