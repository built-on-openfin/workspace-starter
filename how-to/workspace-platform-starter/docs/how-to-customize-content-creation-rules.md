> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Customize Content Creation Rules

Content creation rules can be used to determine how the content from a view using `<a href=... target="_blank"` or `window.open` will be displayed.

For more information see [Content Creation Rules with the Platform API](https://developers.openfin.co/of-docs/docs/content-creation-rules)

Content creation rules can be applied in your main manifest by defining them in your `defaultWindowOptions` or `defaultViewOptions` but this restricts their functionality by only using the inbuilt process to display them.

By creating a module for content creation rules you can intercept specific events which let you perform more precise handling of the content.

You can implement content creation rules by following the module pattern, see [How To Add A Module](./how-to-add-a-module.md) and adding them to the `contentCreationProvider.modules` section.

## Configuration

As mentioned above content creation rules follow the module pattern, a simple module added to the manifest could be:

```json
"contentCreationProvider": {
    "modules": [
        {
            "enabled": true,
            "id": "my-content-creation",
            "url": "http://localhost:8080/js/modules/content-creation/my-content-creation.bundle.js"
        }
    ]
}
```

## Implementation

If you implement a content creation rules module the bare minimum that is required is to provide a `getRules` method. This method returns an array of rules which follow the same structure as the standard content creation rules which you can define for a platform see [Content Creation Rules with the Platform API](https://developers.openfin.co/of-docs/docs/content-creation-rules).

```ts
class MyContentCreationProvider {
  public async getRules(): Promise<OpenFin.ContentCreationRule[]> {
    return [
      {
        behavior: 'window',
        match: ['https://www.newscientist.com/*'],
        options: {
          defaultWidth: 800,
          defaultHeight: 600
        }
      },
      {
        behavior: 'view',
        match: ['https://www.scientificamerican.com/*']
      },
      {
        behavior: 'block',
        match: ['*://*.reddit.com/*']
      }
    ];
  }
}
```

In addition to providing rules you can also monitor events that get triggered when certain content creation rules are triggered.

- handleViewCreated
- handleWindowCreated
- handleBrowserCreated
- handleBlocked

These events on the whole occur after the creation has taken place, so don't allow for manipulation before display, but can be used to connect to and interact with them after.

The exception is the `handleViewCreated` event, a rule match for a view does create the view contents but does not attach it anywhere. In this case you must at a bare minimum attach it to the target that created it.

e.g.

```ts
await platform.createView(event.childOptions, event.target);
```

The event details that are passed to the handler contains all the relevant information about the view and how it was created, and also the original intended target location.

## window.open features

If you use the `features` property of a `window.open` call this value is also passed to the handler, so you can include your own custom features to display the content differently when in an OpenFin environment, those features would be ignored by a browser.

e.g.

```html
<button onclick="window.open('https://openfin.co/', '_blank', 'view-position=stack-right')">
  Open View to Right in Stack
</button>
```

The window.open includes a feature of `view-position`, so in your handler you could read the value, and then use it to open the view to the side of the current one, e.g.

```ts
let viewPosition = '';
const pairs = event.features.split(',');
for (const pair of pairs) {
  if (pair.startsWith('view-position=')) {
    viewPosition = pair.slice(14);
  }
}

const view: OpenFin.View = fin.View.wrapSync(event.viewIdentity);
const parentTabStack: OpenFin.TabStack = await view.getCurrentStack();
const siblingViewIds: OpenFin.Identity[] = await parentTabStack.getViews();
const currentViewIndex = siblingViewIds.findIndex((id) => id.name === event.viewIdentity?.name);
await parentTabStack.addView(event.childOptions, {
  index: viewPosition === 'stack-left' ? currentViewIndex : currentViewIndex + 1
});
```

There is an module linked in the Source Reference which demonstrates this type of handling.

## Generate From Template

You can generate the scaffold for a new module by using the following command line, where "My Content Creation" is the name you want to give your module:

```shell
npm run generate-module contentCreation "My Content Creation"
```

This will generate the code in the modules/content-creation folder, add an entry into webpack to build it, and add it to the manifest so that the module is loaded.

## Source Reference

- [content-creation.ts](../client/src/framework/content-creation.ts)
- [view position example module](../client/src/modules/content-creation/view-position/content-creation.ts)
- [view position html](../public/common/views/content-creation/view-position.html)

[<- Back to Table Of Contents](../README.md)
