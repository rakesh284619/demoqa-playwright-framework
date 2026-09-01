const { test, expect } = require('@playwright/test');
const { HomePage }      = require('../../pages/HomePage');
const { LoginPage }     = require('../../pages/LoginPage');
const { BookStorePage } = require('../../pages/BookStorePage');

test.describe('DemoQA Book Store - UI', () => {
  let username;
  let password;

  test.beforeAll(() => {
    username = process.env.DEMOQA_USERNAME;
    password = process.env.DEMOQA_PASSWORD;

    if (!username || !password) {
      throw new Error('Set DEMOQA_USERNAME and DEMOQA_PASSWORD in your .env file');
    }
  });

  test('Login, search book, print details and logout', async ({ page }) => {
    const homePage      = new HomePage(page);
    const loginPage     = new LoginPage(page);
    const bookStorePage = new BookStorePage(page);

    const BOOK_TITLE = 'Learning JavaScript Design Patterns';

    await homePage.goto();
    await homePage.goToBookStoreApplication();

    await loginPage.goto();
    await loginPage.login(username, password);

    await loginPage.assertLoginSuccess(username);

    await bookStorePage.openViaMenu();

    await bookStorePage.searchBook(BOOK_TITLE);

    await bookStorePage.assertBookVisible(BOOK_TITLE);

    await bookStorePage.printBookDetailsToFile(BOOK_TITLE, 'output');

    await loginPage.logout();

    await expect(page).toHaveURL(/.*\/login/, { timeout: 10_000 });
  });
});
