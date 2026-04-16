# Codebase Structure

**Analysis Date:** 2026-04-16

## Directory Layout

```
nothingcouldnever2/
├── _config.yml               # Jekyll build configuration
├── _data/                    # Dynamic data files
│   └── settings.yml          # Site-wide settings (menu, social links, pagination text)
├── _includes/                # Reusable template partials
│   ├── head.html             # Meta tags, stylesheets, analytics
│   ├── header.html           # Navigation and menu
│   ├── footer.html           # Footer with social icons
│   ├── featured-post.html    # Post card component
│   ├── post-share.html       # Social sharing buttons
│   ├── post-date.html        # Date formatting
│   ├── related-posts.html    # Related posts widget
│   ├── disqus.html           # Comments integration
│   └── google-analytics.html # Google Analytics tracking
├── _layouts/                 # Page layout templates
│   ├── default.html          # Base layout (wrapper with header/footer)
│   ├── home.html             # Blog index with pagination
│   ├── post.html             # Individual post page
│   ├── landing.html          # Landing page (custom, no includes)
│   ├── gallery.html          # Image gallery with lightbox
│   ├── page.html             # Generic page layout
│   ├── no-header.html        # Page without header navigation
│   └── category.html         # Category archive (unused)
├── _posts/                   # Blog post Markdown files
│   ├── 2016-04-04-about-the-author.md
│   ├── 2016-05-05-learning-resources.md
│   ├── 2016-09-09-text-formatting.md
│   ├── 2016-10-10-getting-started.md
│   └── 2017-01-01-welcome-to-millennial.md
├── _sass/                    # SCSS stylesheets (compiled to main.css)
│   ├── main.scss             # Entry point (imports all partials)
│   ├── _base.scss            # Base typography and defaults
│   ├── _default.scss         # Default layout styles
│   ├── _header.scss          # Header navigation styles
│   ├── _footer.scss          # Footer styles
│   ├── _home.scss            # Blog index styles
│   ├── _post.scss            # Post page styles
│   ├── _page.scss            # Generic page styles
│   ├── _about.scss           # About page styles
│   ├── _landing.scss         # Landing page styles (logo, links, effects)
│   ├── _gallery.scss         # Gallery grid and lightbox styles
│   ├── _notes.scss           # Notes page styles (minimal)
│   ├── _notes-password.scss  # Password form styles
│   ├── _code.scss            # Code block syntax highlighting
│   ├── _social-icons.scss    # Social link icon styles
│   └── _-sections-dir.scss   # Directory listing helper
├── pages/                    # Standalone page Markdown files
│   ├── about.md              # About page
│   ├── contact.md            # Contact page
│   ├── notes.md              # Protected notes (requires password)
│   ├── notes-password.md     # Password gate for notes
│   ├── photos.md             # Gallery page
│   ├── sets.md               # DJ sets or performance info
│   ├── facts.md              # Interesting facts (unused)
│   ├── resources.md          # Learning resources
│   ├── sample-posts.md       # Sample posts list
│   └── documentation.md      # Documentation (unused)
├── assets/                   # Static assets
│   ├── css/
│   │   ├── main.scss         # Main stylesheet entry (processed by Jekyll)
│   │   └── syntax.css        # Code syntax highlighting
│   ├── js/
│   │   ├── landing-effects.js      # Landing page interactivity (magnetic links, logo rotation, tooltip)
│   │   ├── lightbox.js             # Image lightbox modal
│   │   └── notes-password.js       # Password form handler
│   └── img/
│       ├── gallery/          # Gallery images (scanned by gallery.html)
│       └── pages/            # Page-specific images (about, landing, etc.)
├── .github/                  # GitHub workflows (CI/CD)
│   └── workflows/
├── .planning/                # GSD documentation
│   └── codebase/             # Codebase analysis documents
├── _site/                    # Generated static site (do not commit)
├── node_modules/             # npm dependencies (do not commit)
├── .jekyll-cache/            # Jekyll cache (do not commit)
├── Gemfile                   # Ruby gem dependencies
├── Gemfile.lock              # Locked Ruby versions
├── index.html                # Homepage redirect to /
├── 404.md                    # 404 error page
├── _config.yml               # Jekyll configuration
├── CNAME                     # Domain name (nothingcouldnever.com)
└── README (implied)
```

## Directory Purposes

**`_layouts/`:**
- Purpose: Define page structure and rendering templates
- Contains: HTML templates with Liquid logic for template inheritance
- Key files: `default.html` (base wrapper), `home.html` (blog index), `landing.html` (hero page)
- How used: Referenced via `layout:` directive in Markdown front matter

**`_includes/`:**
- Purpose: Store reusable template components
- Contains: Partial HTML snippets for headers, footers, post cards, comments
- Key files: `header.html` (navigation), `footer.html` (social links), `featured-post.html` (post card)
- How used: Inserted via `{% include file.html %}` Liquid tag

**`_posts/`:**
- Purpose: Store blog post content
- Contains: Markdown files with YAML front matter (title, date, layout, optional image)
- Files: Named `YYYY-MM-DD-slug.md` for automatic date parsing
- How used: Paginated on blog index, rendered as individual pages via `post.html` layout

**`pages/`:**
- Purpose: Store standalone pages (non-blog content)
- Contains: Markdown files for about, contact, photos, notes, sets, etc.
- Key files: `about.md` (profile), `photos.md` (gallery), `notes-password.md` (auth gate)
- How used: Rendered via specified layout (usually `page.html` or `no-header.html`)

**`_sass/`:**
- Purpose: Define all styles (compiled to single `main.css`)
- Contains: Modular SCSS files scoped to page sections or components
- Structure: `main.scss` imports all `_*.scss` files; each partial handles one area
- Build: Jekyll compiles `assets/css/main.scss` automatically

**`assets/css/`:**
- Purpose: Store compiled stylesheets and syntax highlighting
- Key files: `main.scss` (compiled to `main.css`), `syntax.css` (code blocks)
- How used: Linked in `head.html`

**`assets/js/`:**
- Purpose: Store client-side JavaScript enhancements
- Key files:
  - `landing-effects.js` - Landing page magnetic links, logo rotation, tooltip
  - `lightbox.js` - Image modal interactions
  - `notes-password.js` - Authentication form handler
- How used: Loaded via `<script>` tag in respective page templates

**`assets/img/`:**
- Purpose: Store images
- Subdirectories:
  - `gallery/` - User photos (scanned and displayed by `gallery.html`)
  - `pages/` - Static images for pages (about photo, landing logo)

**`_data/`:**
- Purpose: Store structured data in YAML
- Key files: `settings.yml` (menu, social links, pagination text, Disqus config)
- How used: Accessed in templates via `site.data.settings.*`

**`.github/workflows/`:**
- Purpose: CI/CD automation
- Contains: GitHub Actions configuration for deployment and testing
- How used: Triggered by git events

## Key File Locations

**Entry Points:**

- `_layouts/landing.html` - Landing page structure (custom, no standard inheritance)
- `_layouts/home.html` - Blog index with pagination
- `_layouts/page.html` - Generic page wrapper
- `_layouts/post.html` - Individual post page

**Configuration:**

- `_config.yml` - Jekyll build settings, plugin configuration, site URL, title, pagination
- `_data/settings.yml` - Menu items, social links, pagination labels, Disqus settings
- `Gemfile` - Ruby gem dependencies (jekyll, jekyll-paginate, jekyll-sitemap, jekyll-feed, jekyll-seo-tag)

**Core Logic:**

- `_includes/header.html` - Navigation rendering (loops through `site.data.settings.menu` and social links)
- `_layouts/gallery.html` - Gallery implementation (scans `assets/img/gallery/`, sorts by modification time, includes lightbox)
- `assets/js/landing-effects.js` - Interactive effects (magnetic link attraction, logo rotation)
- `assets/js/notes-password.js` - Authentication (validates password, sets `sessionStorage` flag, redirects)

**Testing:**

- No dedicated test directory - static site generation is deterministic
- Post metadata validated by YAML parsing
- Manual testing of rendering and interactivity

## Naming Conventions

**Files:**

- **Layouts:** `kebab-case.html` (e.g., `default.html`, `no-header.html`, `featured-post.html`)
- **Includes:** `kebab-case.html` (e.g., `post-share.html`, `related-posts.html`)
- **Posts:** `YYYY-MM-DD-slug.md` (e.g., `2017-01-01-welcome-to-millennial.md`)
- **Pages:** `kebab-case.md` (e.g., `notes-password.md`, `sample-posts.md`)
- **SCSS:** `_kebab-case.scss` with leading underscore (e.g., `_landing.scss`, `_gallery.scss`)
- **JavaScript:** `kebab-case.js` (e.g., `landing-effects.js`, `notes-password.js`)

**Directories:**

- **Jekyll standard:** Prefixed with underscore: `_layouts`, `_includes`, `_posts`, `_sass`, `_data`
- **Assets:** Grouped by type: `assets/css/`, `assets/js/`, `assets/img/`
- **Nested images:** `assets/img/{section}/` (e.g., `assets/img/gallery/`, `assets/img/pages/`)

**CSS Classes:**

- **Layout-specific:** `.landing-page`, `.landing-main-links-container`, `.gallery-grid`, `.notes-page-outer`
- **Component classes:** `.featured-post`, `.lightbox`, `.password-form`, `.construction-tooltip`
- **State classes:** `.show` (tooltip visible), `.highlight` (footer highlight), `.loaded` (lazy image loaded)
- **Utility classes:** `.lazy-image` (lazy loading marker), `.menu-link` (nav link)

## Where to Add New Code

**New Blog Post:**
- File: Create in `_posts/` as `YYYY-MM-DD-slug.md`
- Template: Use `layout: post` in front matter
- Example structure:
  ```yaml
  ---
  layout: post
  title: Post Title
  image: posts/image.jpg  # Optional
  ---
  ```

**New Page:**
- File: Create in `pages/` as `page-name.md`
- Template: Usually `layout: page` or `layout: no-header` in front matter
- Permalink: Specify with `permalink: /page-slug` or infer from filename
- Example:
  ```yaml
  ---
  layout: page
  title: Page Title
  permalink: /page-slug
  ---
  ```

**New Component/Layout:**
- Reusable snippet: Create in `_includes/` as `component-name.html`
- Page layout: Create in `_layouts/` as `layout-name.html`
- Usage: Include in templates via `{% include component-name.html %}` or specify `layout: layout-name`

**New Styling:**
- Component-specific: Create `_sass/_component-name.scss`
- Add import: Import in `assets/css/main.scss` via `@import "component-name"`
- Page-specific: If styling page section, create `_sass/_page-section.scss` (e.g., `_landing.scss`, `_gallery.scss`)

**New JavaScript:**
- Page-specific logic: Create `assets/js/feature-name.js`
- Load: Include via `<script src="{{ site.baseurl }}/assets/js/feature-name.js"></script>` in template or layout
- Pattern: Use IIFE or DOMContentLoaded event to avoid conflicts

**New Data/Configuration:**
- Site-wide settings: Add to `_data/settings.yml` and access via `site.data.settings.*`
- Build config: Modify `_config.yml` (plugins, permalinks, markdown settings)

## Special Directories

**`_site/`:**
- Purpose: Generated static site output (do not edit or commit)
- Generated: Yes - Jekyll builds here
- Committed: No - add to `.gitignore`

**`node_modules/`:**
- Purpose: npm package dependencies
- Generated: Yes - `npm install`
- Committed: No - add to `.gitignore`

**`.jekyll-cache/`:**
- Purpose: Jekyll build cache for faster rebuilds
- Generated: Yes - Jekyll manages
- Committed: No - add to `.gitignore`

**`vendor/`:**
- Purpose: Bundled Ruby gems (from `bundle install --path vendor/bundle`)
- Generated: Yes - Bundler manages
- Committed: No - add to `.gitignore`

**`.github/workflows/`:**
- Purpose: CI/CD pipeline definitions
- Generated: No - user-created
- Committed: Yes - needed for automated deployments
