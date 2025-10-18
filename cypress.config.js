
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  retries: {
    runMode: 0,
    openMode: 2,
  },
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
