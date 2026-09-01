const { expect } = require('@playwright/test');
const fs   = require('fs');
const path = require('path');

class BookStorePage {
  constructor(page) {
    this.page        = page;
    this.searchInput = page.locator('#searchBox');
  }

  async openViaMenu() {
    await this.page.getByRole('button', { name: 'Go To Book Store' }).click();
    await this.page.waitForURL('**/books', { waitUntil: 'domcontentloaded' });
  }

  async searchBook(title) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(title);
  }

  async assertBookVisible(title) {
    const bookLink = this.page.locator('a').filter({ hasText: title });
    await expect(bookLink).toBeVisible({ timeout: 10_000 });
  }

  async printBookDetailsToFile(title, outputDir = 'output') {
    const row = this.page
      .locator('tr')
      .filter({ has: this.page.locator('a').filter({ hasText: title }) })
      .first();
    await expect(row).toBeVisible({ timeout: 10_000 });

    const cells         = row.locator('td');
    const bookTitle     = (await cells.nth(1).innerText()).trim();
    const bookAuthor    = (await cells.nth(2).innerText()).trim();
    const bookPublisher = (await cells.nth(3).innerText()).trim();

    const content = [
      `Title     : ${bookTitle}`,
      `Author    : ${bookAuthor}`,
      `Publisher : ${bookPublisher}`,
    ].join('\n');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filePath = path.join(outputDir, 'book_details.txt');
    fs.writeFileSync(filePath, content, 'utf-8');

    console.log(`\n[Book Details]\n${content}\n`);
  }
}

module.exports = { BookStorePage };
