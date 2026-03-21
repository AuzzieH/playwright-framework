import { test, expect } from '../src/fixtures/pageFixtures.js';
import { PRODUCTS } from '../src/data/products.js';

const BACKPACK = PRODUCTS[0]; // $29.99
const BIKE_LIGHT = PRODUCTS[1]; // $9.99

test.describe('Cart Price Totals', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    // authenticatedPage fixture handles login
  });

  test('should track running total as items are added and removed', async ({
    inventoryPage,
    cartPage,
  }) => {
    // Add first item and verify total matches its price
    await inventoryPage.addToCartByName(BACKPACK.name);
    await inventoryPage.goToCart();

    let prices = await cartPage.getItemPrices();
    expect(prices).toEqual([BACKPACK.price]);
    expect(await cartPage.getPriceTotal()).toBe(BACKPACK.price);

    // Go back, add second item, verify total is item1 + item2
    await cartPage.continueShopping();
    await inventoryPage.addToCartByName(BIKE_LIGHT.name);
    await inventoryPage.goToCart();

    prices = await cartPage.getItemPrices();
    expect(prices).toContain(BACKPACK.price);
    expect(prices).toContain(BIKE_LIGHT.price);
    const expectedTotal = parseFloat((BACKPACK.price + BIKE_LIGHT.price).toFixed(2));
    expect(await cartPage.getPriceTotal()).toBe(expectedTotal);

    // Remove one item, verify total is just the remaining item
    await cartPage.removeItem(BIKE_LIGHT.name);
    expect(await cartPage.getPriceTotal()).toBe(BACKPACK.price);
    expect(await cartPage.getItemCount()).toBe(1);

    // Remove all items, verify cart is empty and total is 0
    await cartPage.removeItem(BACKPACK.name);
    expect(await cartPage.getItemCount()).toBe(0);
    expect(await cartPage.getPriceTotal()).toBe(0);
  });

  test('should show correct subtotal on checkout overview', async ({
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
  }) => {
    await inventoryPage.addToCartByName(BACKPACK.name);
    await inventoryPage.addToCartByName(BIKE_LIGHT.name);
    await inventoryPage.goToCart();

    const cartTotal = await cartPage.getPriceTotal();

    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillInformation('John', 'Doe', '12345');
    await checkoutStepOnePage.submit();

    const subtotal = await checkoutStepTwoPage.getSubtotal();
    expect(subtotal).toBe(cartTotal);
  });
});
