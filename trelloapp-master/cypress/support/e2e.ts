import { addBoard } from "./commands/addBoard";
import { takeElement } from "./commands/takeElement";
import { login } from "./commands/login";
import { apiAddBoard } from "./commands/apiAddBoard";

Cypress.Commands.add("addBoard", addBoard);
Cypress.Commands.add("takeElement", takeElement);
Cypress.Commands.add("login", login);
Cypress.Commands.add("apiAddBoard", apiAddBoard);

beforeEach(() => {
  cy.session("loginSequence", () => {
    cy.login("berezhnoy.tim@gmail.com", "31887");
  });
});
