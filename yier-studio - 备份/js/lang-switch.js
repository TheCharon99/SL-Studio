// 语言切换功能 - YiER-Studio
var currentLang = 'cn';

// 所有页面的翻译内容
var pageTranslations = {
    // 首页
    index: {
        'page-title': { cn: 'YiER-Studio | 懿贰设计 | 私人豪宅设计', en: 'YiER-Studio | Interior Design Studio' },
        'meta-desc': { cn: '懿贰设计，专注高端私人豪宅设计、私人公寓设计、办公室设计、商业空间设计', en: 'YiER-Studio, specializing in high-end residential, apartment, office and commercial space design' },
        'nav-home': { cn: '首&nbsp;页', en: 'Home' },
        'nav-about': { cn: '关于我们', en: 'About Us' },
        'nav-projects': { cn: '项目精选', en: 'Projects' },
        'nav-career': { cn: '事业机会', en: 'Careers' },
        'nav-contact': { cn: '联系我们', en: 'Contact' },
        'select-home': { cn: '首页', en: 'Home' },
        'select-about': { cn: '关于我们', en: 'About Us' },
        'select-projects': { cn: '项目精选', en: 'Projects' },
        'select-career': { cn: '事业机会', en: 'Careers' },
        'select-contact': { cn: '联系我们', en: 'Contact' },
        'latest-projects': { cn: '最新项目', en: 'Latest Projects' },
        'intro-text': { cn: 'YiER-Studio 懿贰设计，专注于高端私人豪宅设计、私人公寓设计、办公室设计、商业空间设计。致力于为每一位客户打造独具品味的空间体验。', en: 'YiER-Studio specializes in high-end residential, apartment, office and commercial space design. Committed to creating unique spatial experiences for every client.' },
        'view-more': { cn: '查看更多项目', en: 'View More Projects' },
        'footer-copy': { cn: '&copy; 2026 YiER-Studio 懿贰设计. All Rights Reserved.', en: '&copy; 2026 YiER-Studio. All Rights Reserved.' },
        'footer-residential': { cn: '私人豪宅设计', en: 'Residential Design' },
        'footer-apartment': { cn: '私人公寓设计', en: 'Apartment Design' },
        'footer-office': { cn: '办公室设计', en: 'Office Design' },
        'footer-commercial': { cn: '商业空间设计', en: 'Commercial Design' }
    },
    // 关于页面
    about: {
        'page-title': { cn: '关于我们 - YiER-Studio 懿贰设计', en: 'About Us - YiER-Studio' },
        'nav-home': { cn: '首&nbsp;页', en: 'Home' },
        'nav-about': { cn: '关于我们', en: 'About Us' },
        'nav-projects': { cn: '项目精选', en: 'Projects' },
        'nav-career': { cn: '事业机会', en: 'Careers' },
        'nav-contact': { cn: '联系我们', en: 'Contact' },
        'select-home': { cn: '首页', en: 'Home' },
        'select-about': { cn: '关于我们', en: 'About Us' },
        'select-projects': { cn: '项目精选', en: 'Projects' },
        'select-career': { cn: '事业机会', en: 'Careers' },
        'select-contact': { cn: '联系我们', en: 'Contact' },
        'company-title': { cn: '懿贰设计 YiER-Studio', en: 'YiER-Studio Design' },
        'company-desc': { cn: '"懿贰木乙建筑设计"是对"家"的诠释和传承，历经<strong>18年</strong>的别墅大宅设计经验；多年来立足于以上海·浙江·江苏为核心的室内装饰市场，是一家快速成长型的设计企业。', en: '"YiER Architectural Design" is an interpretation and inheritance of "home", with <strong>18 years</strong> of experience in villa design; established in the interior decoration market centered on Shanghai, Zhejiang and Jiangsu.' },
        'company-desc2': { cn: '懿贰始终专注于高端别墅的设计体系，每年层出不穷的实景作品是最好的答卷；近年的实景案例有：', en: 'YiER has always been focused on high-end villa design system. The increasing real-scene works every year is the best answer; recent case studies include:' },
        'service-title': { cn: '服务特色', en: 'Service Features' },
        'service-desc': { cn: '懿贰与客户之间的相互支持是实景作品能够落地的核心信念，<strong>"管家式"</strong>的管理模式是将服务更加细致化、人性化，致力于每一位客户打造健康舒适的生活环境。', en: 'The mutual support between YiER and clients is the core belief for project realization. The <strong>"butler-style"</strong> management model makes services more detailed and humanized.' },
        'slogan': { cn: '匠心服务 · 世代传承', en: 'Craftsmanship Service · Heritage' },
        'footer-copy': { cn: '&copy; 2026 YiER-Studio 懿贰设计. All Rights Reserved.', en: '&copy; 2026 YiER-Studio. All Rights Reserved.' },
        'footer-residential': { cn: '私人豪宅设计', en: 'Residential Design' },
        'footer-apartment': { cn: '私人公寓设计', en: 'Apartment Design' },
        'footer-office': { cn: '办公室设计', en: 'Office Design' },
        'footer-commercial': { cn: '商业空间设计', en: 'Commercial Design' }
    },
    // 项目精选
    projects: {
        'page-title': { cn: '项目精选 - YiER-Studio 懿贰设计', en: 'Projects - YiER-Studio' },
        'page-desc': { cn: 'YiER-Studio 懿贰设计，专注高端室内设计，为空间赋予独特价值。', en: 'YiER-Studio specializes in high-end interior design, giving spaces unique value.' },
        'nav-home': { cn: '首&nbsp;页', en: 'Home' },
        'nav-about': { cn: '关于我们', en: 'About Us' },
        'nav-projects': { cn: '项目精选', en: 'Projects' },
        'nav-career': { cn: '事业机会', en: 'Careers' },
        'nav-contact': { cn: '联系我们', en: 'Contact' },
        'select-home': { cn: '首页', en: 'Home' },
        'select-about': { cn: '关于我们', en: 'About Us' },
        'select-projects': { cn: '项目精选', en: 'Projects' },
        'select-career': { cn: '事业机会', en: 'Careers' },
        'select-contact': { cn: '联系我们', en: 'Contact' },
        'filter-all': { cn: '全部', en: 'All' },
        'filter-mansion': { cn: '私人豪宅', en: 'Residential' },
        'filter-apartment': { cn: '私人公寓', en: 'Apartment' },
        'filter-office': { cn: '办公室', en: 'Office' },
        'filter-commercial': { cn: '商业空间', en: 'Commercial' },
        'footer-copy': { cn: '&copy; 2026 YiER-Studio 懿贰设计. All Rights Reserved.', en: '&copy; 2026 YiER-Studio. All Rights Reserved.' },
        'footer-residential': { cn: '私人豪宅设计', en: 'Residential Design' },
        'footer-apartment': { cn: '私人公寓设计', en: 'Apartment Design' },
        'footer-office': { cn: '办公室设计', en: 'Office Design' },
        'footer-commercial': { cn: '商业空间设计', en: 'Commercial Design' }
    },
    // 事业机会
    career: {
        'page-title': { cn: '事业机会 - YiER-Studio 懿贰设计', en: 'Careers - YiER-Studio' },
        'nav-home': { cn: '首&nbsp;页', en: 'Home' },
        'nav-about': { cn: '关于我们', en: 'About Us' },
        'nav-projects': { cn: '项目精选', en: 'Projects' },
        'nav-career': { cn: '事业机会', en: 'Careers' },
        'nav-contact': { cn: '联系我们', en: 'Contact' },
        'select-home': { cn: '首页', en: 'Home' },
        'select-about': { cn: '关于我们', en: 'About Us' },
        'select-projects': { cn: '项目精选', en: 'Projects' },
        'select-career': { cn: '事业机会', en: 'Careers' },
        'select-contact': { cn: '联系我们', en: 'Contact' },
        'career-title': { cn: '加入我们', en: 'Join Us' },
        'career-text': { cn: '我们持续寻找有才华、有热情、有想法的设计师加入我们的团队。如果你热爱室内设计，追求卓越，欢迎联系我们。', en: 'We are continuously looking for talented, passionate designers to join our team. If you love interior design and pursue excellence, welcome to contact us.' },
        'job-title': { cn: '招聘职位', en: 'Open Positions' },
        'contact-title': { cn: '联系方式', en: 'Contact' },
        'hr-email': { cn: '联络邮箱：<strong style="color:#000;">hr@yier-studio.com</strong>', en: 'Contact: <strong style="color:#000;">hr@yier-studio.com</strong>' },
        'footer-copy': { cn: '&copy; 2026 YiER-Studio 懿贰设计. All Rights Reserved.', en: '&copy; 2026 YiER-Studio. All Rights Reserved.' },
        'footer-residential': { cn: '私人豪宅设计', en: 'Residential Design' },
        'footer-apartment': { cn: '私人公寓设计', en: 'Apartment Design' },
        'footer-office': { cn: '办公室设计', en: 'Office Design' },
        'footer-commercial': { cn: '商业空间设计', en: 'Commercial Design' }
    },
    // 联系我们
    contact: {
        'page-title': { cn: '联系我们 - YiER-Studio 懿贰设计', en: 'Contact Us - YiER-Studio' },
        'nav-home': { cn: '首&nbsp;页', en: 'Home' },
        'nav-about': { cn: '关于我们', en: 'About Us' },
        'nav-projects': { cn: '项目精选', en: 'Projects' },
        'nav-career': { cn: '事业机会', en: 'Careers' },
        'nav-contact': { cn: '联系我们', en: 'Contact' },
        'select-home': { cn: '首页', en: 'Home' },
        'select-about': { cn: '关于我们', en: 'About Us' },
        'select-projects': { cn: '项目精选', en: 'Projects' },
        'select-career': { cn: '事业机会', en: 'Careers' },
        'select-contact': { cn: '联系我们', en: 'Contact' },
        'form-name': { cn: '姓名：', en: 'Name:' },
        'form-email': { cn: '邮件：', en: 'Email:' },
        'form-subject': { cn: '标题：', en: 'Subject:' },
        'form-message': { cn: '信息：', en: 'Message:' },
        'submit-btn': { cn: '提交', en: 'Submit' },
        'company-name': { cn: '懿贰设计 YiER-Studio', en: 'YiER-Studio' },
        'addr-label': { cn: '地址：', en: 'Address:' },
        'addr-text': { cn: '上海市金山区红星美凯龙懿贰建筑设计', en: 'Red Star Macalline, Jinshan District, Shanghai' },
        'phone-label': { cn: '电话：', en: 'Phone:' },
        'phone-text': { cn: '13681800854', en: '13681800854' },
        'email-label': { cn: '邮箱：', en: 'Email:' },
        'email-text': { cn: 'contact@yier-studio.com', en: 'contact@yier-studio.com' },
        'wechat-label': { cn: '微信：', en: 'WeChat:' },
        'wechat-text': { cn: 'YiER_Studio', en: 'YiER_Studio' },
        'footer-copy': { cn: '&copy; 2026 YiER-Studio 懿贰设计. All Rights Reserved.', en: '&copy; 2026 YiER-Studio. All Rights Reserved.' },
        'footer-residential': { cn: '私人豪宅设计', en: 'Residential Design' },
        'footer-apartment': { cn: '私人公寓设计', en: 'Apartment Design' },
        'footer-office': { cn: '办公室设计', en: 'Office Design' },
        'footer-commercial': { cn: '商业空间设计', en: 'Commercial Design' }
    },
    // 项目详情
    'project-detail': {
        'page-title': { cn: '项目详情 - YiER-Studio 懿贰设计', en: 'Project Details - YiER-Studio' },
        'nav-home': { cn: '首&nbsp;页', en: 'Home' },
        'nav-about': { cn: '关于我们', en: 'About Us' },
        'nav-projects': { cn: '项目精选', en: 'Projects' },
        'nav-career': { cn: '事业机会', en: 'Careers' },
        'nav-contact': { cn: '联系我们', en: 'Contact' },
        'select-home': { cn: '首页', en: 'Home' },
        'select-about': { cn: '关于我们', en: 'About Us' },
        'select-projects': { cn: '项目精选', en: 'Projects' },
        'select-career': { cn: '事业机会', en: 'Careers' },
        'select-contact': { cn: '联系我们', en: 'Contact' },
        'back-link': { cn: '← 返回项目列表', en: '← Back to Projects' },
        'gallery-title': { cn: '项目图片', en: 'Project Gallery' },
        'designer-label': { cn: '室内设计：', en: 'Interior Design:' },
        'location-label': { cn: '项目地址：', en: 'Location:' },
        'desc-label': { cn: '设计说明：', en: 'Description:' },
        'footer-copy': { cn: '&copy; 2026 YiER-Studio 懿贰设计. All Rights Reserved.', en: '&copy; 2026 YiER-Studio. All Rights Reserved.' },
        'footer-residential': { cn: '私人豪宅设计', en: 'Residential Design' },
        'footer-apartment': { cn: '私人公寓设计', en: 'Apartment Design' },
        'footer-office': { cn: '办公室设计', en: 'Office Design' },
        'footer-commercial': { cn: '商业空间设计', en: 'Commercial Design' }
    },
    // 404页面
    '404': {
        'page-title': { cn: '页面不存在 - YiER-Studio 懿贰设计', en: 'Page Not Found - YiER-Studio' },
        'error-text': { cn: '抱歉，您访问的页面不存在', en: 'Sorry, the page you visited does not exist' },
        'back-home': { cn: '返回首页', en: 'Back to Home' },
        'footer-copy': { cn: '&copy; 2026 YiER-Studio 懿贰设计. All Rights Reserved.', en: '&copy; 2026 YiER-Studio. All Rights Reserved.' },
        'footer-residential': { cn: '私人豪宅设计', en: 'Residential Design' },
        'footer-apartment': { cn: '私人公寓设计', en: 'Apartment Design' },
        'footer-office': { cn: '办公室设计', en: 'Office Design' },
        'footer-commercial': { cn: '商业空间设计', en: 'Commercial Design' }
    }
};

// 切换语言
function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // 获取当前页面类型
    var pageType = getCurrentPageType();

    // 应用翻译
    applyTranslations(pageType);

    // 更新语言链接样式
    updateLangLinks();
}

// 获取当前页面类型
function getCurrentPageType() {
    var path = window.location.pathname;
    if (path.indexOf('index.html') > -1 || path === '/' || path === '/index.html') {
        return 'index';
    } else if (path.indexOf('about.html') > -1) {
        return 'about';
    } else if (path.indexOf('projects.html') > -1) {
        return 'projects';
    } else if (path.indexOf('contact.html') > -1) {
        return 'contact';
    } else if (path.indexOf('career.html') > -1) {
        return 'career';
    } else if (path.indexOf('project-detail.html') > -1) {
        return 'project-detail';
    } else if (path.indexOf('404.html') > -1) {
        return '404';
    }
    return 'index';
}

// 应用翻译
function applyTranslations(pageType) {
    var translations = pageTranslations[pageType];
    if (!translations) return;

    for (var key in translations) {
        // 处理普通元素
        var element = document.getElementById(key);
        if (element) {
            element.innerHTML = translations[key][currentLang];
        }

        // 处理data-i18n属性的元素
        var elements = document.querySelectorAll('[data-i18n="' + key + '"]');
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = translations[key][currentLang];
        }

        // 处理placeholder
        var inputElement = document.getElementById(key);
        if (inputElement && inputElement.tagName === 'INPUT') {
            inputElement.placeholder = translations[key][currentLang];
        }
    }
}

// 更新语言链接样式
function updateLangLinks() {
    var cnLink = document.querySelector('a[onclick*="switchLang(\'cn\')"]');
    var enLink = document.querySelector('a[onclick*="switchLang(\'en\')"]');

    if (cnLink) {
        cnLink.style.fontWeight = currentLang === 'cn' ? 'bold' : 'normal';
    }
    if (enLink) {
        enLink.style.fontWeight = currentLang === 'en' ? 'bold' : 'normal';
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    var savedLang = localStorage.getItem('lang');
    if (savedLang) {
        currentLang = savedLang;
        var pageType = getCurrentPageType();
        applyTranslations(pageType);
        updateLangLinks();
    }
});
