import { test } from '@playwright/test'
import { readCSV } from '../utils/csvReader';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

const loginValidData = readCSV('test-data/validData.csv');   
loginValidData.forEach((data: any) => {
    if (data.run !== 'true') return;
    test(`Login valid data add to cart place order successfully - ${data.username}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginForm();
        await loginPage.loginValidUserAndOrderSamsungS6(data.username, data.password);
        const cartPage = new CartPage(page);
        await cartPage.clickPlaceOrderButton();
        await cartPage.inputOrderDetails(
        'Nguyen Hoang Chuong', // name
        'Vietnam',             // country
        'Ho Chi Minh City',    // city
        '4111111111111111',    // card (example test card number)
        '07',                  // month
        '2028'                 // year
    );
   });
});


