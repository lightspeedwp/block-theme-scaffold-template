---
title: Stylelint Configuration
description: CSS linting rules and code quality standards
category: Configuration
type: Reference
audience: Developers
date: 2025-12-01
---

## Overview

Stylelint is a CSS linter that helps enforce consistent conventions and avoid errors in stylesheets. This theme uses the WordPress Stylelint configuration with SCSS support.

## Configuration File

Location: `.stylelint.config.cjs`

## WordPress Package Used

- `@wordpress/stylelint-config@^23.27.0` - Official WordPress Stylelint configuration

## Configuration

```javascript
module.exports = {
 extends: [ '@wordpress/stylelint-config/scss' ],
 rules: {
  'at-rule-no-unknown': [
   true,
   {
    ignoreAtRules: [
     'tailwind',
     'apply',
     'layer',
     'config',
     'variants',
     'responsive',
     'screen',
    ],
   },
  ],
  'declaration-property-unit-allowed-list': {
   'line-height': [ 'px', 'em', 'rem', '%', '' ],
  },
  'selector-class-pattern': null,
  'selector-id-pattern': null,
 },
};
```

## Key Features

### Base Configuration

- **Extends**: `@wordpress/stylelint-config/scss`
  - WordPress CSS Coding Standards
  - SCSS/Sass syntax support
  - Accessibility rules
  - Modern CSS features

### Custom Rule Overrides

#### at-rule-no-unknown

Allows Tailwind CSS at-rules:

- `@tailwind`
- `@apply`
- `@layer`
- `@config`
- `@variants`
- `@responsive`
- `@screen`

#### declaration-property-unit-allowed-list

Allows flexible units for `line-height`:

- `px` - pixels
- `em` - relative to font-size
- `rem` - relative to root font-size
- `%` - percentage
- `` - unitless (preferred for line-height)

#### Selector Patterns

- **selector-class-pattern**: `null` - No restrictions on class naming
- **selector-id-pattern**: `null` - No restrictions on ID naming

## Available Presets

The `@wordpress/stylelint-config` package provides several presets:

### Default (CSS only)

```javascript
module.exports = {
 extends: [ '@wordpress/stylelint-config' ],
};
```

### SCSS (recommended)

```javascript
module.exports = {
 extends: [ '@wordpress/stylelint-config/scss' ],
};
```

### With Stylistic Rules

```javascript
module.exports = {
 extends: [ '@wordpress/stylelint-config/stylistic' ],
};
```

### SCSS + Stylistic

```javascript
module.exports = {
 extends: [ '@wordpress/stylelint-config/scss-stylistic' ],
};
```

## Available Scripts

```bash
# Lint CSS/SCSS files
npm run lint:css

# Lint and auto-fix CSS/SCSS files
npm run lint:css:fix
```

## Usage

### Command Line

```bash
# Lint all style files
npx stylelint "src/**/*.{css,scss}"

# Auto-fix issues
npx stylelint "src/**/*.{css,scss}" --fix

# Lint specific file
npx stylelint src/css/style.scss
```

### VS Code Integration

Install the Stylelint extension and add to `.vscode/settings.json`:

```json
{
  "stylelint.enable": true,
  "stylelint.validate": ["css", "scss"],
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  }
}
```

## Customization

### Adding Custom Rules

```javascript
module.exports = {
 extends: [ '@wordpress/stylelint-config/scss' ],
 rules: {
  'color-hex-case': 'upper', // Enforce uppercase hex colors
  'indentation': 'tab', // Use tabs for indentation
  'max-nesting-depth': 3, // Limit nesting depth
 },
};
```

### Disabling Rules

```javascript
module.exports = {
 extends: [ '@wordpress/stylelint-config/scss' ],
 rules: {
  'no-descending-specificity': null, // Disable this rule
 },
};
```

### Ignoring Files

Create `.stylelintignore`:

```
build/
node_modules/
vendor/
*.min.css
```

## Common Rules

### WordPress-Specific

- **indentation**: Tab-based indentation (WordPress standard)
- **string-quotes**: Single quotes for strings
- **at-rule-empty-line-before**: Enforces blank lines for readability
- **declaration-block-no-duplicate-properties**: Prevents duplicate properties

### Best Practices

- **no-duplicate-selectors**: Prevents duplicate selectors
- **no-descending-specificity**: Prevents specificity issues
- **color-no-invalid-hex**: Validates hex colors
- **unit-allowed-list**: Restricts units to safe values

### SCSS-Specific

- **scss/at-rule-no-unknown**: Validates SCSS at-rules
- **scss/dollar-variable-pattern**: Enforces variable naming
- **scss/selector-no-redundant-nesting-selector**: Prevents unnecessary nesting

## Integration with Other Tools

### Prettier

Stylelint and Prettier work together - Stylelint handles CSS quality, Prettier handles formatting.

### Pre-commit Hooks

```json
{
  "lint-staged": {
    "*.{css,scss,sass}": [
      "wp-scripts lint-style --fix"
    ]
  }
}
```

## Disabling Rules Inline

### In CSS/SCSS

```css
/* stylelint-disable selector-class-pattern */
.MyComponent {
 color: red;
}
/* stylelint-enable selector-class-pattern */
```

### For Single Line

```css
.MyComponent { /* stylelint-disable-line selector-class-pattern */
 color: red;
}
```

### For Next Line

```css
/* stylelint-disable-next-line selector-class-pattern */
.MyComponent {
 color: red;
}
```

## Common Issues

### Unknown at-rules

**Problem**: `@apply` or `@tailwind` flagged as unknown

**Solution**: Add to `ignoreAtRules`:

```javascript
{
  'at-rule-no-unknown': [
    true,
    {
      ignoreAtRules: ['apply', 'tailwind', 'layer']
    }
  ]
}
```

### Selector pattern errors

**Problem**: BEM or custom naming conventions flagged

**Solution**: Disable the pattern rules:

```javascript
{
  'selector-class-pattern': null,
  'selector-id-pattern': null
}
```

### Conflicting with Prettier

**Problem**: Stylelint and Prettier disagree

**Solution**: The WordPress configs already handle this. If issues persist, ensure you're using `@wordpress/stylelint-config` and `@wordpress/prettier-config`.

## Resources

- [WordPress Stylelint Config Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-stylelint-config/)
- [Stylelint Official Documentation](https://stylelint.io/)
- [Stylelint Rules](https://stylelint.io/user-guide/rules/)
- [WordPress CSS Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/)
