import { test, expect } from '../src/fixtures/pageFixtures.js';
import { USERS } from '../src/data/users.js';

test.describe('Login Page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should login successfully with standard user', async ({ loginPage, page }) => {
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('should show error for locked out user', async ({ loginPage }) => {
    await loginPage.login(USERS.LOCKED_OUT.username, USERS.LOCKED_OUT.password);
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain('locked out');
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain('do not match');
  });

  test('should show error when username is missing', async ({ loginPage }) => {
    await loginPage.login('', USERS.STANDARD.password);
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain('Username is required');
  });

  test('should show error when password is missing', async ({ loginPage }) => {
    await loginPage.login(USERS.STANDARD.username, '');
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain('Password is required');
  });
});
