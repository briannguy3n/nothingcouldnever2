---
phase: 1
slug: route-restructure
status: draft
shadcn_initialized: false
preset: none
created: 2026-04-16
---

# Phase 1 — UI Design Contract

> Visual and interaction contract for Phase 1: Route Restructure.
> This phase is STRUCTURAL only — no new UI is introduced. All contracts below
> describe the EXISTING landing page that moves from `/` to `/personal`.
> The executor must preserve these exactly; the auditor checks nothing changed.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none — Jekyll/SCSS, no component library |
| Preset | not applicable |
| Component library | none |
| Icon library | Font Awesome 6.5.1 (CDN) |
| Font | Inconsolata (Google Fonts) — weights 400, 500, 600, 700 |

Source: `assets/css/main.scss`, `_layouts/landing.html`

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Inline gaps (tooltip arrow offset) |
| sm | 8px | Compact padding (tooltip close button position) |
| md | 16px | Tooltip padding (10px/16px — existing value, non-standard) |
| lg | 24px | — |
| xl | 32px | — |
| 2xl | 48px | — |
| 3xl | 64px | — |

Exceptions: The existing landing page uses rem-based spacing (2rem, 7rem, 10rem, 13rem) for
magnetic link layout — these are deliberate design values and must NOT be changed during the
route move. Treat them as frozen constants.

---

## Typography

All values from `_sass/_base.scss` and `assets/css/main.scss`. Preserve exactly.

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body / links | 1rem (16px) | 400 | 1.65 |
| Landing nav links | 2rem (32px) | 400 | normal |
| Heading h1 | 2rem (32px) | bold (700) | 1.25 |
| Heading h2 | 1.5rem (24px) | bold (700) | 1.25 |

Font family: `Inconsolata, monospace` for all body and link text.
Code font: `Source Code Pro, monospace` (used on post pages — not affected by this phase).

---

## Color

All values from `assets/css/main.scss`. Preserve exactly.

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | #ffffff (white) | Page background |
| Secondary (30%) | #ffffff (white) | No distinct secondary surface on landing page |
| Accent (10%) | #000000 (black) | Landing nav link text, logo, footer outline flash |
| Muted text | #666666 | Nav link hover color, body text |
| Destructive | n/a | No destructive actions in this phase |

Accent reserved for: landing nav link text color, logo image, footer `monoFlash` animation
outline. Not used on any other elements.

Tooltip overlay: `rgba(0, 0, 0, 0.9)` background, white text — existing under-construction
tooltip; preserve as-is.

---

## Copywriting Contract

This phase moves existing pages — no copy is added or changed.

| Element | Copy |
|---------|------|
| Primary CTA | none — no new CTAs introduced in this phase |
| Empty state heading | n/a — no data-driven views in this phase |
| Empty state body | n/a |
| Error state | Root `/` returns 404 or Jekyll placeholder after old content moves — copy: Jekyll default "404 — Page not found" (default behavior, no custom copy required) |
| Destructive confirmation | none — no destructive user actions in this phase |

Under-construction tooltip (existing, preserve verbatim):
- Heading: "Under Construction"
- Body: "This page is currently being built. Check back soon."

---

## Asset Path Contract

Critical for this phase — all paths in the landing page must resolve correctly after the
page moves to `/personal`.

| Asset | Current path | Status after move |
|-------|-------------|-------------------|
| Logo image | `/assets/img/pages/nothing_changes_logo.png` | Absolute path — resolves correctly at any URL |
| landing-effects.js | `/assets/js/landing-effects.js` | Absolute path — resolves correctly at any URL |
| main.css | Loaded via `head.html` include | Site-root relative — resolves correctly |
| Font Awesome CDN | External HTTPS URL | No change needed |
| Google Fonts CDN | External HTTPS URL | No change needed |

Rule: All asset paths in `landing.html` are already absolute (`/assets/...`). The move to
`/personal` does not break them. Executor must verify no relative paths exist in the layout.

Internal link in landing.html that must be updated:
- `href="/"` on the "music" link → must point to the new root or be removed/updated to avoid
  circular reference once `/` becomes the chooser page. Out of scope for this phase (Phase 2
  owns the new root) — but executor must be aware.

---

## Interaction Preservation Contract

The following JavaScript interactions exist on the landing page and must work identically at `/personal`.

| Interaction | File | Mechanism | Risk |
|-------------|------|-----------|------|
| Magnetic link repulsion | `landing-effects.js` | `mousemove` on `.landing-main-links-container a` | Low — JS uses class selectors, not URL |
| Logo rotation | `landing-effects.js` | `mousemove` on `.landing-logo` | Low — same |
| Footer flash on click | `landing-effects.js` | Click on `.landing-page .footer` | Low — same |
| Under-construction tooltip | `landing-effects.js` | Click on `.landing-link-music` | Low — same |
| Tooltip close button | `landing-effects.js` | Click on `.construction-close` | Low — same |

None of these interactions depend on the URL. Moving the page does not affect them.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not applicable — Jekyll project, no shadcn |
| third-party | none | not applicable |

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
