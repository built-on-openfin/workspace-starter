# Get User Decision For Before Unload

## What is this?

Workspace has the ability to listen to the content/app loaded within a browser window. If that content/app has a `beforeunload` event listener and it prevents the default close behavior using e.preventDefault(); then a platform can be notified of this and decide how to react (should it notify the user and ask for confirmation on whether the close action should continue or should it just close).

This module does one thing. It provides a platform override for the function **getUserDecisionForBeforeUnload**. For this function to be called we need the following:

- The "enableBeforeUnload" setting has to be set to true in the platform section of your [manifest](../../../../../public/manifest.fin.json).
- You need to provide a **getUserDecisionForBeforeUnload** override in your platform override. We do this through this example module's [platform-override](./platform-override.ts).
- To see it in action you need to have an app that adds an event listener for "beforeunload" and calls e.preventDefault(). We have added an example app to our app catalogue called **Example Warn Before Closing App** and it prevents the default close behavior if you have text inside of the textbox and doesn't if the textbox is empty. The example comes from our container starter example: [Implement Warn Before Closing Dialog](https://github.com/built-on-openfin/container-starter/tree/main/how-to/use-platform/warn-before-closing-dialog).

## How is it configured?

This example module is defined as a platform override module in a manifest or settings service:

```json
{
  "id": "get-user-decision-for-beforeunload",
  "icon": "http://localhost:8080/favicon.ico",
  "title": "get user decision for beforeunload",
  "description": "get user decision for beforeunload",
  "enabled": true,
  "url": "http://localhost:8080/js/modules/platform-override/get-user-decision-for-beforeunload.bundle.js",
  "data": {
    "title": "Unsaved content changes",
    "message": "You have unsaved changes in your content. Are you sure you want to close this {CLOSE_TYPE}?",
    "cancelButtonLabel": "Cancel",
    "closeButtonLabel": "Close"
  }
}
```

This is defined in the modules section of the platformProvider settings.

Order is important when it comes to platform and interop overrides. The request will hit the first entry in the array and every time super.x is called it will go to the next entry in the array until it hits the default implementation.

The module makes use of our dialog helper to create a popup to get a decision from the user. There are default labels for the title, message and buttons but this example shows how different labels can be provided through configuration.

## How can I test this?

- You would enable this module in the manifest.fin.json file in the public folder by copying the configuration from above.
- You would launch the platform using npm run client
- You would then launch the **Example Warn Before Closing App** through home (or store).
- You would close the window and see that no dialog was shown.
- You would launch the **Example Warn Before Closing App** again but this time add some text into the textbox.
- You would close the window and see that a dialog was shown to ask for confirmation.

## Where can I find out more about Platform Overrides

[How To Customize Your Platform Override](../../../../../docs/how-to-customize-your-platform-override.md)
