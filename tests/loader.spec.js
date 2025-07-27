const { test, expect } = require('@playwright/test');

test('Check loader page shows text', async ({ page }) => {
  // Open the loader page
  await page.goto('https://qa-practice.netlify.app/loader');

  // Wait for the page to fully load
  await page.waitForLoadState('load');

  // Look for the specific text on the page
  const text = page.locator('text=Some text in my newly loaded page..');

  // Make sure the text is visible
  await expect(text).toBeVisible();
});
