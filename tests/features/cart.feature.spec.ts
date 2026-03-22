import { test, expect } from '../../src/fixtures/pageFixtures.js';
import { PRODUCTS } from '../../src/data/products.js';

const BACKPACK = PRODUCTS[0]; // $29.99
const BIKE_LIGHT = PRODUCTS[1]; // $9.99
const BOLT_SHIRT = PRODUCTS[2]; // $15.99

test.describe('Feature: Cart Management', () => {
  test.beforeEach(async ({ authenticatedPage }) => {});

  test('Added items appear in the cart @smoke', async ({ inventorySteps, cartSteps }) => {
    await inventorySteps.addItemToCart(BACKPACK.name);
    await inventorySteps.addItemToCart(BIKE_LIGHT.name);
    await inventorySteps.navigateToCart();

    await cartSteps.verifyItemInCart(BACKPACK.name);
    await cartSteps.verifyItemInCart(BIKE_LIGHT.name);
    await cartSteps.verifyCartItemCount(2);
  });

  test('Removed items disappear from cart', async ({ inventorySteps, cartSteps }) => {
    await inventorySteps.addItemToCart(BACKPACK.name);
    await inventorySteps.navigateToCart();
    await cartSteps.removeItem(BACKPACK.name);
    await cartSteps.verifyCartItemCount(0);
  });

  test('Continue shopping returns to inventory', async ({
    inventorySteps,
    cartSteps,
    navigationSteps,
  }) => {
    await inventorySteps.navigateToCart();
    await cartSteps.continueShopping();
    await navigationSteps.verifyUrl(/inventory/);
  });

  test('Proceed to checkout navigates to checkout', async ({
    inventorySteps,
    cartSteps,
    navigationSteps,
  }) => {
    await inventorySteps.addItemToCart(BACKPACK.name);
    await inventorySteps.navigateToCart();
    await cartSteps.proceedToCheckout();
    await navigationSteps.verifyUrl(/checkout-step-one/);
  });
});

test.describe('Feature: Cart Price Totals', () => {
  test.beforeEach(async ({ authenticatedPage }) => {});

  test('Single item total matches item price', async ({ inventorySteps, cartSteps }) => {
    await inventorySteps.addItemToCart(BACKPACK.name);
    await inventorySteps.navigateToCart();
    await cartSteps.verifyCartTotal(BACKPACK.price);
  });

  test('Two items total equals sum of both prices @smoke', async ({
    inventorySteps,
    cartSteps,
  }) => {
    await inventorySteps.addItemToCart(BACKPACK.name);
    await inventorySteps.addItemToCart(BIKE_LIGHT.name);
    await inventorySteps.navigateToCart();

    const expectedTotal = parseFloat((BACKPACK.price + BIKE_LIGHT.price).toFixed(2));
    await cartSteps.verifyCartTotal(expectedTotal);
  });

  test('Removing one item updates the total correctly', async ({ inventorySteps, cartSteps }) => {
    await inventorySteps.addItemToCart(BACKPACK.name);
    await inventorySteps.addItemToCart(BIKE_LIGHT.name);
    await inventorySteps.navigateToCart();

    await cartSteps.removeItem(BIKE_LIGHT.name);
    await cartSteps.verifyCartTotal(BACKPACK.price);
    await cartSteps.verifyCartItemCount(1);
  });

  test('Removing all items resets total to zero', async ({ inventorySteps, cartSteps }) => {
    await inventorySteps.addItemToCart(BACKPACK.name);
    await inventorySteps.addItemToCart(BIKE_LIGHT.name);
    await inventorySteps.navigateToCart();

    await cartSteps.removeItem(BACKPACK.name);
    await cartSteps.removeItem(BIKE_LIGHT.name);
    await cartSteps.verifyCartIsEmpty();
  });

  test('Cart subtotal carries through to checkout summary', async ({
    inventorySteps,
    cartSteps,
    checkoutSteps,
  }) => {
    await inventorySteps.addItemToCart(BACKPACK.name);
    await inventorySteps.addItemToCart(BIKE_LIGHT.name);
    await inventorySteps.navigateToCart();

    const cartTotal = await cartSteps.getCartTotal();

    await cartSteps.proceedToCheckout();
    await checkoutSteps.fillAndSubmitShippingInfo('John', 'Doe', '12345');
    await checkoutSteps.verifySubtotal(cartTotal);
  });

  test('Three items total is correct', async ({ inventorySteps, cartSteps }) => {
    await inventorySteps.addItemToCart(BACKPACK.name);
    await inventorySteps.addItemToCart(BIKE_LIGHT.name);
    await inventorySteps.addItemToCart(BOLT_SHIRT.name);
    await inventorySteps.navigateToCart();

    const expectedTotal = parseFloat(
      (BACKPACK.price + BIKE_LIGHT.price + BOLT_SHIRT.price).toFixed(2),
    );
    await cartSteps.verifyCartTotal(expectedTotal);
  });
});
