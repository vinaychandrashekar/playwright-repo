const { test, expect } = require('@playwright/test');

test('Check button inside iframe works', async ({ page }) => {
  // Open the page with iframe
  await page.goto('https://qa-practice.netlify.app/iframe');

  // Find the iframe by its ID
  const frame = page.frameLocator('#iframe-checkboxes');

  // Find the "Learn more" button inside the iframe
  const button = frame.locator('#learn-more');

  // Find the text that shows after clicking the button
  const message = frame.locator('#show-text');

  // Wait until the button is visible
  await button.waitFor({ state: 'visible' });

  // Click the button
  await button.click();

  // Check if the message shows up
  await expect(message).toBeVisible();

  // Check if the message has the right text
  await expect(message).toHaveText('This text appears when you click the "Learn more" button');
});
