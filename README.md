# Carunel Studio Website

A static multi-page website for **Carunel Studio**, featuring **Beadwell** as its first product.

## Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `index.html` | Home page |
| `/about` | `about.html` | About Carunel Studio |
| `/products` | `products.html` | Products overview |
| `/beadwell` | `beadwell/index.html` | Beadwell product page |
| `/beadwell/privacy` | `beadwell/privacy.html` | Beadwell Privacy Policy |
| `/beadwell/terms` | `beadwell/terms.html` | Beadwell Terms of Use |
| `/contact` | `contact.html` | Contact page |

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
3. Add a product card to `products.html`
4. Update nav links in `js/main.js` if needed

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
├── about.html              # About
├── products.html           # Products
├── contact.html            # Contact
├── beadwell/
│   ├── index.html          # Beadwell product page
│   ├── privacy.html        # Privacy Policy
│   └── terms.html          # Terms of Use
├── css/
│   └── styles.css          # All styles
├── js/
│   └── main.js             # Shared components & scripts
├── assets/
│   └── images/             # Product screenshots & icons
└── README.md
```

## Tech

- Vanilla HTML, CSS, JavaScript
- No build tools or dependencies
- Google Fonts (DM Sans + DM Serif Display)
- Shared header/footer via JS injection
- Scroll-reveal animations via IntersectionObserver
- Responsive: desktop, tablet, mobile
