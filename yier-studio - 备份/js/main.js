/* YiER-Studio 主脚本 - 原生 JavaScript，无 jQuery 依赖
   替代旧版 nivoSlider / lightbox / filter.gallery / script.js
   结构对齐 wdesign.hk */
(function () {
  'use strict';

  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function () {
    socialHover();
    homeSlider();
    projectFilter();
    projectDetail();
  });

  /* 社交图标：微信二维码悬停显示 */
  function socialHover() {
    var wx = document.getElementById('icon_wx');
    var qrcode = document.getElementById('wechat');
    if (wx && qrcode) {
      wx.addEventListener('mouseenter', function () { qrcode.style.display = 'block'; });
      wx.addEventListener('mouseleave', function () { qrcode.style.display = 'none'; });
    }
  }

  /* 首页轮播（淡入淡出，替代旧 nivoSlider） */
  function homeSlider() {
    var slider = document.querySelector('.home-slider');
    if (!slider) return;
    var imgs = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
    if (imgs.length < 2) return;
    var btns = slider.querySelectorAll('.slider-nav');
    var idx = 0;
    function show(n) {
      imgs[idx].classList.remove('active');
      idx = (n + imgs.length) % imgs.length;
      imgs[idx].classList.add('active');
    }
    if (btns.length >= 2) {
      btns[0].addEventListener('click', function (e) { e.preventDefault(); show(idx - 1); });
      btns[1].addEventListener('click', function (e) { e.preventDefault(); show(idx + 1); });
    }
    setInterval(function () { show(idx + 1); }, 5000);
  }

  /* 项目列表分类筛选（对齐参考站：color 切换） */
  function projectFilter() {
    var filter = document.querySelector('.gallery-filter');
    if (!filter) return;
    var items = Array.prototype.slice.call(document.querySelectorAll('#filter_gallery li'));
    filter.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      e.preventDefault();
      var cat = a.getAttribute('data-filter');
      /* 参考站方式：全部恢复 #999，当前项设 #000 */
      Array.prototype.forEach.call(filter.querySelectorAll('a'), function (x) {
        x.style.color = '#999';
      });
      a.style.color = '#000';
      /* 筛选项目 */
      items.forEach(function (li) {
        var c = li.getAttribute('data-category');
        li.style.display = (cat === '全部' || c === cat) ? '' : 'none';
      });
    });
  }

  /* 项目详情：渲染图片轮播 + 灯箱（对齐参考站 ul.imchange 结构） */
  function projectDetail() {
    if (typeof projects === 'undefined') return;
    var imchange = document.querySelector('.imchange');
    if (!imchange) return;

    var name = getParam('project');
    var project = projects[name] || projects[Object.keys(projects)[0]];
    var order = window.projectOrder || Object.keys(projects);
    var i = order.indexOf(name);
    if (i === -1) i = 0;

    /* 填充项目名称 */
    var neiName = document.querySelector('.pro-right .nei');
    if (neiName) neiName.innerHTML = '<div style="float:left">' + project.name + '&nbsp;</div>';

    /* 填充项目信息 */
    var infoDiv = document.getElementById('project_info');
    if (infoDiv) {
      infoDiv.innerHTML =
        '<div style="clear:both;"></div>' +
        '<div class="divider"></div>' +
        '<p>' + project.desc + '</p>';
    }

    document.title = project.name + ' - 项目详情 - YiER-Studio';

    /* 填充图片列表（ul.imchange 结构，对齐参考站） */
    var html = '';
    project.images.forEach(function (img, n) {
      // 直接使用路径，不重复编码
      html += '<li style="text-align:center;"><img src="' + img + '" alt="' + project.name + ' 图' + (n + 1) + '" height="313" /></li>';
    });
    imchange.innerHTML = html;

    /* 图片切换：只显示当前张，其余隐藏 */
    var imgs = imchange.querySelectorAll('li');
    var currentIdx = 0;
    function showImg(n) {
      Array.prototype.forEach.call(imgs, function (li, idx) {
        li.style.display = idx === n ? 'block' : 'none';
      });
      currentIdx = n;
    }
    showImg(0);

    /* 添加左右切换按钮（对齐参考站：JS 动态插入 s_l / s_r） */
    var s_l = document.createElement('span');
    s_l.id = 's_l';
    s_l.className = 'imchangebtn op3';
    var s_r = document.createElement('span');
    s_r.id = 's_r';
    s_r.className = 'imchangebtn op3';
    imchange.appendChild(s_l);
    imchange.appendChild(s_r);
    function hoverOp(el) {
      el.addEventListener('mouseenter', function () { el.className = 'imchangebtn op8'; });
      el.addEventListener('mouseleave', function () { el.className = 'imchangebtn op3'; });
    }
    hoverOp(s_l);
    hoverOp(s_r);
    s_l.addEventListener('click', function () {
      showImg((currentIdx - 1 + imgs.length) % imgs.length);
    });
    s_r.addEventListener('click', function () {
      showImg((currentIdx + 1) % imgs.length);
    });

    /* 灯箱：点击图片放大 */
    imchange.addEventListener('click', function (e) {
      if (e.target.tagName === 'IMG') {
        openLightbox(e.target.src);
      }
    });

    /* 填充底部缩略图（对齐参考站 #imggray > #gallery 结构） */
    var thumbs = document.getElementById('thumb_gallery');
    if (thumbs) {
      var thtml = '';
      project.images.forEach(function (img, n) {
        // 直接使用路径，不重复编码
        thtml += '<li><a href="' + img + '"><img src="' + img + '" width="188" height="126" alt="' + project.name + ' 项目图' + (n + 1) + '" /></a></li>';
      });
      thumbs.innerHTML = thtml;
      thumbs.addEventListener('click', function (e) {
        var a = e.target.closest('a');
        if (!a) return;
        e.preventDefault();
        openLightbox(a.getAttribute('href'));
      });
    }

    /* prev/next 按钮 */
    var prev = document.getElementById('prev_btn');
    var next = document.getElementById('next_btn');
    if (prev) prev.href = 'project-detail.html?project=' + encodeURIComponent(order[(i - 1 + order.length) % order.length]);
    if (next) next.href = 'project-detail.html?project=' + encodeURIComponent(order[(i + 1) % order.length]);

    buildLightbox();
  }

  function openLightbox(src) {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var img = lb.querySelector('img');
    if (img) img.src = src;
    lb.style.display = 'flex';
  }
  function buildLightbox() {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.addEventListener('click', function () { lb.style.display = 'none'; });
  }

  function getParam(name) {
    var m = location.search.match(new RegExp('[?&]' + name + '=([^&]*)'));
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }
})();
