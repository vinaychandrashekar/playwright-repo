const { test, expect } = require('@playwright/test');

// Make a random string of letters
function getRandomString(len = 8) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let text = '';
    for (let i = 0; i < len; i++) {
        text += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return text;
}

// Make a random email using two random strings
function getRandomEmail() {
    return getRandomString(5) + '.' + getRandomString(5) + '@example.com';
}

// Make a random 10-digit phone number as a string
function getRandomPhone() {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

test.describe('Register Page Tests', () => {
    // Open the register page before each test
    test.beforeEach(async ({ page }) => {
        await page.goto('https://qa-practice.netlify.app/register');
    });

    // Test that the form needs mandatory fields filled
    test('Check required fields if empty', async ({ page }) => {
        await page.click('button[type="submit"]'); // Click submit without filling

        const msg = await page.locator('input[type="email"]').evaluate(el => el.validationMessage);
        const browser = test.info().project.name;

        if (browser === 'webkit') {
            expect(msg).toBe('Fill out this field');
        } else {
            expect(msg).toBe('Please fill out this field.');
        }
    });

    // Test successful registration with random data
    test('Register with valid random data', async ({ page }) => {
        const firstName = getRandomString(6);
        const lastName = getRandomString(6);
        const phone = getRandomPhone();
        const country = 'United States of America';
        const email = getRandomEmail();
        const password = 'TestPass123!'; // Fixed password for now

        console.log('Registering with:');
        console.table({ firstName, lastName, phone, country, email, password });

        // Fill the form fields
        await page.fill('#firstName', firstName);
        await page.fill('#lastName', lastName);
        await page.fill('#phone', phone);
        await page.selectOption('#country', { label: country });
        await page.fill('#email', email);
        await page.fill('#password', password);
        await page.check('#acceptTerms');

        await page.click('button[type="submit"]'); // Submit the form

        // Check for success message
        const successMsg = page.locator('#successMessage');
        await expect(successMsg).toBeVisible();
        await expect(successMsg).toHaveText('The account has been successfully created!');
    });
});
