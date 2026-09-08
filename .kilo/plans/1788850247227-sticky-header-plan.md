# Sticky Header Plan

## Goal
Place a sticky header at the top of the page with navigation items next to each other, centered, within the 800px content column, always visible while scrolling. CSS must be reliably loaded and support the sticky layout under AGENTS.md constraints.

## Context
- `src/components/Header.vue` currently defines a sticky header with `position: sticky; top: 0` in scoped styles.
- Scroll hide/show logic exists (`isSticky` ref, `handleScroll`) but class binding is missing, so `.header.sticky` never applies.
- `.nav-list` uses `display: flex; justify-content: space-between; width: 100%`, spreading items across full width.
- Header is rendered inside `src/components/Layout.vue`, which constrains width to `max-width: 800px; margin: 0 auto; padding: 1rem`.
- Global styles are in `src/style.css` imported in `App.vue`. Payload budgets: single stylesheet <15KB, no frameworks, system fonts, black on white.

## Decisions
- Visibility: header remains permanently visible; hide-on-scroll behavior removed.
- Alignment: navigation items centered horizontally with a small gap, not space-between.
- Width: header stays within the 800px content column, aligned with page body.
- JS: remove scroll listeners to keep runtime minimal; header requires no runtime behavior.
- CSS loading: keep header styles in scoped block for component isolation, verify global stylesheet import remains effective.

## Affected Boundaries
- `src/components/Header.vue` template, script, style.
- `src/components/Layout.vue` remains unchanged; header width follows layout constraints.
- `src/App.vue` remains Layout wrapper at app root.
- `src/pages/Home.vue`, `src/pages/Archive.vue`, `src/pages/About.vue` currently wrap content in Layout, causing duplicate header.
- No changes to `src/style.css` or build config required.

## Tasks
1. Review Header.vue current implementation and confirm sticky support in parent layout.
2. Remove scroll hide/show script: delete `isSticky` ref, `handleScroll`, `onMounted`/`onUnmounted` listeners, and empty script setup or keep minimal.
3. Simplify template: keep `<header class="header">` with `<nav>` and `<ul class="nav-list">` containing three links.
4. Update scoped styles:
   - Keep `.header` with `position: sticky; top: 0; background-color: #ffffff; z-index: 100; border-bottom: 1px solid #eee; padding: 1rem 0; width: 100%`.
   - Remove `.header.sticky` transform rule.
   - Update `.nav-list`: `display: flex; justify-content: center; align-items: center; gap: 1.5rem; list-style: none; margin: 0; padding: 0;`.
   - Remove `width: 100%` and `justify-content: space-between`.
   - Keep link styles for color and hover underline.
5. Remove duplicate Layout wrappers from pages:
   - In `src/pages/Home.vue`, `src/pages/Archive.vue`, `src/pages/About.vue`, remove `<Layout>` wrapper and import, render content directly.
   - Ensure pages export only page content; Layout remains in `src/App.vue`.
6. Verify CSS loading: confirm `src/style.css` is imported in `App.vue` and Vite processes scoped styles correctly in dev and build.
7. Accessibility check: ensure `<header>` and `<nav>` landmarks remain, links have visible focus, semantic list structure preserved.
8. Validation: open dev server, scroll page, confirm header stays pinned at top, items are centered and next to each other, no layout shift, header background covers scrolling content, and header appears only once per page.

## Risks
- Parent overflow or transform could break `position: sticky`. Layout uses normal flow; no overflow set.
- Scoped style mangling could hide styles if build fails. Verify Vite output.
- Removing script eliminates future hide/show option; decision is intentional per requirements.
- Removing Layout from pages changes page structure; ensure no page-specific layout dependencies exist.

## Validation Plan
- Visual: header pinned at top, centered nav items with gap.
- Functional: scroll through Home, Archive, About pages; header remains visible and appears only once.
- Build: `npm run build` succeeds, stylesheet <15KB, no runtime JS added.
- Accessibility: keyboard navigation through nav links works, focus visible.

## Open Questions
- None. All design decisions resolved.

## Out of Scope
- Dark mode, search, comments, animations, tags/categories, i18n.
- Changing header width to full viewport.
- Re-introducing hide-on-scroll behavior.
