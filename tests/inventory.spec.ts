import { test, expect } from '../src/fixtures/pageFixtures.js';

test.describe('Inventory Page', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    // authenticatedPage fixture handles login
  });

  test('should display all 6 products', async ({ inventoryPage }) => {
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('should display correct page title', async ({ inventoryPage }) => {
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('should sort products by name A to Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('should sort products by name Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('should sort products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('should sort products by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('should add product to cart and update badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);
  });

  test('should remove product from cart', async ({ inventoryPage }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);
    await inventoryPage.removeFromCartByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(0);
  });
});
