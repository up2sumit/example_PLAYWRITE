const { test } = require('@playwright/test');
const { Eyes, Target } = require('@applitools/eyes-playwright')

test.describe('Demo App - Basic', () => {
  let eyes;

  test.beforeEach(async () => {
    // Create Eyes object

    eyes = new Eyes();

    // Optional: Set batch name for tests

    eyes.setBatch({ name: 'Demo Batch - Playwright - Basic' });
  });

  test('Smoke Test', async ({ page }) => {
    // Navigate to the url we want to test
    // ⭐️ Note to see visual bugs, run the test using the above URL for the 1st run.
    // but then change the above URL to https://demo.applitools.com/index_v2.html
    // (for the 2nd run)
    
    await page.goto('https://demo.applitools.com');

    // Call Open on eyes to initialize a test session

    await eyes.open(page, 'Demo App - Playwright - Basic', 'Smoke Test - Playwright - Basic')

    // check the login page with fluent api, see more info here
    // https://applitools.com/docs/topics/sdk/the-eyes-sdk-check-fluent-api.html

    await eyes.check('Login Window', Target.window().fully());

    // Click the 'Log in' button.

    await page.click('#log-in');

    // Check the app page

    await eyes.check('App Window', Target.window().fully());

    // Call Close on eyes to let the server know it should display the results
    
    const results = await eyes.close();

    console.log('Basic Results', results);
  });

  test.afterEach(async () => {
    // If the test was aborted before eyes.close was called, ends the test as aborted.
    
    await eyes.abort();
  });
});
