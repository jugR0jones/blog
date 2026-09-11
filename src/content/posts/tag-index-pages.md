---
title: Tag Index Pages at Compile Time
slug: tag-index-pages
date: 2026-09-11
summary: How we generate a static page for each tag at build time using Vue 3 and Vite.
tags: vue, javascript, frontend, build
---

# Tag Index Pages at Compile Time

We now generate a static page for every unique tag found in the blog posts at build time.

## How it works

1. **Data extraction at build time**
   - `useTagMap.js` uses `import.meta.glob('/src/content/posts/*.md', { as: 'raw', eager: true })` to load all Markdown files during the Vite build.
   - Frontmatter is parsed for `title`, `slug`, `date`, `summary`, and `tags`.

2. **Tag map construction**
   - Posts are grouped by tag into a `Map<tag, Post[]>`.
   - Tags are normalised to lower-case and trimmed.

3. **Static routes**
   - `src/pages/Tags.vue` lists all tags with post counts.
   - `src/pages/TagDetail.vue` displays posts for a given tag using the existing `PostCard` component.

4. **Reuse of UI**
   - The tag index page reuses `PostCard.vue` exactly as on the home and posts pages, ensuring consistent markup and accessibility.

## Benefits

- No client-side filtering required.
- All tag pages are available statically after `npm run build`.
- The site builds without errors and passes `npm run lint`, `npm test`, and `npm run a11y`.

The implementation follows the existing Vue 3 + Vite conventions and keeps the build fully static.
