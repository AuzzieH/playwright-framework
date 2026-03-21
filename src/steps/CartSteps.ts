import { expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage.js';

export class CartSteps {
  constructor(private readonly cartPage: CartPage) {}

  async verifyItemInCart(productName: string): Promise<void> {
    const items = await this.cartPage.getItemNames();
    expect(items).toContain(productName);
  }

  async verifyItemNotInCart(productName: string): Promise<void> {
    const items = await this.cartPage.getItemNames();
    expect(items).not.toContain(productName);
  }

  async verifyCartItemCount(count: number): Promise<void> {
    expect(await this.cartPage.getItemCount()).toBe(count);
  }

  async verifyCartTotal(expectedTotal: number): Promise<void> {
    expect(await this.cartPage.getPriceTotal()).toBe(expectedTotal);
  }

  async verifyCartIsEmpty(): Promise<void> {
    expect(await this.cartPage.getItemCount()).toBe(0);
    expect(await this.cartPage.getPriceTotal()).toBe(0);
  }

  async removeItem(productName: string): Promise<void> {
    await this.cartPage.removeItem(productName);
  }

  async proceedToCheckout(): Promise<void> {
    await this.cartPage.proceedToCheckout();
  }

  async continueShopping(): Promise<void> {
    await this.cartPage.continueShopping();
  }

  async getCartTotal(): Promise<number> {
    return this.cartPage.getPriceTotal();
  }
}
