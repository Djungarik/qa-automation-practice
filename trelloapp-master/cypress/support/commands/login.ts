declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Logs in with a given user
       * @param email email of the user you want to log in
       * @param password user passwird
       * @example
       * cy.login('filip@example.com', 'i<3slovakia!')
       *
       */
      login: typeof login;
    }
  }
}

export const login = (email: string, password: string) => {
  cy.visit("/");
  cy.get("[data-cy=login-menu]").click();
  cy.get("[data-cy=login-email]").type(email);
  cy.get("[data-cy=login-password]").type(`${password}`);
  cy.get("[data-cy=login]").click();
  cy.location("pathname").should("eq", "/");
};

Cypress.Commands.addAll({ login });
