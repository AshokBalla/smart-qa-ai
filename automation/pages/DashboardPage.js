class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardHeader = 'h6.oxd-text--h6:has-text("Dashboard")';
    this.profileMenu = '.oxd-userdropdown-tab';
    this.logoutLink = 'text=Logout';
    this.adminMenu = 'span:has-text("Admin")';
    this.adminHeader = 'h6.oxd-text--h6:has-text("Admin")';
  }

  async logout() {
    await this.page.click(this.profileMenu);
    await this.page.click(this.logoutLink);
  }

  async navigateToAdmin() {
    await this.page.click(this.adminMenu);
  }

  async getDashboardHeaderText() {
    return await this.page.textContent(this.dashboardHeader);
  }

  async getAdminHeaderText() {
    return await this.page.textContent(this.adminHeader);
  }
}

module.exports = { DashboardPage };
