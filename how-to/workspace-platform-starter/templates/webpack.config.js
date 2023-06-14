const path = require('path');

const configs = [
	{
		entry: './templates/src/log/index.ts',
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
		externals: { fin: 'fin' },
		output: {
			filename: 'log.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve('templates', 'build')
		},
		experiments: {
			outputModule: true
		}
	}
];

module.exports = configs;
