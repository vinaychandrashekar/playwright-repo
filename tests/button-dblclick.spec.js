const { test, expect } = require('@playwright/test');

test('Check Double click button', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/double-click');
  const button = page.locator('#double-click-btn');
  await button.dblclick();
  const message = page.locator('#double-click-result');
  await expect(message).toBeVisible();
  await expect(message).toHaveText('Congrats, you double clicked!');
});
