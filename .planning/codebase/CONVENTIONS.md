# Coding Conventions

**Analysis Date:** 2026-04-16

## Naming Patterns

**Files:**
- SCSS/CSS: Lowercase with underscore prefix for partials (e.g., `_landing.scss`, `_gallery.scss`, `_base.scss`)
- JavaScript: Lowercase with hyphens (e.g., `landing-effects.js`, `notes-password.js`, `lightbox.js`)
- HTML layouts: Lowercase with hyphens (e.g., `default.html`, `no-header.html`, `gallery.html`)
- Markdown pages: Lowercase with hyphens (e.g., `notes-password.md`, `about.md`)

**CSS Classes:**
- BEM-inspired with kebab-case: `.gallery-item`, `.gallery-thumbnail`, `.lightbox-close`
- Component-scoped prefixes: `.landing-page`, `.landing-logo`, `.landing-main-links-container`, `.landing-link-about`
- State classes: `.show`, `.highlight`, `.loaded`, `.lazy-image`
- Suffix pattern for modifiers: `.lightbox-prev`, `.lightbox-next`, `.lightbox-content`

**JavaScript Functions:**
- camelCase: `showImage()`, `closeLightbox()`, `hideTooltip()`, `showTooltip()`
- Private/internal IIFE pattern for encapsulation (see `lightbox.js`, `notes-password.js`)

**Variables (SCSS):**
- camelCase for local/component variables: `linkCenterX`, `deltaX`, `rotationSpeed`, `baseSpeed`
- kebab-case for theme variables: `$base-font-family`, `$body-font-family`, `$brand-color`, `$text-color`
- UPPERCASE with hyphens for semantic colors: `$spotify-color`, `$instagram-color`, `$github-color`

**HTML/Liquid:**
- IDs: kebab-case (e.g., `id="lightbox"`, `id="password-form"`, `id="construction-tooltip"`)
- Data attributes: kebab-case (e.g., `data-full`, `data-description`, `data-modified`, `data-src`)

## Code Style

**Formatting:**
- No linting tool configured (no `.eslintrc`, `.rubocop.yml`, or `.prettier.rc`)
- SCSS: 2-space indentation observed in mixins and nested rules
- JavaScript: 2-space indentation
- HTML: 2-space indentation in templates

**SCSS-specific:**
- Import pattern: Single entry point `assets/css/main.scss` imports from `_sass/` directory via `@import "-sections-dir"`
- Nested selectors used for component organization (e.g., `.landing-page .footer`, `.gallery-thumbnail.lazy-image`)
- Media queries nested within component definitions
- SCSS variables declared at top of `main.scss` for theme values

**JavaScript-specific:**
- Strict IIFE pattern for module encapsulation: `(function() { ... })()`
- No external build tool or bundler (plain vanilla JS)
- Event-driven architecture with `addEventListener` pattern
- DOM query pattern: `document.querySelector()`, `document.querySelectorAll()`

## Import Organization

**SCSS:**
```scss
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600;700&display=swap');
// External imports first

$variables: declarations;
// Theme variables

@import "-sections-dir";
// Local partials last
```

**HTML/Liquid:**
```html
{% include head.html %}
<\!-- Global includes -->

{% include footer.html %}
<\!-- Layout-specific includes -->

<script src="/assets/js/landing-effects.js"></script>
<\!-- Scripts last -->
```

**JavaScript:**
- No ES6 imports (no module system)
- All code runs in global scope via IIFE wrapping
- Dependencies managed by script tag order in HTML

## Error Handling

**Pattern:**
- User-facing validation: Session storage checks (e.g., `notesAuthenticated` flag)
- Error messages displayed via DOM manipulation (e.g., `#error-message` visibility toggle)
- Silent timeouts for temporary error display (3-second auto-hide in `notes-password.js`)

**Example from `notes-password.js`:**
```javascript
if (enteredPassword === correctPassword) {
  sessionStorage.setItem('notesAuthenticated', 'true');
  window.location.href = '/notes';
} else {
  errorMessage.textContent = 'Incorrect password. Please try again.';
  errorMessage.style.display = 'block';
  setTimeout(function() {
    errorMessage.style.display = 'none';
  }, 3000);
}
```

## Logging

**Framework:** No logging framework
**Approach:** No application logging observed. Code relies on browser console for debugging (implicit).

## Comments

**When to Comment:**
- Section headers: `// Landing page interactive effects`, `// Lightbox functionality`
- Algorithm explanation: Fisher-Yates shuffle commented but disabled
- Configuration notes: `// Magnetic effect radius (in pixels)`
- TODO/disabled code: Alternative implementations shown but commented out (e.g., random shuffle in `gallery.html`)

**Pattern Observed:**
- Block comments for major sections
- Inline comments for magic numbers and calculations
- No JSDoc/TSDoc usage (vanilla JS, no type system)

## Function Design

**Size:**
- Tight, focused functions (50-100 lines typical)
- Single responsibility: `showImage()`, `closeLightbox()`, `hideTooltip()`
- Pure utility functions when calculating offsets/distances

**Parameters:**
- Minimal parameters; rely on DOM context and closure
- Event handlers receive event object: `showTooltip(e)`, `closeLightbox(e)`

**Return Values:**
- Functions are mostly void (side-effect based)
- Setter pattern used for DOM state management
- Layout calculations return numeric values for positioning

## Module Design

**Exports:**
- No explicit exports (vanilla JS with IIFE)
- Self-executing functions that attach listeners to DOM elements
- Implicit public APIs through event listeners

**Barrel Files:**
- Not applicable (no module system)

**Script Organization:**
- Separate files per feature: `landing-effects.js`, `lightbox.js`, `notes-password.js`
- Each file is self-contained IIFE
- HTML template explicitly loads scripts in dependency order

---

*Convention analysis: 2026-04-16*
