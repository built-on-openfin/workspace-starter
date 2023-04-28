![OpenFin Workspace Example Application -- Adding your application to OpenFin Workspace (Home, Browser & Store)](../../assets/OpenFin-Workspace-Starter.png)

> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

# Register With Store

OpenFin Workspace empowers you to take advantage of our store component by using our Storefront API to register your own store and populate it with your custom content. This example additionally lets you populate the Home UI using the same data source. This gives you the choice of fetching your list of applications from a _Content Discovery Service_ or somewhere else.

This application you are about to install is an example of plugging in your own content or app via code and using configuration and rest services to determine the data to show and how it should be structured. This example assumes you have already [set up your development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment)

This application also shows you how to use the new @openfin/workspace-platform npm module to use OpenFin Browser under your own application and to control how pages are displayed and launched within the Home UI.

## Running the Sample

To run this sample you can:

- Clone this repo and follow the instructions below. This will let you customize the sample to learn more about our APIs.
- Launch the Github hosted version of this sample to interact with it by going to the following link: [Github Workspace Starter Register With Store](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fvnext%2Fregister-with-store%2Fmanifest.fin.json)

## Getting Started

1. Install dependencies and do the initial build. Note that these examples assume you are in the sub-directory for the example.

```shell
npm run setup
```

2. Optional (if you wish to pin the version of OpenFin Workspace to version next and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/docs/desktop-owner-settings).
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

5. If you modify the project and wish to rebuild you can run setup again or the build command below:

```shell
npm run build
```

6. Storefront will be shown and your store will be listed.
   The [apps](../common/public/apps.json) are displayed as described in their respective files alongside a Storefront configuration setting defined in your [manifest](public/manifest.fin.json).

![Register with Storefront](openfin-register-with-store-storefront.gif)

## How it works

The Server in this example provides two sets of content over HTTP GET.

- [A Desktop Owner Settings file](../common/public/dos.json)
- [A list of applications](../common/public/apps.json)
- Examples of View and Snapshot Manifest Types

### List of Applications

The [list of applications](../common/public/apps.json) contains a number of examples:

- Load views into OpenFin Browser
- Launch an OpenFin application using its manifest file
- Launch a native application
- Launch a page using the snapshot manifest type

These applications are read and transformed in order to be sent to our API.

### Note About The App

This is a headless application. If you wish to debug it then you can update the [manifest file](public/manifest.fin.json) and set platform.autoShow to **true**. Otherwise you can use Process Manager (which is included in your list of apps).

### How this example works

You have your own [Workspace Platform](public/manifest.fin.json) that is defined through a manifest. It is headless and it starts up a [custom platform provider](public/platform/provider.html). It is launched by the following command (step 5 above):

```shell
npm run client
```

The custom platform provider [provider.ts](client/src/provider.ts) imports the [platform.ts](client/src/platform.ts) and initializes the platform.

The [platform.ts](client/src/platform.ts) initializes the workspace platform by using the init function from [@openfin/workspace-platform](https://www.npmjs.com/package/@openfin/workspace-platform). This function lets us specify default window options for OpenFin Browser based windows. This lets us specify the icons, title and theme for the Browser Windows.

Once initialized the bootstrapper (that was also imported) is called [bootstrapper](client/src/bootstrapper.ts).

The bootstrapper has two main responsibilities:

1. Import [store.ts](client/src/store.ts) and ensure that a store provider is registered if store is enabled.
2. Listen for when your workspace platform is about to close and deregister from store.

The **store provider**([store.ts](client/src/store.ts)) imports the following:

- [OpenFin's Workspace NPM Module](https://www.npmjs.com/package/@openfin/workspace) to have access to the relevant functions
- [apps.ts](client/src/apps.ts) to fetch a list of applications when searching and to provide a filtered set of applications for specific store sections

The registration of a provider against store will look like the following:

```javascript
const storeProvider = {
  id: settings.storefrontProvider.id,
  title: settings.storefrontProvider.title,
  icon: settings.storefrontProvider.icon,
  getNavigation: async () => getNavigation(),
  getLandingPage: async () => getLandingPage(),
  getFooter: async () => getFooter(),
  getApps,
  launchApp: launch
};

await Storefront.register(storeProvider);
```

The [platform.ts](client/src/platform.ts) file reads the customSettings section of your [manifest file](public/manifest.fin.json):

```javascript
"customSettings": {
  "appProvider": {
    "appSourceUrls": ["http://localhost:8080/common/apps.json"],
    "manifestTypes": ["view", "snapshot", "manifest", "external"],
    "cacheDurationInMinutes": 1
  },
  "storefrontProvider": {
    "id": "register-with-store",
    "title": "Custom Storefront",
    "icon": "http://localhost:8080/favicon.ico",
    "landingPage": {
      "hero": {
        "title": "Custom Hero Title",
        "description": "This is a demonstration of the hero section that you can configure for your store.",
        "cta": {
          "title": "Hero Apps!",
          "tags": ["hero"]
        },
        "image": {
          "src": "http://localhost:8080/common/images/superhero-unsplash.jpg"
        }
      },
      "topRow": {
        "title": "Custom Top Row Content",
        "items": [
          {
            "title": "Expero",
            "description": "A collection of example views from Expero showing the power of interop and context sharing.",
            "image": {
              "src": "http://localhost:8080/common/images/coding-1-unsplash.jpg"
            },
            "tags": ["expero"]
          },
          {
            "title": "Dev Tools",
            "description": "A collection of developer tools that can aid with building and debugging OpenFin applications.",
            "image": {
              "src": "http://localhost:8080/common/images/coding-2-unsplash.jpg"
            },
            "tags": ["tools"]
          },
          {
            "title": "Learning Resource",
            "description": "A collection of developer documents that can aid with building and debugging OpenFin applications.",
            "image": {
              "src": "http://localhost:8080/common/images/coding-3-unsplash.jpg"
            },
            "tags": ["page"]
          }
        ]
      },
      "middleRow": {
        "title": "A collection of simple views that show how to share context using the FDC3 or Interop APIs.",
        "tags": ["fdc3","interop"]
      },
      "bottomRow": {
        "title": "Quick Access",
        "items": [
          {
            "title": "Views",
            "description": "A collection of views made available through our catalog.",
            "image": {
              "src": "http://localhost:8080/common/images/coding-4-unsplash.jpg"
            },
            "tags": ["view"]
          },
          {
            "title": "Web Apps",
            "description": "A collection of web apps built using OpenFin.",
            "image": {
              "src": "http://localhost:8080/common/images/coding-5-unsplash.jpg"
            },
            "tags": ["manifest"]
          },
          {
            "title": "Native Apps",
            "description": "A collection of native apps made available through our catalog.",
            "image": {
              "src": "http://localhost:8080/common/images/coding-6-unsplash.jpg"
            },
            "tags": ["native"]
          }
        ]
      }
    },
    "navigation": [
      {
        "title": "Applications",
        "items": [
          {
            "title": "All Apps",
            "tags": ["view","page","manifest","native"]
          },
          { "title": "Views", "tags": ["view"] },
          { "title": "Pages", "tags": ["page"] },
          {
            "title": "Manifest",
            "tags": ["manifest"]
          },
          {
            "title": "Native",
            "tags": ["native"]
          }
        ]
      },
      {
        "title": "Context Sharing",
        "items": [
          {
            "title": "FDC3 API",
            "tags": ["fdc3"]
          },
          {
            "title": "Interop API",
            "tags": ["interop"]
          }
        ]
      }
    ],
    "footer": {
      "logo": { "src": "http://localhost:8080/favicon.ico", "size": "32" },
      "text": "Welcome to the OpenFin Sample Footer",
      "links": [
        {
          "title": "Github",
          "url": "https://github.com/built-on-openfin/workspace-starter"
        },
        {
          "title": "YouTube",
          "url": "https://www.youtube.com/user/OpenFinTech"
        }
      ]
    }
  }
}
```

| Property               | Description                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **appProvider**        | Config related to where the apps should be fetched from                                                                                                                  |
| appSourceUrls          | Where should we fetch the apps from                                                                                                                                      |
| manifestTypes          | ["view", "snapshot", "manifest", "external"]                                                                                                                             |
| cacheDurationInMinutes | How many minutes should we wait before refreshing the list from the server?                                                                                              |
| **storefrontProvider** | Config settings that are used by the sample code to configure the store using the workspace APIs                                                                         |
| id                     | Unique ID for your store                                                                                                                                                 |
| title                  | The name for your store that will be shown in the store selection dropdown                                                                                               |
| icon                   | The icon to show in the store selection dropdown                                                                                                                         |
| landingPage            | The structure of the main page the user will be presented with when they visit your store                                                                                |
| landingPage.hero       | Optional. Do you want a hero section on the main page.                                                                                                                   |
| landingPage.topRow     | What do you want this row to be called and how many sections do you want (use tags to determine what apps are included in this section). Limit of 4 sections.            |
| landingPage.middleRow  | What do you want this row to be called and what apps do you want to show in the middle (use tags to determine what apps are included in this row). Limit of 6 apps.      |
| landingPage.bottomRow  | What do you want this row to be called and how many sections do you want (use tags to determine what apps are included in this section). There is a limit of 3 sections. |
| navigation             | How many navigation sections do you want on the left hand menu? Limit of 2.                                                                                              |
| navigation[i].title    | What do you want as a title for these set of links?                                                                                                                      |
| navigation[i].items    | How many links do you want to show (limit of 5) and what apps do you want a link to display (use tags to select apps)                                                    |
| footer                 | What do you want to show in the store footer                                                                                                                             |
| footer.logo            | The logo to show in the footer                                                                                                                                           |
| footer.text            | The text to show in the footer                                                                                                                                           |
| footer.links           | What links do you want to show in the footer (opens up using the default web browser.                                                                                    |

### Note About The Manifest

This is a demo application for learning and is not meant for production use. Please use this as a way of seeing how you might approach configuring your store.

The manifest for the storefront does not include an `id` for the `cta`, `items` and `navigation` sections.

This is to reduce noise in the example manifest and to prevent issues if an item or section is copied and pasted. The code has a fallback that uses the title or title plus tags to form an `id`. This works for the demo, as the manifest file is storing the configuration. If the configuration were ever fetched from a server, then it should return a unique (e.g., GUID) and idempotent ID.

This is because the `id` represents the route that the user navigates to. So, if an `id` for a navigation item was "x" and the user clicked on the link, then the store would call the `getNavigation()` or `getLandingPage()` function you defined and look for a matching `id` of "x". If you regenerate the `id` for a navigation item, e.g., it becomes "y", then the store would not be able to render your page, as there are no items with the `id` of "x".

---

These are settings you can experiment with (e.g., if you already have your own CDS for apps, you can update the URL and restart the Workspace Platform. Your server will need to support CORS).

The search provider checks the [apps.ts](client/src/apps.ts) file for a list of applications and then it reads the apps directory REST endpoint and returns it. The search provider then maps the apps to an array of SearchResult objects. The apps file checks to see if it has permission to launch external processes or download app assets and filter out entries as appropriate. It logs a warning of the apps filtered out and in a real app you could move this logic to the launch action to then notify the user they can't launch that app on this machine.

When a user selects a result in OpenFin Home, it is returned to the search provider and the search provider uses [app.ts](client/src/app.ts) to launch the result.

The [app.ts](client/src/app.ts) file imports [OpenFin's Workspace NPM Module](https://www.npmjs.com/package/@openfin/workspace) and [OpenFin's Workspace Platform NPM Module](https://www.npmjs.com/package/@openfin/workspace-platform). It checks the passed app. If the passed app is a Native Application (manifestType: "external") that requires launch external process permissions then it is up to the **Platform Workspace** to support the permission. They can pass the app to launchApp or call fin.System.launchExternalProcess if they want custom logic. If you don't have the launchExternalProcess permission apps.ts filters unsuitable apps out. For any other type of app/manifestType then the entry is passed to the launchApp function provided by the OpenFin workspace platform module.

The [store.ts](client/src/store.ts) file is driven by the config in the manifest file and takes advantage of the building blocks provided in [OpenFin's Workspace NPM Module](https://www.npmjs.com/package/@openfin/workspace) to build the OpenFin Store. It uses [apps.ts](client/src/apps.ts) to use the same source data as the home provider. This way adding a single entry in the [apps.json](../common/public/apps.json) file (simulating your server) will populate both.

### Note About This Example

This is an example of how to use our APIs to configure OpenFin Workspace. It's purpose is to provide an example and provide suggestions. This is not a production application and shouldn't be treated as such. Please use this as a guide and provide feedback. Thanks!

## FAQ

- The store isn't launching or the store command isn't showing on the home ui?

  - It might be that the config defining the store is invalid. Open up the dev tools for the headless app and check the console log messages.
  - Ensure that the bootstrap section in the customSettings of the manifest has store set to true.

- I am not seeing what I expected?

  - To ensure you are running the right version of this example run the npm run dos command and npm run kill command before running the workspace platform using npm run client (you only need to run the dos command once and it will lock the workspace version for this sample)

- Things have moved/gone?

  - Please check the upgrade guide which covers what has changed between releases: [Migrate from a previous version guide](../migrate-from-a-previous-version)

---

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace)
