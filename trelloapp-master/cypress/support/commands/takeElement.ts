declare global {
  namespace Cypress {
    interface Chainable {
      takeElement: typeof takeElement;
    }
  }
}

export const takeElement = (input: string) => {
  let element: JQuery<HTMLElement> | HTMLElement[];
  let count: number;

  const log = Cypress.log({
    consoleProps() {
      return {
        selector: input,
        Yielded: element,
        Elements: count,
      };
    },
    displayName: "takeElemets",
    name: "Get by [data-cy] attribute",
  });

  return cy.get(`[data-cy=${input}]`, { log: false }).then(($el) => {
    element = Cypress.dom.getElements($el);
    count = $el.length;
    log.set({ $el });
    log.snapshot().end();
  });

  cy.on("fail", (err) => {
    log.end();
    throw err;
  });
};
