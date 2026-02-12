const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test.describe('Logout Tests', () => {
  test('should logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');
    
    await dashboardPage.logout();
    
    // Verify we are back on login page
    await expect(page).toHaveURL(/.*login/);
  });
});
