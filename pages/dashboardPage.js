class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async getAccountBalance() {
    await this.page.waitForSelector('text=Accounts Overview', { timeout: 30000 });
    const text = await this.page.textContent('body');
    const match = text && text.match(/\$[0-9,]+\.[0-9]{2}/);
    return match ? match[0] : 'BALANCE_NOT_FOUND';
  }

  async takeScreenshot(path) {
    await this.page.screenshot({ path, fullPage: true });
  }
}

module.exports = DashboardPage;
