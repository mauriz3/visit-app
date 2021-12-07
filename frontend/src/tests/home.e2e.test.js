import puppeteer from "puppeteer";

describe("Home page tests", () => {
  let browser;
  let page;
  const debug = false;
  const baseURL = `http://${debug ? '127.0.0.1:3000' : '0.0.0.0'}/`;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: debug ? false : true,
      slowMo: debug ? 150 : 0 // slow down by 150ms
    });
    page = await browser.newPage();
  });

  test("home contains the Home text", async () => {
    await page.goto(baseURL);
    await page.waitForSelector("#home-title");
    const text = await page.$eval("#home-title", (e) => e.textContent);
    expect(text).toContain("Home");
  });

  test("welcome text is present", async () => {
    await page.waitForSelector("#welcome-message");
  });

  test("click on login go to the login page", async () => {
    await page.click('#login-link')
    await page.waitForSelector("#login-title");
  });

  test("click on signup go to the signup page", async () => {
    await page.goto(baseURL);
    await page.click('#signup-link')
    await page.waitForSelector("#signup-title");
  });

  afterAll(() => browser.close());
});