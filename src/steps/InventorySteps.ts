import { expect } from '@playwright/test';
import type { InventoryPage } from '../pages/InventoryPage.js';

export class InventorySteps {
  constructor(private readonly inventoryPage: InventoryPage) {}

  async verifyProductCount(count: number): Promise<void> {
    await expect(this.inventoryPage.inventoryItems).toHaveCount(count);
  }

  async verifyPageTitle(title: string): Promise<void> {
    await expect(this.inventoryPage.pageTitle).toHaveText(title);
  }

  async sortByNameAscending(): Promise<void> {
    await this.inventoryPage.sortBy('az');
  }

  async sortByNameDescending(): Promise<void> {
    await this.inventoryPage.sortBy('za');
  }

  async sortByPriceLowToHigh(): Promise<void> {
    await this.inventoryPage.sortBy('lohi');
  }

  async sortByPriceHighToLow(): Promise<void> {
    await this.inventoryPage.sortBy('hilo');
  }

  async verifySortedByNameAscending(): Promise<void> {
    const names = await this.inventoryPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  }

  async verifySortedByNameDescending(): Promise<void> {
    const names = await this.inventoryPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  }

  async verifySortedByPriceLowToHigh(): Promise<void> {
    const prices = await this.inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  }

  async verifySortedByPriceHighToLow(): Promise<void> {
    const prices = await this.inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  }

  async addItemToCart(productName: string): Promise<void> {
    await this.inventoryPage.addToCartByName(productName);
  }

  async removeItemFromCart(productName: string): Promise<void> {
    await this.inventoryPage.removeFromCartByName(productName);
  }

  async verifyCartBadgeCount(count: number): Promise<void> {
    expect(await this.inventoryPage.getCartCount()).toBe(count);
  }

  async verifyProductsDisplayed(productNames: string[]): Promise<void> {
    const names = await this.inventoryPage.getProductNames();
    for (const name of productNames) {
      expect(names).toContain(name);
    }
  }

  async verifyProductPricesDisplayed(prices: number[]): Promise<void> {
    const displayedPrices = await this.inventoryPage.getProductPrices();
    for (const price of prices) {
      expect(displayedPrices).toContain(price);
    }
  }

  async navigateToCart(): Promise<void> {
    await this.inventoryPage.goToCart();
  }
}
