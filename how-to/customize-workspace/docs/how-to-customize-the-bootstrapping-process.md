> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Customize The Bootstrapping Process

The bootstrapping process has a number of options to determine what the application should initialize on startup.

```json
"bootstrap": {
    "home": true,
    "store": true,
    "dock": true,
    "notifications": true,
    "autoShow": ["home"]
}
```

The `home`, `store`, `dock`, and `notifications` options determine if a provider for each of those workspace components is registered. You can find more details on how to configure the providers for each of the component in their own sections.

- home - [./how-to-customize-home.md](./how-to-customize-home.md)
- store - [./how-to-customize-store.md](./how-to-customize-store.md)
- dock - [./how-to-customize-dock.md](./how-to-customize-dock.md)
- notifications - [./how-to-customize-notification-center.md](./how-to-customize-notification-center.md)

A provider can be initialized without being displayed, so to automatically show the components on starting the app you can use the `autoShow` field. For example to show `home` and `dock`.

```json
"bootstrap": {
    ...
    "autoShow": ["home", "dock"]
}
```

If you do not provide and `autoShow` property the first registered component in the order listed above will be used.

## Lifecycle

[Lifecycle events](./how-to-use-lifecycle-events.md) are raised during the bootstrapping process.

After all of the workspace components have been initialized the `after-bootstrap` event is fired. When the application is closing down the `before-quit` event is fired.

If you don't want to display any of the built-in workspace components on startup you can set the config as follows:

```json
"bootstrap": {
    ...
    "autoShow": ["none"]
}
```

You could then subscribe to the `after-bootstrap` event and launch your own view.

## Source Reference

- [bootstrapper.ts](../client/src/framework/bootstrapper.ts)

[<- Back to Table Of Contents](../README.md)
