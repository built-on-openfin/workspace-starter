![OpenFin Workspace Example Application -- Integrate With Bloomberg Basic](../../assets/OpenFin-Workspace-Starter.png)

> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

# Integrate With Bloomberg (Basic)

## Pre-requisites

- Bloomberg Terminal software installed, running and with a user logged in. Software can be acquired from here: <https://www.bloomberg.com/professional/support/software-updates/>
- A domain that is set up with Bloomberg IT so that the BBG terminal will accept requests originating from that domain
- Please see the documentation online for more information - https://developers.openfin.co/of-docs/docs/integration-with-terminal-connect

## Notes about this sample

This application you are about to install is a simple example of connecting to a Bloomberg Terminal.  
 When a connection is established between your OpenFin app and the Bloomberg Terminal, the Terminal reacts to Interop events and shares the appropriate context. The reaction depends on the type of context. You can configure contexts and intents, but we provide a default configuration for the most common contexts and intents.  
 The default configuration always directs interop actions to Terminal panel 1 and maps context types and intents to Terminal functions as follows:

| Intent Name    | ContentType     | Terminal Function |
| -------------- | --------------- | ----------------- |
| ViewChart      | fdc3.instrument | GP                |
| ViewContact    | fdc3.contact    | BIO               |
| ViewInstrument | fdc3.instrument | DES               |
| ViewQuote      | fdc3.instrument | Q                 |

This example assumes you have already [set up your development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment)

## Running the Sample

To run this sample you can:

- Clone this repo and follow the instructions below. This will let you customize the sample to learn more about our APIs.

## Getting Started

1. Install dependencies and build the code. Note that these examples assume you are in the sub-directory for the example.

```shell
npm run setup
```

2. Optional (if you wish to pin the version of OpenFin Workspace to version 12.0.0 and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/docs/desktop-owner-settings).
   This example runs a utility [desktop-owner-settings.bat](../common/desktop-owner-settings.bat) that adds the Windows registry key for you, pointing to a local desktop owner
   settings file so you can test these settings. If you already have a desktop owner settings file, this script prompts to overwrite the location. Be sure to capture the existing location so you can update the key when you are done using this example.

   (**WARNING**: This script kills all open OpenFin processes. **This is not something you should do in production to close apps as force killing processes could kill an application while it's trying to save state/perform an action**).

```shell
npm run dos
```

3. Start the test server in a new window.

```shell
npm run start
```

4. Start the demonstration application.

```shell
npm run client

```

### Please note: In the manifest.json file, please change "http://localhost:8080" under snapshot/windows/layout/content to point to your domain

"url": "http://localhost:8080/platform/bbgtest.html",

### Please also note that you must establish a connection to the Bloomberg Terminal and verify that you receive the "connected" message prior to raising any intents. You may connect to the Bloomberg Terminal via the "Connect to Bloomberg Terminal" button

5. If you modify and want to build the code you can run the build command.

```shell
npm run build
```

![Integrate With Bloomberg Basic](integrate-wth-bloomberg-basic.gif)

---

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace)
