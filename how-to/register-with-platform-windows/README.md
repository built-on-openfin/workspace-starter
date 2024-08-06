![OpenFin Workspace Example Application -- Adding your application to OpenFin Workspace (Home and Store)](../../assets/OpenFin-Workspace-Starter.png)

> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

# Register With Platform Windows

OpenFin Workspace lets you customize the styling of the browser windows, you can specify your own template for the window layout.

## Running the Sample

To run this sample you can:

- Clone this repo and follow the instructions below. This will let you customize the sample to learn more about our APIs.
- Launch the Github hosted version of this sample to interact with it by going to the following link: [Github Workspace Starter Register With Platform Windows](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv19.0.0%2Fregister-with-platform-windows%2Fmanifest.fin.json)

## Getting Started

1. Install dependencies and do the initial build. Note that these examples assume you are in the sub-directory for the example.

```shell
npm run setup
```

2. Optional (if you wish to pin the version of OpenFin Workspace to version 18.0.0 and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/docs/desktop-owner-settings).
   This example runs a utility [dos.mjs](./scripts/dos.mjs) that adds the Windows registry key for you, pointing to a local desktop owner
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

6. On startup Home will be shown and you can launch one of the applications, instead of displaying the app in the standard window layout, it will be shown using a customized layout.

## How it works

The behavior is the same as the [Register With Home Basic Sample](../register-with-home-basic/). Please look at that README for information about the code. The main difference is the platform windows specific part which is described below.

## Custom Platform Windows

The platform api specific code:

- [platform.ts](client/src/platform.ts) - historically specifying null for browser when initializing your platform would mean that generated windows were platform windows, however you could then not create browser windows. Now you can mix window types, create the default browser windows by providing the browser property during initialization, and also using the new `windowType` property when creating windows allows you to create platform windows.

If you would like to use only platform windows you can specify `null` for browser property in the platform init options e.g.

```js
async function initializeWorkspacePlatform(): Promise<void> {
   console.log("Initializing workspace platform");
   await init({
      browser: null,
      ...
   });
}
```

You can then specify the `defaultWindowOptions` in the manifest for the platform window location.

```json
"defaultWindowOptions": {
   "url": "http://localhost:8080/windows/platform-window.html"
}
```

- [app.ts](client/src/app.ts) - if you look at the **platform-window** case in the `launchApp` method you will see that the `windowType` is specified as `platform` and the url is specified as `http://localhost:8080/windows/platform-window.html`. These two properties will ensure that our custom platform window is launched instead of the default browser window.
- [platform-window.html](public/windows/platform-window.html) - this is the html template where you specify your custom html. It is important to include a hook for our layout system (see layout-container within the html). You can see that it brings in two scripts.
  - [platform-window.ts](client/src/platform-window.ts) - this file binds to the buttons for closing, minimizing and maximizing your custom window
  - [public/common/lib/wc-fin/wc-fin.esm.js](public/common/lib/wc-fin/wc-fin.esm.js) - this is a script that registers a web component that is used in the html template: `<fin-context-group-picker show-list-on-click="false" ></fin-context-group-picker>`. The web component is an example of a context group picker that will assign a context group to every view in the window. The picker is an example which can be found here: [https://github.com/built-on-openfin/interop-api/tree/main/js/components/wc-fin](https://github.com/built-on-openfin/interop-api/tree/main/js/components/wc-fin) and the settings for this particular component can be found here: [https://github.com/built-on-openfin/interop-api/tree/main/js/components/wc-fin/src/components/context-group-picker](https://github.com/built-on-openfin/interop-api/tree/main/js/components/wc-fin/src/components/context-group-picker)

### Note About This Example

This is an example of how to use our APIs to configure OpenFin Workspace. It's purpose is to provide an example and provide suggestions. This is not a production application and shouldn't be treated as such. Please use this as a guide and provide feedback. Thanks!

## FAQ

- I am not seeing what I expected?

  - To ensure you are running the right version of this example run the npm run dos command and npm run kill command before running the workspace platform using npm run client (you only need to run the dos command once and it will lock the workspace version for this sample)

- Things have moved/gone?

  - Please check the upgrade guide which covers what has changed between releases: [Migrate from a previous version guide](../migrate-from-a-previous-version)

---

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace)
