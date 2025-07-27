const { test, expect } = require('@playwright/test');

test('Checkboxes should check and reset correctly', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/checkboxes');

  // Checkboxes and reset button
  const checkboxes = ['#checkbox1', '#checkbox2', '#checkbox3'];
  const resetButton = page.locator('button:has-text("Reset")');

  // Check all checkboxes
  for (const selector of checkboxes) {
    await page.check(selector);
    await expect(page.locator(selector)).toBeChecked();
  }

  // Click Reset
  await resetButton.click();

  // Verify all are unchecked
  for (const selector of checkboxes) {
    await expect(page.locator(selector)).not.toBeChecked();
  }
});
