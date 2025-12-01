---
title: PostCSS Configuration
description: CSS post-processing and transformation configuration
category: Configuration
type: Reference
audience: Developers
date: 2025-12-01
---

## Overview

PostCSS is a tool for transforming CSS with JavaScript plugins. This theme uses it for autoprefixing and minification.

## Configuration File

Location: `.postcss.config.cjs`

## Configuration

```javascript
module.exports = {
 plugins: [
  require( 'autoprefixer' ),
  require( 'cssnano' )( {
   preset: 'default',
  } ),
 ],
};
```

## WordPress Packages Used

- `@wordpress/postcss-plugins-preset@^5.35.0` - WordPress PostCSS plugins preset (optional enhancement)
- `@wordpress/postcss-themes@^6.35.0` - Theme-specific PostCSS features (optional, theme-only)

## Included Plugins

### Autoprefixer

Automatically adds vendor prefixes to CSS rules based on browser support.

**Features**:

- Adds `-webkit-`, `-moz-`, `-ms-`, `-o-` prefixes as needed
- Uses data from [Can I Use](https://caniuse.com/)
- Respects `browserslist` configuration in `package.json`

**Example**:

Input:

```css
.element {
 display: flex;
 user-select: none;
}
```

Output:

```css
.element {
 display: -webkit-box;
 display: -ms-flexbox;
 display: flex;
 -webkit-user-select: none;
 -moz-user-select: none;
 -ms-user-select: none;
 user-select: none;
}
```

### cssnano

Minifies and optimizes CSS for production.

**Features**:

- Removes comments and whitespace
- Merges identical rules
- Optimizes colors and values
- Removes unused code

**Preset**: `default`

- Balanced optimization
- Safe transformations only
- Compatible with all browsers

## Browser Support

Defined in `package.json`:

```json
{
  "browserslist": [
    "extends @wordpress/browserslist-config"
  ]
}
```

The WordPress browserslist config targets:

- Last 2 versions of modern browsers
- IE 11+
- Safari 12+
- iOS 12+
- Android 4.4+

## Integration with Webpack

PostCSS is automatically integrated via `@wordpress/scripts` webpack configuration. It processes:

1. CSS files
2. SCSS files (after Sass compilation)
3. CSS-in-JS (if used)

## Using WordPress PostCSS Plugins Preset

For enhanced features, use the WordPress preset:

```javascript
module.exports = {
 plugins: [
  ...require( '@wordpress/postcss-plugins-preset' ),
 ],
};
```

This includes:

- `autoprefixer`
- `postcss-nesting` (CSS Nesting Draft support)
- Additional optimizations

## For Themes: PostCSS Themes Plugin

Themes can use `@wordpress/postcss-themes` for theme-specific features:

```javascript
module.exports = {
 plugins: [
  require( '@wordpress/postcss-themes' )(),
  require( 'autoprefixer' ),
  require( 'cssnano' )( {
   preset: 'default',
  } ),
 ],
};
```

Features:

- CSS custom properties for theme switching
- Theme-aware color transformations
- Dark mode support

## Advanced Configuration

### Custom Autoprefixer Settings

```javascript
module.exports = {
 plugins: [
  require( 'autoprefixer' )( {
   grid: 'autoplace',
   flexbox: 'no-2009',
  } ),
  require( 'cssnano' )( {
   preset: 'default',
  } ),
 ],
};
```

### Development vs Production

```javascript
module.exports = {
 plugins: [
  require( 'autoprefixer' ),
  ...( process.env.NODE_ENV === 'production'
   ? [ require( 'cssnano' )( { preset: 'default' } ) ]
   : [] ),
 ],
};
```

### Additional Plugins

```javascript
module.exports = {
 plugins: [
  require( 'postcss-import' ), // Enable @import
  require( 'postcss-nesting' ), // CSS Nesting
  require( 'postcss-custom-media' ), // Custom media queries
  require( 'autoprefixer' ),
  require( 'cssnano' )( {
   preset: 'default',
  } ),
 ],
};
```

## Usage

PostCSS runs automatically during:

```bash
# Development build
npm start

# Production build
npm run build
```

No separate command needed - it's integrated into the webpack build process.

## Debugging

### View Autoprefixer Output

Add to `package.json`:

```json
{
  "browserslist": [
    "extends @wordpress/browserslist-config"
  ],
  "scripts": {
    "browsers": "browserslist"
  }
}
```

Run:

```bash
npm run browsers
```

### Disable Specific Plugin

```javascript
module.exports = {
 plugins: [
  require( 'autoprefixer' ),
  // cssnano disabled for debugging
  // require( 'cssnano' )( { preset: 'default' } ),
 ],
};
```

## Common Issues

### Prefixes Not Added

**Solution**: Check `browserslist` configuration and ensure autoprefixer is in the plugins array.

### CSS Breaking After Minification

**Solution**: Try a more conservative cssnano preset:

```javascript
require( 'cssnano' )( {
 preset: [ 'default', {
  cssDeclarationSorter: false,
  calc: false,
 } ],
} );
```

## Resources

- [PostCSS Official Documentation](https://postcss.org/)
- [Autoprefixer Documentation](https://github.com/postcss/autoprefixer)
- [cssnano Documentation](https://cssnano.co/)
- [WordPress PostCSS Plugins Preset](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-postcss-plugins-preset/)
- [WordPress PostCSS Themes](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-postcss-themes/) (themes only)
- [Browserslist](https://github.com/browserslist/browserslist)
