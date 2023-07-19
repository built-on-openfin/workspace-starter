> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# What Is An Endpoint?

An endpoint is a term we use where your code/business logic wants to do something without needing to know how that thing is done.

E.g.:

- I want to execute an action where I pass a request and just get a boolean saying it was successful or not (I don't need a response). An endpoint could be calling a rest endpoint, local storage or something that uses the OpenFin Message Bus ( [Channel API](https://developers.openfin.co/of-docs/docs/channels) for example).
- I want to execute a request and get a response back. I don't care how that request is executed or where the response comes from. My main focus is I pass you a request type and I get a response type back.

Endpoints are defined via an id and that is how they are looked up and executed.

We have a built-in fetch implementation but you can provide a module (see [How To Add A Module](./how-to-add-a-module.md)) that can receive module level data (when it is initialized) as well as endpoint specific configuration.

An endpoint provider module implementation would support the following interface (see source reference below for the latest representation):

```javascript
export interface Endpoint extends ModuleImplementation {
  action<T>(endpointDefinition: EndpointDefinition<unknown>, request?: T): Promise<boolean>;
  requestResponse<T, R>(endpointDefinition: EndpointDefinition<unknown>, request?: T): Promise<R | null>;
}
```

The module interface specifies that an initialize and closedown function can also be provided (see [How To Add A Module](./how-to-add-a-module.md)).

# How To Define Endpoints

Endpoints are defined via settings and the endpointProvider:

```json
 "endpointProvider": {
  "modules": [
   {
    "enabled": true,
    "id": "local-storage",
    "url": "http://localhost:8080/js/modules/endpoint/local-storage.bundle.js"
   }
  ],
  "endpoints": [
   {
    "id": "integration-preferences-get",
    "type": "module",
    "typeId": "local-storage",
    "options": {
     "method": "GET",
     "dataType": "integration-preferences"
    }
   },
   {
    "id": "integration-preferences-set",
    "type": "module",
    "typeId": "local-storage",
    "options": {
     "method": "SET",
     "dataType": "integration-preferences"
    }
   }
  ]
 },
```

As you can see from the snippet above, we have built in fetch support (type: "fetch") with the option of creating a custom JavaScript module that provides a custom implementation for a specific type of action or request/response (you can see that we have a type: module and it references a module called local-storage to save and fetch integration preferences).

To learn more about how to modules see [How To Add A Module](./how-to-add-a-module.md).

We include examples of endpoint modules in the modules folder:

- local-storage - shows how you can have an endpoint that can save and fetch from local storage
- channel - lets you provide endpoint settings that specify a channel api you wish to connect to and whether you wish to pass a payload and return (action) or perform a requestResponse and get something back from the channel
- inline-apps - can be used to provide an array of apps inline inside of the endpointsProvider through the platform's manifest or the endpointProvider returned from a settings service (see [how to define apps](./how-to-define-apps.md))
- example-connection-validation - an example of a module that can receive the uuid and payload of an application trying to connect to your platform and return whether or not the connection should be allowed. This module always returns true as it is an example and **not for production use**.

Endpoints can be defined as:

- platform settings - if you specify an endpoint called **platform-settings** then the platform will call it to fetch the settings it should use. See [How To Apply Entitlements](./how-to-apply-entitlements.md)
- app sources - see [How To Define Apps](./how-to-define-apps.md)
- workspaces source - see [How To Workspace Platform Starter Management](./how-to-workspace-platform-starter-management.md)
- page source - see [How To Customize Browser Page Management](./how-to-customize-browser-page-management.md)
- share source - see [How To Workspace Platform Starter And Browser Sharing](./how-to-workspace-platform-starter-browser-page-sharing.md)
- integration preferences source with integration management - see [How To Customize Home](./how-to-customize-home.md)
- connection to your platform verification - see [How To Manage Connections To Your Platform](./how-to-manage-connections-to-your-platform.md)
- an app launch handler - if the **manifestType** of an app is **endpoint** then we will check the endpoints array for the endpoint specified in the manifest property. See - [What Manifest Types Are Supported](./what-manifest-types-are-supported.md)
- version validation - You can configure the versionProvider options to specify an endpointId that should be called. This endpoint will return an object that defines what versions the platform should work against. See - [How To Add Versioning Support](./how-to-add-versioning-support.md)
- Context Object enrichment (either when a context object is broadcast or a context object is passed when raising an intent or calling fdc3.open) See [How to add context support to your app](./how-to-add-context-support-to-your-app.md) and [How to add intent support to your app](./how-to-add-intent-support-to-your-app.md). The interop broker will check to see if any endpoints match the id of a context type: e.g. **interopbroker.process.fdc3.contact** or **interopbroker.process.org.dayofinterest**. The latter is not an official fdc3 context type. It is an example of an organization specific namespace that takes a date as an id but also has other optional id settings that could be used by other apps. We have created a module [example-context-processor](../client/src/modules/endpoint/example-context-processor/endpoint.ts) and added an entry into the endpoints and endpoint module section of the endpointProvider settings in manifest.fin.json and settings.json found in the public directory.

## Source Reference

- [endpoint.ts](../client/src/framework/endpoint.ts)
- [endpoint-shapes.ts](../client/src/framework/shapes/endpoint-shapes.ts)
- local-storage [endpoint](../client/src/modules/endpoint/local-storage/endpoint.ts)
- channel [endpoint](../client/src/modules/endpoint/channel/endpoint.ts)
- inline-apps [endpoint](../client/src/modules/endpoint/inline-apps/endpoint.ts)
- example-connection-validation [endpoint](../client/src/modules/endpoint/example-connection-validation/endpoint.ts)
- example-context-processor [endpoint](../client/src/modules/endpoint/example-context-processor/endpoint.ts)

[<- Back to Table Of Contents](../README.md)
