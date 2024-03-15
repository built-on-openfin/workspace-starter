> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

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

- `auth-logged-in` - The event is fired after logging in. We would recommend using after-bootstrap if you are looking to perform actions (as this would work regardless of whether or not they would need to log in). Use this if you want to reverse changes that you may have set when the auth-session-expired event happened (e.g. maybe you hid a window until they have logged back in as an example).
- `auth-session-expired` - The event is called when the auth provider you have configured believes that the session has expired. The platform will trigger the auth providers login action but you might want to perform additional platform specific steps (e.g. hide windows until after they have logged back in).
- `auth-before-logged-out` - The event is called just before the user logs out. You might want to use this instead of before quit in case you need to call an authenticated service (e.g. save an audit entry or something).
- `after-bootstrap` - This lifecycle event is fired when all the other components have been bootstrapped, in your manifest you could disable the autoShow for all workspace components and launch a specific view for your platform.
- `before-quit` - The event is called before all the modules and components are torn down during the quit process, this allows your modules to perform any persistence or cleanup operations of their own.
- `theme-changed` - The event is called when the theme is changed in the system, it is passed the `ThemeChangedLifecyclePayload` payload which contains the `schemeType` and the `palette`.
- `workspace-changed` - The event is called when a workspace is added/updated/deleted, it is passed the `WorkspaceChangedLifecyclePayload` payload which contains the `action` and information about the workspace.
- `page-changed` - The event is called when a page is added/updated/deleted/focused, it is passed the `PageChangedLifecyclePayload` payload which contains the `action` and information about the page.
- `apps-changed` - The event is called when the list of apps available to the platform changes.
- `favorite-changed` - The event is called when a favorite is set/delete, it is passed the `FavoriteChangedLifecyclePayload` payload which contains the `action` and information about the favorite.
- `condition-changed` - The event is called when a condition is changed, it is passed the `ConditionChangedLifecyclePayload` payload which contains `conditionId` of the condition that changed, if `conditionId` us undefined, a number of conditions might have changed.
- `language-changed` - The event is called when a language is changed, it is passed the `LanguageChangedLifecyclePayload` payload which contains `locale` which is the locale that was selected.

## Generate From Template

You can generate the scaffold for a new module by using the following command line, where "My Lifecycle" is the name you want to give your module:

```shell
npm run generate-module lifecycle "My Lifecycle"
```

This will generate the code in the modules/lifecycle folder, add an entry into webpack to build it, and add it to the manifest so that the module is loaded.

## Source Reference

- [lifecycle.ts](../client/src/framework/lifecycle.ts)
- [lifecycle-shapes.ts](../client/src/framework/shapes/lifecycle-shapes.ts)

[<- Back to Table Of Contents](../README.md)
