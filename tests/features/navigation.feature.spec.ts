import { test, expect } from '../../src/fixtures/pageFixtures.js';

test.describe('Feature: Navigation & Session', () => {
  test('Redirect to login when accessing inventory without auth', async ({
    navigationSteps,
  }) => {
    await navigationSteps.navigateTo('/inventory.html');
    await navigationSteps.verifyRedirectedToLogin();
    await navigationSteps.verifyAuthError('/inventory.html');
  });

  test('Redirect to login when accessing cart without auth', async ({ navigationSteps }) => {
    await navigationSteps.navigateTo('/cart.html');
    await navigationSteps.verifyRedirectedToLogin();
    await navigationSteps.verifyErrorVisible();
  });

  test('Redirect to login when accessing checkout without auth', async ({
    navigationSteps,
  }) => {
    await navigationSteps.navigateTo('/checkout-step-one.html');
    await navigationSteps.verifyRedirectedToLogin();
    await navigationSteps.verifyErrorVisible();
  });

  test('Logout returns to login page', async ({
    authenticatedPage,
    navigationSteps,
  }) => {
    await navigationSteps.logout();
    await navigationSteps.verifyRedirectedToLogin();
    await navigationSteps.verifyLoginPageVisible();
  });

  test('Cannot access inventory after logout', async ({
    authenticatedPage,
    navigationSteps,
  }) => {
    await navigationSteps.logout();
    await navigationSteps.navigateTo('/inventory.html');
    await navigationSteps.verifyErrorVisible();
  });

  test('Cart items persist when navigating away and back', async ({
    authenticatedPage,
    inventorySteps,
    cartSteps,
  }) => {
    await inventorySteps.addItemToCart('Sauce Labs Backpack');
    await inventorySteps.addItemToCart('Sauce Labs Onesie');
    await inventorySteps.navigateToCart();

    await cartSteps.continueShopping();
    await inventorySteps.navigateToCart();

    await cartSteps.verifyCartItemCount(2);
    await cartSteps.verifyItemInCart('Sauce Labs Backpack');
    await cartSteps.verifyItemInCart('Sauce Labs Onesie');
  });
});
