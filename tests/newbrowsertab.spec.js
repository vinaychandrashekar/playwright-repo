const { test, expect } = require('@playwright/test');

test('Check dynamic table data', async ({ page }) => {
  // Open the page with the table
  await page.goto('https://qa-practice.netlify.app/dynamic-table');

  // Find all rows in the table body
  const rows = page.locator('#data-tbody > tr');

  // Make sure there is at least one row
  await expect(rows).toHaveCountGreaterThan(0);

  // Get how many rows are there
  const rowCount = await rows.count();
  console.log(`Number of rows found: ${rowCount}`);

  // Go through each row and get info
  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    // Get values from each cell
    const avatar = await row.locator('td:nth-child(1) img').getAttribute('src');
    const firstName = await row.locator('td:nth-child(2)').textContent();
    const lastName = await row.locator('td:nth-child(3)').textContent();
    const age = await row.locator('td:nth-child(4)').textContent();
    const email = await row.locator('td:nth-child(5)').textContent();
    const city = await row.locator('td:nth-child(6)').textContent();
    const country = await row.locator('td:nth-child(7)').textContent();

    // Show the data in the console
    console.log({
      Avatar: avatar?.trim(),
      FirstName: firstName?.trim(),
      LastName: lastName?.trim(),
      Age: age?.trim(),
      Email: email?.trim(),
      City: city?.trim(),
      Country: country?.trim(),
    });
  }
});
