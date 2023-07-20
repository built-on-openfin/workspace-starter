> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Apply Entitlements

Entitlements can be seen in two ways:

- What information is the platform returning for the specific user
- What are the entitlements a user has for a particular app that is launched

Workspace platform starter does not provide support for the second option. That should be down to the individual content providers (see [What Is A Content Provider](./what-is-a-content-provider.md)) unless your organization already has a centralized entitlements system.

# What Information Is The Platform Returning For The Specific User

To return configuration related to a specific user then you need to ensure you have authentication setup (see [How To Authenticate](./how-to-authenticate.md)). Once authenticated your platform can call a service to receive configuration specific to that user.

## Configuring Dynamic Settings

Workspace Platform Starter lets you add all the settings for a workspace platform in the customSettings section of a manifest (see [manifest.fin.json](../public/manifest.fin.json)). This makes it useful if you wish to experiment with options easily and if you don't need to return different settings by user/group.

If you need to return different settings by user then you can have a cut down manifest (see [second.manifest.fin.json](../public/second.manifest.fin.json)) which only includes the authProvider definition and an endpointProvider definition (see [How To Define Endpoints](./how-to-define-endpoints.md)) that includes an endpoint for returning the settings (this will override the settings in the manifest and will be the settings returned to the other parts of the platform).

```json
"customSettings": {
  "authProvider": {
   "modules": [
    {
     "id": "auth-example",
     "url": "http://localhost:8080/js/modules/auth/example.bundle.js",
     "data": {
      "autoLogin": false,
      "loginUrl": "http://localhost:8080/windows/modules/auth/example-login.html",
      "logoutUrl": "http://localhost:8080/windows/modules/auth/example-logged-out.html",
      "authenticatedUrl": "http://localhost:8080/windows/modules/auth/example-logged-in.html",
      "checkLoginStatusInSeconds": 1,
      "checkSessionValidityInSeconds": -1,
      "customData": {
       "userSessionId": "example-auth-data",
       "users": [
        { "name": "Josh Smith (Developer)", "email": "josh@smith.com", "role": "developer" },
        { "name": "Sam Barns (Sales)", "email": "sam@barns.com", "role": "sales" }
       ]
      }
     }
    }
   ]
  },
  "endpointProvider": {
   "modules": [
    {
     "id": "auth-example-endpoint",
     "url": "http://localhost:8080/js/modules/auth/example.bundle.js",
     "data": {
      "userSessionId": "example-auth-data",
      "roleMapping": {
       "developer": {
        "excludeAppsWithTag": ["expero", "contact", "manager", "irs"],
        "preferredScheme": "dark"
       },
       "sales": {
        "excludeAppsWithTag": ["tools", "developer", "versions"],
        "preferredScheme": "light",
        "excludeMenuAction": ["developer-inspect", "raise-create-app-definition-intent"]
       }
      }
     }
    }
   ],
   "endpoints": [
    {
     "id": "platform-settings",
     "type": "module",
     "typeId": "auth-example-endpoint",
     "options": {
      "method": "GET",
      "url": "http://localhost:8080/settings.json"
     }
    }
   ]
  }
 }
```

## Endpoint Ids

- platform-settings

## How the platform checks for settings

The workspace platform starter settings service will check for an endpoint with an id of "**platform-settings**". Endpoints can have custom logic and can source data using it's preferred approach (rest calls, data from a websocket connection, data from local storage or even mock data).

We have an example auth module that contains an auth provider and an endpoint provider. The purpose of this setup is to let you simulate server side filtering via the client side (so there is no server side logic dependency required in order to get an idea of how it could work). The auth module above has a customData setting that specifies a id to store the selected example user and a list of example users and associated role.

The same module is referenced in endpoints and has configuration that specifies the key for the current user and has a role mapping section to exclude things based on role.

The example auth module with auth provider and endpoint is not production code and is purely for demonstration purposes.
With this setup it will update the default [settings.json](../public/settings.json) file and the configured app endpoints based on the role.

You now have the option of how many of the settings on offer will be user specific vs general.

### Example Of Settings That Can Be Customized

All settings could be customized for the user but here are some examples:

- Store layout and categories (see [How To Customize Store](./how-to-customize-store.md))
- Browser menu options (see [How To Customize Browser](./how-to-customize-browser.md))
- Dock options (see [How To Customize Dock](./how-to-customize-dock.md))
- Home options (see [How To Customize Home](./how-to-customize-home.md))
- What types of apps they are allowed to launch (e.g. not allowed to launch/see native apps see [How To Define Apps](./how-to-define-apps.md))
- What logging should a user have and at what log level (see [How To Support Your Platform](./how-to-support-your-platform.md))
- What theme they should be presented with (see [How To Theme Your Platform](./how-to-theme-your-platform.md))

### Requesting Apps For Home, Store, Dock

When we do a request for applications (see [How To Define Apps](./how-to-define-apps.md)) then that source could also filter the apps that are returned based on who the user is or the role/group they are in.

[<- Back to Table Of Contents](../README.md)
