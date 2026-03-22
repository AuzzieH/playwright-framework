import { type APIRequestContext } from '@playwright/test';
import type { AuthResponse } from '../data/types.js';
import { AUTH_CREDENTIALS } from '../data/bookingData.js';

export class AuthClient {
  constructor(private readonly request: APIRequestContext) {}

  async getToken(): Promise<string> {
    const response = await this.request.post('/auth', {
      data: AUTH_CREDENTIALS,
    });

    const body: AuthResponse = await response.json();
    return body.token;
  }
}
