> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Add A Module ?

Many of the features can be extended by adding custom modules containing code, which are configured in the manifest to be loaded at runtime.

The following features are currently extendable using modules:

- actions
- auth
- conditions
- endpoint
- initOptions
- integrations
- lifecycle
- log

## Configuration

The configuration for the modules follows a standard pattern, we will illustrate this pattern using the `log` type.

Each of the configuration sections for the providers contains a `modules` list:

```json
"loggerProvider": {
    "modules": [
    ]
}
```

Each module can then be configured, with an `enabled` flag which determines if the module is actually loaded, an `id` to uniquely identify the module and the `url` of the JavaScript to load.

```json
"loggerProvider": {
    "modules": [
        {
            "enabled": true,
            "id": "console",
            "url": "http://localhost:8080/js/modules/log/console.bundle.js"
        }
    ]
}
```

There is additional optional metadata that we can provide for a module to help users understand its purpose.

- title - A simple name to identity the module
- description - A more detailed description of what the module does
- info - A url to get more information
- icon - An icon to display for the module

Some modules require additional settings, these can be provided through the `data` field, this data is free-form and specific to the module implementation. For example when the module is configured as below it will have an object with an `includeLevels` property passed to its `initialization` method.

```json
"loggerProvider": {
    "modules": [
        {
            "enabled": true,
            "id": "console",
            "url": "http://localhost:8080/js/modules/log/console.bundle.js",
            "data": {
                "includeLevels": ["error"]
            }
        }
    ]
}
```

## Shared Modules

A module can contain entry points for more than one provider, so you could for example have `actions` and `conditions` in one module. You would still specify the entries in the section for each provider type, as they may require separate config, but they would point to the same `url`. The module will only get loaded once and reused if a further entry point is requested from it.

## Writing A Module

If you want to implement a module you should take the following steps.

First you will need an implementation of the provider type you want in the module.

In the case of the console logger it would be something like [log-provider.ts](../client/src/modules/log/console/log-provider.ts). This implementation is derived from `ModuleImplementation` which provides the optional `initialize` and `closedown` methods. The `initialization` method is passed the `data` from the manifest when they are loaded. The `closedown` method is called when the app is unloading.

The second piece of code that is required is an export of the entry points from the module, in the case of our logger example we have the following, see [index.ts](../client/src/modules/log/console/index.ts).

```ts
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
  log: new ConsoleLogProvider()
};
```

You can have multiple exported provider types in the `entryPoints`, in this case the module will only be loaded once.

The module should be compiled as a JavaScript ESM module, an example webpack config to produce this type of output is:

```js
{
    entry: './client/src/modules/log/console/index.ts',
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
        extensions: ['.ts', '.js']
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
}
```

## Module Shapes

When building a module you need to reference the TypeScript definitions for the shapes, the `.d.ts` files can be generated using the `npm generate-types-module` script command.

## Source Reference

- [modules.ts](../client/src/framework/modules.ts)
- [module-shapes.ts](../client/src/framework/shapes/module-shapes.ts)
- [log-provider.ts](../client/src/modules/log/console/log-provider.ts)

[<- Back to Table Of Contents](../README.md)
