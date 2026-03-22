import { expect } from '@playwright/test';
import type { BookingClient } from '../clients/BookingClient.js';
import type { Booking, BookingResponse } from '../data/types.js';

export class BookingSteps {
  constructor(private readonly bookingClient: BookingClient) {}

  async createAndVerify(booking: Booking): Promise<BookingResponse> {
    const response = await this.bookingClient.createBookingResponse(booking);
    expect(response.status()).toBe(200);

    const body: BookingResponse = await response.json();
    expect(body.bookingid).toBeTruthy();
    expect(body.booking.firstname).toBe(booking.firstname);
    expect(body.booking.lastname).toBe(booking.lastname);
    expect(body.booking.totalprice).toBe(booking.totalprice);
    expect(body.booking.depositpaid).toBe(booking.depositpaid);
    return body;
  }

  async getAndVerify(id: number, expected: Booking): Promise<void> {
    const response = await this.bookingClient.getBookingResponse(id);
    expect(response.status()).toBe(200);

    const body: Booking = await response.json();
    expect(body.firstname).toBe(expected.firstname);
    expect(body.lastname).toBe(expected.lastname);
    expect(body.totalprice).toBe(expected.totalprice);
  }

  async updateAndVerify(id: number, updated: Booking, token: string): Promise<void> {
    const response = await this.bookingClient.updateBookingResponse(id, updated, token);
    expect(response.status()).toBe(200);

    const body: Booking = await response.json();
    expect(body.firstname).toBe(updated.firstname);
    expect(body.lastname).toBe(updated.lastname);
    expect(body.totalprice).toBe(updated.totalprice);
  }

  async partialUpdateAndVerify(
    id: number,
    partial: Partial<Booking>,
    token: string,
  ): Promise<void> {
    const response = await this.bookingClient.partialUpdateResponse(id, partial, token);
    expect(response.status()).toBe(200);

    const body: Booking = await response.json();
    for (const [key, value] of Object.entries(partial)) {
      expect(body[key as keyof Booking]).toEqual(value);
    }
  }

  async deleteAndVerify(id: number, token: string): Promise<void> {
    const response = await this.bookingClient.deleteBooking(id, token);
    expect(response.status()).toBe(201);
  }

  async verifyNotFound(id: number): Promise<void> {
    const response = await this.bookingClient.getBookingResponse(id);
    expect(response.status()).toBe(404);
  }

  async verifyBookingIdsExist(): Promise<void> {
    const ids = await this.bookingClient.getBookingIds();
    expect(ids.length).toBeGreaterThan(0);
  }

  async filterByName(firstname: string, lastname: string): Promise<number[]> {
    const ids = await this.bookingClient.getBookingIds({ firstname, lastname });
    return ids.map((entry) => entry.bookingid);
  }

  async verifyHealthCheck(): Promise<void> {
    const response = await this.bookingClient.ping();
    expect(response.status()).toBe(201);
  }
}
