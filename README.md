# {{theme_name}}

{{description}}

A modern WordPress block theme supporting Full Site Editing (FSE), built with mustache templates for rapid development and deployment.

## Features

- Full Site Editing (FSE) support with block templates
- Mustache template system for dynamic configuration
- Block patterns and template parts
- Style variations (e.g., dark mode)
- Modern asset pipeline with Webpack
- Automated testing (PHP, JS, CSS, E2E)
- CI/CD workflows
- GitHub Copilot integration
- Follows WordPress coding standards

## Requirements

- WordPress {{min_wp_version}} or higher
- PHP {{min_php_version}} or higher
- Node.js 18+
- npm 9+
- Composer (for PHP dependencies)

## Installation

### Development Installation

1. Clone this repository:
   ```bash
   git clone {{theme_repo_url}}
   cd {{theme_slug}}
   ```

2. Install dependencies:
   ```bash
   npm install
   composer install
   ```

3. Build assets:
   ```bash
   npm run build
   ```

### WordPress Installation

1. Upload the theme files to `/wp-content/themes/{{theme_slug}}` or install via WordPress admin.
2. Activate the theme in the 'Appearance' screen.
3. Customize theme settings in the Site Editor.

## Development

This theme follows WordPress coding standards and best practices.

### Setup

```bash
git clone {{theme_repo_url}}
cd {{theme_slug}}
npm install
composer install
npm run start
```

### Available Scripts

- `npm run start` - Start development mode with hot reloading
- `npm run build` - Build for production
- `npm run build:production` - Build optimized for production
- `npm run lint` - Run all linters
- `npm run lint:js` - Lint JavaScript
- `npm run lint:css` - Lint CSS
- `npm run lint:php` - Lint PHP
- `npm run test` - Run all tests
- `npm run test:js` - Run JavaScript tests
- `npm run test:php` - Run PHP tests
- `npm run test:e2e` - Run end-to-end tests

### Theme Structure

```
{{theme_slug}}/
├── .github/            # GitHub workflows and automation
├── assets/             # Source assets (images, fonts, etc.)
├── inc/                # PHP includes and functionality
├── parts/              # Template parts (header, footer, etc.)
├── patterns/           # Block patterns
├── src/                # Source files for build process
│   ├── css/           # SCSS/CSS source files
│   └── js/            # JavaScript source files
├── styles/             # Style variations
├── templates/          # Block templates
├── tests/              # Test files
├── public/             # Built assets (auto-generated)
├── functions.php       # Theme functions
├── style.css           # Main stylesheet with theme metadata
├── theme.json          # Theme configuration
├── package.json        # Node.js dependencies and scripts
├── composer.json       # PHP dependencies
├── webpack.config.js   # Webpack configuration
└── README.md           # This file
```

## Customization

### Using Mustache Templates

This theme uses mustache templates for easy customization. Key variables include:

- `{{theme_name}}` - Display name of the theme
- `{{theme_slug}}` - URL-safe theme identifier
- `{{description}}` - Theme description
- `{{author}}` - Theme author name
- `{{author_uri}}` - Author website URL
- `{{primary_color}}` - Primary brand color
- `{{secondary_color}}` - Secondary color
- `{{background_color}}` - Background color
- `{{text_color}}` - Text color
- `{{body_font}}` - Body font family

### Customizing Colors and Typography

Edit `theme.json` to customize:
- Color palette
- Typography settings
- Spacing scale
- Layout settings

### Adding Custom Patterns

1. Create new pattern files in the `patterns/` directory
2. Register patterns in `inc/block-patterns.php`
3. Add pattern categories as needed

## Testing

- **JavaScript**: Jest unit tests
- **PHP**: PHPUnit tests with WordPress testing framework
- **End-to-End**: Playwright tests
- **Accessibility**: Automated a11y testing
- **Performance**: Core Web Vitals monitoring

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint && npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## Support

- Documentation: [Full documentation]({{docs_url}})
- Issues: [GitHub Issues]({{theme_repo_url}}/issues)
- Community: [WordPress.org Support](https://wordpress.org/support/theme/{{theme_slug}})

## License

This theme is licensed under the {{license}} - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a complete list of changes.

---

**{{theme_name}}** | v{{version}} | [{{license}}]({{license_uri}})
