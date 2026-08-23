# Repository Guidelines

`F:\Experiments\blog` is a personal blog built with Vue and deployed as a static site — pages are pre-rendered at build time, with no backend or API. The repo currently holds only this guide; the application scaffold lands in the first commits. The conventions below are the agreed defaults until the codebase settles.

## Design Objectives & Budgets

The site is intentionally simple: black text on white, a top menu of plain links (no drop downs), a few images, and code blocks for multiple languages. The static build must be as small as possible to keep data costs low. The objectives and budgets below are agreed defaults that every change must respect.

**Visual & layout**
- Black on white: body text `#1a1a1a` on `#ffffff` (WCAG AAA).
- Menu is top-of-page, plain links only — no drop downs.
- Page ceiling: home, archive, post (`posts/<slug>`), about.
- Readability: body measure 65–75 characters, line-height ~1.6, single typeface family.
- Explicitly out of scope: dark mode, search, comments, animations, tags/categories, i18n.

**Payload budgets (checked at build time)**
- Zero runtime JavaScript by default: pages are fully pre-rendered and do not hydrate. If a script ever becomes genuinely necessary it must be < 5 KB gzipped and justified in the PR.
- One shared stylesheet, < 15 KB total; no CSS frameworks or runtime style injection.
- Transfer budgets: a post page including one image < 150 KB; index and archive pages < 50 KB.
- Typography uses a system font stack only; no web fonts.

**Code blocks & images**
- Code blocks are highlighted at build time (e.g. Shiki, or a pre-built Prism bundle restricted to the languages actually used). No highlighter ships in the runtime.
- Images are WebP or AVIF, < 150 KB each, lazy-loaded when below the fold (`loading="lazy"`), with explicit width and height to prevent layout shift.

**Robustness & discoverability**
- Frontmatter is validated at build time: `title`, `date`, and `slug` are required.
- Broken links are checked at build time; every page sets a canonical URL.
- The build ships `sitemap.xml`, an RSS feed, Open Graph meta tags, and a 404 page.
- Accessibility baseline: semantic HTML (`header`/`nav`/`main`/`article`), alt text on every image, and visible keyboard focus.

## Project Structure

- `src/` — Vue application source.
  - `src/pages/` — one component per route (home, post, archive); blog posts render as static pages at `posts/<slug>`.
  - `src/components/` — shared UI (layout, header, post card).
  - `src/content/posts/` — post content as Markdown files with YAML frontmatter, loaded at build time.
- `public/` — static files served as-is (favicon, `robots.txt`, images).
- `tests/` — unit and component tests, mirroring the unit under test.

## Build, Test, and Development Commands

Toolchain is Vite (standard Vue scaffold); all commands run with npm:

- `npm install` — install dependencies.
- `npm run dev` — start the dev server with hot reload.
- `npm run build` — output the static site to `dist/`.
- `npm run preview` — serve the production build locally to verify output.
- `npm test` — run Vitest unit tests.
- `npm run lint` — run ESLint over the project.

## Coding Style & Naming Conventions

- Vue 3 with the Composition API and `<script setup>` SFCs.
- 2-space indentation, single quotes, semicolons — enforced by ESLint + Prettier (config in `package.json` / `.prettierrc`).
- Naming: components and pages in PascalCase (`PostCard.vue`, `PostDetail.vue`), composables as `useXxx` (`usePosts.js`), variables and functions in camelCase.
- Run `npm run lint` before committing.

## Markdown
- Always explicitly use UTF-8 encoding when writing, appending, or reading local files.
- Never assume the Windows system default (ANSI/CP1252) encoding.
- Check for Byte Order Mark (BOM) patterns before overwriting existing documents.

## Testing Guidelines

- Vitest + Vue Test Utils for component tests.
- Test files live in `tests/<Component>.spec.js`; test names describe the expected behavior (e.g., `renders the post title from frontmatter`).
- Run `npm test` before committing; keep the build green.

## Commit & Pull Request Guidelines

- Git history has one initial commit so far. Use concise imperative subjects, e.g., `content: add hello-world post`.
- Pull requests: describe the change and affected pages; include screenshots for UI changes.

## Deployment

- `dist/` is fully static and can be hosted anywhere (GitHub Pages, Netlify, S3 + CloudFront). If the site is hosted under a subpath, set `base` in `vite.config.js`.
