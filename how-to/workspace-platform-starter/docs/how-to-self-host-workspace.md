> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How to self host Workspace Components?

Self-hosting means serving the HTML, CSS, JavaScript and related files for a particular Component/UI from your own servers instead of of the Here domain: workspace.openfin.co.

The two pieces that can be self hosted are:

- Notification Center
- Workspace Platform - (the Browser UI and related files)

This document covers how to enable self hosting when using the workspace platform starter (this can be used as a guide for your own implementation of a Workspace Platform and can complement the official documentation on our developer site).

In all cases please ensure you are licensed to use self-hosting in production.

## Self Hosted Notification Center

Fetch the notification center files from our cdn and create your own notification manifest and host them on your own server as detailed here <https://developers.openfin.co/of-docs/docs/register-notifications#host-on-your-cdn-optional>.

Update your Workspace Platform Starter settings. Update the notificationProvider setting to add notificationsCustomManifest. This will specify your notification center uuid and the url for that manifest:

```json
{
  "notificationProvider": {
      ...
   "notificationsCustomManifest": {
    "manifestUrl": "",
    "manifestUuid": ""
   }
  },
}
```

## Self Hosted Workspace Platform Browser & Related Files

This option is currently only available on Windows.

From version 20.1 of the @openfin/workspace-platform npm package it will include a zip file called **workspace_platform.zip**. This file should not be unzipped or modified. It includes a workspace.asar file which is a zipped representation of the Browser UI and related files. This workspace_platform.zip file will be fetched from your server and extracted locally (through an app asset). When you launch a Workspace Browser Window you will be able to confirm that the file is sourced from the workspace.asar if the url for the UI comes from openfin:// as a url.

The [public/manifest.fin.json](../public/manifest.fin.json) file has been updated with three main changes:

### A new permission has been added - serveAsset

The permissions requested by [public/manifest.fin.json](../public/manifest.fin.json) now includes serveAsset

```json
{
  ...
  "platform": {
    ...
    "permissions": {
      "System": {
        "serveAsset": true,
      }
    }
  }
}
```

This is required in order to serve the Browser UI files from the workspace.asar file.

### An app asset entry has been added

The [public/manifest.fin.json](../public/manifest.fin.json) now includes an appAsset.

To ensure the Browser UI files are ready for when your platform has finished bootstrapping it has been added as an app asset to the manifest. The RVM will see this entry and download and extract the app asset if it is not available even before launching your application. It will then be cached on disk and will only change if the version number is changed.

```json
{
  ...
  "appAssets": [
  {
   "src": "http://localhost:8080/common/assets/workspace_platform.zip",
   "alias": "self-hosted-workspace-platform",
   "version": "21.0.0",
   "target": "workspace.asar"
  }
 ]
}
```

The **src** should be the url where you have copied the **workspace_platform.zip** file. This may be an application server or your CDN. We have included it in public/common/assets to not require a build step and to simplify PoCs.

The **alias** is important as it will be used when initializing your workspacePlatform.

The **version** number should reflect the version number of the @openfin/workspace-platform npm package.

The **target** has to be **workspace.asar** as that is the file contained within the workspace_platform.zip file.

### A new setting in the platformProvider section of your Workspace Platform Starter configuration has been added

We have extended the Workspace Platform Starter PlatformProvider Settings type so that you can specify a workspaceAsar and whether or not it should be enabled (to let you easily test self-hosting by setting a boolean flag).

The alias must match the alias of the appAsset you have specified.

```json
{
  ...
 "customSettings": {
  ...
  "platformProvider": {
   ...
   "workspaceAsar": {
    "enabled": false,
    "alias": "self-hosted-workspace-platform"
   }
  }
 }
}
```

**Set enabled to true if you wish to test the self-hosting option while running Workspace Platform Starter locally.**

In code ([client/src/framework/platform/platform.ts](../client/src/framework/platform/platform.ts)) this workspaceAsar setting is specified if enabled (the enabled flag is a Workspace Platform Starter customization).

```js
await workspacePlatformInit({
  workspaceAsar
});
```

### Outside of Workspace Platform Starter

If you are looking at adding self-hosting to your own platform then you would still need the serveAsset permission, an appAsset definition and you will need to pass a workspaceAsar object with the alias when you initialize the workspace platform.

[<- Back to Table Of Contents](../README.md)
