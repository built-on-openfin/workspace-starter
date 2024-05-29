> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Customize Your Interop Broker

Workspace Platform Starter includes a default interop broker override that includes support for FDC3 2.0 and intents as well as context. It has been built to support interop with support for the Platform Apps format used by Workspace Platform Starter (directories can still use the FDC3 1.2 & 2.0 format as these are mapped internally to the PlatformApp format).

OpenFin Workspace 18.0+ lets you specify an array of interop overrides that can be layered on top of each other so that different overrides can add custom behavior.

Workspace Platform Starter 18.0 supports this ability by adding module support to platformProvider.interop.

## default workspace platform interop override is now a module

We have broken the interop broker from the main codebase so that it is now a module (this is similar to when we took our opinionated app, page and workspace Home integrations out of the framework and made them into optional modules). The new module can be found here: [wps-interop-override](../client/src/modules/interop-override/wps-interop-override/).

If you wish to keep the existing interop broker support you will need to ensure that the wps interop override is added to the new modules array (we have added it to our sample manifests but if you have your own settings or manifest then you will need to add this support to your setup). You can see this in platformProvider.interop section of the [manifest.fin.json](../public/manifest.fin.json) and [settings.json](../public/settings.json) files (an example is shown below).

The module helpers have been updated to include bringAppToFront and isConnectionValid to the helpers (as these are features used by the default broker implementation that may be useful if you are implementing your own broker or just extending the broker through additional interop overrides).

If you do not include our default implementation in the modules array then you will have the default implementation from the Workspace Platform NPM package and you will be responsible for customizing your Interop Broker behavior.

## modules

The ability to specify an [array of interop override constructors](https://cdn.openfin.co/docs/javascript/stable/interfaces/OpenFin.InitPlatformOptions.html#interopOverride) was introduced in the v33 release of the OpenFin runtime and is now exposed to your workspace platform in version 18.0 of workspace.

These are interop modules that provide custom interop broker logic. If there are more than one then they will extend each other (the earlier entries will act as the base for subsequent entries). If you wish to use the Workspace Platform Starter interop override module as a base for your interop overrides so it should be at the start of the modules array. Here is an extract from [manifest.fin.json](../public/manifest.fin.json):

```json
"platformProvider": {
  ...
  "interop": {
   "modules": [
    {
      "id": "wps-interop-override",
      "icon": "http://localhost:8080/favicon.ico",
      "title": "Workspace Platform Starter Interop Broker",
      "description": "This is the implementation included in workspace platform starter but it is now exposed as a module to allow for easy replacement.",
      "enabled": true,
      "url": "http://localhost:8080/js/modules/interop-override/wps-interop-override.bundle.js",
      "data": {
       "loggerName": "WpsInteropOverride"
      }
     }
   ]
  }
}
```

If you wish to keep the default behavior you will need to ensure your settings service or manifest includes the modules array with a reference to the wps-interop-override.bundle.js file.

## endpoint client

The default implementation checks to see if there are endpoints that should be used for enriching a context object. It does this by checking to see if there are endpoints with the context type available e.g. `interopbroker.process.${context.type}`.

In order for the wps interop override module to be able to use endpoints (just like other modules) it will need to be added to the endpointClient list in the endpointProvider settings. An example can be seen in [manifest.fin.json](../public/manifest.fin.json):

```json
"endpointProvider": {
  ...
   "endpointClients": {
    "clientOptions": [
     {
      "enabled": true,
      "id": "wps-interop-override",
      "endpointIds": [
       "*"
      ]
     }
    ]
   }
  },
```

## Generate From Template

You can generate the scaffold for a new module by using the following command line, where "my interop override" is the name you want to give your module:

```shell
npm run generate-module interopOverride "my interop override"
```

This will generate the code in the modules/interopOverride folder, add an entry into webpack to build it, and add it to the manifest so that the module is loaded (via platformProvider.interop.modules).

This now opens up the capability to add your own logic to the default interop broker (e.g. when setContext is called) and then calling the base class to keep the existing behavior. Interop Override Modules can be passed custom settings through the module definition's data property and it will be passed the settings entered in platformProvider.interop so your implementation can re-use those settings.

## Source Reference

- [Default Workspace Starter Interop Override Module](../client/src/modules/interop-override/wps-interop-override/)

[<- Back to Table Of Contents](../README.md)
