import { test, expect } from '../../src/fixtures/pageFixtures.js';

test.describe('Feature: Checkout Validation', () => {
  test.beforeEach(async ({ authenticatedPage, inventorySteps, cartSteps }) => {
    await inventorySteps.addItemToCart('Sauce Labs Backpack');
    await inventorySteps.navigateToCart();
    await cartSteps.proceedToCheckout();
  });

  test('First name is required', async ({ checkoutSteps }) => {
    await checkoutSteps.fillAndSubmitShippingInfo('', 'Doe', '12345');
    await checkoutSteps.verifyShippingError('First Name is required');
  });

  test('Last name is required', async ({ checkoutSteps }) => {
    await checkoutSteps.fillAndSubmitShippingInfo('John', '', '12345');
    await checkoutSteps.verifyShippingError('Last Name is required');
  });

  test('Postal code is required', async ({ checkoutSteps }) => {
    await checkoutSteps.fillAndSubmitShippingInfo('John', 'Doe', '');
    await checkoutSteps.verifyShippingError('Postal Code is required');
  });

  test('Valid info proceeds to order summary @smoke', async ({
    checkoutSteps,
    navigationSteps,
  }) => {
    await checkoutSteps.fillAndSubmitShippingInfo('John', 'Doe', '12345');
    await navigationSteps.verifyUrl(/checkout-step-two/);
  });

  test('Order summary shows total with dollar sign', async ({ checkoutSteps }) => {
    await checkoutSteps.fillAndSubmitShippingInfo('John', 'Doe', '12345');
    await checkoutSteps.verifyTotalContainsDollarSign();
  });

  test('Cancel checkout returns to cart', async ({ checkoutSteps, navigationSteps }) => {
    await checkoutSteps.cancelCheckout();
    await navigationSteps.verifyUrl(/cart/);
  });
});
