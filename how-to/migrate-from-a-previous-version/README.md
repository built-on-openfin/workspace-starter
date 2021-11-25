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

The logo setting is still supported for Desktop Owners and is used to specify the default logo for Home, Browser, the Dock and TaskBar Icons:

```javascript
"style": {
            "iconUrl": "https://yourserver/favicon-16x16.png"
         }
```
The new API approach will let you register your logo for Home without the need for DesktopOwnerSettings (configuring the logo for Browser etc will be available in a future release).

You can import Home from @openfin/workspace to register your application against Home. The icon setting lets you specify your logo.

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
The how to samples provide a basic how to example ([how-to/register-with-home-basic](../register-with-home-basic/)) as well as a more complex example ([how-to/register-with-home](../register-with-home/)).

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
  
We have an example ([how-to/register-with-home](../register-with-home/)) that shows how to register against Home, query a rest endpoint that matches the appDirectoryUrl format and map that to a collection of search results to display in Home.

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

We have examples of using the search api to populate a list of applications in our version 3 branch. The example: [how-to/register-with-home](../register-with-home/) is an updated version of the version 3 <a href="https://github.com/built-on-openfin/workspace-starter/tree/workspace/v3.0.0/how-to/add-an-application-to-workspace-via-api" target="_blank">how-to/add-an-application-to-workspace-via-api</a> example. You will notice that both examples still follow the same approach. The main difference can be found by comparing search.ts against home.ts. You will see that @openfin/workspace is used instead of @openfin/search-api and that workspace.ts is also no longer needed.

## Will the views that I developed need changing with version 4?

No. Views will continue to behave in the same way.

## Will I lose my saved pages/workspaces?

No. Your pages and workspaces will still be listed in Home.

## I am still on version 3, have the examples gone?

No. There is a version 3 branch configured to help teams who are still on version 3: <a href="https://github.com/built-on-openfin/workspace-starter/tree/workspace/v3.0.0/" target="_blank">https://github.com/built-on-openfin/workspace-starter/tree/workspace/v3.0.0/</a>

## I am not ready to move to OpenFin Workspace v4, how do I stick with version 3?

To stay on version v3 you can do the following:

##### Use Version 3 Examples 

Clone the <a href="https://github.com/built-on-openfin/workspace-starter/tree/workspace/v3.0.0/" target="_blank">version 3 branch</a> and run the npm run dos command on any of the how-to samples. You will need to have the local server running to serve the dos.json file.

##### Create your own dos file and point to it   

Create your own dos file:
```javascript
 {
  "desktopSettings": {
    "systemApps": {
      "workspace": {
        "version": "3.0.0"
      }
    }
  }
}
```
To configure Desktop Owner Settings you will need to be able to modify your registry settings. This can be done by scripts, applications or by hand. 

You need to add a registry key:

```javascript
Key   :     HKEY_CURRENT_USER\Software\OpenFin\RVM\Settings\DesktopOwnerSettings
Type  :     String
Value :     file:\\\C:\PATH\TO\YOUR\FOLDER\registry_dos_local.json
```

##### Adding/Updating the DesktopOwnerSetting by hand using RegEdit

To add/update this setting we are going to launch RegEdit from the command line (or you can launch it from the Windows Start Bar) by typing regedit and hitting enter.

You will be presented with RegEdit where you can expand the folders until you get to OpenFin\RVM\Settings.
If you see “DesktopOwnerSettings” it means that this has already been set by your organisation. Please check with your organisation’s desktop owner so that configuration can take place with their awareness.

![](registry.png)

If no DesktopOwnerSettings value exists then please add it by right clicking on OpenFin/RVM/Settings and adding a new string value:

![](registry-add-key.png)

You will provided an entry in the Settings Folder that you can rename to **DesktopOwnerSettings**. Double click on the new entry to set the value to a file path e.g.:

**file:\\\C:\PATH\TO\YOUR\FOLDER\registry_dos_local.json**

or a url (if you have a webserver):

**http://localhost:8080/registry_dos_local.json**

##### Once you have configured DesktopOwnerSettings

Once you have done either of the approaches above you need to:

* Use TaskManager, ProcessExplorer or the command line to close all OpenFin applications (so that the new DesktopOwnerSettings will get picked up).

* Launch OpenFin Workspace using the system apps fins link (this will pick up your version setting and update any desktop shortcuts): <a href="fins://system-apps/workspace" target="_blank">fins://system-apps/workspace</a>

You should now see version 3 of OpenFin Workspace.

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace). 
