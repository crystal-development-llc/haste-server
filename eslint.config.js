const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
	{
		ignores: ['**/*.min.js', 'config.js', 'example.config.js']
	},
	js.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'commonjs',
			globals: {
				...globals.es2020,
				...globals.node,
				winston: 'writable'
			}
		},
		rules: {
			'indent': [ 'error', 'tab' ],
			'linebreak-style': [ 'error', 'unix' ],
			'quotes': [ 'error', 'single' ],
			'semi': [ 'error', 'always' ],
			'no-console': 'warn',
			'no-unused-vars': 'warn',
			'max-len': ['warn', 150],
			'require-await': 'warn'
		}
	}
];
