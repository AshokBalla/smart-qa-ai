const { defineConfig, devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.js',
  timeout: 60000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: '../frontend/public/data/test-results.json' }]
  ],
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
