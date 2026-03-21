import { test, expect } from '../src/fixtures/pageFixtures.js';

test.describe('End-to-End Purchase Flow', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    // authenticatedPage fixture handles login
  });

  test('should complete a full purchase flow', async ({
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    await cartPage.proceedToCheckout();

    await checkoutStepOnePage.fillInformation('John', 'Doe', '12345');
    await checkoutStepOnePage.submit();

    await checkoutStepTwoPage.finish();

    const header = await checkoutCompletePage.getConfirmationHeader();
    expect(header).toBe('Thank you for your order!');
  });

  test('should complete purchase with multiple items', async ({
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Bike Light');
    await inventoryPage.addToCartByName('Sauce Labs Bolt T-Shirt');
    await inventoryPage.goToCart();

    const cartItems = await cartPage.getItemNames();
    expect(cartItems).toHaveLength(3);

    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillInformation('Jane', 'Smith', '54321');
    await checkoutStepOnePage.submit();

    const summaryItems = await checkoutStepTwoPage.getItemNames();
    expect(summaryItems).toHaveLength(3);

    await checkoutStepTwoPage.finish();

    const header = await checkoutCompletePage.getConfirmationHeader();
    expect(header).toBe('Thank you for your order!');
  });

  test('should complete purchase after removing an item', async ({
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Bike Light');
    await inventoryPage.goToCart();

    await cartPage.removeItem('Sauce Labs Bike Light');
    expect(await cartPage.getItemCount()).toBe(1);

    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillInformation('Test', 'User', '99999');
    await checkoutStepOnePage.submit();

    const summaryItems = await checkoutStepTwoPage.getItemNames();
    expect(summaryItems).toEqual(['Sauce Labs Backpack']);

    await checkoutStepTwoPage.finish();

    const header = await checkoutCompletePage.getConfirmationHeader();
    expect(header).toBe('Thank you for your order!');
  });
});
