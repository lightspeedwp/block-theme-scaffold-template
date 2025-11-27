# Playwright Configuration

## Overview

Playwright is a modern end-to-end testing framework that enables reliable cross-browser testing. This theme uses Playwright for E2E tests with WordPress integration.

## Configuration File

Location: `.playwright.config.cjs`

## WordPress Package Used

- `@wordpress/e2e-test-utils-playwright@^1.35.0` - WordPress-specific Playwright utilities

## Configuration

```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
 testDir: './tests/e2e',
 fullyParallel: true,
 forbidOnly: !!process.env.CI,
 retries: process.env.CI ? 2 : 0,
 workers: process.env.CI ? 1 : undefined,
 reporter: 'html',
 use: {
  baseURL: 'http://localhost:8889',
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
 },
 projects: [
  {
   name: 'chromium',
   use: { ...devices['Desktop Chrome'] },
  },
  {
   name: 'firefox',
   use: { ...devices['Desktop Firefox'] },
  },
  {
   name: 'webkit',
   use: { ...devices['Desktop Safari'] },
  },
  {
   name: 'Mobile Chrome',
   use: { ...devices['Pixel 5'] },
  },
  {
   name: 'Mobile Safari',
   use: { ...devices['iPhone 12'] },
  },
 ],
 webServer: {
  command: 'npm run env:start',
  port: 8889,
  reuseExistingServer: !process.env.CI,
 },
});
```

## Key Configuration Options

### Test Directory

- **testDir**: `./tests/e2e`
- Location of all E2E test files
- Playwright will find all `.spec.ts` or `.spec.js` files here

### Execution Settings

#### fullyParallel

- **Value**: `true`
- Runs all tests in parallel for speed
- Tests must be independent

#### forbidOnly

- **Value**: `!!process.env.CI`
- Prevents `.only` tests in CI
- Ensures all tests run in CI

#### retries

- **CI**: `2` retries (handles flaky tests)
- **Local**: `0` retries (faster feedback)

#### workers

- **CI**: `1` worker (sequential, more stable)
- **Local**: `undefined` (uses all CPU cores)

### Test Options

#### baseURL

- **Value**: `http://localhost:8889`
- Base URL for all navigation
- Matches wp-env default port

#### trace

- **Value**: `on-first-retry`
- Records trace on first retry
- Useful for debugging failures

#### screenshot

- **Value**: `only-on-failure`
- Takes screenshot when test fails
- Stored in `test-results/`

### Projects (Browsers)

Tests run on multiple browsers and devices:

1. **Desktop Chrome** (Chromium)
2. **Desktop Firefox**
3. **Desktop Safari** (WebKit)
4. **Mobile Chrome** (Pixel 5)
5. **Mobile Safari** (iPhone 12)

### Web Server

- **command**: `npm run env:start`
- Starts wp-env before tests
- **port**: `8889`
- **reuseExistingServer**: Reuses server if already running (local only)

## Available Scripts

```bash
# Run E2E tests
npm run test:e2e

# Run specific test file
npx playwright test tests/e2e/theme.spec.js

# Run in UI mode (interactive)
npx playwright test --ui

# Run specific browser
npx playwright test --project=chromium

# Debug mode
npx playwright test --debug

# Show report
npx playwright show-report
```

## Writing E2E Tests

### Basic Test Structure

```javascript
import { test, expect } from '@playwright/test';

test.describe( 'Theme Features', () => {
 test( 'homepage loads correctly', async ( { page } ) => {
  await page.goto( '/' );
  await expect( page ).toHaveTitle( /My Theme/ );
 } );
} );
```

### Using WordPress Utilities

```javascript
import { test, expect } from '@playwright/test';
import { Admin, Editor } from '@wordpress/e2e-test-utils-playwright';

test.use( {
 admin: async ( { page }, use ) => {
  await use( new Admin( { page } ) );
 },
 editor: async ( { page }, use ) => {
  await use( new Editor( { page } ) );
 },
} );

test( 'can edit a post', async ( { admin, editor } ) => {
 await admin.visitAdminPage( 'post-new.php' );
 await editor.canvas.locator( 'role=textbox[name="Add title"]' ).fill( 'Test Post' );
 await editor.publishPost();
 await expect( editor.canvas.getByText( 'Test Post' ) ).toBeVisible();
} );
```

### Testing Block Editor

```javascript
test( 'can add a block', async ( { admin, editor, page } ) => {
 await admin.createNewPost();
 await editor.insertBlock( { name: 'core/paragraph' } );
 await page.keyboard.type( 'Hello World' );
 await expect( editor.canvas.getByText( 'Hello World' ) ).toBeVisible();
} );
```

### Testing Frontend

```javascript
test( 'displays content on frontend', async ( { page } ) => {
 await page.goto( '/sample-post/' );

 // Wait for content
 await expect( page.locator( 'article' ) ).toBeVisible();

 // Test responsive design
 await page.setViewportSize( { width: 375, height: 667 } );
 await expect( page.locator( '.site-header' ) ).toBeVisible();
} );
```

## Customization

### Custom Fixtures

```javascript
// tests/e2e/fixtures.js
import { test as base } from '@playwright/test';

export const test = base.extend( {
 themePage: async ( { page }, use ) => {
  await page.goto( '/' );
  await use( page );
 },
} );
```

### Global Setup

```javascript
// playwright.config.js
module.exports = defineConfig( {
 // ... other config
 globalSetup: require.resolve( './tests/e2e/global-setup.js' ),
 globalTeardown: require.resolve( './tests/e2e/global-teardown.js' ),
} );
```

### Test Filtering

```javascript
// Run only tests with specific tag
npx playwright test --grep @smoke

// Exclude tests with tag
npx playwright test --grep-invert @slow
```

## Running on Specific Browsers

### Command Line

```bash
# Run on single browser
npx playwright test --project=chromium

# Run on multiple browsers
npx playwright test --project=chromium --project=firefox

# Run on mobile devices
npx playwright test --project="Mobile Chrome"
```

### In Test File

```javascript
test.describe( 'Desktop only', () => {
 test.use( { ...devices['Desktop Chrome'] } );

 test( 'specific to desktop', async ( { page } ) => {
  // Test code
 } );
} );
```

## Debugging

### Interactive Mode

```bash
# UI Mode (recommended)
npx playwright test --ui

# Debug specific test
npx playwright test theme.spec.js --debug

# Headed mode (see browser)
npx playwright test --headed
```

### Traces

```bash
# View trace from failed test
npx playwright show-trace test-results/.../trace.zip
```

### Screenshots and Videos

```javascript
// Take screenshot
await page.screenshot( { path: 'screenshot.png' } );

// Record video
use: {
 video: 'on',
}
```

## CI/CD Integration

### GitHub Actions

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## Advanced Configuration

### Multiple Configurations

```javascript
module.exports = defineConfig( {
 projects: [
  {
   name: 'logged-in',
   use: {
    storageState: 'tests/e2e/.auth/admin.json',
   },
  },
  {
   name: 'logged-out',
   use: {
    storageState: { cookies: [], origins: [] },
   },
  },
 ],
} );
```

### Custom Reporters

```javascript
reporter: [
 ['html'],
 ['json', { outputFile: 'test-results.json' }],
 ['junit', { outputFile: 'test-results.xml' }],
],
```

### Timeouts

```javascript
use: {
 actionTimeout: 10000, // 10 seconds per action
 navigationTimeout: 30000, // 30 seconds for navigation
},
timeout: 60000, // 1 minute per test
```

## Common Issues

### Port Already in Use

**Solution**: Stop existing wp-env instance:

```bash
npm run env:stop
```

### Tests Timing Out

**Solution**: Increase timeouts or check network conditions:

```javascript
test.setTimeout( 120000 ); // 2 minutes
```

### Flaky Tests

**Solution**:

1. Add explicit waits
2. Use `waitForLoadState()`
3. Enable retries in CI

```javascript
await page.waitForLoadState( 'networkidle' );
```

## Resources

- [Playwright Official Documentation](https://playwright.dev/docs/intro)
- [WordPress E2E Test Utils](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Test Fixtures](https://playwright.dev/docs/test-fixtures)
