> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Add Custom Actions For Menus And Buttons

Actions are registered with the core workspace platform and can be triggered from menus, buttons etc.

You can implement actions by following the module pattern, see [How To Add A Module](./how-to-add-a-module.md).

## Configuration

As mentioned above actions follow the module pattern, a simple module added to the manifest could be:

```json
"actionsProvider": {
    "modules": [
        {
            "enabled": true,
            "id": "my-actions",
            "url": "http://localhost:8080/js/modules/conditions/my-actions.bundle.js"
        }
    ]
}
```

## Implementation

If you implement an actions module your provider can return a number of actions. These are essentially async methods which are called when the action is triggered. The payload that is passed in to the action can contain `customData` specific to the type of action. If you have the same action connected to multiple places in the platform you can identity the source of the trigger by looking at the `payload.callerType`

```ts
class MyActions {
  public async get(): Promise<CustomActionsMap> {
    const actionMap: CustomActionsMap = {};

    actionMap['launch-view'] = async (payload: CustomActionPayload) => {
      if (payload.callerType === this._helpers.callerTypes.GlobalContextMenu) {
        await this._helpers.launchView(payload.customData.url);
      }
    };

    return actionMap;
  }
}
```

You also need the entry point exported from the module.

```ts
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
  actions: new MyActions()
};
```

## Using actions

We can trigger actions from other parts of the platform by configuring the interactions to trigger the specific action ids:

- Global Browser Menu see [manifest.fin.json](../public/manifest.fin.json#180)
- Page Menu see [manifest.fin.json](../public/manifest.fin.json#233)
- View Menu see [manifest.fin.json](../public/manifest.fin.json#249)
- Buttons see [manifest.fin.json](../public/manifest.fin.json#281)

## Source reference

- [actions.ts](../client/src/framework/actions.ts)
- [actions-shapes.ts](../client/src/framework/shapes/actions-shapes.ts)
