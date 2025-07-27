const { test, expect } = require('@playwright/test');

test('Calendar date selection works correctly', async ({ page }) => {
  // Go to the datepicker page
  await page.goto('https://qa-practice.netlify.app/datepicker-calendar');

  // Find the calendar input/button
  const calendarTrigger = page.locator('#range-date-calendar');

  // Make sure the calendar trigger is visible
  await expect(calendarTrigger).toBeVisible();

  // Click to open the calendar
  await calendarTrigger.click();

  // Select start date (1st)
  await page.locator('td', { hasText: '1' }).first().click();

  // Select end date (10th)
  await page.locator('td', { hasText: '10' }).first().click();

  // Click apply button to confirm the selection
  await page.getByRole('button', { name: 'Apply' }).click();

  // Check if the selected date range is shown correctly
  const result = page.locator('#selected-range');
  await expect(result).toContainText('01/01/2018 - 01/10/2018');
});
