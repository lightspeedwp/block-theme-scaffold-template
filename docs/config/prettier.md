# Prettier Configuration

## Overview

Prettier is an opinionated code formatter that enforces consistent code style across your project. This theme uses the official WordPress Prettier configuration.

## Configuration

This theme extends `@wordpress/prettier-config` via `package.json`:

```json
{
  "prettier": "@wordpress/prettier-config"
}
```

## WordPress Package Used

- `@wordpress/prettier-config@^4.35.0` - Official WordPress Prettier configuration

## Default Settings

The WordPress Prettier config includes:

- **printWidth**: 80 characters
- **tabWidth**: 4 spaces (note: WordPress uses tabs for PHP, spaces for JS)
- **useTabs**: true (for PHP files)
- **singleQuote**: true (for JavaScript)
- **trailingComma**: 'es5' (trailing commas where valid in ES5)
- **bracketSpacing**: true
- **arrowParens**: 'always'
- **endOfLine**: 'lf' (Unix-style line endings)

## Available Scripts

```bash
# Format all files
npm run format

# Format is also run automatically via lint-staged on commit
```

## Supported File Types

Prettier formats the following file extensions by default:

- JavaScript: `.js`, `.jsx`, `.mjs`, `.cjs`
- TypeScript: `.ts`, `.tsx`
- JSON: `.json`
- Markdown: `.md`, `.mdx`
- YAML: `.yml`, `.yaml`
- CSS/SCSS: `.css`, `.scss`, `.sass`
- HTML: `.html`

## Usage

### Command Line

```bash
# Format all supported files
npx prettier --write .

# Format specific files
npx prettier --write "src/**/*.{js,jsx,ts,tsx}"

# Check formatting without modifying
npx prettier --check .
```

### VS Code Integration

Install the Prettier extension and add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Customization

To override specific settings, create a `.prettierrc.js` file:

```javascript
module.exports = {
 ...require( '@wordpress/prettier-config' ),
 printWidth: 100, // Override print width
 semi: true, // Always use semicolons
};
```

Or use `.prettierrc.json`:

```json
{
  "extends": "@wordpress/prettier-config",
  "printWidth": 100
}
```

## Ignoring Files

Create `.prettierignore` to exclude files:

```
build/
node_modules/
vendor/
*.min.js
*.min.css
package-lock.json
composer.lock
```

## Integration with ESLint

Prettier handles formatting, ESLint handles code quality. They work together seamlessly when using the WordPress configurations.

**Important**: Do not use `eslint-plugin-prettier` or `eslint-config-prettier` with the WordPress configs - they already handle the integration properly.

## Pre-commit Formatting

Files are automatically formatted on commit via `lint-staged`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "wp-scripts lint-js --fix",
      "wp-scripts format"
    ],
    "*.{css,scss,sass}": [
      "wp-scripts lint-style --fix"
    ]
  }
}
```

## Common Patterns

### Disabling Formatting for Specific Code

Use `// prettier-ignore` comment:

```javascript
// prettier-ignore
const matrix = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];
```

### Markdown

For markdown files, Prettier will:

- Wrap text at 80 characters (by default)
- Normalize list formatting
- Format code blocks
- Normalize tables

To disable for a file, add to `.prettierignore` or use:

```markdown
<!-- prettier-ignore -->
```

## Resources

- [WordPress Prettier Config Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-prettier-config/)
- [Prettier Official Documentation](https://prettier.io/docs/en/index.html)
- [Prettier Options](https://prettier.io/docs/en/options.html)
