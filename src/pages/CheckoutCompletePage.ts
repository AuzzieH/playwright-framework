import { BasePage } from './BasePage.js';

export class CheckoutCompletePage extends BasePage {
  get completeHeader() {
    return this.page.locator('.complete-header');
  }

  get completeText() {
    return this.page.locator('.complete-text');
  }

  get backHomeButton() {
    return this.page.locator('[data-test="back-to-products"]');
  }

  async getConfirmationHeader(): Promise<string> {
    return (await this.completeHeader.textContent()) ?? '';
  }

  async backToProducts(): Promise<void> {
    await this.backHomeButton.click();
  }
}
