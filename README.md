<img src="./assets/OpenFin-Workspace-Starter.png" width="100%" alt="OpenFin Workspace Starter" />

>**_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes. Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a  licence from OpenFin. Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license. OpenFin Workspace is currently **only supported on Windows**.

## OpenFin Workspace

The OpenFin Workspace is a full-featured work environment designed to improve the way you get things done. Built on a secure browsing experience powered by Chromium, the core offering includes a smart digital assistant, a powerful web browser built to support modern application workflows out-of-the-box, a store to aid in the discovery of content and a notification system to surface important moments while they're still important.

[Learn more about openfin.co/workspace](https://www.openfin.co/workspace/)

## What you can do with this repository

This repository contains examples showing how to configure core Workspace functionality for your application.

### Examples

  | Example         | Description |
|---------------------|------------------------------------
| [Learn how to add your content to OpenFin Workspace (Home & Browser)](./how-to/add-an-application-to-workspace)|This example gets you up and running with OpenFin workspace by hosting a few static JSON files and configuring Desktop Owner Settings (DOS) to load them.                 
| [Learn how to add your content to OpenFin Workspace (Home & Browser) via an api](./how-to/add-an-application-to-workspace-via-api) |This example is an extension of the previous example. The main difference being that Desktop Owner Settings no longer points to a list of applications. You now have a Workspace Platform Application that reads the JSON file (your application may wish to authenticate the user before doing so) and then provides those applications to OpenFin Home using an API.                
| [Learn how to add your content to OpenFin Workspace (Home, Browser & Storefront)](./how-to/add-an-application-to-storefront)   | This example is an extension of the previous example. The main difference is that it is now using config and the list of apps to use our Storefront APIs to configure a store.
| [Learn how to add your content to OpenFin Workspace (Storefront) - Basic Example](./how-to/add-an-application-to-storefront-basic)   | This is a basic example where the apps and store configuration is hard-coded. The example app is visible and has 3 buttons to register the store, show the store and hide the store.


## Before you get started

Read more about our [recommended development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment).

OpenFin Workspace is currently **only supported on Windows**.

## Minimum RVM Version

To customize OpenFin Workspace you use DesktopOwnerSettings. This requires a minimum version of the OpenFin RVM. To find the version you currently have do the following:

- Go to *%localappdata%/OpenFin* in windows explorer
- Right-click on OpenFinRVM and select *Properties*
- Click on the *Details* tab and see your version number

Depending on your version the following rules will apply:

| RVM Version         | Supports Custom Workspace Settings | Setting Required          |
|---------------------|------------------------------------|---------------------------|
| v6.0.0.3 & below    |                 No                 | N/A                       |
| v6.1.0.1 - v6.3.1.3 |                 Yes                | openfinSystemApplications |
| v6.4.1.1 & above    |                 Yes                | systemApps                |

### Example Desktop Owner Setting for OpenFinRVM v6.1.0.1 - v6.3.1.3

```json
{
  "desktopSettings": {
    "openfinSystemApplications": {
      "workspace": {
        "customConfig": {
        }
      }
    }
  }
}
```

### Example Desktop Owner Setting for OpenFinRVM v6.4.1.1 & Above

```json
{
  "desktopSettings": {
    "systemApps": {
      "workspace": {
        "customConfig": {
        }
      }
    }
  }
}
```

Read more about these settings in [Workspace documentation](https://developers.openfin.co/of-docs/docs/workspace-override-options)
