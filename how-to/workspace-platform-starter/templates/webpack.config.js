const path = require('path');

const alias = {
	'workspace-platform-starter/utils': path.resolve(__dirname, '../client/src/framework/utils')
};

const configs = [
	{
		entry: './templates/src/actions/index.ts',
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
			alias
		},
		externals: { fin: 'fin' },
		output: {
			filename: 'actions.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve('templates', 'build')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './templates/src/analytics/index.ts',
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
			alias
		},
		externals: { fin: 'fin' },
		output: {
			filename: 'analytics.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve('templates', 'build')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './templates/src/auth/index.ts',
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
			alias
		},
		externals: { fin: 'fin' },
		output: {
			filename: 'auth.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve('templates', 'build')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './templates/src/conditions/index.ts',
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
			alias
		},
		externals: { fin: 'fin' },
		output: {
			filename: 'conditions.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve('templates', 'build')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './templates/src/endpoint/index.ts',
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
			alias
		},
		externals: { fin: 'fin' },
		output: {
			filename: 'endpoint.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve('templates', 'build')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './templates/src/init-options/index.ts',
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
			alias
		},
		externals: { fin: 'fin' },
		output: {
			filename: 'init-options.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve('templates', 'build')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './templates/src/integrations/index.ts',
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
			alias
		},
		externals: { fin: 'fin' },
		output: {
			filename: 'integrations.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve('templates', 'build')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './templates/src/lifecycle/index.ts',
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
			alias
		},
		externals: { fin: 'fin' },
		output: {
			filename: 'lifecycle.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve('templates', 'build')
		},
		experiments: {
			outputModule: true
		}
	},
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
			extensions: ['.tsx', '.ts', '.js'],
			alias
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
	},
	{
		entry: './templates/src/menus/index.ts',
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
			alias
		},
		externals: { fin: 'fin' },
		output: {
			filename: 'menus.bundle.js',
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
