---
title: Babel Configuration
description: Babel JavaScript compiler configuration and best practices
category: Configuration
type: Reference
audience: Developers
date: 2025-12-01
---

## Overview

Babel is a JavaScript compiler that transforms modern JavaScript (ES2015+) and JSX into backwards-compatible code. This theme uses the WordPress Babel preset for consistent transpilation.

## Configuration

Babel configuration is integrated into the webpack configuration (`webpack.config.cjs`) rather than a separate `.babelrc` file.

## WordPress Packages Used

- `@wordpress/babel-preset-default` - ^8.35.0
- `@wordpress/babel-plugin-makepot` - ^6.35.0

## Webpack Babel Configuration

```javascript
{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@wordpress/babel-preset-default'],
      plugins: [
        [
          '@wordpress/babel-plugin-makepot',
          {
            output: 'languages/{{theme_slug}}-js.pot',
          },
        ],
      ],
    },
  },
}
```

## @wordpress/babel-preset-default Features

### JavaScript Features

The WordPress Babel preset includes support for:

#### ECMAScript 2015+ (ES6+)

- Arrow functions: `() => {}`
- Classes: `class MyClass {}`
- Template literals: `` `Hello ${name}` ``
- Destructuring: `const { prop } = object`
- Spread operator: `...array`
- Async/await: `async () => await promise`
- Modules: `import/export`
- Default parameters: `function(param = 'default')`
- Rest parameters: `function(...args)`
- Object shorthand: `{ name, value }`
- Computed property names: `{ [key]: value }`

#### JSX Support

```jsx
const Component = () => {
  return (
    <div className="component">
      <h1>Title</h1>
      <p>Content</p>
    </div>
  );
};
```

#### React Features

- JSX transforms
- React hooks support
- Fragment shorthand: `<>...</>`

### Polyfills and Runtime

The preset includes:

- **@babel/runtime**: Helpers to avoid code duplication
- **regenerator-runtime**: For async/await and generators
- **core-js**: Polyfills for modern JavaScript features

### Browser Targets

Uses `@wordpress/browserslist-config` for browser compatibility:

- Last 2 versions of major browsers
- IE 11+ (with polyfills)
- Safari 12+
- iOS 12+
- Android 4.4+

## @wordpress/babel-plugin-makepot

This plugin extracts translatable strings during build:

### Features

- Extracts `__()`, `_n()`, `_x()`, `_nx()` calls
- Creates `.pot` file for translation
- Integrates with WordPress i18n

### Configuration

```javascript
[
  '@wordpress/babel-plugin-makepot',
  {
    output: 'languages/theme-slug-js.pot',
  },
]
```

### Example Usage

```javascript
import { __ } from '@wordpress/i18n';

const title = __('Welcome', 'theme-slug');
const count = _n('%d item', '%d items', items.length, 'theme-slug');
```

## Babel Preset Options

### Custom Configuration

Create a `.babelrc.js` file for advanced customization:

```javascript
module.exports = {
  presets: [
    [
      '@wordpress/babel-preset-default',
      {
        // Enable modern features
        modules: false, // Keep ES modules for webpack tree-shaking

        // Customize browser targets
        targets: {
          browsers: ['last 2 versions', 'ie >= 11'],
        },

        // Enable debug mode
        debug: false,
      },
    ],
  ],
  plugins: [
    '@wordpress/babel-plugin-makepot',
    // Add custom plugins here
  ],
};
```

### Common Options

#### modules

```javascript
{
  modules: false // Preserve ES modules for webpack
}
```

#### useBuiltIns

```javascript
{
  useBuiltIns: 'usage', // Automatic polyfills based on code
  corejs: 3
}
```

#### debug

```javascript
{
  debug: true // Show which transforms are applied
}
```

## Usage in @wordpress/scripts

When using `@wordpress/scripts`, Babel is preconfigured:

```bash
# Build with Babel transpilation
npm run build

# Watch mode
npm run start
```

### Build Process

1. Babel reads JSX and modern JavaScript
2. Transforms code based on preset rules
3. Extracts translatable strings (makepot)
4. Outputs browser-compatible JavaScript
5. Webpack bundles the result

## Custom Babel Plugins

### Adding Custom Plugins

```javascript
// webpack.config.cjs
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@wordpress/babel-preset-default'],
            plugins: [
              '@wordpress/babel-plugin-makepot',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-optional-chaining',
            ],
          },
        },
      },
    ],
  },
};
```

### Popular Plugins

- `@babel/plugin-proposal-class-properties` - Class fields
- `@babel/plugin-proposal-optional-chaining` - `obj?.prop`
- `@babel/plugin-proposal-nullish-coalescing-operator` - `??`
- `@babel/plugin-transform-runtime` - Optimize helpers

## Debugging Babel

### Check Compiled Output

```bash
# Build and inspect
npm run build
cat public/js/theme.js
```

### Enable Debug Mode

```javascript
{
  presets: [
    ['@wordpress/babel-preset-default', { debug: true }]
  ]
}
```

### Test Specific File

```bash
npx babel src/js/theme.js --out-file test.js --presets=@wordpress/babel-preset-default
```

## Environment-Specific Configuration

### Development

```javascript
{
  presets: [
    [
      '@wordpress/babel-preset-default',
      {
        debug: true,
        modules: false,
      },
    ],
  ],
}
```

### Production

```javascript
{
  presets: [
    [
      '@wordpress/babel-preset-default',
      {
        debug: false,
        modules: false,
      },
    ],
  ],
}
```

## TypeScript Support

For TypeScript, add preset:

```javascript
{
  presets: [
    '@babel/preset-typescript',
    '@wordpress/babel-preset-default',
  ],
}
```

## Polyfill Strategy

### Automatic (Recommended)

```javascript
{
  presets: [
    [
      '@wordpress/babel-preset-default',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ],
}
```

### Manual Entry Point

```javascript
// src/js/theme.js
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Your code...
```

## Common Issues

### "regeneratorRuntime is not defined"

**Cause**: Missing async/await polyfill

**Solution**: Ensure `@wordpress/babel-preset-default` is used:

```javascript
{
  presets: ['@wordpress/babel-preset-default']
}
```

### JSX Not Transforming

**Cause**: Missing preset or wrong file extension

**Solution**:

1. Use `.jsx` extension or configure `.js` files
2. Ensure webpack rule includes `.jsx?$`

```javascript
{
  test: /\.jsx?$/,
  use: 'babel-loader'
}
```

### Large Bundle Size

**Cause**: Unnecessary polyfills

**Solution**: Use `useBuiltIns: 'usage'`:

```javascript
{
  presets: [
    [
      '@wordpress/babel-preset-default',
      { useBuiltIns: 'usage', corejs: 3 }
    ]
  ]
}
```

### Slow Build Times

**Cause**: Transpiling node_modules

**Solution**: Exclude node_modules:

```javascript
{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: 'babel-loader'
}
```

## Caching

Enable Babel caching for faster builds:

```javascript
{
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    cacheCompression: false,
    presets: ['@wordpress/babel-preset-default'],
  },
}
```

## VS Code Integration

### IntelliSense for Modern JavaScript

`.vscode/settings.json`:

```json
{
  "javascript.validate.enable": true,
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### JSX IntelliSense

```json
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

## Best Practices

1. **Use WordPress Preset**: Maintains consistency with WordPress core
2. **Don't Transpile node_modules**: Exclude for performance
3. **Enable Caching**: Speeds up subsequent builds
4. **Use Tree Shaking**: Set `modules: false` for webpack
5. **Target Modern Browsers**: Reduces bundle size
6. **Extract Translations**: Use makepot plugin for i18n
7. **Test Compiled Output**: Verify transpilation works
8. **Update Regularly**: Keep Babel preset current

## Resources

- [Babel Official Documentation](https://babeljs.io/docs/)
- [WordPress Babel Preset Default](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-babel-preset-default/)
- [WordPress Babel Plugin Makepot](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-babel-plugin-makepot/)
- [Browserslist](https://github.com/browserslist/browserslist)
- [Core-js](https://github.com/zloirock/core-js)
- [WordPress JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/)
