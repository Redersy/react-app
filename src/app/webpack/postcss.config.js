const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    postcssPresetEnv({
      stage: 3,
      autoprefixer: { grid: true }
    }),
    "postcss-normalize",
    "cssnano"
  ]
};
