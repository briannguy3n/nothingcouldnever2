<!-- GSD:project-start source:PROJECT.md -->
## Project

**n0thing DJ/Producer Linktree**

A linktree-style landing page for DJ/producer **n0thing** at `nothingcouldnever.com`. Visitors land on a chooser splash that routes them to either the n0thing DJ profile (prominent) or the existing personal site (secondary). The DJ profile page is a dark, card-based link hub surfacing releases, sets, recordings, and performance dates — all driven by a YAML data file.

**Core Value:** A visitor hitting the site immediately sees n0thing's DJ identity and can reach the most important content (new music, upcoming shows) in one tap.

### Constraints

- **Tech stack**: Jekyll/GitHub Pages — no server-side code, no databases, no build step beyond Jekyll
- **Data management**: YAML only — no CMS, no admin UI
- **Compatibility**: Must not break existing blog, gallery, notes, about, contact pages during or after build
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- Ruby 3.2.2 - Used for Jekyll static site generation
- HTML - Page templates and layouts
- SCSS - Styling via Jekyll sass-converter
- JavaScript (Vanilla) - Client-side interactivity
- YAML - Configuration and data files
## Runtime
- Ruby 3.2.2 (specified in `.ruby-version`)
- Bundler 2.7.1
- Lockfile: `Gemfile.lock` present
## Frameworks
- Jekyll 4.4.1 - Static site generator
- Millennial 2.0.0 - Jekyll theme (local gemspec at `millennial.gemspec`)
- jekyll-feed 0.17.0 - Atom feed generation
- jekyll-paginate 1.1.0 - Post pagination
- jekyll-seo-tag 2.8.0 - SEO meta tag injection
- jekyll-sitemap 1.4.0 - XML sitemap generation
- jekyll-sass-converter 3.1.0 - SCSS to CSS compilation
- jekyll-watch 2.2.1 - File change detection during dev
- rouge 4.6.0 - Syntax highlighting for code blocks
## Key Dependencies
- liquid 4.0.4 - Template language used by Jekyll
- kramdown 2.5.1 - Markdown parser (GFM variant)
- kramdown-parser-gfm 1.1.0 - GitHub-flavored markdown support
- em-websocket 0.5.3 - WebSocket support for live reload
- webrick 1.9.1 - Local development server
- listen 3.9.0 - File system event monitoring
- sass-embedded 1.91.0 - Sass compilation engine
- google-protobuf 4.32.0 - Protocol buffer serialization (dependency of sass-embedded)
- i18n 1.14.7 - Internationalization support
- addressable 2.8.7 - URI/URL parsing
- pathutil 0.16.2 - File path utilities
- mercenary 0.4.0 - CLI framework for Jekyll
## Configuration
- Configuration via `_config.yml` (site title, URL, baseurl, plugins, markdown renderer)
- Data settings via `_data/settings.yml` (menu, social links, analytics IDs)
- Ruby version via `.ruby-version` file
- Build output directory: `_site/` (generated during build)
- Source content: `_posts/`, `pages/`, `_layouts/`, `_includes/`, `_sass/`, `assets/`
- Config file: `_config.yml`
- Theme gemspec: `millennial.gemspec`
## Platform Requirements
- Ruby 3.2.2
- Bundler 2.7.1
- macOS/Linux/Windows (with appropriate gem platform support)
- Static HTML hosting (GitHub Pages compatible)
- Deployment: GitHub Pages (DNS configured via `CNAME` file pointing to www.nothingcouldnever.com)
- CDN integration: External resources via HTTPS (Google Fonts, Font Awesome, MathJax, cdnjs)
## Client-Side Assets
- Main stylesheet: `assets/css/main.css`
- Syntax highlighting: `assets/css/syntax.css`
- Google Fonts (Roboto, Source Code Pro)
- Font Awesome 6.5.1 (from cdnjs)
- Vanilla JavaScript (no frameworks)
- Custom scripts:
- External libraries:
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- SCSS/CSS: Lowercase with underscore prefix for partials (e.g., `_landing.scss`, `_gallery.scss`, `_base.scss`)
- JavaScript: Lowercase with hyphens (e.g., `landing-effects.js`, `notes-password.js`, `lightbox.js`)
- HTML layouts: Lowercase with hyphens (e.g., `default.html`, `no-header.html`, `gallery.html`)
- Markdown pages: Lowercase with hyphens (e.g., `notes-password.md`, `about.md`)
- BEM-inspired with kebab-case: `.gallery-item`, `.gallery-thumbnail`, `.lightbox-close`
- Component-scoped prefixes: `.landing-page`, `.landing-logo`, `.landing-main-links-container`, `.landing-link-about`
- State classes: `.show`, `.highlight`, `.loaded`, `.lazy-image`
- Suffix pattern for modifiers: `.lightbox-prev`, `.lightbox-next`, `.lightbox-content`
- camelCase: `showImage()`, `closeLightbox()`, `hideTooltip()`, `showTooltip()`
- Private/internal IIFE pattern for encapsulation (see `lightbox.js`, `notes-password.js`)
- camelCase for local/component variables: `linkCenterX`, `deltaX`, `rotationSpeed`, `baseSpeed`
- kebab-case for theme variables: `$base-font-family`, `$body-font-family`, `$brand-color`, `$text-color`
- UPPERCASE with hyphens for semantic colors: `$spotify-color`, `$instagram-color`, `$github-color`
- IDs: kebab-case (e.g., `id="lightbox"`, `id="password-form"`, `id="construction-tooltip"`)
- Data attributes: kebab-case (e.g., `data-full`, `data-description`, `data-modified`, `data-src`)
## Code Style
- No linting tool configured (no `.eslintrc`, `.rubocop.yml`, or `.prettier.rc`)
- SCSS: 2-space indentation observed in mixins and nested rules
- JavaScript: 2-space indentation
- HTML: 2-space indentation in templates
- Import pattern: Single entry point `assets/css/main.scss` imports from `_sass/` directory via `@import "-sections-dir"`
- Nested selectors used for component organization (e.g., `.landing-page .footer`, `.gallery-thumbnail.lazy-image`)
- Media queries nested within component definitions
- SCSS variables declared at top of `main.scss` for theme values
- Strict IIFE pattern for module encapsulation: `(function() { ... })()`
- No external build tool or bundler (plain vanilla JS)
- Event-driven architecture with `addEventListener` pattern
- DOM query pattern: `document.querySelector()`, `document.querySelectorAll()`
## Import Organization
- No ES6 imports (no module system)
- All code runs in global scope via IIFE wrapping
- Dependencies managed by script tag order in HTML
## Error Handling
- User-facing validation: Session storage checks (e.g., `notesAuthenticated` flag)
- Error messages displayed via DOM manipulation (e.g., `#error-message` visibility toggle)
- Silent timeouts for temporary error display (3-second auto-hide in `notes-password.js`)
## Logging
## Comments
- Section headers: `// Landing page interactive effects`, `// Lightbox functionality`
- Algorithm explanation: Fisher-Yates shuffle commented but disabled
- Configuration notes: `// Magnetic effect radius (in pixels)`
- TODO/disabled code: Alternative implementations shown but commented out (e.g., random shuffle in `gallery.html`)
- Block comments for major sections
- Inline comments for magic numbers and calculations
- No JSDoc/TSDoc usage (vanilla JS, no type system)
## Function Design
- Tight, focused functions (50-100 lines typical)
- Single responsibility: `showImage()`, `closeLightbox()`, `hideTooltip()`
- Pure utility functions when calculating offsets/distances
- Minimal parameters; rely on DOM context and closure
- Event handlers receive event object: `showTooltip(e)`, `closeLightbox(e)`
- Functions are mostly void (side-effect based)
- Setter pattern used for DOM state management
- Layout calculations return numeric values for positioning
## Module Design
- No explicit exports (vanilla JS with IIFE)
- Self-executing functions that attach listeners to DOM elements
- Implicit public APIs through event listeners
- Not applicable (no module system)
- Separate files per feature: `landing-effects.js`, `lightbox.js`, `notes-password.js`
- Each file is self-contained IIFE
- HTML template explicitly loads scripts in dependency order
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Template-driven content generation
- Client-side JavaScript enhancements for interactivity
- Modular Sass styling with component-scoped partials
- Session-based client authentication for protected pages
- Lazy-loaded media with Intersection Observer API
## Layers
- Purpose: Define page structure and rendering templates
- Location: `_layouts/` and `_includes/`
- Contains: HTML templates, component partials, reusable UI blocks
- Depends on: Site configuration, Liquid templating engine
- Used by: Page files in `pages/`, `_posts/`, and root files
- Purpose: Store page and post content as Markdown
- Location: `pages/`, `_posts/`, root `.md` files (e.g., `404.md`)
- Contains: Page metadata (YAML front matter) and Markdown content
- Depends on: Layouts via front matter `layout:` directive
- Used by: Template system for rendering
- Purpose: Serve CSS, JavaScript, and image resources
- Location: `assets/css/`, `assets/js/`, `assets/img/`
- Contains: Compiled stylesheets, vanilla JavaScript, images
- Depends on: None (consumed directly by client)
- Used by: All pages via `head.html`, script tags, image references
- Purpose: Define site-wide settings and dynamic data
- Location: `_config.yml`, `_data/settings.yml`
- Contains: Build settings, plugins, menu structure, social links, Disqus config
- Depends on: None
- Used by: Template system for global values
- Purpose: Transform SCSS, manage plugins, paginate content
- Location: Managed by Jekyll (via `_config.yml`)
- Contains: Sass compilation, Jekyll plugins, pagination logic
- Depends on: gem dependencies in `Gemfile`
- Used by: Build process to generate `_site/`
## Data Flow
- **Client-side session state:** `sessionStorage` used for authentication (e.g., `notesAuthenticated` flag in `assets/js/notes-password.js`)
- **UI state:** CSS classes toggled by JavaScript (e.g., `.show` on construction tooltip, `.highlight` on footer)
- **Transient state:** No persistent backend state - all state ephemeral in browser
## Key Abstractions
- `header.html` - Navigation and menu
- `footer.html` - Footer with social links
- `featured-post.html` - Post card template
- `post-share.html` - Social sharing buttons
- `related-posts.html` - Suggested content
- `post-date.html` - Date formatting
- `google-analytics.html` - Tracking script
- `disqus.html` - Comments system
- `_landing.scss` - Landing page magnetic link effects, logo rotation
- `_gallery.scss` - Image grid, lightbox modal, lazy loading
- `_notes-password.scss` - Password form styling
- `_about.scss` - About page layout
- `_post.scss` - Post content styling
## Entry Points
- Location: `/`
- Triggers: Direct visit to domain root
- Responsibilities: Hero UI with logo, navigation links, footer with social icons; handles link magnetic effects, logo rotation, under-construction tooltip via `landing-effects.js`
- Location: `/`
- Triggers: Post listings paginated via `jekyll-paginate`
- Responsibilities: Display 5 posts per page; includes pagination controls; renders featured post cards
- Location: `/:title` (per `_config.yml` permalink)
- Triggers: Individual post URL
- Responsibilities: Display post title, featured image, content, sharing buttons, related posts, optional Disqus comments
- Location: `/notes-password` → `/notes` (after auth)
- Triggers: User navigation to notes
- Responsibilities: Password form at `/notes-password`; validates against hardcoded password; stores `notesAuthenticated` in `sessionStorage`; redirects authenticated users to `/notes`
- Location: `/photos`
- Triggers: User navigation to photos
- Responsibilities: Scan `assets/img/gallery/` for images; render responsive grid; include lightbox modal; lazy-load images with Intersection Observer; sort by modification time
- Location: `/about`, `/contact`, etc.
- Triggers: Permalink from page front matter or menu link
- Responsibilities: Display page content via `page.html` or `no-header.html` layout
## Error Handling
- **Missing images:** Gallery and featured posts use fallback patterns (conditional `{% if %}` checks)
- **JavaScript failures:** Non-blocking - if `landing-effects.js` fails, page still renders (graceful degradation)
- **Missing data:** Liquid template conditionals handle missing values (e.g., `{% if page.image %}`)
- **Authentication errors:** Password validation shows inline error message; clears after 3 seconds
## Cross-Cutting Concerns
- Client-side only via JavaScript (e.g., password form validation in `notes-password.js`)
- No form submission to server - validation triggers navigation via `window.location.href`
- Client-side session flag: `sessionStorage.setItem('notesAuthenticated', 'true')`
- Hardcoded password in JavaScript (security note: front-end only, not secure for sensitive data)
- Redirect enforced by authentication check in `/notes` page front matter
- Lazy loading images with Intersection Observer (`gallery.html` inline script)
- Asset optimization: external CDN for Font Awesome, Google Fonts, MathJax
- Plugin-based pagination to avoid loading all posts
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
