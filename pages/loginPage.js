class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC';
  }

  async goto() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
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
