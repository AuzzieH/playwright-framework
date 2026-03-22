import type { Booking } from './types.js';

export const AUTH_CREDENTIALS = {
  username: 'admin',
  password: 'password123',
};

export function createBooking(overrides: Partial<Booking> = {}): Booking {
  return {
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-01-01',
      checkout: '2026-01-10',
    },
    additionalneeds: 'Breakfast',
    ...overrides,
  };
}

export function createUpdatedBooking(overrides: Partial<Booking> = {}): Booking {
  return {
    firstname: 'Jane',
    lastname: 'Smith',
    totalprice: 250,
    depositpaid: false,
    bookingdates: {
      checkin: '2026-03-01',
      checkout: '2026-03-15',
    },
    additionalneeds: 'Lunch',
    ...overrides,
  };
}
