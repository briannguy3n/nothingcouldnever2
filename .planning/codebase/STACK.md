# Technology Stack

**Analysis Date:** 2026-04-16

## Languages

**Primary:**
- Ruby 3.2.2 - Used for Jekyll static site generation

**Secondary:**
- HTML - Page templates and layouts
- SCSS - Styling via Jekyll sass-converter
- JavaScript (Vanilla) - Client-side interactivity
- YAML - Configuration and data files

## Runtime

**Environment:**
- Ruby 3.2.2 (specified in `.ruby-version`)

**Package Manager:**
- Bundler 2.7.1
- Lockfile: `Gemfile.lock` present

## Frameworks

**Core:**
- Jekyll 4.4.1 - Static site generator
- Millennial 2.0.0 - Jekyll theme (local gemspec at `millennial.gemspec`)

**Theme Plugins:**
- jekyll-feed 0.17.0 - Atom feed generation
- jekyll-paginate 1.1.0 - Post pagination
- jekyll-seo-tag 2.8.0 - SEO meta tag injection
- jekyll-sitemap 1.4.0 - XML sitemap generation

**Build/Dev:**
- jekyll-sass-converter 3.1.0 - SCSS to CSS compilation
- jekyll-watch 2.2.1 - File change detection during dev
- rouge 4.6.0 - Syntax highlighting for code blocks

## Key Dependencies

**Critical:**
- liquid 4.0.4 - Template language used by Jekyll
- kramdown 2.5.1 - Markdown parser (GFM variant)
- kramdown-parser-gfm 1.1.0 - GitHub-flavored markdown support

**Infrastructure:**
- em-websocket 0.5.3 - WebSocket support for live reload
- webrick 1.9.1 - Local development server
- listen 3.9.0 - File system event monitoring
- sass-embedded 1.91.0 - Sass compilation engine
- google-protobuf 4.32.0 - Protocol buffer serialization (dependency of sass-embedded)

**Utilities:**
- i18n 1.14.7 - Internationalization support
- addressable 2.8.7 - URI/URL parsing
- pathutil 0.16.2 - File path utilities
- mercenary 0.4.0 - CLI framework for Jekyll

## Configuration

**Environment:**
- Configuration via `_config.yml` (site title, URL, baseurl, plugins, markdown renderer)
- Data settings via `_data/settings.yml` (menu, social links, analytics IDs)
- Ruby version via `.ruby-version` file

**Build:**
- Build output directory: `_site/` (generated during build)
- Source content: `_posts/`, `pages/`, `_layouts/`, `_includes/`, `_sass/`, `assets/`
- Config file: `_config.yml`
- Theme gemspec: `millennial.gemspec`

## Platform Requirements

**Development:**
- Ruby 3.2.2
- Bundler 2.7.1
- macOS/Linux/Windows (with appropriate gem platform support)

**Production:**
- Static HTML hosting (GitHub Pages compatible)
- Deployment: GitHub Pages (DNS configured via `CNAME` file pointing to www.nothingcouldnever.com)
- CDN integration: External resources via HTTPS (Google Fonts, Font Awesome, MathJax, cdnjs)

## Client-Side Assets

**CSS:**
- Main stylesheet: `assets/css/main.css`
- Syntax highlighting: `assets/css/syntax.css`
- Google Fonts (Roboto, Source Code Pro)
- Font Awesome 6.5.1 (from cdnjs)

**JavaScript:**
- Vanilla JavaScript (no frameworks)
- Custom scripts:
  - `assets/js/landing-effects.js` - Landing page interactive effects (logo rotation, magnetic link effects, tooltip)
  - `assets/js/notes-password.js` - Password protection for notes page (sessionStorage-based)
  - `assets/js/lightbox.js` - Gallery lightbox with keyboard navigation
- External libraries:
  - MathJax 2.7.5 - LaTeX/math rendering

---

*Stack analysis: 2026-04-16*
