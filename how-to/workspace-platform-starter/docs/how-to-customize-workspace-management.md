> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# What Is Workspace Management

By default the workspace components will give you workspace management features in the [Workspace Browser](./how-to-customize-browser.md) and [Workspace Dock](./how-to-customize-dock.md).

This is the ability to save a workspace, rename it, delete it or launch it.

When you **save** a workspace it captures the Browser windows you have, the pages assigned to those windows and the layout (which views are present and how they are laid out) within those pages. If your views have created customData this will be included in the snapshot (which is what we call the JSON representation of all of this data).

This lets you easily capture window arrangements and the applications you work with an assign it a name. You can then switch between saved workspaces depending on the workflow you want to kick off, where you are logging in (home desktop setup vs work desktop setup) or what time of day it is (morning vs afternoon routine).

## Where Are Workspaces Saved?

By default this json data is saved to [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API). This lets you get up and running without any server requirement for the storage of this data.

## What If I Want To Change Where This Information Is Stored?

A workspace platform lets you override the platform implementation so you can come up with your own function implementations for the saving and fetching of workspaces. This is called a platform override and the workspace platform starter implementation exists here: [platform-override.ts](../client/src/framework/platform/platform-override.ts).

Instead of modifying this file directly we allow you to specify the destination and source of workspaces through config and the definition of [endpoints](./how-to-define-endpoints.md).

### Endpoint Ids

Endpoints support an action and request/response function (see [How To Define Endpoints](./how-to-define-endpoints.md)). Workspace platform starter checks to see if you have specified the following endpoints:

- workspace-list
- workspace-get
- workspace-set
- workspace-remove

If you provide endpoints with these ids then workspace platform starter will use them instead of the default indexedDB implementation.

This frees you up to fetch and save your workspaces from/to anywhere in any way that works for you.

Endpoints have a default **fetch** implementation where you can just point to rest endpoints but you could also have a custom module (see [How To Add A Module](./how-to-add-a-module.md) that implements your own logic.

## Do You Have An Example Of A Custom Implementation?

Our default example manifest ([manifest.fin.json](../public/manifest.fin.json)) doesn't override the default behavior. Our second manifest ([second.manifest.fin.json](../public/second.manifest.fin.json)) loads configuration through a rest endpoint (see [settings.json](../public/settings.json)) and that defines the endpoints listed above in the **endpointProvider** definition.

```json
 "endpointProvider": {
  "modules": [
   {
    "enabled": true,
    "id": "local-storage",
    "url": "http://localhost:8080/js/modules/endpoint/local-storage.bundle.js"
   }
  ],
  "endpoints": [
   {
    "id": "workspace-list",
    "type": "module",
    "typeId": "local-storage",
    "options": {
     "method": "GET",
     "dataType": "workspace"
    }
   },
   {
    "id": "workspace-get",
    "type": "module",
    "typeId": "local-storage",
    "options": {
     "method": "GET",
     "dataType": "workspace"
    }
   },
   {
    "id": "workspace-set",
    "type": "module",
    "typeId": "local-storage",
    "options": {
     "method": "SET",
     "dataType": "workspace"
    }
   },
   {
    "id": "workspace-remove",
    "type": "module",
    "typeId": "local-storage",
    "options": {
     "method": "REMOVE",
     "dataType": "workspace"
    }
   }
  ]
 },
```

As you can see from the configuration above:

1. A custom endpoint module is defined that saves/gets data and uses localstorage as the source.
2. Each endpoint definition references that module using type and typeId and passes options specific to the particular endpoint.

If you use the live launch section on the [Main Page](../README.md) and launch the second example and save a workspace you will be able to use dev tools to see that it is saved to localstorage instead of indexedDB. You can then create your own endpoints with custom logic or use our fetch builtin implementation to save and fetch your workspaces.

## Can I Manage Workspaces From Home?

We include support for doing workspace management from home in workspace platform starter. It is enabled by default as an integration provider.

![Home Workspace Management](./assets/home-workspace-management.png)

### I See A Sharing Button, How Is That Configured?

Please see [How To Workspace Platform Starter And Browser Page Sharing](./how-to-workspace-platform-starter-browser-page-sharing.md).

## Source Reference

- [platform-override.ts](../client/src/framework/platform/platform-override.ts)
- [platform-local-storage.ts](../client/src/modules/endpoint/local-storage/platform-local-storage.ts)

[<- Back to Table Of Contents](../README.md)
