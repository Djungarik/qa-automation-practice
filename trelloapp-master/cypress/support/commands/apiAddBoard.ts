declare global {
  namespace Cypress {
    interface Chainable {
      apiAddBoard: typeof apiAddBoard;
    }
  }
}

export const apiAddBoard = (input: string) => {
  let boardId;
  cy.request({
    method: "POST",
    url: "/api/boards",
    body: {
      name: input,
    },
  }).then((response) => {
    boardId = response.body.id;

    expect(response.status).to.eq(201);
    cy.wrap(boardId);
  });
  return boardId;
};
