module.exports = function(eleventyConfig) {
  // Copy the assets folder (css, images, etc.) from the input directory to the output
  // Use an explicit mapping to ensure copy works correctly with custom input dir
  eleventyConfig.addPassthroughCopy({ "site/assets": "assets" });

  return {
    dir: {
      input: "site",
      includes: "_includes",
      output: "_site"
    }
  };
};