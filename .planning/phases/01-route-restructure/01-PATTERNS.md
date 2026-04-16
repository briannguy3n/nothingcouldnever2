# Phase 1: Route Restructure — Pattern Map

**Mapped:** 2026-04-16
**Files analyzed:** 4 (1 created, 1 deleted, 2 modified)
**Analogs found:** 3 / 3 (no-analog file: index.html deletion)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `pages/personal.md` | page (layout ref) | static | `pages/about.md` | exact |
| `index.html` | page (root) | static | — | deleted — no analog needed |
| `pages/about.md` | page (content) | static | self | modified (href update only) |
| `pages/sets.md` | page (content) | static | self | modified (href update only) |

---

## Pattern Assignments

### `pages/personal.md` (new page, layout reference)

**Analog:** `pages/about.md` (lines 1–5) and `pages/photos.md` (lines 1–10)

**Front matter pattern** — copy this exactly, it is the complete file:

```yaml
---
layout: landing
title: Personal
permalink: /personal
---
```

No body content. The `landing.html` layout builds the full page from its own HTML. This matches the pattern of the current `index.html` (line 1–4) which is also a front-matter-only file with `layout: landing`.

**Current index.html for reference** (`index.html` lines 1–4):
```yaml
---
layout: landing
title: Home
---
```

Difference: add `permalink: /personal`. Remove `title: Home` → use `title: Personal`. The layout and content are identical.

---

### `index.html` (deleted)

**Analog:** none — this file is deleted.

**Action:** Delete the file. No replacement in this phase. GitHub Pages returns 404 for `/` until Phase 2.

No pattern extraction needed.

---

### `pages/about.md` (modified — href update only)

**Analog:** self

**Current line to change** (`pages/about.md` line 9):
```html
<a href="/" class="image-link" data-tooltip="Go back to home page">
```

**Updated to:**
```html
<a href="/personal" class="image-link" data-tooltip="Go back to home page">
```

Only the `href` attribute value changes. Class, data-tooltip, and all surrounding HTML stay identical.

---

### `pages/sets.md` (modified — href update only)

**Analog:** self

**Current line to change** (`pages/sets.md` line 12):
```html
<a href="/" class="sets-page-home-link">
```

**Updated to:**
```html
<a href="/personal" class="sets-page-home-link">
```

Only the `href` attribute value changes. Class and surrounding HTML stay identical.

---

## Shared Patterns

### Jekyll Front Matter (permalink declaration)
**Source:** `pages/about.md` lines 1–5, `pages/photos.md` lines 1–10, `pages/sets.md` lines 1–5
**Apply to:** `pages/personal.md`

All pages in `pages/` declare an explicit `permalink:` in front matter. No reliance on filename-based URL derivation. Three-dash delimiters, no trailing spaces.

```yaml
---
layout: <layout-name>
title: <Page Title>
permalink: /path
---
```

### Absolute asset paths (no action needed)
**Source:** `_layouts/landing.html` (all `src=` and `href=` attributes on assets)
**Apply to:** `pages/personal.md` (inherits via layout)

All asset paths in `landing.html` are root-relative (`/assets/...`). No changes needed when moving the page from `/` to `/personal`. This is already safe.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `index.html` (deletion) | — | — | File is removed; no analog needed |

---

## Metadata

**Analog search scope:** `pages/`, root `index.html`, `_layouts/landing.html`
**Files scanned:** 6 (`index.html`, `pages/about.md`, `pages/sets.md`, `pages/photos.md`, `pages/notes.md`, `pages/contact.md`)
**Pattern extraction date:** 2026-04-16
