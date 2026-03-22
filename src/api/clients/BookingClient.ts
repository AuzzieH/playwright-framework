import { type APIRequestContext, type APIResponse } from '@playwright/test';
import type { Booking, BookingResponse, BookingId } from '../data/types.js';

export class BookingClient {
  constructor(private readonly request: APIRequestContext) {}

  async getBookingIds(params?: Record<string, string>): Promise<BookingId[]> {
    const response = await this.request.get('/booking', { params });
    return response.json();
  }

  async getBooking(id: number): Promise<Booking> {
    const response = await this.request.get(`/booking/${id}`);
    return response.json();
  }

  async getBookingResponse(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`);
  }

  async createBooking(booking: Booking): Promise<BookingResponse> {
    const response = await this.request.post('/booking', {
      data: booking,
    });
    return response.json();
  }

  async createBookingResponse(booking: Booking): Promise<APIResponse> {
    return this.request.post('/booking', { data: booking });
  }

  async updateBooking(id: number, booking: Booking, token: string): Promise<Booking> {
    const response = await this.request.put(`/booking/${id}`, {
      data: booking,
      headers: { Cookie: `token=${token}` },
    });
    return response.json();
  }

  async updateBookingResponse(id: number, booking: Booking, token: string): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, {
      data: booking,
      headers: { Cookie: `token=${token}` },
    });
  }

  async partialUpdateBooking(
    id: number,
    partial: Partial<Booking>,
    token: string,
  ): Promise<Booking> {
    const response = await this.request.patch(`/booking/${id}`, {
      data: partial,
      headers: { Cookie: `token=${token}` },
    });
    return response.json();
  }

  async partialUpdateResponse(
    id: number,
    partial: Partial<Booking>,
    token: string,
  ): Promise<APIResponse> {
    return this.request.patch(`/booking/${id}`, {
      data: partial,
      headers: { Cookie: `token=${token}` },
    });
  }

  async deleteBooking(id: number, token: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, {
      headers: { Cookie: `token=${token}` },
    });
  }

  async ping(): Promise<APIResponse> {
    return this.request.get('/ping');
  }
}
