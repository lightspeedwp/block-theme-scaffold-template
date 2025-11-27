/**
 * PostCSS Configuration for {{theme_name}}
 *
 * PostCSS processes CSS files during the build process:
 * - Autoprefixer: Adds vendor prefixes based on browserslist config
 * - cssnano: Minifies CSS for production builds
 *
 * This configuration is automatically used by wp-scripts when compiling Sass files.
 *
 * @package {{theme_name}}
 * @since {{version}}
 */

module.exports = {
	plugins: [
		// Add vendor prefixes automatically based on .browserslistrc.
		require( 'autoprefixer' ),

		// Minify CSS for production builds only.
		// wp-scripts automatically applies this based on NODE_ENV.
		require( 'cssnano' )( {
			preset: [
				'default',
				{
					// Preserve important comments (like licenses).
					discardComments: {
						removeAll: false,
					},
					// Normalize whitespace but keep readability in development.
					normalizeWhitespace: process.env.NODE_ENV === 'production',
				},
			],
		} ),
	],
};
