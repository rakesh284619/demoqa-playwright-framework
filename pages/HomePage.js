const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.bookStoreCard = page.locator('.card-body', { hasText: 'Book Store Application' });
  }

  async goto() {
    await this.page.goto('https://demoqa.com/', { waitUntil: 'domcontentloaded' });
  }

  async goToBookStoreApplication() {
    await this.bookStoreCard.click();
  }
}

module.exports = { HomePage };
