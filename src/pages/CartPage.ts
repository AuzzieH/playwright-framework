import { BasePage } from './BasePage.js';
import { slugify } from '../utils/helpers.js';

export class CartPage extends BasePage {
  get cartItems() {
    return this.page.locator('.cart_item');
  }

  get checkoutButton() {
    return this.page.locator('[data-test="checkout"]');
  }

  get continueShoppingButton() {
    return this.page.locator('[data-test="continue-shopping"]');
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async removeItem(productName: string): Promise<void> {
    const slug = slugify(productName);
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }
}
