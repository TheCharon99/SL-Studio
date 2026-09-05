Page({
  data: {
    currentDate: new Date(),
    calendar: [],
    activityDates: [],
    selectedDate: null,
    selectedActivities: []
  },

  onLoad: function() {
    this.generateCalendar()
    this.loadActivityDates()
  },

  onShow: function() {
    this.generateCalendar()
  },

  loadActivityDates: function() {
    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth()
    var dates = [
      this.formatDate(new Date(year, month, 26)),
      this.formatDate(new Date(year, month, 30)),
      this.formatDate(new Date(year, month, 31))
    ]
    this.setData({ activityDates: dates })
  },

  formatDate: function(date) {
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
  },

  generateCalendar: function() {
    var now = this.data.currentDate
    var year = now.getFullYear()
    var month = now.getMonth()
    
    var firstDay = new Date(year, month, 1)
    var lastDay = new Date(year, month + 1, 0)
    var startDate = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
    
    var days = []
    var today = new Date()
    var todayStr = this.formatDate(today)
    
    var prevMonth = new Date(year, month, 0)
    for (var i = 0; i < startDate; i++) {
      days.push({
        date: prevMonth.getDate() - startDate + i + 1,
        month: prevMonth.getMonth(),
        year: prevMonth.getFullYear(),
        isCurrentMonth: false,
        isToday: false,
        hasActivity: false,
        dateStr: this.formatDate(new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonth.getDate() - startDate + i + 1))
      })
    }
    
    for (var d = 1; d <= lastDay.getDate(); d++) {
      var date = new Date(year, month, d)
      var dateStr = this.formatDate(date)
      days.push({
        date: d,
        month: month,
        year: year,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        hasActivity: this.data.activityDates.indexOf(dateStr) !== -1,
        dateStr: dateStr
      })
    }
    
    var nextMonth = new Date(year, month + 1, 1)
    var remaining = 42 - days.length
    for (var j = 1; j <= remaining; j++) {
      days.push({
        date: j,
        month: nextMonth.getMonth(),
        year: nextMonth.getFullYear(),
        isCurrentMonth: false,
        isToday: false,
        hasActivity: false,
        dateStr: this.formatDate(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), j))
      })
    }
    
    this.setData({ calendar: days })
  },

  prevMonth: function() {
    var date = this.data.currentDate
    date.setMonth(date.getMonth() - 1)
    this.setData({ currentDate: date })
    this.generateCalendar()
  },

  nextMonth: function() {
    var date = this.data.currentDate
    date.setMonth(date.getMonth() + 1)
    this.setData({ currentDate: date })
    this.generateCalendar()
  },

  selectDate: function(e) {
    var dateStr = e.currentTarget.dataset.date
    if (this.data.selectedDate === dateStr) {
      this.setData({ selectedDate: null, selectedActivities: [] })
      return
    }
    
    this.setData({ selectedDate: dateStr, selectedActivities: [] })
    
    var mockActivities = []
    if (dateStr === '2025-08-26') {
      mockActivities = [
        { id: 3, title: '晨跑打卡', time: '07:00', type: '运动' }
      ]
    } else if (dateStr === '2025-08-30') {
      mockActivities = [
        { id: 1, title: '周末火锅局', time: '18:00', type: '美食' },
        { id: 4, title: '咖啡探店', time: '10:00', type: '美食' }
      ]
    } else if (dateStr === '2025-08-31') {
      mockActivities = [
        { id: 2, title: '看艺术展', time: '14:00', type: '娱乐' },
        { id: 5, title: '羽毛球约战', time: '15:00', type: '运动' }
      ]
    }
    
    this.setData({ selectedActivities: mockActivities })
  },

  goToActivity: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id })
  },

  onShareAppMessage: function() {
    return { title: '找搭子 - 找到你的活动伙伴', path: '/pages/index/index' }
  }
})
