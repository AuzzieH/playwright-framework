import { BasePage } from './BasePage.js';
import { slugify } from '../utils/helpers.js';

export class InventoryPage extends BasePage {
  get inventoryItems() {
    return this.page.locator('.inventory_item');
  }

  get sortDropdown() {
    return this.page.getByTestId('product-sort-container');
  }

  get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  get cartLink() {
    return this.page.locator('.shopping_cart_link');
  }

  get pageTitle() {
    return this.page.getByText('Products', { exact: true });
  }

  async addToCartByName(productName: string): Promise<void> {
    const slug = slugify(productName);
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async removeFromCartByName(productName: string): Promise<void> {
    const slug = slugify(productName);
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  async getCartCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible())) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text ?? '0', 10);
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const texts = await this.page.locator('.inventory_item_price').allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
