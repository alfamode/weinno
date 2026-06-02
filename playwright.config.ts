import { defineConfig, devices } from 'playwright/test';

export default defineConfig({
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: 'html',
  timeout: 10 * 60 * 1000,

  use: {
    // trace: 'on-first-retry',
    actionTimeout: 30000,
    navigationTimeout: 120000,
  },

  projects: [
    {
      name: 'simple',
      testDir: './tests/define',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      }
    },
  ],
});
