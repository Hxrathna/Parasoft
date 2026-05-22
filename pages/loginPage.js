class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC';
  }

  async goto() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    await this._ensureLoginFormVisible();
  }

  async _ensureLoginFormVisible() {
    const usernameInput = await this.page.$('input[name="username"]');
    if (usernameInput) {
      return;
    }

    let logoutLink = await this.page.$('a[href="logout.htm"]');
    if (!logoutLink) {
      logoutLink = await this.page.$('text=Log Out');
    }
    if (logoutLink) {
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        logoutLink.click()
      ]);
    }

    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('input[name="username"]', { timeout: 30000 });
  }

  async login(username, password) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      this.page.click('input[value="Log In"]')
    ]);
  }
}

module.exports = LoginPage;
