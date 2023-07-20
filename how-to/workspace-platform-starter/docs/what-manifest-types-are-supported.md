> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# What Types of Apps can be defined in the App Directory?

You have a number of choices when choosing how you define your apps.

- [Platform App Definition](./how-to-define-apps.md)
- [FDC3 1.2 App Definition](./how-to-define-apps-fdc3-1-2.md)
- [FDC3 2.0 App Definition](./how-to-define-apps-fdc3-2-0.md)

The type of app can be defined by manifestType (for Platform Apps and FDC 1.2 Apps) and type (for FDC 2.0 which has a number of defined types but you can use type **other** for using our manifest type definitions in the hostManifests.OpenFin.type definition).

# Manifest Types

Workspace platform starter supports the following manifest types (for the list in code please see [manifest-types.ts](../client/src/framework/manifest-types.ts)):

- **view** : This manifest type expects the manifest setting to be pointed to a json file that contains view options.
- **inline-view**: This manifest type expects the manifest setting to have the options inline rather than a url to a json file.
- **window**: This manifest type expects the manifest setting to point to a json file that contains classic window options.
- **inline-window**: This manifest type expects the manifest setting to have the classic window options inline rather than a url to a json file.
- **external**: This manifest type expects the manifest setting to point to an exe or an app asset name. This requires launch External Process permissions to be enabled see [How To Secure Your Platform](./how-to-secure-your-platform.md).
- **inline-external**: this manifest type expects the manifest setting to point to an exe or an app asset name using an inline launch external process request. This requires launch External Process permissions to be enabled see [How To Secure Your Platform](./how-to-secure-your-platform.md).
- **appasset**: This manifest type expects the manifest setting to be the alias of an app asset defined in your platform manifest. This requires launch External Process and download app asset permissions to be enabled see [How To Secure Your Platform](./how-to-secure-your-platform.md).
- **inline-appasset**: this manifest type expects the manifest setting to be an object of type [app asset info](https://developers.openfin.co/of-docs/docs/application-configuration#section-appassets-properties). This requires launch External Process and download asset permissions to be enabled see [How To Secure Your Platform](./how-to-secure-your-platform.md).
- **snapshot**: This manifest type expects the manifest setting to point to a json file that contains a snapshot (one or more windows)
- **inline-snapshot**: This manifest type expects the manifest setting to have the snapshot json inline rather than a url to a json file.
- **manifest**: This manifest type expects the manifest setting to point to a json file that is an openfin manifest. An openfin app.
- **desktop-browser**: This manifest type expects the manifest setting to point to a url which will be launched in the default desktop browser.
- **endpoint**: An endpoint (see [How To Define Endpoints](./how-to-define-endpoints.md)) is a generic target that supports an action or a request/response. This custom endpoint will be passed the app definition to the action implementation. What happens after that point is down to your own implementation. We recommend using the other manifest types but if you wish to try a custom way of launching an app then this gives you one way of extending launch behavior should you need to.
- **connection**: A connected app (see [How To Manage Connections To Your Platform](./how-to-manage-connections-to-your-platform.md)) could have provided a list of child views that can be launched from home. If a selection is made against one of these entries then it will be sent to the connected app in order for it to launch the requested view.

## Endpoint Ids

The endpoint manifest type can accept custom endpoint ids if none of the supported manifest types cover the use case you are trying to evaluate.

## Source Reference

- [manifest-types.ts](../client/src/framework/manifest-types.ts)

[<- Back to Table Of Contents](../README.md)
