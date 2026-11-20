(function () {
  'use strict';
  var root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';

  /* Hero: klockan lutar efter musen, ljuset följer markören */
  document.querySelectorAll('[data-tilt-area]').forEach(function (area) {
    var tilt = area.querySelector('[data-tilt]');
    area.addEventListener('mousemove', function (e) {
      var r = area.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width;
      var y = (e.clientY - r.top) / r.height;
      area.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      area.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      if (tilt) tilt.style.transform = 'rotateY(' + ((x - 0.5) * 22).toFixed(2) + 'deg) rotateX(' + ((0.5 - y) * 16).toFixed(2) + 'deg)';
    });
    area.addEventListener('mouseleave', function () {
      area.style.setProperty('--mx', '50%');
      area.style.setProperty('--my', '50%');
      if (tilt) tilt.style.transform = '';
    });
  });

  /* Mobilmeny */
  var header = document.querySelector('[data-header]');
  var toggle = document.querySelector('[data-menu-toggle]');
  if (header && toggle) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* Filterflikar i kollektionen på startsidan */
  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var section = group.closest('section');
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      var value = btn.getAttribute('data-filter');
      group.querySelectorAll('[data-filter]').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      section.querySelectorAll('[data-type]').forEach(function (card) {
        card.hidden = !(value === 'all' || card.getAttribute('data-type') === value);
      });
    });
  });

  /* Produktbilder: byt huvudbild */
  document.querySelectorAll('[data-gallery]').forEach(function (gallery) {
    var main = gallery.querySelector('[data-gallery-main]');
    gallery.querySelectorAll('[data-gallery-thumb]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        main.src = thumb.getAttribute('data-src');
        main.srcset = '';
        main.alt = thumb.getAttribute('data-alt') || '';
        gallery.querySelectorAll('[data-gallery-thumb]').forEach(function (t) {
          t.setAttribute('aria-current', t === thumb ? 'true' : 'false');
        });
      });
    });
  });

  /* Lägg i korgen utan sidladdning */
  var toastEl = document.querySelector('[data-toast]');
  var toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 2800);
  }
  function updateCount() {
    return fetch(root + 'cart.js', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = cart.item_count; });
      });
  }
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form.matches('[data-ajax-cart]')) return;
    e.preventDefault();
    var btn = form.querySelector('[type="submit"]');
    var label = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Lägger i korgen…'; }
    fetch(root + 'cart/add.js', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (!res.ok) throw new Error(res.data.description || 'Kunde inte lägga i korgen');
        toast((res.data.product_title || 'Varan') + ' ligger i korgen');
        return updateCount();
      })
      .catch(function (err) { toast(err.message); })
      .finally(function () { if (btn) { btn.disabled = false; btn.innerHTML = label; } });
  });
})();
