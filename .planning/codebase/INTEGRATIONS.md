# External Integrations

**Analysis Date:** 2026-04-16

## APIs & External Services

**Social Sharing:**
- Twitter - Tweet intent links for post sharing
  - Integration: `_includes/post-share.html`
  - URL: `https://twitter.com/intent/tweet`
  
- Facebook - Share dialog for post sharing
  - Integration: `_includes/post-share.html`
  - URL: `https://www.facebook.com/sharer/sharer.php`

**Analytics:**
- Google Analytics (Universal Analytics - GA3)
  - SDK: Inline script injected via `_includes/google-analytics.html`
  - Tracking ID: `{{ site.data.settings.google-ID }}`
  - Current ID: `UA-112060364-2` (in `_data/settings.yml`)

**Comments:**
- Disqus - Comment system for posts
  - SDK: Inline embed script via `_includes/disqus.html`
  - Shortname: `{{ site.data.settings.disqus.disqus_shortname }}`
  - Current shortname: `millennial-3` (in `_data/settings.yml`)
  - Status: Disabled (comments: false in settings)

## Data Storage

**Databases:**
- Not applicable (static site - no backend database)

**File Storage:**
- Local filesystem only
- Gallery images: `assets/img/gallery/`
- Logo/branding: `assets/img/pages/`
- Generated site: `_site/` (via Jekyll build)

**Caching:**
- Browser caching via standard HTTP headers
- No server-side caching (static files)
- Jekyll cache directory: `.jekyll-cache/` (build artifacts)

## Content Delivery

**CDN/External Resources:**
- Google Fonts - Font delivery
  - URL: `https://fonts.googleapis.com/css?family=Roboto|Source+Code+Pro`
  
- Font Awesome 6.5.1 - Icon library
  - CSS: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`
  - Shims: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/v4-shims.min.css`
  
- MathJax 2.7.5 - Math rendering
  - URL: `https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js`
  - Config: `TeX-MML-AM_CHTML`

## Authentication & Identity

**Auth Provider:**
- None (public static site)
- Local session storage only: `sessionStorage` used for notes password protection in `assets/js/notes-password.js`

## Monitoring & Observability

**Error Tracking:**
- Not configured (static site)

**Logs:**
- Standard HTTP server logs (GitHub Pages or deployment platform)

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (inferred from CNAME and Git structure)
- Domain: www.nothingcouldnever.com (via `CNAME` file)

**CI Pipeline:**
- None configured (.github/workflows/ directory exists but is empty)
- Manual builds likely via `bundle exec jekyll build` or local development

**Build Process:**
- Jekyll compiles source to static HTML in `_site/`
- Assets are processed and copied during build
- SCSS is compiled to CSS via jekyll-sass-converter

## Environment Configuration

**Required env vars:**
- None - fully static site
- All configuration via YAML files and gemspec

**Secrets location:**
- Google Analytics ID: `_data/settings.yml` (site.data.settings.google-ID)
- Disqus shortname: `_data/settings.yml` (site.data.settings.disqus.disqus_shortname)
- Password for notes: `assets/js/notes-password.js` (hardcoded as 'lancer')

**Note:** The notes password is stored in client-side JavaScript and should be considered a UI/UX feature only, not security-critical. Use with caution for sensitive content.

## Webhooks & Callbacks

**Incoming:**
- None (static site)

**Outgoing:**
- Post share links trigger browser redirects:
  - Twitter share intent opens twitter.com
  - Facebook share dialog opens facebook.com
- Disqus embed loads comments from disqus.com (if enabled)

## Social Media Links

**Current integrations** (in `_data/settings.yml`):
- Spotify: `https://open.spotify.com/artist/2jOSPjlx9uGVPAdDQ402VY`
- Soundcloud: `https://soundcloud.com/nothingcouldnever`
- Bandcamp: `https://nothingcouldnever.bandcamp.com`
- Instagram: `https://instagram.com/nothingcouldnever`

**Display:** Via Font Awesome icons in header and footer (rendered by `_includes/header.html`)

## Feed & Syndication

**Atom Feed:**
- Generated via jekyll-feed plugin
- Configured via jekyll-feed plugin
- Meta tag injected: `{% feed_meta %}`
- Optional RSS 2.0: Commented out in `_config.yml`

**SEO:**
- jekyll-seo-tag plugin injects meta tags (title, description, canonical URLs, OpenGraph)
- XML sitemap: Generated via jekyll-sitemap plugin

---

*Integration audit: 2026-04-16*
