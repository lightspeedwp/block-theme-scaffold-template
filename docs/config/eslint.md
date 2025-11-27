# ESLint Configuration

## Overview

ESLint is a JavaScript linting tool that helps enforce code quality and style guidelines. This theme uses the official WordPress ESLint plugin with custom overrides.

## Configuration File

Location: `.eslint.config.cjs`

## WordPress Packages Used

- `@wordpress/eslint-plugin@^22.21.0` - Official WordPress ESLint configuration

## Configuration

```javascript
module.exports = {
 extends: [ '@wordpress/eslint-plugin/recommended' ],
 env: {
  browser: true,
  es6: true,
  node: true,
  jquery: true,
 },
 globals: {
  wp: 'readonly',
  wpApiSettings: 'readonly',
  ajaxurl: 'readonly',
 },
 rules: {
  'no-console': 'warn',
  'no-debugger': 'error',
 },
 overrides: [
  {
   files: [ '*.test.js', '*.spec.js' ],
   env: {
    jest: true,
   },
  },
  {
   files: [ 'tests/e2e/**/*.js' ],
   extends: [ '@wordpress/eslint-plugin/recommended-with-formatting' ],
   env: {
    node: true,
   },
   globals: {
    page: 'readonly',
    browser: 'readonly',
    context: 'readonly',
    jestPuppeteer: 'readonly',
   },
  },
 ],
};
```

## Key Features

### Base Configuration

- **Extends**: `@wordpress/eslint-plugin/recommended`
  - Includes WordPress coding standards
  - ES2015+ support
  - React/JSX rules
  - Accessibility rules

### Environments

- **browser**: Enables browser global variables
- **es6**: Enables ES6 syntax
- **node**: Enables Node.js global variables
- **jquery**: Enables jQuery global variables

### Global Variables

- **wp**: WordPress JavaScript API (read-only)
- **wpApiSettings**: WordPress API settings (read-only)
- **ajaxurl**: WordPress AJAX URL (read-only)

### Custom Rules

- **no-console**: `warn` - Warns on console statements (useful for debugging)
- **no-debugger**: `error` - Prevents debugger statements in production

### Overrides

#### Test Files

- **Files**: `*.test.js`, `*.spec.js`
- **Environment**: Jest
- Enables Jest global variables and functions

#### E2E Tests

- **Files**: `tests/e2e/**/*.js`
- **Extends**: `@wordpress/eslint-plugin/recommended-with-formatting`
- **Globals**: Playwright/Puppeteer globals (page, browser, context, jestPuppeteer)

## Available Scripts

```bash
# Lint JavaScript files
npm run lint:js

# Lint and auto-fix JavaScript files
npm run lint:js:fix
```

## Usage

### Auto-fix on Save (VS Code)

Add to `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

### Command Line

```bash
# Lint all JS files
npx eslint "src/**/*.js"

# Auto-fix issues
npx eslint "src/**/*.js" --fix

# Lint specific file
npx eslint src/js/theme.js
```

## Customization

### Adding Custom Rules

```javascript
module.exports = {
 extends: [ '@wordpress/eslint-plugin/recommended' ],
 rules: {
  'no-console': 'off', // Allow console statements
  'import/no-unresolved': 'error', // Ensure imports are valid
 },
};
```

### Ignoring Files

Create `.eslintignore`:

```
build/
node_modules/
vendor/
*.min.js
```

## Available Rulesets

The `@wordpress/eslint-plugin` provides several presets:

- **recommended**: Complete WordPress coding standards (default)
- **recommended-with-formatting**: Includes Prettier formatting rules
- **esnext**: ES2015+ only
- **custom**: WordPress-specific custom rules
- **react**: React-specific rules
- **i18n**: Internationalization rules

### Using Alternative Presets

```javascript
module.exports = {
 extends: [ '@wordpress/eslint-plugin/recommended-with-formatting' ],
};
```

## Integration with Other Tools

### Prettier

This theme uses `@wordpress/prettier-config`. ESLint and Prettier work together - ESLint handles code quality, Prettier handles formatting.

### Husky + lint-staged

Pre-commit hooks automatically lint and fix files:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "wp-scripts lint-js --fix",
      "wp-scripts format"
    ]
  }
}
```

## Common Issues

### "Definition for rule was not found"

**Solution**: Update ESLint plugin

```bash
npm install @wordpress/eslint-plugin@latest --save-dev
```

### Global variables are undefined

**Solution**: Add them to the `globals` section in the config file.

## Resources

- [WordPress ESLint Plugin Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-eslint-plugin/)
- [ESLint Official Documentation](https://eslint.org/docs/latest/)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/)
