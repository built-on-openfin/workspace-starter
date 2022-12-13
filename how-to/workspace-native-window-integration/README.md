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
- Launch the Github hosted version of this sample to interact with it by going to the following link: [Github Workspace Starter Workspace Native Window Integration](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv10.0.0%2Fworkspace-native-window-integration%2Fmanifest.fin.json)

---

## Getting Started

1. Install dependencies and do the initial build. Note that these examples assume you are in the sub-directory for the example.

```shell
npm run setup
```

2. Optional (if you wish to pin the version of OpenFin Workspace to version 10.0.0 and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/docs/desktop-owner-settings).
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

The custom platform provider [provider.ts](client/src/provider.ts) imports the [platform.ts](client/src/platform.ts) and initializes the platform.

The [platform.ts](client/src/platform.ts) initializes the workspace platform by using the init function from [@openfin/workspace-platform](https://www.npmjs.com/package/@openfin/workspace-platform). This function lets us the overrideCallback for our platform (where we can provide an implementation for getSnapshot and applySnapshot and this is where we tie in our native window support [browser.ts](client/src/browser.ts). [native-window-integration.ts](client/src/native-window-integration.ts) exports the needed decorateSnapshot and applyDecoratedSnapshot functions so that the native application is captured as part of the snapshot.

Once initialized the bootstrapper (that was also imported) is called [bootstrapper](client/src/bootstrapper.ts).

The bootstrapper has the following responsibilities:

1. Import [home.ts](client/src/home.ts) and ensure that a home provider is registered against home in order to provide a list of applications (if enabled).
2. Show Home after registration.
3. Listen for when your workspace platform is about to close and deregister from home.

The **home provider**([home.ts](client/src/home.ts)) imports the following:

- [OpenFin's Workspace NPM Module](https://www.npmjs.com/package/@openfin/workspace) to have access to the relevant functions
- [OpenFin's Workspace Platform NPM Module](https://www.npmjs.com/package/@openfin/workspace-platform) to have access to the right types
- [settings.ts](client/src/settings.ts) to read settings (such as the id, title of the provider and where it should get the list of apps from)
- [apps.ts](client/src/apps.ts) to fetch a list of applications (the home provider maps these into CLI Search Results)
- [workspace.ts](client/src/workspace.ts) to fetch saved workspaces and display them in the Home UI and launch/delete them when the action is executed.
- [template.ts](client/src/template.ts) Workspace 6 supports custom templates for search results. This file exports a template for custom saved workspaces.
- [launch.ts](client/src/launch.ts) to launch the entry the user selects from OpenFin Home

The registration of a provider against home will look like the following:

```javascript
const cliProvider: CLIProvider = {
  title: settings.homeProvider.title,
  id: settings.homeProvider.id,
  icon: settings.homeProvider.icon,
  onUserInput: onUserInput,
  onResultDispatch: onSelection
};

await Home.register(cliProvider);
```

The [settings.ts](client/src/settings.ts) file reads the customSettings section of your [manifest file](public/manifest.fin.json):

```javascript
"customSettings": {
    "platformProvider": {
      "rootUrl": "http://localhost:8080"
    },
    "appProvider": {
      "appsSourceUrl": "http://localhost:8080/apps.json",
      "includeCredentialOnSourceRequest": "include",
      "cacheDurationInMinutes": 1,
      "appAssetTag": "appasset"
    },
    "homeProvider": {
      "id": "workspace-native-window-integration",
      "title": "Home Starter",
      "icon": "http://localhost:8080/favicon.ico",
      "queryMinLength": 3,
      "queryAgainst":["title"]
    }
  }
```

| Property                         | Description                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **appProvider**                  | Config related to where the apps should be fetched from                                                                                                                                                                                                                                                                                                              |
| appsSourceUrl                    | Where should we fetch the apps from                                                                                                                                                                                                                                                                                                                                  |
| includeCredentialOnSourceRequest | Should we include credentials when doing the search request. Options: "omit", "same-origin", "include"                                                                                                                                                                                                                                                               |
| cacheDurationInMinutes           | How many minutes should we wait before refreshing the list from the server?                                                                                                                                                                                                                                                                                          |
| appAssetTag                      | If including app assets in your manifest, what tag in the app definition will highlight this manifestType:"external" is actually an app asset and shouldn't be run from a path? If undefined then appasset is assumed                                                                                                                                                |
| **homeProvider**                 | Config related to the home provider setup to list things in Home                                                                                                                                                                                                                                                                                                     |
| id                               | What your provider should be called                                                                                                                                                                                                                                                                                                                                  |
| title                            | The title that should be shown in the Home UI to represent your provider                                                                                                                                                                                                                                                                                             |
| icon                             | The icon to show in the Home UI (top right section as well as an icon to switch between providers when there is more than one registered)                                                                                                                                                                                                                            |
| queryMinLength                   | How many characters should be typed before filtering the list?                                                                                                                                                                                                                                                                                                       |
| queryAgainst                     | What do you wish to run the query against when inspecting your search results. An array of entries. If not specified it will default to ["title"]. Since this example stores the app definition inside of a cli search result's data field you can add data.tags to the array so that it will see if the query matches the start of a tag e.g. ["title","data.tags"] |

### Note About The Manifest

> This is a demo application for learning and is not meant for production use. Please use this as a way of seeing how you might approach configuring your store.

These are settings you can experiment with (e.g., if you already have your own CDS for apps, you can update the URL and restart the Workspace Platform. Your server will need to support CORS).

The home provider checks the [apps.ts](client/src/apps.ts) file for a list of applications and then it reads the apps directory REST endpoint and returns it. The home provider then maps the apps to an array of SearchResult objects. The apps file checks to see if it has permission to launch external processes or download app assets and filter out entries as appropriate. It logs a warning of the apps filtered out and in a real app you could move this logic to the launch action to then notify the user they can't launch that app on this machine.

When a user selects a result in OpenFin Home, it is returned to the home provider and the home provider uses [launch.ts](client/src/launch.ts) to launch the result.

The [launch.ts](client/src/launch.ts) file imports [OpenFin's Workspace NPM Module](https://www.npmjs.com/package/@openfin/workspace) and [OpenFin's Workspace Platform NPM Module](https://www.npmjs.com/package/@openfin/workspace-platform). It checks the passed app. If the passed app is a Native Application (manifestType: "external") that requires launch external process permissions then it is up to the **Platform Workspace** to support the permission (like this example does).

### Note About This Example

This is an example of how to use our APIs to configure OpenFin Workspace. It's purpose is to provide an example and provide suggestions. This is not a production application and shouldn't be treated as such. Please use this as a guide and provide feedback. Thanks!

---

## FAQ

- Why do you only have one application?

  - The goal was to keep it simple so we include the winform app used in the other starters.

- How do I save a workspace?

  - Type Win or hit enter and you will see the winform app. Launch it and move it somewhere.
  - Bring up home and type /w mynativewks and hit enter
  - You should see the workspace has been saved. Clear the text and type mynative and you should see your workspace entry.

---

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace)
