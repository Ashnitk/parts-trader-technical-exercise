# Getting Started

## Purpose

This document provides instructions on how to set up and run the Playwright automation tests for the Parts Trader Technical Exercise.

## Getting the Latest Code

Clone the GitHub repository:
```bash
git clone https://github.com/Ashnitk/parts-trader-technical-exercise.git
```
Navigate to the project folder:
```bash
cd parts-trader-technical-exercise
```
If the repository is already cloned, get the latest changes:
```bash
git pull
```
## Setting Up the Environment

Ensure Node.js and npm are installed.

Install project dependencies:
```bash
npm install
```
Install Chromium for Playwright:
```bash
npx playwright install chromium
```

## Running the Tests


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
---

## Links

[README](README.md)