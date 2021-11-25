<img src="./assets/OpenFin-Workspace-Starter.png" width="100%" alt="OpenFin Workspace Starter" />

## OpenFin Workspace

The OpenFin Workspace is a full-featured work environment designed to improve the way you get things done. Built on a secure browsing experience powered by Chromium, the core offering includes a smart digital assistant, a powerful web browser built to support modern application workflows out-of-the-box, a store to aid in the discovery of content and a notification system to surface important moments while they're still important.

[Learn more about openfin.co/workspace](https://www.openfin.co/workspace/)

## What you can do with this repository

This repository contains examples showing how to configure core Workspace functionality for your application using our workspace API.

### Examples

  | Example         | Description |
|---------------------|------------------------------------
| [How To Migrate From A Previous Version](./how-to/migrate-from-a-previous-version) | This is more a guide than an example. The guide covers what is the difference between version 1-3 and version 4 and points to examples on how to manage those differences.                
| [How To Register With Home](./how-to/register-with-home) | You have a Workspace Platform Application that reads a rest endpoint file (your application may wish to authenticate the user before doing so) and then provides those applications to OpenFin Home using an API.                
| [How To Register With Home - Basic](./how-to/register-with-home-basic) | You have a basic Workspace Platform Application that has a hardcoded list of apps and provides those apps to OpenFin Home using an API. The example app is visible and has 3 buttons to register/deregister against Home, show Home and hide Home.            
| [How To Register With Store)](./how-to/register-with-store)   | This example is an extension of the registering with Home example. The main difference is that it is now using config and the list of apps to use our Storefront APIs to configure a store in addition to Home.
| [How To Register With Store - Basic](./how-to/register-with-store-basic)   | This is a basic example where the apps and store configuration is hard-coded. The example app is visible and has 3 buttons to register/deregister the store, show the store and hide the store.


## Before you get started

Read more about our [recommended development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment).

OpenFin Workspace is currently **only supported on Windows**.

## Minimum RVM Version

A desktop owner settings file is no longer required to configure OpenFin Workspace. However, there may be settings that a Desktop Owner may wish to configure (such as version) and this requires a minimum version of the OpenFin RVM. To find the version you currently have do the following:

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
        "version": "4.0.0",
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
        "version": "4.0.0",
        "customConfig": {
        }
      }
    }
  }
}
```

Read more about these settings in [Workspace documentation](https://developers.openfin.co/of-docs/docs/workspace-override-options)
