import { type Page, expect } from "@playwright/test";

export class CartPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCart() {
    await expect(this.page).toHaveURL(/\/view_cart/);
    await expect(this.page.locator("#cart_info_table")).toBeVisible();
    await expect(this.page.locator("#cart_info_table tbody tr")).toHaveCount(1);
  }

  async proceedToCheckout() {
    await this.page.getByText("Proceed To Checkout").click();
  }

  async registerFromCheckout() {
    await this.page
      .getByRole("link", {
        name: "Register / Login",
      })
      .click();
  }
}
