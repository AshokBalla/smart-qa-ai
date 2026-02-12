const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Failure Demo Tests', () => {
  test('should fail to demonstrate AI analysis and screenshots', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    // Intentionally using wrong credentials or checking for non-existent element
    await loginPage.login('WrongUser', 'WrongPass');

    // This is expected to fail or timeout if we check for something specific to a successful login
    await expect(page.locator('.oxd-topbar-header-breadcrumb-module')).toHaveText('Dashboard', { timeout: 5000 });
  });
});
