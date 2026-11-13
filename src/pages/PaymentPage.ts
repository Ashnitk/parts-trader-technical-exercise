import { type Page, expect } from "@playwright/test";

export class PaymentPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async pay() {
    await this.page.locator('[data-qa="name-on-card"]').fill("Test Customer");

    await this.page.locator('[data-qa="card-number"]').fill("123456789");

    await this.page.locator('[data-qa="cvc"]').fill("123");
    await this.page.locator('[data-qa="expiry-month"]').fill("12");
    await this.page.locator('[data-qa="expiry-year"]').fill("2030");

    await this.page.locator('[data-qa="pay-button"]').click();

    await expect(
      this.page.getByText("Congratulations! Your order has been confirmed!"),
    ).toBeVisible();
  }
}
