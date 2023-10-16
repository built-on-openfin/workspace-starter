> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Define FDC3 2.0 Apps

## FDC3 2.0 App Format

We support this format out of the box (we map it to our own internal format). We generally recommend our platform app format or FDC3 2.0.

We include an example of this in the public folder of workspace-platform-starter [apps-fdc3-2-0.json](../public/apps-fdc3-2-0.json).

### What Does An FDC3 2.0 App Definition Look Like?

```json
{
  "$schema": "./schemas/fdc3v2.0-appd.schema.json",
  "applications": [
    {
      "appId": "fdc3-workbench-2-0",
      "name": "fdc3-workbench-2-0",
      "title": "FDC3 Workbench (2.0)",
      "description": "Development and test tool for FDC3 desktop agents and apps",
      "categories": ["developer tools", "tools", "training"],
      "version": "2.0.0",
      "tooltip": "FDC3 Workbench",
      "lang": "en-US",
      "icons": [
        {
          "src": "https://fdc3.finos.org/toolbox/fdc3-workbench/fdc3-icon-256.png"
        }
      ],
      "screenshots": [
        {
          "src": "https://fdc3.finos.org/docs/assets/fdc3-logo.png",
          "label": "FDC3 logo"
        }
      ],
      "contactEmail": "fdc3@finos.org,",
      "supportEmail": "fdc3-maintainers@finos.org,",
      "publisher": "FDC3",
      "type": "other",
      "details": {},
      "hostManifests": {
        "OpenFin": {
          "type": "view",
          "details": "http://localhost:8080/common/views/fdc3/workbench/fdc3-workbench-2-0.view.fin.json"
        }
      },
      "localizedVersions": {
        "fr-FR": {
          "title": "FDC3 Table de travail",
          "description": "Outil de développement et de test pour les desktop agents et applications FDC3"
        }
      },
      "interop": {
        "intents": {
          "listensFor": {
            "ViewContact": {
              "displayName": "View Contact",
              "contexts": ["fdc3.contact", "fdc3.contactList"]
            },
            "ViewInstrument": {
              "displayName": "View Instrument",
              "contexts": ["fdc3.instrument", "fdc3.instrumentList"]
            }
          }
        },
        "userChannels": {
          "broadcasts": ["fdc3.instrument"],
          "listensFor": [
            "fdc3.instrument",
            "fdc3.instrumentList",
            "fdc3.position",
            "fdc3.portfolio",
            "fdc3.chart",
            "fdc3.timeRange"
          ]
        },
        "appChannels": []
      }
    }
  ]
}
```

The following fields are mandatory:

- appId - helps identify the application in platform
- title - used to identify the app when searching or browsing
- type - there are a number of fdc3 2.0 official types like: web, native, other.
- details - An object with details related to type. These settings can be extended by specifying them in the hostManifests.OpenFin.details setting. For web we take the url from the root details object and then take any additional settings from hostManifests.OpenFin. It maps in the following way:

## type to ManifestType mapping

- web -> inline-view (url from details and the rest of the view settings can be set through hostManifests.OpenFin.details)
- native -> inline-external (path and arguments are defined in the root details object as per the spec)
- onlineNative -> desktop-browser (url taken from the root details object)
- other -> you should set the details at the root as an empty object. You can then set manifest type through hostManifests.OpenFin.type and the details for each manifest type through hostManifests.OpenFin.details.

## Manifest Types

We support a number of manifestTypes which can be seen in [What Manifest Types Are Supported](./what-manifest-types-are-supported.md).

The following field is custom to this platform and is optional:

- private - default value is false. Should this app entry be available for api usage (e.g. intents) but not be visible in e.g. Home, Store, Dock? Similar to how a private npm package can be used by some people but not everyone.
- autostart - default value is false. Should this app be launched after bootstrapping.
- instanceMode - default mode is multi. Value can be "single"|"multi"|"new" (new means a new instance will be created if an intent is raised and the app specified but no instance id even if there are existing instances. The intent picker will also not show instances as the app provider has indicated they want to just launch a new instance).
- launchPreference - This is an optional and new setting added to v15 of workspace-platform-starter. This lets the directory owner or the app owner specify a preference that should apply to the application when launching.
  - bounds - Bounds can optionally be specified. A view is something that exists in a platform/browser window so this allows a preference for height/width to be specified. A classic window can already specify a height and width in it's manifest but you may want a custom height/width for this app entry (especially if the window is defined as an external manifest as opposed to an inline one).
  - defaultCentered - a particular view/classic window might need to be centered on launch. This allows the app/directory owner to specify that preference.
  - options - Optional options that are specific to the app/manifest type. Only view/inline-view has supported settings at this time.
    - view you specify host specific settings.
      - host - host settings to be used by the page hosting the view
        - url - lets you specify that this view should be loaded into a specific Platform API window instead of the default browser window. The ability to have Platform API and Browser windows together in the same platform was added in v15 of @openfin/workspace-platform.
        - title - the title to set on the window and this title is shown if pages are disabled on a browser window
        - icon - used to replace the menu icon on a browser window (can be used by a platform window if you use the setting)
        - hasHeaders - specify if you wish to have the view tab in a browser or platform api window
        - disableMultiplePages - Disable multiple pages in a browser window.
        - disableToolbarOptions - Remove toolbar buttons from browser window.
        - pageTitle - provide a custom title (instead of undefined) to the launched page hosting the view if you haven't turned off pages.
        - pageIcon - an icon to display alongside the page title is the page has no unsaved changes.

These settings are expressed by setting the config values of hostManifests.OpenFin.config:

```json
"config": {
    "private": false,
    "autoStart": false,
    "instanceMode": "multi",
    "launchPreference": {
      "bounds": {
        "height": 500,
        "width": 500
      },
      "defaultCentered": false,
      "options": {

      }
    }
}
```

## Intents

An application can specify that it supports being launched to support certain workflows. These are defined as intents. These are defined as the fdc3 2.0 app spec defines through app.interop.intents.

There are a number of intents supported by the FDC3 standard (ViewContact and ViewInstrument are shown in the example above) but you can also define custom intents for your organization. If your app meta data specifies that it supports an intent then it should listen for that intent and react to it. We cover more in the [How To Add Intent Support To Your App](./how-to-add-intent-support-to-your-app.md).

If a second application raises an intent then the workspace platform will check to see if any applications support the workflow. If only one app entry supports it then the platform will launch it. If there is more than one option then it will present the list of options to the end user. You can customize the UI presented to the user and we will cover that in the [How To Configure FDC3 Intents Page](./how-to-configure-fdc3-intents.md).

## How To Create An App Definition

You can either use a local json file served by our development server or have one based on a service. The format should match the fdc3 format shown above.

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
- [directory.ts](../client/src/framework/directory.ts)
- [inline-apps/endpoint.ts](../client/src/modules/endpoint/inline-apps/endpoint.ts)

[<- Back to Table Of Contents](../README.md)
