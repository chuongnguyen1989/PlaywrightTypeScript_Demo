import { test } from '@playwright/test'
import { readCSV } from '../utils/csvReader';
import { LoginPage } from '../pages/LoginPage';

const loginValidData = readCSV('test-data/validData.csv');   
loginValidData.forEach((data: any) => {
    if (data.run !== 'true') return;
    test(`Login valid data add to cart successfully - ${data.username}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginForm();
        await loginPage.loginValidUserAndOrderSamsungS6(data.username, data.password);
    });
});


