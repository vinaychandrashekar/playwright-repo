const { test, expect } = require('@playwright/test');

test('Dropdowns: select and hover test', async ({ page }) => {
  // Open the dropdowns page
  await page.goto('https://qa-practice.netlify.app/dropdowns');

  // Simple dropdown: pick "New Zealand"
  await page.waitForSelector('#dropdown-menu');
  await page.selectOption('#dropdown-menu', 'New Zealand');

  // Check if "New Zealand" is selected
  const selected = await page.$eval('#dropdown-menu', el => el.value);
  expect(selected).toBe('New Zealand');
  console.log('Selected:', selected);

  // For multi-level dropdown, click on options by their text
  async function clickOption(text) {
    await page.locator('#multi-level-dropdown-btn').click();
    await page.locator(`text=${text}`).click();
  }
  await clickOption('Some action');
  await clickOption('Some other action');

  // Hover on menu items to show nested dropdowns, then check items appear
  async function hoverAndCheck(parentText, items) {
    await page.locator(`text=${parentText}`).hover();
    await page.waitForTimeout(1000); // wait a little for menu to appear

    for (const item of items) {
      await expect(page.locator(`text=${item}`)).toBeVisible({ timeout: 5000 });
      console.log('Found:', item);
    }
  }

  // Check second level menu items
  await hoverAndCheck('Hover me for more options', [
    'Second level - 1',
    'Second level - 2',
    'Second level -3',
  ]);

  // Check third level menu items
  await hoverAndCheck('Even More..', [
    '3rd level - 1',
    '3rd level - 2',
  ]);

  // Check fourth level menu items
  await hoverAndCheck('another level', [
    '4th level - 1',
    '4th level - 2',
    '4th level - 3',
  ]);
});
