---
title: Deprecation Policy
description: Guidelines for deprecating and removing features
category: Documentation
type: Policy
audience: Developers
date: 2025-12-01
---

This document outlines the standardized process for deprecating functions, hooks, templates, and features in a way that provides clear migration paths and sufficient warning to developers.

## Overview

Deprecation is a critical part of maintaining a healthy codebase. When done properly, it:

- Gives developers time to update their code
- Provides clear migration paths
- Maintains backward compatibility during transition periods
- Documents the evolution of the API

## Deprecation Utilities

Include the deprecation utilities in your functions.php or specific include file:

```php
require_once get_template_directory() . '/inc/deprecation.php';
```

## Functions Available

### `lswp_theme_deprecated( $function_name, $version, $replacement, $message )`

Logs a deprecation notice for functions, methods, or features.

```php
// Example: Deprecating a theme function
function old_theme_function() {
    lswp_theme_deprecated(
        'old_theme_function',
        '1.5.0',
        'new_theme_function',
        'The return type has changed from array to object.'
    );

    // Call the new function for backward compatibility
    return new_theme_function();
}
```

### `lswp_theme_deprecated_hook( $hook, $version, $replacement, $message )`

Logs a deprecation notice for action and filter hooks.

```php
// Example: Deprecating a filter hook
add_filter( 'theme_old_filter', function( $value ) {
    lswp_theme_deprecated_hook(
        'theme_old_filter',
        '1.5.0',
        'theme_new_filter',
        'The filter now passes an additional parameter.'
    );

    return apply_filters( 'theme_new_filter', $value, null );
} );
```

### `lswp_theme_deprecated_argument( $function, $argument, $version, $message )`

Logs a deprecation notice for function arguments.

```php
// Example: Deprecating a function argument
function some_theme_function( $new_arg, $old_arg = null ) {
    if ( null !== $old_arg ) {
        lswp_theme_deprecated_argument(
            'some_theme_function',
            '$old_arg',
            '1.5.0',
            'Pass the value as part of $new_arg instead.'
        );
    }
}
```

### `lswp_theme_deprecated_template( $file, $version, $replacement, $message )`

Logs a deprecation notice for deprecated template files.

```php
// At the top of a deprecated template part
lswp_theme_deprecated_template(
    __FILE__,
    '1.5.0',
    'parts/new-template.html',
    'This template part has been restructured.'
);
```

## Block Theme Specific Deprecations

### Deprecating Template Parts

When restructuring template parts:

```php
// In functions.php - redirect old template part requests
add_filter( 'get_block_template', function( $template, $id, $template_type ) {
    if ( 'wp_template_part' === $template_type && 'old-part' === $id ) {
        lswp_theme_deprecated_template(
            'parts/old-part.html',
            '1.5.0',
            'parts/new-part.html',
            'Template part has been renamed and restructured.'
        );
    }
    return $template;
}, 10, 3 );
```

### Deprecating Block Patterns

When deprecating a block pattern:

```php
// Register the old pattern with a deprecation notice
register_block_pattern(
    '{{theme_slug}}/old-pattern',
    array(
        'title'       => __( 'Old Pattern (Deprecated)', '{{theme_slug}}' ),
        'description' => __( 'Deprecated: Use "New Pattern" instead.', '{{theme_slug}}' ),
        'content'     => '<!-- wp:paragraph --><p>This pattern is deprecated. Use the new pattern instead.</p><!-- /wp:paragraph -->',
        'categories'  => array( 'deprecated' ),
    )
);

// Log when the pattern is used
add_action( 'render_block_core/pattern', function( $block_content, $block ) {
    if ( isset( $block['attrs']['slug'] ) && '{{theme_slug}}/old-pattern' === $block['attrs']['slug'] ) {
        lswp_theme_deprecated(
            'Pattern: {{theme_slug}}/old-pattern',
            '1.5.0',
            '{{theme_slug}}/new-pattern'
        );
    }
    return $block_content;
}, 10, 2 );
```

### Deprecating theme.json Settings

Document theme.json setting changes in your CHANGELOG:

```markdown
## [1.5.0] - 2024-01-15

### Deprecated theme.json Settings
- `settings.color.palette.theme` - Color "accent" renamed to "primary"
- `settings.typography.fontSizes` - Size "huge" replaced with "2xl"

### Migration
1. Update any custom CSS using `--wp--preset--color--accent` to use `--wp--preset--color--primary`
2. Update block attributes using `has-huge-font-size` to use `has-2-xl-font-size`
```

## Deprecation Timeline

Follow this timeline when deprecating features:

### Phase 1: Announcement (Version X.0)

1. Add deprecation notice to code
2. Update documentation with deprecation warning
3. Add entry to CHANGELOG.md
4. Keep old functionality working
5. Register pattern in "deprecated" category (for patterns)

### Phase 2: Warning Period (Versions X.1 - X.9)

1. Deprecation notices appear in debug mode
2. Old functionality continues to work
3. Documentation prominently displays migration guide
4. Editor shows deprecated patterns separately

### Phase 3: Removal (Version X+1.0)

1. Remove deprecated code/templates entirely
2. Update documentation
3. Add "Breaking Changes" section to CHANGELOG.md
4. Major version bump signals breaking changes

## Tracking Deprecations

Register all deprecations for documentation generation:

```php
add_filter( 'lswp_theme_deprecations', function( $deprecations ) {
    $deprecations[] = array(
        'type'        => 'template',
        'name'        => 'parts/old-sidebar.html',
        'version'     => '1.5.0',
        'replacement' => 'parts/sidebar.html',
        'message'     => 'Template renamed for consistency.',
        'removed_in'  => '2.0.0',
    );

    $deprecations[] = array(
        'type'        => 'pattern',
        'name'        => '{{theme_slug}}/hero-old',
        'version'     => '1.5.0',
        'replacement' => '{{theme_slug}}/hero',
        'message'     => 'Pattern restructured for better accessibility.',
        'removed_in'  => '2.0.0',
    );

    return $deprecations;
} );
```

## Documentation Requirements

When deprecating any feature, update these files:

### 1. Inline Documentation

```php
/**
 * Old function description.
 *
 * @since      1.0.0
 * @deprecated 1.5.0 Use new_function_name() instead.
 * @see        new_function_name()
 *
 * @param string $param Description.
 * @return string Description.
 */
function old_theme_function( $param ) {
    lswp_theme_deprecated( 'old_theme_function', '1.5.0', 'new_theme_function' );
    return new_theme_function( $param );
}
```

### 2. CHANGELOG.md

```markdown
## [1.5.0] - 2024-01-15

### Deprecated
- `parts/old-sidebar.html` template - Use `parts/sidebar.html` instead
- `{{theme_slug}}/hero-old` pattern - Use `{{theme_slug}}/hero` instead
- `old_theme_function()` - Use `new_theme_function()` instead
```

### 3. Migration Guide

Create a migration document for major version changes:

```markdown
# Migrating from 1.x to 2.0

## Template Part Changes

### Old Sidebar Removed

**Before (1.x):**
```html
<!-- wp:template-part {"slug":"old-sidebar"} /-->
```

**After (2.0+):**

```html
<!-- wp:template-part {"slug":"sidebar"} /-->
```

## Pattern Changes

### Hero Pattern Restructured

The hero pattern has been updated for better accessibility.

**Migration Steps:**

1. Find all uses of `{{theme_slug}}/hero-old` pattern
2. Replace with `{{theme_slug}}/hero`
3. Review custom styling that targeted the old structure

```

## JavaScript Deprecations

For JavaScript/block editor code:

```javascript
import deprecated from '@wordpress/deprecated';

// Deprecate a function
export function oldEditorFunction() {
    deprecated( 'oldEditorFunction', {
        since: '1.5.0',
        alternative: 'newEditorFunction',
        plugin: '{{theme_slug}}',
    } );

    return newEditorFunction();
}

// Deprecate a block variation
deprecated( 'Block variation: {{theme_slug}}/old-variation', {
    since: '1.5.0',
    alternative: '{{theme_slug}}/new-variation',
    plugin: '{{theme_slug}}',
} );
```

## Best Practices

1. **Maintain Backward Compatibility**: Deprecated templates/patterns should continue working
2. **Clear Migration Path**: Always provide a replacement and instructions
3. **Adequate Warning Time**: Allow at least one major version cycle before removal
4. **Document Everything**: Update all relevant documentation immediately
5. **Test Deprecation Notices**: Verify notices appear in debug mode
6. **Semantic Versioning**: Increment major version when removing deprecated features
7. **Communicate Changes**: Announce in release notes and changelogs
8. **Consider Child Themes**: Provide extra guidance for child theme authors

## Monitoring Deprecations

Hook into deprecation notices for monitoring:

```php
add_action( 'lswp_theme_deprecated_notice', function( $function, $version, $replacement, $message ) {
    // Log for development
    if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
        error_log( sprintf(
            '[{{theme_slug}}] Deprecated: %s (since %s). Use: %s',
            $function,
            $version,
            $replacement
        ) );
    }
}, 10, 4 );
```

## Resources

- [WordPress Coding Standards - Deprecation](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/#deprecated-functions)
- [Semantic Versioning](https://semver.org/)
- [@wordpress/deprecated Package](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-deprecated/)
- [Block Theme Development](https://developer.wordpress.org/themes/block-themes/)
