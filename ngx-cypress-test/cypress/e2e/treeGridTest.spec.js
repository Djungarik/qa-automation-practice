import { navigateTo } from "../support/page_objects/navigationPage";

beforeEach("open application", () => {
  cy.openHomePage();
});

describe("Tables & Data Tree Grid", () => {
  it("Search for docs", () => {
    navigateTo.treeGridPage();

    cy.get("input").then(input => {
      const doc = "project-1";
      cy.wrap(input).type(doc);

      cy.get("tbody").contains(doc);
    });
  });
});
