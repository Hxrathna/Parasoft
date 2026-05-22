class RegisterPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://parabank.parasoft.com/parabank/register.htm';
  }

  async goto() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  async registerCustomer(customer) {
    await this.page.fill('input[name="customer.firstName"]', customer.firstName);
    await this.page.fill('input[name="customer.lastName"]', customer.lastName);
    await this.page.fill('input[name="customer.address.street"]', customer.address);
    await this.page.fill('input[name="customer.address.city"]', customer.city);
    await this.page.fill('input[name="customer.address.state"]', customer.state);
    await this.page.fill('input[name="customer.address.zipCode"]', customer.zipCode);
    await this.page.fill('input[name="customer.phoneNumber"]', customer.phone);
    await this.page.fill('input[name="customer.ssn"]', customer.ssn);
    await this.page.fill('input[name="customer.username"]', customer.username);
    await this.page.fill('input[name="customer.password"]', customer.password);
    await this.page.fill('input[name="repeatedPassword"]', customer.password);
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      this.page.click('input[value="Register"]')
    ]);
  }
}

module.exports = RegisterPage;
