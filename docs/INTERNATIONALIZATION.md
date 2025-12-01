---
title: Internationalization (i18n)
description: Guide for translating and localizing the theme
category: Development
type: Guide
audience: Developers, Translators
date: 2025-12-01
---

This theme is fully internationalized and ready for translation into any language.

## Overview

The theme follows WordPress internationalization best practices for both PHP and JavaScript code. All user-facing strings are wrapped in translation functions and can be translated without modifying the theme code.

## Text Domain

The theme's text domain is: `{{theme_slug}}`

This text domain must match the theme slug and is used in all translation functions.

## Translation Files Location

Translation files are stored in the `languages/` directory:

- **`.pot` files**: Template files for translators (generated from source code)
- **`.po` files**: Human-readable translation source files
- **`.mo` files**: Compiled translation files used by WordPress
- **`.json` files**: JavaScript translation files for block editor

### Translation Workflow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#1e4d78', 'primaryTextColor': '#ffffff', 'primaryBorderColor': '#15354f', 'lineColor': '#333333', 'secondaryColor': '#f0f0f0', 'tertiaryColor': '#e8e8e8', 'background': '#ffffff', 'mainBkg': '#1e4d78', 'textColor': '#333333', 'nodeBorder': '#15354f', 'clusterBkg': '#f8f9fa', 'clusterBorder': '#dee2e6', 'titleColor': '#333333'}}}%%
flowchart TB
    subgraph Extract["1. Extract Strings"]
        PHP["PHP Files"]
        JS["JavaScript Files"]
        POT[".pot Template"]
    end

    subgraph Translate["2. Translate"]
        PO[".po File<br/>Human-readable"]
        MO[".mo File<br/>Compiled"]
    end

    subgraph JSTranslate["3. JS Translations"]
        JSON[".json Files<br/>Block Editor"]
    end

    subgraph Load["4. Load in WordPress"]
        WPLoad["load_theme_textdomain()"]
        WPScript["wp_set_script_translations()"]
    end

    PHP --> POT
    JS --> POT
    POT --> PO
    PO --> MO
    PO --> JSON
    MO --> WPLoad
    JSON --> WPScript
```

## Generating Translation Files

### PHP Translation Files

Generate a POT file from PHP code:

```bash
npm run makepot:php
```

This creates `languages/{{theme_slug}}.pot` containing all translatable strings from PHP files.

### JavaScript Translation Files

Generate a POT file from JavaScript code:

```bash
npm run build
```

The webpack build process automatically extracts JavaScript strings to `languages/{{theme_slug}}-js.pot` using `@wordpress/babel-plugin-makepot`.

### Complete Translation Workflow

1. **Extract all strings** (PHP + JavaScript):

   ```bash
   npm run makepot
   ```

2. **Generate JSON files** for JavaScript translations:

   ```bash
   npm run makejson
   ```

3. **Complete workflow** (extract + generate JSON):

   ```bash
   npm run i18n
   ```

## PHP Translation Functions

### Basic Translation

```php
// Translate and return
__( 'Hello World', '{{theme_slug}}' );

// Translate and echo
_e( 'Hello World', '{{theme_slug}}' );
```

### Translation with Context

Use when the same word has different meanings:

```php
_x( 'Post', 'noun', '{{theme_slug}}' );
_x( 'Post', 'verb', '{{theme_slug}}' );
```

### Pluralization

```php
$count = 5;
printf(
 _n( '%d item', '%d items', $count, '{{theme_slug}}' ),
 number_format_i18n( $count )
);
```

### Translation with Variables

```php
// Single variable
printf(
 /* translators: %s: user name */
 __( 'Welcome, %s!', '{{theme_slug}}' ),
 $user_name
);

// Multiple variables (use numbered placeholders)
printf(
 /* translators: 1: post title, 2: author name */
 __( '%1$s by %2$s', '{{theme_slug}}' ),
 $post_title,
 $author_name
);
```

### Escape and Translate

Always escape output for security:

```php
// For HTML content
esc_html__( 'Hello World', '{{theme_slug}}' );
esc_html_e( 'Hello World', '{{theme_slug}}' );

// For HTML attributes
esc_attr__( 'Hello World', '{{theme_slug}}' );
esc_attr_e( 'Hello World', '{{theme_slug}}' );
```

## JavaScript Translation Functions

### Import i18n

```javascript
import { __ } from '@wordpress/i18n';
```

### Basic Translation

```javascript
// Translate and return
__( 'Hello World', '{{theme_slug}}' );

// With context
_x( 'Post', 'noun', '{{theme_slug}}' );

// Pluralization
_n( '%d item', '%d items', count, '{{theme_slug}}' );

// With context and plural
_nx( '%d post', '%d posts', count, 'posts count', '{{theme_slug}}' );
```

### Using in React/JSX

```javascript
import { __ } from '@wordpress/i18n';

function MyComponent() {
 return (
  <div>
   <h2>{ __( 'Settings', '{{theme_slug}}' ) }</h2>
   <p>{ __( 'Configure your options here.', '{{theme_slug}}' ) }</p>
  </div>
 );
}
```

### Translation with Variables

```javascript
import { sprintf, __ } from '@wordpress/i18n';

// Single variable
sprintf(
 /* translators: %s: user name */
 __( 'Welcome, %s!', '{{theme_slug}}' ),
 userName
);

// Multiple variables
sprintf(
 /* translators: 1: post title, 2: author name */
 __( '%1$s by %2$s', '{{theme_slug}}' ),
 postTitle,
 authorName
);
```

## Translation Loading

### PHP Translations

PHP translations are automatically loaded by WordPress from:

1. `wp-content/languages/themes/{{theme_slug}}-{locale}.mo`
2. `wp-content/themes/{{theme_slug}}/languages/{{theme_slug}}-{locale}.mo`

The theme loads translations in `functions.php`:

```php
load_theme_textdomain( '{{theme_slug}}', get_template_directory() . '/languages' );
```

### JavaScript Translations

JavaScript translations are loaded using `wp_set_script_translations()`:

```php
wp_set_script_translations(
 '{{theme_slug}}-script',
 '{{theme_slug}}',
 get_theme_file_path( 'languages' )
);
```

WordPress looks for JSON files in the format:

- `{{theme_slug}}-{locale}-{hash}.json`

The hash is automatically generated from the JavaScript file.

## Translation Workflow for Translators

1. **Get the POT file**: Download `{{theme_slug}}.pot` from the `languages/` directory

2. **Create a PO file**: Use a translation tool like [Poedit](https://poedit.net/) to create a `.po` file for your language (e.g., `{{theme_slug}}-es_ES.po`)

3. **Translate strings**: Add translations for all strings in the PO file

4. **Compile MO file**: Generate the `.mo` file (usually done automatically by translation tools)

5. **Generate JSON files**: For JavaScript translations, run:

   ```bash
   wp i18n make-json languages/{{theme_slug}}-es_ES.po --no-purge
   ```

6. **Install translations**: Place the `.mo` and `.json` files in the `languages/` directory

## WordPress.org Translation

If the theme is hosted on WordPress.org, translations can be contributed through:

- [translate.wordpress.org](https://translate.wordpress.org/)

WordPress.org automatically:

- Manages translations through GlotPress
- Generates and serves `.mo` and `.json` files
- Updates translations via language packs

No need to include translation files in the theme for WordPress.org hosted themes.

## Best Practices

### DO

✅ Use translation functions for all user-facing strings
✅ Add translator comments for context
✅ Use numbered placeholders for multiple variables
✅ Keep text domain consistent throughout
✅ Use proper escaping functions
✅ Test with long translations (German text can be 30% longer)

### DON'T

❌ Concatenate translated strings
❌ Use variables for text domain
❌ Put HTML in translatable strings when possible
❌ Use translation functions for empty strings
❌ Skip translator comments for placeholders

### Examples

**Bad:**

```php
// Don't concatenate strings
echo __( 'Welcome to ', '{{theme_slug}}' ) . $site_name;

// Don't put HTML in strings
__( '<strong>Bold text</strong>', '{{theme_slug}}' );
```

**Good:**

```php
// Use placeholders
printf(
 /* translators: %s: site name */
 __( 'Welcome to %s', '{{theme_slug}}' ),
 $site_name
);

// Separate HTML from translatable text
echo '<strong>' . esc_html__( 'Bold text', '{{theme_slug}}' ) . '</strong>';
```

## Testing Translations

### With Locale Switcher

1. Install a translation testing plugin like [WP-CLI Language Command](https://github.com/wp-cli/language-command)
2. Switch to a test locale
3. Verify all strings are translated

### With Test Translation

Create a test translation to identify untranslated strings:

```bash
npm run makepot
# Use Poedit to create a test translation where all strings = "XXX"
```

## Tools and Resources

- **WP-CLI i18n**: Command-line tools for generating translations

  ```bash
  wp i18n make-pot . languages/{{theme_slug}}.pot
  wp i18n make-json languages/
  ```

- **Poedit**: Desktop application for editing PO files
  - Website: <https://poedit.net/>

- **@wordpress/i18n**: JavaScript internationalization package
  - Docs: <https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/>

- **@wordpress/babel-plugin-makepot**: Extracts translatable strings from JavaScript
  - Docs: <https://developer.wordpress.org/block-editor/reference-guides/packages/packages-babel-plugin-makepot/>

## Additional Resources

- [WordPress Theme Handbook: Internationalization](https://developer.wordpress.org/themes/advanced-topics/internationalization/)
- [Plugin Handbook: How to Internationalize Your Plugin](https://developer.wordpress.org/plugins/internationalization/how-to-internationalize-your-plugin/)
- [Block Editor Handbook: Internationalization](https://developer.wordpress.org/block-editor/how-to-guides/internationalization/)
- [Common APIs: Internationalization](https://developer.wordpress.org/apis/internationalization/)

## Support

For translation issues or questions, please refer to:

- [Theme Documentation]({{docs_url}})
- [Support Forum]({{support_url}})
- [translate.wordpress.org](https://translate.wordpress.org/) (for WordPress.org hosted themes)
