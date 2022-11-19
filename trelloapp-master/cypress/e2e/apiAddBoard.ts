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
});
