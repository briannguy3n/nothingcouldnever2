# Requirements: n0thing DJ/Producer Linktree

**Defined:** 2026-04-16
**Core Value:** A visitor hitting the site immediately sees n0thing's DJ identity and can reach the most important content in one tap.

## v1 Requirements

### Chooser

- [ ] **CHSR-01**: Visitor landing on `/` sees a chooser splash with two buttons
- [ ] **CHSR-02**: "n0thing" button (prominent) routes visitor to `/links`
- [ ] **CHSR-03**: "Other Stuff" button (secondary) routes visitor to `/personal`
- [ ] **CHSR-04**: Chooser page has a dark aesthetic consistent with the DJ brand

### Linktree

- [ ] **LINK-01**: `/links` page displays profile photo and "n0thing" name at the top
- [ ] **LINK-02**: Links are grouped into labeled categories (e.g. Tour Dates, Releases, Sets & Recordings)
- [ ] **LINK-03**: Each link card shows a thumbnail image, title text, and links to an external URL
- [ ] **LINK-04**: Page uses a dark aesthetic with rounded card styling
- [ ] **LINK-05**: All link data (titles, URLs, thumbnails, categories) is managed via `_data/links.yml`

### Preservation

- [x] **PRSV-01**: Existing landing page moves to `/personal` and remains fully functional
- [x] **PRSV-02**: Blog, gallery, notes, about, and contact pages remain accessible at their current URLs

## v2 Requirements

### Enhancements

- **ENH-01**: Upcoming show dates displayed as a special section with date/venue formatting
- **ENH-02**: Embedded media previews (SoundCloud/Spotify player inline)
- **ENH-03**: Link click analytics (self-hosted or privacy-friendly third party)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Admin UI / CMS | YAML config sufficient, no backend needed |
| User accounts or auth | Static site, no server |
| E-commerce / merch | Not part of DJ profile scope |
| Social feed embeds | Links to platforms only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CHSR-01 | Phase 2 | Pending |
| CHSR-02 | Phase 2 | Pending |
| CHSR-03 | Phase 2 | Pending |
| CHSR-04 | Phase 2 | Pending |
| LINK-01 | Phase 2 | Pending |
| LINK-02 | Phase 2 | Pending |
| LINK-03 | Phase 2 | Pending |
| LINK-04 | Phase 2 | Pending |
| LINK-05 | Phase 2 | Pending |
| PRSV-01 | Phase 1 | Complete |
| PRSV-02 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 11 total
- Mapped to phases: 11
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-16*
*Last updated: 2026-04-16 after roadmap creation*
