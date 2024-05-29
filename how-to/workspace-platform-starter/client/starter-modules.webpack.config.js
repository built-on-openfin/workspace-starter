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
		entry: './client/src/modules/auth/example/index.ts',
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
			filename: 'example.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'auth')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/endpoint/local-storage/index.ts',
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
			filename: 'local-storage.bundle.js',
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
		entry: './client/src/modules/endpoint/channel/index.ts',
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
			filename: 'channel.bundle.js',
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
		entry: './client/src/modules/endpoint/inline-apps/index.ts',
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
			filename: 'inline-apps.bundle.js',
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
		entry: './client/src/modules/init-options/interop/index.ts',
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
			filename: 'interop.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'init-options')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/init-options/launch-app/index.ts',
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
			filename: 'launch-app.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'init-options')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/log/console/index.ts',
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
			filename: 'console.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'log')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/actions/opacity/index.ts',
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
			filename: 'opacity.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'actions')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/endpoint/example-connection-validation/index.ts',
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
			filename: 'example.connection.validation.bundle.js',
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
		entry: './client/src/modules/analytics/console/index.ts',
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
			filename: 'console.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'analytics')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/composite/developer/index.ts',
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
			filename: 'developer.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'composite')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/integrations/apps/index.ts',
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
			filename: 'apps.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'integrations')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/integrations/workspaces/index.ts',
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
			filename: 'workspaces.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'integrations')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/integrations/pages/index.ts',
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
			filename: 'pages.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'integrations')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/composite/about/index.ts',
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
			filename: 'about.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'composite')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/composite/pages/index.ts',
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
			filename: 'pages.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'composite')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/composite/windows/index.ts',
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
			filename: 'windows.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'composite')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/endpoint/example-context-processor/index.ts',
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
			filename: 'example.context.processor.bundle.js',
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
		entry: './client/src/framework/fdc3/index.ts',
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
			filename: 'fdc3.mapper.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'common', 'lib', 'fdc3')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/actions/custom-menu/index.ts',
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
			filename: 'custom-menu.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'actions')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/auth/openid-connect/index.ts',
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
			filename: 'openid-connect.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'auth')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/endpoint/favorite-local-storage/index.ts',
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
			filename: 'favorite-local-storage.bundle.js',
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
		entry: './client/src/modules/actions/favorites-menu/index.ts',
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
			filename: 'favorites-menu.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'actions')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/composite/include-in-snapshot/index.ts',
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
			filename: 'include-in-snapshot.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'composite')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/lifecycle/example-notification-service/index.ts',
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
			filename: 'example-notification-service.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'lifecycle')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/init-options/launch-workspace/index.ts',
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
			filename: 'launch-workspace.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'init-options')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/composite/default-workspace/index.ts',
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
			filename: 'default-workspace.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'composite')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/content-creation/view-position/index.ts',
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
			filename: 'view-position.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'content-creation')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/actions/window-platform/index.ts',
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
			filename: 'window-platform.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'actions')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/share/pages/index.ts',
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
			filename: 'pages.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'share')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/share/workspaces/index.ts',
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
			filename: 'workspaces.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'share')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/interop-override/wps-interop-override/index.ts',
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
			filename: 'wps-interop-override.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'interop-override')
		},
		experiments: {
			outputModule: true
		}
	},
	{
		entry: './client/src/modules/interop-override/openfin-cloud-interop/index.ts',
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
			filename: 'openfin-cloud-interop.bundle.js',
			library: {
				type: 'module'
			},
			path: path.resolve(__dirname, '..', 'public', 'js', 'modules', 'interop-override')
		},
		experiments: {
			outputModule: true
		}
	}
];

module.exports =
	process.env.WEBPACK_CONFIG_INDEX !== undefined ? configs[process.env.WEBPACK_CONFIG_INDEX] : configs;
