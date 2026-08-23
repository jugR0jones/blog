# Repository Guidelines

`F:\Experiments\blog` is a personal blog built with Vue and deployed as a static site — pages are pre-rendered at build time, with no backend or API. The repo currently holds only this guide; the application scaffold lands in the first commits. The conventions below are the agreed defaults until the codebase settles.

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

## Testing Guidelines

- Vitest + Vue Test Utils for component tests.
- Test files live in `tests/<Component>.spec.js`; test names describe the expected behavior (e.g., `renders the post title from frontmatter`).
- Run `npm test` before committing; keep the build green.

## Commit & Pull Request Guidelines

- Git history has one initial commit so far. Use concise imperative subjects, e.g., `content: add hello-world post`.
- Pull requests: describe the change and affected pages; include screenshots for UI changes.

## Deployment

- `dist/` is fully static and can be hosted anywhere (GitHub Pages, Netlify, S3 + CloudFront). If the site is hosted under a subpath, set `base` in `vite.config.js`.
