<img src="../../assets/OpenFin-Workspace-Starter.png" width="100%" alt="OpenFin Workspace Example Application -- Adding your application to OpenFin Workspace (Home, Browser & Store)" />

> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

# Integrate With Salesforce

OpenFin Workspace empowers you to browse and search your Salesforce org data using OpenFin Home, via our Salesforce integration API. OpenFin Home provides you with a fast and intuitive interface for discovering your Salesforce data, and OpenFin Browser lets you create layouts from your Salesforce org pages to enhance your productivity.

This application you are about to install is an example of configuring and integrating your Salesforce org with OpenFin Home, allowing you to launch your Salesforce org site in a themed OpenFin Browser, search for Accounts and Contacts, and use filters to refine the results. This example assumes you have already [set up your development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment).

---

**Running the Sample**

To run this sample you can:

- Clone this repo and follow the instructions below. This will let you customize the sample to learn more about our APIs.

---

## Getting Started

### Configure Salesforce

Before you can integrate your Salesforce org with OpenFin Home, you must following the required [configuration steps](https://developers.openfin.co/of-docs/docs/salesforce-openfin) for our Salesforce integration.

When configuring CORS, the URL that you need to add is: `http://localhost:8080`, corresponding to the hostname and port number that this sample uses.

Once you have completed the configuration steps, update the `customSettings` section in the sample app's [manifest file](./public/manifest.fin.json) as follows:

- **`orgUrl`**: the URL of your Salesforce org (ending in "my.salesforce.com")
- **`consumerKey`**: the Consumer Key of the Connected App you just created

Optionally, if the enhanced notes feature is [enabled](https://help.salesforce.com/s/articleView?id=sf.notes_admin_setup.htm&type=5), this sample will include notes in the search results displayed in Home.

With Salesforce configured and the sample custom settings updated, you can continue to run the sample.

### Run The Sample

1. Install dependencies. Note that these samples assume you are in the sub-directory for the sample.

```bash
$ npm install
```

2. Build the project.

```bash
$ npm run build
```

3. Optional (if you wish to pin the version of OpenFin Workspace to version 7.0.0) - Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/docs/desktop-owner-settings).
   This samples includes a utility (`desktop-owner-settings.bat`) that adds the Windows registry key for you, pointing to a local desktop owner
   settings file so you can test these settings. If you already have a desktop owner settings file, this script prompts to overwrite the location. Be sure to capture the existing location so you can update the key when you are done using this samples.

   (**WARNING**: This script kills all open OpenFin processes. **This is not something you should do in production to close apps as force killing processes could kill an application while it's trying to save state/perform an action**).

```bash
$ npm run dos
```

4. Start the test server in a new window.

```bash
$ start npm run start
```

5. Start Your Workspace Platform (this starts Workspace if it isn't already running).

```bash
$ npm run client
```

6. At this point you will be prompted to log in to your Salesforce org (unless you have single sign-on configured), and to authorize your Connected App's request for permissions.

7. Assuming login and authorization was successful, OpenFin Home will appear. Press the Enter key to display the default "Browse Salesforce" result that will open your Salesforce org in OpenFin Browser. To search for Accounts and Contacts, type a query into Home and click on a result to open the relevant detail page in OpenFin Browser.

## What does it look like?

![](workspace-salesforce-integration.gif)

## A note about this sample

This is an example of how to use our APIs to configure OpenFin Workspace. It's purpose is to provide an example and provide suggestions. This is not a production application and shouldn't be treated as such. Please use this as a guide and provide feedback. Thanks!

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace).
