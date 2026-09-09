/* =========================================================================
   Kevin Zhu — site behaviour
   Vanilla JS, no dependencies. Everything here is progressive enhancement:
   with JS off the page is still complete and readable.
   ========================================================================= */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Portrait: fall back to a monogram if the photo is missing
     --------------------------------------------------------------------- */

  function portraitFallback() {
    var img = document.getElementById('portrait');
    if (!img) return;

    function swap() {
      if (document.getElementById('portrait-fallback')) return;
      var div = document.createElement('div');
      div.id = 'portrait-fallback';
      div.className = 'portrait portrait--fallback';
      div.setAttribute('role', 'img');
      div.setAttribute('aria-label', 'Kevin Zhu');
      div.textContent = img.dataset.initials || 'KZ';
      img.replaceWith(div);
    }

    img.addEventListener('error', swap);
    // Covers a cached failure that fired before this script ran
    if (img.complete && img.naturalWidth === 0) swap();
  }

  /* ---------------------------------------------------------------------
     Scroll-spy: highlight the nav link for the section you are reading
     --------------------------------------------------------------------- */

  function scrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    var sections = [];

    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (!section) return;
      byId[id] = link;
      sections.push(section);
    });

    var visible = {};

    function paint() {
      var current = null;
      sections.forEach(function (section) {
        if (visible[section.id]) current = current || section.id;
      });

      // Past the last section (in the footer), keep the last one lit
      if (!current) {
        var scrolled = window.scrollY + window.innerHeight;
        if (scrolled >= document.body.scrollHeight - 4) {
          current = sections[sections.length - 1].id;
        }
      }

      links.forEach(function (link) {
        var isCurrent = link.getAttribute('href') === '#' + current;
        if (isCurrent) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });
      paint();
    }, {
      // Trigger when a section crosses the middle-upper part of the viewport
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    sections.forEach(function (section) { observer.observe(section); });
    window.addEventListener('scroll', paint, { passive: true });
    paint();
  }

  /* ---------------------------------------------------------------------
     Sticky header state + reading progress hairline
     --------------------------------------------------------------------- */

  function headerProgress() {
    var header = document.getElementById('site-header');
    var bar = document.getElementById('progress');
    if (!header) return;

    var ticking = false;

    function update() {
      ticking = false;
      var y = window.scrollY || 0;
      header.classList.toggle('is-stuck', y > 8);

      if (bar) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        bar.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
      }
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });

    window.addEventListener('resize', update);
    update();
  }

  /* ---------------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------------- */

  function reveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    root.classList.add('reveal-on');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    items.forEach(function (el) { observer.observe(el); });

    // Anything already on screen at load shows immediately
    requestAnimationFrame(function () {
      items.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('is-visible');
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
     Topic / type filters
     --------------------------------------------------------------------- */

  function filters() {
    var groups = document.querySelectorAll('[data-filter-group]');

    Array.prototype.forEach.call(groups, function (group) {
      var list = document.querySelector(group.dataset.filterGroup);
      if (!list) return;

      var items = Array.prototype.slice.call(list.children);
      var chips = Array.prototype.slice.call(group.querySelectorAll('[data-filter]'));
      var empty = list.parentNode.querySelector('.filter-empty');

      function apply(value) {
        var shown = 0;

        items.forEach(function (item) {
          var tags = (item.dataset.tags || '').split(/\s+/);
          var match = value === 'all' || tags.indexOf(value) !== -1;
          item.hidden = !match;
          if (match) shown++;
        });

        chips.forEach(function (chip) {
          chip.setAttribute('aria-pressed', String(chip.dataset.filter === value));
        });

        if (empty) empty.hidden = shown !== 0;
      }

      chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          // Clicking the active chip clears back to "all"
          var next = chip.getAttribute('aria-pressed') === 'true' ? 'all' : chip.dataset.filter;
          apply(next);
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     Expand all / collapse all
     --------------------------------------------------------------------- */

  function expandAll() {
    var buttons = document.querySelectorAll('[data-expand-all]');

    Array.prototype.forEach.call(buttons, function (button) {
      var list = document.querySelector(button.dataset.expandAll);
      if (!list) return;

      var entries = Array.prototype.slice.call(list.querySelectorAll('details'));

      function sync() {
        var allOpen = entries.every(function (d) { return d.open; });
        button.setAttribute('aria-expanded', String(allOpen));
        button.textContent = allOpen ? 'Collapse all' : 'Expand all';
      }

      button.addEventListener('click', function () {
        var open = button.getAttribute('aria-expanded') !== 'true';
        entries.forEach(function (d) { d.open = open; });
        sync();
      });

      entries.forEach(function (d) { d.addEventListener('toggle', sync); });
      sync();
    });
  }

  /* ---------------------------------------------------------------------
     Smooth scrolling that also moves keyboard focus
     --------------------------------------------------------------------- */

  function anchorFocus() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;

      var id = link.getAttribute('href').slice(1);
      var target = id ? document.getElementById(id) : null;
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

      // Move focus without a second jump
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });

      if (history.replaceState) history.replaceState(null, '', '#' + id);
    });
  }

  /* ---------------------------------------------------------------------
     Print: open every collapsed entry so nothing is lost on paper
     --------------------------------------------------------------------- */

  function printing() {
    var wasOpen = [];

    window.addEventListener('beforeprint', function () {
      wasOpen = [];
      Array.prototype.forEach.call(document.querySelectorAll('details'), function (d) {
        wasOpen.push(d.open);
        d.open = true;
      });
    });

    window.addEventListener('afterprint', function () {
      Array.prototype.forEach.call(document.querySelectorAll('details'), function (d, i) {
        d.open = wasOpen[i];
      });
    });
  }

  /* ---------------------------------------------------------------------
     Clear out the old Jekyll theme's service worker and its caches
     --------------------------------------------------------------------- */

  function dropStaleServiceWorkers() {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      registrations.forEach(function (registration) { registration.unregister(); });
    }).catch(function () { /* nothing we can do */ });

    if (window.caches && caches.keys) {
      caches.keys().then(function (names) {
        names.forEach(function (name) { caches.delete(name); });
      }).catch(function () { /* nothing we can do */ });
    }
  }

  /* ------------------------------------------------------------------- */

  function init() {
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    portraitFallback();
    headerProgress();
    reveal();
    scrollSpy();
    filters();
    expandAll();
    anchorFocus();
    printing();
    dropStaleServiceWorkers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
