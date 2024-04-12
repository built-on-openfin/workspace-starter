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

const configs = [];

module.exports =
	process.env.WEBPACK_CONFIG_INDEX !== undefined ? configs[process.env.WEBPACK_CONFIG_INDEX] : configs;
