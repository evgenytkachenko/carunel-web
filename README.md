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

## Deploying to GitHub Pages

### Option 1: Deploy from `main` branch root

1. Push this repository to GitHub
2. Go to **Settings > Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose `main` branch, `/ (root)` folder
5. Click Save

The site will be available at `https://<username>.github.io/<repo-name>/`.

### Option 2: Custom domain

1. Follow the steps above
2. In **Settings > Pages**, add your custom domain under "Custom domain"
3. Add a `CNAME` file to the repo root containing your domain (e.g., `carunel.com`)
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
├── contact/index.html      # Contact
├── beadwell/, gentleclover/, quizwell/
│   ├── index.html          # Product page
│   ├── privacy/index.html  # Privacy Policy
│   └── terms/index.html    # Terms of Use
├── css/
│   └── styles.css          # All styles
├── js/
│   └── main.js             # Shared components, site-wide config & scripts
├── assets/
│   └── images/             # Product screenshots & icons
├── sitemap.xml
├── robots.txt
└── README.md
```

## Tech

- Vanilla HTML, CSS, JavaScript
- No build tools or dependencies
- Google Fonts (DM Sans + DM Serif Display)
- Shared header/footer via JS injection
- Scroll-reveal animations via IntersectionObserver
- Responsive: desktop, tablet, mobile
