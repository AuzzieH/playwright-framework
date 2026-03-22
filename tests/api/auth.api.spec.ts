import { test, expect } from '../../src/api/fixtures/apiFixtures.js';

test.describe('API: Authentication', () => {
  test('Valid credentials return a token @smoke', async ({ authSteps }) => {
    const token = await authSteps.authenticate();
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
  });

  test('Invalid credentials return an error', async ({ request }) => {
    const response = await request.post('/auth', {
      data: { username: 'invalid', password: 'wrong' },
    });

    const body = await response.json();
    expect(body).toHaveProperty('reason', 'Bad credentials');
  });
});
