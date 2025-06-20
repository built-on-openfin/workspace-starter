![OpenFin Workspace Example Application -- Integrating with Snap Basic](../../assets/OpenFin-Workspace-Starter.png)

> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

# Integrate with Snap - Basic

> This example is **Windows** only, it will not run on a **Mac**.

OpenFin Workspace empowers you to use our Snap tools, to enable layouts which include native applications.

This example demonstrates connecting to and using layouts with Snap.

The package utilized by this example is [@openfin/snap-sdk](https://www.npmjs.com/package/@openfin/snap-sdk).

> The version of the Snap SDK is referenced in package.json and the app asset defined in manifest.fin.json.

- [Live Launch Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv21.0.0%2Fintegrate-with-snap-basic%2Fmanifest.fin.json)

- [Live Launch Second Example](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv21.0.0%2Fintegrate-with-snap-basic%2Fsecond.manifest.fin.json)

## Getting Started

1. Install dependencies and do the initial build. Note that these examples assume you are in the sub-directory for the example.

```shell
npm run setup
```

2. Optional (if you wish to pin the version of OpenFin Workspace to version 21.0.0 and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/docs/desktop-owner-settings).
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

We include a second example [second.manifest.fin.json](./public/second.manifest.fin.json) which launches the same example but shows granular permissions (so it can only launch listed app assets and download those app assets) as well as our trustedAppConfigs to demonstrate that an application is trusted by Here with those specific permissions (so a security prompt is not shown which generally requires pre-approval through Desktop Owner Settings).

You can run the second client using the following command:

```shell
npm run secondclient
```

## Custom App/Window Behavior

If you have autoRegistration enabled (we do this in the basic example) it will automatically register browser, platform and classic windows and track them (native apps are launched using the snap server so are tracked explicitly):

```javascript
await snapServer.enableAutoWindowRegistration();
```

If you are registering Browser/Platform/Classic Windows directly then you can specify sizing behavior when you register them (you can also specify sizing behavior on a native app by native app basis if you want a specific app to have a behavior different to what was specified when starting the snap server).

```javascript
// Register a window with snap with 'none' for resizing behavior, meaning this window will not be resized by snap
snapServer.registerWindow(snapClientId, nativeId, 'none')

// Launch a native app with resizing behavior disabled:
const path = 'path-to-my-app/app.exe';
const args = 'my-args';
const launchResult = await snapServer.launch({
   path,
   args,
   {
      type: 'combined',
      matchNameRegex: '^WpfMultiProcess.*',
      resizingBehavior: 'none',
   },
});
```

---

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace)
