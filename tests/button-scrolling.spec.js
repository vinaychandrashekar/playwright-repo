const { test, expect } = require('@playwright/test');

test('Verify scrolling to find specific text', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/scroll');

  const start = page.locator('text=Starting...');
  await expect(start).toBeVisible();

  const end = page.locator('text=THE END');
  while (!(await end.isVisible())) {
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(200);
  }

  await expect(end).toBeVisible();
});
