import { test } from "@playwright/test";

import { HomePage } from "../../src/pages/HomePage";
import { CartPage } from "../../src/pages/CartPage";
import { LoginPage } from "../../src/pages/LoginPage";
import { SignupPage } from "../../src/pages/SignupPage";
import { CheckoutPage } from "../../src/pages/CheckoutPage";
import { PaymentPage } from "../../src/pages/PaymentPage";
import { AccountPage } from "../../src/pages/AccountPage";
import { createTestUser } from "../../src/data/testData";

test("Place order: Register while checkout", async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const loginPage = new LoginPage(page);
  const signupPage = new SignupPage(page);
  const checkoutPage = new CheckoutPage(page);
  const paymentPage = new PaymentPage(page);
  const accountPage = new AccountPage(page);

  const user = createTestUser();

  await test.step("Open homepage and add product", async () => {
    await homePage.navigate();
    await homePage.addFirstProductToCart();
  });

  await test.step("Verify cart and start checkout", async () => {
    await homePage.openCart();
    await cartPage.verifyCart();
    await cartPage.proceedToCheckout();
    await cartPage.registerFromCheckout();
  });

  await test.step("Register a new customer", async () => {
    await loginPage.signup(user.name, user.email);
    await signupPage.createAccount(user);
    await accountPage.verifyLoggedIn(user.name);
  });

  await test.step("Review checkout", async () => {
    await homePage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyCheckout();
  });

  await test.step("Place order and confirm payment", async () => {
    await checkoutPage.placeOrder("Please handle with care.");
    await paymentPage.pay();
  });

  await test.step("Delete test account", async () => {
    await accountPage.deleteAccount();
  });
});
