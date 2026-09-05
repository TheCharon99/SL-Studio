# 项目修复记录

## 2026-08-27 系统自检修复

### 修复内容
1. **calendar.js**: 移除模板函数调用，改用data属性预计算dateStr
2. **settings.js**: 添加缺失方法 `showFeedback`, `logout`, `onFeedback`
3. **security.js**: 添加缺失方法 `toggleLocation`
4. **index.js**: 添加 `filterByCategory`, `onSearchHistoryTap` 方法

### 自检结果
- ✅ 所有JS语法检查通过
- ✅ 所有WXML事件绑定已定义
- ✅ 所有wx:key有效
- ✅ 无模板函数调用错误

### 代码统计
- 总代码：6000+ 行
- 16 个页面
- 全部功能可用
