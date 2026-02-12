const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test.describe('Dashboard & Admin Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');
  });

  test('should navigate to Admin page', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToAdmin();
    
    const headerText = await dashboardPage.getAdminHeaderText();
    expect(headerText).toBe('Admin');
  });
});
