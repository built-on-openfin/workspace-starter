![OpenFin Workspace Example Application -- Common Content](../../assets/OpenFin-Workspace-Starter.png)

> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

# Common Content

This folder contains common assets that apply across projects. If a sample needs them then it will reference them through the `/common` path. The local server will map that to this folder.

This lets each sample reference the examples they wish to make available without having to list all of them or duplicate the content. Common styling, images and snapshots can also be made available through this folder.

This folder supports building content written in TypeScript but the majority of the examples are vanilla html, js and css to keep things simple and easy to tweak and refresh.

## Purpose Of The Common Folder

The purpose of this folder is to provide common content and scripts to the other how-to folders. You can build it (although running npm run setup from a how-to will also build this directory) but it doesn't support npm start or npm run client directly (this should be run from one of the other how-to folders). The folders that cannot be launched locally are this folder (common), hints-and-tips and migrate-from-a-previous-version.

## Getting Started

1. Run setup. Note that these examples assume you are in the common sub-directory.

```shell
npm run setup
```

2. Build the project (only needed if you have modified the TypeScript code after setup).

```shell
npm run build
```

If you build and start one of the other samples it will reference this project if needed.

## Content

### Linked Tools

- App Definition Builder
- Context using FDC3
- Intents using FDC3
- Context using Interop API
- Intents using Interop API

### Samples

- [Contact Samples](public/views/contact/) - A collection of views that support fdc3.contact context and ViewContact / StartCall intents.
- [Google](public/views/google/) - An example of a third party site listening and reacting to shared context via preload scripts.
- [Trading View](public/views/tradingview/) - An example of a third party site listening and reacting to shared context via preload scripts.
- [Manager Portal](public/views/manager-portal/) - a collection of views that support fdc3.contact context and give an example of a manager's workflow managing their team.
- [Hidden Window](public/windows/hidden-window/) - an example of a hidden window that can be launched that might be responsible for pushing out notifications (or it could be any role) and reacting to them.
- [Interest Rate Swap - RFQ](public/windows/irs-rfq/) - an example of performing an Interest Rate Swap - Request for Quote using a ticket and then workflow with notifications.

### Workspace Platform

- [New Tab View](public/views/platform/new-tab/) - A basic view used by a workspace platform so that users can add new views and pages. This view is a basic example that lets you enter a query which is passed onto google or paste and navigate to a url. It is mainly used for development purposes to let you see what a url looks like in Workspace Browser before creating an [App Definition](public/views/app/app-definition-builder/) for it.

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace)
