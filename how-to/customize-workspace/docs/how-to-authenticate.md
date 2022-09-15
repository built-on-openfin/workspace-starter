> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Authenticate

This section covers how you can configure authentication for your platform.

## Do I need authentication?

It may be that your platform is internal and you are using windows authentication or a seamless SSO setup where your platform doesn't need to request authentication from the user as any requested services would be able to determine who the user is.

It may be that you have a platform that should return the same apps to every user (they might need to log into individual apps) and you are happy storing preferences, workspaces and saved pages locally.

## What if I need authentication?

Customize workspace lets you plug in your own authentication logic via config and a custom JavaScript Module (see [how to add a module](./how-to-add-a-module.md)) via the authProvider setting and adding it to the modules array. This array only supports a single module. If you add more than one then a warning will be logged and the auth flow will not take place.

### Example Auth Module

We provide a basic example authentication module to give you an idea of how it works and it is referenced in our [second.manifest.fin.json](../public/second.manifest.fin.json) example:

```json
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
						"checkSessionValidityInSeconds": -1,
                        "loginHeight": 250,
                        "loginWidth": 400
					}
				}
			]
		},
```

This is an example of a module (see [how to add a module](./how-to-add-a-module.md)) that has been created and referenced in the authProvider modules array. Each module can be passed data in a format that the specific module understands.

The source for this example module can be found here: [client/src/modules/auth/example/auth-provider.ts](../client/src/modules/auth/example/auth-provider.ts). It is exported from [client/src/modules/auth/example/index.ts](../client/src/modules/auth/example/index.ts) and it is built on it's own via a [webpack](../client/webpack.config.js) entry.

This example module is there for you to test different auth flows (e.g. autoLogin) and to give an example of how a module could be built and plugged in. The settings are:

| Property                      | Description                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| autoLogin                     | This is if you want to skip the login flow and just pretend that you are logged in.                                      |
| loginUrl                      | What is the url of the page that will be used to login?                                                                  |
| logoutUrl                     | What url should be opened when you want to clear your auth session and logout?                                           |
| authenticatedUrl              | Which is the url we should check for to determine if you are authenticated?                                              |
| checkLoginStatusInSeconds     | How often should we check to see if you have logged in successfully?                                                     |
| checkSessionValidityInSeconds | Once logged in how often should we check to see if your session is still valid. -1 or undefined means we will not check. |
| loginHeight                   | How tall should the login window be (default is 250px)                                                                   |
| loginWidth                    | How wide should the login window be (default is 400px)                                                                   |

To implement your own auth module you just need to follow the following interface:

```javascript
/**
 * The types of events that an auth provider can emit.
 */
export type AuthEventTypes = "logged-in" | "before-logged-out" | "logged-out" | "session-expired";

/**
 * Definition for module which provides authentication features.
 */
export interface AuthProvider {
    /**
	 * Initialise the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	initialize?(definition: ModuleDefinition<O>, loggerCreator: LoggerCreator, helpers?: H): Promise<void>;

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	closedown?(): Promise<void>;

	/**
	 * Subscribe to one of the auth events.
	 * @param to The event to subscribe to.
	 * @param callback The callback to fire when the event occurs.
	 * @returns Subscription id for unsubscribing or undefined if event type is not available.
	 */
	subscribe(to: AuthEventTypes, callback: () => Promise<void>): string | undefined;

	/**
	 * Unsubscribe from an already subscribed event.
	 * @param subscriptionId The id of the subscription returned from subscribe.
	 * @returns True if the unsubscribe was successful.
	 */
	unsubscribe(subscriptionId: string): boolean;

	/**
	 * Does the auth provider require authentication.
	 * @returns True if authentication is required.
	 */
	isAuthenticationRequired(): Promise<boolean>;

	/**
	 * Perform the login operation on the auth provider.
	 * @returns True if the login was successful.
	 */
	login(): Promise<boolean>;

	/**
	 * Perform the logout operation on the auth provider.
	 * @returns True if the logout was successful.
	 */
	logout(): Promise<boolean>;

	/**
	 * Get user information from the auth provider.
	 */
	getUserInfo<T>(): Promise<T>;
}
```

The initialize and closedown functions come from a ModuleImplementation base interface but have been added to the example above to improve clarity. At this stage we do not pass helpers to the initialize function but that may be provided in the future based on use cases. To see what is included in a definition please read more about [how to add a module](./how-to-add-a-module.md). But one key thing to know is that the module definition includes a data property that can be used to provide your implementation with custom data as seen by the example module.

The events are important as they are used by the platform to determine the flow of events (are they logged in, has the user's session expired etc). The [how to add a module](./how-to-add-a-module.md) will also cover how to generate the types for your module to make it easier to build your own without a dependency on the files within the src folder.

To export your auth module it is important to export an entryPoints object with an auth property.

```javascript
export const entryPoints = {
  auth: authImplementation
};
```

entryPoints let you have more than one moduleType implemented in a single JavaScript module or you could have a module per moduleType.
