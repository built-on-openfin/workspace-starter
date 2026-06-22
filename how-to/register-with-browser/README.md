![HERE Core UI Example Application -- Adding your application to HERE Core UI (Home, Browser & Store)](../../assets/HERO-STARTER-HERE-CORE-UI.png)

> **_:information_source: HERE Core UI:_** [HERE Core UI](https://resources.here.io/docs/core/hc-ui/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the HERE Core Container and HERE Core UI components is only granted pursuant to a license from HERE (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation key or to discuss a production license.

# Register With Browser

HERE Core UI empowers you to take advantage of our browser component by using our HERE Core UI Platform SDK to control the behavior of the HERE Browser independent of the Home and Storefront components. This example shows how to do a few basic things such as:

1. Launch a browser window.
2. Launch a browser window that doesn't require saving unless changes have been applied.
3. Launch a browser in a maximized state
4. Launch a browser window with a custom toolbar.
5. Launch a page with no page tab.
6. Launch a browser window with multiple pages.
7. Launch a single locked page.
8. Launch a browser window with fixed views.
9. Get all the pages for all open browser windows.
10. Quit the running platform.

This example assumes you have already [set up your development environment](https://resources.here.io/docs/core/develop/)

## Running the Sample

To run this sample you can:

- Clone this repo and follow the instructions below. This will let you customize the sample to learn more about our APIs.
- Launch the Github hosted version of this sample to interact with it by going to the following link: [Github Workspace Starter Register With Browser](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv23.2.0%2Fregister-with-browser%2Fmanifest.fin.json)

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

5. Build the project if you modify the code.

```shell
npm run build
```

### Note About The App

This is a headless application. If you wish to debug it then you can update the [manifest file](public/manifest.fin.json) and set platform.autoShow to **true**. Otherwise you can use Process Manager (which is included in your list of apps).

### How this example works

```shell
npm run client
```

1. The client command will launch a window with the options object `customSettings.launchBarWindowSettings` set in the `public/manifest.fin.json` file. The window creation for the launch bar containing the buttons is invoked in `client/src/provider.ts`. The provider also configures the platform and registers a lot of the actions used by the browser windows.

![Register With Browser](./assets/register-with-browser.gif)

The main menu in the browser and the custom buttons window shows some of the custom behaviors you can add to your browser through the use of our SDK.

### Note About This Example

This is an example of how to use our APIs to configure HERE Core UI. It's purpose is to provide an example and provide suggestions. This is not a production application and shouldn't be treated as such. Please use this as a guide and provide feedback. Thanks!

---
