import { onDatepickerPage } from "../support/page_objects/datePickerPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { navigateTo } from "../support/page_objects/navigationPage";
import { onSmartTable } from "../support/page_objects/smartTablePage";

describe("Test with Page Objects", () => {
  beforeEach("open application", () => {
    cy.openHomePage();
  });

  it("verify navigation across the pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.toasterPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
  });

  it("should submit Inline and Basic Form and select tomorrow date in the calendar", () => {
    navigateTo.formLayoutsPage();

    onFormLayoutsPage.submitInlineFormWithNameAndEmail(
      "Timur",
      "test@test.com"
    );

    onFormLayoutsPage.submitBasicFormWithNameAndEmail(
      "test@test.com",
      "password"
    );

    navigateTo.datepickerPage();
    onDatepickerPage.selectCommonDatepickerDateFromToday(10);
    // onDatepickerPage.selectDatepickerWithRangeFromToday(3,5);
    navigateTo.smartTablePage();
    onSmartTable.addNewRecordWithFirstNameAndLastName("Timur", "Berezhnoy");
    onSmartTable.updateAgeByFirstName("Timur", "20");
    onSmartTable.deleteRowByIndex(1);
  });
});
