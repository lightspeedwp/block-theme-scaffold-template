# PHP Development Guidelines for WordPress

## File Structure & Organization
- Use proper WordPress file headers with plugin/theme information.
- Organize code into logical directories (`/inc`, `/lib`, `/admin`, `/public`).
- Follow WordPress naming conventions for files and directories.
- Use kebab-case for file names, snake_case for function names.
- Prefix all functions, classes, and constants to avoid conflicts.

## Security First
- Always escape output: `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()`.
- Sanitize input immediately: `sanitize_text_field()`, `sanitize_email()`, `esc_url_raw()`.
- Use nonces for all forms and AJAX.
- Check user capabilities before performing actions.

## Database Operations
- Use `$wpdb->prepare()` for custom queries.
- Prefer WordPress functions over direct queries.

## Internationalization (i18n)
- Use proper text domain consistently.
- For JavaScript, use `wp_localize_script()` for strings.

## Error Handling & Logging
- Use `is_wp_error()` and log errors when needed.
- Provide user-friendly error messages with `wp_die()`.

## Performance Best Practices
- Cache expensive operations.
- Minimize database queries.
- Load scripts/styles conditionally.

## Compatibility
- Support the minimum required WordPress version.
- Test with PHP versions from minimum to latest.
- Ensure compatibility with common plugins and themes.
- Follow semantic versioning for releases.

## Code Quality Standards
- Use proper PHPDoc blocks for all functions, classes, and methods.
- Write unit tests for all public methods using PHPUnit.
- Test edge cases and error conditions.
- Mock WordPress functions in tests.
- Aim for high code coverage.

## Block Development (PHP)
- Register custom block types with `register_block_type()`.
- Use render callbacks for dynamic blocks.
- Use `get_block_wrapper_attributes()` for block markup.

## REST API Integration
- Register custom REST API endpoints with `register_rest_route()`.
- Use permission callbacks and sanitize/validate all input.

## WordPress Hooks & Filters
- Use appropriate hook priorities.
- Remove hooks safely when needed.
- Register hooks conditionally for admin/frontend.

## Class Structure & OOP
- Use singleton pattern for main plugin classes.
- Separate admin and frontend logic.

## Related Instructions
- See also: [php-block.instructions.md](./php-block.instructions.md)
