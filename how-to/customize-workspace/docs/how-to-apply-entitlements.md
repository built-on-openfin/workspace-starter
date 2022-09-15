> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How to apply entitlements

Entitlements can be seen in two ways:

- What information is the platform returning for the specific user
- What are the entitlements a user has for a particular app that is launched

Customize workspace does not provide support for the second option. That should be down to the individual content providers (see [what is a content provider](./what-is-a-content-provider.md)) unless your organization already has a centralized entitlements system.

# What information is the platform returning for the specific user

To return configuration related to a specific user then you need to ensure you have authentication setup (see [how to authenticate](./how-to-authenticate.md)). Once authenticated your platform can call a service to receive configuration specific to that user.

## Configuring dynamic settings

Customize Workspace lets you add all the settings for a workspace platform in the customSettings section of a manifest (see [manifest.fin.json](../public/manifest.fin.json)). This makes it useful if you wish to experiment with options easily and if you don't need to return different settings by user/group.

If you need to return different settings by user then you can have a cut down manifest (see [second.manifest.fin.json]) which only includes the authProvider definition and an endpointProvider definition (see [how to define endpoints](./how-to-define-endpoints.md)) that includes an endpoint for returning the settings (this will override the settings in the manifest and will be the settings returned to the other parts of the platform).

```json
"customSettings": {
		"authProvider": {
			"modules": [
				{
					"id": "example",
					"url": "http://localhost:8080/js/modules/auth/example.bundle.js",
					"data": {
						"autoLogin": false,
						"loginUrl": "http://localhost:8080/windows/modules/auth/example-login.html",
						"logoutUrl": "http://localhost:8080/windows/modules/auth/example-logged-out.html",
						"authenticatedUrl": "http://localhost:8080/windows/modules/auth/example-logged-in.html",
						"checkLoginStatusInSeconds": 1,
						"checkSessionValidityInSeconds": -1
					}
				}
			]
		},
		"endpointProvider": {
			"modules": [],
			"endpoints": [
				{
					"id": "platform-settings",
					"type": "fetch",
					"options": {
						"method": "GET",
						"url": "http://localhost:8080/settings.json"
					}
				}
			]
		}
	}
```

The customize workspace settings service will check for an endpoint with an id of "**platform-settings**". Endpoints can have custom logic and can source data using it's preferred approach (rest calls, data from a websocket connection, data from local storage or even mock data). The above configuration is using the built in fetch endpoint implementation so you can pass fetch options as well as the url. The above example is doing a get request to the hosted [settings.json](../public/settings.json) file but this could be a rest endpoint instead.

You now have the option of how many of the settings on offer will be user specific vs general.

### Example of settings that can be customized

All settings could be customized for the user but here are some examples:

- Store layout and categories (see [how to customize store](./how-to-customize-store.md))
- Browser menu options (see [how to customize browser](./how-to-customize-browser.md))
- Dock options (see [how to customize dock](./how-to-customize-dock.md))
- Home options (see [how to customize home](./how-to-customize-home.md))
- What types of apps they are allowed to launch (e.g. not allowed to launch/see native apps see [how to define apps](./how-to-define-apps.md))
- What logging should a user have and at what log level (see [how to support your platform](./how-to-support-your-platform.md))
- What theme they should be presented with (see [how to theme your platform](./how-to-theme-your-platform.md))

### Requesting Apps for Home, Store, Dock

When we do a request for applications (see [how to define apps](./how-to-define-apps.md)) then that source could also filter the apps that are returned based on who the user is or the role/group they are in.
