/* eslint-disable unicorn/better-regex */
const path = require('path');

const alias = {
	'workspace-platform-starter': path.resolve(__dirname, '../client/src/framework'),
	'workspace-platform-starter/utils': path.resolve(__dirname, '../client/src/framework/utils')
};

const loaderRule = {
	test: /\.tsx?$/,
	use: 'ts-loader',
	exclude: /node_modules/
};

const configs = [
	{
		entry: './client/src/provider.ts',
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
			filename: 'provider.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/shell.ts',
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
			filename: 'shell.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js')
		},
		experiments: {
			outputModule: true
		}
	}
];

module.exports =
	process.env.WEBPACK_CONFIG_INDEX !== undefined ? configs[process.env.WEBPACK_CONFIG_INDEX] : configs;
