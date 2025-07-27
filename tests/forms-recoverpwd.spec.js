const { test, expect } = require('@playwright/test');

test.describe('Recover Password Tests', () => {

    // Go to the recover password page before each test
    test.beforeEach(async ({ page }) => {
        await page.goto('https://qa-practice.netlify.app/recover-password');
    });

    // Check that email is required
    test('Email input is required', async ({ page }) => {
        // Click submit without typing email
        await page.click('button[type="submit"]');

        // Get the browser-specific validation message from email input
        const message = await page.locator('input[type="email"]').evaluate(el => el.validationMessage);
        const browser = page.context().browser().browserType().name();

        if (browser === 'webkit') {
            expect(message).toBe('Fill out this field');
        } else {
            expect(message).toBe('Please fill out this field.');
        }
    });

    // Check password recovery works with a valid email
    test('Recover password with valid email', async ({ page }) => {
        const email = 'test@gmail.com';

        // Type the email and submit the form
        await page.fill('input[type="email"]', email);
        await page.click('button[type="submit"]');

        // Check that success message is shown with correct text
        const successMessage = page.locator('#success-message');
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toHaveText(
            `An email with the new password has been sent to ${email}. Please verify your inbox!`
        );
    });

});
