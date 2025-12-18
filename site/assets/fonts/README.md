Atkinson Hyperlegible (local install for this site)

This folder should contain the webfont files used by the site so fonts are served locally and work offline.

Recommended files (preferred formats and filenames):
- AtkinsonHyperlegibleNext-Regular.woff2
- AtkinsonHyperlegibleNext-Regular.woff
- AtkinsonHyperlegibleNext-Regular.ttf
- AtkinsonHyperlegibleNext-Bold.woff2
- AtkinsonHyperlegibleNext-Bold.woff
- AtkinsonHyperlegibleNext-Bold.ttf

Where to get the fonts:
- The Atkinson Hyperlegible font is available from the Braille Institute: https://brailleinstitute.org/freefont
- Some community mirrors and font repositories may provide downloads — verify license before redistributing.

Generating webfont formats (if you have a .ttf or .otf source)
- Using fonttools (Python) to create WOFF and WOFF2:

  # Install fonttools and brotli/woff2 support
  pip install fonttools brotli

  # Create WOFF
  pyftsubset AtkinsonHyperlegible-Regular.ttf --output-file=AtkinsonHyperlegibleNext-Regular.woff --flavor=woff

  # Create WOFF2 (pyftsubset will generate woff2 if brotli available)
  pyftsubset AtkinsonHyperlegible-Regular.ttf --output-file=AtkinsonHyperlegibleNext-Regular.woff2 --flavor=woff2

- Alternatively use Google’s woff2 tool (for woff2 only):
  https://github.com/google/woff2 (build and use `woff2_compress`)

Notes
- Prefer WOFF2 for modern browsers (best compression), include WOFF as a fallback, and include TTF as a final fallback for older browsers.
- Font filenames in this README match the paths referenced by `site/assets/css/styles.css`. If your downloaded files have different names, rename them or update the CSS accordingly.
- Check and comply with the font license before redistributing the font files with your site.

After placing the font files in this folder, rebuild the site:

  npm run site:build

And verify the files are present at `_site/assets/fonts/` and load in the browser (DevTools → Network → filter by "font").
