> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

## Getting Started

1. Install dependencies and build the sample. Note that these examples assume you are in the sub-directory for the example.

```shell
npm run setup
```

2. Optional (if you wish to pin the version of OpenFin Workspace to version 18.0.0 and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/of-docs/docs/desktop-owner-settings). This example runs a utility [dos.mjs](./scripts/dos.mjs) that adds the Windows registry key for you, pointing to a local desktop owner settings file so you can test these settings. If you already have a desktop owner settings file, this script prompts to overwrite the location. Be sure to capture the existing location so you can update the key when you are done using this example.

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

This runs the same code with slightly different settings to show a different theme: [second.manifest.fin.json](../public/second.manifest.fin.json)

If you want to see a third workspace platform that has been configured to use an FDC3 App Directory then you can fire up a copy using the following command:

```shell
npm run thirdclient
```

This runs the same code with slightly different settings to load an FDC3 directory and show a light theme: [third.manifest.fin.json](../public/third.manifest.fin.json)

6. Type any character into the search box to show the default list of applications.
   The [apps](../public/common/apps.json) are displayed as described in their respective files. (OpenFin Home does not read this REST endpoint directly. It is read by the Workspace Platform app and passed to Home via our API).

7. To launch your store launch the Home UI and use / to show a list of the available commands and select Store. Storefront will be shown and your store will be listed.
   The [apps](../public/common/apps.json) are displayed as described in their respective files alongside a Storefront configuration setting defined in your [manifest](../public/manifest.fin.json).

8. If you modify the project and want to rebuild everything.

```shell
npm run build
```

9. If you modify the [client/src/provider.ts](../client/src/provider.ts), [client/src/shell.ts](../client/src/shell.ts) or anything under [client/src/framework](../client/src/framework) you can build just those files.

```shell
npm run build-framework
```

10. If you modify any of the workspace platform starter modules in [client/src/modules](../client/src/modules) you can rebuild the workspace platform starter modules.

```shell
npm run build-starter-modules
```

11. If you are generating and working on your own modules in [client/src/modules](../client/src/modules) you can rebuild the your modules.

```shell
npm run build-client-modules
```

12. If you have changed the sample server logic in [server/src](../server/src) you can rebuild the just the server.

```shell
npm run build-server
```

You will need to do a complete build at least once. From there you may end up only needing to use `npm run build-client-modules` to quickly build just your modules.

Once you have built the project it is easy to extend through config (either the manifest file or settings returned from a service) and custom JavaScript Modules. The remaining guides will walk you through the process.

[<- Back to Table Of Contents](../README.md)
