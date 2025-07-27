const { test, expect } = require('@playwright/test');

test('Check new window opens and works', async ({ browser }) => {
  // Make a new browser context and page
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to the page with the button
  await page.goto('https://qa-practice.netlify.app/window');

  // Click the button that opens a new window
  // Wait for the new window to open
  const [newWindow] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('#newWindowBtn').click(),
  ]);

  // Wait for the new window to load fully
  await newWindow.waitForLoadState();

  // Check the new window's URL is correct
  expect(newWindow.url()).toBe('https://qa-practice.netlify.app/web-table.html');

  // Check the new window's title is correct
  expect(await newWindow.title()).toBe('QA Practice | Learn with RV');

  // Check the heading text on the new window
  const heading = await newWindow.locator('h2').textContent();
  expect(heading).toBe('Table Example');

  // Close the new window and original page
  await newWindow.close();
  await page.close();
});
