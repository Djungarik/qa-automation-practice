/// <reference types="cypress" />

it("creates a board", () => {
  cy.visit("/");

  // cy.addBoard("new board");

  cy.takeElement("board-item").eq(0).click();
});
