> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Add Conditions

Conditions are used by other components in the platform to make decisions on when to enable/disable other features.

You can implement conditions by following the module pattern, see [How To Add A Module](./how-to-add-a-module.md).

## Configuration

As mentioned above conditions follow the module pattern, a simple module added to the manifest could be:

```json
"conditionsProvider": {
    "modules": [
        {
            "enabled": true,
            "id": "my-condition",
            "url": "http://localhost:8080/js/modules/conditions/my-condition.bundle.js"
        }
    ]
}
```

## Implementation

If you implement a conditions module your provider can return a number of conditions. These are essentially async methods which return a boolean.

```ts
class MyConditions {
  public async get(): Promise<ConditionMap> {
    const conditionMap: ConditionMap = {};

    conditionMap['has-some-value'] = async (platform: WorkspacePlatformModule) => {
      return true;
    };

    return conditionMap;
  }
}
```

You also need the entry point exported from the module.

```ts
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
  conditions: new MyConditions()
};
```

## Using Conditions

At other points in the platform we can check conditions, for example deciding to show a button or menu entry. You can check that one or many conditions are true using the following code. See [menu.ts](../client/src/framework/menu.ts#97) and [buttons.ts](../client/src/framework/buttons.ts#34). Browser buttons and menus can be configured to use the conditions, see [How To Customize Browser Buttons](./how-to-customize-browser-buttons.md) and [How To Customize Browser Menus](./how-to-customize-browser-menus.md)

```ts
const hasCondition = await checkConditions(['has-some-value']);
```

## In-Built Conditions

As part of the platform there are already some built-in conditions.

- `authenticated` - Which determines that the current session is authenticated.
- `sharing` - Is the sharing flag in the platform enabled.
- `themed` - Is the platform configured with a light and dark theme.

## Source Reference

- [conditions.ts](../client/src/framework/conditions.ts)
- [conditions-shapes.ts](../client/src/framework/shapes/conditions-shapes.ts)

[<- Back to Table Of Contents](../README.md)
