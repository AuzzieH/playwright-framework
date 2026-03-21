import { BasePage } from './BasePage.js';

export class CheckoutStepOnePage extends BasePage {
  get firstNameInput() {
    return this.page.locator('[data-test="firstName"]');
  }

  get lastNameInput() {
    return this.page.locator('[data-test="lastName"]');
  }

  get postalCodeInput() {
    return this.page.locator('[data-test="postalCode"]');
  }

  get continueButton() {
    return this.page.locator('[data-test="continue"]');
  }

  get cancelButton() {
    return this.page.locator('[data-test="cancel"]');
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async submit(): Promise<void> {
    await this.continueButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async getErrorText(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? '';
  }
}
