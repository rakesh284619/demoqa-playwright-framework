const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.locator('#login');
    this.logoutButton  = page.getByRole('button', { name: /log.?out/i }).first();
  }

  async goto() {
    await this.page.goto('https://demoqa.com/login', { waitUntil: 'domcontentloaded' });
    await expect(this.usernameInput).toBeVisible();
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginSuccess(expectedUsername) {
    await this.page.waitForURL('**/profile', { timeout: 15_000 });
    const usernameValue = this.page.locator('#userName-value');
    await expect(usernameValue).toHaveText(expectedUsername, { timeout: 10_000 });
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await expect(this.logoutButton).toBeVisible({ timeout: 10_000 });
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = { LoginPage };
