> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# Versioning Information

In the customize workspace sample we give an example of a [versioning strategy](../../customize-workspace/docs/how-to-add-versioning-support.md). There is a lot of logic under the covers to handle different approaches but this document shows how you can easily get information related to:

- app - examples of how you can specify and read your app version
- rvm - what rvm version are you running against?
- container - what version of container are you running?
- workspace - what version of workspace components are you connected to and what version did you build against?
- notification center - what version of notification center is running and what is the API version you are using?

## App version

There are lots of approaches to this. It may be you have a placeholder in your code that is replaced at build time (this could be linked to the version inside of a package.json file).

You might also decide to specify a version number in your manifest. This is an example of how it could be done:

Your manifest:

```json
{
  ...
  "customSettings": {
    "version": { "app": "1.0.0" }
  }
}
```

Your code could then read this data using the following approach:

```js
const app = await fin.Application.getCurrent();
const manifest: OpenFin.Manifest & { customSettings?: { version: { app: string } } } =
  await app.getManifest();
const appVersion: string = manifest?.customSettings?.version?.app;
```

## The current RVM Version

You can detect the rvm version with the following:

```js
const rvmInfo = await fin.System.getRvmInfo();
```

## The current Container Version

You can detect the runtime version with the following:

```js
const runtimeVersion = await fin.System.getVersion();
```

## The current running Workspace Version and the Version you built against

When you register against a workspace component (e.g. Home) you are returned an object containing meta information about the component you connected against. The meta data also includes the version of the npm package you used.

```js
import { Home } from '@openfin/workspace';

const homeRegistration = await Home.register(homeProvider);
const runningWorkspaceVersion: string = homeRegistration.workspaceVersion;
const workspaceClientAPIVersion: string = homeRegistration.clientAPIVersion;
```

## The current running Notification Center version

Using the @openfin/workspace package you can get the version number of the currently running Notification Center

```js
import { provider, VERSION } from '@openfin/workspace/notifications';

const providerStatus = await provider.getStatus();
const notificationCenterVersion = providerStatus.version;
const notificationApiVersion = VERSION;
```

## What can you do with this information

As shown by the customize-workspace example you can use this information to determine whether or not your platform should run, what information you should present to your user or if you should close this platform and launch a different version that matches the current environment. You might also decide to use this versioning information to progressively enhance your app.
