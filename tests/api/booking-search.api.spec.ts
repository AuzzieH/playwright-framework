import { test, expect } from '../../src/api/fixtures/apiFixtures.js';
import { createBooking } from '../../src/api/data/bookingData.js';

test.describe('API: Booking Search & Filtering', () => {
  test('List all booking IDs', async ({ bookingSteps }) => {
    await bookingSteps.verifyBookingIdsExist();
  });

  test('Filter bookings by name', async ({ bookingSteps }) => {
    const booking = createBooking({
      firstname: 'SearchTest',
      lastname: 'FilterUser',
    });
    await bookingSteps.createAndVerify(booking);

    const ids = await bookingSteps.filterByName('SearchTest', 'FilterUser');
    expect(ids.length).toBeGreaterThan(0);
  });

  test('Create and retrieve preserves all fields', async ({ bookingSteps, bookingClient }) => {
    const booking = createBooking({
      firstname: 'FieldCheck',
      lastname: 'Verify',
      totalprice: 777,
      depositpaid: false,
      additionalneeds: 'Late checkout',
    });

    const created = await bookingSteps.createAndVerify(booking);
    const retrieved = await bookingClient.getBooking(created.bookingid);

    expect(retrieved.firstname).toBe('FieldCheck');
    expect(retrieved.lastname).toBe('Verify');
    expect(retrieved.totalprice).toBe(777);
    expect(retrieved.depositpaid).toBe(false);
    expect(retrieved.additionalneeds).toBe('Late checkout');
  });
});
