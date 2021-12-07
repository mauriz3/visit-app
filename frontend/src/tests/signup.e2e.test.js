import puppeteer from "puppeteer";

describe("Signup tests", () => {
  let browser;
  let page;
  const debug = false;
  const baseURL = `http://${debug ? '127.0.0.1:3000' : '0.0.0.0'}/signup`;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto(baseURL);
  });

  test("Signup page contains the Signup title", async () => {
    await page.waitForSelector("#signup-title");
    const text = await page.$eval("#signup-title", (e) => e.textContent);
    expect(text).toContain("Sign up");
  });

  test("do not signup if no credentials at all", async () => {
    await page.click("#signup-button");
    await page.waitForSelector(".Toastify__toast-body > div:last-child");
    const text = await page.$eval(".Toastify__toast-body > div:last-child", (e) => e.textContent);
    expect(text).toContain('{"username":["This field may not be blank."],"password":["This field may not be blank."]}');
  });

  test("do not signup if no password credential", async () => {
    await page.click("#username");
    await page.type("#username", "userWithoutPassword");
    await page.click("#signup-button");
    await page.waitForSelector(".Toastify__toast-body > div:last-child");
    const text = await page.$eval(".Toastify__toast-body > div:last-child", (e) => e.textContent);
    expect(text).toContain('{"password":["This field may not be blank."]}');
  });

  test("do not signup if no user credential", async () => {
    await page.click("#password");
    await page.type("#password", "passwordWithoutUser");
    await page.click("#signup-button");
    await page.waitForSelector(".Toastify__toast-body > div:last-child");
    const text = await page.$eval(".Toastify__toast-body > div:last-child", (e) => e.textContent);
    expect(text).toContain('{"username":["This field may not be blank."]}');
  });

  test("click on login go to the login page", async () => {
    await page.click('#login-link')
    await page.waitForSelector("#login-title");
  });

  afterAll(() => browser.close());
});