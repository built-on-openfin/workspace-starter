const path = require('path');

module.exports = {
	// target: 'node',
	entry: './client/src/provider.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		fallback: {
			"crypto": false,
			"sha256": false
		}
	},
	output: {
		filename: 'provider.bundle.js',
		path: path.resolve(__dirname, '..', 'public', 'js')
	}
};
