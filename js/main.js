/* ============================================
   Carunel Studio — Shared Components & Scripts
   ============================================ */

(function () {
  'use strict';

  /* --- Path helper --- */
  // Compute the relative prefix from the current page to the site root.
  // Works for any nesting depth: /, /beadwell/, /gentleclover/privacy/, etc.
  function rootPrefix() {
    const path = window.location.pathname;
    const products = ['beadwell', 'gentleclover'];
    for (const p of products) {
      const idx = path.indexOf('/' + p + '/');
      if (idx !== -1) {
        // Count slashes after the product directory start
        const after = path.substring(idx + p.length + 2);
        const depth = (after.match(/\//g) || []).length + 1;
        return '../'.repeat(depth);
      }
    }
    return '';
  }

  /* --- Determine current page for nav active state --- */
  function currentPage() {
    const path = window.location.pathname;
    if (path.endsWith('/') || path.endsWith('/index.html')) {
      if (path.includes('/beadwell')) return 'beadwell';
      if (path.includes('/gentleclover')) return 'gentleclover';
      return 'home';
    }
    if (path.includes('/about')) return 'about';
    if (path.includes('/products')) return 'products';
    if (path.includes('/beadwell')) return 'products';
    if (path.includes('/gentleclover')) return 'products';
    if (path.includes('/contact')) return 'contact';
    return 'home';
  }

  /* --- Header Component --- */
  function renderHeader() {
    const page = currentPage();
    const prefix = rootPrefix();

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
          <a href="${prefix}index.html" class="site-nav__link${active('home')}">Studio</a>
          <a href="${prefix}about.html" class="site-nav__link${active('about')}">About</a>
          <a href="${prefix}products.html" class="site-nav__link${active('products')}">Products</a>
          <a href="${prefix}contact.html" class="site-nav__link site-nav__link--muted${active('contact')}">Contact</a>
        </nav>
        <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
        </button>
      </div>
    `;

    // Skip-to-content link
    const skip = document.createElement('a');
    skip.href = '#main-content';
    skip.className = 'skip-link';
    skip.textContent = 'Skip to content';
    document.body.prepend(skip);

    document.body.prepend(header);

    // Add main-content id to first section after header
    const firstSection = document.querySelector('section, .legal-page');
    if (firstSection && !firstSection.id) {
      firstSection.id = 'main-content';
    }

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
    const prefix = rootPrefix();
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
            <div class="site-footer__link-group">
              <h4>GentleClover</h4>
              <a href="${prefix}gentleclover/index.html">Product</a>
              <a href="${prefix}gentleclover/privacy/">Privacy Policy</a>
              <a href="${prefix}gentleclover/terms/">Terms of Use</a>
            </div>
            <div class="site-footer__link-group">
              <h4>Follow</h4>
              <a href="https://www.facebook.com/carunelstudio" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.instagram.com/carunelstudio" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>
        <div class="site-footer__bottom">
          <span class="site-footer__copyright">&copy; ${year} Carunel Studio. All rights reserved.</span>
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
