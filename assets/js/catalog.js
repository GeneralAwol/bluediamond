/* ============================================================
   BLUE DIAMOND CO. — Catalog engine
   Builds filter sidebar + grid (listing) and product detail
   pages automatically from window.BDC_PRODUCTS (data.js).
   ============================================================ */
(function () {
  'use strict';
  var ALL = window.BDC_PRODUCTS || [];

  var ICON_WATCH = '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3"><circle cx="50" cy="52" r="24"/><path d="M50 36v16l11 7M40 18h20M40 86h20"/></svg>';
  var ICON_GEM = '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M28 22 H72 L90 42 L50 88 L10 42 Z"/><path d="M10 42 H90"/><path d="M28 22 L38 42 L50 88 L62 42 L72 22"/><path d="M38 42 H62"/></svg>';

  function icon(p) { return p.category === 'watch' ? ICON_WATCH : ICON_GEM; }
  function toneClass(t) { return t === 'navy' ? 'ph--navy' : t === 'blue' ? 'ph--blue' : t === 'gold' ? 'ph--gold' : ''; }
  function gbp(n) { return '£' + Number(n).toLocaleString('en-GB'); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function enc(s) { return encodeURIComponent(s); }

  function priceLabel(p) {
    return '<span class="poa">Price on enquiry</span>';
  }
  function cardMeta(p) {
    if (p.category === 'watch') return esc(p.caseMaterial + ' · ' + p.caseSize);
    return esc(p.detail || (p.metal + ' · ' + p.stone));
  }
  function cardTag(p) { return esc(p.category === 'watch' ? p.brand : p.type); }

  function cardHTML(p) {
    var media = (p.images && p.images.length)
      ? '<img class="card-photo" src="' + p.images[0] + '" alt="' + esc(p.title) + '" loading="lazy">'
      : icon(p);
    return '' +
      '<article class="card">' +
        '<a class="ph ' + toneClass(p.tone) + '" href="product.html?id=' + p.id + '" aria-label="' + esc(p.title) + '">' +
          '<span class="card-tag">' + cardTag(p) + '</span>' + media +
        '</a>' +
        '<div class="card-body">' +
          '<a href="product.html?id=' + p.id + '"><h3>' + esc(p.title) + '</h3></a>' +
          '<p class="card-meta">' + cardMeta(p) + '</p>' +
          '<p class="card-price">' + priceLabel(p) + '</p>' +
          '<a href="product.html?id=' + p.id + '" class="btn btn--ghost btn--block">View Details</a>' +
        '</div>' +
      '</article>';
  }

  /* ===================== LISTING ===================== */
  function initCatalog() {
    var root = document.getElementById('catalog');
    if (!root) return;
    var category = root.getAttribute('data-category');
    var items = ALL.filter(function (p) { return p.category === category; });

    var facets = category === 'watch'
      ? [['brand', 'Brand'], ['model', 'Model'], ['caseSize', 'Case Size'], ['year', 'Year'],
         ['caseMaterial', 'Case Material'], ['strap', 'Strap'], ['papers', 'Papers'], ['availability', 'Availability']]
      : [['type', 'Type'], ['metal', 'Metal'], ['stone', 'Stone']];

    var hasPrice = false;
    var prices = items.map(function (p) { return p.price; }).filter(function (n) { return typeof n === 'number'; });
    var pMin = prices.length ? Math.min.apply(null, prices) : 0;
    var pMax = prices.length ? Math.max.apply(null, prices) : 0;

    var sortOpts = category === 'watch'
      ? [['az', 'Alphabetically, A–Z'], ['za', 'Alphabetically, Z–A'], ['brand', 'Brand']]
      : [['az', 'Alphabetically, A–Z'], ['za', 'Alphabetically, Z–A']];

    var state = { sel: {}, sort: 'az', pLo: pMin, pHi: pMax };

    /* counts per facet value (over full category list) */
    function counts(key) {
      var m = {};
      items.forEach(function (p) { var v = p[key]; if (v != null) m[v] = (m[v] || 0) + 1; });
      return Object.keys(m).sort().map(function (v) { return [v, m[v]]; });
    }

    /* build sidebar */
    var fhtml = '<div class="filters-head"><h4>Filter</h4><span><button type="button" class="filters-clear" id="f-clear">Clear all</button><button type="button" class="filters-close" id="f-close" aria-label="Close filters">×</button></span></div>';
    facets.forEach(function (f) {
      var rows = counts(f[0]).map(function (c) {
        return '<label class="f-row"><input type="checkbox" data-key="' + f[0] + '" value="' + esc(c[0]) + '"><span>' + esc(c[0]) + '</span><em>(' + c[1] + ')</em></label>';
      }).join('');
      fhtml += '<details class="f-group"><summary>' + f[1] + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></summary><div class="f-body">' + rows + '</div></details>';
    });
    if (hasPrice && pMax > pMin) {
      fhtml += '<details class="f-group"><summary>Price<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></summary><div class="f-body">' +
        '<div class="price-row"><span>£</span><input type="number" id="p-lo" value="' + pMin + '" min="' + pMin + '" max="' + pMax + '"><span>to</span><span>£</span><input type="number" id="p-hi" value="' + pMax + '" min="' + pMin + '" max="' + pMax + '"></div>' +
        '</div></details>';
    }

    var sortHTML = sortOpts.map(function (o) { return '<option value="' + o[0] + '">' + o[1] + '</option>'; }).join('');

    root.innerHTML =
      '<button type="button" class="filters-toggle" id="f-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 6h16M7 12h10M10 18h4"/></svg> Filters</button>' +
      '<div class="catalog-layout">' +
        '<aside class="filters" id="filters">' + fhtml + '</aside>' +
        '<div class="catalog-main">' +
          '<div class="catalog-bar">' +
            '<span class="catalog-count" id="cat-count"></span>' +
            '<label class="sort-wrap">Sort by <select id="cat-sort">' + sortHTML + '</select></label>' +
          '</div>' +
          '<div class="product-grid" id="cat-grid"></div>' +
          '<p class="catalog-empty" id="cat-empty" hidden>No pieces match those filters. <button type="button" class="filters-clear" id="f-clear-2">Clear filters</button></p>' +
        '</div>' +
      '</div>';

    var grid = document.getElementById('cat-grid');
    var countEl = document.getElementById('cat-count');
    var emptyEl = document.getElementById('cat-empty');

    function apply() {
      var out = items.filter(function (p) {
        for (var k in state.sel) {
          if (state.sel[k].size && !state.sel[k].has(String(p[k]))) return false;
        }
        if (hasPrice && typeof p.price === 'number') {
          if (p.price < state.pLo || p.price > state.pHi) return false;
        }
        return true;
      });
      out.sort(function (a, b) {
        if (state.sort === 'az') return a.title.localeCompare(b.title);
        if (state.sort === 'za') return b.title.localeCompare(a.title);
        if (state.sort === 'plh') return a.price - b.price;
        if (state.sort === 'phl') return b.price - a.price;
        if (state.sort === 'brand') return (a.brand || '').localeCompare(b.brand || '');
        return 0;
      });
      grid.innerHTML = out.map(cardHTML).join('');
      countEl.textContent = out.length + (out.length === 1 ? ' product' : ' products');
      emptyEl.hidden = out.length !== 0;
      grid.hidden = out.length === 0;
    }

    root.addEventListener('change', function (e) {
      var t = e.target;
      if (t.matches('input[type="checkbox"][data-key]')) {
        var k = t.getAttribute('data-key');
        state.sel[k] = state.sel[k] || new Set();
        if (t.checked) state.sel[k].add(t.value); else state.sel[k].delete(t.value);
        apply();
      } else if (t.id === 'cat-sort') {
        state.sort = t.value; apply();
      } else if (t.id === 'p-lo') {
        state.pLo = Number(t.value || pMin); apply();
      } else if (t.id === 'p-hi') {
        state.pHi = Number(t.value || pMax); apply();
      }
    });

    function clearAll() {
      state.sel = {}; state.pLo = pMin; state.pHi = pMax;
      root.querySelectorAll('input[type="checkbox"]').forEach(function (c) { c.checked = false; });
      var lo = document.getElementById('p-lo'), hi = document.getElementById('p-hi');
      if (lo) lo.value = pMin; if (hi) hi.value = pMax;
      apply();
    }
    root.addEventListener('click', function (e) {
      if (e.target.closest('#f-clear') || e.target.closest('#f-clear-2')) clearAll();
      if (e.target.closest('#f-toggle')) document.getElementById('filters').classList.toggle('open');
      if (e.target.closest('#f-close')) document.getElementById('filters').classList.remove('open');
    });

    /* pre-select from ?cat= or ?brand= etc. (deep links from mega-menu) */
    var params = new URLSearchParams(window.location.search);
    var preMap = { ap: ['brand', 'Audemars Piguet'], richard: ['brand', 'Richard Mille'], rolex: ['brand', 'Rolex'], patek: ['brand', 'Patek Philippe'], cartier: ['brand', 'Cartier'] };
    var catParam = params.get('cat');
    if (catParam) {
      var pre = preMap[catParam];
      if (!pre && category === 'jewellery') {
        var tmap = { rings: 'Rings', necklaces: 'Necklaces', earrings: 'Earrings', bracelets: 'Bracelets', pendants: 'Pendants' };
        if (tmap[catParam]) pre = ['type', tmap[catParam]];
      }
      if (pre) {
        var box = root.querySelector('input[data-key="' + pre[0] + '"][value="' + pre[1] + '"]');
        if (box) { box.checked = true; state.sel[pre[0]] = new Set([pre[1]]); }
      }
    }

    apply();
  }

  /* ===================== PRODUCT DETAIL ===================== */
  function galleryTiles(p) {
    if (p.images && p.images.length) {
      return p.images.map(function (src, i) {
        return { type: 'img', src: src, active: i === 0 };
      });
    }
    var tones = ['ph--navy', 'ph--blue', 'ph--gold', ''];
    var base = toneClass(p.tone);
    var order = [base].concat(tones.filter(function (t) { return t !== base; }));
    return order.slice(0, 4).map(function (t, i) { return { type: 'ph', cls: t, active: i === 0 }; });
  }

  function specRows(p) {
    if (p.category === 'watch') {
      return [['Make', p.brand], ['Model', p.model], ['Reference', p.ref], ['Case Material', p.caseMaterial],
        ['Case Size', p.caseSize], ['Bracelet / Strap', p.strap], ['Papers', p.papers],
        ['Condition', p.condition], ['Year of Production', p.year], ['Availability', p.availability]];
    }
    return [['Type', p.type], ['Metal', p.metal], ['Stone', p.stone], ['Price', 'On enquiry']];
  }

  function tile(t) {
    if (t.type === 'img') return '<img src="' + t.src + '" alt="">';
    return '<span class="ph ' + t.cls + '">' + '</span>';
  }

  function initProduct() {
    var root = document.getElementById('product-root');
    if (!root) return;
    var id = new URLSearchParams(window.location.search).get('id');
    var p = ALL.filter(function (x) { return x.id === id; })[0];
    if (!p) {
      root.innerHTML = '<div class="container section center"><h1>Piece not found</h1><p class="lead">This item may no longer be available. <a href="jewellery.html" style="color:var(--accent-deep)">Browse jewellery</a> or <a href="watches.html" style="color:var(--accent-deep)">watches</a>.</p></div>';
      return;
    }
    document.title = p.title + ' — Blue Diamond Co.';

    var iconHTML = icon(p);
    var tiles = galleryTiles(p);
    var mainHTML = tiles[0].type === 'img'
      ? '<img id="pd-main-img" src="' + tiles[0].src + '" alt="' + esc(p.title) + '">'
      : '<span class="ph ' + tiles[0].cls + '" id="pd-main-ph">' + iconHTML + '</span>';
    var thumbs = tiles.map(function (t, i) {
      var inner = t.type === 'img' ? '<img src="' + t.src + '" alt="">' : '<span class="ph ' + t.cls + '">' + iconHTML + '</span>';
      return '<button class="pd-thumb' + (i === 0 ? ' active' : '') + '" data-type="' + t.type + '" data-val="' + (t.type === 'img' ? esc(t.src) : t.cls) + '">' + inner + '</button>';
    }).join('');

    var listType = p.category === 'watch' ? 'Watches' : 'Jewellery';
    var listHref = p.category === 'watch' ? 'watches.html' : 'jewellery.html';
    var enquireType = p.category === 'watch' ? 'Watch' : 'Jewellery';

    var chips = p.category === 'watch'
      ? '<span class="pd-chip"><b>Papers:</b> ' + esc(p.papers) + '</span><span class="pd-chip"><b>' + esc(p.availability) + '</b></span>'
      : '<span class="pd-chip"><b>Metal:</b> ' + esc(p.metal) + '</span><span class="pd-chip"><b>Stone:</b> ' + esc(p.stone) + '</span>';

    var specHTML = specRows(p).map(function (r) {
      return '<tr><td>' + r[0] + '</td><td>' + esc(r[1]) + '</td></tr>';
    }).join('');

    /* related: same category, prefer same brand/type, 4 items */
    var key = p.category === 'watch' ? 'brand' : 'type';
    var pool = ALL.filter(function (x) { return x.category === p.category && x.id !== p.id; });
    pool.sort(function (a, b) { return (b[key] === p[key]) - (a[key] === p[key]); });
    var related = pool.slice(0, 4).map(cardHTML).join('');

    root.innerHTML =
      '<section class="section pd">' +
        '<div class="container">' +
          '<button type="button" class="pd-back" id="pd-back"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg> Back</button>' +
          '<p class="crumbs-dark"><a href="index.html">Home</a> / <a href="' + listHref + '">' + listType + '</a> / ' + esc(p.title) + '</p>' +
          '<div class="pd-grid">' +
            '<div class="pd-gallery">' +
              '<div class="pd-thumbs">' + thumbs + '</div>' +
              '<div class="pd-main">' + mainHTML + '</div>' +
            '</div>' +
            '<div class="pd-info">' +
              '<p class="eyebrow">' + (p.category === 'watch' ? esc(p.brand) : esc(p.type)) + '</p>' +
              '<h1>' + esc(p.title) + '</h1>' +
              '<p class="pd-price">' + priceLabel(p) + '</p>' +
              '<div class="pd-chips">' + chips + '</div>' +
              '<p class="pd-desc">' + esc(p.description) + '</p>' +
              '<div class="pd-actions">' +
                '<button type="button" class="btn btn--primary btn--block" id="pd-enquire">Enquire about this piece</button>' +
                '<a href="contact.html?item=' + enc(p.title) + '&type=' + enquireType + '" class="btn btn--ghost btn--block">Book a viewing</a>' +
              '</div>' +
              '<p class="pd-help">Questions? Call <a href="tel:+447922252229">+44 7922 252229</a> or email <a href="mailto:Info@bluediamondco.com">Info@bluediamondco.com</a></p>' +
            '</div>' +
          '</div>' +

          '<div class="pd-details">' +
            '<h2>Details</h2>' +
            '<table class="spec-table"><tbody>' + specHTML + '</tbody></table>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="section section--tight alt">' +
        '<div class="container">' +
          '<div class="section-head"><div><p class="eyebrow">More to see</p><h2>You may also like</h2></div><a href="' + listHref + '" class="link-more">View all ' + listType.toLowerCase() + '</a></div>' +
          '<div class="product-grid">' + related + '</div>' +
        '</div>' +
      '</section>';

    /* thumbnail switching */
    root.addEventListener('click', function (e) {
      var th = e.target.closest('.pd-thumb');
      if (!th) return;
      root.querySelectorAll('.pd-thumb').forEach(function (b) { b.classList.remove('active'); });
      th.classList.add('active');
      var main = root.querySelector('.pd-main');
      if (th.getAttribute('data-type') === 'img') {
        main.innerHTML = '<img src="' + th.getAttribute('data-val') + '" alt="">';
      } else {
        main.innerHTML = '<span class="ph ' + th.getAttribute('data-val') + '">' + iconHTML + '</span>';
      }
    });

    /* Enquiry modal (WhatsApp / Instagram / form) */
    var waMsg = encodeURIComponent("Hi Blue Diamond Co., I'm interested in the " + p.title + ". Could you share more details and availability?");
    var modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-label="Enquire">' +
        '<div class="modal-head"><div><p class="eyebrow">Enquire</p><h3>' + esc(p.title) + '</h3></div>' +
          '<button class="modal-close" aria-label="Close">×</button></div>' +
        '<p class="modal-sub">Message us directly, or leave your details and we’ll come back to you.</p>' +
        '<div class="chan-btns">' +
          '<a class="chan-btn chan-wa" href="https://wa.me/447922252229?text=' + waMsg + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.9.8-2.7-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.2.2-.4v-.4l-.8-1.8c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.7.7-.9 1.7-.6 2.7a7.5 7.5 0 0 0 5.9 4.9c1.4.3 2.4.1 3-.5.3-.4.5-.9.4-1.1 0-.1-.2-.2-.4-.3z"/></svg> Message on WhatsApp</a>' +
          '<a class="chan-btn chan-ig" href="https://www.instagram.com/_bluediamondco/" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> Message on Instagram</a>' +
        '</div>' +
        '<div class="modal-or">or</div>' +
        '<form id="enq-form" novalidate>' +
          '<div class="field"><label>Name *</label><input type="text" required autocomplete="name"></div>' +
          '<div class="form-row">' +
            '<div class="field"><label>Email</label><input type="email" autocomplete="email"></div>' +
            '<div class="field"><label>Phone</label><input type="tel" autocomplete="tel"></div>' +
          '</div>' +
          '<div class="field"><label>Message</label><textarea>I’d like to enquire about the ' + esc(p.title) + '.</textarea></div>' +
          '<div class="form-success" id="enq-success">Thanks — your enquiry has been received. We’ll be in touch shortly.</div>' +
          '<button type="submit" class="btn btn--primary btn--block">Send enquiry</button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(modal);
    var pb = document.getElementById('pd-back');
    if (pb) pb.addEventListener('click', function () { if (history.length > 1) history.back(); else window.location.href = listHref; });
    function openModal() { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }
    var enqBtn = document.getElementById('pd-enquire');
    if (enqBtn) enqBtn.addEventListener('click', openModal);
    modal.addEventListener('click', function (e) { if (e.target === modal || e.target.closest('.modal-close')) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    var enqForm = document.getElementById('enq-form');
    if (enqForm) enqForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!enqForm.checkValidity()) { enqForm.reportValidity(); return; }
      var s = document.getElementById('enq-success'); if (s) s.classList.add('show');
      enqForm.querySelector('button[type="submit"]').style.display = 'none';
    });
  }

  initCatalog();
  initProduct();
})();
