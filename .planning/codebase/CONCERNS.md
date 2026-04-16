# Codebase Concerns

**Analysis Date:** 2026-04-16

## Security Concerns

**Hardcoded Password in Frontend:**
- Issue: Password is stored as plaintext in `assets/js/notes-password.js` (line 3: `const correctPassword = 'lancer';`)
- Files: `assets/js/notes-password.js`, `pages/notes-password.md`
- Risk: Password is visible in page source, browser history, and git history. Client-side authentication is not secure.
- Current mitigation: None
- Recommendations: Move authentication to server-side. Use proper session tokens/cookies instead of sessionStorage. Consider implementing server-side password hashing with salts.

**Client-Side Authentication via sessionStorage:**
- Issue: Notes page protection relies on `sessionStorage.getItem('notesAuthenticated')` check in `pages/notes.md` (lines 9-12)
- Files: `pages/notes.md`, `assets/js/notes-password.js`
- Risk: Users can bypass protection by setting sessionStorage directly in browser console or copying the check logic. No server-side verification.
- Impact: Protected notes are not actually protected against determined users
- Recommendations: Implement server-side session validation. Use secure, httpOnly cookies for authentication state.

**Google Analytics Deprecated Code:**
- Issue: Using legacy Google Analytics (GA) tracking code in `_includes/google-analytics.html` (lines 1-8)
- Files: `_includes/google-analytics.html`
- Risk: Legacy GA endpoint may be deprecated or unreliable
- Impact: Analytics data collection may fail silently
- Recommendations: Migrate to Google Analytics 4 (GA4) or remove if not actively used

## Performance Concerns

**Magnetic Effect Event Listener Overhead:**
- Issue: Continuous mousemove event handler on landing page calculates distances and transforms for all links on every pixel movement
- Files: `assets/js/landing-effects.js` (lines 38-85)
- Problem: No debouncing or throttling of mousemove events. Runs on every single mouse movement without performance optimization.
- Impact: CPU usage spikes, potential frame drops on lower-end devices, especially on touch devices where repeated events fire rapidly
- Improvement path: Add throttling/debouncing to mousemove handler. Consider using CSS transforms only or requestAnimationFrame optimization.

**Continuous Logo Rotation Animation:**
- Issue: `requestAnimationFrame` loop runs continuously even when not needed
- Files: `assets/js/landing-effects.js` (lines 88-115)
- Problem: Animation runs 60fps regardless of visibility. No pause when tab is inactive.
- Impact: Battery drain on mobile devices, unnecessary CPU/GPU load
- Improvement path: Use `visibilitychange` event to pause animation when tab is not visible. Consider CSS animations instead of JS.

**Lazy Loading Configuration Issue:**
- Issue: Lazy loading margin set to 50px before viewport, combined with Intersection Observer threshold of 0.01
- Files: `_layouts/gallery.html` (lines 71-75)
- Problem: May preload too many images if gallery has many items
- Impact: Unnecessary bandwidth usage
- Improvement path: Test and adjust rootMargin based on actual usage patterns. Consider priority loading for above-fold images.

**Synchronous Image Data Attributes:**
- Issue: Gallery images load full image data into `data-full` attributes on page load
- Files: `_layouts/gallery.html` (lines 14-22)
- Problem: All image paths rendered in HTML on initial page load even if not visible
- Impact: Increased initial HTML payload
- Improvement path: Consider loading image paths dynamically or on-demand.

## Code Quality & Maintenance Concerns

**Hardcoded Link Positions in JavaScript:**
- Issue: Original Y-transform values hardcoded for each link class
- Files: `assets/js/landing-effects.js` (lines 67-71)
- Problem: If CSS classes or transform values change, JavaScript must be manually updated
- Impact: Easy to break styling when refactoring
- Recommendation: Use `data-*` attributes or computed styles instead of hardcoded values

**Magic Numbers Without Explanation:**
- Issue: Multiple unexplained constants throughout JavaScript files
- Examples:
  - `200` pixel magnetic radius (line 54)
  - `20` pixel move factor (line 59)
  - `4000` millisecond timeout (line 33)
  - `500` millisecond resize debounce (line 104)
- Impact: Difficult to adjust or tune without understanding original intent
- Recommendation: Add JSDoc comments explaining each magic number

**IIFE Pattern Without Error Handling:**
- Issue: Password form handler uses IIFE but doesn't validate form existence
- Files: `assets/js/notes-password.js`
- Problem: If form DOM elements don't exist, script silently fails
- Impact: Silent failures if HTML structure changes
- Recommendation: Add error handling and validation for DOM elements

**Unused/Commented-Out Code:**
- Issue: Fisher-Yates shuffle algorithm commented out in gallery layout
- Files: `_layouts/gallery.html` (lines 54-65)
- Problem: Clutters code, unclear if intended for future use or dead code
- Impact: Maintenance burden, code review confusion
- Recommendation: Remove commented code or document intent with issue reference

**Gallery Sorting Implementation:**
- Issue: Chronological sorting is hardcoded in layout template inline script
- Files: `_layouts/gallery.html` (lines 41-52)
- Problem: Layout contains business logic mixed with presentation
- Impact: Difficult to test, difficult to reuse logic, violates separation of concerns
- Recommendation: Move to `assets/js/gallery.js` with proper module structure

## Fragile Areas

**Notes Page Access Control:**
- Files: `pages/notes.md`, `pages/notes-password.md`, `assets/js/notes-password.js`
- Why fragile: Three separate files handle authentication (front-end check, redirect logic, password validation). Any single piece can be bypassed independently.
- Safe modification: Any changes to authentication flow must update all three files consistently. Consider unifying into a single server-side implementation.
- Test coverage: No automated tests for authentication flow

**Landing Page Interactive Effects:**
- Files: `assets/js/landing-effects.js`
- Why fragile: Multiple independent DOMContentLoaded listeners on same page. Each one assumes specific HTML structure. CSS changes break JavaScript behavior.
- Safe modification: When modifying landing page layout, must verify all three effect blocks still work. No tests validate this.
- Dependencies: Relies on specific CSS classes and computed styles that aren't validated at runtime

**Gallery Image Loading:**
- Files: `_layouts/gallery.html`, `assets/js/lightbox.js`
- Why fragile: Image paths depend on Jekyll's static_files API with downcase filtering. Lazy loading uses data attributes that must match between HTML and JavaScript.
- Safe modification: Any changes to image path structure or attribute names breaks functionality. Data attribute names are not documented.
- Test coverage: No tests for image loading or lightbox functionality

## Test Coverage Gaps

**No Automated Tests:**
- What's not tested: All interactive features (landing effects, lightbox navigation, password validation, gallery sorting)
- Files: `assets/js/`, `pages/`
- Risk: Regressions in animations, galleries, and authentication flows go undetected
- Priority: High - Security-critical features (notes authentication) have zero tests

**No Form Validation Tests:**
- What's not tested: Password input validation, form submission handling, error message display
- Files: `assets/js/notes-password.js`
- Risk: Changes to form handling can break without detection
- Priority: High - Authentication flow must be tested

**No Gallery Functionality Tests:**
- What's not tested: Image loading, lightbox navigation, sorting, lazy loading
- Files: `assets/js/lightbox.js`, `_layouts/gallery.html`
- Risk: Gallery features can silently break
- Priority: Medium - User-facing but non-critical

## Dependencies at Risk

**Google Analytics Legacy Integration:**
- Risk: Using deprecated GA syntax instead of GA4
- Impact: Analytics may stop working when old endpoint is shut down
- Current state: Active tracking with outdated code
- Migration plan: Upgrade to Google Analytics 4 or remove tracking entirely

**Font Awesome CDN:**
- Issue: Loading from CDN without fallback
- Files: `_includes/head.html` (line 19-20)
- Risk: If CDN is down, social icons fail to render
- Impact: Social links in footer may show broken icons
- Improvement: Consider self-hosting icon fonts or SVG icons

## Platform & Browser Considerations

**No Touch Event Optimization:**
- Issue: Landing page magnetic effects use mousemove, not pointer events
- Files: `assets/js/landing-effects.js`
- Problem: Touch devices will not trigger magnetic effects (intended, but no alternative provided)
- Impact: Touch users get different experience
- Recommendation: Add touch event handlers or document intentional desktop-only behavior

**Lazy Loading Support:**
- Issue: Gallery uses Intersection Observer which requires IE11+ support
- Files: `_layouts/gallery.html` (line 78)
- Considerations: No polyfill provided for older browsers
- Impact: Gallery may not load in older browsers

## Missing Error Recovery

**Missing Null Checks:**
- Issue: JavaScript assumes DOM elements exist but doesn't validate
- Files: `assets/js/lightbox.js` (lines 4-8), `assets/js/notes-password.js` (lines 4-6)
- Risk: Silent failures if HTML structure doesn't match expectations
- Recommendation: Add null checks and console warnings

**No Fallback for Failed Image Loads:**
- Issue: Lightbox and gallery don't handle broken images
- Files: `assets/js/lightbox.js` (line 30), `_layouts/gallery.html` (line 85)
- Risk: User sees blank lightbox if image fails to load
- Recommendation: Add error handler to display fallback message

---

*Concerns audit: 2026-04-16*
