module.exports = {
	extends: [ '@wordpress/eslint-plugin/recommended' ],
	env: {
		browser: true,
		es6: true,
		node: true,
		jquery: true,
	},
	globals: {
		wp: 'readonly',
		wpApiSettings: 'readonly',
		ajaxurl: 'readonly',
	},
	rules: {
		'no-console': 'warn',
		'no-debugger': 'error',
	},
	overrides: [
		{
			files: [ '*.test.js', '*.spec.js' ],
			env: {
				jest: true,
			},
		},
		{
			files: [ 'tests/e2e/**/*.js' ],
			extends: [ '@wordpress/eslint-plugin/recommended-with-formatting' ],
			env: {
				node: true,
			},
			globals: {
				page: 'readonly',
				browser: 'readonly',
				context: 'readonly',
				jestPuppeteer: 'readonly',
			},
		},
	],
};