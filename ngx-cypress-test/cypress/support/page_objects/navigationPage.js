function selectGroupMenuItem(groupName) {
  cy.contains("a", groupName).then(menu => {
    cy.wrap(menu)
      .find(".expand-state g g")
      .invoke("attr", "data-name")
      .then(attr => {
        if (attr.includes("left")) {
          cy.wrap(menu).click();
        }
      });
  });
}

export class NavigationPage {
  formLayoutsPage() {
    selectGroupMenuItem("Forms");
    cy.contains("Form Layouts").click();
  }

  layoutStepperPage() {
    selectGroupMenuItem("Layout");
    cy.contains("Stepper").click();
  }
  layoutAccordionPage() {
    selectGroupMenuItem("Layout");
    cy.contains("Accordion").click();
  }

  datepickerPage() {
    selectGroupMenuItem("Forms");
    cy.contains("Datepicker").click({ force: true });
  }

  toasterPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Toastr").click();
  }

  smartTablePage() {
    selectGroupMenuItem("Tables & Data");
    cy.contains("Smart Table").click();
  }

  treeGridPage() {
    selectGroupMenuItem("Tables & Data");
    cy.contains("Tree Grid").click();
  }

  tooltipPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Tooltip").click();
  }

  dialogPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Dialog").click();
  }

  popoverPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Popover").click();
  }
}

export const navigateTo = new NavigationPage();
