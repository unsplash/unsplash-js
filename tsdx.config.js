// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
const analyzer = require('rollup-plugin-analyzer');

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    config.plugins.push(analyzer({ summaryOnly: true, hideDeps: true }));
    return config; // always return a config.
  },
};
