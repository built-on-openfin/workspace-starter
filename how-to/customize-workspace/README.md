![OpenFin Workspace Example Application -- Adding your application to OpenFin Workspace (Home, Browser & Store)](../../assets/OpenFin-Workspace-Starter.png)

> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

# Customize Workspace

This sample is an extension of the support context and intents example. The sample covers:

- Registering with Home - with examples of using custom templates with search results.
- Registering a Store
- Customizing OpenFin Browser - Custom main menu, page right click context menu and view right click context menu. This example also shows how to determine what buttons should show in the top right of the menu header and adds a few custom buttons to demonstrate this.
- Supporting Interop/FDC3 Context messages
- Supporting Interop/FDC3 Intents
- Using a golden data source (in [apps.json](../common/public/apps.json)) to drive the apps that show up in Home, Store and in intent resolution
- Customization through config (in the [manifest.fin.json](public/manifest.fin.json) file)
- Workspace saving has been added
- An example of implementing your own sharing function has also been added.
- An example of supporting additional search providers (we include optional support from the integrate-with-salesforce starter project).
- An example of swapping out where workspaces and pages are stored (First Starter uses the default storage and Second Starter enables custom storage).
- An example of having client side authentication. We dynamically load an auth module (which you can swap out with your own) that has a basic implementation so that you can try different states and change how the platform should respond.

This example assumes you have already [set up your development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment)

## Running the Sample

To run this sample you can:

- Clone this repo and follow the instructions below. This will let you customize the sample to learn more about our APIs.
- Launch the Github hosted version of this sample to interact with it by going to the following link: [Github Workspace Starter Customize Workspace Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv9.0.0%2Fcustomize-workspace%2Fmanifest.fin.json)

- Launch the Second Github hosted version of this sample to see how OpenFin Workspace can support multiple workspace platforms with their own branding. This manifest takes advantage of Desktop System Preferences for Light or Dark mode by providing themes that can match that preference (it is picked up and applied on load): [Github Workspace Starter Second Customize Workspace Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv9.0.0%2Fcustomize-workspace%2Fsecond.manifest.fin.json)

## Getting Started

1. Install dependencies and build the sample. Note that these examples assume you are in the sub-directory for the example.

```shell
npm run setup
```

2. Optional (if you wish to pin the version of OpenFin Workspace to version 9.0.0 and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/docs/desktop-owner-settings). This example runs a utility [desktop-owner-settings.bat](../common/desktop-owner-settings.bat) that adds the Windows registry key for you, pointing to a local desktop owner settings file so you can test these settings. If you already have a desktop owner settings file, this script prompts to overwrite the location. Be sure to capture the existing location so you can update the key when you are done using this example.

   (**WARNING**: This script kills all open OpenFin processes. **This is not something you should do in production to close apps as force killing processes could kill an application while it's trying to save state/perform an action**).

```shell
npm run dos
```

3. Start the test server in a new window.

```shell
npm start
```

5. Start Your Workspace Platform (this starts Workspace if it isn't already running).

```shell
npm run client
```

If you want to see a second workspace platform run alongside the first you can fire up a copy using the following command:

```shell
npm run secondclient
```

This runs the same code with slightly different settings to show a different theme: [second.manifest.fin.json](public/second.manifest.fin.json)

6. Type any character into the search box to show the default list of applications.
   The [apps](../common/public/apps.json) are displayed as described in their respective files. (OpenFin Home does not read this REST endpoint directly. It is read by the Workspace Platform app and passed to Home via our API).

7. To launch your store launch the Home UI and use / to show a list of the available commands and select Store. Storefront will be shown and your store will be listed.
   The [apps](../common/public/apps.json) are displayed as described in their respective files alongside a Storefront configuration setting defined in your [manifest](public/manifest.fin.json).

8. If you modify the project and want to rebuild.

```shell
npm run build
```

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
- Launch through an intent: a view (single instance and multi instance) and a page (single instance and multi instance)

These applications are read and transformed in order to be sent to our API.

### Intent Support Information

This Readme contains information similar to the Support Context and Intents readme (as this is an extension). To make the addition of Intent support clearer it has been moved to it's own markdown file: [**IntentSupport.md**](IntentSupport.md).

### Note About The App

This is a headless application. If you wish to debug it then you can update the [manifest file](public/manifest.fin.json) and set platform.autoShow to **true**. Otherwise you can use Process Manager (which is included in your list of apps).

### How this example works

You have your own [Workspace Platform](public/manifest.fin.json) that is defined through a manifest. It is headless and it starts up a [custom platform provider](public/platform/provider.html). It is launched by the following command (step 5 above):

```shell
npm run client
```

The custom platform provider [provider.ts](client/src/provider.ts) imports the [platform.ts](client/src/platform.ts) and initializes the platform.

The [platform.ts](client/src/platform.ts) initializes the workspace platform by using the init function from [@openfin/workspace-platform](https://www.npmjs.com/package/@openfin/workspace-platform). This function lets us specify default window options for OpenFin Browser based windows. This lets us specify the icons, title and theme for the Browser Windows. It also defines how the interop broker should work using [interopbroker.ts](client/src/interopbroker.ts).

Once initialized the bootstrapper (that was also imported) is called [bootstrapper](client/src/bootstrapper.ts).

The bootstrapper has the following responsibilities:

1. Import [settings.ts](client/src/settings.ts) to see what should be bootstrapped. (That is, should it setup Store and Home?)
2. Import [home.ts](client/src/home.ts) and ensure that a home provider is registered against home in order to provide a list of applications (if enabled).
3. Import [store.ts](client/src/store.ts) and ensure that a store provider is registered if store is enabled.
4. Import [notifications.ts](client/src/notifications.ts) and ensure that you have registered your platform against notification center if enabled.
5. Import [share.ts](client/src/share.ts) to enable custom share support.
6. Listen for when your workspace platform is about to close and deregister from home, store and notification center.

The **home provider**([home.ts](client/src/home.ts)) imports the following:

- [OpenFin's Workspace NPM Module](https://www.npmjs.com/package/@openfin/workspace) to have access to the relevant functions
- [OpenFin's Workspace Platform NPM Module](https://www.npmjs.com/package/@openfin/workspace-platform) to have access to the right types
- [settings.ts](client/src/settings.ts) to read settings (such as the id, title of the provider and where it should get the list of apps from)
- [apps.ts](client/src/apps.ts) to fetch a list of applications (the home provider maps these into CLI Search Results)
- [browser.ts](client/src/browser.ts) to fetch saved pages and display them in the Home UI and launch/delete them when the action is executed.
- [workspace.ts](client/src/workspace.ts) to fetch saved workspaces and display them in the Home UI and launch/delete them when the action is executed.
- [template.ts](client/src/template.ts) Workspace 6 supports custom templates for search results. This file exports a template for custom saved workspaces and pages.
- [share.ts](client/src/share.ts) The custom template supports custom buttons and we have a share button when it comes to saved pages and workspaces.
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

The **store provider**([store.ts](client/src/store.ts)) imports the following:

- [OpenFin's Workspace NPM Module](https://www.npmjs.com/package/@openfin/workspace) to have access to the relevant functions
- [settings.ts](client/src/settings.ts) to read settings (such as the how to configure the store)
- [apps.ts](client/src/apps.ts) to fetch a list of applications when searching and to provide a filtered set of applications for specific store sections
- [launch.ts](client/src/launch.ts) to launch the entry the user selects from OpenFin Store

The registration of a provider against store will look like the following:

```javascript
const storeProvider = {
  id: settings.storefrontProvider.id,
  title: settings.storefrontProvider.title,
  icon: settings.storefrontProvider.icon,
  getNavigation: getNavigation.bind(this),
  getLandingPage: getLandingPage.bind(this),
  getFooter: getFooter.bind(this),
  getApps,
  launchApp: launch
};

await Storefront.register(storeProvider);
```

The [settings.ts](client/src/settings.ts) file reads the customSettings section of your [manifest file](public/manifest.fin.json):

```javascript
"customSettings": {
    "bootstrap": {
        "home": true,
        "store": true,
        "notifications": true,
        "dock": true,
        "autoShow": ["home"]
    },
    "platformProvider": {
        "rootUrl": "http://localhost:8080",
        "useCustomStorage": false,
        "intentPicker": {
            "url": "http://localhost:8080/common/windows/intents/picker.html",
            "height": 400,
            "width": 400
        }
    },
    "appProvider": {
        "appsSourceUrl": "http://localhost:8080/common/apps.json",
        "includeCredentialOnSourceRequest": "include",
        "cacheDurationInMinutes": 1,
        "appAssetTag": "appasset",
        "manifestTypes": [
            "view",
            "snapshot",
            "manifest",
            "external",
            "inline-view"
        ]
    },
    "endpointProvider": {
        "endpoints": [
            {
                "id": "share-get",
                "type": "fetch",
                "options": {
                    "method": "GET",
                    "url": "https://targeturl"
                }
            },
            {
                "id": "share-save",
                "type": "fetch",
                "options": {
                    "method": "POST",
                    "url": "https://targeturl"
                }
            }
        ]
    },
    "browserProvider": {
        "windowOptions": {
            "title": "Browser Starter",
            "icon": "http://localhost:8080/favicon.ico",
            "newTabUrl": null,
            "newPageUrl": null
        },
        "toolbarButtons": [
            {
                "include": false,
                "button": {
                    "type": "Custom",
                    "tooltip": "Change Opacity",
                    "disabled": false,
                    "iconUrl": "http://localhost:8080/favicon.ico",
                    "action": {
                        "id": "change-opacity",
                        "customData": {
                            "sourceId": "change-opacity",
                            "replacementId": "restore-opacity"
                        }
                    }
                }
            },
            {
                "include": false,
                "button": {
                    "type": "Custom",
                    "tooltip": "Restore Opacity",
                    "disabled": false,
                    "iconUrl": "http://localhost:8080/favicon.ico",
                    "action": {
                        "id": "restore-opacity",
                        "customData": {
                            "sourceId": "restore-opacity",
                            "replacementId": "change-opacity"
                        }
                    }
                }
            },
            {
                "include": true,
                "button": {
                    "type": "Custom",
                    "tooltip": "Pin this window",
                    "disabled": false,
                    "iconUrl": "http://localhost:8080/common/icons/pin.svg",
                    "action": {
                        "id": "pin-window",
                        "customData": {
                            "sourceId": "pin-window",
                            "replacementId": "unpin-window"
                        }
                    }
                }
            },
            {
                "include": false,
                "button": {
                    "type": "Custom",
                    "tooltip": "Unpin this window",
                    "disabled": false,
                    "iconUrl": "http://localhost:8080/common/icons/pin-vertical.svg",
                    "action": {
                        "id": "unpin-window",
                        "customData": {
                            "sourceId": "unpin-window",
                            "replacementId": "pin-window"
                        }
                    }
                }
            },
            {
                "include": true,
                "button": {
                    "type": "ShowHideTabs"
                }
            },
            {
                "include": true,
                "button": {
                    "type": "ColorLinking"
                }
            },
            {
                "include": true,
                "button": {
                    "type": "PresetLayouts"
                }
            },
            {
                "include": true,
                "button": {
                    "type": "Custom",
                    "tooltip": "Share",
                    "disabled": false,
                    "iconUrl": "http://localhost:8080/common/icons/share.svg",
                    "action": {
                        "id": "share",
                        "customData": {}
                    }
                }
            },
            {
                "include": true,
                "button": {
                    "type": "SavePage"
                }
            }
        ]
    },
    "themeProvider": {
        "themes": [
            {
                "label": "Starter Theme",
                "logoUrl": "http://localhost:8080/favicon.ico",
                "palette": {
                    "brandPrimary": "#504CFF",
                    "brandSecondary": "#383A40",
                    "backgroundPrimary": "#111214",
                    "functional1": null,
                    "functional2": null,
                    "functional3": null,
                    "functional4": null,
                    "functional5": null,
                    "functional6": null,
                    "functional7": null,
                    "functional8": null,
                    "functional9": null,
                    "functional10": null,
                    "statusSuccess": null,
                    "statusWarning": null,
                    "statusCritical": null,
                    "statusActive": null,
                    "inputBackground": null,
                    "inputColor": null,
                    "inputPlaceholder": null,
                    "inputDisabled": null,
                    "inputFocused": null,
                    "textDefault": null,
                    "textHelp": null,
                    "textInactive": null,
                    "background1": null,
                    "background2": null,
                    "background3": null,
                    "background4": null,
                    "background5": null,
                    "background6": null
                }
            }
        ]
    },
    "homeProvider": {
        "id": "register-with-store-home",
        "title": "Home Starter",
        "icon": "http://localhost:8080/favicon.ico",
        "queryMinLength": 3,
        "queryAgainst": [
            "title"
        ]
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
                    "tags": [
                        "hero"
                    ]
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
                        "tags": [
                            "expero"
                        ]
                    },
                    {
                        "title": "Dev Tools",
                        "description": "A collection of developer tools that can aid with building and debugging OpenFin applications.",
                        "image": {
                            "src": "http://localhost:8080/common/images/coding-2-unsplash.jpg"
                        },
                        "tags": [
                            "tools"
                        ]
                    },
                    {
                        "title": "Learning Resource",
                        "description": "A collection of developer documents that can aid with building and debugging OpenFin applications.",
                        "image": {
                            "src": "http://localhost:8080/common/images/coding-3-unsplash.jpg"
                        },
                        "tags": [
                            "page"
                        ]
                    }
                ]
            },
            "middleRow": {
                "title": "A collection of simple views that show how to share context using the FDC3 or Interop APIs.",
                "tags": [
                    "fdc3",
                    "interop"
                ]
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
                        "tags": [
                            "view"
                        ]
                    },
                    {
                        "title": "Web Apps",
                        "description": "A collection of web apps built using OpenFin.",
                        "image": {
                            "src": "http://localhost:8080/common/images/coding-5-unsplash.jpg"
                        },
                        "tags": [
                            "manifest"
                        ]
                    },
                    {
                        "title": "Native Apps",
                        "description": "A collection of native apps made available through our catalog.",
                        "image": {
                            "src": "http://localhost:8080/common/images/coding-6-unsplash.jpg"
                        },
                        "tags": [
                            "native"
                        ]
                    }
                ]
            }
        },
        "dockProvider": {
            "id": "customize-workspace",
            "title": "Home Starter",
            "icon": "http://localhost:8080/favicon.ico",
            "workspaceComponents": {
                "hideHomeButton": false,
                "hideWorkspacesButton": false,
                "hideNotificationsButton": false,
                "hideStorefrontButton": false
            },
            "apps": [
                {
                    "display": "individual",
                    "tags": ["dock"]
                },
                {
                    "display": "group",
                    "tooltip": "FDC3",
                    "tags": ["fdc3"]
                },
                {
                    "display": "group",
                    "tooltip": "Manager",
                    "iconUrl": "http://localhost:8080/common/images/icon-gradient.png",
                    "tags": ["manager"]
                }
            ],
            "buttons": [
                {
                    "tooltip": "Google",
                    "iconUrl": "https://www.google.com/favicon.ico",
                    "action": {
                        "id": "launch-google"
                    }
                },
                {
                    "tooltip": "Social",
                    "iconUrl": "http://localhost:8080/common/icons/share.svg",
                    "options": [
                        {
                            "tooltip": "Twitter",
                            "action": {
                                "id": "launch-twitter"
                            }
                        },
                        {
                            "tooltip": "YouTube",
                            "action": {
                                "id": "launch-youtube"
                            }
                        }
                    ]
                }
            ]
        },
        "navigation": [
            {
                "title": "Applications",
                "items": [
                    {
                        "title": "All Apps",
                        "tags": [
                            "view",
                            "page",
                            "manifest",
                            "native"
                        ]
                    },
                    {
                        "title": "Views",
                        "tags": [
                            "view"
                        ]
                    },
                    {
                        "title": "Pages",
                        "tags": [
                            "page"
                        ]
                    },
                    {
                        "title": "Manifest",
                        "tags": [
                            "manifest"
                        ]
                    },
                    {
                        "title": "Native",
                        "tags": [
                            "native"
                        ]
                    }
                ]
            },
            {
                "title": "Context Sharing",
                "items": [
                    {
                        "title": "FDC3 API",
                        "tags": [
                            "fdc3"
                        ]
                    },
                    {
                        "title": "Interop API",
                        "tags": [
                            "interop"
                        ]
                    }
                ]
            }
        ],
        "footer": {
            "logo": {
                "src": "http://localhost:8080/favicon.ico",
                "size": "32"
            },
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
    },
    "notificationProvider": {
        "id": "customize-workspace",
        "title": "Notification Starter",
        "icon": "http://localhost:8080/favicon.ico"
    },
    "integrationProvider": {
        "icon": "http://localhost:8080/favicon.ico",
        "isManagementEnabled": true,
        "command": "integrations",
        "commandDescription": "Allows the management of integrations for this platform. You can decide whether enabled integrations should be included when a query is entered.",
        "integrations": [
            {
                "id": "salesforce",
                "icon": "http://localhost:8080/common/images/salesforce/favicon.ico",
                "title": "Salesforce",
                "description": "Provides access to information contained within SalesForce with the option of launching the result into the browser.",
                "enabled": false,
                "autoStart": true,
                "moduleUrl": "http://localhost:8080/js/integrations/salesforce.bundle.js",
                "data": {
                    "consumerKey": "",
                    "orgUrl": "",
                    "iconMap": {
                        "contact": "http://localhost:8080/common/images/salesforce/contact.svg",
                        "account": "http://localhost:8080/common/images/salesforce/account.svg",
                        "chatter": "http://localhost:8080/common/images/salesforce/chatter.svg",
                        "note": "http://localhost:8080/common/images/salesforce/note.svg",
                        "task": "http://localhost:8080/common/images/salesforce/task.svg"
                    }
                }
            }
        ]
    },
    "loggerProvider": {
        "modules": [
        {
            "enabled": true,
            "id": "console",
            "url": "http://localhost:8080/js/modules/logger/console.bundle.js",
            "data": {}
            }
        ]
    },
    "actionsProvider": {
        "modules": [
            {
                "enabled": true,
                "id": "opacity",
                "url": "http://localhost:8080/js/modules/actions/opacity.bundle.js",
                "data": {}
            }
        ]
    }
}
```

| Property                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **bootstrap**                                                  | Config related to the bootstrapping process                                                                                                                                                                                                                                                                                                                                                                                                                         |
| home                                                           | Should we use home and register a home provider to feed apps into Home and Browser                                                                                                                                                                                                                                                                                                                                                                                  |
| store                                                          | Should we use store and register a store provider to display apps                                                                                                                                                                                                                                                                                                                                                                                                   |
| notifications                                                  | Should we use register the workspace platform against notification center so it can have it's own dedicated section that is themed and branded.                                                                                                                                                                                                                                                                                                                     |
| dock                                                           | Should we use register a dock provider to feed the apps into a Dock                                                                                                                                                                                                                                                                                                                                                                                                 |
| autoShow                                                       | Provider a list of components that should be visible on startup, defaults to home                                                                                                                                                                                                                                                                                                                                                                                   |
| **platformProvider**                                           | Config related to the platform                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| rootUrl                                                        | Used so that root urls can be defined via manifest for different environments                                                                                                                                                                                                                                                                                                                                                                                       |
| useCustomStorage                                               | Register custom storage providers for the saving of page and workspace related information (Default is false).                                                                                                                                                                                                                                                                                                                                                      |
| intentPicker.url                                               | The url that supports intent selection.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| intentPicker.height                                            | The height for the intent picker.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| intentPicker.width                                             | The width for the intent picker.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **appProvider**                                                | Config related to where the apps should be fetched from                                                                                                                                                                                                                                                                                                                                                                                                             |
| appsSourceUrl (legacy)                                         | Where should we fetch the apps from. It is a url or an array of urls from which to get apps data from. If present it will be used instead of endpointIds (shown below).                                                                                                                                                                                                                                                                                             |
| includeCredentialOnSourceRequest (legacy)                      | Should we include credentials when doing the search request. Options: "omit", "same-origin", "include". Used when appsSourceUrl is specified.                                                                                                                                                                                                                                                                                                                       |
| endpointIds                                                    | An array of endpoint ids that should be used to request a list of apps (this replaces appsSourceUrl)                                                                                                                                                                                                                                                                                                                                                                |
| cacheDurationInMinutes                                         | How many minutes should we wait before refreshing the list from the server? Can be used on it's own or with cacheDurationInSeconds.                                                                                                                                                                                                                                                                                                                                 |
| cacheDurationInSeconds                                         | How many seconds should we wait before refreshing the list from the server? Can be used on it's own or with cacheDurationInMinutes.                                                                                                                                                                                                                                                                                                                                 |
| appAssetTag                                                    | If including app assets in your manifest, what tag in the app definition will highlight this manifestType:"external" is actually an app asset and shouldn't be run from a path? If undefined then appasset is assumed                                                                                                                                                                                                                                               |
| manifestTypes                                                  | An array of the manifestTypes the app should support from the apps.json feed                                                                                                                                                                                                                                                                                                                                                                                        |
| **endpointProvider**                                           | Config related to endpoints that your application might use to do requests for data                                                                                                                                                                                                                                                                                                                                                                                 |
| modules                                                        | An array of module definitions that can be referenced by an endpoint. The endpoint would specify type: "module" and have a typeId which would match the id of the module. Look at [second.manifest.fin.json](public/second.manifest.fin.json) for an example.                                                                                                                                                                                                       |
| modules.id                                                     | The id used to lookup the javascript module from an endpoint by specifying endpoint.type: "module" and "typeId":"moduleId".                                                                                                                                                                                                                                                                                                                                         |
| modules.url                                                    | The url of the javascript module which should be imported and used (it needs to export an endpoint form the module that matches the endpoint interface.)                                                                                                                                                                                                                                                                                                            |
| modules.data                                                   | Data that will be passed to the init function of the exported endpoint when it is first initialized.)                                                                                                                                                                                                                                                                                                                                                               |
| endpoints                                                      | An array of endpoint definitions                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| endpoints.id                                                   | The id used to lookup the endpoint                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| endpoints.type                                                 | The type of endpoint definition (used to identify the type of logic to use. Current supported options are fetch to use inbuilt fetch capability or module to look up and use a javascript module to manage the request)                                                                                                                                                                                                                                             |
| endpoints.typeId                                               | When enpoint type is "module" then typeId is used to look up a defined module (the module will have an id that is compared to typeId).)                                                                                                                                                                                                                                                                                                                             |
| endpoints.options                                              | Options that will be read by the logic and used to perform the action                                                                                                                                                                                                                                                                                                                                                                                               |
| **browserProvider**                                            | Config related to OpenFin Browser                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| windowOptions.title                                            | The title for the window that shows up in the taskbar                                                                                                                                                                                                                                                                                                                                                                                                               |
| windowOptions.icon                                             | The icon that should show in the taskbar and in the top left menu of the browser                                                                                                                                                                                                                                                                                                                                                                                    |
| windowOptions.newTabUrl                                        | Should we allow someone to add a new view to a page? What url should be loaded when they click add?                                                                                                                                                                                                                                                                                                                                                                 |
| windowOptions.newPageUrl                                       | Should we allow someone to add a new page? What url should be loaded when they click add?                                                                                                                                                                                                                                                                                                                                                                           |
| toolbarButtons                                                 | For this sample we let you add/remove buttons by adding them to this array. This works for the demo but a thing to note is that the actions referenced by the button need to be registered (see [actions.ts](client/src/actions.ts)). The object has two properties: include whether or not to include it (the first button is hidden but you can turn it on to experiment) and button which is in the toolbarbutton shape supported by the workspace-platform sdk. |
| supportedMenuActions                                           | Undefined by default. If an array is specified then it will use that list of action ids to determine which menu options should be shown. The default action ids are exported from [actions.ts](client/src/actions.ts) and this plus the setting is used in the [menu.ts](client/src/menu.ts) logic.                                                                                                                                                                 |
| **themeProvider**                                              | What themes should be passed to OpenFin Workspace (at the moment only one is supported)                                                                                                                                                                                                                                                                                                                                                                             |
| themes                                                         | An array of custom themes to pass to OpenFin Workspace (at the moment only the first entry is used)                                                                                                                                                                                                                                                                                                                                                                 |
| themes.label                                                   | A label to use to identify this theme                                                                                                                                                                                                                                                                                                                                                                                                                               |
| themes.logoUrl                                                 | Preferred logo for a theme                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| pallette                                                       | A collection of settings that can be overridden (brandPrimary, brandSecondary and backgroundPrimary are mandatory if you are specifying a theme)                                                                                                                                                                                                                                                                                                                    |
| **homeProvider**                                               | Config related to the home provider setup to list things in Home and the Browser Add New View                                                                                                                                                                                                                                                                                                                                                                       |
| id                                                             | What your provider should be called                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| title                                                          | The title that should be shown in the Home UI to represent your provider                                                                                                                                                                                                                                                                                                                                                                                            |
| icon                                                           | The icon to show in the Home UI (top right section as well as an icon to switch between providers when there is more than one registered)                                                                                                                                                                                                                                                                                                                           |
| queryMinLength                                                 | How many characters should be typed before filtering the list?                                                                                                                                                                                                                                                                                                                                                                                                      |
| queryAgainst                                                   | What do you wish to run the query against when inspecting your search results. An array of entries. If not specified it will default to ["title"]. Since this example stores the app definition inside of a cli search result's data field you can add data.tags to the array so that it will see if the query matches the start of a tag e.g. ["title","data.tags"]                                                                                                |
| **storefrontProvider**                                         | Config settings that are used by the sample code to configure the store using the workspace APIs                                                                                                                                                                                                                                                                                                                                                                    |
| id                                                             | Unique ID for your store                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| title                                                          | The name for your store that will be shown in the store selection dropdown                                                                                                                                                                                                                                                                                                                                                                                          |
| icon                                                           | The icon to show in the store selection dropdown                                                                                                                                                                                                                                                                                                                                                                                                                    |
| landingPage                                                    | The structure of the main page the user will be presented with when they visit your store                                                                                                                                                                                                                                                                                                                                                                           |
| landingPage.hero                                               | Optional. Do you want a hero section on the main page.                                                                                                                                                                                                                                                                                                                                                                                                              |
| landingPage.topRow                                             | What do you want this row to be called and how many sections do you want (use tags to determine what apps are included in this section). Limit of 4 sections.                                                                                                                                                                                                                                                                                                       |
| landingPage.middleRow                                          | What do you want this row to be called and what apps do you want to show in the middle (use tags to determine what apps are included in this row). Limit of 6 apps.                                                                                                                                                                                                                                                                                                 |
| landingPage.bottomRow                                          | What do you want this row to be called and how many sections do you want (use tags to determine what apps are included in this section). There is a limit of 3 sections.                                                                                                                                                                                                                                                                                            |
| navigation                                                     | How many navigation sections do you want on the left hand menu? Limit of 2.                                                                                                                                                                                                                                                                                                                                                                                         |
| navigation[i].title                                            | What do you want as a title for these set of links?                                                                                                                                                                                                                                                                                                                                                                                                                 |
| navigation[i].items                                            | How many links do you want to show (limit of 5) and what apps do you want a link to display (use tags to select apps)                                                                                                                                                                                                                                                                                                                                               |
| footer                                                         | What do you want to show in the store footer                                                                                                                                                                                                                                                                                                                                                                                                                        |
| footer.logo                                                    | The logo to show in the footer                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| footer.text                                                    | The text to show in the footer                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| footer.links                                                   | What links do you want to show in the footer (opens up using the default web browser.                                                                                                                                                                                                                                                                                                                                                                               |
| **dockProvider**                                               | Config settings that are used by the sample code to configure the registration against Dock                                                                                                                                                                                                                                                                                                                                                                         |
| id                                                             | Unique ID for your dock registration                                                                                                                                                                                                                                                                                                                                                                                                                                |
| title                                                          | The name for your workspace platform in the dock center                                                                                                                                                                                                                                                                                                                                                                                                             |
| icon                                                           | The icon to show in the dock                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| workspaceComponents                                            | The inbuilt workspace components to be shown as buttons in the dock                                                                                                                                                                                                                                                                                                                                                                                                 |
| workspaceComponents.hideHomeButton                             | Hide the inbuilt home button in the dock                                                                                                                                                                                                                                                                                                                                                                                                                            |
| workspaceComponents.hideWorkspacesButton                       | Hide the inbuilt workspaces button in the dock                                                                                                                                                                                                                                                                                                                                                                                                                      |
| workspaceComponents.hideNotificationsButton                    | Hide the inbuilt notifications button in the dock                                                                                                                                                                                                                                                                                                                                                                                                                   |
| workspaceComponents.hideStorefrontButton                       | Hide the inbuilt store button in the dock                                                                                                                                                                                                                                                                                                                                                                                                                           |
| apps                                                           | The list of buttons generated from app tags`                                                                                                                                                                                                                                                                                                                                                                                                                        |
| apps.item.display `["individual", "group"]`                    | Display the apps with the specified tags as individual buttons or grouped in a drop down                                                                                                                                                                                                                                                                                                                                                                            |
| apps.item.tags                                                 | The application tags to include for this item                                                                                                                                                                                                                                                                                                                                                                                                                       |
| apps.item.tooltip `[optional if group]`                        | A tooltip for the group button in group mode                                                                                                                                                                                                                                                                                                                                                                                                                        |
| apps.item.iconUrl `[optional if group]`                        | An icon for the group button in group mode, will pick first app if not supplied                                                                                                                                                                                                                                                                                                                                                                                     |
| buttons                                                        | A list of additional buttons that can be shown in the dock, they can be custom or launch apps                                                                                                                                                                                                                                                                                                                                                                       |
| button.item.appId                                              | Get the details from the app to launch, the tooltip and iconUrl can override the values from app.json                                                                                                                                                                                                                                                                                                                                                               |
| button.item.tooltip `[optional if using appId]`                | The label to show when hovering the button                                                                                                                                                                                                                                                                                                                                                                                                                          |
| button.item.iconUrl `[optional if using appId]`                | The icon to show on the button                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| button.item.action `[optional if using options]`               | The action for the button                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| button.item.action.id `[optional if using options]`            | The id sent to the action for the button                                                                                                                                                                                                                                                                                                                                                                                                                            |
| button.item.options `[optional if using action]`               | The options for a button which then displays as a dropdown                                                                                                                                                                                                                                                                                                                                                                                                          |
| button.item.options.item                                       | The items to show in a dropdown                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| button.item.options.item.appId                                 | Get the details from the app to launch, the label can override the values from app.json                                                                                                                                                                                                                                                                                                                                                                             |
| button.item.options.item.tooltip `[optional if using appId]`   | The label to show for the drop down item                                                                                                                                                                                                                                                                                                                                                                                                                            |
| button.item.options.item.action `[optional if using appId]`    | The action for the dropdown entry                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| button.item.options.item.action.id `[optional if using appId]` | The id sent to the action for the button                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **notificationProvider**                                       | Config settings that are used by the sample code to configure the registration against Notification Center so your theme will be picked up and applied                                                                                                                                                                                                                                                                                                              |
| id                                                             | Unique ID for your notification registration                                                                                                                                                                                                                                                                                                                                                                                                                        |
| title                                                          | The name for your workspace platform in the notification center                                                                                                                                                                                                                                                                                                                                                                                                     |
| icon                                                           | The icon to show in the notification center                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **integrationProvider**                                        | Config settings that are used to define additional search providers for your workspace platform                                                                                                                                                                                                                                                                                                                                                                     |
| icon                                                           | An icon for this integration provider                                                                                                                                                                                                                                                                                                                                                                                                                               |
| isManagementEnabled                                            | Enable management of enabled integrations? (default is false)                                                                                                                                                                                                                                                                                                                                                                                                       |
| command                                                        | if management of integrations is enabled what command should expose this functionality (default: integrations so the command would be /integrations)                                                                                                                                                                                                                                                                                                                |
| commandDescription                                             | A description to go alongside the command to provide supporting information.                                                                                                                                                                                                                                                                                                                                                                                        |
| integrations                                                   | An array of integrations                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| integrations.id                                                | The id of your integration                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| integrations.icon                                              | The icon to show for your integration                                                                                                                                                                                                                                                                                                                                                                                                                               |
| integrations.title                                             | The title for your integration entry                                                                                                                                                                                                                                                                                                                                                                                                                                |
| integrations.description                                       | A description to provide more information about this integration. This is displayed if management of integrations is enabled.                                                                                                                                                                                                                                                                                                                                       |
| integrations.enabled                                           | Is the integration enabled                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| integrations.autoStart                                         | Should the integration automatically start if enabled (default: true) enabled                                                                                                                                                                                                                                                                                                                                                                                       |
| integrations.moduleUrl                                         | Where should the module be loaded from                                                                                                                                                                                                                                                                                                                                                                                                                              |
| integrations.data                                              | Data/config that will be passed to the integration module (for this sample look at the description of the settings from the integrate-with-salesforce starter)                                                                                                                                                                                                                                                                                                      |
| **loggerProvider**                                             | Config related to the loggers                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| modules                                                        | Array of modules to load for logging                                                                                                                                                                                                                                                                                                                                                                                                                                |
| modules.item                                                   | A module to load for logging                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| modules.item.enabled                                           | Is the module enabled                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| modules.item.id                                                | The id of the module                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| modules.item.url                                               | The url of the module to load                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| modules.item.data                                              | Any custom settings for the module                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **actionsProvider**                                            | Config related to the actions                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| modules                                                        | Array of modules to load for actions                                                                                                                                                                                                                                                                                                                                                                                                                                |
| modules.item                                                   | A module to load for actions                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| modules.item.enabled                                           | Is the module enabled                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| modules.item.id                                                | The id of the module                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| modules.item.url                                               | The url of the module to load                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| modules.item.data                                              | Any custom settings for the module                                                                                                                                                                                                                                                                                                                                                                                                                                  |

### Note About The Manifest

This is a demo application for learning and is not meant for production use. Please use this as a way of seeing how you might approach configuring your store.

The manifest for the storefront does not include an `id` for the `cta`, `items` and `navigation` sections.

This is to reduce noise in the example manifest and to prevent issues if an item or section is copied and pasted. The code has a fallback that uses the title or title plus tags to form an `id`. This works for the demo, as the manifest file is storing the configuration. If the configuration were ever fetched from a server, then it should return a unique (e.g., GUID) and idempotent ID.

This is because the `id` represents the route that the user navigates to. So, if an `id` for a navigation item was "x" and the user clicked on the link, then the store would call the `getNavigation()` or `getLandingPage()` function you defined and look for a matching `id` of "x". If you regenerate the `id` for a navigation item, e.g., it becomes "y", then the store would not be able to render your page, as there are no items with the `id` of "x".

---

These are settings you can experiment with (e.g., if you already have your own CDS for apps, you can update the URL and restart the Workspace Platform. Your server will need to support CORS).

The home provider checks the [apps.ts](client/src/apps.ts) file for a list of applications and then it reads the apps directory REST endpoint and returns it. The home provider then maps the apps to an array of SearchResult objects. The apps file checks to see if it has permission to launch external processes or download app assets and filter out entries as appropriate. It logs a warning of the apps filtered out and in a real app you could move this logic to the launch action to then notify the user they can't launch that app on this machine.

When a user selects a result in OpenFin Home, it is returned to the home provider and the home provider uses [launch.ts](client/src/launch.ts) to launch the result.

The [launch.ts](client/src/launch.ts) file imports [OpenFin's Workspace NPM Module](https://www.npmjs.com/package/@openfin/workspace) and [OpenFin's Workspace Platform NPM Module](https://www.npmjs.com/package/@openfin/workspace-platform). It checks the passed app. If the passed app is a Native Application (manifestType: "external") that requires launch external process permissions then it is up to the **Platform Workspace** to support the permission. They can pass the app to launchApp or call fin.System.launchExternalProcess if they want custom logic. If you don't have the launchExternalProcess permission apps.ts filters unsuitable apps out. For any other type of app/manifestType then the entry is passed to the launchApp function provided by the OpenFin workspace platform module.

The [store.ts](client/src/store.ts) file is driven by the config in the manifest file and takes advantage of the building blocks provided in [OpenFin's Workspace NPM Module](https://www.npmjs.com/package/@openfin/workspace) to build the OpenFin Store. It uses [apps.ts](client/src/apps.ts) to use the same source data as the home provider. This way adding a single entry in the [apps.json](public/apps.json) file (simulating your server) will populate both. We have an array that points to the common [apps.json](../common/public/apps.json)apps.json and a project specific [apps.json](public/apps.json) which is empty and ready for you to add to.

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

- How do I know what the settings in the theme settings in the manifest file actually changes?

  - [Workspace Themes Overview](https://developers.openfin.co/of-docs/docs/workspace-themes-overview)

- How do I demonstrate intent support?
  - Information related to intents has been put into it's own [IntentSupport.md](IntentSupport.md) file
- How do I demonstrate context support?

  - The sample apps listed include a number examples of context sharing. They all share instruments (either using the fdc3 api or the interop api). Some examples are in the [../common/public/views](../common/public/views) folder. In there you will also see two examples of third-party content (google and trading view) that use preload scripts to listen and react to passed instruments. The view manifests for google and trading view also show how you can define a default context group for a view (they are both defaulted to be on the green context group out of the box). An example can be found here [preload-tradingview-view.json](../common/public/views/tradingview/preload-tradingview-view.json)

- Do I always need a view manifest if it just contains a url?

  - You have control of how you launch views, pages, OpenFin applications and native apps. This project has been updated to support a custom manifest type that is called "inline-view". The entry can be seen here: [../common/public/apps.json](../common/public/apps.json). The [launch.ts](client/src/launch.ts#L196) file has been updated to check for this specific type and it calls it's own [launchView](client/src/launch.ts#L49) function instead of using the launchApp function from the workspace-platform sdk. This function checks to ensure that the passed app is either a view or an inline view. If it is an inline view it will take the manifest object from the manifest setting in an app definition. If it is a standard view then the manifest setting points to the manifest url and it will fetch it. Since this is an intent and context sample this change also required updating [interopbroker.ts](client/src/interopbroker.ts#L28). We needed to support inline views in case an inline view supports intents (the entry added into apps.json has an intent definition inside of it).

---

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace)
