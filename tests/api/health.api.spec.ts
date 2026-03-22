import { test } from '../../src/api/fixtures/apiFixtures.js';

test.describe('API: Health Check', () => {
  test('Ping endpoint returns 201 @smoke', async ({ bookingSteps }) => {
    await bookingSteps.verifyHealthCheck();
  });
});
