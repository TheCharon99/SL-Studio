/**
 * YiER-Studio 统一导航模板
 *
 * 使用方法：在每个页面中使用以下导航结构
 * 1. 顶部语言切换栏
 * 2. Logo + 社交图标
 * 3. 统一导航（5个菜单项）
 * 4. 移动端下拉菜单
 */

// 导航HTML模板（复制到每个页面）
const NAV_TEMPLATE = `
<!-- 语言切换 -->
<div id="toper">
  <span style="float:right; font-size:12px; margin-top:15px;">
    <a href="#" onclick="switchLang('cn');return false;">中</a> |
    <a href="#" onclick="switchLang('en');return false;">EN</a>
  </span>
</div>

<!-- Logo区域 -->
<div id="logo">
  <a href="index.html">
    <img src="images/logo.png" style="border:none;height:50px;" alt="YiER-Studio Logo">
  </a>
  <div class="sns_icon">
    <a href="https://xhslink.com/m/AT0BUOqA0YQ" rel="nofollow" id="icon_xhs" class="icon_xhs" target="_blank"></a>
    <a href="#" rel="nofollow" id="icon_wx" class="icon_wx">
      <div class="wechat" id="wechat"><img src="images/wx.png"></div>
      <div class="wechat" id="wechat2"><img src="images/wx2.png"></div>
    </a>
  </div>
</div>

<!-- 桌面导航 -->
<div id="me1">
  <div id="horizontal-menu-container" class="nav-top">
    <div class="horizontal-menu-selector"></div>
    <ul id="menu-main-menu" class="nav-horizontal">
      <li class="menu-item"><a href="index.html" data-i18n="nav-home">首&nbsp;页</a></li>
      <li class="menu-item"><a href="about.html" data-i18n="nav-about">关于我们</a></li>
      <li class="menu-item"><a href="projects.html" data-i18n="nav-projects">项目精选</a></li>
      <li class="menu-item"><a href="career.html" data-i18n="nav-career">事业机会</a></li>
      <li class="menu-item"><a href="contact.html" data-i18n="nav-contact">联系我们</a></li>
    </ul>
  </div>
</div>

<!-- 移动端导航 -->
<div id="me2">
  <select class="select-bav" id="gopage" onchange="gopage()">
    <option value="index.html" data-i18n="select-home">首页</option>
    <option value="about.html" data-i18n="select-about">关于我们</option>
    <option value="projects.html" data-i18n="select-projects">项目精选</option>
    <option value="career.html" data-i18n="select-career">事业机会</option>
    <option value="contact.html" data-i18n="select-contact">联系我们</option>
  </select>
</div>
<script>function gopage(){location.href=document.getElementById("gopage").value;}</script>

<!-- 分隔线 -->
<div id="line"></div>
`;

// 页脚模板
const FOOTER_TEMPLATE = `
<div id="footer">
  <a href="projects.html" title="私人豪宅设计" target="_blank"><strong data-i18n="footer-residential">私人豪宅设计</strong></a>
  <a href="projects.html" title="私人公寓设计" target="_blank"><strong data-i18n="footer-apartment">私人公寓设计</strong></a>
  <a href="projects.html" title="办公室设计" target="_blank"><strong data-i18n="footer-office">办公室设计</strong></a>
  <a href="projects.html" title="商业空间设计" target="_blank"><strong data-i18n="footer-commercial">商业空间设计</strong></a>
  <div style="color:#999; margin:10px 0; font-size:11px;">
    <div style="float:left;"><span data-i18n="footer-copy">&copy; 2026 YiER-Studio 懿贰设计. All Rights Reserved.</span></div>
  </div>
</div>
`;

// 社交图标初始化脚本
const SOCIAL_INIT = `
<script>
  jQuery(document).ready(function () {
    jQuery("#icon_xhs").on("mouseover", function () { jQuery(this).addClass('icon_xhs_hover'); }).on("mouseout", function () { jQuery(this).removeClass('icon_xhs_hover'); });
    jQuery("#icon_wx").on("mouseover", function () { jQuery("#wechat").fadeIn(); jQuery(this).addClass('icon_wx_hover'); }).on("mouseout", function () { jQuery("#wechat").fadeOut(); jQuery(this).removeClass('icon_wx_hover'); });
  });
</script>
`;
