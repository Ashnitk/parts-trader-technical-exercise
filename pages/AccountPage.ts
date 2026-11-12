import { type Page, expect } from "@playwright/test";

export class AccountPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyLoggedIn(username: string) {
    await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();
  }

  async deleteAccount() {
    await this.page
      .getByRole("link", {
        name: "Delete Account",
      })
      .click();

    await expect(
      this.page.locator('[data-qa="account-deleted"]'),
    ).toBeVisible();

    await this.page.locator('[data-qa="continue-button"]').click();
  }
}
