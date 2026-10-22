![HERE Core UI Example Application -- Common Content](../../../../assets/HERO-STARTER-HERE-CORE-UI.png)

> **_:information_source: HERE Core UI:_** [HERE Core UI](https://resources.here.io/docs/core/hc-ui/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the HERE Core Container and HERE Core UI components is only granted pursuant to a license from HERE (see [manifest](manifest.fin.json)). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation key or to discuss a production license.

# Common Content

This folder contains common assets that apply across projects. If a sample needs them then it will reference them through the `/common` path. Each how-to gets its own copy of the content with this folder as the golden source.

## Purpose Of The Common Folder

The purpose of this folder is to provide common content and scripts to the other how-to folders.

## Content

### Linked Tools

- App Definition Builder
- Context using FDC3
- Intents using FDC3
- Context using Interop API
- Intents using Interop API

### Samples

- [Contact Samples](views/contact/) - A collection of views that support fdc3.contact context and ViewContact / StartCall intents.
- [Google](views/google/) - An example of a third party site listening and reacting to shared context via preload scripts.
- [Trading View](views/tradingview/) - An example of a third party site listening and reacting to shared context via preload scripts.
- [Manager Portal](views/manager-portal/) - a collection of views that support fdc3.contact context and give an example of a manager's workflow managing their team.
- [Hidden Window](windows/hidden-window/) - an example of a hidden window that can be launched that might be responsible for pushing out notifications (or it could be any role) and reacting to them.
- [Interest Rate Swap - RFQ](windows/irs-rfq/) - an example of performing an Interest Rate Swap - Request for Quote using a ticket and then workflow with notifications.

### HERE Core UI Platform

- [New Tab View](views/platform/new-tab/) - A basic view used by a HERE Core UI Platform so that users can add new views and pages. This view is a basic example that lets you enter a query which is passed onto google or paste and navigate to a url. It is mainly used for development purposes to let you see what a url looks like in Workspace Browser before creating an [App Definition](views/app/app-definition-builder/) for it.
