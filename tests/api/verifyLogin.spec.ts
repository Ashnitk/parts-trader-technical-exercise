import { test, expect, type APIRequestContext } from "@playwright/test";

import { createTestUser } from "../../src/data/testData.ts";

const API_BASE_URL =
  process.env.API_BASE_URL ?? "https://automationexercise.com/api/";

let apiContext: APIRequestContext;
let createdUser: ReturnType<typeof createTestUser>;

test.describe("Automation Exercise - Verify Login API", () => {
  // Create a user before executing tests
  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: API_BASE_URL,
    });

    createdUser = createTestUser();

    const createResponse = await apiContext.post("createAccount", {
      form: {
        name: `${createdUser.firstName} ${createdUser.lastName}`,
        email: createdUser.email,
        password: createdUser.password,
        title: "Mr",
        birth_date: "10",
        birth_month: "5",
        birth_year: "1995",
        firstname: createdUser.firstName,
        lastname: createdUser.lastName,
        company: createdUser.company,
        address1: createdUser.address,
        address2: "",
        country: "New Zealand",
        zipcode: createdUser.zipcode,
        state: createdUser.state,
        city: createdUser.city,
        mobile_number: createdUser.mobile,
      },
    });

    const createResponseBody = await createResponse.json();

    expect(createResponseBody.responseCode).toBe(201);
    expect(createResponseBody.message).toBe("User created!");
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test("API 7 - Verify login with valid details", async () => {
    const response = await apiContext.post("verifyLogin", {
      form: {
        email: createdUser.email,
        password: createdUser.password,
      },
    });

    const responseBody = await response.json();

    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe("User exists!");
  });

  test("API 8 - Verify login without email parameter", async () => {
    const response = await apiContext.post("verifyLogin", {
      form: {
        password: createdUser.password,
      },
    });

    const responseBody = await response.json();

    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toBe(
      "Bad request, email or password parameter is missing in POST request.",
    );
  });

  test("API 9 - Verify login using DELETE method", async () => {
    const response = await apiContext.delete("verifyLogin");

    const responseBody = await response.json();

    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe("This request method is not supported.");
  });

  test("API 10 - Verify login with invalid details", async () => {
    const response = await apiContext.post("verifyLogin", {
      form: {
        email: createdUser.email,
        password: `${createdUser.password}-incorrect`,
      },
    });

    const responseBody = await response.json();

    expect(responseBody.responseCode).toBe(404);
    expect(responseBody.message).toBe("User not found!");
  });
});
