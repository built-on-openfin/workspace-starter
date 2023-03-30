> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Add Versioning Support ?

Through configuration you can add the version of your application e.g. 1.0.0. Additional versioning information is also provided and made available to modules through the module helpers and a getVersionInfo function. These are the following version types:

## Version Types

- app (the version of the app provided through settings)
- platformClient (the platform code configured through the manifest/settings)
- workspacePlatformClient (the version of the @openfin/workspace-platform npm package)
- workspaceClient (the version of the @openfin/workspace npm package)
- workspace (the version of the OpenFin Workspace Components your platform has registered against)
- notificationCenter (the version of the Notification Center that is running)
- runtime
- rvm

## Configuration

By default the Version Provider will initialize even without configuration but you can specify some settings to control what your supported versions are and whether you should stop the platform and show a version message.

```json
"versionProvider": {
   "appVersion": "1.0.0",
   "minimumVersion": {
    "workspace": "12.6.0"
   },
   "maximumVersion": {
   },
   "versionWindow": {
    "name": "versioning",
    "url": "http://localhost:8080/windows/version/version.html"
   }
  }
```

## Min and Max Limits

Minimum and Maximum thresholds can be specified through the minimum and maximum setting by specifying the version type and the full version number (x.x.x.x for runtime and rvm and x.x.x for everything else).

The logic starts from the major version and works down but stops on the first violation of the limit.

## Version Window

The Version Window is the window to show when a validation check fails. If it is specified then it means your intention is that the platform should stop initializing, any registrations against Workspace should be undone and the Version Window should be presented to the user.

The settings here are your standard OpenFin Window Options. We pass additional data to the window through customData:

```typescript
export interface VersionWindowCustomData {
  /** The collection version information */
  versionInfo: VersionInfo;
  /** The configured minimum limits */
  minVersion: MinimumVersion;
  /** The configured maximum limits */
  maxVersion: MaximumVersion;
  /** The version type that failed the minimum requirements */
  minFail: string[];
  /** The version type that failed the maximum requirements */
  maxFail: string[];
}
```

![Example Version Window](./assets/version-window.png)

## Source Reference

- [version.ts](../client/src/framework/version.ts)
- [version-shapes.ts](../client/src/framework/shapes/version-shapes.ts)
- [Sample Version Window](../public/windows/version)

[<- Back to Table Of Contents](../README.md)
