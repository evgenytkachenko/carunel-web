# Carunel Website

A static multi-page website for **Carunel LLC** — learning apps (Beadwell, GentleClover, QuizWell), organizational consulting via Hyper-Agile Quality Engineering™, books, and educational media.

## Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `index.html` | Home page |
| `/about` | `about/index.html` | About Carunel |
| `/products` | `products/index.html` | Learning apps overview |
| `/organizations` | `organizations/index.html` | Organizational consulting (Hyper-Agile Quality Engineering™) |
| `/books-media` | `books-media/index.html` | Books, frameworks, and media |
| `/beadwell` | `beadwell/index.html` | Beadwell product page |
| `/beadwell/privacy` | `beadwell/privacy/index.html` | Beadwell Privacy Policy |
| `/beadwell/terms` | `beadwell/terms/index.html` | Beadwell Terms of Use |
| `/gentleclover` | `gentleclover/index.html` | GentleClover product page |
| `/quizwell` | `quizwell/index.html` | QuizWell product page |
| `/contact` | `contact/index.html` | Contact page |
| `/privacy` | `privacy/index.html` | Website privacy policy |

Organizational consulting, the framework, and the book live in full detail on [hyperagiletesting.com](https://hyperagiletesting.com/); Carunel's pages summarize and link out rather than duplicate that content.

## Running locally

Any static file server will work. For example:

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Editing content

### Copy and text
All page content is in the HTML files. Edit the text directly — no build step required.

### Images and screenshots
Place images in `assets/images/`. Update `src` attributes in the HTML to reference new files.

### Colors and typography
All design tokens (colors, spacing, typography, radii) are CSS custom properties defined at the top of `css/styles.css` in the `:root` block.

### Adding a new product
1. Create a new directory (e.g., `newproduct/`)
2. Add `index.html` (and any legal pages) following the Beadwell page as a template
3. Add a product card to `products/index.html`
4. Add the app to `STORE_LINKS` in `js/main.js` and to the footer's Learning Apps group

### Header and footer
The header and footer are shared components rendered by `js/main.js`. Edit the `renderHeader()` and `renderFooter()` functions to change navigation links or footer content.

### Contact form (Formspree)
The Contact page's inquiry form is powered by [Formspree](https://formspree.io) and only renders when a form ID is configured — see `.env.example` for the `FORMSPREE_FORM_ID` variable.

If `FORMSPREE_FORM_ID` is unset, the form simply doesn't render: the Contact page shows a "Contact Carunel Directly" heading and the direct-email option instead, and never mentions a form that isn't there. The "Email Carunel Directly" option is always shown regardless of this setting, so contact is never broken.

**Local editing without a build.** The site's HTML/CSS/JS still need no build step at all for everyday editing — a plain static file server works. To try the form locally, copy your form ID directly into `js/config.js`:
```js
window.CARUNEL_CONFIG = { FORMSPREE_FORM_ID: 'your-form-id' };
```

**GitHub Pages deploys** use `build.js` (via `npm run build`) to inject `FORMSPREE_FORM_ID` into `js/config.js` at deploy time, so a real form ID never has to be hand-edited or committed. To configure it:

1. Open **Settings > Secrets and variables > Actions**.
2. Select the **Variables** tab.
3. Create a variable named `FORMSPREE_FORM_ID`.
4. Set its value to the Formspree form ID only, not the full URL (e.g. `mrpgrenq`, not `https://formspree.io/f/mrpgrenq`).
5. Run the GitHub Pages deployment again (push to `main`, or re-run the workflow from the Actions tab).

The Formspree ID is not confidential — it's publicly visible in the generated browser code by design — but it's still set as a repository **variable** (`vars.FORMSPREE_FORM_ID`), not a secret, since GitHub secrets are deliberately unavailable to read back out of a workflow run.

For local verification, build once with the ID and once without:
```bash
FORMSPREE_FORM_ID=your-form-id npm run build   # configured build
npm run build                                   # unconfigured build
```
Each run writes to `dist/`; serve that directory with any static file server to check the result (see "Running locally" above, pointed at `dist/` instead of the repo root).

## Deploying to GitHub Pages

### Option 1: GitHub Actions (current — required for the Formspree form)

`.github/workflows/pages.yml` builds the site with `npm run build` (injecting `FORMSPREE_FORM_ID` from the repository variable of the same name — see "Contact form (Formspree)" above) and deploys the result with `actions/deploy-pages`.

1. Push this repository to GitHub.
2. Set the `FORMSPREE_FORM_ID` repository variable (see above) — optional; the site deploys and works without it, just with the inquiry form hidden.
3. Go to **Settings > Pages**.
4. Under "Source", select **GitHub Actions**.
5. Push to `main` (or re-run the workflow from the **Actions** tab) to trigger a deploy.

The site will be available at `https://<username>.github.io/<repo-name>/`.

### Option 2: Deploy from `main` branch root (no build, no Formspree form)

If you don't need the build step, the site still works served as-is:

1. Push this repository to GitHub.
2. Go to **Settings > Pages**.
3. Under "Source", select **Deploy from a branch**.
4. Choose `main` branch, `/ (root)` folder.
5. Click Save.

This serves the repository's checked-in `js/config.js` directly, so `FORMSPREE_FORM_ID` stays whatever is committed there (empty by default — the inquiry form stays hidden until you hand-edit that file, since there's no build step to inject a value).

### Custom domain

1. Follow either option above.
2. In **Settings > Pages**, add your custom domain under "Custom domain".
3. Add a `CNAME` file to the repo root containing your domain (e.g., `carunel.com`).
4. Configure DNS with your domain registrar:
   - For apex domain: A records pointing to GitHub Pages IPs
   - For subdomain: CNAME record pointing to `<username>.github.io`

### Note on paths
The site uses relative paths (`css/styles.css`, `../js/main.js`) so it works correctly whether served from a root domain or a subdirectory.

## Structure

```
├── index.html              # Home
├── about/index.html        # About Carunel
├── products/index.html     # Learning apps
├── organizations/index.html # For Organizations (Hyper-Agile Quality Engineering™)
├── books-media/index.html  # Books & Media
├── contact/index.html      # Contact (includes the Formspree inquiry form)
├── privacy/index.html      # Website privacy policy
├── beadwell/, gentleclover/, quizwell/
│   ├── index.html          # Product page
│   ├── privacy/index.html  # Privacy Policy
│   └── terms/index.html    # Terms of Use
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── main.js              # Shared components, site-wide config & scripts
│   └── config.js            # Local runtime config (Formspree form ID)
├── assets/
│   └── images/             # Product screenshots & icons
├── sitemap.xml
├── robots.txt
├── .env.example
├── build.js                # Build step: injects FORMSPREE_FORM_ID (see above)
├── package.json
├── .github/workflows/pages.yml  # GitHub Pages deploy (runs build.js)
└── README.md
```

## Tech

- Vanilla HTML, CSS, JavaScript — no framework, no bundler
- One small Node build script (`build.js`, no dependencies) used only by the GitHub Pages workflow to inject the public Formspree form ID; not required for local editing
- Google Fonts (DM Sans + DM Serif Display)
- Shared header/footer via JS injection
- Scroll-reveal animations via IntersectionObserver, progressive enhancement (content is visible by default; see `.reveal` / `.reveal-enabled` in `css/styles.css` and `initReveal()` in `js/main.js`)
- Responsive: desktop, tablet, mobile
