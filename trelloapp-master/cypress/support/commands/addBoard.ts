declare global {
  namespace Cypress {
    interface Chainable {
      addBoard: typeof addBoard;
    }
  }
}

Cypress.log({
  consoleProps() {
    return {
      "board name": name,
    };
  },
  displayName: "addBoardUi",
  message: name,
  name: "Add new board",
});

/**
 * Creates a new board
 * @param input array of board names
 */
export const addBoard = (input: string) => {
  let boardUrl;

  const log = Cypress.log({
    autoEnd: false,
    consoleProps() {
      return {
        "board name": input,
        "board url": boardUrl,
      };
    },

    displayName: "addBoard",
    message: input,
    name: "Add new board",
  });

  cy.get('[data-cy="create-board"]').click();

  cy.get("[data-cy=new-board-input]").type(`${input}{enter}`);

  cy.url().then((url) => {
    boardUrl = url;
    log.end();
  });
};
