# Application Url and Access Validator

## What is this?

This is an example and this type of logic is best placed on the server (to reduce load on the client) but we are giving a client example to show you a simple example and to demonstrate how platform overrides can be used for very specific use cases.
This module is off by default and the configuration is not in the manifest but you can turn it on to see quick examples by using the configuration below.

This example is related to the following scenario:

- I (Platform Owner) have a list of apps - those apps might be a view, window or a snapshot that is a collection of apps
- I allow my users to save Pages, Workspaces or share a Page or Workspace

What happens when:

- The saved page or workspace is loaded but the url for a particular app e.g. companyx.com/v1/app.html has been updated to companyx.com/v2/app.html?
- The user (or the user that has received the shared page/workspace) no longer has access to an app (or never did in the case of sharing a page/workspace)?
- There is one app (e.g. Salesforce) which might be an app in my directory with a starting point url but the app can be launched with different urls (e.g. pointing to a company or user) and I don't want the url to change in that scenario when the page or workspace is loaded.

## What does it do?

It provides an override for applySnapshot (used when loading snapshots and workspaces) and getPage (used for fetching a page to add it to a window).

- Each override function calls a common function that goes through the data finding view or window entries that are listed as apps.
- If it is an app then it determines whether or not the app allows the apps url to be updatable (then it leaves the last url saved) or if the app url is overridden (then it takes the overridden url rather than getting it from a manifest or inline manifest).
- If it is an app that is not present in the app directory then it replaces the url with the defined (through module settings) no access page and passes the appId using customData (so the target page can decide what to do with that information).

## How is it configured?

This example module is defined as a platform override module in a manifest or settings service:

```json
{
     "id": "application-url-and-access-validator",
     "icon": "http://localhost:8080/favicon.ico",
     "title": "Application Url and Access Validator",
     "description": "This is an example platform override module that shows how you could validate a saved page, workspace or an application snapshot (if it combines apps) to ensure that it is using the latest url for the applications used and that the user still has access to that app.",
     "enabled": false,
     "url": "http://localhost:8080/js/modules/platform-override/application-url-and-access-validator.bundle.js",
     "data": {
      "deniedAccessUrl": "http://localhost:8080/common/views/platform/no-access/no-access.html"
     }
},
```

This is defined in the modules section of the platformProvider settings.

Order is important when it comes to platform and interop overrides. The request will hit the first entry in the array and every time super.x is called it will go to the next entry in the array until it hits the default implementation.

For this example we want to intercept the getPage request **before** the default workspace platform starter implementation. This lets our module get the page from the workspace platform starter platform override module (which might call super.getPage to call the default implementation or it can return the page if it has been configured to store pages in a backend server). If this module was placed after the workspace platform starter module in the array and it was configured to save and get pages from a server then our implementation of getPage would never be called.

## How can I test this?

- You would enable this module in the manifest.fin.json file in the public folder.
- You would launch the platform using npm run client
- You would then launch the call app and some other apps through home (or store).
- You would use the browser to save a page e.g. 'page with call' and a workspace e.g. 'call wks'.

### Access Denied

- Navigate to the place where the call app is defined: [public/common/apps-contact.json](../../../../../public/common/apps-contact.json)
- You will find the call-app defined in the top of the list. Change the id of call-app to call-app-2 and save the file (we cache the app directory for 10 seconds by default so it should pick up the new changes).
- Close the page 'page with call' that has the call app.
- Save a second workspace e.g. 'no call wks' to make it the current workspace.
- Now launch the page 'page with call' -> You should see the page launch with the access denied view
- Switch workspaces to load 'call wks' -> You should see the workspace load and the access denied view show where you had saved it in the workspace.

### App Url Changed

- Switch back to the 'no call wks' so that you have a layout that doesn't have any apps that have had changes.
- Go back to the call app entry in [public/common/apps-contact.json](../../../../../public/common/apps-contact.json) to see where the view manifest is located.
- Navigate to the folder containing the call-app.view.fin.json file ([public/common/views/contact](../../../../../public/common/views/contact/)) and open call-app.view.fin.json
- Update the url inside the manifest to <https://www.google.com> (just to make it easy to see the change).
- Now launch the page 'page with call' -> You should see the page launch with the google site shown
- Switch workspaces to load 'call wks' -> You should see the workspace load and the google page should show where you had saved the call app in the workspace.

If inline-view or inline-window was used then the logic will fetch the url from the inline manifest as it doesn't need to do a fetch to get an external json file.

## Where can I find out more about Platform Overrides

[How To Customize Your Platform Override](../../../../../docs/how-to-customize-your-platform-override.md)
