# Playwright Automation Framework

[![Playwright Tests](https://github.com/AuzzieH/playwright-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/AuzzieH/playwright-framework/actions/workflows/playwright.yml)

A test automation framework built with **Playwright** and **TypeScript**, targeting [saucedemo.com](https://www.saucedemo.com). Demonstrates the **Page Object Model** design pattern, custom fixtures, data-driven testing, and cross-browser support.

## Tech Stack

- [Playwright](https://playwright.dev/) - Modern end-to-end testing framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [GitHub Actions](https://github.com/features/actions) - CI/CD pipeline

## Project Structure

```
src/
├── pages/              # Page Object Model classes
│   ├── BasePage.ts     # Abstract base with shared methods
│   ├── LoginPage.ts    # Login page interactions
│   ├── InventoryPage.ts # Product listing page
│   ├── CartPage.ts     # Shopping cart
│   ├── CheckoutStepOnePage.ts
│   ├── CheckoutStepTwoPage.ts
│   └── CheckoutCompletePage.ts
├── components/         # Reusable UI components
│   └── HeaderComponent.ts
├── fixtures/           # Custom Playwright fixtures (DI)
│   └── pageFixtures.ts
├── data/               # Test data constants
│   ├── users.ts
│   └── products.ts
└── utils/              # Helper utilities
    └── helpers.ts

tests/
├── login.spec.ts       # Login scenarios
├── inventory.spec.ts   # Product display & sorting
├── cart.spec.ts        # Cart management
├── checkout.spec.ts    # Checkout validation
└── e2e-purchase.spec.ts # Full purchase flows
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+

### Installation

```bash
git clone https://github.com/AuzzieH/playwright-framework.git
cd playwright-framework
npm install
npx playwright install --with-deps
```

### Configuration

Copy the environment template and adjust if needed:

```bash
cp .env.example .env
```

## Running Tests

| Command               | Description                        |
| --------------------- | ---------------------------------- |
| `npm test`            | Run all tests (headless)           |
| `npm run test:headed` | Run tests in headed browser mode   |
| `npm run test:ui`     | Launch Playwright UI mode          |
| `npm run test:chromium` | Run tests in Chromium only       |
| `npm run test:firefox`  | Run tests in Firefox only        |
| `npm run test:webkit`   | Run tests in WebKit only         |
| `npm run report`      | Open the HTML test report          |

## Architecture

### Page Object Model (POM)

Each page of the application is represented by a class that encapsulates its selectors and interactions. This provides:

- **Maintainability** - Selector changes only need updating in one place
- **Readability** - Tests read like user stories
- **Reusability** - Page methods are shared across test suites

### Custom Fixtures

Page objects are injected into tests via Playwright's fixture system, providing:

- **Dependency injection** - No manual instantiation in tests
- **Automatic teardown** - Clean state between tests
- **Composability** - The `authenticatedPage` fixture handles login once, keeping tests focused on their actual assertions

### Component Composition

Shared UI elements (e.g., the header/burger menu) are extracted into component classes to avoid duplication across page objects.

## Test Coverage

| Suite          | Tests | Scenarios                                        |
| -------------- | ----- | ------------------------------------------------ |
| Login          | 5     | Valid login, locked user, invalid creds, missing fields |
| Inventory      | 8     | Product display, sorting (4 options), add/remove cart  |
| Cart           | 4     | Display items, remove, continue shopping, checkout     |
| Checkout       | 6     | Field validation, valid info, summary, cancel          |
| E2E Purchase   | 3     | Single item, multi-item, remove-then-purchase          |

## Reporting

Tests generate an HTML report with:

- Screenshots captured on failure
- Video recordings retained on failure
- Trace files for debugging with Playwright Trace Viewer

View the report after a test run:

```bash
npm run report
```

## CI/CD

The GitHub Actions workflow runs on every push to `main` and on pull requests. It:

1. Installs dependencies and browsers
2. Runs the full test suite
3. Uploads the HTML report as a build artifact
