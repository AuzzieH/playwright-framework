import { test, expect } from '../../src/fixtures/pageFixtures.js';
import { PRODUCTS } from '../../src/data/products.js';

test.describe('Feature: Product Details', () => {
  test.beforeEach(async ({ authenticatedPage }) => {});

  test('Navigate to product detail page', async ({ page, navigationSteps }) => {
    await page.locator('.inventory_item_name').first().click();
    await navigationSteps.verifyUrl(/inventory-item/);
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_price')).toBeVisible();
  });

  test('Add to cart from product detail page', async ({ page }) => {
    await page.locator('.inventory_item_name').first().click();
    await page.locator('[data-test^="add-to-cart"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Return to inventory from product detail page', async ({
    page,
    navigationSteps,
  }) => {
    await page.locator('.inventory_item_name').first().click();
    await page.locator('[data-test="back-to-products"]').click();
    await navigationSteps.verifyUrl(/inventory/);
  });
});
