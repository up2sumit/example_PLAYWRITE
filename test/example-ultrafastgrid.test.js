const { test } = require('@playwright/test');
const {
  VisualGridRunner,
  Eyes,
  Target,
  Configuration,
  BatchInfo,
  BrowserType,
  DeviceName,
  ScreenOrientation
} = require('@applitools/eyes-playwright');

test.describe('Demo App - Ultrafast', () => {
  let eyes, runner;
  
  test.beforeEach(async () => {
    // Create a runner with concurrency of 5

    runner = new VisualGridRunner({
      testConcurrency: 5
    });

    // Create Eyes object with the runner, meaning it'll be a Visual Grid eyes.

    eyes = new Eyes(runner);

    // Initialize the eyes configuration

    const configuration = new Configuration();

    // create a new batch info instance and set it to the configuration

    configuration.setBatch(new BatchInfo('Demo Batch - Playwright - Ultrafast'));

    // Add browsers with different viewports

    configuration.addBrowser(800, 600, BrowserType.CHROME);
    configuration.addBrowser(700, 500, BrowserType.FIREFOX);
    configuration.addBrowser(1600, 1200, BrowserType.IE_11);
    configuration.addBrowser(1024, 768, BrowserType.EDGE_CHROMIUM);
    configuration.addBrowser(800, 600, BrowserType.SAFARI);

    // Add mobile emulation devices in Portrait mode

    configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
    configuration.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);

    // Set the configuration to eyes

    eyes.setConfiguration(configuration);

  });

  test('Smoke Test', async ({ page }) => {
    // Navigate to the url we want to test
    // ⭐️ Note to see visual bugs, run the test using the above URL for the 1st run.
    // but then change the above URL to https://demo.applitools.com/index_v2.html
    // (for the 2nd run)
    
    await page.goto('https://demo.applitools.com');

    // Call Open on eyes to initialize a test session

    await eyes.open(page, 'Demo App - Playwright - Ultrafast', 'Smoke Test - Playwright - Ultrafast');

    // check the login page with fluent api, see more info here
    // https://applitools.com/docs/topics/sdk/the-eyes-sdk-check-fluent-api.html

    await eyes.check('Login Window', Target.window().fully());

    // Click the 'Log in' button.

    await page.click('#log-in');

    // Check the app page

    await eyes.check('App Window', Target.window().fully());

    // Call Close on eyes to let the server know it should display the results
    
    await eyes.close(false);
  });

  test.afterEach(async () => {
    // If the test was aborted before eyes.close was called, ends the test as aborted.
    
    await eyes.abort();

    // We pass false to this method to suppress the exception that is thrown if we
    // find visual differences

    const results = await runner.getAllTestResults(false);

    console.log('Ultrafast Results', results);
  });
});