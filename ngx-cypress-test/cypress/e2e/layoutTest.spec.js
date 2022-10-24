import { navigateTo } from "../support/page_objects/navigationPage";

beforeEach("open application", () => {
  cy.openHomePage();
});

describe("Layout Stepper", () => {
  it("Steps Test", () => {
    navigateTo.layoutStepperPage();

    cy.get("nb-card-body")
      .contains("next")
      .click();

    cy.get("nb-card-body");
    cy.get("[class='step ng-star-inserted completed']")
      .should("have.css", "color")
      .and("contain", "rgb(51, 102, 255)");

    cy.get("nb-card-body h3").should("contain", "Step content #2");

    cy.get("nb-card-body")
      .contains("prev")
      .click();

    cy.get("nb-card-body h3").should("contain", "Step content #1");
  });
});

describe("Layout Accordion", () => {
  it("Toggle Items", () => {
    navigateTo.layoutAccordionPage();

    cy.contains("Toggle First Item").click();

    cy.get("nb-accordion-item-body")
      .find(">div")
      .should("have.css", "visibility")
      .and("contain", "visible");
  });
});
