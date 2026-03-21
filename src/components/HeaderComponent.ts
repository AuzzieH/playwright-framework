import { type Page } from '@playwright/test';

export class HeaderComponent {
  constructor(private readonly page: Page) {}

  get burgerMenuButton() {
    return this.page.locator('#react-burger-menu-btn');
  }

  get logoutLink() {
    return this.page.locator('#logout_sidebar_link');
  }

  get resetLink() {
    return this.page.locator('#reset_sidebar_link');
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
