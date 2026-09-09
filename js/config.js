/* ============================================
   Carunel — Local Build Configuration
   ============================================
   The site itself is plain static HTML/CSS/JS with no bundler. This file
   is a small, safe-to-commit config object that main.js reads at
   runtime — the value below is what a plain static file server sees.

   FORMSPREE_FORM_ID
   ------------------
   Public Formspree form ID used by the Contact page inquiry form
   (see /contact/). It is a public identifier, not a secret — Formspree
   form IDs are meant to be embedded in client-side code.

   Leave this empty to keep the inquiry form hidden. The Contact page's
   "Email Carunel Directly" option is always shown regardless of this
   setting, so contact is never broken.

   For GitHub Pages deploys, build.js overwrites this file's value from
   the FORMSPREE_FORM_ID environment variable (see
   .github/workflows/pages.yml and README.md) — you do not need to
   hand-edit this file for that path, and the real ID never has to be
   committed here.

   To try the form locally without running the build:
     1. Create a form at https://formspree.io and copy its form ID.
     2. Set FORMSPREE_FORM_ID below to that ID.
   See .env.example and README.md for more detail. */
window.CARUNEL_CONFIG = {
  FORMSPREE_FORM_ID: ''
};
