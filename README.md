# Parabank Signup Automation

This repository contains a Playwright + Cucumber BDD automation suite for the ParaBank signup and login flow.

## Structure

- `features/signup.feature` - BDD feature describing the signup and login scenario.
- `steps/signup.steps.js` - Cucumber step definitions using Playwright and Page Object Model.
- `pages/registerPage.js` - Registration page object.
- `pages/loginPage.js` - Login page object.
- `pages/dashboardPage.js` - Dashboard page object that extracts the displayed balance.
- `TestCases.xlsx` - Excel test case documentation.
- `login-dashboard.png` - Screenshot captured after successful login.

## Run the test

1. Install dependencies:

```bash
npm install
npx playwright install chromium
```

2. Execute the scenario:

```bash
npm test
```

## Notes

- The automation generates a random user each run to avoid registration collisions.
- After login, the script captures the first visible dollar amount displayed on the dashboard and saves a screenshot to `login-dashboard.png`.
