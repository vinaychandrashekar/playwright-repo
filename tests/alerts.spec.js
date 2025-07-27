const { test, expect } = require('@playwright/test');

test('Check alert and confirm dialogs', async ({ page }) => {
  // Open the alerts page
  await page.goto('https://qa-practice.netlify.app/alerts');

  // When alert pops up, check text and press OK
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('alert');
    await dialog.accept();
  });
  // Click button to show alert
  await page.click('#alert-btn');

  // When confirm pops up, check text and press OK
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('OK');
    await dialog.accept();
  });
  // Click button to show confirm dialog (accept)
  await page.click('#confirm-btn');

  // When confirm pops up again, check text and press Cancel
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('OK');
    await dialog.dismiss();
  });
  // Click button to show confirm dialog (dismiss)
  await page.click('#confirm-btn');
});
