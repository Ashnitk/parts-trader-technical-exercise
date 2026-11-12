import { type Page, expect } from "@playwright/test";

export class HomePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("/");
    await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
    await expect(this.page.locator(".features_items")).toBeVisible();
  }

  async addFirstProductToCart() {
    await this.page
      .locator(".features_items .product-image-wrapper")
      .first()
      .locator(".productinfo .add-to-cart")
      .click();

    await expect(this.page.getByText("Added!", { exact: true })).toBeVisible();

    await this.page
      .getByRole("button", {
        name: "Continue Shopping",
      })
      .click();
  }

  async openCart() {
    await this.page.locator('a[href="/view_cart"]').first().click();
  }

  async openSignupLogin() {
    await this.page
      .getByRole("link", {
        name: "Signup / Login",
      })
      .click();
  }
}
