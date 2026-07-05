/* ========================================
   Main JavaScript
   ======================================== */

(function () {
  'use strict';

  // ---- DOM refs ----
  const nav       = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const sections  = document.querySelectorAll('section[id]');
  const reveals   = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  // ---- 1. Navbar scroll effect ----
  let lastScroll = 0;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 60);
    lastScroll = y;
  }
  // Debounce scroll events
  let scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(function () {
        onScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // ---- 2. Mobile nav toggle ----
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  // ---- 3. Active section highlight in nav ----
  function updateActiveNav() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      var top    = section.offsetTop;
      var height = section.offsetHeight;
      var id     = section.getAttribute('id');
      var link   = navLinks.querySelector('a[href="#' + id + '"]');
      if (!link) return;
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', function () {
    requestAnimationFrame(updateActiveNav);
  }, { passive: true });

  // ---- 4. Scroll reveal (IntersectionObserver) ----
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---- 5. Smooth scroll for anchor links (fallback for older browsers) ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- 6. Hero parallax (respects reduced motion) ----
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    var heroBg = document.querySelector('.hero__bg');
    if (heroBg) {
      window.addEventListener('scroll', function () {
        requestAnimationFrame(function () {
          var scrolled = window.scrollY;
          heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
        });
      }, { passive: true });
    }
  }

  // ---- 7. Project detail modal ----
  var modal        = document.getElementById('projectModal');
  var modalClose   = document.getElementById('modalClose');
  var modalBackdrop = document.getElementById('modalBackdrop');

  // Project data — 在这里编辑每个项目的详情
  var projects = {
    1: {
      image:   'images/portfolio/project-1.jpg',
      loc:     '上海 · 2024',
      title:   '城市山居',
      desc:    '位于上海市中心的一处高端住宅改造项目。原有空间格局封闭压抑，我们通过打通公共区域、引入自然光井和庭院景观，将原本不足百平的空间延伸出层次丰富的视觉体验。材质上大量使用天然石材与木饰面，营造出质朴而精致的居住氛围。',
      area:    '128㎡',
      style:   '现代东方',
      year:    '2024',
      type:    '住宅全案',
      cost:    '全包 ¥38万 / 半包 ¥12万'
    },
    2: {
      image:   'images/portfolio/project-2.jpg',
      loc:     '厦门 · 2024',
      title:   '海边的房子',
      desc: '这是一座面向海景的度假居所。设计以"退隐"为核心理念，降低视觉噪音，让海风、日光和潮汐成为空间的主角。大面积的白色微水泥墙面搭配原木家具，营造出宁静致远的岛屿生活方式。',
      area:    '200㎡',
      style:   '极简自然',
      year:    '2024',
      type:    '度假住宅',
      cost:    '全包 ¥65万 / 半包 ¥18万'
    },
    3: {
      image:   'images/portfolio/project-3.jpg',
      loc:     '杭州 · 2023',
      title:   '隐庐茶室',
      desc: '隐于西湖群山之间的一间私人茶室。设计提取传统园林的借景与掩映手法，以当代材料重新诠释东方意境。枯山水庭院、竹影屏风、手工夯土墙，每一处空间都在引导使用者放慢脚步、回归当下。',
      area:    '180㎡',
      style:   '新中式禅意',
      year:    '2023',
      type:    '商业空间',
      cost:    '全包 ¥52万 / 半包 ¥15万'
    },
    4: {
      image:   'images/portfolio/project-4.jpg',
      loc:     '北京 · 2023',
      title:   '光之书房',
      desc: '为一名建筑师打造的私宅书房兼工作室。天窗与侧窗的组合让自然光在不同时段产生丰富的光影变化，书墙、工作台与接待区在光影中自然分区，空间本身成为了一件光的作品。',
      area:    '95㎡',
      style:   '现代极简',
      year:    '2023',
      type:    '住宅设计',
      cost:    '全包 ¥28万 / 半包 ¥9万'
    },
    5: {
      image:   'images/portfolio/project-5.jpg',
      loc:     '成都 · 2023',
      title:   '素舍',
      desc: '一套老公寓的焕新改造。拆除原有繁杂吊顶与隔断，恢复空间原始层高，以极简的笔触重塑居住品质。保留部分原始砖墙肌理，与新做的微水泥与定制家具形成新旧对话。',
      area:    '85㎡',
      style:   '侘寂简约',
      year:    '2023',
      type:    '旧房改造',
      cost:    '全包 ¥22万 / 半包 ¥7万'
    },
    6: {
      image:   'images/portfolio/project-6.jpg',
      loc:     '大理 · 2022',
      title:   '云栖酒店',
      desc: '坐落于苍山脚下的一间精品民宿，共 12 间客房。设计灵感来自大理的苍山洱海，以当地的青石、木材为材料基底，每间客房拥有不同的景观视角与色彩基调，让住宿体验本身成为一场旅行。',
      area:    '680㎡',
      style:   '在地度假风',
      year:    '2022',
      type:    '酒店设计',
      cost:    '全包 ¥260万 / 半包 ¥68万'
    }
  };

  function openModal(id) {
    var p = projects[id];
    if (!p) return;

    document.getElementById('modalImage').src   = p.image;
    document.getElementById('modalImage').alt   = p.title;
    document.getElementById('modalLoc').textContent   = p.loc;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalDesc').textContent  = p.desc;
    document.getElementById('modalArea').textContent  = p.area;
    document.getElementById('modalStyle').textContent = p.style;
    document.getElementById('modalYear').textContent  = p.year;
    document.getElementById('modalType').textContent  = p.type;
    document.getElementById('modalCost').textContent   = p.cost || '-';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Click on project card opens modal
  document.querySelectorAll('.project[data-project]').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(this.getAttribute('data-project'));
    });
  });

  // Close on button or backdrop click
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

})();
