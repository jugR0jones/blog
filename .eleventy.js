module.exports = function(eleventyConfig) {
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
      if (data.draft === true) return false;
      if (data.hidden === true) return false;
      if (data.published === false) return false;

      return true;
    }).sort(function(a, b) {
      return (b.date || 0) - (a.date || 0);
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
