<img src="../../assets/OpenFin-Workspace-Starter.png" width="100%" alt="OpenFin Workspace Example Application -- Adding your application to Storefront" />

>**_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes. Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a  licence from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license. OpenFin Workspace is currently **only supported on Windows**.

# Register With Store - Basic

OpenFin Workspace empowers you to feed content & apps to OpenFin Storefront via our API. This gives you the choice of fetching your list of applications from a *Content Discovery Service* or somewhere else. 

This application you are about to install is a simple example of plugging in your own content or app. This example assumes you have already [set up your development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment)

This example has a hard-coded list of apps that is returned from [apps.ts](client/src/apps.ts) and it configures the store through [store.ts](client/src/store.ts). The entry point is [provider.ts](client/src/provider.ts). 

The registration of a provider against store will look like the following:

```javascript
const storeProvider = {
      id: "id",
      title: "title",
      getNavigation: getNavigation.bind(this),
      getLandingPage: getLandingPage.bind(this),
      getFooter: getFooter.bind(this),
      getApps,
      launchApp: launch,
    };
```

The example is a basic workspace platform that shows a UI allowing you to register a store, show/hide the store and unregister the store. Home will not be registered against or launched in this example (unless it is already running and has been registered against by another application).

## Getting Started

1. Install dependencies. Note that these examples assume you are in the sub-directory for the example.

```bash
$ npm install
```

2. Build the project.

```bash
$ npm run build
```

3. Optional (if you wish to pin the version of OpenFin Workspace to version 4.0.0) - Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/docs/desktop-owner-settings).
   This example includes a utility (`desktop-owner-settings.bat`) that adds the Windows registry key for you, pointing to a local desktop owner 
   settings file so you can test these settings. If you already have a desktop owner settings file, this script prompts to overwrite the location. Be sure to capture the existing location so you can update the key when you are done using this example.

  
   (**WARNING**: This script kills all open OpenFin processes. **This is not something you should do in production to close apps as force killing processes could kill an application while it's trying to save state/perform an action**).


```bash
$ npm run dos
```

4. Start the test server in a new window.

```bash
$ start npm run start
```

5. Start Your Workspace Platform (a basic app in this instance).

```bash
$ npm run client
```

6. Click the register button to register the content store and use the show/hide buttons to control it's visibility.

![](openfin-register-with-store-basic.gif)
---
**NOTE ABOUT THE IDs**

In the hard-coded store configuration you will see a number of id entries. In a real application these ids would need to be unique (e.g. a GUID) and idempotent (if you re-request a section/navigation item then the contents can change e.g. title but the id shouldn't).

This is because the id represents the route that the user navigates to. So if an id for a navigation item was "x" and the user clicked on the link then the store would call the getNavigation or getLandingPage function you defined and look for a matching id of "x". If you regenerate the id for a navigation item e.g. it becomes "y" then the store will not be able to render your page as there are no items with the id of "x". 

---


### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace).