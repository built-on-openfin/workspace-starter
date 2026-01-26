![HERE Core UI Example Application -- Adding your application to HERE Core UI (Home, Browser & Store)](../../assets/HERO-STARTER-HERE-CORE-UI.png)

> **_:information_source: HERE Core UI:_** [HERE Core UI](https://resources.here.io/docs/core/hc-ui/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the HERE Core Container and HERE Core UI components is only granted pursuant to a license from HERE (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation key or to discuss a production license.
> HERE Core UI is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

# Integrate With ServiceNow

HERE Core UI empowers you to browse and search your ServiceNow data using HERE Home, via our ServiceNow integration API. HERE Home provides you with a fast and intuitive interface for discovering your ServiceNow data.

## Running the Sample

To run this sample you can:

- Clone this repo and follow the instructions below. This will let you customize the sample to learn more about our APIs.

## Getting Started

### Configure ServiceNow

Before you can integrate your ServiceNow with HERE Home, you must following the required [configuration steps](https://resources.here.io/docs/core/integrations/servicenow/) for our ServiceNow integration.

When configuring CORS, the URL that you need to add is: `http://localhost:8080`, corresponding to the hostname and port number that this sample uses.

Once you have completed the configuration steps, update the `customSettings` section in the sample app's [manifest file](./public/manifest.fin.json) as follows:

- **`instanceUrl`** the url of your ServiceNow instance
- **`clientId`** the client id of your application

With ServiceNow configured and the sample custom settings updated, you can continue to run the sample.

### Run The Sample

1. Install dependencies. Note that these samples assume you are in the sub-directory for the sample.

```shell
npm install
```

2. Optional (if you wish to pin the version of HERE Core UI to version 23.0.0 and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://resources.here.io/docs/core/manage/desktops/dos/).
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

5. At this point you will be prompted to log in to your ServiceNow instance), and to authorize your App's request for permissions.

6. Assuming login and authorization was successful, HERE Home will appear. Start typing in Home and your ServiceNow case, tasks and incidents will be searched.

7. Build the project if you have modified the code.

```shell
npm run build
```

## What does it look like?

When performing a search you should see results similar to the following.

![ServiceNow Integration](servicenow-integration.gif)

### Note About This Example

This is an example of how to use our APIs to configure HERE Core UI. It's purpose is to provide an example and provide suggestions. This is not a production application and shouldn't be treated as such. Please use this as a guide and provide feedback. Thanks!

---
