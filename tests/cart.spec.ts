import { test, expect } from '../src/fixtures/pageFixtures.js';

test.describe('Cart Page', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    // authenticatedPage fixture handles login
  });

  test('should display added items in cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Bike Light');
    await inventoryPage.goToCart();

    const items = await cartPage.getItemNames();
    expect(items).toContain('Sauce Labs Backpack');
    expect(items).toContain('Sauce Labs Bike Light');
  });

  test('should remove item from cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    await cartPage.removeItem('Sauce Labs Backpack');
    expect(await cartPage.getItemCount()).toBe(0);
  });

  test('should continue shopping return to inventory', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.goToCart();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory/);
  });

  test('should proceed to checkout', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });
});
