import { navigateTo } from "../support/page_objects/navigationPage";

beforeEach("open application", () => {
  cy.openHomePage();
});

describe("Dialog Box", () => {
  it("Return Result From Dialog", () => {
    navigateTo.dialogPage();

    cy.contains("Enter Name").click();

    cy.get("input").type("Tim");
    cy.contains("Submit").click();

    cy.get(".result-from-dialog")
      .find("li")
      .should("contain", "Tim");
  });
});

describe("Popover", () => {
  it("Template Popovers", () => {
    navigateTo.popoverPage();

    cy.contains("With tabs").click();

    cy.get("nb-tabset").should("contain", "Such a wonderful day!");
  });
});
