> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Configure Analytics

OpenFin Workspace 10+ generates a set of analytic events for the Workspace Components and Platform Browser. A Workspace Platform can override the **handleAnalytics** function in it's platform override in order to receive the generated analytics. Customize workspace gives you the option of defining one or more analytic modules that would receive this data.

## Analytics Provider

You can configure where analytics should be sent by using our Analytics Provider. You can then specify 1 or more modules (see [how to add a module](./how-to-add-a-module.md)) that will receive the analytic events and any config you specify. We have created an [example analytics module](../client/src/modules/analytics/example/) and configured it in [manifest.fin.json](../public/manifest.fin.json) and [second.manifest.fin.json's settings.json file](../public/settings.json). It isn't configured in our [third.manifest.fin.json](../public/third.manifest.fin.json) to show that this is an optional feature.

```json
"analyticsProvider": {
   "modules": [
    {
     "enabled": true,
     "id": "analytics.console.example",
     "url": "http://localhost:8080/js/modules/analytics/example.bundle.js",
     "data": {
      "eventLogLevel": "info"
     }
    }
   ]
  }
```

## Source Reference

- [Analytics](../client/src/framework/analytics.ts)
- [PlatformAnalyticsEvent](../client/src/framework/shapes/analytics-shapes.ts)
- [Example Analytics Module](../client/src/modules/analytics/example/)

[<- Back to Table Of Contents](../README.md)
