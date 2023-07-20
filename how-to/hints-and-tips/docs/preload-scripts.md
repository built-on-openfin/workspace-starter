> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

OpenFin Provides the ability to load scripts into your Platform Provider, Windows or Views. If the content loading the preload script(s) contains iframes then they will also receive the preload script(s).

## Preload Scripts

### Platform Provider

This is the entry point for your application and is defined using the platform section of your manifest.

```js
"platform": {
  "providerUrl": "http://localhost:8080/platform/provider.html",
}
```

To define a preload to be injected into your platform provider your would define it as follows:

```js
"platform": {
  "providerUrl": "http://localhost:8080/platform/provider.html",
  "preloadScripts": [
    {
        "url": "https://my/js/preload/preload-example-platform.js"
    }
  ]
}
```

### Window

This is any Window regardless of whether or not it is containing a layout (e.g. Classic Windows and Platform Windows). You can define preload scripts for all Windows (via Default Window Options - doesn't apply to windows launched via fin.Window.create which doesn't go through your platform) or just for specific windows when you launch them by specifying the preloadScripts setting in the window options of that specific window.

#### Default Window Options

```js
"platform": {
   "defaultWindowOptions": {
        "preloadScripts": [
            {
                "url": "https://my/js/preload/preload-example-window.js"
            }
        ]
    },
}
```

#### Window Options

This would just be alongside your window url:

```js
{
    "url": "http://mywindowurl",
    "preloadScripts": [
        {
            "url": "https://my/js/preload/preload-example-window.js"
        }
    ]
}
```

### View

#### Default View Options

```js
"platform": {
   "defaultViewOptions": {
        "preloadScripts": [
            {
                "url": "https://my/js/preload/preload-example-window.js"
            }
        ]
    },
}
```

#### View Options

This would just be alongside your view url:

```js
{
    "url": "http://myviewurl",
    "preloadScripts": [
        {
            "url": "https://my/js/preload/preload-example-view.js"
        }
    ]
}
```

### Tips and Things to Note

#### Console Logs

It is helpful if you add a console log message to the top of your preload script so that you know it has been loaded (The preload script does not should up in the devtools source). Adding logging to your preload also helps ensure that it is behaving the way you intended.

#### Use import to make your script more discoverable

Your preload scripts are injected but if you bring in the bulk of your script through a module then it will show up in the Developer Tools. Having that logic in a module also makes it easier to re-use outside of your preload script.

```js
// do not run on the main window and only run on iframes directly added to the main window/view
console.log('Framed Preload: Initializing Check.');
if (window !== window.top && window.top === window.parent) {
  console.log('Framed Preload: Initializing.');
  window.addEventListener('DOMContentLoaded', async () => {
    try {
      const myModule = await import('../js/my.module.js');
      myModule.init();
    } catch (err) {
      console.error('Framed Preload: Error setting up my module.', err);
    }
    console.log('Framed Preload: Initialized.');
  });
}
```

#### Prevent iframes from loading your preload script

You can use a quick check to prevent your script from running in the wrong target

```js
if (window === window.top) {
  // run preload logic
}
```

if API injection is disabled through Window/View Options then preload scripts will not be injected into iframes:

```js
{
  "api": {
    "iframe": {
     "crossOriginInjection": false,
     "sameOriginInjection": false
    }
   }
}
```

#### Caching

Your preloads are download and cached. You can use cache busting techniques if you want to ensure you get the latest version of the preload script.
