> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# What Is An Endpoint?

An endpoint is a term we use where your code/business logic wants to do something without needing to know how that thing is done.

E.g.:

- I want to execute an action where I pass a request and just get a boolean saying it was successful or not (I don't need a response). An endpoint could be calling a rest endpoint, local storage or something that uses the OpenFin Message Bus ( [Channel API](https://developers.openfin.co/of-docs/docs/channels) for example).
- I want to execute a request and get a response back. I don't care how that request is executed or where the response comes from. My main focus is I pass you a request type and I get a response type back.
- I want to execute a request and get a stream of data back. I don't care how that request is executed or where the stream of data comes from. My main focus is I pass you a request type and I get back one or more responses.

Endpoints are defined via an id and that is how they are looked up and executed.

We have a built-in fetch implementation that applies to action and request/response, but you can provide a module (see [How To Add A Module](./how-to-add-a-module.md)) that can receive module level data (when it is initialized) as well as endpoint specific configuration.

An endpoint provider module implementation would support the following interface (see source reference below for the latest representation):

```javascript
/**
 * Definition for an endpoint provider module.
 */
export interface Endpoint<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
 /**
  * Handle an action sent to the endpoint.
  * @param endpointDefinition The definition of the endpoint.
  * @param request The request to process.
  * @returns True if processed.
  */
 action?(endpointDefinition: EndpointDefinition, request?: unknown): Promise<boolean>;

 /**
  * Handle a request response on an endpoint.
  * @param endpointDefinition The definition of the endpoint.
  * @param request The request to process.
  * @returns The response to the request, or null if not handled.
  */
 requestResponse?(endpointDefinition: EndpointDefinition, request?: unknown): Promise<unknown>;

 /**
  * Handle a request for a stream of data.
  * @param endpointDefinition The definition of the endpoint.
  * @param request The request to process.
  * @returns The response to the request, or null if not handled.
  */
 requestStream?(
  endpointDefinition: EndpointDefinition,
  request?: unknown
 ): Promise<ReadableStream<unknown> | undefined>;
}
```

The interface uses Generics which means types required for a certain behavior can be created and then endpoints that support that behavior can reference the types. Here is an example of a request/response type from one of our example modules where we get the default workspace to launch: [client/src/modules/composite/default-workspace/shapes.ts](../client/src/modules/composite/default-workspace/shapes.ts):

```js
/**
 * A request type for the WorkspaceEndpoint that gets the default entry
 */
export interface EndpointDefaultWorkspaceGetRequest {
 /**
  * The id of the platform making the request
  */
 platform: string;

 /**
  * The key used to fetch the payload containing the default workspace id.
  */
 id: string;
}

/**
 * The saved default workspace id to use.
 */
export interface EndpointDefaultWorkspaceGetResponse {
 /**
  * The platform versions it was originally saved against
  */
 metaData: PlatformStorageMetadata;
 /**
  * The id representing where the workspace id payload was stored.
  */
 id: string;

 /**
  * The payload containing the default workspace to load.
  */
 payload: DefaultWorkspacePayload;
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

We include examples of endpoint modules in the modules folder (this is a small subset):

- local-storage - shows how you can have an endpoint that can save and fetch from local storage
- channel - lets you provide endpoint settings that specify a channel api you wish to connect to and whether you wish to pass a payload and return (action) or perform a requestResponse and get something back from the channel
- inline-apps - can be used to provide an array of apps inline inside of the endpointsProvider through the platform's manifest or the endpointProvider returned from a settings service (see [how to define apps](./how-to-define-apps.md))
- example-connection-validation - an example of a module that can receive the uuid and payload of an application trying to connect to your platform and return whether or not the connection should be allowed. This module always returns true as it is an example and **not for production use**.
- [example-notification-source](../client/src/modules/endpoint/example-notification-source/endpoint.ts) is an example of an endpoint that can be used by a notification related module to post notifications to a server while also listening for incoming notifications and providing them as a stream (this is an example of a requestStream implementation). We have an example lifecycle module that uses this endpoint: [example-notification-handler](../client/src/modules/lifecycle/example-notification-handler/README.md). The documentation includes examples of exposing notification capability through a platform and complements the [use notifications](./how-to-use-notifications.md) documentation.

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
- endpoints for your own modules (as shown here).
- An endpoint for getting manifest JSON files (when app definitions are not inline). By default the platform uses fetch to get manifest files but if that isn't sufficient and a platform owner needs their own implementation then they can add an endpoint called "manifest-get" to intercept and manage all manifest requests or they can implement a specific endpoint for a specific app if it is a special case: "manifest-get-appid".

## How to use an Endpoint from a Module?

Endpoint modules are a nice way of exposing functionality in a loosely coupled way. Endpoints are used by Workspace Platform Starter as a way of configuring where data comes from or goes to. This lets us easily configure where workspaces or pages are saved to for example or where applications come from.

There are offer types of module (see [How to add a module](./how-to-add-a-module.md)) and sometimes a platform owner (or other teams) may wish to create an endpoint module to be used by other modules (e.g. a lifeCycle module). We like to offer the platform owner the option of providing modules the option of getting an endpoint client. The endpoint client can then be allowed to access all or a specific set of endpoints. Endpoint client access is off by default and if enabled a platform owner will still need to specify if modules can access all endpoints "\*" (not recommended) or specific endpoints.

### How to get an endpoint client from a module?

Modules are passed a helpers function via the initialize function of a module.

The helper has an optional getEndpointClient.

```js
if (this._helpers?.getEndpointClient !== undefined && this._endpointClient === undefined) {
  // we want to generate a single instance and re-use it for this module instance. This could be done in your module's initialize
  // function
  this._endpointClient = await this._helpers?.getEndpointClient();
}

// we can then check to see if we have an endpoint client to use
if (this._endpointClient !== undefined) {
  // check to see if we have access to required endpoints and use them.
}
```

You can then use the main endpoint client functions:

- hasEndpoint - use this to check to see if you have been given access to the endpoint you are trying to use
- action - send a fire an forget message to the endpoint you have access to
- requestResponse - send a message and handle the response from the endpoint you have access to
- requestStream - request a readable stream of data.

### How to configure endpoint access from a platform owner perspective

The endpointProvider configuration has been extended to let you define the rules around endpointClient access.

Default behavior: No endpoint clients for modules.

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
 }
```

The following examples would include the modules and endpoints listed above.

Configuration is extended to give every module access to specific endpoints (in this example all modules will be given access to the endpoint integration-preferences-get):

```json
"endpointProvider": {
  ...,
  "endpointClients": {
    "restrictToListed": false,
    "defaults": {
     "endpointIds": ["integration-preferences-get"]
    }
   }
 }
```

The following example only allows modules that have there id listed and they use the default endpoints.

```json
"endpointProvider": {
  ...,
  "endpointClients": {
    "restrictToListed": true,
    "defaults": {
     "endpointIds": ["integration-preferences-get"]
    },
    "clientOptions": [{
     "id": "apps"
    }]
   }
 }
```

Client options have an enabled flag (enabled by default) so you can turn off specific entries. You can also override the default endpointIds. You might want to specify that a specific module (your own as a platform owner) can access all endpoints.

```json
"endpointProvider": {
  ...,
  "endpointClients": {
    "restrictToListed": true,
    "defaults": {
     "endpointIds": ["integration-preferences-get"]
    },
    "clientOptions": [{
      "enabled": true,
      "endpointIds": ["*"],
      "id": "apps"
    }]
   }
 }
```

## Generate From Template

You can generate the scaffold for a new module by using the following command line, where "My Endpoint" is the name you want to give your module:

```shell
npm run generate-module endpoint "My Endpoint"
```

This will generate the code in the modules/endpoint folder, add an entry into webpack to build it, and add it to the manifest so that the module is loaded.

## Source Reference

- [endpoint.ts](../client/src/framework/endpoint.ts)
- [endpoint-shapes.ts](../client/src/framework/shapes/endpoint-shapes.ts)
- local-storage [endpoint](../client/src/modules/endpoint/local-storage/endpoint.ts)
- channel [endpoint](../client/src/modules/endpoint/channel/endpoint.ts)
- inline-apps [endpoint](../client/src/modules/endpoint/inline-apps/endpoint.ts)
- example-connection-validation [endpoint](../client/src/modules/endpoint/example-connection-validation/endpoint.ts)
- example-context-processor [endpoint](../client/src/modules/endpoint/example-context-processor/endpoint.ts)
- example-notification-source [endpoint](../client/src/modules/endpoint/example-notification-source/endpoint.ts)

[<- Back to Table Of Contents](../README.md)
