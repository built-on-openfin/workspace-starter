/* eslint-disable unicorn/better-regex */
const path = require('path');

// eslint-disable-next-line no-unused-vars
const alias = {
	'workspace-platform-starter': path.resolve(__dirname, '../client/src/framework'),
	'workspace-platform-starter/utils': path.resolve(__dirname, '../client/src/framework/utils')
};

// eslint-disable-next-line no-unused-vars
const loaderRule = {
	test: /\.tsx?$/,
	use: 'ts-loader',
	exclude: /node_modules/
};

const configs = [
	{
		entry: './client/src/modules/endpoint/example-notification-source/index.ts',
		devtool: 'source-map',
		module: {
			rules: [loaderRule]
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			alias
		},
		externals: { fin: 'fin' },
		output: {
			filename: 'example-notification-source.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'endpoint')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/lifecycle/example-notification-handler/index.ts',
		devtool: 'source-map',
		module: {
			rules: [loaderRule]
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			alias
		},
		externals: { fin: 'fin' },
		output: {
			filename: 'example-notification-handler.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'lifecycle')
		},
		experiments: {
			outputModule: true
		}
	}
];

module.exports =
	process.env.WEBPACK_CONFIG_INDEX !== undefined ? configs[process.env.WEBPACK_CONFIG_INDEX] : configs;
