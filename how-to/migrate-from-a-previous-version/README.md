<img src="../../assets/OpenFin-Workspace-Starter.png" width="100%" alt="OpenFin Workspace Example Application -- Adding your application to Storefront" />

OpenFin Workspace is currently **only supported on Windows**.

# Migrate from a previous version - From v1-v3 to v4

With Workspace 4.0, OpenFin has introduced the ability for Workspace customers to have  more granular control of their Workspace implementation. This control is enabled through Workspace by exposing an API that allows for Provider Apps to perform the function of a CLI Provider. This approach allows Provider Apps to register with the Home API and then perform such actions as:

Manage the application, view and workspaces content available in Workspace
Provide an async (aka “lazy”) Search
Provide in-memory auto-complete Search
Display icons for all registered Providers in the Home/Search UI 
Selecting a given CLI provider icon to show the results from that provider
Apply icons/ logos 

With the addition of the CLI Provider concept, OpenFin has deprecated Workspace Desktop Owner Setting overrides (customConfig options ) that pertain to apps and workspaces REST URLs in favor of this programmatic API approach.

## Behavior Changes
* The fins link or desktop icon to start workspace components is no longer supported. These must be started by a workspace platform or CLI provider. The system will now return an error if the fins link is used to start a workspace component.
* The “/W” entry point into the Workspaces directory has been removed. 
* The command buttons (Storefront, Notifications etc) no longer show on the Home UI. They are available as root commands by typing /. 
* You can no longer specify a Content Discovery Service (CDS). An example is available for how to mimic this functionality using the new APIs available in the howto.
* Home and Store are now enabled by default. However, they will not show unless a platform has registered with them.
* Workspace service is no longer supported. Any saved workspaces are only saved locally. Additional workspace related APIs will be released in upcoming releases.
* Unlike the v1 search API, you must select a CLI provider to see the results from that provider. However, if only one provider is registered then it is automatically selected.

## I used DesktopOwnerSettings to configure the logo. How do I do that now?

Instead of configuring the logo through DesktopOwnerSettings:

```javascript
"style": {
            "iconUrl": "https://yourserver/favicon-16x16.png"
         }
```

You can now import Home from @openfin/workspace to register your application against Home. The icon setting lets you specify your logo without needing DesktopOwnerSettings.

```javascript
 const cliProvider: CLIProvider = {
    title: "title",
    id: "id",
    icon: "http://pathto/icon",
    onUserInput: onUserInput,
    onResultDispatch: onResultDispatch
  };

  await Home.register(cliProvider);
```
The how to samples provide a basic how to example ([how-to/register-with-home-basic](../register-with-home-basic/readme.md)) as well as a more complex example ([how-to/register-with-home](../register-with-home/readme.md)).

## I used DesktopOwnerSettings to configure the apps. How do I do that now?

Instead of configuring the apps endpoint through DesktopOwnerSettings:

```javascript
 "appDirectoryUrl": "https://yourserver/api/apps"
```
You can now import Home from @openfin/workspace to register your application against Home. The onUserInput and onResultDispatch setting lets you specify functions to determine what results to return based on user queries and the ability to respond to a user selection.

```javascript
 const cliProvider: CLIProvider = {
    title: "title",
    id: "id",
    icon: "http://pathto/icon",
    onUserInput: onUserInput,
    onResultDispatch: onResultDispatch
  };

  await Home.register(cliProvider);
``` 
  
We have an example ([how-to/register-with-home](../register-with-home/readme.md)) that shows how to register against Home, query a rest endpoint that matches the appDirectoryUrl format and map that to a collection of search results to display in Home.

## I used DesktopOwnerSettings to configure a share url. How do I do that now?
  
If you have never configured a share url in DesktopOwnerSettings then we recommend not starting that now as we are looking at having an API driven approach. If you already have this configured then it will continue to work in version 4 of OpenFin Workspace.

```javascript
 "shareUrl": "https://yourserver/api/share"
```

## I used DesktopOwnerSettings to configure a workspace url. How do I do that now?

This DesktopOwnerSetting is no longer supported in version 4. Please reach out to support or a Solutions Engineer to go over alternate approaches.

```javascript
 "workspacesUrl": "https://yourserver/api/workspaces"
```

## I used the @openfin/search-api npm module to populate Home with my apps. How do I do that now?

We have examples of using the search api to populate a list of applications in our version 3 branch. The example: ([how-to/register-with-home](../register-with-home/readme.md)) is an updated version of the **how-to/add-an-application-to-workspace-via-api** example. You will notice that both examples still follow the same approach. The main difference can be found by comparing search.ts against home.ts. You will see that @openfin/workspace is used instead of @openfin/search-api and that workspace.ts is also no longer needed.

## Will the views that I developed need changing with version 4?

No, views will continue to behave in the same way.

## Will I lose my saved pages/workspaces?

No, your pages and workspaces will still be listed in Home.

## I am still on version 3, have the examples gone?

No, there is a version 3 branch configured to help teams who are still on version 3.

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/workspace-overview). 
