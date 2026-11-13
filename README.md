# Parts Trader Technical Exercise

This project uses **Playwright and TypeScript** to automate UI and API tests for the [Automation Exercise](https://automationexercise.com/) website.

## Technologies Used

- Playwright
- TypeScript
- Faker.js
- ESLint
- Prettier
- GitHub Actions

## Installation

Clone the repository and install dependencies:

```bash
npm install
npx playwright install chromium
```
All tests are configured to run using Chromium (Chrome).
## Running Tests

**Run all tests:**

```bash
npx playwright test
```

**Run UI tests:**

```bash
npx playwright test tests/ui/
```

**Run API tests:**

```bash
npx playwright test tests/api/
```

**View test reports:**

```bash
npx playwright show-report
```

## Test Coverage

### UI Tests

- **Test Case 14:** Place Order – Register While Checkout
- **Test Case 15:** Place Order – Register Before Checkout

### API Tests

- **API 7:** Verify login with valid credentials
- **API 8:** Verify login without email parameter
- **API 9:** Verify login using DELETE method
- **API 10:** Verify login with invalid credentials