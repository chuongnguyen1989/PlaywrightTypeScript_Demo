// CartPage.ts
import { Page, Locator } from '@playwright/test';

export class CartPage {
   readonly page: Page;
   readonly placeOrderButton: Locator;
   readonly nameInput: Locator;
   readonly countryInput: Locator;
   readonly cityInput: Locator;
   readonly cardInput: Locator;
   readonly monthInput: Locator;
   readonly yearInput: Locator;

   constructor(page: Page) {
      this.page = page;
      this.placeOrderButton = page.locator('button', { hasText: 'Place Order' });
      this.nameInput = page.locator('#name');
      this.countryInput = page.locator('#country');
      this.cityInput = page.locator('#city');
      this.cardInput = page.locator('#card');
      this.monthInput = page.locator('#month');
      this.yearInput = page.locator('#year');
   }

   async clickPlaceOrderButton() {
      // Wait for the modal to appear
      await this.page.waitForSelector('button:has-text("Place Order")', { state: 'visible' });
      // Now click
      await this.placeOrderButton.click();
      await this.page.waitForTimeout(5000);
   }

   async inputOrderDetails(name: string, country: string, city: string, card: string, month: string, year: string) {
      await this.page.fill('#name', name);
      await this.page.fill('#country', country);
      await this.page.fill('#city', city);
      await this.page.fill('#card', card);
      await this.page.fill('#month', month);
      await this.page.fill('#year', year);
   }
}