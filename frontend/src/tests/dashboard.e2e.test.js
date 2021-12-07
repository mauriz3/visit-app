import puppeteer from "puppeteer";

describe("Dashboard page tests", () => {
  let browser;
  let page;
  const debug = false;
  const baseURL = `http://${debug ? '127.0.0.1:3000' : '0.0.0.0'}/`;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  test("Logged username is present", async () => {
    await page.goto(baseURL + 'login');
    await page.click("#username");
    await page.type("#username", "testUser");
    await page.click("#password");
    await page.type("#password", "passwordUser");
    await page.click("#login-button");

    await page.waitForSelector("#navbar-username");
    const text = await page.$eval("#navbar-username", (e) => e.textContent);
    expect(text).toContain("testUser");
  });

  test("Get Totals visits before go home and go home", async () => {
    await page.waitForSelector("#total-visits");
    const visitsBeforeGoHome = await page.$eval("#total-visits", (e) => e.textContent);
    await page.click('#navlink-home')
    await page.waitForSelector("#home-title");
    await page.goto(baseURL + 'dashboard');
    await page.waitForSelector("#navbar-username");
    await page.waitForSelector("#total-visits");
    const visitsAfterGoHome = await page.$eval("#total-visits", (e) => e.textContent);
    expect(visitsAfterGoHome).toContain(Number(visitsBeforeGoHome) + 1);
  });

  test("click on logout redirects to the home", async () => {
    await page.click('#navlink-logout')
    await page.waitForSelector("#home-title");
  });

  afterAll(() => browser.close());
});