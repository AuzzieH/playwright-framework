import { test, expect } from '../src/fixtures/pageFixtures.js';
import { USERS } from '../src/data/users.js';

test.describe('Navigation & Session', () => {
  test('should redirect to login when accessing inventory without auth', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
    await expect(page.locator('[data-test="error"]')).toContainText(
      "You can only access '/inventory.html' when you are logged in"
    );
  });

  test('should redirect to login when accessing cart without auth', async ({ page }) => {
    await page.goto('/cart.html');
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('should logout and return to login page', async ({
    authenticatedPage,
    headerComponent,
    page,
  }) => {
    await headerComponent.logout();
    await expect(page).toHaveURL(/saucedemo\.com\/$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('should not access inventory after logout', async ({
    authenticatedPage,
    headerComponent,
    page,
  }) => {
    await headerComponent.logout();
    await page.goto('/inventory.html');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('should persist cart items when navigating away and back', async ({
    authenticatedPage,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Onesie');
    await inventoryPage.goToCart();

    // Navigate away and come back
    await cartPage.continueShopping();
    await inventoryPage.goToCart();

    const items = await cartPage.getItemNames();
    expect(items).toHaveLength(2);
    expect(items).toContain('Sauce Labs Backpack');
    expect(items).toContain('Sauce Labs Onesie');
  });
});
