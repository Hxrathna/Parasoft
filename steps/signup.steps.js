const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
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
  const isHeaded = process.env.HEADED === 'true';
  this.browser = await chromium.launch({ headless: !isHeaded });
  this.context = await this.browser.newContext({
    recordVideo: { dir: 'videos/', size: { width: 1280, height: 720 } }
  });
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.page) {
    try {
      await this.page.close();
      const video = this.page.video();
      if (video) {
        const videoPath = await video.path();
        const targetPath = path.join('videos', 'signup-recording.webm');
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.copyFileSync(videoPath, targetPath);
        console.log('Saved screen recording:', targetPath);
      }
    } catch (error) {
      console.warn('Video save failed:', error.message);
    }
  }
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});

Given('I open the Parabank registration page', async function () {
  this.registerPage = new RegisterPage(this.page);
  await this.registerPage.goto();
});

When('I register a new customer with valid details', async function () {
  this.customer = makeRandomCustomer();
  await this.registerPage.registerCustomer(this.customer);
});

Then('I should be able to sign in with the newly created account', async function () {
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
