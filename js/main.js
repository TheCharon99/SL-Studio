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
      loc:     '上海 · 2021-2026在建',
      title:   '诗意栖居',
      desc:    '位于上海市宝山区的一处独栋别墅改造项目。利用原有空间格局局部改造，我们通过打通公共区域、引入自然光井和庭院景观，将原本的空间延伸出层次丰富的视觉体验。材质上大量使用天然石材与木饰面，营造出质朴而精致的居住氛围。',
      area:    '860㎡',
      style:   '托斯卡纳',
      year:    '2021-2026',
      type:    '住宅全案',
      cost:    '全包 ¥***万 / 半包 ¥***万'
    },
    2: {
      image:   'images/portfolio/project-2.jpg',
      loc:     '上海 · 2021-2022已交付',
      title:   '汪星人的治愈之家',
      desc: '我们对空间进行梳理改造，结合现代气息与法式艺术美感，运用当代设计手法恰到好处的将空间的环境、光线及气质糅合，巧妙而合宜地规划每一层的各个区域，使之呈现出喧嚣城市中的“静态”。',
      area:    '268㎡',
      style:   '现代法式',
      year:    '2021-2022',
      type:    '住宅设计',
      cost:    '全包 ¥200万 / 半包 ¥30万'
    },
    3: {
      image:   'images/portfolio/project-3.jpg',
      loc:     '上海 · 2023已交付',
      title:   '新风展厅',
      desc: '为更好地向客户及用户展现新风系统产品，加强消费者对新风产品的功能特点和实际应用场景的了解，提高线下销售的转化率和品牌影响力，团队共同打造品牌线下新风系统体验中心。',
      area:    '100㎡',
      style:   '现代',
      year:    '2023',
      type:    '商业空间',
      cost:    '全包 ¥**万 / 半包 ¥**万'
    },
    4: {
      image:   'images/portfolio/project-4.jpg',
      loc:     '广东汕头 · 2024已交付',
      title:   '风雅会晤',
      desc: '融合传统东方礼制空间与现代生活方式的高端私宅',
      area:    '1000㎡',
      style:   '新中式/南洋风',
      year:    '2024',
      type:    '住宅设计',
      cost:    '全包 ¥***万 / 半包 ¥***万'
    },
    5: {
      image:   'images/portfolio/project-5.jpg',
      loc:     '上海 · 2023已交付',
      title:   '慢 生活',
      desc: '这套位于上海的私宅别墅，既有干净的现代简约，又藏匿着法式的浪漫与温柔。没有花哨的色彩，但是工艺精细考究的法式线条，配合现代设计的优雅家具，从细节中赋予了家居空间放松自在的氛围，浪漫与功能并存，展现生活美学的无限可能。',
      area:    '330㎡',
      style:   '现代法式',
      year:    '2023',
      type:    '联排别墅',
      cost:    '全包 ¥***万 / 半包 ¥35万'
    },
    6: {
      image:   'images/portfolio/project-6.jpg',
      loc:     '上海·浦东 · 2024',
      title:   '回归纯粹',
      desc: '以精致优雅的象牙白与优雅共振，构筑艺术雅奢，更通透的全开放式设计打破传统空间的界限，在自然的流动中，流露出轻松自在的随意气息，营造出极简主义的纯粹之美。',
      area:    '315㎡',
      style:   '现代简约',
      year:    '2024',
      type:    '下叠',
      cost:    '全包 ¥***万 / 半包 ¥46万'
    },
    7: {
      image:   'images/portfolio/project-7.jpg',
      loc:     '上海 · 2025',
      title:   '时光小筑',
      desc: '打破传统与现代的边界，构建出一个风格融合的能量场。家就像屋主的个性表达——多彩、活跃、阳光，以及岁月里沉淀出不一样的质朴。中古风的设计语言在这个空间里找到了最好的注解，温暖的木质色调与复古物件交织出独属于家的温度。',
      area:    '110㎡',
      style:   '中古风',
      year:    '2025',
      type:    '私宅',
      cost:    '全包 ¥**万 / 半包 ¥**万'
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
      var id = this.getAttribute('data-project');
      if (projects[id]) {
        openModal(id);
      }
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
