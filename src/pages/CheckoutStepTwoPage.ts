import { BasePage } from './BasePage.js';

export class CheckoutStepTwoPage extends BasePage {
  get summaryItems() {
    return this.page.locator('.cart_item');
  }

  get subtotalLabel() {
    return this.page.locator('.summary_subtotal_label');
  }

  get taxLabel() {
    return this.page.locator('.summary_tax_label');
  }

  get totalLabel() {
    return this.page.locator('.summary_info_label.summary_total_label');
  }

  get finishButton() {
    return this.page.locator('[data-test="finish"]');
  }

  get cancelButton() {
    return this.page.locator('[data-test="cancel"]');
  }

  async getTotal(): Promise<string> {
    return (await this.page.locator('.summary_total_label').textContent()) ?? '';
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
