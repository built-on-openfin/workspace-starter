> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Configure Snap

The OpenFin Snap SDK provides the ability to snap windows together, include native applications.
For more detailed information see [OpenFin Snap SDK](https://developers.openfin.co/of-docs/docs/snap)

To enable snap support in your platform you can add the following in your manifest.fin.json.

From Snap 1.1.0 onwards snap will automatically fetch the Snap app asset if you have not specified it in the app assets array and you haven't specified it as a serverAssetInfo. The reason for specifying this would be if you want to self-host the snap app asset.

```json
{
   "customSettings": {
      ...
      "snapProvider": {
         "enabled": true,
         "id": "workspace-platform-starter",
         "enableAutoWindowRegistration": true,
         "serverOptions": {
            "showDebug": false,
            "keyToStick": true,
            "disableBlurDropPreview": false,
            "disableGPUAcceleratedDragging": false,
            "disableUserUnstick": false
         }
      }
   }
}
```

If you want to self host the snap app asset then you can specify the serverAssetInfo as below:

```json
{
   "customSettings": {
      ...
      "snapProvider": {
         "enabled": true,
         "id": "workspace-platform-starter",
         "enableAutoWindowRegistration": true,
         "serverAssetInfo": {
            "src": "https://cdn.openfin.co/release/snap/1.1.0/snap.zip",
            "alias": "openfin-snap",
            "version": "1.1.0",
            "target": "OpenFinSnap.exe"
         },
         "serverOptions": {
            "showDebug": false,
            "keyToStick": true,
            "disableBlurDropPreview": false,
            "disableGPUAcceleratedDragging": false,
            "disableUserUnstick": false
         }
      }
   }
}
```

With the above settings included the Snap server will start on platform initialization. This will provide all the necessary plumbing to enable OpenFin windows to be snapped.

## Snapping Native Apps

To enable Snap for native apps you must provide additional information in the application definition. The options in the `launchPreference` section must include a snap section with the launch strategy for the app. The launch strategy determines how the Snap server identifies that an application has launched, for more information on the different types of launch strategy see [Native Windows in Snap SDK](https://developers.openfin.co/of-docs/docs/snap#native-windows-in-snap-sdk)

```json
{
   "appId": "winform-interop-example",
   ...
   "launchPreference": {
      "options": {
         "type": "native",
         "snap": {
            "strategy": {
               "type": "waitForWindowOfName",
               "timeoutMs": 2000,
               "matchRegex": "^Interop Example Tool"
            }
         }
      }
   }
```

To find out more about launchPreference please see [how to define app launch preference](./how-to-define-app-launch-preference.md)

## Source Reference

- [snap.ts](../client/src/framework/snap.ts)

[<- Back to Table Of Contents](../README.md)
