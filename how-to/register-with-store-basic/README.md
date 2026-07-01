![HERE Core UI Example Application -- Adding your application to Storefront](../../assets/HERO-STARTER-HERE-CORE-UI.png)

> **_:information_source: HERE Core UI:_** [HERE Core UI](https://resources.here.io/docs/core/hc-ui/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the HERE Core Container and HERE Core UI components is only granted pursuant to a license from HERE (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation key or to discuss a production license.

# Register With Store - Basic

HERE Core UI empowers you to feed content & apps to HERE Storefront via our API. This gives you the choice of fetching your list of applications from a _Content Discovery Service_ or somewhere else.

This application you are about to install is a simple example of plugging in your own content or app. This example assumes you have already [set up your development environment](https://resources.here.io/docs/core/develop/)

This example has a hard-coded list of apps that is returned from [apps.ts](client/src/apps.ts) and it configures the store through [store.ts](client/src/store.ts). The entry point is [provider.ts](client/src/provider.ts).

The registration of a provider against store will look like the following:

```javascript
const storeProvider = {
  id: 'id',
  title: 'title',
  icon: 'pathtoicon',
  getNavigation: getNavigation.bind(this),
  getLandingPage: getLandingPage.bind(this),
  getFooter: getFooter.bind(this),
  getApps,
  launchApp: launch
};
```

The example is a basic HERE Core UI Platform that shows a UI allowing you to register a store, show/hide the store and unregister the store. Home will not be registered against or launched in this example (unless it is already running and has been registered against by another application).

## Getting Started

1. Install dependencies and do the initial build. Note that these examples assume you are in the sub-directory for the example.

```shell
npm run setup
```

2. Optional (if you wish to pin the version of HERE Core UI to version 23.2.0 and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://resources.here.io/docs/core/manage/desktops/dos/).
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
   You can now use the custom commands e.g. `/price MSFT.

6. If you modify the project and wish to rebuild you can run setup again or the build command below:

```shell
npm run build
```

![Register With Store Basic](openfin-register-with-store-basic.gif)

### Note About The Ids

In the hard-coded store configuration you will see a number of id entries. In a real application these ids would need to be unique (e.g. a GUID) and idempotent (if you re-request a section/navigation item then the contents can change e.g. title but the id shouldn't).

This is because the id represents the route that the user navigates to. So if an id for a navigation item was "x" and the user clicked on the link then the store would call the getNavigation or getLandingPage function you defined and look for a matching id of "x". If you regenerate the id for a navigation item e.g. it becomes "y" then the store will not be able to render your page as there are no items with the id of "x".

---
