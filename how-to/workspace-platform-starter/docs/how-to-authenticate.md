> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Authenticate

This section covers how you can configure authentication for your platform.

## Do I Need Authentication?

It may be that your platform is internal and you are using windows authentication or a seamless SSO setup where your platform doesn't need to request authentication from the user as any requested services would be able to determine who the user is.

It may be that you have a platform that should return the same apps to every user (they might need to log into individual apps) and you are happy storing preferences, workspaces and saved pages locally.

## What If I Need Authentication?

Workspace platform starter lets you plug in your own authentication logic via config and a custom JavaScript Module (see [How To Add A Module](./how-to-add-a-module.md)) via the authProvider setting and adding it to the modules array. This array only supports a single module. If you add more than one then a warning will be logged and the auth flow will not take place.

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
}
```

This is an example of a module (see [How To Add A Module](./how-to-add-a-module.md)) that has been created and referenced in the authProvider modules array. Each module can be passed data in a format that the specific module understands.

The source for this example module can be found here: [auth-provider.ts](../client/src/modules/auth/example/auth-provider.ts). It is exported from [index.ts](../client/src/modules/auth/example/index.ts) and it is built on it's own via a [webpack](../client/starter-modules.webpack.config.js) entry.

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

### OpenID Connect Example Module

OpenFin provider an OpenID Connect (OIDC) auth package [https://www.npmjs.com/package/@openfin/openid-connect](https://www.npmjs.com/package/@openfin/openid-connect) which performs the standard OIDC authentication handshake process.

We have provided an implementation of an auth module which uses the OIDC package, see [../client/src/modules/auth/openid-connect/auth.ts](../client/src/modules/auth/openid-connect/auth.ts)

This module is already added into the configuration for `authProvider` in [../public/manifest.fin.json](../public/manifest.fin.json), but it is not enabled by default. To enable the module set the `enabled` flag to true and complete the `providerUrl` and `clientId` properties for your OIDC provider.

```json
{
  "id": "openid-connect",
  "icon": "http://localhost:8080/favicon.ico",
  "title": "OpenId Connect",
  "description": "OpenId Connect",
  "enabled": true,
  "url": "http://localhost:8080/js/modules/auth/openid-connect.bundle.js",
  "data": {
    "providerUrl": "<PROVIDER_ID>",
    "clientId": "<CLIENT_ID>",
    "loginRedirectUrl": "http://localhost:8080/oidc_login.html",
    "logoutRedirectUrl": "http://localhost:8080/oidc_logout.html",
    "checkSessionValidityInSeconds": 30
  }
}
```

For a more in depth look at using the OIDC package you can take a look at the individual sample [How To Integrate With OpenID Connect (OIDC)](../../integrate-with-openid-connect/README.md)

### Implementing Your Own Auth Module

To implement your own auth module you just need to follow the following interface defined in [auth-shapes](../client/src/framework/shapes/auth-shapes.ts):

The `initialize` and `closedown` methods come from a `ModuleImplementation` base interface but have been added to the example above to improve clarity. At this stage we do not pass helpers to the initialize function but that may be provided in the future based on use cases. To see what is included in a definition please read more about [How To Add A Module](./how-to-add-a-module.md). But one key thing to know is that the module definition includes a data property that can be used to provide your implementation with custom data as seen by the example module.

The events are important as they are used by the platform to determine the flow of events (are they logged in, has the user's session expired etc). The [How To Add A Module](./how-to-add-a-module.md) will also cover how to generate the types for your module to make it easier to build your own without a dependency on the files within the src folder.

To export your auth module it is important to export an entryPoints object with an auth property.

```javascript
export const entryPoints = {
  auth: authImplementation
};
```

entryPoints let you have more than one moduleType implemented in a single JavaScript module or you could have a module per moduleType.

### Customizing Browser Based On Authenticated Status

When customizing browser (see [How To Customize Browser](./how-to-customize-browser.md)) with your own buttons and menu options you can specify a condition (see [How To Add Conditions](./how-to-add-conditions.md)) on whether or not that option should be shown. We provide a default condition out of the box:

- authenticated

Here is a snippet of a browser menu entry definition that makes use of this condition:

```json
{
  "include": true,
  "label": "Log Out and Quit App",
  "data": {
    "type": "Custom",
    "action": {
      "id": "logout-and-quit"
    }
  },
  "position": {
    "type": "Quit",
    "operation": "after"
  },
  "conditions": ["authenticated"]
}
```

This would present the Log Out and Quit App menu option underneath the Quit menu option. Please see [How To Customize Browser](./how-to-customize-browser.md) if you want to know more.

## Source Reference

- [auth-shapes.ts](../client/src/framework/shapes/auth-shapes.ts)

## Other Examples

We also have a few other examples if you would like to know more about authentication and OpenFin in general:

- [How To Integrate With OpenID Connect (OIDC)](../../integrate-with-openid-connect/README.md)
- [How To Integrate Server Authentication](../../integrate-server-authentication/README.md)

[<- Back to Table Of Contents](../README.md)
