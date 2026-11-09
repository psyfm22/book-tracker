
const { Builder, By } = require("selenium-webdriver");
const assert = require("node:assert");

describe("Homepage Tests", function () {

    // Increase Mocha's timeout to 60 seconds
    this.timeout(60000);

    let driver;

    // Chrome opens before the test suite
    before(async function () {
        driver = await new Builder()
            .forBrowser("chrome")
            .build();
    });

    // We close the chrome after the tests have finished
    after(async function () {
        await driver.quit();
    });

    // Check page title
    it("should have the correct page title", async function () {

        await driver.get("http://localhost:5173");

        const title = await driver.getTitle();

        assert.strictEqual(title, "book-tracker");

    });

    it("should display the correct homepage heading", async function () {

    await driver.get("http://localhost:5173");

    const heading = await driver.findElement(By.tagName("h1"));

    const headingText = await heading.getText();
    const isDisplayed = await heading.isDisplayed();

    // First assertion
    assert.strictEqual(headingText, "My Book Tracker");

    // Second assertion
    assert.strictEqual(isDisplayed, true);
    });


    it("should navigate to the Read page", async function () {

    // Open homepage
    await driver.get("http://localhost:5173");

    // Find the To Read button
    const button = await driver.findElement(By.id("read-button"));

    // Click the button
    await button.click();

    const currentUrl = await driver.getCurrentUrl();

    assert.strictEqual(currentUrl, "http://localhost:5173/read");
    });

    it("should navigate to the To Read page", async function () {

    // Open homepage
    await driver.get("http://localhost:5173");

    // Find the To Read button
    const button = await driver.findElement(By.id("to-read-button"));

    // Click the button
    await button.click();

    const currentUrl = await driver.getCurrentUrl();

    assert.strictEqual(currentUrl, "http://localhost:5173/to-read");
    });
});
