import { BasePage } from './BasePage.js';

export class CheckoutStepOnePage extends BasePage {
  get firstNameInput() {
    return this.page.getByTestId('firstName');
  }

  get lastNameInput() {
    return this.page.getByTestId('lastName');
  }

  get postalCodeInput() {
    return this.page.getByTestId('postalCode');
  }

  get continueButton() {
    return this.page.getByTestId('continue');
  }

  get cancelButton() {
    return this.page.getByTestId('cancel');
  }

  get errorMessage() {
    return this.page.getByTestId('error');
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
