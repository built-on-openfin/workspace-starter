![HERE Core UI Example Application -- Adding your application the Content Discovery Service Via API](./HERE_Core_UI_Starter.png)

> **_:information_source: HERE Core UI:_** [HERE Core UI](https://resources.here.io/docs/core/hc-ui/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the HERE Core Container and HERE Core UI components is only granted pursuant to a license from HERE (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation key or to discuss a production license.

# Register With HERE Home

HERE Core UI empowers you to feed content & apps to HERE Home via our API. This gives you the choice of fetching your list of applications from a _Content Discovery Service_ or somewhere else.

This application you are about to install is a simple example of plugging in your own content or app. This example assumes you have already [set up your development environment](https://resources.here.io/docs/core/develop/)

## Running the Sample

To run this sample you can:

- Clone this repo and follow the instructions below. This will let you customize the sample to learn more about our APIs.
- Launch the Github hosted version of this sample to interact with it by going to the following link: [Github Workspace Starter Register With Home](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv23.0.0%2Fregister-with-home%2Fmanifest.fin.json)

## Getting Started

1. Install dependencies and do an initial build. Note that these examples assume you are in the sub-directory for the example.

```shell
npm run setup
```

2. Optional (if you wish to pin the version of HERE Core UI to version 23.0.0 and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://resources.here.io/docs/core/manage/desktops/dos/).
   This example runs a utility [dos.mjs](./scripts/dos.mjs) that adds the Windows registry key for you, pointing to a local desktop owner
   settings file so you can test these settings. If you already have a desktop owner settings file, this script prompts to overwrite the location. Be sure to capture the existing location so you can update the key when you are done using this example.

   (**WARNING**: This script kills all open HERE processes. **This is not something you should do in production to close apps as force killing processes could kill an application while it's trying to save state/perform an action**).

```shell
npm run dos
```

3. Start the test server in a new window.

```shell
npm run start
```

4. Start Your HERE Core UI Platform (this starts Workspace if it isn't already running).

```shell
npm run client
```

5. Type any character into the search box to show the default list of Applications.
   The [apps](./public/common/) apps\*.json files are displayed as described in their respective files (OpenFin Home is not reading this rest point directly it is being read by the HERE Core UI Platform app and passed to Home via our API).

6. Build the project if you have changed the code.

```shell
npm run build
```

![Register With Home](new-home.png)

### Note About The App

This is a headless application. If you wish to debug it then you can update the [manifest file](public/manifest.fin.json) and set platform.autoShow to **true**. Otherwise you can use Process Manager (which is included in your list of apps).

## How it works

The Server in this example provides two sets of content over HTTP GET.

- [A Desktop Owner Settings file to pin the version of HERE Core UI (Optional)](./public/common/dos.json)
- [A list of applications](./public/common/) apps\*.json
- Examples of View and Snapshot Manifest Types

### List of Applications

The [list of applications](../public/common/) apps\*.json contains a number of examples:

- Load views into HERE Browser
- Launch an HERE Application using it's manifest file
- Launch a native application
- Launch a page using the snapshot manifest type

These applications are read and transformed in order to be sent to our API.

### How this example works

You have your own [HERE Core UI Platform](public/manifest.fin.json) that is defined through a manifest. It is headless and it starts up a [custom platform provider](public/platform/provider.html). It is launched by the following command (step 5 above):

```shell
npm run client
```

The app entry point [provider.ts](client/src/provider.ts) initializes the platform and then once initialized bootstraps the app.

The bootstrapper has two main responsibilities:

1. Import [home.ts](client/src/home.ts) to register this HERE Core UI Platform against Home.
2. Listen for when the HERE Core UI Platform is closing so that it can deregister from Home.

The **home provider** ([home.ts](client/src/home.ts)) imports the following:

- [OpenFin's Workspace NPM Module](https://www.npmjs.com/package/@openfin/workspace) to have access to the relevant functions
- [OpenFin's HERE Core UI Platform NPM Module](https://www.npmjs.com/package/@openfin/workspace-platform) to have access to the right types
- [apps.ts](client/src/apps.ts) to fetch a list of applications (the home provider maps these into CLI Search Results)

The registration of a provider against home will look like the following:

```javascript
const homeProvider: HomeProvider = {
  title: settings.homeProvider.title,
  id: settings.homeProvider.id,
  icon: settings.homeProvider.icon,
  subHeader: homeSettings.subHeader,
  onUserInput: onUserInput,
  onResultDispatch: onSelection
};

await Home.register(homeProvider);
```

The [provider.ts](client/src/provider.ts) `getManifestCustomSettings` method reads the `customSettings` section of your [manifest file](public/manifest.fin.json):

```javascript
 "customSettings": {
        "appProvider": {
            "appSourceUrls": ["http://localhost:8080/apps.json"],
            "manifestTypes": ["view", "snapshot", "manifest", "external"]
        },
        "homeProvider": {
            "id":"register-with-home",
            "title":"Home Starter",
            "subHeader": {
              "title1": "Welcome to the",
              "title2": "HERE Home Starter",
              "subtitle": "Your gateway to HERE applications",
              "icon": "http://localhost:8080/favicon.ico"
            },
            "icon":"http://localhost:8080/favicon.ico",
            "queryMinLength": 3,
            "queryAgainst": ["title"]
        }
    }
```

| Property         | Description                                                                                                                                                                                                                                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **appProvider**  | Config related to where the apps should be fetched from                                                                                                                                                                                                                                                                                                              |
| appSourceUrls    | Where should we fetch the apps from                                                                                                                                                                                                                                                                                                                                  |
| manifestTypes    | ["view", "snapshot", "manifest", "external"] Which type of applications to include from the app sources                                                                                                                                                                                                                                                              |
| **homeProvider** | Config related to the home provider setup to list things in Home and the Browser Add New View                                                                                                                                                                                                                                                                        |
| id               | What your provider should be called                                                                                                                                                                                                                                                                                                                                  |
| title            | The title that should be shown in the Home UI to represent your provider                                                                                                                                                                                                                                                                                             |
| subHeader               | A custom and optional object to add branding and a welcome message to the Home component.  Please see the image above for referencing where the text and optional icon is placed.
| icon             | The icon to show in the Home UI (top right section as well as an icon to switch between providers when there is more than one registered)                                                                                                                                                                                                                            |
| queryMinLength   | How many characters should be typed before filtering the list?                                                                                                                                                                                                                                                                                                       |
| queryAgainst     | What do you wish to run the query against when inspecting your search results. An array of entries. If not specified it will default to ["title"]. Since this example stores the app definition inside of a cli search result's data field you can add data.tags to the array so that it will see if the query matches the start of a tag e.g. ["title","data.tags"] |

### Note About The Config

This is a demo application for learning and is not meant for production use. Please use this as a way of seeing how you might approach configuring your app.

---

These are settings you can experiment with (e.g. if you already have your own CDS for apps from a previous HERE Core UI release you can update the url and restart the HERE Core UI Platform to see it used. CORs needs to be enabled on your server).

The home provider will ask the [apps.ts](client/src/apps.ts) file for a list of applications and it will read the apps directory rest endpoint and return it. The home provider then maps the apps to an array of CLISearchResult objects. The home provider also demonstrates how you can provide filters so that a big result set can be easily filtered.

When a user selects a result in HERE Home, it is returned to the Home Provider and we use [launch.ts](client/src/launch.ts) to launch the result.

The [launch.ts](client/src/launch.ts) file imports [OpenFin's Workspace NPM Module](https://www.npmjs.com/package/@openfin/workspace) and [OpenFin's HERE Core UI Platform NPM Module](https://www.npmjs.com/package/@openfin/workspace-platform). It checks the passed app. If the passed app is a Native Application (manifestType: "external") that requires launch external process permissions then it is up to the **Platform Workspace** to support the permission. You can then pass the app to the launchApp function (which will execute under the context of the HERE Core UI Platform) or call fin.System.launchExternalProcess yourself (if you need custom logic).

The registration of a provider against home will look like the following:

```javascript
const homeProvider: HomeProvider = {
  title: settings.homeProvider.title,
  id: settings.homeProvider.id,
  icon: settings.homeProvider.icon,
  subHeader: homeSettings.subHeader,
  onUserInput: onUserInput,
  onResultDispatch: onSelection
};

await Home.register(homeProvider);
```

### Note About This Example

This is an example of how to use our APIs to configure HERE Core UI. It's purpose is to provide an example and provide suggestions. This is not a production application and shouldn't be treated as such. Please use this as a guide and provide feedback. Thanks!

---
