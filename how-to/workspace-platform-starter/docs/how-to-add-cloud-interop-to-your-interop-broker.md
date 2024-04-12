> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Add Cloud Interop To Your Interop Broker

Workspace Platform Starter includes a default interop broker override that includes support for FDC3 2.0 and intents as well as context. It has been built to support interop with support for the Platform Apps format used by Workspace Platform Starter (directories can still use the FDC3 1.2 & 2.0 format as these are mapped internally to the PlatformApp format).

OpenFin Workspace 18.0+ lets you specify an array of interop overrides that can be layered on top of each other so that different overrides can add custom behavior.

Workspace Platform Starter 18.0 supports this ability by adding module support to platformProvider.interop and this support lets us easily offer optional cloud interop support through a module.

## Cloud Interop interop override is available as a module

Our default interop broker is now available as a module and you can easily generate your own interop broker override: See [How To Customize Your Interop Broker](./how-to-customize-your-interop-broker.md).

To make it easy to test OpenFin's cloud interop support we have generated an [openfin-cloud-interop](../client/src/modules/interop-override/openfin-cloud-interop/interop-override.ts) that imports and configures the [@openfin/cloud-interop](https://www.npmjs.com/package/@openfin/cloud-interop) npm module.

You can see this in platformProvider.interop section of the [manifest.fin.json](../public/manifest.fin.json) and [settings.json](../public/settings.json) files (an example is shown below).

### Settings

The settings are in a manifest and static settings.json file but this type of information is best served from a service after the user has authenticated. Do not check in your credentials. Please contact your OpenFin Sales Account Manager to get your cloud credentials.

```json
"platformProvider": {
  ...
  "interop": {
   "modules": [
    {
      "id": "openfin-cloud-interop",
      "icon": "http://localhost:8080/favicon.ico",
      "title": "OpenFin Cloud Interop",
      "description": "OpenFin Cloud Interop",
      "enabled": false,
      "url": "http://localhost:8080/js/modules/interop-override/openfin-cloud-interop.bundle.js",
      "data": {
       "userId": "<DO NOT CHECK IN CREDENTIALS>",
       "password": "<DO NOT CHECK IN CREDENTIALS>",
       "platformId": "",
       "url": "",
       "sourceDisplayName":"",
       "sourceId": ""
      }
     }
   ]
  }
}
```

Once you have cloud interop enabled you will be able to share context across user channels (green, yellow, red etc) across devices and platforms.

## Other Examples

We have also updated our _support-context-and-intents_ how-to example to optionally support cloud interop. This is a much simpler example and doesn't use the module pattern which is useful if you have your own workspace platform and you just want to see how to use the [@openfin/cloud-interop](https://www.npmjs.com/package/@openfin/cloud-interop) npm module.

## Source Reference

- [OpenFin Cloud Interop Override Module](../client/src/modules/interop-override/openfin-cloud-interop/)

[<- Back to Table Of Contents](../README.md)
