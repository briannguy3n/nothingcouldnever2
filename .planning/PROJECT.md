# n0thing DJ/Producer Linktree

## What This Is

A linktree-style landing page for DJ/producer **n0thing** at `nothingcouldnever.com`. Visitors land on a chooser splash that routes them to either the n0thing DJ profile (prominent) or the existing personal site (secondary). The DJ profile page is a dark, card-based link hub surfacing releases, sets, recordings, and performance dates — all driven by a YAML data file.

## Core Value

A visitor hitting the site immediately sees n0thing's DJ identity and can reach the most important content (new music, upcoming shows) in one tap.

## Requirements

### Validated

- ✓ Jekyll static site on GitHub Pages — existing
- ✓ Dark landing page with magnetic link effects — existing (`landing.html`)
- ✓ Blog, gallery, notes, about, contact pages — existing

### Active

- [ ] Root (`/`) shows a chooser splash with two buttons: **n0thing** (prominent) and **Other Stuff**
- [ ] "n0thing" button routes to `/links` — the linktree page
- [ ] "Other Stuff" button routes to `/personal` — the existing landing page (moved from `/`)
- [ ] Linktree page has dark aesthetic, profile photo + "n0thing" name at top
- [ ] Links are grouped into categories (e.g. Tour Dates, Releases, Sets & Recordings)
- [ ] Each link card has a thumbnail image, title, and external URL
- [ ] Link data is managed via `_data/links.yml` (no code changes needed to add/edit links)
- [ ] Existing site pages (blog, gallery, notes, about, contact) remain fully functional

### Out of Scope

- Admin UI for managing links — YAML is sufficient, no backend needed
- User accounts or analytics dashboard — static site, no server
- E-commerce / merch — out of scope for this project
- Social feed embeds — links to external platforms only

## Context

- Stack: Jekyll 4.4.1, Millennial theme, GitHub Pages, vanilla JS, SCSS
- Existing landing page (`landing.html` / `_layouts/landing.html`) has magnetic link effects — this becomes the "Other Stuff" destination at `/personal`
- Current root (`/`) currently renders the landing page — will be replaced with the chooser splash
- Link content: songs/releases, full-length sets, video set recordings, upcoming performance dates
- Design reference: dark background, rounded card links with left-side thumbnails (Linktree aesthetic)

## Constraints

- **Tech stack**: Jekyll/GitHub Pages — no server-side code, no databases, no build step beyond Jekyll
- **Data management**: YAML only — no CMS, no admin UI
- **Compatibility**: Must not break existing blog, gallery, notes, about, contact pages during or after build

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep Jekyll, no new framework | Existing infra, no deployment changes needed | — Pending |
| YAML-driven links | Simple enough for the use case, no overkill | — Pending |
| Existing landing moves to `/personal` | Preserves "Other Stuff" destination intact | — Pending |
| Chooser at root replaces current landing | Single entry point that routes by identity | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-16 after initialization*
