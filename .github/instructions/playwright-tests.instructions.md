# Playwright Test Instructions

## Directory & Setup
- Place Playwright tests in `/tests/e2e/`.
- Install Playwright and dependencies:
  ```bash
  npm install --save-dev @playwright/test
  npx playwright install
  npm install --save-dev @wordpress/e2e-test-utils-playwright
  ```
- Reference: [WordPress E2E Test Utils](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/)

## Writing Tests
- Use `.spec.js` or `.spec.ts` extensions.
- Use robust selectors (data-*, ARIA labels).
- Use `test.describe()` to group related tests.
- Use fixtures for setup (login, DB resets).
- Assert only what matters for the scenario.
- Add axe accessibility checks.

## Best Practices
- Each test should run independently.
- Refactor repeated code into helpers/fixtures.
- Focus on critical user paths, accessibility, and edge cases.
- Integrate Playwright into CI/CD.

## WordPress Theme Testing
- Cover block registration, rendering, pattern functionality, frontend/backend appearance, accessibility, device compatibility.
- Reference: [Theme Testing](https://developer.wordpress.org/themes/releasing-your-theme/testing/)

## Related Instructions
- See also: [testing.instructions.md](./testing.instructions.md)
