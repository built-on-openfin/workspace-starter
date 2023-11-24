> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Extend Your Platform With Query Strings

The OpenFin platform can accept parameters when launching through deeplinks, for more information on this feature see the main documentation here [Deep linking](https://developers.openfin.co/of-docs/docs/deep-linking)

In short when you start a fin/fins link you can pass parameters as part of the launch `fins://mydomain.com/path-to-manifest/app.json?$$parameter1=value1&$$parameter2=value2`

To access these parameters in your platform you can do the following:

```js
const thisApp = fin.Application.getCurrentSync();
const info = await thisApp.getInfo();
const { userAppConfigArgs } = info.initialOptions;
console.log(userAppConfigArgs.parameter1);
console.log(userAppConfigArgs.parameter2);
```

If your platform is already running an event will be raised which gives you access to the new parameters.

```js
const thisApp = fin.Application.getCurrentSync();
thisApp.addListener('run-requested', (event) => {
  if (event.userAppConfigArgs) {
    console.log(event.userAppConfigArgs.parameter1);
    console.log(event.userAppConfigArgs.parameter2);
  }
});
```

You can implement functionality that will be triggered by specific init options by following the module pattern, see [How To Add A Module](./how-to-add-a-module.md) and adding them to the `initOptionsProvider.modules` section.

The query string parameters for init options modules follow a very specific pattern, they have an `action` which is a string and a `payload` which is a base64 encoded chunk of JSON e.g. for an action of `show-page` and a payload of `{ "pageId": "the-id-of-the-page" }` the link would be.

`fin://localhost:8080/manifest.fin.json?$$action=show-page&$$payload=eyAicGFnZUlkIjogImIwY2UxNTg3LTM2ZDAtNGRlZC05ZGU3LTlmNmQyYjc1OGYyNyIgfQ==`

## Configuration

As mentioned above init options follow the module pattern, a simple module added to the manifest could be as follows, where we specify the actions that the module supports:

```json
"initOptionsProvider": {
    "modules": [
        {
            "enabled": true,
            "id": "my-init-options",
            "url": "http://localhost:8080/js/modules/init-options/my-init-options.bundle.js",
            "data": {
                "supportedActions": ["my-action"]
            }
        }
    ]
}
```

## Implementation

If you implement an init options module the bare minimum that is required is to provide an `action` method. This method has two parameters, the action that was triggered by either the app launch/running, the decoded payload and the context launch/running.

```ts
/**
 * Handle the init options action.
 * @param requestedAction The requested action.
 * @param payload The payload for the action.
 * @param context The context calling the action.
 */
public async action(requestedAction: string, payload: MyPayload | undefined, context: ActionHandlerContext): Promise<void> {
}
```

You are free to perform whatever task you want within the action method, and can behave differently if the app was launched with the payload, or already running.

## Generate From Template

You can generate the scaffold for a new module by using the following command line, where "My Init Options" is the name you want to give your module:

```shell
npm run generate-module initOptions "My Init Options"
```

This will generate the code in the modules/init-options folder, add an entry into webpack to build it, and add it to the manifest so that the module is loaded.

## Source Reference

- [init-options.ts](../client/src/framework/init-options.ts)
- [launch app example module](../client/src/modules/init-options/launch-app/init-options.ts)
- [launch workspace example module](../client/src/modules/init-options/launch-workspace/init-options.ts)
- [share context or raise intent example module](../client/src/modules/init-options/interop/init-options.ts)

[<- Back to Table Of Contents](../README.md)
