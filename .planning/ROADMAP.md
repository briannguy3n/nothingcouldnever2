# Roadmap: n0thing DJ/Producer Linktree

## Overview

Two phases: first restructure the existing site routing so nothing breaks, then build the two new pages (chooser and linktree). Each phase is independently verifiable and unblocks the next.

## Phases

- [x] **Phase 1: Route Restructure** - Move existing landing to /personal, verify all existing pages still work (completed 2026-04-16)
- [ ] **Phase 2: New Pages** - Build chooser splash at / and linktree at /links with YAML-driven data

## Phase Details

### Phase 1: Route Restructure
**Goal**: Existing site is intact at new URLs — nothing broken before new pages are added
**Depends on**: Nothing (first phase)
**Requirements**: PRSV-01, PRSV-02
**Success Criteria** (what must be TRUE):
  1. Visiting `/personal` loads the existing landing page with magnetic link effects fully working
  2. Blog, gallery, notes, about, and contact pages load at their existing URLs without errors
  3. Root `/` no longer serves the old landing page (returns 404 or placeholder — old content moved)
**Plans:** 1/1 plans complete
Plans:
- [x] 01-01-PLAN.md — Move landing to /personal, update back-links, verify all pages
**UI hint**: yes

### Phase 2: New Pages
**Goal**: Visitors can reach n0thing's DJ content in one tap from the root URL
**Depends on**: Phase 1
**Requirements**: CHSR-01, CHSR-02, CHSR-03, CHSR-04, LINK-01, LINK-02, LINK-03, LINK-04, LINK-05
**Success Criteria** (what must be TRUE):
  1. Visiting `/` shows a dark chooser splash with two buttons — "n0thing" (prominent) and "Other Stuff" (secondary)
  2. Clicking "n0thing" navigates to `/links`; clicking "Other Stuff" navigates to `/personal`
  3. `/links` shows a profile photo and "n0thing" name header above grouped link categories
  4. Each link card displays a thumbnail, title, and opens the correct external URL on click
  5. Adding or editing a link in `_data/links.yml` is reflected on the page after a Jekyll build — no code changes required
**Plans:** 3 plans
Plans:
- [x] 02-01-PLAN.md — Chooser page: layout, SCSS, root page at /
- [x] 02-02-PLAN.md — Linktree page: YAML data, layout, SCSS, links page, SCSS import registration
- [x] 02-03-PLAN.md — Build verification and visual checkpoint
**UI hint**: yes

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Route Restructure | 1/1 | Complete   | 2026-04-16 |
| 2. New Pages | 0/3 | Not started | - |
