const { test, expect } = require('@playwright/test');

test('Radio buttons selection and disabled state', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/radiobuttons');

  // IDs of the radio buttons to test
  const radioButtons = ['#radio-button1', '#radio-button2', '#radio-button3'];

  // Click and verify each radio button
  for (const selector of radioButtons) {
    const radio = page.locator(selector);
    await radio.click();
    await expect(radio).toBeChecked();
  }

  // Check that the disabled radio button is indeed disabled
  await expect(page.locator('#radio-button4')).toBeDisabled();
});
