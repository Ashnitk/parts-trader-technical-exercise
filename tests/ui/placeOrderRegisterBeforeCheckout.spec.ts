import { test } from "@playwright/test";

import { HomePage } from "../../src/pages/HomePage";
import { CartPage } from "../../src/pages/CartPage";
import { LoginPage } from "../../src/pages/LoginPage";
import { SignupPage } from "../../src/pages/SignupPage";
import { CheckoutPage } from "../../src/pages/CheckoutPage";
import { PaymentPage } from "../../src/pages/PaymentPage";
import { AccountPage } from "../../src/pages/AccountPage";
import { createTestUser } from "../../src/data/testData";

test("Place order: Register before checkout", async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const loginPage = new LoginPage(page);
  const signupPage = new SignupPage(page);
  const checkoutPage = new CheckoutPage(page);
  const paymentPage = new PaymentPage(page);
  const accountPage = new AccountPage(page);

  const user = createTestUser();

  await test.step("Navigate to homepage", async () => {
    await homePage.navigate();
  });

  await test.step("Register a new user", async () => {
    await homePage.openSignupLogin();
    await loginPage.signup(user.name, user.email);
    await signupPage.createAccount(user);
  });

  await test.step("Verify user is logged in", async () => {
    await accountPage.verifyLoggedIn(user.name);
  });

  await test.step("Add product to cart", async () => {
    await homePage.addFirstProductToCart();
    await homePage.openCart();
    await cartPage.verifyCart();
  });

  await test.step("Proceed to checkout", async () => {
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyCheckout();
  });

  await test.step("Complete payment and verify order", async () => {
    await checkoutPage.placeOrder("Please handle with care.");
    await paymentPage.pay();
  });

  await test.step("Delete account and verify deletion", async () => {
    await accountPage.deleteAccount();
  });
});
