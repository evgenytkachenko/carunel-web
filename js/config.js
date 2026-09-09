/* ============================================
   Carunel — Local Build Configuration
   ============================================
   This site is plain static HTML/CSS/JS with no bundler and no build
   step (see README.md), so there is no framework-level mechanism to
   inject environment variables at build time. This file is the
   equivalent of that: a small, safe-to-commit config object that
   main.js reads at runtime.

   FORMSPREE_FORM_ID
   ------------------
   Public Formspree form ID used by the Contact page inquiry form
   (see /contact/). It is a public identifier, not a secret — Formspree
   form IDs are meant to be embedded in client-side code.

   Leave this empty to keep the inquiry form hidden. The Contact page's
   "Email Carunel Directly" option is always shown regardless of this
   setting, so contact is never broken.

   To enable the form:
     1. Create a form at https://formspree.io and copy its form ID.
     2. Set FORMSPREE_FORM_ID below to that ID before deploying.
   See .env.example and README.md for more detail. */
window.CARUNEL_CONFIG = {
  FORMSPREE_FORM_ID: ''
};
