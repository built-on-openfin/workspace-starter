![OpenFin Workspace Example Application -- Adding your application to OpenFin Workspace (Home, Browser & Store)](../../assets/OpenFin-Workspace-Starter.png)

> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

# Integrate With Salesforce

OpenFin Workspace empowers you to browse and search your Salesforce org data using OpenFin Home, via our Salesforce integration API. OpenFin Home provides you with a fast and intuitive interface for discovering your Salesforce data, and OpenFin Browser lets you create layouts from your Salesforce org pages to enhance your productivity.

This application you are about to install is an example of configuring and integrating your Salesforce org with OpenFin Home, allowing you to launch your Salesforce org site in a themed OpenFin Browser, search for Accounts and Contacts, and use filters to refine the results. This example assumes you have already [set up your development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment).

## Running the Sample

To run this sample you can:

- Clone this repo and follow the instructions below. This will let you customize the sample to learn more about our APIs.

## Getting Started

### Configure Salesforce

Before you can integrate your Salesforce org with OpenFin Home, you must following the required [configuration steps](https://developers.openfin.co/of-docs/docs/salesforce-openfin) for our Salesforce integration.

When configuring CORS, the URL that you need to add is: `http://localhost:8080`, corresponding to the hostname and port number that this sample uses.

Once you have completed the configuration steps, update the `customSettings` section in the sample app's [manifest file](./public/manifest.fin.json) as follows:

- **`orgUrl`**: the URL of your Salesforce org (ending in "my.salesforce.com")
- **`consumerKey`**: the Consumer Key of the Connected App you just created

Optionally, if the enhanced notes feature is [enabled](https://help.salesforce.com/s/articleView?id=sf.notes_admin_setup.htm&type=5), this sample will include notes in the search results displayed in Home.

With Salesforce configured and the sample custom settings updated, you can continue to run the sample.

For more advanced configuration of the data that is searched and displayed see [Advanced Configuration](#advanced-configuration)

### Run The Sample

1. Install dependencies. Note that these samples assume you are in the sub-directory for the sample.

```shell
npm install
```

2. Optional (if you wish to pin the version of OpenFin Workspace to version 14.0.17 and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/docs/desktop-owner-settings).
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

5. At this point you will be prompted to log in to your Salesforce org (unless you have single sign-on configured), and to authorize your Connected App's request for permissions.

6. Assuming login and authorization was successful, OpenFin Home will appear. Press the Enter key to display the default "Browse Salesforce" result that will open your Salesforce org in OpenFin Browser. To search for Accounts and Contacts, type a query into Home and click on a result to open the relevant detail page in OpenFin Browser.

7. Build the project if you have modified the code.

```shell
npm run build
```

## What does it look like?

![Salesforce Integration](workspace-salesforce-integration.gif)

### Note About This Example

This is an example of how to use our APIs to configure OpenFin Workspace. It's purpose is to provide an example and provide suggestions. This is not a production application and shouldn't be treated as such. Please use this as a guide and provide feedback. Thanks!

## Advanced Configuration

### Data sources and layout

The default configuration for the module uses the following sources and fields.

- Account - Id, Name, Industry, Phone, Type, Website, Description
- Contact - Id, Name, Title, Department, Email, Phone
- Task - Id, Subject, Status, CreatedById, CreatedDate, Description
- ContentNote - Id, Title, CreatedById, CreatedDate, TextPreview
- Chatter - Id, header, createdDate, body

You can override either part or all of the objects by using the `mapping` entry of the config in the manifest.

To keep everything else intact but not include a specific type e.g. Task, you can specify the following.

```json
mappings: [
    { "sourceType": "Account" },
    { "sourceType": "Contact" },
    { "sourceType": "ContentNote" },
    { "sourceType": "Chatter" }
];
```

You can change the fields that are retrieved for an object, and the way it is displayed using the following syntax.

```json
mappings: [
    ...
    {
        "sourceType": "Contact",
        "label": "Address book", // The label you see in Home for the type and filters
        "iconKey": "address", // The key of the icon in the iconMap property of the config
        "lookupType": "search", // This determines the type of REST request made e.g. Chatter uses feed
        "maxItems": 5, // The maximum number of items to retrieve, defaults to 10
        "fieldMappings": [
            {
                "field": "Id", // The data field to use
                "displayMode": "None" // Don't display on the result card
            },
            {
                "field": "Name", // The data field to use
                "displayMode": "initials" // Display as profile initials e.g. Avi Green shows AG styled as an icon
            },
            {
                "field": "Name", // The data field to use
                "displayMode": "header", // Display in the header of the card
                "isResultTitle": true // Use as the title for the result
            },
            {
                "field": "Title", // The data field to use
                "displayMode": "sub-header" // Display in the header as a subtitle
            },
            {
                "field": "Department", // The data field to use
                "displayMode": "field", // Display on the card as a row of data
                "fieldContent": "text", // Display the value as text
                "label": "Department" // The label to show on the card
            },
            {
                "field": "Email", // The data field to use
                "displayMode": "field", // Display on the card as a row of data
                "fieldContent": "link", // Display as a hyperlink
                "label": "Email" // The label to show on the card
            },
            {
                "field": "CreatedDate", // The data field to use
                "displayMode": "field", // Display on the card as a row of data
                "fieldContent": "date", // Display as a locally formatted data
                "label": "Created On" // The label to show on the card
            },
            {
                "field": "Description", // The data field to use
                "displayMode": "field", // Display on the card as a row of data
                "fieldContent": "memo",// Display as text the full width of the card
                "label": "Comments" // The label to show on the card
            }
        ]
    }
    ...
];
```

Sometimes the data returned contains only an Id which needs a secondary lookup, e.g. in the case of the `Task` `CreatedById`. The lookup can be automatic using the following configuration for a `fieldMapping`.

```json
{
  "field": "CreatedById", // The data field to use
  "displayMode": "field", // Display on the card as a row of data
  "label": "Created By", // The label to show on the card
  "reference": {
    "sourceType": "User", // The secondary data source to lookup from
    "field": "Name" // The secondary field to use for the data
  }
}
```

In summary the `displayMode` can be:

- `none` - Don't display the data
- `icon` - The data is treated as a url to an image
- `initials` - Display as the initials as a profile image
- `header` - Display as the main header on the card
- `sub-header` - Display as a sub header on the card
- `field` - Display as a data field in the body of the card

In summary the `fieldContent` for `fields` can be:

- `text` - Display a plain text with a label
- `link` - Display as a hyperlink
- `memo` - Display as text the full width of the card
- `date` - Display as a locally formatted date

### Card actions

The cards have a default action button which opens Salesforce at the relevant entry, but this can be overridden. You can specify urls and intents to perform other operations.

You could override the actions for a contact as follows:

```json
mappings: [
    {
        "sourceType": "Contact",
        "actions": [
            {
                "label": "Salesforce", // The label for the action
                "iconKey": "salesforce" // The icon to use from the iconMap
                // By not populating url or intent the default open operation is performed
            },
            {
                "label": "Contact", // The label for the action
                "iconKey": "contact", // The icon to use from the iconMap
                "url": "https://mydomain.com/?id={Id}&Name={Name}" // Open the url in a browser window, substituting the Id and Name in to the url
            },
            {
                "label": "Dashboard", // The label for the action
                "iconKey": "dashboard", // The icon to use from the iconMap
                "intent": { // Raise an intent
                    "name": "ViewContactDashboard", // Name of the intent
                    "context": {
                        "name": "{Name}", // Name of the data in the context
                        "type": "fdc3.contact", // The type of the context data
                        "id": {
                            "email": "{Email}", // Substitute data for the type
                            "salesforce": "{Id}" // Substitute custom data for the type
                        }
                    }
                }
            }
        ]
    }
];
```

---

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace)
