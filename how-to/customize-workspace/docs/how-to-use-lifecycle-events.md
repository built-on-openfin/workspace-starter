> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Use Lifecycle Events

Lifecycle events are are exposed by the platform to allow you to hook you own code into the platform lifecycle.

You can implement lifecycle hooks by following the module pattern, see [How To Add A Module](./how-to-add-a-module.md).

## Configuration

As mentioned above lifecycle hooks follow the module pattern, a simple module added to the manifest could be:

```json
"lifecycleProvider": {
    "modules": [
        {
            "enabled": true,
            "id": "my-lifecycle",
            "url": "http://localhost:8080/js/modules/lifecycles/my-lifecycle.bundle.js"
        }
    ]
}
```

## Implementation

If you implement a lifecycle hook module your provider can return a map of lifecycle events you want to hook in to. The hook methods are asynchronous callbacks which are called when that part of the platform lifecycle occurs.

```ts
class MyLifecycle {
  public async get(): Promise<LifecycleEventMap> {
    const eventMap: LifecycleEventMap = {};

    eventMap['after-bootstrap'] = async (platform: WorkspacePlatformModule) => {
      const workspaces = await platform.Storage.getWorkspaces();
      const homeWorkspace = workspaces.find((ws) => ws.title.toLowerCase() === 'my-snapshot');

      if (homeWorkspace) {
        this._logger.info('After login triggered, loading custom home snapshot');
        await platform.applyWorkspace(homeWorkspace);
      } else {
        this._logger.info('After login triggered, loading default home snapshot');
        await platform.applySnapshot(this._settings.homeSnapshot);
      }
    };

    return eventMap;
  }
}
```

You also need the entry point exported from the module.

```ts
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
  conditions: new MyConditions()
};
```

## Platform Lifecycle Events

The lifecycle events that are available to connect to are:

- `after-bootstrap` - This lifecycle event is fired when all the other components have been bootstrapped, in your manifest you could disable the autoShow for all workspace components and launch a specific view for your platform.
- `before-quit` - The event is called before all the modules and components are torn down during the quit process, this allows your modules to perform any persistence or cleanup operations of their own.

## Source Reference

- [lifecycle.ts](../client/src/framework/lifecycle.ts)
- [lifecycle-shapes.ts](../client/src/framework/shapes/lifecycle-shapes.ts)
