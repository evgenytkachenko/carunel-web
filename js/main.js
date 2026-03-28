/* ============================================
   Carunel Studio — Shared Components & Scripts
   ============================================ */

(function () {
  'use strict';

  /* --- Path helper for GitHub Pages subdirectory support --- */
  function basePath() {
    // Detect if running under a subdirectory (GitHub Pages project site)
    const base = document.querySelector('base');
    if (base) return base.getAttribute('href').replace(/\/$/, '');
    return '';
  }

  function resolvePath(path) {
    const root = basePath();
    return root + path;
  }

  /* --- Determine current page for nav active state --- */
  function currentPage() {
    const path = window.location.pathname;
    if (path.endsWith('/') || path.endsWith('/index.html')) {
      // Could be root or /beadwell/
      if (path.includes('/beadwell')) return 'beadwell';
      return 'home';
    }
    if (path.includes('/about')) return 'about';
    if (path.includes('/products')) return 'products';
    if (path.includes('/beadwell')) return 'beadwell';
    if (path.includes('/contact')) return 'contact';
    return 'home';
  }

  /* --- Header Component --- */
  function renderHeader() {
    const page = currentPage();
    const isSubdir = window.location.pathname.includes('/beadwell/');
    const prefix = isSubdir ? '../' : '';

    const active = (p) => page === p ? ' site-nav__link--active' : '';

    const header = document.createElement('header');
    header.className = 'site-header';
    header.setAttribute('role', 'banner');
    header.innerHTML = `
      <div class="site-header__inner">
        <a href="${prefix}index.html" class="site-header__logo">
            <img src="${prefix}assets/images/carunel-logo-transparent.png" alt="Carunel Studio" class="site-header__logo-img">
          </a>
        <nav class="site-nav" role="navigation" aria-label="Main navigation">
          <a href="${prefix}index.html" class="site-nav__link${active('home')}">Home</a>
          <a href="${prefix}about.html" class="site-nav__link${active('about')}">About</a>
          <a href="${prefix}beadwell/index.html" class="site-nav__link${active('beadwell')}">Beadwell</a>
          <a href="${prefix}contact.html" class="site-nav__link${active('contact')}">Contact</a>
        </nav>
        <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
        </button>
      </div>
    `;

    document.body.prepend(header);

    // Mobile toggle
    const toggle = header.querySelector('.nav-toggle');
    const nav = header.querySelector('.site-nav');
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('site-nav--open');
      toggle.setAttribute('aria-expanded', open);
    });

    // Close mobile nav on link click
    nav.querySelectorAll('.site-nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('site-nav--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Footer Component --- */
  function renderFooter() {
    const isSubdir = window.location.pathname.includes('/beadwell/');
    const prefix = isSubdir ? '../' : '';
    const year = new Date().getFullYear();

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.setAttribute('role', 'contentinfo');
    footer.innerHTML = `
      <div class="site-footer__inner">
        <div class="site-footer__top">
          <div>
            <img src="${prefix}assets/images/carunel-logo-transparent.png" alt="Carunel Studio" class="site-footer__logo-img">
            <p class="site-footer__tagline">Thoughtful digital products for children and families.</p>
          </div>
          <div class="site-footer__links">
            <div class="site-footer__link-group">
              <h4>Studio</h4>
              <a href="${prefix}about.html">About</a>
              <a href="${prefix}contact.html">Contact</a>
            </div>
            <div class="site-footer__link-group">
              <h4>Beadwell</h4>
              <a href="${prefix}beadwell/index.html">Product</a>
              <a href="${prefix}beadwell/privacy/">Privacy Policy</a>
              <a href="${prefix}beadwell/terms/">Terms of Use</a>
            </div>
          </div>
        </div>
        <div class="site-footer__bottom">
          <span class="site-footer__copyright">&copy; ${year} Carunel Studio. All rights reserved.</span>
          <div class="bead-dots">
            <span class="bead-dots__dot bead-dots__dot--gold"></span>
            <span class="bead-dots__dot bead-dots__dot--sage"></span>
            <span class="bead-dots__dot bead-dots__dot--gold"></span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(footer);
  }

  /* --- Scroll Reveal --- */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => observer.observe(el));
  }

  /* --- Init --- */
  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    initReveal();
  });
})();
