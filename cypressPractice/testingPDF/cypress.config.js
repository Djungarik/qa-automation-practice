const { defineConfig } = require("cypress");
const { readPdf } = require("cypress/scripts/readPdf.ts");
const { countPages } = require("cypress/scripts/countPages.ts");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        readPdf,
        countPages,
      });
    },

    baseUrl: "http://localhost:5500",
  },
});
