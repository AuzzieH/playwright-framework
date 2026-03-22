import { expect } from '@playwright/test';
import type { AuthClient } from '../clients/AuthClient.js';

export class AuthSteps {
  constructor(private readonly authClient: AuthClient) {}

  async authenticate(): Promise<string> {
    const token = await this.authClient.getToken();
    expect(token).toBeTruthy();
    return token;
  }
}
