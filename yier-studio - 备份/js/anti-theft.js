/**
 * 防盗图脚本
 * 禁用右键、开发者工具、F12、截图等功能
 */
(function() {
  'use strict';
  
  // 禁用右键菜单
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  }, { passive: false });
  
  // 禁用键盘快捷键
  document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+I (开发者工具)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+J (控制台)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+U (查看源代码)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+S (保存页面)
    if (e.ctrlKey && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+C (复制)
    if (e.ctrlKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+A (全选)
    if (e.ctrlKey && (e.key === 'A' || e.key === 'a' || e.keyCode === 65)) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+P (打印)
    if (e.ctrlKey && (e.key === 'P' || e.key === 'p' || e.keyCode === 80)) {
      e.preventDefault();
      return false;
    }
  });
  
  // 禁用拖拽图片
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });
  
  // 禁用选中文字
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.mozUserSelect = 'none';
  document.body.style.msUserSelect = 'none';
  
  // 禁用开发者工具检测（简单版本）
  var devtoolsDetection = (function() {
    var threshold = 160;
    
    return {
      check: function() {
        // 检测窗口尺寸差异
        if (window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold) {
          return true;
        }
        
        // 检测开发者工具（通过 console 大小）
        var widthThreshold = window.innerWidth < 800;
        if (widthThreshold && window.outerWidth > window.innerWidth) {
          return true;
        }
        
        return false;
      },
      activate: function() {
        // 检测到开发者工具时清空页面
        document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#0a0a0a;color:#c9a87c;font-family:Arial,sans-serif;font-size:18px;text-align:center;padding:20px;"><div><h1 style="margin-bottom:20px;">⚠️ 请勿盗图</h1><p>本网站内容受版权保护</p><p style="margin-top:20px;font-size:14px;color:#666;">如需使用请联系官网</p></div></div>';
      }
    };
  })();
  
  // 定期检测开发者工具
  setInterval(function() {
    if (devtoolsDetection.check()) {
      devtoolsDetection.activate();
    }
  }, 1000);
  
  // 禁用剪贴板
  document.addEventListener('copy', function(e) {
    e.preventDefault();
    return false;
  });
  
  document.addEventListener('cut', function(e) {
    e.preventDefault();
    return false;
  });
  
  document.addEventListener('paste', function(e) {
    e.preventDefault();
    return false;
  });
  
  // 控制台警告
  console.log('%c⚠️ 警告', 'color: red; font-size: 50px; font-weight: bold;');
  console.log('%c本网站已启用防盗图保护', 'color: #c9a87c; font-size: 20px;');
  console.log('%c请勿尝试破解，违者将承担法律责任', 'color: #666; font-size: 14px;');
})();
