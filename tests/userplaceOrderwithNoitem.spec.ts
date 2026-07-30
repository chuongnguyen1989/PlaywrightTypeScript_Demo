import { test } from '@playwright/test'
import { readCSV } from '../utils/csvReader';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

const loginValidUserNullCart = readCSV('test-data/validUsernullCart.csv');   
loginValidUserNullCart.forEach((data: any) => {
    if (data.run !== 'true') return;
    test(`Login User that has not added items to cart and verify that user can place order - ${data.username}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginForm();
        await loginPage.loginValidUserWithoutAddingItemToCart(data.username, data.password);
        const cartPage = new CartPage(page);
        await cartPage.clickPlaceOrderButtonCaseNoItemInCart();
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
