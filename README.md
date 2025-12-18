# Minimal Eleventy Blog — Local setup

This repository is a minimal Eleventy-based blog. This README explains how to build and run the site locally for testing.

Prerequisites
- Node.js (LTS recommended) and npm installed.

Install dependencies
Open a PowerShell terminal in the repository root and run:

```powershell
npm install
```

Build the static site
This generates the site into the `_site` folder:

```powershell
npm run site:build
```

Serve the site locally (dev server)
This runs Eleventy's dev server with watch mode. It will print a local URL (for example `http://localhost:8080`).

```powershell
npm run site:start
```

Notes
- Eleventy input is `site` and output is `_site` (see `.eleventy.js`).
- There's a small TypeScript project in `src/`. To compile it run:

```powershell
npm run build
```

Publishing to GitHub Pages
- A simple manual flow:
  1. Build the site (`npm run site:build`).
  2. Push the generated `_site` to a branch configured for GitHub Pages (or use an action to deploy).

If you want, I can add a GitHub Actions workflow to automatically build and push `_site` to GitHub Pages on pushes to `main`.

Troubleshooting
- If `npm run site:start` fails, ensure dependencies are installed and that Node.js is supported (use an LTS release).
- If the port is in use, Eleventy will usually print an error — stop the process using that port or specify a different port using ELEVENTY_PORT environment variable.

Drafts & hidden posts

This project supports hiding work-in-progress posts with front matter flags. Add any of the following to a post's YAML front matter to keep it out of public lists:

- `draft: true` — marks the post as a draft.
- `hidden: true` — marks the post as hidden.
- `published: false` — explicitly marks the post as not published.

Behavior:
- Posts with any of these flags are excluded from the `posts` collection and will not appear in the `/blog/` listing.
- During the Eleventy build the draft page may still be processed and written, but an `afterBuild` cleanup removes the generated files from `_site` so drafts are not present in the final output.

Recommended workflow:
- Locally: use `draft: true` while you work on a post so it doesn't show up in listings. You can preview the page by temporarily removing the flag or by viewing the generated page before the cleanup (not usually needed).
- Publishing: remove `draft: true` (and any other hide flags) from the post's front matter, then build and deploy.
- Source control: consider keeping drafts on feature branches and only merge into your main branch when ready to publish.

Example front matter to hide a post:

```yaml
---
title: "WIP: New post"
date: 2025-12-18
draft: true
layout: base.njk
---
```

Want me to add a short note in the repository's CONTRIBUTING or add a GitHub Action that fails if drafts are accidentally merged into `main`? I can add that if you'd like.
