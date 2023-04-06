const path = require('path');

module.exports = {
	entry: {
		provider: path.join(__dirname, 'src', 'provider.ts'),// './client/src/provider.ts',
		bbgtest: path.join(__dirname, 'src', 'bbgtest.ts')// './client/src/bbgtest.js'
	},
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
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '..', 'public', 'js')
	}
};
