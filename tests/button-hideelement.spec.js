const { test, expect } = require('@playwright/test');

test('Validate Hide Element functionality', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/show-hide-element');

  const hiddenText = page.locator('#hiddenText');
  await expect(hiddenText).toHaveText('This text will be hidden');

  await page.locator('#showHideBtn').click();
  await expect(hiddenText).toBeHidden();
});
