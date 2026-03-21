import { expect, type Page } from '@playwright/test';
import { HeaderComponent } from '../components/HeaderComponent.js';

export class NavigationSteps {
  constructor(
    private readonly page: Page,
    private readonly header: HeaderComponent,
  ) {}

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async verifyUrl(pattern: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pattern);
  }

  async verifyRedirectedToLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/saucedemo\.com\/$/);
  }

  async verifyAuthError(path: string): Promise<void> {
    await expect(this.page.locator('[data-test="error"]')).toContainText(
      `You can only access '${path}' when you are logged in`,
    );
  }

  async verifyErrorVisible(): Promise<void> {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.header.logout();
  }

  async resetAppState(): Promise<void> {
    await this.header.resetAppState();
  }

  async verifyLoginPageVisible(): Promise<void> {
    await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
  }
}
