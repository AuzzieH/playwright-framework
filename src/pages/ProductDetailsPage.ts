import { BasePage } from './BasePage.js';

export class ProductDetailsPage extends BasePage {
  get productName() {
    return this.page.locator('.inventory_details_name');
  }

  get productPrice() {
    return this.page.locator('.inventory_details_price');
  }

  get addToCartButton() {
    return this.page.locator('[data-test^="add-to-cart"]');
  }

  get backToProductsButton() {
    return this.page.getByTestId('back-to-products');
  }

  get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  async clickFirstProduct(): Promise<void> {
    await this.page.locator('.inventory_item_name').first().click();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
