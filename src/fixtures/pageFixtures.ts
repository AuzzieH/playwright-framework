import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.js';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage.js';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.js';
import { HeaderComponent } from '../components/HeaderComponent.js';
import { LoginSteps } from '../steps/LoginSteps.js';
import { InventorySteps } from '../steps/InventorySteps.js';
import { CartSteps } from '../steps/CartSteps.js';
import { CheckoutSteps } from '../steps/CheckoutSteps.js';
import { NavigationSteps } from '../steps/NavigationSteps.js';
import { USERS } from '../data/users.js';

interface PageFixtures {
  // Pages (low-level selectors & actions)
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
  headerComponent: HeaderComponent;

  // Steps (reusable test operations)
  loginSteps: LoginSteps;
  inventorySteps: InventorySteps;
  cartSteps: CartSteps;
  checkoutSteps: CheckoutSteps;
  navigationSteps: NavigationSteps;

  // Setup fixtures
  authenticatedPage: void;
}

export const test = base.extend<PageFixtures>({
  // --- Pages ---
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },

  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },

  // --- Steps ---
  loginSteps: async ({ loginPage }, use) => {
    await use(new LoginSteps(loginPage));
  },

  inventorySteps: async ({ inventoryPage }, use) => {
    await use(new InventorySteps(inventoryPage));
  },

  cartSteps: async ({ cartPage }, use) => {
    await use(new CartSteps(cartPage));
  },

  checkoutSteps: async ({ checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }, use) => {
    await use(new CheckoutSteps(checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage));
  },

  navigationSteps: async ({ page, headerComponent }, use) => {
    await use(new NavigationSteps(page, headerComponent));
  },

  // --- Setup ---
  authenticatedPage: async ({ loginSteps }, use) => {
    await loginSteps.loginAsStandardUser();
    await use();
  },
});

export { expect } from '@playwright/test';
