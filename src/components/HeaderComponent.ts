import { type Page } from '@playwright/test';

export class HeaderComponent {
  constructor(private readonly page: Page) {}

  get burgerMenuButton() {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }

  get logoutLink() {
    return this.page.getByText('Logout');
  }

  get resetLink() {
    return this.page.getByText('Reset App State');
  }

  get cartLink() {
    return this.page.locator('.shopping_cart_link');
  }

  async openMenu(): Promise<void> {
    await this.burgerMenuButton.click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.resetLink.click();
  }
}
