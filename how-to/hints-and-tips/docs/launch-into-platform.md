> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../../../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin. Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# [Launch Into Platform](https://developers.openfin.co/of-docs/docs/platform-getting-started#deep-linking-fin--fins-link)

> :information_source: **INFO:** Launch Into Platform is disabled by default in Workspace v19 onwards and [runtime v38.126.82.69+](https://developer.openfin.co/versions/?product=Runtime#38.126.82.69). As it is off by default you do not need to do an override unless you turn it on.

OpenFin Platforms allow additional snapshots and layouts to be loaded into a platform through a deep link. This might be useful if you want to dynamically load content through a url, however, our recommendation would be that a platform developer should be more explicit about what gets loaded into their platform and how.

OpenFin lets you [customize the behavior of a platform](https://developers.openfin.co/of-docs/docs/platform-customization#example-overriding-default-getsnapshot-behavior) through overrides and you can do the same here.

## Override launchIntoPlatform - Platform API

```js
const overrideCallback = (Provider) => {
  // Extend default behavior
  class MyOverride extends Provider {
    /**
   * Supports launching a manifest into a platform.
   * @param payload The manifest to load into the platform
   * @returns nothing.
   */
   async launchIntoPlatform(payload: OpenFin.LaunchIntoPlatformPayload): Promise<void> {
    console.log(
        "launchIntoPlatform called. Inspect the payload to determine if you should launch it by calling super.launchIntoPlatform or alternatively do not call super.launchIntoPlatform if you do not want to dynamically launch content in this way. If you want to implement your own logic against your own query param then look at implementing your own deep linking logic: https://developers.openfin.co/of-docs/docs/deep-linking .",
        payload
    );
  }
  }
  // Return instance with methods to be consumed by Platform
  return new MyOverride();
};
fin.Platform.init({ overrideCallback });
```

## Override launchIntoPlatform - Workspace Platform

```js
import * as WorkspacePlatform from '@openfin/workspace-platform';

/**
 * Override methods in the platform.
 * @param WorkspacePlatformProvider The workspace platform class to extend.
 * @returns The overridden class.
 */
function overrideCallback(
 WorkspacePlatformProvider: OpenFin.Constructor<WorkspacePlatformProvider>
): WorkspacePlatformProvider {
 /**
  * Create a class which overrides the platform provider.
  */
 class Override extends WorkspacePlatformProvider {
  async launchIntoPlatform(payload: OpenFin.LaunchIntoPlatformPayload): Promise<void> {
   console.log(
    "launchIntoPlatform called. Inspect the payload to determine if you should launch it by calling super.launchIntoPlatform or alternatively do not call super.launchIntoPlatform if you do not want to dynamically launch content in this way. If you want to implement your own logic against your own query param then look at implementing your own deep linking logic: https://developers.openfin.co/of-docs/docs/deep-linking .",
    payload
   );
  }
 }
 return new Override();
}

// initialize Workspace Platform with Override
await WorkspacePlatform.init(
  {
    overrideCallback
  });
```

Performing an override will let you disable this logic and as mentioned you can implement your own [deep linking logic](https://developers.openfin.co/of-docs/docs/deep-linking) to control all the parameters that are used when passing settings to your platform through a fins link.
