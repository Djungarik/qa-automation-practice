/// <reference types="cypress" />
describe("Test with backend", () => {
  beforeEach("login to the app", () => {
    cy.intercept({ method: "Get", path: "tags" }, { fixture: "tags.json" });

    cy.loginToApplication();
  });

  it("verify correct request and response", () => {
    cy.intercept("POST", "**/articles").as("postArticles");

    cy.contains("New Article").click();
    cy.get('[ng-reflect-name="title"]').type("This is a title3");
    cy.get('[ng-reflect-name="description"]').type("This is a description");
    cy.get('[ng-reflect-name="body"]').type("This is a body of the article");
    cy.contains("Publish Article").click();

    cy.wait("@postArticles");
    cy.get("@postArticles").then((xhr) => {
      console.log(xhr);
      expect(xhr.state).to.be.oneOf(["Complete", "Received"]);
      expect(xhr.request.body.article.body).to.equal(
        "This is a body of the article"
      );
      expect(xhr.response.statusCode).to.equal(307);
    });
  });
  it("intercepting and modifying the request and response", () => {
    cy.intercept("POST", "**/articles", (req) => {
      req.body.article.body = "This is a body of the article2";
    }).as("postArticles");

    cy.contains("New Article").click();
    cy.get('[ng-reflect-name="title"]').type("This is a title5");
    cy.get('[ng-reflect-name="description"]').type("This is a description");
    cy.get('[ng-reflect-name="body"]').type("This is a body of the article");
    cy.contains("Publish Article").click();

    cy.wait("@postArticles");
    cy.get("@postArticles").then((xhr) => {
      console.log(xhr);
      expect(xhr.state).to.be.oneOf(["Complete", "Intercepted"]);
      expect(xhr.request.body.article.body).to.equal(
        "This is a body of the article2"
      );
      expect(xhr.response.statusCode).to.equal(307);
    });
  });

  it("should give tags with routing object", () => {
    cy.get(".tag-list")
      .should("contain", "cypress")
      .and("contain", "automation")
      .and("contain", "testing");
  });

  it("verify global feed likes count", () => {
    cy.intercept("GET", "**/articles*", { fixture: "articles.json" });
    cy.intercept("GET", "**/articles/feed*", {
      articles: [],
      articlesCount: 0,
    });

    cy.contains("Global Feed").click();

    cy.get("app-article-list button").then((listOfButtons) => {
      expect(listOfButtons[0]).to.contain("1");
      expect(listOfButtons[1]).to.contain("5");
    });

    cy.fixture("articles").then((file) => {
      const articleLink = file.articles[1].slug;
      cy.intercept("POST", `**/articles/${articleLink}/favorite`, file);
    });

    cy.get("app-article-list button").eq(1).click().should("contain", "6");
  });

  it("delete a new article in a global feed", () => {
    const articleTitleNumber = Math.floor(Math.random() * 1000);

    const bodyRequest = {
      article: {
        tagList: [],
        title: `Request from API${articleTitleNumber}`,
        description: "API testing",
        body: "Angular",
      },
    };

    cy.get("@token").then((token) => {
      cy.request({
        url: `${Cypress.env("apiUrl")}articles/`,
        headers: { Authorization: `Token ${token}` },
        method: "POST",
        body: bodyRequest,
      }).then((response) => {
        expect(response.status).to.equal(200);
      });

      cy.contains("Global Feed").click();
      cy.get(".article-preview").first().click();
      cy.get(".article-actions").contains("Delete Article").click();

      cy.wait(500);

      cy.request({
        url: `${Cypress.env("apiUrl")}articles?limit=10&offset=0`,
        headers: { Authorization: `Token ${token}` },
        method: "GET",
      })

        .its("body")
        .then((body) => {
          expect(body.articles[0].title).not.to.equal(
            `Request from API${articleTitleNumber}`
          );
        });
    });
  });

  it("write comments in a global feed with request", () => {
    cy.intercept("GET", "**/articles*", { fixture: "articles.json" });
    cy.intercept("GET", "**/articles/feed*", {
      articles: [],
      articlesCount: 0,
    });

    cy.get("@token").then((token) => {
      const commentRequest = { comment: { body: "comment from request" } };
      //Post articles and then comments
      //POST articles
      //...
      cy.fixture("articles").then((file) => {
        const articleLink = file.articles[0].slug;
        cy.request({
          url: `${Cypress.env("apiUrl")}articles/${articleLink}/comments`,
          method: "POST",
          headers: { Authorization: `Token ${token}` },
          body: commentRequest,
        });
      });

      cy.contains("Global Feed").click();

      cy.contains("This is a title3").click();

      cy.get("app-article-comment").should(
        "contain",
        commentRequest.comment.body
      );
    });
  });

  it("verify comments in a global feed", () => {
    cy.intercept("GET", "**/articles*", { fixture: "articles.json" });
    cy.intercept("GET", "**/articles/feed*", {
      articles: [],
      articlesCount: 0,
    });

    cy.contains("Global Feed").click();

    cy.fixture("articles").then((file) => {
      const articleLink = file.articles[0].slug;
      const articleTitle = file.articles[0].title;

      cy.contains(articleTitle).click();

      cy.intercept("GET", `**/api/articles/${articleLink}/comments`).as(
        "getComments"
      );
      const comment = "test comment";
      cy.get("textarea").click().type(comment);
      cy.contains("Post Comment").click();

      cy.wait("@getComments");
      cy.get("@getComments").then((xhr) => {
        cy.wait(500);
        expect(xhr.response.statusCode).to.equal(200);
        expect(xhr.response.body.comments[1].body).to.equal(comment);
      });

      cy.get(".mod-options").click({ multiple: true });
    });
  });
});
