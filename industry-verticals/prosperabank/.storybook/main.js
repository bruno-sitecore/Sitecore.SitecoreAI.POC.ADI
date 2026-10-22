const path = require('path');
module.exports = {
  "stories": ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-essentials'
  ],
  webpackFinal: async config => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      // Webpack 5 no longer polyfills Node.js core modules. Stub `url` when a dependency still references it.
      "url": false
    };
    return config;
  },
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  docs: {
    autodocs: false
  }
};