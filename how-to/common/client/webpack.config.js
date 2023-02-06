const path = require('path');

module.exports = [
	{
		entry: './client/src/windows/hidden-window/hidden.ts',
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
			filename: 'common.windows.hidden.bundle.js',
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
		entry: './client/src/windows/irs-rfq/irs-rfq.ts',
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
			filename: 'common.windows.irs-rfq.bundle.js',
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
		entry: './client/src/views/template/index.ts',
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
			filename: 'index.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'views', 'template', 'ts')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/windows/intent-window/intent-snapshot-launcher.ts',
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
			filename: 'common.windows.intent-snapshot-launcher.bundle.js',
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
