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

Want me to also add an Action to publish to GitHub Pages on push to `main`? Reply yes and I'll add it and test the configuration locally as far as possible.
