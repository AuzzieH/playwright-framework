import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
import { getBaseUrl, getApiBaseUrl } from './src/config/environment.js';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
    ...(process.env.CI
      ? [
          ['github', {}] as const,
          ['junit', { outputFile: 'test-results/junit-results.xml' }] as const,
        ]
      : []),
  ],
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    testIdAttribute: 'data-test',
  },
  projects: [
    // --- UI Tests (SauceDemo) ---
    {
      name: 'ui-chromium',
      testDir: './tests/features',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: getBaseUrl(),
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        actionTimeout: 10_000,
      },
    },
    {
      name: 'ui-firefox',
      testDir: './tests/features',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: getBaseUrl(),
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        actionTimeout: 10_000,
      },
    },
    {
      name: 'ui-webkit',
      testDir: './tests/features',
      use: {
        ...devices['Desktop Safari'],
        baseURL: getBaseUrl(),
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        actionTimeout: 10_000,
      },
    },

    // --- API Tests (Restful-Booker) ---
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: getApiBaseUrl(),
      },
    },
  ],
});
