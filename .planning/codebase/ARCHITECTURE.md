# Architecture

**Analysis Date:** 2026-04-16

## Pattern Overview

**Overall:** Jekyll Static Site Generator with progressive enhancement

**Key Characteristics:**
- Template-driven content generation
- Client-side JavaScript enhancements for interactivity
- Modular Sass styling with component-scoped partials
- Session-based client authentication for protected pages
- Lazy-loaded media with Intersection Observer API

## Layers

**Template/Layout Layer:**
- Purpose: Define page structure and rendering templates
- Location: `_layouts/` and `_includes/`
- Contains: HTML templates, component partials, reusable UI blocks
- Depends on: Site configuration, Liquid templating engine
- Used by: Page files in `pages/`, `_posts/`, and root files

**Content Layer:**
- Purpose: Store page and post content as Markdown
- Location: `pages/`, `_posts/`, root `.md` files (e.g., `404.md`)
- Contains: Page metadata (YAML front matter) and Markdown content
- Depends on: Layouts via front matter `layout:` directive
- Used by: Template system for rendering

**Static Asset Layer:**
- Purpose: Serve CSS, JavaScript, and image resources
- Location: `assets/css/`, `assets/js/`, `assets/img/`
- Contains: Compiled stylesheets, vanilla JavaScript, images
- Depends on: None (consumed directly by client)
- Used by: All pages via `head.html`, script tags, image references

**Configuration Layer:**
- Purpose: Define site-wide settings and dynamic data
- Location: `_config.yml`, `_data/settings.yml`
- Contains: Build settings, plugins, menu structure, social links, Disqus config
- Depends on: None
- Used by: Template system for global values

**Build/Compile Layer:**
- Purpose: Transform SCSS, manage plugins, paginate content
- Location: Managed by Jekyll (via `_config.yml`)
- Contains: Sass compilation, Jekyll plugins, pagination logic
- Depends on: gem dependencies in `Gemfile`
- Used by: Build process to generate `_site/`

## Data Flow

**Page Rendering Pipeline:**

1. **Content authored** in Markdown (`.md` files in `pages/`, `_posts/`, root)
2. **Front matter parsed** from YAML header (layout directive, title, permalink, etc.)
3. **Layout selected** from `_layouts/` based on front matter
4. **Liquid template processed** with access to global data from `_config.yml` and `_data/settings.yml`
5. **Includes resolved** - partial templates from `_includes/` inserted into layout
6. **Markdown rendered** - content converted to HTML
7. **Sass compiled** - `assets/css/main.scss` compiles to CSS, included via `head.html`
8. **Static site generated** - HTML written to `_site/`
9. **JavaScript enhanced** - client-side scripts in `assets/js/` enhance interactivity on load

**State Management:**

- **Client-side session state:** `sessionStorage` used for authentication (e.g., `notesAuthenticated` flag in `assets/js/notes-password.js`)
- **UI state:** CSS classes toggled by JavaScript (e.g., `.show` on construction tooltip, `.highlight` on footer)
- **Transient state:** No persistent backend state - all state ephemeral in browser

## Key Abstractions

**Layout Inheritance:**

Purpose: Reduce template duplication by nesting layouts
Examples: `default.html` → root wrapper; `home.html` → inherits `default.html` for post listings; `landing.html` → custom full-page layout; `no-header.html` → minimal layout for special pages
Pattern: Each layout defines `layout: parent-layout-name` in front matter; child layouts wrap with `{{ content }}`

**Reusable Components (Includes):**

Purpose: Encapsulate UI fragments used across multiple pages
Examples:
- `header.html` - Navigation and menu
- `footer.html` - Footer with social links
- `featured-post.html` - Post card template
- `post-share.html` - Social sharing buttons
- `related-posts.html` - Suggested content
- `post-date.html` - Date formatting
- `google-analytics.html` - Tracking script
- `disqus.html` - Comments system

Pattern: Included via Liquid `{% include file.html %}`; receive context from parent template

**Data-Driven Configuration:**

Purpose: Keep site structure in single source of truth
Examples: Menu items, social links, pagination text, Disqus settings
Location: `_data/settings.yml`
Pattern: Accessed via `site.data.settings.menu`, `site.data.settings.social`, etc.

**Styled Page Sections:**

Purpose: Isolate styles for specific page layouts
Examples:
- `_landing.scss` - Landing page magnetic link effects, logo rotation
- `_gallery.scss` - Image grid, lightbox modal, lazy loading
- `_notes-password.scss` - Password form styling
- `_about.scss` - About page layout
- `_post.scss` - Post content styling

Pattern: Each section file imported into `main.scss`; scoped to page-specific classes

## Entry Points

**Landing Page (`landing.html`):**
- Location: `/`
- Triggers: Direct visit to domain root
- Responsibilities: Hero UI with logo, navigation links, footer with social icons; handles link magnetic effects, logo rotation, under-construction tooltip via `landing-effects.js`

**Blog Index (`home.html`):**
- Location: `/`
- Triggers: Post listings paginated via `jekyll-paginate`
- Responsibilities: Display 5 posts per page; includes pagination controls; renders featured post cards

**Post Page (`post.html`):**
- Location: `/:title` (per `_config.yml` permalink)
- Triggers: Individual post URL
- Responsibilities: Display post title, featured image, content, sharing buttons, related posts, optional Disqus comments

**Protected Notes Page:**
- Location: `/notes-password` → `/notes` (after auth)
- Triggers: User navigation to notes
- Responsibilities: Password form at `/notes-password`; validates against hardcoded password; stores `notesAuthenticated` in `sessionStorage`; redirects authenticated users to `/notes`

**Gallery Page:**
- Location: `/photos`
- Triggers: User navigation to photos
- Responsibilities: Scan `assets/img/gallery/` for images; render responsive grid; include lightbox modal; lazy-load images with Intersection Observer; sort by modification time

**Standard Pages:**
- Location: `/about`, `/contact`, etc.
- Triggers: Permalink from page front matter or menu link
- Responsibilities: Display page content via `page.html` or `no-header.html` layout

## Error Handling

**Strategy:** Graceful degradation; no centralized error handling

**Patterns:**
- **Missing images:** Gallery and featured posts use fallback patterns (conditional `{% if %}` checks)
- **JavaScript failures:** Non-blocking - if `landing-effects.js` fails, page still renders (graceful degradation)
- **Missing data:** Liquid template conditionals handle missing values (e.g., `{% if page.image %}`)
- **Authentication errors:** Password validation shows inline error message; clears after 3 seconds

## Cross-Cutting Concerns

**Logging:** None - static site with no server-side logging

**Validation:**
- Client-side only via JavaScript (e.g., password form validation in `notes-password.js`)
- No form submission to server - validation triggers navigation via `window.location.href`

**Authentication:**
- Client-side session flag: `sessionStorage.setItem('notesAuthenticated', 'true')`
- Hardcoded password in JavaScript (security note: front-end only, not secure for sensitive data)
- Redirect enforced by authentication check in `/notes` page front matter

**Performance:**
- Lazy loading images with Intersection Observer (`gallery.html` inline script)
- Asset optimization: external CDN for Font Awesome, Google Fonts, MathJax
- Plugin-based pagination to avoid loading all posts
