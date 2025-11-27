# Languages

This directory contains translation files for internationalizing the theme.

## Overview

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#1e4d78', 'primaryTextColor': '#ffffff', 'primaryBorderColor': '#15354f', 'lineColor': '#333333', 'secondaryColor': '#f0f0f0', 'tertiaryColor': '#e8e8e8', 'background': '#ffffff', 'mainBkg': '#1e4d78', 'textColor': '#333333', 'nodeBorder': '#15354f', 'clusterBkg': '#f8f9fa', 'clusterBorder': '#dee2e6', 'titleColor': '#333333'}}}%%
flowchart LR
    subgraph Source["Source Files"]
        PHP["PHP Files"]
        JS["JavaScript Files"]
    end

    subgraph Extract["npm run makepot"]
        POT[".pot Template"]
    end

    subgraph Translate["Translation"]
        PO[".po Files<br/>Human-readable"]
        MO[".mo Files<br/>Compiled"]
        JSON[".json Files<br/>JavaScript"]
    end

    PHP --> POT
    JS --> POT
    POT --> PO
    PO --> MO
    PO --> JSON
```

## File Types

| Extension | Purpose | Used By |
|-----------|---------|---------|
| `.pot` | Translation template | Translators |
| `.po` | Human-readable translations | Translators |
| `.mo` | Compiled translations | PHP |
| `.json` | JavaScript translations | Block Editor |

## Directory Structure

```
languages/
├── .gitkeep                           # Ensures directory exists in Git
├── {{theme_slug}}.pot                 # Translation template (generated)
├── {{theme_slug}}-de_DE.po            # German translation (example)
├── {{theme_slug}}-de_DE.mo            # German compiled (example)
├── {{theme_slug}}-de_DE-*.json        # German JS translations (example)
└── README.md                          # This file
```

## Generating Translation Files

### Generate POT Template

```bash
npm run makepot
```

This extracts all translatable strings from PHP and JavaScript files.

### Generate JavaScript Translations

```bash
npm run makejson
```

Converts `.po` files to `.json` format for use in the Block Editor.

## Translation Workflow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#1e4d78', 'primaryTextColor': '#ffffff', 'primaryBorderColor': '#15354f', 'lineColor': '#333333', 'secondaryColor': '#f0f0f0', 'tertiaryColor': '#e8e8e8', 'background': '#ffffff', 'mainBkg': '#1e4d78', 'textColor': '#333333', 'nodeBorder': '#15354f', 'clusterBkg': '#f8f9fa', 'clusterBorder': '#dee2e6', 'titleColor': '#333333'}}}%%
flowchart TD
    A["1. Run makepot"] --> B["2. POT file generated"]
    B --> C["3. Copy POT to PO"]
    C --> D["4. Translate strings"]
    D --> E["5. Compile to MO"]
    E --> F["6. Generate JSON for JS"]

    subgraph Tools["Tools"]
        Poedit["Poedit"]
        Loco["Loco Translate"]
        WPML["WPML"]
    end

    D --> Tools
```

## Loading Translations

Translations are loaded in `functions.php`:

```php
function {{theme_slug}}_load_textdomain() {
    load_theme_textdomain(
        '{{theme_slug}}',
        get_template_directory() . '/languages'
    );
}
add_action( 'after_setup_theme', '{{theme_slug}}_load_textdomain' );
```

## Using Translations in Code

### PHP

```php
// Simple translation
__( 'Hello World', '{{theme_slug}}' );

// Echo translation
_e( 'Hello World', '{{theme_slug}}' );

// With context
_x( 'Post', 'noun', '{{theme_slug}}' );

// Pluralization
sprintf(
    _n( '%d item', '%d items', $count, '{{theme_slug}}' ),
    $count
);
```

### JavaScript

```javascript
import { __ } from '@wordpress/i18n';

// Simple translation
__( 'Hello World', '{{theme_slug}}' );

// With placeholder
sprintf( __( 'Hello %s', '{{theme_slug}}' ), name );
```

## Related Documentation

- [Internationalization Guide](../docs/INTERNATIONALIZATION.md)
- [WordPress i18n](https://developer.wordpress.org/plugins/internationalization/)
- [Block Editor i18n](https://developer.wordpress.org/block-editor/how-to-guides/internationalization/)
