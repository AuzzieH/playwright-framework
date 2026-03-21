import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.js';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage.js';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.js';
import { HeaderComponent } from '../components/HeaderComponent.js';
import { USERS } from '../data/users.js';

interface PageFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
  headerComponent: HeaderComponent;
  authenticatedPage: void;
}

export const test = base.extend<PageFixtures>({
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

  authenticatedPage: async ({ loginPage }, use) => {
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await use();
  },
});

export { expect } from '@playwright/test';
