# Testing Patterns

**Analysis Date:** 2026-04-16

## Test Framework

**Status:** No formal testing framework configured.

**Runner:** Not detected
**Config:** Not detected
**Assertion Library:** Not detected

No test files found in codebase (searched for `*.test.*`, `*.spec.*`, `*_test.*`).

**Run Commands:**
```bash
# No test commands configured in package.json (no package.json exists)
# No Rakefile or test scripts detected in Gemfile
# Manual testing only via browser/development server
```

## Test File Organization

**Location:** No test files exist in the codebase.

**Structure:** Not applicable

## Testing Approach

**Current State:** Manual browser testing only.

The project is a Jekyll static site (CMS layer) with vanilla JavaScript enhancements. No automated test infrastructure is in place.

## Mocking

**Framework:** Not applicable

**Approach:** Not applicable

**Current Practices:**
- No mocking libraries installed
- No mock data fixtures
- All functionality tested through browser interaction

## Fixtures and Factories

**Test Data:** Not applicable

**Real Data Sources:**
- Static markdown files in `pages/` directory
- YAML front matter for page configuration
- Image gallery uses static files from `assets/img/gallery/`
- Password stored as string literal: `lancer` in `assets/js/notes-password.js`

## Coverage

**Requirements:** No coverage requirements enforced

**View Coverage:** Not applicable

**Analysis:**
No code coverage tracking. The codebase uses vanilla JavaScript without a build step, making instrumented coverage difficult without additional tooling.

## Test Types

**Unit Tests:**
Not implemented. Individual function testing would require:
- DOM-related functions: `showImage()`, `closeLightbox()`, `hideTooltip()`, `showTooltip()`
- Calculation functions: magnetic effect distance calculations in `landing-effects.js`
- State management: session storage checks in `notes-password.js`

**Integration Tests:**
Not implemented. Multi-function flows would test:
- Lightbox open → navigate → close sequence
- Password validation → redirect flow
- Landing page interactive effects (mouse events + DOM state)

**E2E Tests:**
Not implemented. Browser-based flows like:
- Gallery photo selection and navigation
- Notes password page authentication
- Landing page link magnetic effects

## Testing Recommendations

**For Feature Validation:**
Current approach: Manual browser testing before deployment.

**Gaps Identified:**
1. **Landing page effects** (`assets/js/landing-effects.js`):
   - Magnetic cursor effect calculations (distance-based strength)
   - Logo rotation animation with resize handling
   - Footer highlight animation on music link click
   - No automated tests for animation timing or effect correctness

2. **Lightbox gallery** (`assets/js/lightbox.js`):
   - Image loading and display
   - Navigation (prev/next/keyboard)
   - Lazy loading with IntersectionObserver
   - No tests for image sequence wrapping or keyboard handlers

3. **Notes authentication** (`assets/js/notes-password.js`):
   - Password validation (hardcoded value)
   - Session storage persistence
   - Redirect behavior
   - Error message display and timeout
   - Manual testing only; no validation tests

4. **Gallery sorting** (`_layouts/gallery.html`):
   - Chronological sorting by file modification time
   - Commented-out random shuffle code
   - Lazy loading image rendering
   - No tests for sort ordering or lazy load triggers

## Common Manual Testing Scenarios

**Landing Page:**
```bash
# Verify in browser:
# - Hover over links triggers magnetic effect
# - Logo rotates continuously
# - Clicking music link highlights footer
# - Tooltip appears/closes correctly on "sets" click
# - Responsive at different viewport widths
```

**Gallery:**
```bash
# Verify in browser:
# - Photos load in correct chronological order
# - Click photo opens lightbox
# - Previous/next buttons navigate through gallery
# - Keyboard arrow keys work in lightbox
# - ESC key closes lightbox
# - Images lazy-load as scrolling
# - Mobile responsive with adjusted column count
```

**Notes Authentication:**
```bash
# Verify in browser:
# - Correct password redirects to /notes
# - Incorrect password shows error message
# - Error clears after 3 seconds
# - Session persists during browser session
# - Page reload doesn't re-prompt if authenticated
```

## Manual Test Checklist (Before Deployment)

**Browser Compatibility:**
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome (Android)

**Functionality:**
- [ ] Landing page effects smooth at 60fps
- [ ] Gallery loads without layout shift
- [ ] Lightbox keyboard navigation works
- [ ] Password authentication persists
- [ ] All external links functional

**Performance:**
- [ ] Gallery images lazy-load on scroll
- [ ] No console errors in DevTools
- [ ] Landing effects don't block page interaction
- [ ] Animation frame rate stable

---

*Testing analysis: 2026-04-16*

**Note:** This project would benefit from implementing automated tests as interactive JavaScript features grow in complexity. Consider adding Jest/Vitest with jsdom or Playwright for E2E testing.
