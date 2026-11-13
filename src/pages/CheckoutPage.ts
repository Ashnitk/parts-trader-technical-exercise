import { type Page, expect } from "@playwright/test";

export class CheckoutPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCheckout() {
    await expect(
      this.page.getByText("Address Details", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      this.page.getByText("Review Your Order", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(this.page.locator("#address_delivery")).toBeVisible();
    await expect(this.page.locator("#address_invoice")).toBeVisible();
    await expect(this.page.locator("#cart_info")).toBeVisible();
  }

  async placeOrder(comment: string) {
    await this.page.locator('textarea[name="message"]').fill(comment);

    await this.page
      .getByRole("link", {
        name: "Place Order",
      })
      .click();
  }
}
