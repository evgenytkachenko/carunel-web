/* ============================================
   Carunel Studio — Shared Components & Scripts
   ============================================ */

(function () {
  'use strict';

  /* --- Shared Product Data: App Store / Google Play / Amazon Appstore links --- */
  const STORE_LINKS = {
    beadwell: {
      name: 'Beadwell Math',
      displayName: 'Beadwell',
      appleUrl: 'https://apps.apple.com/us/app/beadwell-math/id6792008438',
      googleUrl: 'https://play.google.com/store/apps/details?id=com.beadwell.app',
      amazonUrl: 'https://www.amazon.com/Beadwell-Calm-Math-Practice-Kids/dp/B0GX2WK9W5'
    },
    quizwell: {
      name: 'QuizWell Math',
      displayName: 'QuizWell',
      appleUrl: 'https://apps.apple.com/us/app/quizwell-math/id6791330334',
      googleUrl: 'https://play.google.com/store/apps/details?id=com.quizwellapp.quizwell',
      amazonUrl: 'https://www.amazon.com/QuizWell-Math-Quiz-Practice-Kids/dp/B0H3XDMRN3'
    },
    gentleclover: {
      name: 'GentleClover',
      displayName: 'GentleClover',
      appleUrl: 'https://apps.apple.com/us/app/gentleclover/id6792042143',
      googleUrl: 'https://play.google.com/store/apps/details?id=com.carunel.gentleclover',
      amazonUrl: 'https://www.amazon.com/gp/product/B0GXWG526B'
    }
  };

  /* --- Path helper --- */
  // Compute the relative prefix from the current page to the site root,
  // based on directory depth. Works for any nesting: /, /about/, /beadwell/privacy/, etc.
  function rootPrefix() {
    const path = window.location.pathname;
    const dir = path.replace(/[^/]*$/, ''); // strip trailing filename, if any
    const depth = (dir.match(/\//g) || []).length - 1;
    return depth > 0 ? '../'.repeat(depth) : '';
  }

  /* --- Determine current page for nav active state --- */
  function currentPage() {
    const path = window.location.pathname.replace(/index\.html$/, '');
    if (path === '/' || path === '') return 'home';
    if (path.includes('/beadwell')) return 'beadwell';
    if (path.includes('/gentleclover')) return 'gentleclover';
    if (path.includes('/quizwell')) return 'quizwell';
    if (path.includes('/about')) return 'about';
    if (path.includes('/products')) return 'products';
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
        <a href="${prefix || '/'}" class="site-header__logo">
            <img src="${prefix}assets/images/carunel-logo-transparent.png" alt="Carunel Studio" class="site-header__logo-img">
          </a>
        <nav class="site-nav" role="navigation" aria-label="Main navigation">
          <a href="${prefix || '/'}" class="site-nav__link${active('home')}">Studio</a>
          <a href="${prefix}about/" class="site-nav__link${active('about')}">About</a>
          <a href="${prefix}products/" class="site-nav__link${active('products')}">Products</a>
          <a href="${prefix}contact/" class="site-nav__link site-nav__link--muted${active('contact')}">Contact</a>
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
              <a href="${prefix}about/">About</a>
              <a href="${prefix}contact/">Contact</a>
            </div>
            <div class="site-footer__link-group">
              <h4>Beadwell</h4>
              <a href="${prefix}beadwell/">Product</a>
              <a href="${prefix}beadwell/privacy/">Privacy Policy</a>
              <a href="${prefix}beadwell/terms/">Terms of Use</a>
            </div>
            <div class="site-footer__link-group">
              <h4>GentleClover</h4>
              <a href="${prefix}gentleclover/">Product</a>
              <a href="${prefix}gentleclover/privacy/">Privacy Policy</a>
              <a href="${prefix}gentleclover/terms/">Terms of Use</a>
            </div>
            <div class="site-footer__link-group">
              <h4>QuizWell</h4>
              <a href="${prefix}quizwell/">Product</a>
              <a href="${prefix}quizwell/privacy/">Privacy Policy</a>
              <a href="${prefix}quizwell/terms/">Terms of Use</a>
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

  /* --- StoreBadges Component --- */
  // Renders official App Store / Google Play / Amazon Appstore badges for a product.
  // Usage: <div data-store-badges="beadwell" data-variant="compact"></div>
  // Compact variant (homepage cards) shows Apple + Google only, to avoid
  // crowding the card; product pages (default variant) show every store the app is on;
  // cta variant (bottom-of-page download CTA) shows every store too, at a smaller size.
  function renderStoreBadges(product, prefix, variant) {
    if (!product || (!product.appleUrl && !product.googleUrl && !product.amazonUrl)) return '';

    const compact = variant === 'compact';
    const variantClass = compact ? ' store-badges--compact' : (variant === 'cta' ? ' store-badges--cta' : '');
    let html = `<div class="store-badges${variantClass}">`;

    if (product.appleUrl) {
      html += `
        <a href="${product.appleUrl}" class="store-badge store-badge--apple" target="_blank" rel="noopener noreferrer" aria-label="Download ${product.name} on the App Store">
          <img src="${prefix}assets/images/badges/app-store-badge.svg" alt="" loading="lazy">
        </a>`;
    }
    if (product.googleUrl) {
      html += `
        <a href="${product.googleUrl}" class="store-badge store-badge--google" target="_blank" rel="noopener noreferrer" aria-label="Get ${product.name} on Google Play">
          <img src="${prefix}assets/images/badges/google-play-badge.png" alt="" loading="lazy">
        </a>`;
    }
    if (product.amazonUrl && !compact) {
      html += `
        <a href="${product.amazonUrl}" class="store-badge store-badge--amazon" target="_blank" rel="noopener noreferrer" aria-label="Get ${product.name} from the Amazon Appstore">
          <img src="${prefix}assets/images/badges/amazon-appstore-badge.png" alt="" loading="lazy">
        </a>`;
    }

    html += `</div>`;
    return html;
  }

  function initStoreBadges() {
    const prefix = rootPrefix();
    document.querySelectorAll('[data-store-badges]').forEach((mount) => {
      const product = STORE_LINKS[mount.getAttribute('data-store-badges')];
      const variant = mount.getAttribute('data-variant') || 'default';
      mount.outerHTML = renderStoreBadges(product, prefix, variant);
    });
  }

  /* --- DownloadCta Component --- */
  // Final "get the app" section for product pages, placed just above the footer.
  // Usage: <section class="section--sm section--sand download-cta"
  //           data-download-cta="beadwell" data-tagline="One short sentence."></section>
  // Reuses the same STORE_LINKS entry (and therefore the same URLs, badge assets,
  // and accessible labels) as the product's hero badges — just rendered smaller.
  function renderDownloadCta(product, prefix, tagline) {
    const badges = renderStoreBadges(product, prefix, 'cta');
    if (!badges) return '';
    return `
      <div class="container container--narrow download-cta__inner">
        <h2 class="download-cta__heading">Ready to try ${product.displayName}?</h2>
        <p class="download-cta__text">${tagline}</p>
        ${badges}
      </div>
    `;
  }

  function initDownloadCta() {
    const prefix = rootPrefix();
    document.querySelectorAll('[data-download-cta]').forEach((mount) => {
      const product = STORE_LINKS[mount.getAttribute('data-download-cta')];
      const tagline = mount.getAttribute('data-tagline') || '';
      mount.innerHTML = product ? renderDownloadCta(product, prefix, tagline) : '';
    });
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
    initDownloadCta();
    renderFooter();
    initStoreBadges();
    initReveal();
  });
})();
