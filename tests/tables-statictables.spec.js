const { test, expect } = require('@playwright/test');

test('Check people table data', async ({ page }) => {
  // Open the page with the table
  await page.goto('https://qa-practice.netlify.app/web-table');

  // Get all rows in the table body
  const rows = page.locator('#peopleTable tbody tr');

  // Make sure there are exactly 5 rows
  await expect(rows).toHaveCount(5);

  // What we expect in each row: first name, last name, email
  const expectedData = [
    ['Mark', 'Otto', 'mo@email.com'],
    ['Jacob', 'Thornton', 'jacob_t@yahoo.com'],
    ['Larry', 'Bow', 'lbow@gmail.com'],
    ['Bobby', 'Spencer', 'bobby_23@gmail.com'],
    ['Mark', 'Icarus', 'el_icarus@yahoo.com'],
  ];

  // Check each row’s data against what we expect
  for (let i = 0; i < expectedData.length; i++) {
    const row = rows.nth(i);
    await expect(row.locator('td:nth-child(2)')).toHaveText(expectedData[i][0]); // first name
    await expect(row.locator('td:nth-child(3)')).toHaveText(expectedData[i][1]); // last name
    await expect(row.locator('td:nth-child(4)')).toHaveText(expectedData[i][2]); // email
  }
});
