import { test, expect } from '../src/fixtures/pageFixtures.js';
import { PRODUCTS } from '../src/data/products.js';

test.describe('Product Details', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    // authenticatedPage fixture handles login
  });

  test('should display all expected products with correct prices', async ({ inventoryPage }) => {
    const names = await inventoryPage.getProductNames();
    const prices = await inventoryPage.getProductPrices();

    for (const product of PRODUCTS) {
      expect(names).toContain(product.name);
      expect(prices).toContain(product.price);
    }
  });

  test('should navigate to product detail page when clicking product name', async ({
    page,
  }) => {
    await page.locator('.inventory_item_name').first().click();
    await expect(page).toHaveURL(/inventory-item/);
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_price')).toBeVisible();
  });

  test('should add to cart from product detail page', async ({ page }) => {
    await page.locator('.inventory_item_name').first().click();
    await page.locator('[data-test^="add-to-cart"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('should return to inventory from product detail page', async ({ page }) => {
    await page.locator('.inventory_item_name').first().click();
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/inventory/);
  });
});
