---
name: FishEye Project Memory
description: Static site with ES modules, photographer portfolio system
type: Static Site
project: FishEye
category: Static Website
phase: Complete
updated: 2026-03-23
tags:
  - HTML5
  - CSS3
  - ES Modules
  - Accessibility
  - WCAG 2.1 AA
  - Lightbox
  - Modal Dialogs
  - Responsive Design
---

# FishEye Memory Index

**Last Consolidated:** March 23, 2026

## Quick Reference

| Section | Purpose |
|---------|---------|
| [Architecture](architecture.md) | ES modules organization, manager pattern, data flow |
| [Component System](components.md) | Reusable components, photographer cards, media galleries |
| [Accessibility](accessibility.md) | WCAG 2.1 AA compliance, keyboard navigation, ARIA labels |
| [Modal Dialogs](modals.md) | Lightbox implementation, form modals, focus management |
| [Sorting & Filtering](sorting.md) | Sort strategies, filter implementations, performance |
| [Responsive Design](responsive.md) | Mobile-first approach, breakpoints, flexible layouts |
| [Validation](validation.md) | Form validation rules, error handling, user feedback |

## Project Overview

**FishEye** is a photographer portfolio platform with a custom lightbox, sorting, filtering, and contact form.

- **Tech Stack:** HTML5 + CSS3 + ES Modules JavaScript
- **Architecture:** Modular manager pattern (ModalManager, LightboxManager, SortManager, etc.)
- **Accessibility:** WCAG 2.1 AA compliance with full keyboard navigation
- **Data:** Photographer profiles and media galleries
- **Interactions:** Custom lightbox with arrow navigation, contact form modal
- **Responsive:** Mobile-first design from ground up

## Phase & Status

- **Phase:** Complete
- **Memory Status:** ✅ Index created (documentation ready for archival)
- **Next Review:** June 23, 2026 (Quarterly)

## Key Learnings by Category

### ES Modules Architecture
- **File Structure:** `/modules/` for feature modules, `/utils/` for helpers
- **Export/Import:** Named exports for specific functions and classes
- **Circular Dependencies:** Avoided by importing needed functions only
- **Lazy Loading:** Media loaded on demand, photographers on page load
- **Example:** `DataManager` exposes API, `ModalManager` handles dialogs, `LightboxManager` controls media view

### Manager Pattern
- **Managers:**
  - `DataManager`: Load and provide photographer/media data
  - `ModalManager`: Show/hide contact form modal
  - `LightboxManager`: Display full-size media with navigation
  - `SortManager`: Handle sorting options and reordering
  - `FilterManager`: Implement tag-based filtering
  - `ValidationManager`: Validate form inputs
  - `StatsManager`: Calculate and display likes and stats

### Photographer Portfolio System
- **Data Structure:** Photographers have name, bio, image, location, tagline, price
- **Gallery:** Each photographer has multiple media items (photos/videos)
- **Sorting:** By popularity (likes), date (newest), price
- **Filtering:** By tags/categories assigned to photographers
- **Card Component:** Render photographer info with image and stats

### Custom Lightbox Implementation
- **Navigation:** Arrow keys (Left/Right) to browse, Escape to close
- **Focus Trap:** Keyboard focus stays within lightbox while open
- **Media Display:** Image or video in full-size view
- **Counter:** Show current position (1 of 10)
- **Keyboard Accessible:** All interactions work without mouse

### Contact Form Modal
- **Fields:** Name, email, photographer name (select), message
- **Validation:** Required fields, email format check
- **Submission:** Prevent default, show success message, clear form
- **Accessibility:** Focus management, error announcements
- **Keyboard Support:** Tab through fields, Enter to submit, Escape to close

### Sorting Strategy
- **Popular:** Sort by like count, descending
- **Date:** Sort by creation/upload date, newest first
- **Price:** Sort by photographer price, ascending
- **Reversible:** Toggle ascending/descending on same criterion
- **Performance:** Sort in-memory, update DOM once

### Filtering & Search
- **Tag System:** Photographers tagged with categories (portrait, travel, etc.)
- **Multi-select:** Allow selecting multiple tags
- **Logic:** AND logic (must have all selected tags) or OR (at least one)
- **Reset:** Clear filters to show all photographers
- **Performance:** Filter in-memory, update view

### Accessibility Compliance
- **WCAG 2.1 AA:** Full compliance target
- **Keyboard Navigation:**
  - Tab: Move between interactive elements
  - Enter/Space: Activate buttons and links
  - Arrow Keys: Navigate within lightbox or select lists
  - Escape: Close dialogs
- **ARIA Labels:** aria-label for icon buttons, aria-labelledby for complex controls
- **Color Contrast:** All text >= 4.5:1 contrast ratio
- **Focus Indicators:** Visible outline on all focusable elements
- **Error Announcements:** Use role="alert" for validation messages

### Form Validation
- **Client-side:** Validate on blur and submit
- **Rules:** Required fields, email format, text length
- **Feedback:** Highlight invalid fields, show error messages
- **Submission:** Prevent default form action, use JavaScript
- **Accessibility:** Announce errors via ARIA live regions

## Related Files

- **HTML:** `index.html`
- **CSS:** `styles.css` or organized by component
- **JavaScript Modules:** `/modules/` directory
- **Data:** `data.json` with photographer and media information
- **Project config:** CLAUDE.md (overview)

## Archive Preparation Checklist

- [x] Project complete, learning project concluded
- [x] CLAUDE.md created with project overview
- [x] MEMORY.md created with patterns documented
- [x] Accessibility audit completed (WCAG 2.1 AA)
- [ ] Ready for quarterly archive review (June 23, 2026)

---

**Next Step:** Archive after Q2 review. Consolidate into quarterly summary.
