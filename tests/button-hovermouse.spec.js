const { test, expect } = require('@playwright/test');

test('Validate Mouse Hover functionality', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/mouse-hover');

  await page.locator('#demo').hover();
  await expect(page.locator('#demo')).toHaveText('HOVERED');

  await page.locator('#button-hover-over').hover();
  await expect(page.locator('div.hide')).toHaveText('I am shown when someone hovers over the text above.');
});
