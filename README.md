# Playwright Automation Framework

[![Playwright Tests](https://github.com/AuzzieH/playwright-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/AuzzieH/playwright-framework/actions/workflows/playwright.yml)

A test automation framework built with **Playwright** and **TypeScript**, targeting [saucedemo.com](https://www.saucedemo.com). Uses a **Feature / Step / Page** layered architecture with custom fixtures, data-driven testing, and cross-browser support.

## Tech Stack

- [Playwright](https://playwright.dev/) - Modern end-to-end testing framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [GitHub Actions](https://github.com/features/actions) - CI/CD pipeline

## Project Structure

```
src/
├── pages/                  # Page objects — selectors & low-level DOM actions
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutStepOnePage.ts
│   ├── CheckoutStepTwoPage.ts
│   └── CheckoutCompletePage.ts
├── steps/                  # Step classes — reusable test operations
│   ├── LoginSteps.ts
│   ├── InventorySteps.ts
│   ├── CartSteps.ts
│   ├── CheckoutSteps.ts
│   └── NavigationSteps.ts
├── components/             # Shared UI components
│   └── HeaderComponent.ts
├── fixtures/               # Playwright fixtures (DI for pages + steps)
│   └── pageFixtures.ts
├── data/                   # Test data constants
│   ├── users.ts
│   └── products.ts
└── utils/                  # Helper utilities
    └── helpers.ts

tests/
└── features/               # Feature specs organized by domain
    ├── login.feature.spec.ts
    ├── inventory.feature.spec.ts
    ├── cart.feature.spec.ts
    ├── checkout.feature.spec.ts
    ├── e2e-purchase.feature.spec.ts
    ├── navigation.feature.spec.ts
    └── product-details.feature.spec.ts
```

## Architecture

### Feature / Step / Page (3-Layer)

Tests are organized into three layers that separate **what** to test from **how** and **where**:

| Layer          | Location       | Responsibility                                    |
| -------------- | -------------- | ------------------------------------------------- |
| **Feature**    | `tests/features/` | High-level test specs — reads like requirements  |
| **Step**       | `src/steps/`       | Reusable actions & assertions across features    |
| **Page**       | `src/pages/`       | Selectors and direct DOM interactions            |

This separation means:

- **Selector changes** only touch page files
- **Workflow changes** only touch step files
- **New test scenarios** only need feature files using existing steps
- **Scalability** — adding a new page or feature doesn't require modifying existing tests

### Custom Fixtures

Pages and steps are injected into tests via Playwright's fixture system:

- **Dependency injection** — no manual instantiation in tests
- **Automatic teardown** — clean state between tests
- **Composability** — the `authenticatedPage` fixture handles login, keeping tests focused on assertions

### Component Composition

Shared UI elements (e.g., header/burger menu) are extracted into component classes to avoid duplication across page objects.

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

| Command                 | Description                        |
| ----------------------- | ---------------------------------- |
| `npm test`              | Run all tests (headless)           |
| `npm run test:headed`   | Run tests in headed browser mode   |
| `npm run test:ui`       | Launch Playwright UI mode          |
| `npm run test:chromium` | Run tests in Chromium only         |
| `npm run test:firefox`  | Run tests in Firefox only          |
| `npm run test:webkit`   | Run tests in WebKit only           |
| `npm run report`        | Open the HTML test report          |

## Test Coverage

| Feature          | Tests | Scenarios                                              |
| ---------------- | ----- | ------------------------------------------------------ |
| Login            | 5     | Valid login, locked user, invalid creds, missing fields |
| Inventory        | 5     | Product display, listing, add/remove cart               |
| Sorting          | 6     | A-Z, Z-A, price low-high, price high-low, default, reset |
| Cart Management  | 4     | Display items, remove, continue shopping, checkout nav  |
| Cart Totals      | 6     | Single/multi-item totals, remove updates, empty reset, checkout subtotal |
| Checkout         | 6     | Field validation, valid info, summary, cancel           |
| E2E Purchase     | 4     | Single item, multi-item, remove-then-purchase, return   |
| Navigation       | 6     | Auth guards, logout, session persistence                |
| Product Details  | 3     | Detail page nav, add from detail, back to inventory     |

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
