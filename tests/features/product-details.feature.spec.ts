import { test, expect } from '../../src/fixtures/pageFixtures.js';

test.describe('Feature: Product Details', () => {
  test.beforeEach(async ({ authenticatedPage }) => {});

  test('Navigate to product detail page', async ({ productDetailsPage, navigationSteps }) => {
    await productDetailsPage.clickFirstProduct();
    await navigationSteps.verifyUrl(/inventory-item/);
    await expect(productDetailsPage.productName).toBeVisible();
    await expect(productDetailsPage.productPrice).toBeVisible();
  });

  test('Add to cart from product detail page', async ({ productDetailsPage }) => {
    await productDetailsPage.clickFirstProduct();
    await productDetailsPage.addToCart();
    await expect(productDetailsPage.cartBadge).toHaveText('1');
  });

  test('Return to inventory from product detail page', async ({
    productDetailsPage,
    navigationSteps,
  }) => {
    await productDetailsPage.clickFirstProduct();
    await productDetailsPage.backToProducts();
    await navigationSteps.verifyUrl(/inventory/);
  });
});
