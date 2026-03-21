import { test, expect } from '../../src/fixtures/pageFixtures.js';

test.describe('Feature: End-to-End Purchase Flow', () => {
  test.beforeEach(async ({ authenticatedPage }) => {});

  test('Complete a single item purchase', async ({
    inventorySteps,
    cartSteps,
    checkoutSteps,
  }) => {
    await inventorySteps.addItemToCart('Sauce Labs Backpack');
    await inventorySteps.navigateToCart();
    await cartSteps.proceedToCheckout();
    await checkoutSteps.fillAndSubmitShippingInfo('John', 'Doe', '12345');
    await checkoutSteps.finishCheckout();
    await checkoutSteps.verifyOrderComplete();
  });

  test('Complete a multi-item purchase', async ({
    inventorySteps,
    cartSteps,
    checkoutSteps,
  }) => {
    await inventorySteps.addItemToCart('Sauce Labs Backpack');
    await inventorySteps.addItemToCart('Sauce Labs Bike Light');
    await inventorySteps.addItemToCart('Sauce Labs Bolt T-Shirt');
    await inventorySteps.navigateToCart();

    await cartSteps.verifyCartItemCount(3);
    await cartSteps.proceedToCheckout();
    await checkoutSteps.fillAndSubmitShippingInfo('Jane', 'Smith', '54321');
    await checkoutSteps.verifySummaryItemCount(3);
    await checkoutSteps.finishCheckout();
    await checkoutSteps.verifyOrderComplete();
  });

  test('Purchase after removing an item from cart', async ({
    inventorySteps,
    cartSteps,
    checkoutSteps,
  }) => {
    await inventorySteps.addItemToCart('Sauce Labs Backpack');
    await inventorySteps.addItemToCart('Sauce Labs Bike Light');
    await inventorySteps.navigateToCart();

    await cartSteps.removeItem('Sauce Labs Bike Light');
    await cartSteps.verifyCartItemCount(1);

    await cartSteps.proceedToCheckout();
    await checkoutSteps.fillAndSubmitShippingInfo('Test', 'User', '99999');
    await checkoutSteps.verifySummaryContainsItems(['Sauce Labs Backpack']);
    await checkoutSteps.finishCheckout();
    await checkoutSteps.verifyOrderComplete();
  });

  test('Return to products after completing purchase', async ({
    inventorySteps,
    cartSteps,
    checkoutSteps,
    navigationSteps,
  }) => {
    await inventorySteps.addItemToCart('Sauce Labs Onesie');
    await inventorySteps.navigateToCart();
    await cartSteps.proceedToCheckout();
    await checkoutSteps.fillAndSubmitShippingInfo('Test', 'User', '10001');
    await checkoutSteps.finishCheckout();
    await checkoutSteps.verifyOrderComplete();
    await checkoutSteps.returnToProducts();
    await navigationSteps.verifyUrl(/inventory/);
  });
});
