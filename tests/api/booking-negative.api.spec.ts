import { test, expect } from '../../src/api/fixtures/apiFixtures.js';
import { createBooking } from '../../src/api/data/bookingData.js';

test.describe('API: Booking Negative Cases', () => {
  test('GET non-existent booking returns 404', async ({ bookingSteps }) => {
    await bookingSteps.verifyNotFound(999999);
  });

  test('Update without auth token returns 403', async ({ bookingClient }) => {
    const booking = createBooking();
    const created = await bookingClient.createBooking(booking);

    const response = await bookingClient.updateBookingResponse(
      created.bookingid,
      createBooking({ firstname: 'Unauthorized' }),
      'invalid-token',
    );

    expect(response.status()).toBe(403);
  });

  test('Delete without auth token returns 403', async ({ bookingClient }) => {
    const booking = createBooking();
    const created = await bookingClient.createBooking(booking);

    const response = await bookingClient.deleteBooking(created.bookingid, 'invalid-token');
    expect(response.status()).toBe(403);
  });

  test('PATCH without auth token returns 403', async ({ bookingClient }) => {
    const booking = createBooking();
    const created = await bookingClient.createBooking(booking);

    const response = await bookingClient.partialUpdateResponse(
      created.bookingid,
      { firstname: 'NoAuth' },
      'invalid-token',
    );

    expect(response.status()).toBe(403);
  });
});
