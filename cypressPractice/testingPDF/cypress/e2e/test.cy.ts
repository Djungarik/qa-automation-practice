describe("download function", () => {
  it("downloads a simple PDF file", () => {
    cy.visit("/cypressPractice/testingPDF/app/index.html");

    cy.contains("simple").click();

    cy.readFile("cypress/downloads/simple.pdf");
    cy.task("readPdf", "cypress/downloads/simple.pdf").should(
      "contain",
      "Just a simple sentence"
    );

    cy.task("countPages", "cypress/downloads/simple.pdf").should("be.equal", 1);
  });

  it("downloads a complex PDF file", () => {
    cy.visit("/cypressPractice/testingPDF/app/index.html");

    cy.contains("complex").click();

    cy.readFile("cypress/downloads/complex.pdf");
    cy.task("readPdf", "cypress/downloads/complex.pdf").should(
      "contain",
      "Statement of Work "
    );

    cy.task("countPages", "cypress/downloads/complex.pdf").should(
      "be.equal",
      6
    );
  });
});
