import { type Page, expect } from "@playwright/test";
import { createTestUser } from "../data/testData";

type TestUser = ReturnType<typeof createTestUser>;

export class SignupPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async createAccount(user: TestUser) {
    await expect(
      this.page.getByText("Enter Account Information"),
    ).toBeVisible();

    await this.page.locator("#id_gender1").check();
    await this.page.locator("#password").fill(user.password);

    await this.page.locator("#days").selectOption("10");
    await this.page.locator("#months").selectOption("5");
    await this.page.locator("#years").selectOption("1995");

    await this.page.locator("#newsletter").check();
    await this.page.locator("#optin").check();

    await this.page.locator("#first_name").fill(user.firstName);
    await this.page.locator("#last_name").fill(user.lastName);
    await this.page.locator("#company").fill(user.company);
    await this.page.locator("#address1").fill(user.address);

    await this.page.locator("#country").selectOption("United States");
    await this.page.locator("#state").fill(user.state);
    await this.page.locator("#city").fill(user.city);
    await this.page.locator("#zipcode").fill(user.zipcode);
    await this.page.locator("#mobile_number").fill(user.mobile);

    await this.page.locator('[data-qa="create-account"]').click();

    await expect(
      this.page.locator('[data-qa="account-created"]'),
    ).toBeVisible();

    await this.page.locator('[data-qa="continue-button"]').click();
  }
}
