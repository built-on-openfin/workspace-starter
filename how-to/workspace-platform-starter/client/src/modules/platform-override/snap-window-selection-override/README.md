# Snap Url Validator

## What is this?

This is another example of how you can plug in custom platform logic through a platform override module.

This example is related to the following scenario:

- I (Platform Owner) want to use Snap SDK to snap windows together
- I don't want every type of window to be tracked by the Snap Server and I need more granular control over the default behavior of excluding windows that are not included in snapshots (includeInSnapshots false in window options). In this scenario I (the platform owner) want to specify urls that should not be tracked (rather than it being driven by Window Options).

## How do I do it?

First you need to [enable Snap SDK](../../../../../docs/how-to-configure-snap.md). Then you need to specify that you want to disable the `"enableAutoWindowRegistration": true,` setting by setting it to false. Snap will now start up but not enable auto window registration (as you want your custom logic to drive this decision).

You then use this module (or something similar, remember this is an example) to track everything except urls that have been specified in the module's custom data definition.

## How is it configured?

This example module is defined as a platform override module in a manifest or settings service:

```json
{
  "id": "snap-window-selection-override",
  "icon": "http://localhost:8080/favicon.ico",
  "title": "Snap Window Selection Override",
  "description": "Snap Window Selection Override",
  "enabled": true,
  "url": "http://localhost:8080/js/modules/platform-override/snap-window-selection-override.bundle.js",
  "data": {
    "excludeUrls": ["*/platform/*", "*/common/windows/*", "*/common/views/*"]
  }
}
```

The example above is specifying that it doesn't want platform windows or common windows or views tracked (for cases where a window is inside the view folder as an additional host for a specific view).

## How can I test this?

- You would add this module in the manifest.fin.json file in the public folder.
- You would make sure that snap is enabled and auto window registration is off.
- You would launch the platform using npm run client
- You would then launch the call app and some other apps through home (or store).
- You would see that they snap (if you hold down Ctrl when you click on a window to drag which is the new default for the snapProvider in the main manifest).
- You would launch the IRS RFQ app through Home or Store. You will notice that it doesn't snap when you hold down Ctrl and click and drag the RFQ Window (by selecting the title) and moving it to a Browser window.
- Quit the platform.
- Disable this module by setting enabled to false.
- Go to the snapProvider settings and set window registration to true: `"enableAutoWindowRegistration": true,`
- Relaunch the platform and after startup launch the call app and the IRS RFQ app. They will now snap when you hold Ctrl and drag a window.

[How To Customize Your Platform Override](../../../../../docs/how-to-customize-your-platform-override.md)
