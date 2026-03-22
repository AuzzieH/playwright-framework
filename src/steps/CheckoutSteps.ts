import { expect } from '@playwright/test';
import type { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.js';
import type { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage.js';
import type { CheckoutCompletePage } from '../pages/CheckoutCompletePage.js';

export class CheckoutSteps {
  constructor(
    private readonly stepOnePage: CheckoutStepOnePage,
    private readonly stepTwoPage: CheckoutStepTwoPage,
    private readonly completePage: CheckoutCompletePage,
  ) {}

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.stepOnePage.fillInformation(firstName, lastName, postalCode);
  }

  async submitShippingInfo(): Promise<void> {
    await this.stepOnePage.submit();
  }

  async fillAndSubmitShippingInfo(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.fillShippingInfo(firstName, lastName, postalCode);
    await this.submitShippingInfo();
  }

  async cancelCheckout(): Promise<void> {
    await this.stepOnePage.cancel();
  }

  async verifyShippingError(text: string): Promise<void> {
    const error = await this.stepOnePage.getErrorText();
    expect(error).toContain(text);
  }

  async verifySubtotal(expectedSubtotal: number): Promise<void> {
    const subtotal = await this.stepTwoPage.getSubtotal();
    expect(subtotal).toBe(expectedSubtotal);
  }

  async verifyTotalContainsDollarSign(): Promise<void> {
    const total = await this.stepTwoPage.getTotal();
    expect(total).toContain('$');
  }

  async verifySummaryItemCount(count: number): Promise<void> {
    const items = await this.stepTwoPage.getItemNames();
    expect(items).toHaveLength(count);
  }

  async verifySummaryContainsItems(itemNames: string[]): Promise<void> {
    const items = await this.stepTwoPage.getItemNames();
    for (const name of itemNames) {
      expect(items).toContain(name);
    }
  }

  async finishCheckout(): Promise<void> {
    await this.stepTwoPage.finish();
  }

  async cancelFromSummary(): Promise<void> {
    await this.stepTwoPage.cancel();
  }

  async verifyOrderComplete(): Promise<void> {
    const header = await this.completePage.getConfirmationHeader();
    expect(header).toBe('Thank you for your order!');
  }

  async returnToProducts(): Promise<void> {
    await this.completePage.backToProducts();
  }
}
