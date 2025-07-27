const { test, expect } = require('@playwright/test');

test('Verify File Upload', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/file-upload');

    const filePath = './tests/fileupload/extension.yaml';

    // Upload file
    await page.locator('#file_upload').setInputFiles(filePath);

    // Submit form
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify confirmation message
    await expect(page.locator('#file_upload_response')).toContainText('solar_system.png');
});
