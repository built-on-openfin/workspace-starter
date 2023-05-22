const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = [
	{
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
			extensions: ['.tsx', '.ts', '.js']
		},
		output: {
			filename: 'provider.bundle.js',
			path: path.resolve(__dirname, '..', 'public', 'js')
		}
	},
	{
		entry: './client/src/module-entry-point.ts',
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
		plugins: [
			new CopyWebpackPlugin({
				patterns: [
					{
						from: `${path.dirname(require.resolve('@openfin/salesforce-lwc'))}/preload.js`,
						to: path.resolve(__dirname, '..', 'public', 'js')
					}
				]
			})
		],
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},
		externals: { fin: 'fin' },
		output: {
			filename: 'salesforce.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'integrations')
		},
		experiments: {
			outputModule: true
		}
	}
];
