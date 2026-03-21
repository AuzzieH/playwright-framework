import { test, expect } from '../../src/fixtures/pageFixtures.js';
import { PRODUCTS } from '../../src/data/products.js';

test.describe('Feature: Inventory', () => {
  test.beforeEach(async ({ authenticatedPage }) => {});

  test('Displays all 6 products', async ({ inventorySteps }) => {
    await inventorySteps.verifyProductCount(6);
  });

  test('Shows correct page title', async ({ inventorySteps }) => {
    await inventorySteps.verifyPageTitle('Products');
  });

  test('All expected products are listed with correct prices', async ({ inventorySteps }) => {
    await inventorySteps.verifyProductsDisplayed(PRODUCTS.map((p) => p.name));
    await inventorySteps.verifyProductPricesDisplayed(PRODUCTS.map((p) => p.price));
  });

  test('Add product to cart updates badge count', async ({ inventorySteps }) => {
    await inventorySteps.addItemToCart('Sauce Labs Backpack');
    await inventorySteps.verifyCartBadgeCount(1);
  });

  test('Remove product from cart clears badge', async ({ inventorySteps }) => {
    await inventorySteps.addItemToCart('Sauce Labs Backpack');
    await inventorySteps.verifyCartBadgeCount(1);
    await inventorySteps.removeItemFromCart('Sauce Labs Backpack');
    await inventorySteps.verifyCartBadgeCount(0);
  });
});

test.describe('Feature: Inventory Sorting', () => {
  test.beforeEach(async ({ authenticatedPage }) => {});

  test('Sort by name A to Z', async ({ inventorySteps }) => {
    await inventorySteps.sortByNameAscending();
    await inventorySteps.verifySortedByNameAscending();
  });

  test('Sort by name Z to A', async ({ inventorySteps }) => {
    await inventorySteps.sortByNameDescending();
    await inventorySteps.verifySortedByNameDescending();
  });

  test('Sort by price low to high', async ({ inventorySteps }) => {
    await inventorySteps.sortByPriceLowToHigh();
    await inventorySteps.verifySortedByPriceLowToHigh();
  });

  test('Sort by price high to low', async ({ inventorySteps }) => {
    await inventorySteps.sortByPriceHighToLow();
    await inventorySteps.verifySortedByPriceHighToLow();
  });

  test('Default sort is A to Z', async ({ inventorySteps }) => {
    await inventorySteps.verifySortedByNameAscending();
  });

  test('Sort resets to default after navigating away', async ({
    inventorySteps,
    cartSteps,
  }) => {
    await inventorySteps.sortByPriceHighToLow();
    await inventorySteps.navigateToCart();
    await cartSteps.continueShopping();
    await inventorySteps.verifySortedByNameAscending();
  });
});
