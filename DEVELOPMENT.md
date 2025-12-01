---
title: Development Guide
description: Comprehensive development guide for WordPress block theme scaffold
category: Documentation
type: Guide
audience: Developers
date: 2025-12-01
---

# Development Guide

This document provides comprehensive information for developers working on {{theme_name}}.

## Prerequisites

- **Node.js** 18.0+ and npm 8.0+
- **PHP** 8.0+ with Composer
- **WordPress** {{min_wp_version}} or higher (for testing)
- **Git** for version control
- **Docker** (optional, for containerized development)

## Environment Setup

### 1. Clone and Install

```bash
git clone {{theme_repo_url}}
cd {{theme_slug}}
npm install
composer install
```

### 2. WordPress Environment

We use `@wordpress/env` for local development:

```bash
# Start WordPress environment
npm run env:start

# Visit your site
open http://localhost:8888

# WordPress admin
open http://localhost:8888/wp-admin
# Username: admin
# Password: password
```

### 3. Development Workflow

```bash
# Start development with hot reload
npm run start

# In another terminal, watch for PHP changes
composer run test -- --watch
```

## Architecture

### Theme Structure

The theme follows WordPress block theme best practices:

```
{{theme_slug}}/
├── .github/            # GitHub workflows and automation
│   ├── agents/         # AI agents and automation specs
│   ├── instructions/   # Development instructions for AI tools
│   ├── prompts/        # Prompt templates for AI assistance
│   └── workflows/      # GitHub Actions CI/CD workflows
├── .devcontainer/      # Docker development container
├── assets/             # Source assets (images, fonts, etc.)
├── inc/                # PHP includes and functionality
│   ├── block-patterns.php
│   ├── block-styles.php
│   ├── template-functions.php
│   ├── deprecation.php
│   ├── nonce.php
│   └── README.md
├── parts/              # Template parts (header, footer, sidebar, etc.)
│   ├── header.html
│   ├── footer.html
│   ├── sidebar.html
│   └── README.md
├── patterns/           # Block patterns
│   ├── hero.php
│   ├── call-to-action.php
│   ├── features.php
│   └── README.md
├── src/                # Source files for build process
│   ├── css/           # SCSS/CSS source files
│   ├── js/            # JavaScript source files
│   └── README.md
├── styles/             # Style variations
│   ├── dark.json      # Dark mode style variation
│   ├── blocks/        # Block-specific style variations
│   ├── sections/      # Section style variations
│   └── README.md
├── templates/          # Block templates for FSE
│   ├── index.html
│   ├── single.html
│   ├── archive.html
│   ├── 404.html
│   └── README.md
├── tests/              # Test files
│   ├── e2e/           # Playwright E2E tests
│   ├── js/            # Jest unit tests
│   ├── php/           # PHPUnit tests
│   └── README.md
├── languages/          # Translation files
│   └── README.md
├── functions.php       # Theme functions entry point
├── style.css           # Main stylesheet with theme metadata
├── theme.json          # Theme configuration and settings
├── composer.json       # PHP dependencies
├── package.json        # Node.js dependencies and scripts
├── webpack.config.cjs  # Webpack bundling configuration
├── phpcs.xml           # PHP CodeSniffer configuration
├── phpunit.xml         # PHPUnit configuration
├── jest.config.js      # Jest configuration
└── README.md           # Project overview
```

### Mustache Template System

All files use mustache-style placeholders for customization:

#### Theme Variables

- `{{theme_name}}` - Display name of the theme
- `{{theme_slug}}` - URL-safe theme identifier
- `{{theme_repo_url}}` - Repository URL
- `{{description}}` - Theme description
- `{{author}}` - Theme author name
- `{{author_uri}}` - Author website URL
- `{{license}}` - License identifier (e.g., GPL-3.0-or-later)
- `{{license_uri}}` - License URL
- `{{version}}` - Theme version
- `{{min_wp_version}}` - Minimum WordPress version
- `{{min_php_version}}` - Minimum PHP version

#### Customization Variables

- `{{primary_color}}` - Primary brand color (hex)
- `{{secondary_color}}` - Secondary color (hex)
- `{{background_color}}` - Background color (hex)
- `{{text_color}}` - Text color (hex)
- `{{body_font}}` - Body font family

## Internationalization (i18n)

The theme is fully prepared for internationalization:

### JavaScript

```javascript
import { __ } from '@wordpress/i18n';

// Basic translation
const text = __( 'Hello World', '{{theme_slug}}' );

// With context
const text = _x( 'Post', 'noun', '{{theme_slug}}' );

// Pluralization
const text = _n( '%d item', '%d items', count, '{{theme_slug}}' );
```

### PHP

```php
// Basic translation
$text = __( 'Hello World', '{{theme_slug}}' );

// Escaped output
echo esc_html__( 'Hello World', '{{theme_slug}}' );

// With context
$text = _x( 'Post', 'noun', '{{theme_slug}}' );
```

### Making Strings Translatable

1. Add to PHP files: `__( 'String', '{{theme_slug}}' )`
2. Add to JavaScript: `__( 'String', '{{theme_slug}}' )`
3. Run: `npm run makepot` to generate POT file
4. Run: `npm run makejson` to generate JSON translation files

## Code Standards

### WordPress Coding Standards

We follow WordPress coding standards strictly:

#### PHP Standards

- **WordPress PHP Coding Standards** (WPCS)
- **DocBlock** comments for all functions/classes
- **Type hints** where possible (PHP 8.0+)
- **Proper escaping** and sanitization
- **Security nonces** for form submissions

#### JavaScript Standards

- **@wordpress/eslint-plugin** for linting
- **Prettier** for code formatting
- **JSDoc** comments for functions
- **React hooks** patterns (no class components)

#### CSS/SCSS Standards

- **@wordpress/stylelint-config** for linting
- **BEM methodology** for CSS class naming
- **Mobile-first** responsive design
- **CSS custom properties** for theming

### File Organization

```
src/
├── css/               # SCSS/CSS source files
│   ├── abstracts/     # Variables, mixins, functions
│   ├── base/          # Reset, typography, etc.
│   ├── components/    # Reusable component styles
│   ├── utilities/     # Utility classes
│   └── editor.scss    # Editor-only styles
├── js/                # JavaScript source files
│   ├── frontend/      # Frontend scripts
│   ├── editor/        # Block editor scripts
│   └── shared/        # Shared utilities
└── README.md
```

## Available Scripts

### Build Commands

- `npm run start` - Start development mode with hot reloading
- `npm run build` - Build optimized production assets
- `npm run build:production` - Alternative production build command

### Code Quality

- `npm run lint` - Run all linters (JavaScript, CSS, PHP)
- `npm run lint:js` - Lint JavaScript files
- `npm run lint:js:fix` - Auto-fix JavaScript issues
- `npm run lint:css` - Lint CSS/Sass files
- `npm run lint:css:fix` - Auto-fix CSS issues
- `npm run lint:php` - Lint PHP files (requires Composer)
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check formatting without modifying

### Testing

- `npm run test` - Run all tests (JavaScript + PHP)
- `npm run test:js` - Run JavaScript unit tests (Jest)
- `npm run test:js:watch` - Run Jest in watch mode
- `npm run test:js:debug` - Debug Jest tests in Node
- `npm run test:php` - Run PHP unit tests (PHPUnit)
- `npm run test:e2e` - Run end-to-end tests (Playwright)
- `npm run test:e2e:debug` - Debug E2E tests
- `npm run test:a11y` - Run accessibility tests

### Internationalization

- `npm run makepot` - Generate translation POT file
- `npm run makejson` - Generate JSON translation files
- `npm run i18n` - Complete i18n workflow (makepot + makejson)

### Performance & Quality

- `npm run lighthouse` - Run Lighthouse CI audits
- `npm run size-limit` - Check bundle size limits
- `npm run analyze-bundle` - Analyze webpack bundle
- `npm run performance` - Run all performance checks

### Environment Management

- `npm run env:start` - Start WordPress environment
- `npm run env:stop` - Stop WordPress environment
- `npm run env:destroy` - Destroy WordPress environment
- `npm run env:logs` - View environment logs

## Testing

### JavaScript Testing

We use Jest and Testing Library:

```bash
# Run all tests
npm run test:js

# Watch mode
npm run test:js:watch

# Coverage report
npm run test:js -- --coverage

# Debug specific test
npm run test:js:debug -- path/to/test.js
```

#### Test Structure

```javascript
import { render, screen } from '@testing-library/react';
import { MyBlock } from '../';

describe( '{{theme_slug}} Block', () => {
  it( 'renders correctly', () => {
    render( <MyBlock /> );
    expect( screen.getByText( 'Expected text' ) ).toBeInTheDocument();
  } );
} );
```

### PHP Testing

We use PHPUnit with WordPress testing framework:

```bash
# Run PHP tests
npm run test:php

# Or with Composer
composer run test

# Run specific test file
npm run test:php -- tests/test-file.php
```

#### Test Structure

```php
<?php
class Test_{{theme_slug}} extends WP_UnitTestCase {

  public function test_example() {
    $this->assertTrue( true );
  }
}
```

### End-to-End Testing

We use Playwright for E2E testing:

```bash
# Run E2E tests
npm run test:e2e

# Debug mode
npm run test:e2e -- --debug

# Run specific test
npm run test:e2e -- path/to/test.js

# Generate test report
npm run test:e2e -- --reporter=html
```

## Build Process

### Development Build

```bash
npm run start
```

This starts webpack in watch mode with:

- Hot module replacement (HMR)
- Source maps for debugging
- Development optimizations
- Live reloading on file changes

### Production Build

```bash
npm run build
```

This creates optimized assets in `build/`:

- Minified JavaScript (Terser)
- Compressed CSS (cssnano)
- Asset manifests
- Source maps (separate files)

### Build Configuration

The build process is configured via:

- `webpack.config.cjs` - Custom webpack configuration
- `postcss.config.cjs` - PostCSS processing
- `.babelrc` - Babel transpilation settings
- `.eslintrc` - ESLint configuration
- `.stylelintrc` - Stylelint configuration

#### Webpack Configuration

The `webpack.config.cjs` extends `@wordpress/scripts` with custom settings:

**Entry Points:**

- Main theme styles and scripts

**Optimization:**

- Separate CSS bundles for frontend and editor
- Code splitting for better performance
- Asset size limits and quality gates

## Debugging

### PHP Debugging

Configure Xdebug in your environment and use the VSCode launch configuration:

1. Start Xdebug in your WordPress environment
2. Open VSCode
3. Set breakpoints in PHP files
4. Start debugging with F5

### JavaScript Debugging

Use browser developer tools or VSCode:

```javascript
// Add debugging statements
console.log( 'Debug info:', data );
debugger; // Breakpoint in browser
```

### WordPress Debugging

Enable debugging in `wp-config.php`:

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'SCRIPT_DEBUG', true );
```

## Customization

### Using theme.json

The `theme.json` file controls all theme settings:

```json
{
  "$schema": "https://schemas.wp.org/wp/6.5/theme.json",
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        { "color": "{{primary_color}}", "name": "Primary", "slug": "primary" }
      ]
    },
    "typography": {
      "fontFamilies": [
        { "fontFamily": "{{body_font}}", "name": "Body Font", "slug": "body" }
      ]
    }
  }
}
```

### Adding Custom Patterns

1. Create new pattern files in the `patterns/` directory
2. Register patterns in `inc/block-patterns.php`:

```php
register_block_pattern(
  '{{theme_slug}}/pattern-name',
  array(
    'title'       => __( 'Pattern Name', '{{theme_slug}}' ),
    'description' => __( 'Pattern description', '{{theme_slug}}' ),
    'content'     => '<!-- wp:paragraph --><p>Content</p><!-- /wp:paragraph -->',
    'categories'  => array( 'featured' ),
  )
);
```

3. Add pattern categories as needed in `inc/block-patterns.php`

### Adding Style Variations

1. Create new JSON file in `styles/` directory
2. Define color, typography, and spacing variations
3. Theme will automatically register the variation

## Performance

### JavaScript Optimization

- Use **React.memo()** for expensive components
- Implement **proper dependencies** in useEffect hooks
- **Code splitting** with dynamic imports
- **Tree shaking** to remove unused code
- Minimize bundle size (checked by size-limit)

### CSS Optimization

- **Critical CSS** inlining for above-the-fold content
- **CSS purging** to remove unused styles
- **CSS custom properties** for efficient theming
- **Mobile-first** responsive design
- Minification in production builds

### PHP Optimization

- **Transient caching** for expensive operations
- **Object caching** where available
- **Database query optimization**
- **Lazy loading** for images and iframes

## Troubleshooting

### Common Issues

#### Build Failures

1. **Clear caches**: `npm run clean && rm -rf node_modules && npm install`
2. **Check Node version**: Must be 18.0+
3. **Update dependencies**: `npm update`
4. **Check for syntax errors**: `npm run lint:js:fix && npm run lint:css:fix`

#### WordPress Environment Issues

1. **Reset environment**: `npm run env:destroy && npm run env:start`
2. **Check ports**: Ensure 8888 is available
3. **Docker issues**: Restart Docker Desktop
4. **Permission errors**: Run `sudo chown -R $USER:$USER .devcontainer`

#### Test Failures

1. **Update snapshots**: `npm run test:js -- --updateSnapshot`
2. **Check database**: Ensure test database is configured
3. **Clear test cache**: `npm run test:js -- --clearCache`
4. **PHP tests**: Run `./bin/install-wp-tests.sh` first time

#### Linting Errors

1. **Fix JavaScript**: `npm run lint:js:fix`
2. **Fix CSS**: `npm run lint:css:fix`
3. **Fix PHP**: `npm run lint:php` (review warnings)
4. **Format code**: `npm run format`

### Getting Help

1. Check existing [GitHub Issues]({{theme_repo_url}}/issues)
2. Read [WordPress Block Theme Handbook](https://developer.wordpress.org/themes/block-themes/)
3. Review [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
4. Join [WordPress Slack](https://wordpress.slack.com) #core-themes channel
5. Review [LightSpeed Standards](https://github.com/lightspeedwp/.github)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Build Process](docs/BUILD-PROCESS.md)** - Complete build system guide
- **[Testing Guide](docs/TESTING.md)** - Running and writing tests
- **[Internationalization](docs/INTERNATIONALIZATION.md)** - i18n and translation guide
- **[Tool Configuration](docs/TOOL-CONFIGS.md)** - Linting, formatting, and build tools
- **[Agents Guide](docs/AGENTS.md)** - AI agents and automation
- **[Workflows Guide](docs/WORKFLOWS.md)** - CI/CD workflows documentation
- **[API Reference](docs/API-REFERENCE.md)** - Theme API documentation
- **[Performance](docs/PERFORMANCE.md)** - Performance optimization guide
- **[Security Headers](docs/SECURITY-HEADERS.md)** - Security best practices
- **[Security Nonces](docs/SECURITY-NONCE.md)** - Nonce usage guidelines

**Configuration Documentation** (`docs/config/`):

- [wp-scripts](docs/config/wp-scripts.md) - Complete @wordpress/scripts guide
- [Webpack](docs/config/webpack.md) - Bundling configuration
- [Babel](docs/config/babel.md) - JavaScript compilation
- [ESLint](docs/config/eslint.md) - JavaScript linting
- [Stylelint](docs/config/stylelint.md) - CSS/Sass linting
- [PostCSS](docs/config/postcss.md) - CSS processing
- [Jest](docs/config/jest.md) - Unit testing
- [Playwright](docs/config/playwright.md) - E2E testing
- [Prettier](docs/config/prettier.md) - Code formatting

## License

This theme is licensed under the {{license}} - see the [LICENSE](LICENSE) file for details.

---

**{{theme_name}}** | v{{version}} | [{{license}}]({{license_uri}})
