/* Blue Diamond Co. — interactions */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Theme toggle (persisted) ---------- */
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('bdc-theme', t); } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('.theme-toggle');
    if (!t) return;
    var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ---------- Mobile drawer ---------- */
  var drawer = document.getElementById('drawer');
  var backdrop = document.getElementById('drawer-backdrop');
  function openDrawer() { if (drawer) { drawer.classList.add('open'); backdrop.classList.add('open'); } }
  function closeDrawer() { if (drawer) { drawer.classList.remove('open'); backdrop.classList.remove('open'); } }
  document.addEventListener('click', function (e) {
    if (e.target.closest('.menu-toggle')) openDrawer();
    else if (e.target.closest('.drawer-close') || e.target === backdrop) closeDrawer();
  });

  /* ---------- Mega-menu: click support on touch ---------- */
  document.querySelectorAll('.nav-item.has-mega > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.matchMedia('(hover: none)').matches) {
        var mega = a.parentNode.querySelector('.mega');
        if (mega) { e.preventDefault(); mega.classList.toggle('open'); }
      }
    });
  });

  /* ---------- Hero slider ---------- */
  (function () {
    var slider = document.querySelector('.hero-slider');
    if (!slider) return;
    var slides = slider.querySelectorAll('.slide');
    var dots = slider.querySelectorAll('.slider-dots button');
    var idx = 0, timer = null, DURATION = 6000;
    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
    }
    function next() { go(idx + 1); }
    function prev() { go(idx - 1); }
    function start() { stop(); timer = setInterval(next, DURATION); }
    function stop() { if (timer) clearInterval(timer); }
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); start(); }); });
    var nx = slider.querySelector('.slider-arrow.next'); if (nx) nx.addEventListener('click', function () { next(); start(); });
    var pv = slider.querySelector('.slider-arrow.prev'); if (pv) pv.addEventListener('click', function () { prev(); start(); });
    go(0); start();
  })();

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1600, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---------- Card 3D tilt ---------- */
  if (!window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'translateY(-8px) perspective(900px) rotateX(' + (-y * 5).toFixed(2) + 'deg) rotateY(' + (x * 5).toFixed(2) + 'deg)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }

  /* ---------- Filter chips + URL param ---------- */
  var chips = document.querySelectorAll('[data-filter]');
  function applyFilter(f) {
    chips.forEach(function (c) { c.classList.toggle('active', c.getAttribute('data-filter') === f); });
    document.querySelectorAll('[data-cat]').forEach(function (item) {
      var show = f === 'all' || item.getAttribute('data-cat') === f;
      item.style.display = show ? '' : 'none';
    });
  }
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () { applyFilter(chip.getAttribute('data-filter')); });
    });
    var cat = new URLSearchParams(window.location.search).get('cat');
    if (cat) {
      var match = document.querySelector('[data-filter="' + cat + '"]');
      if (match) applyFilter(cat);
    }
  }

  /* ---------- Inquire prefill ---------- */
  var params = new URLSearchParams(window.location.search);
  var item = params.get('item');
  if (item) {
    var subject = document.getElementById('subject');
    var message = document.getElementById('message');
    if (subject) {
      var t = params.get('type') || 'General';
      for (var i = 0; i < subject.options.length; i++) {
        if (subject.options[i].value.toLowerCase().indexOf(t.toLowerCase()) > -1) { subject.selectedIndex = i; break; }
      }
    }
    if (message) { message.value = 'I would like to enquire about: ' + item + '\n\n'; }
  }

  /* ---------- Contact form (design-only) ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var ok = document.getElementById('form-success');
      if (ok) { ok.classList.add('show'); ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
