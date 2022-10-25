const { Builder, By, Key } = require("selenium-webdriver");

var should = require("chai").should();

//mocha
describe("Add todo tests", () => {
  it("successfully adds a new todo to application", async () => {
    //launch the browser
    let driver = await new Builder().forBrowser("firefox").build();

    //navigate to our application
    await driver.get("https://lambdatest.github.io/sample-todo-app/");

    //add a todo
    await driver
      .findElement(By.id("sampletodotext"))
      .sendKeys("Learn Selenium", Key.RETURN);

    //assert
    let todoText = await driver
      .findElement(By.xpath("//li[last()]"))
      .getText()
      .then(function (value) {
        return value;
      });

    //assert using chai
    todoText.should.equal("Learn Selenium");

    //close the browser
    await driver.quit();
  });
});
