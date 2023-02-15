/// <reference types="cypress" />

describe("API testing", () => {
  it("creates a board", () => {
    cy.request({
      method: "POST",
      url: "/api/boards",
      body: {
        name: "space travel plan",
      },
    }).then(({ status }) => {
      expect(status).to.eq(201);
    });
  });

  it("deletes a board", () => {
    cy.apiAddBoard("some cool project").then((id) => {
      cy.request({
        method: "DELETE",
        url: `/api/boards/${id}`,
      }).then(({ status }) => {
        expect(status).to.eq(200);
      });
    });
  });
});
