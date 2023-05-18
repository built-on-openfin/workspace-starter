![OpenFin Workspace Example Application -- Adding your application to OpenFin Workspace (Home, Browser & Store)](../../assets/OpenFin-Workspace-Starter.png)

> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

# Workspace Native Window Integration

The goal of this sample is to demonstrate the use of:

- Custom workspace saving in home through /w name of workspace
- Launching a saved workspace from home by typing it's name and using the presented options
- Launching a native application and being able to save it's position
- Using a golden data source (in [apps.json](../common/public/apps.json)) to drive the apps that show up in Home (Only one native app for now).

The Native Integration Module provided by OpenFin can be found here:

[https://www.npmjs.com/package/@openfin/native-window-integration-client](https://www.npmjs.com/package/@openfin/native-window-integration-client) and the documentation related to it can be found here: [https://developers.openfin.co/of-docs/docs/native-windows-in-snapshots](https://developers.openfin.co/of-docs/docs/native-windows-in-snapshots)

This example assumes you have already [set up your development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment)

## Running the Sample

To run this sample you can:

- Clone this repo and follow the instructions below. This will let you customize the sample to learn more about our APIs.
- Launch the Github hosted version of this sample to interact with it by going to the following link: [Github Workspace Starter Workspace Native Window Integration](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv13.0.0%2Fworkspace-native-window-integration%2Fmanifest.fin.json)

---

## Getting Started

1. Install dependencies and do the initial build. Note that these examples assume you are in the sub-directory for the example.

```shell
npm run setup
```

2. Optional (if you wish to pin the version of OpenFin Workspace to version 13.0.0 and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/docs/desktop-owner-settings).
   This example runs a utility [desktop-owner-settings.bat](../common/desktop-owner-settings.bat) that adds the Windows registry key for you, pointing to a local desktop owner
   settings file so you can test these settings. If you already have a desktop owner settings file, this script prompts to overwrite the location. Be sure to capture the existing location so you can update the key when you are done using this example.

   (**WARNING**: This script kills all open OpenFin processes. **This is not something you should do in production to close apps as force killing processes could kill an application while it's trying to save state/perform an action**).

```shell
npm run dos
```

3. Start the test server in a new window.

```shell
npm run start
```

4. Start Your Workspace Platform (this starts Workspace if it isn't already running).

```shell
npm run client
```

5. Type any character into the search box to show the default list of Applications.
   You can now use the custom commands e.g. `/price MSFT.

6. If you modify the project and wish to rebuild you can run setup again or the build command below:

```shell
npm run build
```

## How it works

The Server in this example provides two sets of content over HTTP GET.

- [A Desktop Owner Settings file](../common/public/dos.json)
- [A list of applications](../common/public/apps.json)
- A native winform application

### List of Applications

The [list of applications](../common/public/apps.json) contains:

- A native winform application is the only application in this example as the focus is on launching and saving this application as part of a workspace.

The entries are read and transformed in order to be sent to our API.

### NPM Packages Included

- @openfin/native-window-integration-client
- file-loader
- @openfin/workspace
- @openfin/workspace-platform

### Addition to the Webpack Module Rules

```shell
        {
          test: /\.(zip)/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
          }
        }
```

### Note About The App

This is a headless application. If you wish to debug it then you can update the [manifest file](public/manifest.fin.json) and set platform.autoShow to **true**.

### How this example works

You have your own [Workspace Platform](public/manifest.fin.json) that is defined through a manifest. It is headless and it starts up a [custom platform provider](../common/public/platform/provider.html). It is launched by the following command (step 5 above):

```shell
npm run client
```

The [provider.ts](client/src/provider.ts) initializes the workspace platform by using the init function from [@openfin/workspace-platform](https://www.npmjs.com/package/@openfin/workspace-platform). This function lets us the overrideCallback for our platform (where we can provide an implementation for getSnapshot and applySnapshot and this is where we tie in our native window support. [native-window-integration.ts](client/src/native-window-integration.ts) exports the needed decorateSnapshot and applyDecoratedSnapshot functions so that the native application is captured as part of the snapshot.

You can save a workspace using the global menu in the OpenFin browser window, this will invoke the override which allow us to augment the snapshot data with the native window information. This means that when a workspace is reopened with native window included they should also reappear as part of your layout.

The saved workspaces will appear in home search results.

![Workspace Native Window Integration](./workspace-native-window-integration.gif)

### Note About This Example

This is an example of how to use our APIs to configure OpenFin Workspace. It's purpose is to provide an example and provide suggestions. This is not a production application and shouldn't be treated as such. Please use this as a guide and provide feedback. Thanks!

---

## FAQ

- Why do you only have two applications?

  - The goal was to keep it simple so we include the winform app used in the other starters, plus a simple information web view.

- How do I save a workspace?

  - Open the web view and use the global menu in the OpenFin Browser.

---

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace)
