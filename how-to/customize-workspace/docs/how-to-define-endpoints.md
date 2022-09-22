> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# What is an Endpoint?

An endpoint is a term we use where your code/business logic wants to do something without needing to know how that thing is done.

E.g.:

- I want to execute an action where I pass a request and just get a boolean saying it was successful or not (I don't need a response). An endpoint could be calling a rest endpoint, local storage or something that uses the OpenFin Message Bus ( [Channel API](https://developers.openfin.co/of-docs/docs/channels) for example).
- I want to execute a request and get a response back. I don't care how that request is executed or where the response comes from. My main focus is I pass you a request type and I get a response type back.

Endpoints are defined via an id and that is how they are looked up and executed.

We have a built-in fetch implementation but you can provide a module (see [how to add a module](./how-to-add-a-module.md)) that can receive module level data (when it is initialized) as well as endpoint specific configuration.

An endpoint provider module implementation would support the following interface (see source reference below for the latest representation):

```javascript
export interface Endpoint extends ModuleImplementation {
  action<T>(endpointDefinition: EndpointDefinition<unknown>, request?: T): Promise<boolean>;
  requestResponse<T, R>(endpointDefinition: EndpointDefinition<unknown>, request?: T): Promise<R | null>;
}
```

The module interface specifies that an initialize and closedown function can also be provided (see [how to add a module](./how-to-add-a-module.md)).

# How To Define Endpoints

Endpoints are defined via settings and the endpointProvider:

```json
 "endpointProvider": {
  "modules": [
   {
    "enabled": true,
    "id": "local-storage",
    "url": "http://localhost:8080/js/modules/endpoints/local-storage.bundle.js"
   }
  ],
  "endpoints": [
   {
    "id": "apps-get",
    "type": "fetch",
    "options": {
     "method": "GET",
     "url": "http://localhost:8080/apps.json"
    }
   },

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

To learn more about how to modules see [how to add a module](./how-to-add-a-module.md).

We include two examples of endpoint modules in the modules folder:

- local-storage - shows how you can have an endpoint that can save and fetch from local storage
- channel - lets you provide endpoint settings that specify a channel api you wish to connect to and whether you wish to pass a payload and return (action) or perform a requestResponse and get something back from the channel.

Endpoints can be defined as:

- app sources - see [how to define apps](./how-to-define-apps.md)
- workspaces source - see [how to customize workspace management](./how-to-customize-workspace-management.md)
- page source - see [how to customize browser page management](./how-to-customize-browser-page-management.md)
- page bounds source - see [how to customize browser page management](./how-to-customize-browser-page-management.md)
- share source - see [how to customize workspace and browser sharing](./how-to-customize-workspace-browser-page-sharing.md)
- Integration preferences source - see [how to customize integrations](./how-to-add-integrations-to-home.md)

## Source reference

- [endpoint.ts](../client/src/framework/endpoint.ts)
- [endpoint-shapes.ts](../client/src/framework/shapes/endpoint-shapes.ts)
- local-storage [endpoint](../client/src/modules/endpoints/local-storage/endpoint.ts)
- channel [endpoint](../client/src/modules/endpoints/channel/endpoint.ts)
