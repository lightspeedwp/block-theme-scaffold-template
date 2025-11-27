/**
 * Webpack Configuration for {{theme_name}}
 *
 * @package {{theme_name}}
 * @since {{version}}
 */

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		'theme': './src/js/theme.js',
		'editor': './src/js/editor.js',
		'style': './src/css/style.scss',
		'editor-style': './src/css/editor.scss',
	},
	output: {
		path: path.resolve( process.cwd(), 'build' ),
		filename: 'js/[name].js',
		clean: true,
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext]',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},
		],
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'@': path.resolve( __dirname, 'src' ),
			'@css': path.resolve( __dirname, 'src/css' ),
			'@js': path.resolve( __dirname, 'src/js' ),
		},
	},
	optimization: {
		...defaultConfig.optimization,
		splitChunks: {
			cacheGroups: {
				style: {
					name: 'style',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
				},
				editor: {
					name: 'editor-style',
					test: /editor\.scss$/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
	performance: {
		...defaultConfig.performance,
		maxAssetSize: 512000,
		maxEntrypointSize: 512000,
	},
};
