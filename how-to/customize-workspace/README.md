![OpenFin Workspace - Customize Workspace - Creating a custom workspace platform](../../assets/OpenFin-Workspace-Starter.png)

> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

# Customize Workspace

## Welcome to the Customize Workspace How To

This how to provides an example of a configurable workspace platform. Please use the table of contents to navigate the information related to this how-to and how to configure it.

### Live Launch

Launch pre-configured examples to get an idea of what a customized workspace platform can look like. You can launch both of them if you would like to see OpenFin Workspace's multi platform support.

| Example                                                                                                                                                                                                      | Description                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Customize Workspace Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv12.0.0%2Fcustomize-workspace%2Fmanifest.fin.json)               | This is an example of a customized workspace with a light/dark theme, no authentication and some configured options.                                                                 |
| [Second Customize Workspace Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv12.0.0%2Fcustomize-workspace%2Fsecond.manifest.fin.json) | This second instance includes the use of a demo authentication flow and has additional browser buttons configured. It also takes advantage of the built-in light/dark theme support. |
| [Third Customize Workspace Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv12.0.0%2Fcustomize-workspace%2Fthird.manifest.fin.json)   | This third instance has a light theme and is configured to use an fdc3 1.2 app directory that includes a few FDC3 helper tools to help get you up and running.                       |

### Concepts

The following section covers some key concepts that are good to know when looking at building a Workspace Platform.

| What Is...                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Container](./docs/what-is-container.md)                                       | The foundation of OpenFin Workspace. This provides a set of capabilities and APIs that you can use in your Workspace Platform.                                                                                                                                                                                                                                               |
| [Workspace](./docs/what-is-workspace.md)                                       | A collection of UI components built on top of Container available via NPM packages that you can can use in your Workspace Platform.                                                                                                                                                                                                                                          |
| [Workspace Platform](./docs/what-is-workspace-platform.md)                     | This is a configurable and opinionated Workspace Platform that you can use to quickly validate your use of Container and Workspace.                                                                                                                                                                                                                                          |
| [FDC3](./docs/what-is-fdc3.md)                                                 | FDC3 is a standard that OpenFin contributed to FinOS. It provides a set of well known types for contextual data sharing (e.g. contact, organization, instrument etc) and an approach for triggering workflows through intents.                                                                                                                                               |
| [Persona - A Platform Provider](./docs/what-is-a-platform-provider.md)         | A platform provider is the team that provides a Workspace Platform to be used internally and/or external so that end users can improve the way they discover and interact with content and workflows.                                                                                                                                                                        |
| [Persona - A Content Provider](./docs/what-is-a-content-provider.md)           | A content provider creates html, native or OpenFin applications that are listed, discovered and launched from a Workspace Platform. Html Content Providers can have their content reside in many hosts (a browser, within a Native Application, an OpenFin Container and/or an OpenFin Workspace Platform).                                                                  |
| [Persona - An Apps Provider](./docs/what-is-an-apps-provider.md)               | The applications provided by Content Providers can be sourced directly from a single source or it may come from multiple back-end sources (the Platform provider determines this). The list of applications are used by the Home, Store and Dock Workspace components and provide support for FDC3 Intent workflows.                                                         |
| [Persona - An Integration Provider](./docs/what-is-an-integration-provider.md) | An integration provider builds a JavaScript module that receives queries entered into the OpenFin Workspace Home component and returns a list of results. This can be querying data sources to help in the search for data or a contact as an example. It can also be used to provide short cut commands /x to help with Micro Interactions or launching specific workflows. |

The above helps provide information related to what is provided and what persona you may be (you can be more than one).

### Guides

The information below provides information related to configuring and using the Customize Workspace implementation. It can be launched as is in order to see it's functionality (see the Live Launch section) but the following information will help you customize and extend it.

| How To...                                                                                               | Description                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Setup Customize Workspace](./docs/how-to-setup-customize-workspace.md)                                 | Instructions on how to install the dependencies, build the repo and run Customize Workspace.                                                                                                      |
| [Define Apps](./docs/how-to-define-apps.md)                                                             | How to add a url, app or native app to your Platform Workspace.                                                                                                                                   |
| [Add Context Support To Your App](./docs/how-to-add-context-support-to-your-app.md)                     | If you have added one or more apps to your platform you may wish to have them share contextual data using FDC3.                                                                                   |
| [Add Intent Support To Your App](./docs/how-to-add-intent-support-to-your-app.md)                       | If you have added one or more apps to your platform you may want one to trigger a workflow in another using FDC3.                                                                                 |
| [Configure Your Platform's Intent Support](./docs/how-to-configure-fdc3-intents.md)                     | How to configure your platform's Intent support. What UI to present to the user if they have to make an application selection after an intent is raised.                                          |
| [Add FDC3 Open Support To Your App](./docs/how-to-add-open-support-to-your-app.md)                      | If you have added one or more apps to your platform you may wish to have them easily opened using fdc3.open with the option of passing context.                                                   |
| [Use Notifications](./docs/how-to-use-notifications.md)                                                 | Your platform or you app(s) may want to get the end user's attention and capture a response.                                                                                                      |
| [Customize The Bootstrapping Process](./docs/how-to-customize-the-bootstrapping-process.md)             | This section covers how you can manage what gets registered and what background behavior do you want to run (e.g. do you want to register all of the Workspace Components or just some of them?). |
| [Theme Your Platform](./docs/how-to-theme-your-platform.md)                                             | The workspace components support a dark theme out of the box. This section covers how to define the theme and logo for your platform and some tools that make that process easier.                |
| [Customize Home](./docs/how-to-customize-home.md)                                                       | This section covers how you can customize the Workspace Home Component through config.                                                                                                            |
| [Customize Browser](./docs/how-to-customize-browser.md)                                                 | This section covers how you can customize the Workspace Browser Component through config.                                                                                                         |
| [Customize Notification Center](./docs/how-to-customize-notification-center.md)                         | This section covers how you can customize the Workspace Notification Center Component through config.                                                                                             |
| [Customize Dock](./docs/how-to-customize-dock.md)                                                       | This section covers how you can customize the Workspace Dock Component through config.                                                                                                            |
| [Customize Store](./docs/how-to-customize-store.md)                                                     | This section covers how you can customize the Workspace Store Center Component through config.                                                                                                    |
| [Setup Authentication](./docs/how-to-authenticate.md)                                                   | How can you setup authentication for your platform.                                                                                                                                               |
| [Apply Entitlements](./docs/how-to-apply-entitlements.md)                                               | How can you return different settings based on the user that has logged in.                                                                                                                       |
| [Customize Workspace Management](./docs/how-to-customize-workspace-management.md)                       | Where do you want your workspaces to be saved? Do you want then to be discoverable from Home?                                                                                                     |
| [Customize Browser Page Management](./docs/how-to-customize-browser-page-management.md)                 | Where do you want your browser pages to be saved? Do you want then to be discoverable from Home?                                                                                                  |
| [Customize Workspace & Browser Page Sharing](./docs/how-to-customize-workspace-browser-page-sharing.md) | Do you wish to enable sharing a workspace (1 or more windows) or a page?                                                                                                                          |
| [Manage Connections To Your Platform](./docs/how-to-manage-connections-to-your-platform.md)             | Do you have applications that wish to connect to your platform and provide a list of apps and participate in Workspace snapshots?                                                                 |
| [Support Your Platform](./docs/how-to-support-your-platform.md)                                         | How would you support your platform? How would you configure logging and get access to the logs?                                                                                                  |
| [Configure Analytics](./docs/how-to-configure-analytics.md)                                             | How can you follow how someone is using your Workspace Platform and the OpenFin Workspace Components?                                                                                             |
| [Secure Your Platform](./docs/how-to-secure-your-platform.md)                                           | How would you secure your platform? What are some of the things you should consider when building your platform?                                                                                  |
| [Extend Your Platform](./docs/how-to-extend-your-platform.md)                                           | How would you extend your platform to support more use cases? E.g. Would you like to be able to have your platform launched with query strings to support additional behaviors?                   |
| [Deploy Your Platform](./docs/how-to-deploy-your-platform.md)                                           | How can you deploy your platform?                                                                                                                                                                 |
| [Manage Environments](./docs/how-to-manage-environments.md)                                             | How would you support local, dev, uat, staging, pre-prod and prod environments for your platform?                                                                                                 |

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace) on the OpenFin Website