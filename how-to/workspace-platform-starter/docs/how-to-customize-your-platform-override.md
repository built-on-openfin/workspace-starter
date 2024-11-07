> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Customize Your Platform Override

Workspace Platform Starter includes a default platform override that includes support for saving workspaces to endpoints instead of indexdb, it supports include SnapSDK information as part of a workspace and it has a number of overrides related to custom Browser menus and theming.

OpenFin Workspace 19.1+ lets you specify an array of platform overrides that can be layered on top of each other so that different overrides can add custom behavior.

Workspace Platform Starter 19.1 supports this ability by adding module support to platformProvider.

## default workspace platform platform override is now a module

We have broken our workspace platform override out from the main codebase so that it is now a module (this is similar to when we took our opinionated interop override and made it into an optional module). The new module can be found here: [wps-platform-override](../client/src/modules/platform-override/wps-platform-override/).

If you wish to keep the existing platform support you will need to ensure that the wps platform override is added to the new modules array (we have added it to our sample manifests but if you have your own settings or manifest then you will need to add this support to your setup). You can see this in platformProvider section of the [manifest.fin.json](../public/manifest.fin.json) and [settings.json](../public/settings.json) files (an example is shown below).

The module helpers and platform overrides are passed an extended/updated set of helpers that include functions that help with the running of a platform (as these are features used by the default platform implementation that may be useful if you are implementing your own platform or just extending the platform through additional platform overrides).

If you do not include our default implementation in the modules array then you will have the default implementation from the Workspace Platform NPM package and you will be responsible for customizing your Platform behavior.

## modules

The ability to specify an [array of platform override constructors](https://cdn.openfin.co/docs/javascript/stable/interfaces/OpenFin.InitPlatformOptions.html#overrideCallback) was introduced in the v33 release of the OpenFin runtime and is now exposed to your workspace platform in version 19.0 of workspace.

These are platform modules that provide custom platform logic. If there are more than one then they will extend each other (the earlier entries will act as the base for subsequent entries). If you wish to use the Workspace Platform Starter platform override module as a base for your interop overrides so it should be at the start of the modules array. Here is an extract from [manifest.fin.json](../public/manifest.fin.json):

```json
"platformProvider": {
  ...
   "modules": [
    {
      "id": "default-wps-platform",
      "icon": "http://localhost:8080/favicon.ico",
      "title": "Workspace Platform Starter Platform Override",
      "description": "This is the implementation included in workspace platform starter but it is now exposed as a module to allow for easy replacement.",
      "enabled": true,
      "url": "http://localhost:8080/js/modules/platform-override/wps-platform-override.bundle.js",
      "data": {
       "loggerName": "WpsPlatformOverride"
      }
     }
   ]
}
```

If you wish to keep the default behavior you will need to ensure your settings service or manifest includes the modules array with a reference to the wps-platform-override.bundle.js file.

## endpoint client

The default implementation checks to see if there are endpoints that should be used for saving or getting workspaces, pages etc. It does this by checking to see if there are endpoints with specific ids e.g. `workspace-get`.

In order for the wps platform override module to be able to use endpoints (just like other modules) it will need to be added to the endpointClient list in the endpointProvider settings. An example can be seen in [manifest.fin.json](../public/manifest.fin.json):

```json
"endpointProvider": {
  ...
   "endpointClients": {
    "clientOptions": [
     {
      "enabled": true,
      "id": "default-wps-platform",
      "endpointIds": [
       "*"
      ]
     }
    ]
   }
  },
```

## Generate From Template

You can generate the scaffold for a new module by using the following command line, where "my platform override" is the name you want to give your module:

```shell
npm run generate-module platformOverride "my platform override"
```

This will generate the code in the modules/platform-override folder, add an entry into webpack to build it, and add it to the manifest so that the module is loaded (via platformProvider.modules).

This now opens up the capability to add your own logic to the platform (you want to use a workspace platform feature that Workspace Platform Starter doesn't use or you want to override it or change the data before or after we have handled it). Platform Override Modules can be passed custom settings through the module definition's data property and it will be passed the settings entered in platformProvider and Browser settings so your implementation can re-use those settings.

## Source Reference

- [Default Workspace Starter Platform Override Module](../client/src/modules/platform-override/wps-platform-override/)
- [Example Workspace Platform Override That Validates App Urls and Access](../client/src/modules/platform-override/application-url-and-access-validator/)
- [Example Workspace Platform Override That Has Custom Snap SDK Logic To Determine Which Windows Can Snap](../client/src/modules/platform-override/snap-window-selection-override/)
- [Example Workspace Platform Override That supports notifying users about Apps having unsaved changes when closing a window/page/view](../client/src/modules/platform-override/get-user-decision-for-beforeunload/README.md)

[<- Back to Table Of Contents](../README.md)
