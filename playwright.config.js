// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 60*1000,
  // workers:3,
  retries : 1,
  expect : {
    timeout : 5000
  },
  reporter: 'html',
  use: {
    browserName : 'chromium',
    headless : true,
    screenshot : 'on',
    actionTimeout : 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name : 'chrome', 
      use: {
        headless : false,
        screenshot : 'only-on-failure',
        video : 'retain-on-failure',
        actionTimeout : 0,
        ignoreHTTPSErrors:true,
        permissions:['geolocation'],
        // viewport : {width:750, height:750},
        // ..devices['Desktop Chrome']
      }
    },
    // {
    //   name : 'firefox',
    //   use: {
    //     headless : true,
    //     screenshot : 'only-on-failure',
    //     actionTimeout : 0,
    //     viewport : {width:720,height:720}
    //   }
    // },
    // {
    //   name : 'safari',
    //   use: {
    //     headless : true,
    //     screenshot : 'only-on-failure',
    //     actionTimeout : 0,
    //     ...devices['iPhone 12']
    //   }
    // }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});