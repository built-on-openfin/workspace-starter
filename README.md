![OpenFin Workspace Starter](./assets/OpenFin-Workspace-Starter.png)

> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes. Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin. Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

## OpenFin Workspace 13.1.0

The OpenFin Workspace is a full-featured work environment designed to improve the way you get t`hings done. Built on a secure browsing experience powered by Chromium, the core offering includes a smart digital assistant, a powerful web browser built to support modern application workflows out-of-the-box, a store to aid in the discovery of content and a notification system to surface important moments while they're still important.

[Learn more about openfin.co/workspace](https://www.openfin.co/workspace/)

## What version does this branch cover?

This branch covers version **13.1.0** of OpenFin Workspace (there are versioned branches for other releases). [Click here to visit the release notes.](https://developer.openfin.co/versions/?product=Runtime#/?product=Workspace&sub-product=Workspace&version=13.1.5)

## What you can do with this repository

This repository contains examples showing how to configure core workspace functionality for your application using our workspace API.

### Workspace Platform

Want to focus on configuring a workspace platform that can utilize all workspace components, apply your branding and launch your applications? This example is a full platform implementation using all the workspace components and applying patterns to the code. For more digestable examples please consider looking at the other samples which focus on individial aspects of the workspace platform.

| Workspace Platform                                                | Description                                                                                                                                                                                                     | Live Launch                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Workspace Platform Starter](./how-to/workspace-platform-starter) | This how-to provides a way of configuring a workspace platform to evaluate the different features available to a workspace platform developer. It includes docs and guidance related to getting up and running. | [Example 1](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fworkspace-platform-starter%2Fmanifest.fin.json) [Example 2](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fworkspace-platform-starter%2Fsecond.manifest.fin.json) [Example 3](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fworkspace-platform-starter%2Fthird.manifest.fin.json) |

### Workspace Components

Want to learn about specific workspace components? If you are starting out and want code examples that just exercise the workspace components (so you can use that learning to build your own workspace platform) then the following is a good starting point.

| Example                                                                  | Description                                                                                                                                                                                                                                        | Live Launch                                                                                                                                                                    |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [How To Register With Home - Basic](./how-to/register-with-home-basic)   | You have a basic Workspace Platform Application that has a hardcoded list of apps and provides those apps to OpenFin Home using an API. The example app is visible and has 3 buttons to register/deregister against Home, show Home and hide Home. | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fregister-with-home-basic%2Fmanifest.fin.json)  |
| [How To Register With Home](./how-to/register-with-home)                 | You have a Workspace Platform Application that reads a rest endpoint file (your application may wish to authenticate the user before doing so) and then provides those applications to OpenFin Home using an API.                                  | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fregister-with-home%2Fmanifest.fin.json)        |
| [How To Customize Home Templates](./how-to/customize-home-templates)     | This example demonstrates how to customize home result templates.                                                                                                                                                                                  | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fcustomize-home-templates%2Fmanifest.fin.json)  |
| [How To Register With Store - Basic](./how-to/register-with-store-basic) | This is a basic example where the apps and store configuration is hard-coded. The example app is visible and has 3 buttons to register/deregister the store, show the store and hide the store.                                                    | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fregister-with-store-basic%2Fmanifest.fin.json) |
| [How To Register With Store](./how-to/register-with-store)               | This example is an extension of the registering with Home example. The main difference is that it is now using config and the list of apps to use our Storefront APIs to configure a store in addition to Home.                                    | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fregister-with-store%2Fmanifest.fin.json)       |
| [How To Register With Dock - Basic](./how-to/register-with-dock-basic)   | This is a basic example where the buttons are hard-coded. The example app is visible and has buttons to register/deregister the dock, show the dock and minimize the dock.                                                                         | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fregister-with-dock-basic%2Fmanifest.fin.json)  |
| [How To Register With Dock](./how-to/register-with-dock)                 | This example demonstrates using the dynamic dock features to create a favorites menu and persist the dock layout.                                                                                                                                  | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fregister-with-dock%2Fmanifest.fin.json)        |
| [How To Register With Browser](./how-to/register-with-browser)           | This example provides details on how to use OpenFin's Browser component to implement a Workspace Platform.                                                                                                                                         | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fregister-with-browser%2Fmanifest.fin.json)     |
| [How To Use Notifications](./how-to/use-notifications)                   | This example demonstrates how to create, interact and audit notifications.                                                                                                                                                                         | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fuse-notifications%2Fmanifest.fin.json)         |

### Workspace Platform Topics

There are topics that a workspace platform developer may want to look into in an isolated way. These examples focus on those topics.

| Example                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                 | Live Launch                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [How To Use Theming - Basic](./how-to/use-theming-basic)                                       | This example demonstrates how to brand the workspace applications with your own theme with only basic operations                                                                                                                                                                                                                                            | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fuse-theming-basic%2Fmanifest.fin.json)                                                                                                                                                                                                       |
| [How To Use Theming](./how-to/use-theming)                                                     | This example demonstrates how to brand the workspace applications with your own theme                                                                                                                                                                                                                                                                       | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fuse-theming%2Fmanifest.fin.json)                                                                                                                                                                                                             |
| [How To Support Context And Intents](./how-to/support-context-and-intents)                     | This example is an extension of the register with store example but shows you how to implement intent support in your workspace platform. It includes various examples of sharing context and different ways of raising an intent and passing the context to the intent target.                                                                             | [Example 1](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fsupport-context-and-intents%2Fmanifest.fin.json) [Example 2](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fsupport-context-and-intents%2Fsecond.manifest.fin.json) |
| [How To Register With Platform Windows](./how-to/register-with-platform-windows)               | This example is based off of the register with store example except that it uses Platform API Windows instead of Workspace Browser Windows. The sample is a way of demonstrating that existing platforms can decide to take advantage of Workspace Components such as Home and Store before deciding on whether to move to the Workspace Browser Component. | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fregister-with-platform-windows%2Fmanifest.fin.json)                                                                                                                                                                                          |
| [How To Add Workspace Native Window Integration](./how-to/workspace-native-window-integration) | This example shows an example of configuring Home so that it can launch a native application, capture it's location as a workspace and then launch the workspace to launch and restore the position of the native application.                                                                                                                              | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fworkspace-native-window-integration%2Fmanifest.fin.json)                                                                                                                                                                                     |
| [How To Integrate with SSO](./how-to/integrate-with-sso/README.md)                             | This example demonstrates how to integrate with a SSO provider to authenticate your application.                                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                                              |
| [How To Integrate Server Authentication](./how-to/integrate-server-authentication)             | This example demonstrates how to authenticate with a servers login page.                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                              |

## Automation Testing

OpenFin provides some packages to assist in automation testing of yours apps.

- [@openfin/automation-cli](https://www.npmjs.com/package/@openfin/automation-cli) - A command line tool for running tests in an OpenFin environment.
- [@openfin/automation-helpers](https://www.npmjs.com/package/@openfin/automation-helpers) - A package of helper methods for interacting with OpenFin components.
- [@openfin/automation-native](https://www.npmjs.com/package/@openfin/automation-native) - Helper methods to help interacting with native mouse and keyboard elements, such as context menus.

| Example                                           | Description                                                                                    | Live Launch |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------- |
| [Automation Testing](./how-to/automation-testing) | This howto contains multiple examples of using the OpenFin automation testing CLI and helpers. |             |

## Integrations

This section includes samples that utilize the official integrations listed on the OpenFin Website (see [Integration Docs](https://developers.openfin.co/of-docs/#section-third-party-applications))

| Example                                                                            | Description                                                                                                                                                                                              | Live Launch                                                                                                                                                               |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [How To Integrate With Salesforce Basic](./how-to/integrate-with-salesforce-basic) | This basic example demonstrates how to connect to Salesforce using the OpenFin integration API and perform a query.                                                                                      |                                                                                                                                                                           |
| [How To Integrate With Salesforce](./how-to/integrate-with-salesforce)             | This example demonstrates how to implement Salesforce integration in OpenFin Workspace using our Salesforce integration API, enabling you to browse and search Salesforce data in OpenFin Home.          |                                                                                                                                                                           |
| [How To Integrate With Microsoft 365 Basic](./how-to/integrate-with-ms365-basic)   | This basic example demonstrates how to connect to Microsoft 365 using the OpenFin integration API and perform a query.                                                                                   |                                                                                                                                                                           |
| [How To Integrate With Microsoft 365](./how-to/integrate-with-ms365)               | This example demonstrates how to implement Microsoft 365 integration in OpenFin Workspace using our Microsoft 365 integration API, enabling you to browse and search Microsoft 365 data in OpenFin Home. |                                                                                                                                                                           |
| [How To Integrate With Excel](./how-to/integrate-with-excel)                       | This example demonstrates how to implement Excel integration in OpenFin Workspace using our Excel integration API, enabling you to browse monitor and update Excel data.                                 | [Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.1.0%2Fintegrate-with-excel%2Fmanifest.fin.json) |
| [How To Integrate With Bloomberg Basic](./how-to/integrate-with-bloomberg-basic)   | This example demonstrates how to use our integration to connect to Bloomberg and raise intents and share context.                                                                                        |                                                                                                                                                                           |

## Other Integrations

OpenFin is a very easy platform to integrate with. If you need to integrate with something that has a REST API, JavaScript API, .NET API or Java API then then you can create your own integration easily. This section will contain examples of custom integrations to give you an idea of what is possible.

| Example                                                  | Description                                                                                                                   | Live Launch |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [How To Integrate With RSS](./how-to/integrate-with-rss) | This example demonstrates how to integrate with an RSS feed, allowing search, browse and notifications when the data changes. |             |

## General

| Documentation                                                                      | Description                                                                                                                                                                    | Live Launch |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| [How To Migrate From A Previous Version](./how-to/migrate-from-a-previous-version) | This is more a guide than an example. The guide covers what is the difference between version 1-4 and version 5-6 and points to examples on how to manage those differences.   |             |
| [Hints And Tips](./how-to/hints-and-tips)                                          | This is more a collection of hints and tips than an example. We will be building up this section over time as we come across points of interest while working on our examples. |             |

## Before you get started

Read more about our [recommended development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment).

OpenFin Workspace is currently **only supported on Windows**.

## Minimum RVM Version

A desktop owner settings file is no longer required to configure OpenFin Workspace. However, there may be settings that a Desktop Owner may wish to configure (such as version) and this requires a minimum version of the OpenFin RVM. To find the version you currently have do the following:

- Go to `%localappdata%/OpenFin` in windows explorer
- Right-click on OpenFinRVM and select _Properties_
- Click on the _Details_ tab and see your version number

Depending on your version the following rules will apply:

| RVM Version         | Supports Custom Workspace Settings | Setting Required          |
| ------------------- | ---------------------------------- | ------------------------- |
| v6.0.0.3 & below    | No                                 | N/A                       |
| v6.1.0.1 - v6.3.1.3 | Yes                                | openfinSystemApplications |
| v6.4.1.1 & above    | Yes                                | systemApps                |

### Example Desktop Owner Setting for OpenFinRVM v6.1.0.1 - v6.3.1.3

```json
{
  "desktopSettings": {
    "openfinSystemApplications": {
      "workspace": {
        "version": "13.1.5",
        "customConfig": {}
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
        "version": "13.1.5",
        "customConfig": {}
      }
    }
  }
}
```

---

### Read more about these settings in [Workspace documentation](https://developers.openfin.co/of-docs/docs/workspace-override-options)
