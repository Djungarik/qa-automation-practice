import { addBoard } from "./commands/addBoard";
import { takeElement } from "./commands/takeElement";
import { login } from "./commands/login";

Cypress.Commands.add("addBoard", addBoard);
Cypress.Commands.add("takeElement", takeElement);
Cypress.Commands.add("login", login);

beforeEach(() => {
  cy.session("loginSequence", () => {
    cy.login("berezhnoy.tim@gmail.com", "31887");
  });
});
