const AxeBuilder = require("@axe-core/webdriverio").default;
const assert = require("assert");
fs = require("fs");

describe("Accessibility Test", () => {
  it("should get the accessibility results from a page", () => {
    const builder = new AxeBuilder({ client: browser });

    //open property manager site and log in
    browser.url("./");
    const loginButton = browser.$("//button");
    loginButton.click();
    $("[name='email']").setValue("396025@ls.com");
    $("[name='password']").setValue("mow814");
    $("button=Continue").click();

    //collect axe results
    const result = browser.call(() => {
      return builder.analyze();
    });

    console.log("got", result.violations[0]);
    fs.writeFileSync("violations-axe-webdriverio.txt", JSON.stringify(result));

    expect(result.violations).toHaveLength(0);
  });
});
