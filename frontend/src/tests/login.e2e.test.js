import puppeteer from "puppeteer";

describe("Login tests", () => {
  let browser;
  let page;
  const debug = false;
  const baseURL = `http://${debug ? '127.0.0.1:3000' : '0.0.0.0'}/login`;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto(baseURL);
  });

  test("Login page contains the Login title", async () => {
    await page.waitForSelector("#login-title");
    const text = await page.$eval("#login-title", (e) => e.textContent);
    expect(text).toContain("Login");
  });

  test("do not login if no credentials", async () => {
    await page.click("#login-button");
    await page.waitForSelector(".Toastify__toast-body > div:last-child");
    const text = await page.$eval(".Toastify__toast-body > div:last-child", (e) => e.textContent);
    expect(text).toContain('{"password":["This field may not be blank."],"username":["This field may not be blank."]}');
  });

  test("do not login if wrong credentials", async () => {
    await page.click("#username");
    await page.type("#username", "fakeTestUser");
    await page.click("#password");
    await page.type("#password", "fakePasswordUser");
    await page.click("#login-button");
    await page.waitForSelector(".Toastify__toast-body > div:last-child");
    const text = await page.$eval(".Toastify__toast-body > div:last-child", (e) => e.textContent);
    expect(text).toContain('{"non_field_errors":["Unable to log in with provided credentials."]}');
  });

  test("login with good credentials", async () => {
    await page.click("#username");
    await page.type("#username", "testUser");
    await page.click("#password");
    await page.type("#password", "passwordUser");
    await page.click("#login-button");
    await page.waitForSelector("#dashboard-container");
  });

  test("click on signup go to the signup page", async () => {
    await page.click('#signup-link')
    await page.waitForSelector("#signup-title");
  });

  afterAll(() => browser.close());
});