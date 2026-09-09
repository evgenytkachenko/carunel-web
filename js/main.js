/* ============================================
   Carunel — Shared Components & Scripts
   ============================================ */

(function () {
  'use strict';

  /* --- Shared Site Config: legal name, contact, and cross-brand links --- */
  const SITE = {
    companyName: 'Carunel',
    legalName: 'Carunel LLC',
    contactEmail: 'business@carunel.com',
    hyperAgile: {
      home: 'https://hyperagiletesting.com/',
      book: 'https://hyperagiletesting.com/book',
      framework: 'https://hyperagiletesting.com/framework',
      qualityLoop: 'https://hyperagiletesting.com/quality-loop',
      consulting: 'https://hyperagiletesting.com/consulting'
    }
  };

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

  /* --- Shared Book Data: Evgeny Tkachenko's books --- */
  // Single source of truth for title, author, year, and Amazon links so book
  // cards on the homepage and /books-media/ never drift out of sync.
  // `group: 'earlier'` marks the earlier-books grid on /books-media/.
  const BOOKS = {
    'hyper-agile-testing': {
      title: 'Hyper-Agile Testing',
      subtitle: 'Delivering Software in an AI-Accelerated World',
      author: 'Evgeny Tkachenko',
      year: null,
      status: 'forthcoming',
      coverEyebrow: 'Forthcoming from Apress',
      coverImage: 'assets/images/hyper-agile-testing-cover.png',
      coverImageAlt: 'Hyper-Agile Testing: Delivering Software in an AI-Accelerated World, by Evgeny Tkachenko, forthcoming from Apress.',
      description: 'A forthcoming Apress book by Evgeny Tkachenko about connecting product intent, risk, validation, automation, release readiness, and production learning in AI-accelerated software delivery.',
      exploreUrl: 'https://hyperagiletesting.com/book',
      amazonUrl: 'https://www.amazon.com/Hyper-Agile-Testing-Delivering-Software-AI-Accelerated/dp/B0HBHS228V'
    },
    'navigating-quality-engineering': {
      group: 'earlier',
      title: 'Navigating Quality Engineering in the AI Era',
      subtitle: 'Key Insights for Modern Quality Engineering and Management',
      author: 'Evgeny Tkachenko',
      year: 2024,
      status: 'published',
      coverImage: 'assets/images/navigating-quality-engineering-cover.jpg',
      coverImageAlt: 'Navigating Quality Engineering in the AI Era: Key Insights for Modern Quality Engineering and Management, by Evgeny Tkachenko.',
      description: 'A practical examination of how artificial intelligence, automation, DevOps, and changing delivery expectations are reshaping Quality Engineering roles, practices, and leadership.',
      amazonUrl: 'https://www.amazon.com/Navigating-Quality-Engineering-Era-Management/dp/B0D9PGJ6HB'
    },
    'testing-ai-powered-applications': {
      group: 'earlier',
      title: 'Testing AI-Powered Applications',
      subtitle: 'Ensuring Quality in the Age of Intelligent Software',
      author: 'Evgeny Tkachenko',
      year: 2024,
      status: 'published',
      coverImage: 'assets/images/testing-ai-powered-applications-cover.jpg',
      coverImageAlt: 'Testing AI-Powered Applications: Ensuring Quality in the Age of Intelligent Software, by Evgeny Tkachenko.',
      description: 'A focused guide to testing AI-powered systems, including strategies for evaluating accuracy, robustness, interpretability, fairness, data variability, model uncertainty, and responsible AI quality.',
      amazonUrl: 'https://www.amazon.com/Testing-AI-Powered-Applications-Ensuring-Intelligent/dp/B0DJSPTX4J'
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
    if (path.includes('/organizations')) return 'organizations';
    if (path.includes('/books-media')) return 'books-media';
    if (path.includes('/contact')) return 'contact';
    return 'home';
  }

  /* --- Header Component --- */
  function renderHeader() {
    const page = currentPage();
    const prefix = rootPrefix();

    const active = (p) => page === p ? ' site-nav__link--active' : '';
    const ariaCurrent = (p) => page === p ? ' aria-current="page"' : '';

    const header = document.createElement('header');
    header.className = 'site-header';
    header.setAttribute('role', 'banner');
    header.innerHTML = `
      <div class="site-header__inner">
        <a href="${prefix || '/'}" class="site-header__logo" aria-label="Carunel — home">
            <img src="${prefix}assets/images/carunel-symbol.svg" alt="" class="site-header__logo-icon">
            <span class="site-header__logo-text">Carunel</span>
          </a>
        <nav class="site-nav" role="navigation" aria-label="Main navigation">
          <a href="${prefix}organizations/" class="site-nav__link${active('organizations')}"${ariaCurrent('organizations')}>For Organizations</a>
          <a href="${prefix}books-media/" class="site-nav__link${active('books-media')}"${ariaCurrent('books-media')}>Books &amp; Frameworks</a>
          <a href="${prefix}products/" class="site-nav__link${active('products')}"${ariaCurrent('products')}>Learning Apps</a>
          <a href="${prefix}about/" class="site-nav__link${active('about')}"${ariaCurrent('about')}>About</a>
          <a href="${prefix}contact/" class="site-nav__link site-nav__link--muted${active('contact')}"${ariaCurrent('contact')}>Contact</a>
        </nav>
        <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
        </button>
      </div>
    `;

    // Skip-to-content link — must be prepended after the header so it lands
    // as the very first focusable element in the document, not the second.
    const skip = document.createElement('a');
    skip.href = '#main-content';
    skip.className = 'skip-link';
    skip.textContent = 'Skip to content';

    document.body.prepend(header);
    document.body.prepend(skip);

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
            <div class="site-footer__logo">
              <img src="${prefix}assets/images/carunel-symbol.svg" alt="" class="site-footer__logo-icon">
              <span class="site-footer__logo-text">Carunel</span>
            </div>
            <p class="site-footer__tagline">Quality Engineering consulting, practical frameworks, professional books, and thoughtful learning products.</p>
          </div>
          <div class="site-footer__links">
            <div class="site-footer__link-group">
              <h4>For Organizations</h4>
              <a href="${prefix}organizations/">Consulting Overview</a>
              <a href="${SITE.hyperAgile.home}" target="_blank" rel="noopener noreferrer">Hyper-Agile Quality Engineering&trade;</a>
              <a href="${SITE.hyperAgile.consulting}" target="_blank" rel="noopener noreferrer">Consulting</a>
            </div>
            <div class="site-footer__link-group">
              <h4>Books &amp; Frameworks</h4>
              <a href="${prefix}books-media/">All Books</a>
              <a href="${SITE.hyperAgile.book}" target="_blank" rel="noopener noreferrer">Hyper-Agile Testing</a>
              <a href="${SITE.hyperAgile.home}" target="_blank" rel="noopener noreferrer">Hyper-Agile Quality Engineering&trade;</a>
            </div>
            <div class="site-footer__link-group">
              <h4>Learning Apps</h4>
              <a href="${prefix}products/">All Learning Apps</a>
              <a href="${prefix}beadwell/">Beadwell</a>
              <a href="${prefix}gentleclover/">GentleClover</a>
              <a href="${prefix}quizwell/">QuizWell</a>
            </div>
            <div class="site-footer__link-group">
              <h4>Carunel</h4>
              <a href="${prefix}about/">About</a>
              <a href="${prefix}contact/">Contact</a>
              <a href="${prefix}privacy/">Privacy</a>
            </div>
            <div class="site-footer__link-group">
              <h4>Follow</h4>
              <a href="https://www.linkedin.com/in/eugenetkachenko/" target="_blank" rel="noopener noreferrer" aria-label="Evgeny Tkachenko on LinkedIn">Evgeny on LinkedIn</a>
              <a href="https://www.facebook.com/carunelstudio" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.instagram.com/carunelstudio" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>
        <div class="site-footer__bottom">
          <p class="site-footer__attribution">Evgeny Tkachenko is the originator of Hyper-Agile Quality Engineering&trade;. Organizational consulting, implementation support, workshops, and training are offered by ${SITE.legalName}.</p>
          <span class="site-footer__copyright">&copy; ${year} ${SITE.legalName}. All rights reserved.</span>
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

  /* --- Book Components --- */
  // Featured book: the flagship/forthcoming title, shown larger with a cover
  // and up to two CTAs (an "explore" link plus Amazon).
  // Usage: <div data-book-feature="hyper-agile-testing"></div>
  function renderBookCover(book, small, prefix) {
    const eyebrow = book.coverEyebrow || (book.year ? String(book.year) : '');
    const eyebrowClass = small ? 'book-mini__cover-year' : 'book-card__cover-eyebrow';
    const titleClass = small ? 'book-mini__cover-title' : 'book-card__cover-title';
    const authorClass = small ? 'book-mini__cover-author' : 'book-card__cover-author';

    // Prefer the approved cover image when one is available; fall back to
    // the text-only mockup (used for books without cover art on file).
    if (book.coverImage) {
      const coverClass = small ? 'book-mini__cover' : 'book-card__cover book-card__cover--photo';
      const alt = book.coverImageAlt || `${book.title} cover`;
      return `
        <div class="${coverClass}">
          <img src="${(prefix || '') + book.coverImage}" alt="${alt}" loading="lazy">
        </div>
      `;
    }

    const coverClass = small ? 'book-mini__cover' : 'book-card__cover';
    return `
      <div class="${coverClass}">
        ${eyebrow ? `<span class="${eyebrowClass}">${eyebrow}</span>` : ''}
        <span class="${titleClass}">${book.title}</span>
        ${small ? '' : `<span class="${authorClass}">${book.author}</span>`}
      </div>
    `;
  }

  // opts: { label, headingTag, headingText, headingStyle, divider } lets the
  // preview (homepage) and full (books-media) contexts each keep their own
  // heading level and copy while sharing one source of book data.
  function renderFeaturedBook(book, opts, prefix) {
    opts = opts || {};
    const amazonLabel = book.amazonLabel || 'View on Amazon';
    const headingTag = opts.headingTag || 'h3';
    const headingClass = headingTag === 'h2' ? '' : ' class="card__title"';
    const headingStyle = opts.headingStyle || 'font-size: 1.4rem; margin-top: var(--space-xs);';
    const headingText = opts.headingText || book.subtitle || book.title;
    const label = opts.label || book.title;
    let ctas = '';
    if (book.exploreUrl) {
      ctas += `<a href="${book.exploreUrl}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Explore the Book</a>`;
    }
    if (book.amazonUrl) {
      ctas += `<a href="${book.amazonUrl}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer" aria-label="${amazonLabel}: ${book.title}">${amazonLabel}</a>`;
    }
    return `
      <div class="book-card">
        ${renderBookCover(book, false, prefix)}
        <div>
          <span class="label-mono">${label}</span>
          <${headingTag}${headingClass} style="${headingStyle}">${headingText}</${headingTag}>
          ${opts.divider ? '<div class="divider"></div>' : ''}
          <p class="card__text" style="font-size: 0.98rem; line-height: 1.7;">${book.description}</p>
          <div class="btn-group mt-md">${ctas}</div>
        </div>
      </div>
    `;
  }

  // Earlier-books grid: compact, equal-height cards with a single Amazon CTA.
  // Usage: <div data-book-grid="earlier"></div>
  function renderBookGridCard(book, prefix) {
    const fullTitle = book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;
    return `
      <div class="book-mini">
        ${renderBookCover(book, true, prefix)}
        <h3 class="book-mini__title">${fullTitle}</h3>
        <p class="book-mini__meta">${book.author} &middot; ${book.year}</p>
        <p class="book-mini__text">${book.description}</p>
        <div class="btn-group">
          <a href="${book.amazonUrl}" class="btn btn--secondary btn--sm" target="_blank" rel="noopener noreferrer" aria-label="View ${fullTitle} on Amazon">View on Amazon</a>
        </div>
      </div>
    `;
  }

  function initBooks() {
    const prefix = rootPrefix();
    document.querySelectorAll('[data-book-feature]').forEach((mount) => {
      const book = BOOKS[mount.getAttribute('data-book-feature')];
      if (!book) return;
      const opts = {
        label: mount.getAttribute('data-book-label') || undefined,
        headingTag: mount.getAttribute('data-book-heading-tag') || undefined,
        headingStyle: mount.getAttribute('data-book-heading-style') || undefined,
        headingText: mount.getAttribute('data-book-heading-text') || undefined,
        divider: mount.hasAttribute('data-book-divider')
      };
      mount.outerHTML = renderFeaturedBook(book, opts, prefix);
    });
    document.querySelectorAll('[data-book-grid]').forEach((mount) => {
      const group = mount.getAttribute('data-book-grid');
      const books = Object.keys(BOOKS)
        .filter((key) => BOOKS[key].group === group)
        .map((key) => BOOKS[key]);
      mount.outerHTML = `<div class="book-grid">${books.map((book) => renderBookGridCard(book, prefix)).join('')}</div>`;
    });
  }

  /* --- Inquiry Form (Contact page) --- */
  // Formspree-powered form, progressively mounted only when a public form
  // ID is configured (see js/config.js / .env.example). If unconfigured,
  // the mount stays empty rather than rendering a form with nowhere to
  // submit — the "Email Carunel Directly" link on the page is the fallback.
  const INQUIRY_TYPES = [
    'Organizational Consulting',
    'Workshops & Training',
    'Books & Publishing',
    'Speaking & Media',
    'Partnerships',
    'Learning App Support',
    'Other'
  ];

  const WARNING_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';

  // Turns an INQUIRY_TYPES label into the URL-friendly slug used by the
  // `?type=` query param (e.g. cross-page CTAs like "Discuss an
  // Organizational Engagement" linking to /contact/?type=organizational-
  // consulting#inquiry-form). Derived from INQUIRY_TYPES rather than a
  // separate hardcoded map, so it can't drift out of sync with it.
  function slugifyInquiryType(label) {
    return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function getFormspreeFormId() {
    return (window.CARUNEL_CONFIG && window.CARUNEL_CONFIG.FORMSPREE_FORM_ID) || '';
  }

  function renderInquiryForm(formId) {
    const options = INQUIRY_TYPES
      .map((type) => `<option value="${type}">${type}</option>`)
      .join('');
    return `
      <div class="inquiry-form-wrap reveal" id="cf-form-wrap" data-inquiry-state="form">
      <form class="inquiry-form" id="carunel-inquiry-form" novalidate action="https://formspree.io/f/${formId}" method="POST">
        <div id="cf-summary" class="form-summary" role="alert" hidden></div>

        <div class="form-row">
          <label class="form-label" for="cf-name">Name <span class="form-required" aria-hidden="true">*</span><span class="sr-only"> (required)</span></label>
          <input class="form-input" type="text" id="cf-name" name="name" autocomplete="name" required aria-describedby="cf-name-error" aria-invalid="false">
          <p class="form-error" id="cf-name-error" hidden></p>
        </div>

        <div class="form-row">
          <label class="form-label" for="cf-email">Email <span class="form-required" aria-hidden="true">*</span><span class="sr-only"> (required)</span></label>
          <input class="form-input" type="email" id="cf-email" name="email" autocomplete="email" required aria-describedby="cf-email-error" aria-invalid="false">
          <p class="form-error" id="cf-email-error" hidden></p>
        </div>

        <div class="form-row">
          <label class="form-label" for="cf-organization">Organization <span class="form-optional">(optional)</span></label>
          <input class="form-input" type="text" id="cf-organization" name="organization" autocomplete="organization">
        </div>

        <div class="form-row">
          <label class="form-label" for="cf-inquiry-type">Inquiry type <span class="form-required" aria-hidden="true">*</span><span class="sr-only"> (required)</span></label>
          <select class="form-input" id="cf-inquiry-type" name="inquiryType" required aria-describedby="cf-inquiry-type-error" aria-invalid="false">
            <option value="">Choose one&hellip;</option>
            ${options}
          </select>
          <p class="form-error" id="cf-inquiry-type-error" hidden></p>
        </div>

        <div class="form-row">
          <label class="form-label" for="cf-message">Message <span class="form-required" aria-hidden="true">*</span><span class="sr-only"> (required)</span></label>
          <textarea class="form-input" id="cf-message" name="message" rows="5" required aria-describedby="cf-message-error" aria-invalid="false"></textarea>
          <p class="form-error" id="cf-message-error" hidden></p>
        </div>

        <div class="form-honeypot" aria-hidden="true">
          <label for="cf-company">Leave this field empty</label>
          <input type="text" id="cf-company" name="_gotcha" tabindex="-1" autocomplete="off">
        </div>

        <div id="cf-status" class="form-status" role="status" aria-live="polite"></div>

        <button type="submit" class="btn btn--primary" id="cf-submit">Send Message</button>
      </form>

      <div class="inquiry-success" id="cf-success" role="status" aria-live="polite" tabindex="-1">
        <svg class="inquiry-success__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>
        <p class="inquiry-success__heading">Message sent</p>
        <p class="inquiry-success__text" id="cf-success-text"></p>
        <button type="button" class="btn btn--secondary btn--sm" id="cf-send-another">Send another message &rarr;</button>
      </div>
      </div>
    `;
  }

  const INQUIRY_FIELD_VALIDATORS = {
    'cf-name': (value) => (value.trim() ? '' : 'Please enter your name.'),
    'cf-email': (value) => {
      const trimmed = value.trim();
      if (!trimmed) return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Please enter a valid email address.';
      return '';
    },
    'cf-inquiry-type': (value) => (value ? '' : 'Please choose an inquiry type.'),
    'cf-message': (value) => (value.trim() ? '' : 'Please enter a message.')
  };

  function setInquiryFieldError(field, message) {
    const errorEl = document.getElementById(field.getAttribute('aria-describedby'));
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      if (errorEl) {
        errorEl.innerHTML = WARNING_ICON + `<span>${message}</span>`;
        errorEl.hidden = false;
      }
    } else {
      field.setAttribute('aria-invalid', 'false');
      if (errorEl) {
        errorEl.innerHTML = '';
        errorEl.hidden = true;
      }
    }
  }

  function validateInquiryField(field) {
    const validator = INQUIRY_FIELD_VALIDATORS[field.id];
    if (!validator) return true;
    const message = validator(field.value);
    setInquiryFieldError(field, message);
    return !message;
  }

  function initInquiryForm() {
    const mount = document.querySelector('[data-inquiry-form]');
    if (!mount) return;

    const heading = document.querySelector('[data-inquiry-heading]');
    const subtext = document.querySelector('[data-inquiry-subtext]');
    const acknowledgment = document.querySelector('[data-inquiry-acknowledgment]');
    const emailBanner = document.querySelector('[data-email-banner]');
    const emailFallbackCard = document.querySelector('[data-email-fallback-card]');

    const formId = getFormspreeFormId();
    if (!formId) {
      // Unconfigured: leave the mount empty rather than render a form with
      // nowhere to submit. The heading/subtext already default to
      // form-free copy in the HTML, the acknowledgment stays hidden, and
      // the standalone email card (not the compact banner) is the only
      // contact option shown, so visitors are never told about a form
      // that isn't there. Only note this locally — never in production.
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        console.info('[Carunel] FORMSPREE_FORM_ID is not set in js/config.js — the inquiry form is hidden. The direct-email option on this page still works.');
      }
      return;
    }

    if (heading) heading.textContent = 'Start a General Inquiry';
    if (subtext) subtext.textContent = 'We typically respond within a few business days.';
    if (acknowledgment) acknowledgment.hidden = false;
    // Once a form renders, the compact banner above it becomes the
    // email alternative, replacing the taller standalone card — no more
    // pairing a full-height form beside a short card in a lopsided grid.
    if (emailBanner) emailBanner.hidden = false;
    if (emailFallbackCard) emailFallbackCard.hidden = true;

    mount.outerHTML = renderInquiryForm(formId);

    const form = document.getElementById('carunel-inquiry-form');
    if (!form) return;

    // Pre-select the inquiry type when arriving via a `?type=<slug>` link
    // (see the "Discuss an Organizational Engagement" CTAs on the
    // homepage and /organizations/), so visitors don't have to repeat a
    // choice they've effectively already made by clicking that CTA.
    const requestedType = new URLSearchParams(location.search).get('type');
    if (requestedType) {
      const typeSelect = document.getElementById('cf-inquiry-type');
      const match = INQUIRY_TYPES.find((label) => slugifyInquiryType(label) === requestedType);
      if (typeSelect && match) typeSelect.value = match;
    }

    const wrap = document.getElementById('cf-form-wrap');
    const summary = document.getElementById('cf-summary');
    const status = document.getElementById('cf-status');
    const submitBtn = document.getElementById('cf-submit');
    const successEl = document.getElementById('cf-success');
    const successText = document.getElementById('cf-success-text');
    const sendAnotherBtn = document.getElementById('cf-send-another');
    const fieldIds = ['cf-name', 'cf-email', 'cf-inquiry-type', 'cf-message'];
    let submitting = false;
    let attempted = false;

    if (sendAnotherBtn) {
      sendAnotherBtn.addEventListener('click', () => {
        wrap.setAttribute('data-inquiry-state', 'form');
        successText.textContent = '';
        document.getElementById('cf-name').focus();
      });
    }

    fieldIds.forEach((id) => {
      const field = document.getElementById(id);
      ['input', 'change'].forEach((evt) => {
        field.addEventListener(evt, () => {
          if (attempted) validateInquiryField(field);
        });
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (submitting) return;

      attempted = true;
      let firstInvalid = null;
      fieldIds.forEach((id) => {
        const field = document.getElementById(id);
        const valid = validateInquiryField(field);
        if (!valid && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        summary.innerHTML = WARNING_ICON + '<span>Please correct the highlighted fields below.</span>';
        summary.hidden = false;
        firstInvalid.focus();
        return;
      }

      summary.hidden = true;
      summary.innerHTML = '';

      submitting = true;
      submitBtn.disabled = true;
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      status.removeAttribute('data-state');
      status.textContent = '';

      const payload = {
        name: document.getElementById('cf-name').value.trim(),
        email: document.getElementById('cf-email').value.trim(),
        organization: document.getElementById('cf-organization').value.trim(),
        inquiryType: document.getElementById('cf-inquiry-type').value,
        message: document.getElementById('cf-message').value.trim(),
        _gotcha: document.getElementById('cf-company').value
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      })
        .then((response) => {
          if (response.ok) {
            form.reset();
            fieldIds.forEach((id) => setInquiryFieldError(document.getElementById(id), ''));
            attempted = false;
            // Swap the form out for a confirmation card rather than
            // leaving an emptied, still-submittable form on screen next
            // to a small status line — the animated cross-fade is CSS
            // only (see .inquiry-form-wrap in styles.css) and collapses
            // to an instant swap under prefers-reduced-motion.
            successText.textContent = "Thank you — your message has been sent. We'll respond within a few business days.";
            wrap.setAttribute('data-inquiry-state', 'success');
            successEl.focus();
          } else {
            status.setAttribute('data-state', 'error');
            status.textContent = 'Something went wrong sending your message. Please try again, or email us directly at business@carunel.com.';
          }
        })
        .catch(() => {
          status.setAttribute('data-state', 'error');
          status.textContent = 'Something went wrong sending your message. Please try again, or email us directly at business@carunel.com.';
        })
        .finally(() => {
          clearTimeout(timeoutId);
          submitting = false;
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
    });
  }

  /* --- Copy Email Button --- */
  function initCopyEmail() {
    document.querySelectorAll('[data-copy-email]').forEach((btn) => {
      const label = btn.querySelector('.copy-email-btn__label');
      const email = btn.getAttribute('data-copy-email');
      let resetTimer = null;

      btn.addEventListener('click', () => {
        if (!navigator.clipboard || !navigator.clipboard.writeText) return;
        navigator.clipboard.writeText(email).then(() => {
          if (label) label.textContent = 'Copied';
          btn.setAttribute('aria-label', `Copied ${email} to clipboard`);
          clearTimeout(resetTimer);
          resetTimer = setTimeout(() => {
            if (label) label.textContent = 'Copy';
            btn.setAttribute('aria-label', `Copy email address ${email}`);
          }, 2000);
        }).catch(() => {});
      });
    });
  }

  /* --- Scroll Reveal ---
     Progressive enhancement: .reveal content is visible by default (see
     styles.css). The hidden pre-animation state only applies once this
     script confirms IntersectionObserver is available and adds
     .reveal-enabled to <html> — so content stays visible if this script
     never runs, errors out, or hasn't executed yet (including in
     automated screenshots taken before scripting completes). */
  function initReveal() {
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!els.length) return;

    // IntersectionObserver isn't supported: leave .reveal-enabled off so
    // everything stays at its visible default.
    if (!('IntersectionObserver' in window)) return;

    // Elements already on screen at init time (e.g. above-the-fold hero
    // content, or anything in view because JS hydrated late and the visitor
    // is already looking at the page) are marked .revealed *before*
    // .reveal-enabled is added, in the same synchronous pass. Both classes
    // land before the browser's next paint, so there is no in-between frame
    // where already-visible content flashes to opacity: 0 — the only thing
    // that ever paints hidden is content that was genuinely off-screen.
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const toObserve = [];
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.bottom > 0) {
        el.classList.add('revealed');
      } else {
        toObserve.push(el);
      }
    });

    document.documentElement.classList.add('reveal-enabled');

    if (!toObserve.length) return;

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

    toObserve.forEach((el) => observer.observe(el));

    // Safety net: a section that is never scrolled into view (e.g. an
    // automated full-page capture taken without scrolling) would otherwise
    // stay hidden under .reveal-enabled forever, since it never intersects
    // the viewport. Force everything visible shortly after load so no
    // capture — or slow/interrupted visit — shows a blank section; anyone
    // actively scrolling will already have triggered the natural reveal
    // well before this fires.
    window.setTimeout(() => {
      toObserve.forEach((el) => el.classList.add('revealed'));
      observer.disconnect();
    }, 1200);
  }

  /* --- Init --- */
  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    initDownloadCta();
    renderFooter();
    initStoreBadges();
    initBooks();
    initInquiryForm();
    initCopyEmail();
    initReveal();
  });
})();
