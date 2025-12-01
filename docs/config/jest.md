---
title: Jest Configuration
description: JavaScript testing framework configuration and best practices
category: Configuration
type: Reference
audience: Developers
date: 2025-12-01
---

## Overview

Jest is a JavaScript testing framework that provides a complete testing solution for unit tests. This theme uses the WordPress Jest preset.

## Configuration File

Location: `.jest.config.cjs`

## WordPress Packages Used

- `@wordpress/jest-preset-default@^12.35.0` - Default Jest preset
- `@wordpress/jest-console@^8.35.0` - Console logging utilities
- `@wordpress/jest-puppeteer-axe@^1.35.0` - Accessibility testing (deprecated, use Playwright)

## Configuration

```javascript
module.exports = {
 preset: '@wordpress/jest-preset-default',
 testEnvironment: 'jsdom',
 setupFilesAfterEnv: [
  '@wordpress/jest-console',
  '@wordpress/jest-puppeteer-axe',
  'expect-puppeteer',
 ],
 testPathIgnorePatterns: [
  '/node_modules/',
  '/vendor/',
  '/public/',
 ],
 collectCoverageFrom: [
  'src/**/*.{js,jsx}',
  '!src/**/*.test.{js,jsx}',
  '!src/**/*.stories.{js,jsx}',
 ],
 coverageDirectory: 'coverage',
 coverageReporters: ['text', 'lcov', 'html'],
};
```

## Key Configuration Options

### preset

- **Value**: `@wordpress/jest-preset-default`
- **Purpose**: Includes WordPress-specific Jest configuration
- **Includes**:
  - Babel transformation for JSX/ES6+
  - Module name mapping for CSS/images
  - Setup files for WordPress testing
  - jsdom test environment

### testEnvironment

- **Value**: `jsdom`
- **Purpose**: Simulates browser environment for testing
- **Alternatives**: `node` (for Node.js code)

### setupFilesAfterEnv

Runs before each test:

1. **@wordpress/jest-console**: Enhanced console output
2. **@wordpress/jest-puppeteer-axe**: Accessibility testing utilities
3. **expect-puppeteer**: Additional Puppeteer matchers

### testPathIgnorePatterns

Directories to exclude from test discovery:

- `/node_modules/` - Dependencies
- `/vendor/` - PHP dependencies
- `/public/` - Build output

### Coverage Configuration

#### collectCoverageFrom

Files to include in coverage:

- `src/**/*.{js,jsx}` - All JS/JSX files in src
- `!src/**/*.test.{js,jsx}` - Exclude test files
- `!src/**/*.stories.{js,jsx}` - Exclude Storybook stories

#### coverageDirectory

- **Value**: `coverage`
- Output directory for coverage reports

#### coverageReporters

- **text**: Terminal output
- **lcov**: Machine-readable format
- **html**: Interactive HTML report

## Test File Patterns

Jest automatically finds tests matching these patterns:

- Files in `__tests__` directories: `**/__tests__/**/*.js`
- Files with `.test.js` suffix: `**/*.test.js`
- Files with `.spec.js` suffix: `**/*.spec.js`

## Available Scripts

```bash
# Run all unit tests
npm run test:js

# Run tests in watch mode
npm run test:js:watch

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- src/js/theme.test.js
```

## Writing Tests

### Basic Test Structure

```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe( 'MyComponent', () => {
 it( 'renders correctly', () => {
  render( <MyComponent /> );
  expect( screen.getByText( 'Hello' ) ).toBeInTheDocument();
 } );
} );
```

### Testing WordPress Components

```javascript
import { render } from '@testing-library/react';
import { Button } from '@wordpress/components';

describe( 'Custom Button', () => {
 it( 'renders WordPress button', () => {
  const { container } = render(
   <Button variant="primary">Click me</Button>
  );
  expect( container.firstChild ).toHaveClass( 'is-primary' );
 } );
} );
```

### Mocking WordPress APIs

```javascript
// Mock wp.data
jest.mock( '@wordpress/data', () => ( {
 useSelect: jest.fn(),
 useDispatch: jest.fn(),
} ) );

// Mock wp.i18n
jest.mock( '@wordpress/i18n', () => ( {
 __: ( text ) => text,
 _n: ( single, plural, number ) => ( number === 1 ? single : plural ),
} ) );
```

### Testing Async Code

```javascript
import { waitFor } from '@testing-library/react';

it( 'loads data asynchronously', async () => {
 render( <DataComponent /> );

 await waitFor( () => {
  expect( screen.getByText( 'Loaded' ) ).toBeInTheDocument();
 } );
} );
```

## Customization

### Adding Custom Setup

Create `tests/setup.js`:

```javascript
// Global test setup
global.wp = {
 blocks: {},
 data: {},
 element: require( '@wordpress/element' ),
};
```

Add to config:

```javascript
module.exports = {
 // ... other config
 setupFilesAfterEnv: [
  '@wordpress/jest-console',
  '<rootDir>/tests/setup.js',
 ],
};
```

### Custom Matchers

```javascript
expect.extend( {
 toBeValidBlock( received ) {
  const pass = received.isValid === true;
  return {
   pass,
   message: () =>
    `expected block to be ${ pass ? 'invalid' : 'valid' }`,
  };
 },
} );
```

### Module Name Mapping

```javascript
module.exports = {
 // ... other config
 moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1',
  '\\.(css|scss)$': 'identity-obj-proxy',
 },
};
```

## Coverage Reports

### View Coverage

After running tests with coverage:

```bash
# Generate coverage
npm test -- --coverage

# Open HTML report
open coverage/index.html
```

### Coverage Thresholds

```javascript
module.exports = {
 // ... other config
 coverageThreshold: {
  global: {
   branches: 80,
   functions: 80,
   lines: 80,
   statements: 80,
  },
 },
};
```

## Debugging Tests

### Run Single Test

```bash
npm test -- --testNamePattern="renders correctly"
```

### Debug in VS Code

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

### Verbose Output

```bash
npm test -- --verbose
```

## Common Issues

### Tests Hanging

**Solution**: Ensure async operations are properly awaited or use `done` callback.

### Module Not Found

**Solution**: Check `moduleNameMapper` for proper path aliases.

### Transform Errors

**Solution**: Ensure babel preset is configured:

```javascript
module.exports = {
 preset: '@wordpress/jest-preset-default',
 transform: {
  '^.+\\.[jt]sx?$': [
   'babel-jest',
   { configFile: './babel.config.js' },
  ],
 },
};
```

## Integration with CI/CD

### GitHub Actions Example

```yaml
- name: Run unit tests
  run: npm test -- --coverage --maxWorkers=2

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
```

## Resources

- [WordPress Jest Preset Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-jest-preset-default/)
- [Jest Official Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [WordPress Testing Best Practices](https://developer.wordpress.org/block-editor/contributors/code/testing-overview/)
