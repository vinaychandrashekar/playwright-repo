const { test, expect } = require('@playwright/test');

test('Check pagination buttons', async ({ page }) => {
  // Open the pagination page
  await page.goto('https://qa-practice.netlify.app/pagination');

  // Click page 1 and check message
  await page.getByRole('link', { name: '1' }).click();
  await expect(page.locator('#pageResult')).toHaveText('You clicked page no. 1');

  // Click page 2 and check message
  await page.getByRole('link', { name: '2' }).click();
  await expect(page.locator('#pageResult')).toHaveText('You clicked page no. 2');

  // Click page 3 and check message
  await page.getByRole('link', { name: '3' }).click();
  await expect(page.locator('#pageResult')).toHaveText('You clicked page no. 3');

  // Click Next button and check message
  await page.getByRole('link', { name: 'Next' }).click();
  await expect(page.locator('#pageResult')).toHaveText('You clicked the "Next" button');
});
