import { test, expect } from '../../src/fixtures/pageFixtures.js';
import { USERS } from '../../src/data/users.js';

test.describe('Feature: Login', () => {
  test.beforeEach(async ({ loginSteps }) => {
    await loginSteps.goToLoginPage();
  });

  test('Successful login with standard user', async ({ loginSteps, navigationSteps }) => {
    await loginSteps.loginAs('STANDARD');
    await navigationSteps.verifyUrl(/inventory/);
  });

  test('Locked out user sees error message', async ({ loginSteps }) => {
    await loginSteps.loginAs('LOCKED_OUT');
    await loginSteps.verifyErrorContains('locked out');
  });

  test('Invalid credentials show error', async ({ loginSteps }) => {
    await loginSteps.loginWithCredentials('invalid_user', 'wrong_password');
    await loginSteps.verifyErrorContains('do not match');
  });

  test('Missing username shows error', async ({ loginSteps }) => {
    await loginSteps.loginWithCredentials('', USERS.STANDARD.password);
    await loginSteps.verifyErrorContains('Username is required');
  });

  test('Missing password shows error', async ({ loginSteps }) => {
    await loginSteps.loginWithCredentials(USERS.STANDARD.username, '');
    await loginSteps.verifyErrorContains('Password is required');
  });
});
