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
		path: path.resolve( process.cwd(), 'public' ),
		filename: 'js/[name].js',
		clean: true,
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: [ 'src/css' ],
							},
						},
					},
				],
			},
		],
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'@': path.resolve( __dirname, 'src' ),
		},
	},
	optimization: {
		...defaultConfig.optimization,
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
};
