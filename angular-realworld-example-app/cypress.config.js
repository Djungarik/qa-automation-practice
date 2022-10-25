const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,

  env: {
    username: "bereznoy.timyr@gmail.com",
    password: "3110200231887Befezda",
    apiUrl: "https://api.realworld.io/api/",
  },

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // const fs = require("fs-extra");
      // const path = require("path");
      // function getConfigurationByFile(file) {
      //   const pathToConfigFile = path.resolve(
      //     "cypress",
      //     "config",
      //     `${file}.json`
      //   );
      //   return fs.readJson(pathToConfigFile);
      // }
      // const file = config.env.configFile;
      // return getConfigurationByFile(file);
    },

    baseUrl: "http://localhost:4200",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    excludeSpecPattern: ["**/1-getting-started/*", "**/2-advanced-examples/*"],
  },
});
