import { test as base } from '@playwright/test';
import { AuthClient } from '../clients/AuthClient.js';
import { BookingClient } from '../clients/BookingClient.js';
import { AuthSteps } from '../steps/AuthSteps.js';
import { BookingSteps } from '../steps/BookingSteps.js';

interface ApiFixtures {
  authClient: AuthClient;
  bookingClient: BookingClient;
  authSteps: AuthSteps;
  bookingSteps: BookingSteps;
  authToken: string;
}

export const test = base.extend<ApiFixtures>({
  authClient: async ({ request }, use) => {
    await use(new AuthClient(request));
  },

  bookingClient: async ({ request }, use) => {
    await use(new BookingClient(request));
  },

  authSteps: async ({ authClient }, use) => {
    await use(new AuthSteps(authClient));
  },

  bookingSteps: async ({ bookingClient }, use) => {
    await use(new BookingSteps(bookingClient));
  },

  authToken: async ({ authSteps }, use) => {
    const token = await authSteps.authenticate();
    await use(token);
  },
});

export { expect } from '@playwright/test';
