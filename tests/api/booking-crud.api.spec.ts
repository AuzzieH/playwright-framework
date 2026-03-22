import { test, expect } from '../../src/api/fixtures/apiFixtures.js';
import { createBooking, createUpdatedBooking } from '../../src/api/data/bookingData.js';

test.describe('API: Booking CRUD', () => {
  test('Create a new booking @smoke', async ({ bookingSteps }) => {
    const booking = createBooking();
    const created = await bookingSteps.createAndVerify(booking);

    expect(created.bookingid).toBeGreaterThan(0);
    expect(created.booking.bookingdates.checkin).toBe(booking.bookingdates.checkin);
    expect(created.booking.bookingdates.checkout).toBe(booking.bookingdates.checkout);
    expect(created.booking.additionalneeds).toBe(booking.additionalneeds);
  });

  test('Retrieve a booking by ID', async ({ bookingSteps }) => {
    const booking = createBooking();
    const created = await bookingSteps.createAndVerify(booking);
    await bookingSteps.getAndVerify(created.bookingid, booking);
  });

  test('Update a booking with PUT', async ({ bookingSteps, authToken }) => {
    const booking = createBooking();
    const created = await bookingSteps.createAndVerify(booking);

    const updated = createUpdatedBooking();
    await bookingSteps.updateAndVerify(created.bookingid, updated, authToken);

    await bookingSteps.getAndVerify(created.bookingid, updated);
  });

  test('Partial update a booking with PATCH', async ({ bookingSteps, authToken }) => {
    const booking = createBooking();
    const created = await bookingSteps.createAndVerify(booking);

    const partial = { firstname: 'Updated', totalprice: 999 };
    await bookingSteps.partialUpdateAndVerify(created.bookingid, partial, authToken);
  });

  test('Delete a booking', async ({ bookingSteps, authToken }) => {
    const booking = createBooking();
    const created = await bookingSteps.createAndVerify(booking);

    await bookingSteps.deleteAndVerify(created.bookingid, authToken);
    await bookingSteps.verifyNotFound(created.bookingid);
  });
});
