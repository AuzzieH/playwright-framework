import { expect } from '@playwright/test';
import type { LoginPage } from '../pages/LoginPage.js';
import { USERS } from '../data/users.js';

export class LoginSteps {
  constructor(private readonly loginPage: LoginPage) {}

  async goToLoginPage(): Promise<void> {
    await this.loginPage.goto();
  }

  async loginAs(userKey: keyof typeof USERS): Promise<void> {
    const creds = USERS[userKey];
    await this.loginPage.login(creds.username, creds.password);
  }

  async loginWithCredentials(username: string, password: string): Promise<void> {
    await this.loginPage.login(username, password);
  }

  async loginAsStandardUser(): Promise<void> {
    await this.goToLoginPage();
    await this.loginAs('STANDARD');
  }

  async verifyErrorContains(text: string): Promise<void> {
    await expect(this.loginPage.errorMessage).toBeVisible();
    const errorText = await this.loginPage.getErrorText();
    expect(errorText).toContain(text);
  }

  async verifyLoginButtonVisible(): Promise<void> {
    await expect(this.loginPage.loginButton).toBeVisible();
  }
}
