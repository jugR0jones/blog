module.exports = function(eleventyConfig) {
  return {
    dir: {
      input: "site",
      includes: "_includes",
      output: "_site"
    }
  };
};