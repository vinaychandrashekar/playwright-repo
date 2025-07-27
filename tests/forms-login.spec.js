const { test, expect } = require('@playwright/test');

test.describe('Login Page Tests', () => {
    const url = 'https://qa-practice.netlify.app/login';

    // Go to the login page before each test
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    // Check if the page title is correct
    test('Page title is correct', async ({ page }) => {
        await expect(page).toHaveTitle('QA Practice | Learn with RV');
    });

    // Check error for wrong email format
    test('Shows error for bad email', async ({ page }) => {
        const emailInput = page.locator('#email');
        const submitBtn = page.locator('button[type="submit"]');

        await emailInput.fill('invalidemail');  // type bad email
        await submitBtn.click();

        const message = await emailInput.evaluate(el => el.validationMessage);
        const browser = test.info().project.name;

        const expectedMessages = {
            chromium: "Please include an '@' in the email address. 'invalidemail' is missing an '@'.",
            firefox: "Please enter an email address.",
            webkit: "Enter an email address"
        };

        expect(message).toBe(expectedMessages[browser]);
    });

    // Try to login with wrong username/password and check error message
    test('Login fails with wrong password', async ({ page }) => {
        await page.fill('#email', 'test@gmail.com');
        await page.fill('#password', 'wrongpassword');
        await page.click('button[type="submit"]');

        const errorMsg = page.locator('.error-message');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toHaveText("Bad credentials! Please try again! Make sure that you've registered.");
    });

    // Login with correct details and check success
    test('Login works with correct details', async ({ page }) => {
        await page.fill('#email', 'admin@admin.com');
        await page.fill('#password', 'admin123');
        await page.click('button[type="submit"]');

        const cartText = page.locator('text=SHOPPING CART');
        await expect(cartText).toBeVisible();
        await expect(cartText).toHaveText("SHOPPING CART");
    });
});
