import { test, expect } from '../src/fixtures/pageFixtures.js';

test.describe('Checkout', () => {
  test.beforeEach(async ({ authenticatedPage, inventoryPage, cartPage }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('should require first name', async ({ checkoutStepOnePage }) => {
    await checkoutStepOnePage.fillInformation('', 'Doe', '12345');
    await checkoutStepOnePage.submit();
    const error = await checkoutStepOnePage.getErrorText();
    expect(error).toContain('First Name is required');
  });

  test('should require last name', async ({ checkoutStepOnePage }) => {
    await checkoutStepOnePage.fillInformation('John', '', '12345');
    await checkoutStepOnePage.submit();
    const error = await checkoutStepOnePage.getErrorText();
    expect(error).toContain('Last Name is required');
  });

  test('should require postal code', async ({ checkoutStepOnePage }) => {
    await checkoutStepOnePage.fillInformation('John', 'Doe', '');
    await checkoutStepOnePage.submit();
    const error = await checkoutStepOnePage.getErrorText();
    expect(error).toContain('Postal Code is required');
  });

  test('should accept valid checkout information', async ({ checkoutStepOnePage, page }) => {
    await checkoutStepOnePage.fillInformation('John', 'Doe', '12345');
    await checkoutStepOnePage.submit();
    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('should display order summary with total', async ({ checkoutStepOnePage, checkoutStepTwoPage }) => {
    await checkoutStepOnePage.fillInformation('John', 'Doe', '12345');
    await checkoutStepOnePage.submit();

    const total = await checkoutStepTwoPage.getTotal();
    expect(total).toContain('$');
  });

  test('should cancel checkout and return to cart', async ({ checkoutStepOnePage, page }) => {
    await checkoutStepOnePage.cancel();
    await expect(page).toHaveURL(/cart/);
  });
});
