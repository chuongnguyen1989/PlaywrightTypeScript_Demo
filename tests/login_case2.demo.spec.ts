import { test } from '@playwright/test';
import { readCSV } from '../utils/csvReader';
import { LoginPage } from '../pages/LoginPage';

type LoginData = {
  username: string;
  password: string;
  run: string;
};

// Make sure readCSV returns an array of objects synchronously.
// If it's async, wrap this in an async IIFE and await it.
const loginInvalidData = readCSV('test-data/invalidData.csv') as LoginData[];

for (const invaliddata of loginInvalidData) {
  // Normalize the run flag to avoid whitespace/casing issues
  if (invaliddata.run && invaliddata.run.trim().toLowerCase() === 'true') {
    test(`Login invalid user - ${invaliddata.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.gotoLoginForm();
      await loginPage.loginInvalidUser(invaliddata.username, invaliddata.password);

      // Optional: validate expected outcome
      // e.g. check error message matches invaliddata.expected
      // await expect(loginPage.errorMessage).toContainText(invaliddata.expected);
    });
  }
}
