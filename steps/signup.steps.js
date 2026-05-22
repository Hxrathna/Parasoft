const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const RegisterPage = require('../pages/registerPage');
const LoginPage = require('../pages/loginPage');
const DashboardPage = require('../pages/dashboardPage');

setDefaultTimeout(60 * 1000);

function makeRandomCustomer() {
  const token = Math.random().toString(36).substring(2, 10);
  return {
    firstName: `Test${token}`,
    lastName: `User${token}`,
    address: '123 Test Street',
    city: 'Testville',
    state: 'TS',
    zipCode: '12345',
    phone: '9998887777',
    ssn: '123456789',
    username: `user_${token}`,
    password: `Pass!${token}`
  };
}

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
});

After(async function () {
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});

Given('I open the Parabank registration page', async function () {
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.goto();
});

When('I register a new customer with valid details', async function () {
  this.customer = makeRandomCustomer();
  await this.registerPage.registerCustomer(this.customer);
});

Then('I should be able to sign in with the newly created account', async function () {
  if (this.context) await this.context.close();
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
  await this.loginPage.login(this.customer.username, this.customer.password);
});

Then('I should see the account balance on the dashboard', async function () {
  this.dashboardPage = new DashboardPage(this.page);
  this.balance = await this.dashboardPage.getAccountBalance();
  console.log('Logged amount on post-login page:', this.balance);
  await this.dashboardPage.takeScreenshot('login-dashboard.png');
});
