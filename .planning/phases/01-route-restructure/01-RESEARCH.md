# Phase 1: Route Restructure — Research

**Researched:** 2026-04-16
**Domain:** Jekyll static site routing and page permalink mechanics
**Confidence:** HIGH

---

## Summary

This phase moves the existing landing page from `/` to `/personal`, while leaving all other pages untouched. The task is purely structural: replace the root `index.html` (currently `layout: landing`) with a new page at `/personal`, then leave `/` empty so Jekyll serves a 404 by default.

The Jekyll codebase uses explicit `permalink:` front matter on every page in `pages/`. All asset paths in `landing.html` are already absolute (`/assets/...`). JavaScript interactions use class selectors, not URLs. The move is low-risk.

One critical constraint: `jekyll-paginate` requires `index.html` at the root to power the blog pagination. The current root `index.html` uses `layout: landing` — there is no separate blog index file. Phase 2 will own the new root, but this phase must not strand the blog. The plan must explicitly address whether the blog index is needed during this phase or whether `/` simply goes to 404 until Phase 2.

**Primary recommendation:** Create `pages/personal.md` with `permalink: /personal` and `layout: landing`. Delete (or repurpose) the root `index.html`. The blog has no separate index right now — Phase 2 will replace root content entirely, so a temporary 404 at `/` between phases is acceptable.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PRSV-01 | Existing landing page moves to `/personal` and remains fully functional | Create `pages/personal.md` with `permalink: /personal`, `layout: landing`; verify all asset paths are absolute |
| PRSV-02 | Blog, gallery, notes, about, and contact pages remain accessible at their current URLs | These pages all use explicit `permalink:` front matter — they are unaffected by changes to `index.html` |

</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Page routing / permalink resolution | Jekyll build (static) | — | Jekyll resolves `permalink:` in front matter at build time; no server routing involved |
| Asset path resolution | Browser / CDN | — | All paths in `landing.html` are already root-relative (`/assets/...`); resolved by GitHub Pages static hosting |
| JavaScript interactions | Browser / Client | — | `landing-effects.js` uses CSS class selectors; no URL dependency |
| 404 at root during gap between phases | GitHub Pages (CDN/Static) | — | No `index.html` at root = default 404 from GitHub Pages |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Jekyll | 4.4.1 | Static site generation and permalink resolution | Project's only build tool [VERIFIED: Gemfile.lock in repo] |
| jekyll-paginate | 1.1.0 | Blog pagination | Required by `_config.yml` plugins list [VERIFIED: codebase] |

No new libraries needed for this phase. Zero dependency changes.

### Supporting

None — this phase makes no changes to the dependency graph.

---

## Architecture Patterns

### System Architecture Diagram

```
Visitor request
      |
      v
GitHub Pages static hosting
      |
      |-- /personal   --> pages/personal.md (layout: landing) --> landing.html template
      |                     |
      |                     +--> /assets/js/landing-effects.js  (absolute path, safe)
      |                     +--> /assets/css/main.css           (via head.html, safe)
      |                     +--> /assets/img/pages/nothing_changes_logo.png (absolute, safe)
      |
      |-- /about       --> pages/about.md       (permalink: /about, untouched)
      |-- /photos      --> pages/photos.md      (permalink: /photos, untouched)
      |-- /notes       --> pages/notes.md       (permalink: /notes, untouched)
      |-- /notes-password --> pages/notes-password.md (untouched)
      |-- /sets        --> pages/sets.md        (untouched)
      |-- /contact     --> pages/contact.md     (untouched)
      |-- /:title      --> _posts/**            (untouched)
      |
      |-- /             --> index.html REMOVED --> 404 (temporary until Phase 2)
```

### Recommended Project Structure

No new directories. One file created, one file removed/replaced:

```
pages/
├── personal.md      # NEW — was root index.html
├── about.md         # untouched
├── contact.md       # untouched
├── notes.md         # untouched
├── notes-password.md # untouched
├── photos.md        # untouched
└── sets.md          # untouched
index.html           # REMOVED (or emptied — see Pattern 2)
```

### Pattern 1: Create `/personal` page

**What:** New page file with explicit `permalink: /personal` and `layout: landing`.

**When to use:** Standard Jekyll approach for any non-root page.

```yaml
# pages/personal.md
---
layout: landing
title: Personal
permalink: /personal
---
```

No body content needed — `landing.html` template builds the full page from its own HTML.

**Source:** [VERIFIED: existing pages/about.md, pages/photos.md follow identical pattern]

### Pattern 2: Clear the root `/`

Jekyll requires `index.html` at root to enable `jekyll-paginate`. Since the current `index.html` uses `layout: landing` (not the blog home layout), the blog pagination was never active at root. Removing `index.html` entirely causes GitHub Pages to serve a 404 for `/`.

Two implementation options:

**Option A (recommended):** Delete `index.html` entirely.
- Root returns 404 until Phase 2 adds the chooser page.
- Clean and reversible — Phase 2 creates a new `index.html`.

**Option B:** Replace `index.html` with a minimal placeholder.
- Avoids a 404 gap. Slightly more work.
- Only needed if a visible 404 during the gap between phases is unacceptable.

The UI-SPEC explicitly states: "Root `/` no longer serves the old landing page (returns 404 or placeholder — old content removed)" — **Option A is within spec.**

**Source:** [VERIFIED: 01-UI-SPEC.md phase success criteria; _config.yml no paginate_path override]

### Anti-Patterns to Avoid

- **Relative paths in landing.html:** The template currently has only absolute paths (`/assets/...`). Do NOT add relative paths. Relative paths break when the page moves to a subdirectory URL.
- **Relying on jekyll-paginate at root during this phase:** The blog has no separate index page. Paginate requires root index. This phase doesn't need to solve that — Phase 2 owns it.
- **Changing `permalink:` on existing pages:** PRSV-02 requires existing URLs stay intact. Don't touch `pages/*.md` front matter except to create the new file.
- **Using `redirect_from` plugin:** Site doesn't use jekyll-redirect-from. Don't introduce it unless needed — it isn't needed here.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| URL routing | Custom redirect logic | Jekyll `permalink:` front matter | Jekyll resolves this at build time; no server config needed |
| 404 at root | Custom 404 page specific to root | Default GitHub Pages 404 behavior | The existing `404.md` with `permalink: 404.html` already handles it [VERIFIED: codebase] |

---

## Runtime State Inventory

Step 2.5: SKIPPED — this is not a rename/refactor phase. No string replacements, no stored data migration needed. The change is purely a file restructure.

---

## Common Pitfalls

### Pitfall 1: `href="/"` links on the landing page

**What goes wrong:** `landing.html` line 9 has `<a href="/" class="landing-link-music">music</a>`. After the move, clicking "music" at `/personal` navigates back to `/` — which will 404 until Phase 2. More critically, `landing-effects.js` attaches a click handler to `.landing-link-music` that shows a tooltip and flashes the footer. The `href="/"` is intercepted by `e.preventDefault()`, so the 404 is never actually reached during normal interaction. The link is effectively dead (tooltip only) at present.

**Why it happens:** The "music" link was always a placeholder pointing to root.

**How to avoid:** Leave `href="/"` as-is in this phase. Phase 2 owns the new root URL. The UI-SPEC explicitly notes this is out of scope for Phase 1.

**Warning signs:** If executor "fixes" the href in Phase 1, it will conflict with Phase 2's plan.

---

### Pitfall 2: `about.md` and `sets.md` have `href="/"` back-links

**What goes wrong:**
- `pages/about.md` line 9: `<a href="/" class="image-link" data-tooltip="Go back to home page">`
- `pages/sets.md` line 12: `<a href="/" class="sets-page-home-link">`

These are live navigation links (no `e.preventDefault()`). After Phase 1, clicking them hits a 404.

**Why it happens:** Pages link back to root, which was the landing page.

**How to avoid:** Update these hrefs to `/personal` in Phase 1, OR accept the temporary broken back-links until Phase 2 defines what `/` is. Since Phase 2 will give `/` a real page, updating them to `/personal` is the correct long-term fix and within Phase 1 scope (preserving full functionality per PRSV-01/PRSV-02).

**Warning signs:** QA clicking "back to home" on about/sets pages after Phase 1 and hitting 404.

---

### Pitfall 3: jekyll-paginate root requirement

**What goes wrong:** `jekyll-paginate` only paginates pages where the file is `index.html` at root (or at a `paginate_path` location). There is no `paginate_path` override in `_config.yml`. The current root `index.html` uses `layout: landing`, not `layout: home` — so blog pagination is effectively non-functional right now. Removing `index.html` does not regress anything that was working.

**Why it happens:** The blog pagination was likely never set up fully — the paginate layout exists (`home.html`) but no `index.html` uses it.

**How to avoid:** Document this pre-existing state. Phase 2 will create the new root `index.html` (chooser page, not blog index). Blog pagination remains non-functional — this is acceptable per the project scope (blog is part of the existing site that moves to `/personal` context, not a new feature).

**Warning signs:** Assuming blog pagination was working before — it wasn't.

---

### Pitfall 4: `header.html` logo link points to `relative_url` of `/`

**What goes wrong:** `_includes/header.html` line 2 has `<a href="{{ '/' | relative_url }}">{{ site.title }}</a>`. The landing page (`landing.html`) doesn't include the standard header — it's a standalone layout. This is a non-issue for the landing page itself.

**Why it happens:** The landing layout has no `{% include header.html %}` call — confirmed by reading `landing.html`. The header logo link only appears on pages using `default`, `page`, `no-header` layouts.

**How to avoid:** No action needed. Not a risk for this phase.

---

## Code Examples

### New personal.md

```yaml
# Source: VERIFIED pattern from pages/about.md and pages/photos.md
---
layout: landing
title: Personal
permalink: /personal
---
```

### How landing.html resolves assets at /personal (no changes needed)

```html
<!-- Source: VERIFIED in _layouts/landing.html -->
<img src="/assets/img/pages/nothing_changes_logo.png" ...>  <!-- absolute: safe -->
<script src="/assets/js/landing-effects.js"></script>         <!-- absolute: safe -->
<!-- head.html loads main.css via site-root relative: safe -->
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `jekyll-redirect-from` for URL moves | Explicit `permalink:` in front matter | Always been available | No plugin needed; simpler |

No deprecated patterns apply to this phase.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Blog pagination was never functional (no `index.html` with `layout: home`) — removing root `index.html` doesn't regress it | Pitfall 3 | Low — verified by reading `index.html` (uses `layout: landing`) and `_config.yml` (no `paginate_path`) |

No high-risk assumptions. A1 is supported by direct code inspection.

**All other claims were verified by reading source files in the repository.**

---

## Open Questions

1. **Should `href="/"` back-links in `about.md` and `sets.md` be updated in Phase 1?**
   - What we know: Both pages have `<a href="/">` links that will 404 after root is cleared.
   - What's unclear: Whether Phase 1 or Phase 2 should own this cleanup.
   - Recommendation: Update in Phase 1 to `/personal` — this is the natural "existing functionality preserved" work. Leaving them broken until Phase 2 adds `/` would mean PRSV-02 (existing pages accessible without errors) is technically violated by broken internal links.

---

## Environment Availability

Step 2.6: This phase is purely file changes within an existing Jekyll project. No new external tools, services, runtimes, or CLIs are required beyond what already runs the site. SKIPPED.

---

## Security Domain

No auth, no new inputs, no cryptography, no new endpoints. This phase restructures static file routing only. ASVS categories V2–V6 do not apply. SKIPPED.

---

## Sources

### Primary (HIGH confidence)

- `index.html` — verified current root page uses `layout: landing`, not blog home
- `_layouts/landing.html` — verified all asset paths are absolute; `href="/"` on music link
- `_config.yml` — verified no `paginate_path` override; `permalink: /:title` global setting
- `pages/*.md` — verified all existing pages use explicit `permalink:` front matter
- `_includes/header.html` — verified landing.html does not include this; no risk
- `assets/js/landing-effects.js` — verified JS uses class selectors only, no URL checks
- `.planning/phases/01-route-restructure/01-UI-SPEC.md` — confirmed structural-only phase, asset paths documented, out-of-scope items noted

### Secondary (MEDIUM confidence)

None needed — all findings from direct codebase inspection.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — reading existing Gemfile.lock and _config.yml directly
- Architecture: HIGH — reading all relevant source files
- Pitfalls: HIGH — found concrete instances (href="/", about.md back-link) via grep

**Research date:** 2026-04-16
**Valid until:** Stable — Jekyll permalink mechanics have not changed in years; findings are tied to this specific codebase state
