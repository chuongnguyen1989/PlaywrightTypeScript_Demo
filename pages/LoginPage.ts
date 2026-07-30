// LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly navbarLoginLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly modalLoginButton: Locator;
  readonly samsungS6Link: Locator;
  readonly addToCartButton: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Navbar link to open modal
    this.navbarLoginLink = page.locator('#login2');
    // Modal fields
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.modalLoginButton = page.locator('#logInModal').getByRole('button', { name: 'Log in' });
    // Product locator
    this.samsungS6Link = page.getByRole('link', { name: 'Samsung galaxy s6' });
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
    // Cart button locator
    this.cartButton = page.getByText('Cart', { exact: true });
  }

  async gotoLoginForm() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async loginValidUserAndOrderSamsungS6(username: string, password: string) {
    // 1. Open login modal
    await this.navbarLoginLink.click();
    await this.page.locator('#logInModal').waitFor({ state: 'visible' });

    // 2. Fill credentials
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);

    // 3. Click login button
    await this.modalLoginButton.waitFor({ state: 'visible' });
    await this.modalLoginButton.click();

    // 4. Navigate to product and add to cart
    await this.samsungS6Link.waitFor({ state: 'visible' });
    await this.samsungS6Link.click();

    await this.addToCartButton.waitFor({ state: 'visible' });
    await this.addToCartButton.click();
    await this.cartButton.click();
     // Wait for 5 seconds before closing
    await this.page.waitForTimeout(5000);

  }

  async loginInvalidUser(username: string, password: string) {
     // 1. Open login modal
    await this.navbarLoginLink.click();
    await this.page.locator('#logInModal').waitFor({ state: 'visible' });

    // 2. Fill credentials
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);

    // 3. Click login button and verify pop-up
    // 4. Login button is still visible due to login failed  
    await this.modalLoginButton.waitFor({ state: 'visible' });
    await this.modalLoginButton.click();
  }
  
}
