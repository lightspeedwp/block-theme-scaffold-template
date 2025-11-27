# Nonce Verification for Block Themes

Block themes primarily use declarative HTML templates, but nonces remain essential for:

- AJAX endpoints
- Custom REST API routes
- Admin actions and forms
- User-submitted data processing

## Utilities

The theme includes generic nonce helpers in `inc/nonce.php` with the `lswp_theme_*` prefix.

- **`lswp_theme_nonce_action($suffix)`**: Builds a namespaced nonce action.
- **`lswp_theme_create_nonce($action)`**: Creates a nonce for the given action.
- **`lswp_theme_verify_request_nonce($action, $param)`**: Verifies `_wpnonce` from `GET`/`POST`.
- **`lswp_theme_verify_rest_nonce($request, $action)`**: Verifies `X-WP-Nonce` for REST requests.

## Usage

Load utilities in `functions.php`:

```php
require_once get_template_directory() . '/inc/nonce.php';
```

### AJAX Example

JavaScript:

```javascript
fetch(ajaxurl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
        action: 'block_theme_example',
        _wpnonce: window.BlockTheme.nonce,
        data: 'value'
    })
});
```

PHP handler (already registered in `inc/nonce.php`):

```php
add_action('wp_ajax_block_theme_example', function () {
    if (!lswp_theme_verify_request_nonce(lswp_theme_nonce_action('frontend'))) {
        wp_send_json_error(['message' => 'Invalid nonce'], 403);
    }
    // Process request
    wp_send_json_success(['message' => 'OK']);
});
```

### REST API Example

```php
register_rest_route('block-theme/v1', '/endpoint', [
    'methods' => 'POST',
    'callback' => function ($request) {
        if (!lswp_theme_verify_rest_nonce($request)) {
            return new WP_Error('rest_forbidden', 'Invalid nonce', ['status' => 403]);
        }
        return ['status' => 'success'];
    },
    'permission_callback' => '__return_true',
]);
```

JavaScript:

```javascript
fetch('/wp-json/block-theme/v1/endpoint', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': wpApiSettings.nonce
    },
    body: JSON.stringify({ data: 'value' })
});
```

## Best Practices

- Always verify nonces for state-changing operations.
- Use `wp_create_nonce('wp_rest')` for REST API nonces.
- Rotate nonces by using unique action suffixes per feature.
- For admin forms, use `wp_nonce_field()` and `check_admin_referer()`.
