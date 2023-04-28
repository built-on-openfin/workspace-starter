> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Define FDC3 1.2 Apps

## FDC3 1.2 App Format

We support this format although you will lose out on the ability to specify tags (which is used for store, and dock app assignment and used to filter apps in home) unless you specify tags as a string array property of the app (which is not part of the spec but we map that to our tag setting). We generally recommend our platform app format or FDC3 2.0.

We map this format to our internal Platform App format. We include an example of this in the public folder of customize-workspace [apps-fdc3-1-2.json](../public/apps-fdc3-1-2.json).

### What Does An FDC3 1.2 App Definition Look Like?

```json
{
  "$schema": "./schemas/fdc3v1.2-appd.schema.json",
  "applications": [
    {
      "appId": "fdc3-workbench",
      "name": "fdc3-workbench",
      "title": "FDC3 Workbench (1.2)",
      "description": "Launch the official FDC3 Workbench with FDC3 1.2 enabled.",
      "manifest": "https://built-on-openfin.github.io/workspace-starter/workspace/vnext/common/views/fdc3/workbench/fdc3-workbench-view.json",
      "manifestType": "view",
      "icons": [
        {
          "icon": "https://fdc3.finos.org/toolbox/fdc3-workbench/favicon.ico"
        }
      ],
      "contactEmail": "contact@example.com",
      "supportEmail": "support@example.com",
      "publisher": "OpenFin",
      "intents": [
        {
          "name": "ViewContact",
          "displayName": "View Contact",
          "contexts": ["fdc3.contact"],
          "customConfig": {}
        },
        {
          "name": "ViewInstrument",
          "displayName": "View Instrument",
          "contexts": ["fdc3.instrument"],
          "customConfig": {}
        }
      ],
      "images": [
        {
          "url": "https://built-on-openfin.github.io/workspace-starter/workspace/vnext/common/images/previews/fdc3-workbench.png"
        }
      ]
    }
  ]
}
```

The following fields are mandatory:

- appId - helps identify the application in platform
- name - serves a similar purpose to appId
- title - used to identify the app when searching or browsing
- manifestType - what type of application is this (this can be extended by a platform and customize-workspace supports a number of manifestTypes)
- manifest - this can be a url to a json endpoint or it can be a JSON object. Customize uses the manifest type inline-\* to indicate when the intention is to pass the payload directly.

The following field is custom to this platform and is optional:

- private - default value is false. Should this app entry be available for api usage (e.g. intents) but not be visible in e.g. Home, Store, Dock? Similar to how a private npm package can be used by some people but not everyone.
- autostart - default value is false. Should this app be launched after bootstrapping.
- instanceMode - default mode is multi. Value can be "single"|"multi".

These settings are expressed by setting the customConfig of an app definition:

```json
"customConfig": {
    "private": "false",
    "autoStart": "false",
    "instanceMode": "multi"
}
```

## Intents

An application can specify that it supports being launched to support certain workflows. These are defined as intents.

There are a number of intents supported by the FDC3 standard (ViewContact and ViewInstrument are shown in the example above) but you can also define custom intents for your organization. If your app meta data specifies that it supports an intent then it should listen for that intent and react to it. We cover more in the [How To Add Intent Support To Your App](./how-to-add-intent-support-to-your-app.md).

If a second application raises an intent then the workspace platform will check to see if any applications support the workflow. If only one app entry supports it then the platform will launch it. If there is more than one option then it will present the list of options to the end user. You can customize the UI presented to the user and we will cover that in the [How To Configure FDC3 Intents Page](./how-to-configure-fdc3-intents.md).

## How To Create An App Definition

You can either use a local json file served by our development server or have one based on a service. The format should match the fdc3 format shown above.

## Manifest Types

We support a number of manifestTypes which can be seen in [What Manifest Types Are Supported](./what-manifest-types-are-supported.md).

## Where Are Apps Used?

Apps can come from many sources but the feed can be used by:

- Workspace Home - To present the user with a list of apps that they can filter and launch (if the private setting is unset or false).
- Workspace Store - Apps can be used to populate sections of the store so people can browse in order to see what they are entitled to (if the private setting is unset or false).
- Workspace Dock - Apps can be pinned to or listed from the Dock in order to give an easy way of launching common applications (if the private setting is unset or false).
- The platform's Interop Broker for supporting the launching of Intents (the broker can look up any app regardless of whether it is marked private or not).

Our guides show how to:

- [Configure Dock](./how-to-customize-dock.md)
- [Configure Home](./how-to-customize-home.md)
- [Configure Store](./how-to-customize-store.md)

## Source Reference

- [apps.ts](../client/src/framework/apps.ts)
- [inline-apps/endpoint.ts](../client/src/modules/endpoints/inline-apps/endpoint.ts)

[<- Back to Table Of Contents](../README.md)
