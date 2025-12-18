const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  // Keep a list of output paths to remove after Eleventy writes files
  const draftOutputPaths = [];

  // Adds a readableDate filter usable in Nunjucks/Liquid templates.
  // Formats a date as: 18 December 2025 (day numeric, full month name, full year)
  eleventyConfig.addFilter("readableDate", function(dateObj) {
    if (!dateObj) return "";
    // Ensure we have a JS Date
    const d = (dateObj instanceof Date) ? dateObj : new Date(dateObj);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  });

  // ISO date (YYYY-MM-DD) for machine-friendly datetime attributes (use local date parts to avoid timezone shifts)
  eleventyConfig.addFilter("isoDate", function(dateObj) {
    if (!dateObj) return "";
    const d = (dateObj instanceof Date) ? dateObj : new Date(dateObj);
    if (isNaN(d)) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  // Create a 'posts' collection sorted newest-first from files under site/posts/**
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getAllSorted().filter(function(item) {
      const p = item.inputPath || "";
      // Only include files from the posts directory
      const isPostPath = p.indexOf('/posts/') !== -1 || p.indexOf('\\\\posts\\\\') !== -1;
      if (!isPostPath) return false;

      // Exclude drafts/hidden/unpublished via front matter flags
      const data = item.data || {};
      if (data.draft === true) {
        // record expected output directory for later removal
        if (item.url) {
          const urlPath = String(item.url).replace(/^\//, '');
          const outDir = path.join(process.cwd(), '_site', urlPath);
          draftOutputPaths.push(outDir);
        }
        return false;
      }
      if (data.hidden === true) {
        if (item.url) {
          const urlPath = String(item.url).replace(/^\//, '');
          const outDir = path.join(process.cwd(), '_site', urlPath);
          draftOutputPaths.push(outDir);
        }
        return false;
      }
      if (data.published === false) {
        if (item.url) {
          const urlPath = String(item.url).replace(/^\//, '');
          const outDir = path.join(process.cwd(), '_site', urlPath);
          draftOutputPaths.push(outDir);
        }
        return false;
      }

      return true;
    }).sort(function(a, b) {
      return (b.date || 0) - (a.date || 0);
    });
  });

  // After Eleventy finishes writing files, remove any drafts that we recorded
  eleventyConfig.on('afterBuild', () => {
    draftOutputPaths.forEach((outDir) => {
      try {
        // If outDir points to a directory, remove it entirely; otherwise remove the file
        if (fs.existsSync(outDir)) {
          fs.rmSync(outDir, { recursive: true, force: true });
          console.log(`Removed draft output: ${outDir}`);
        } else if (fs.existsSync(outDir + path.sep + 'index.html')) {
          // sometimes url maps to a directory; try removing the index.html
          fs.rmSync(outDir + path.sep + 'index.html', { force: true });
          console.log(`Removed draft output file: ${path.join(outDir, 'index.html')}`);
        }
      } catch (err) {
        console.error(`Error removing draft output ${outDir}:`, err);
      }
    });
  });

  return {
    dir: {
      input: "site",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
