> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# What Is Browser Page Management

By default you get the ability to save, rename and delete pages in [Workspace Browser](./how-to-customize-browser.md).

When you **save** a Page it captures the layout (which views are present and how they are laid out) within the page. If your views have created customData this will be included in the layout data of the page (which is what we call the JSON representation of all of this data).

This lets you easily layout arrangements and the applications you work with an assign it a name.

## Where Are Pages Saved?

By default this json data is saved to [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API). This lets you get up and running without any server requirement for the storage of this data.

## What If I Want To Change Where This Information Is Stored?

A workspace platform lets you override the platform implementation so you can come up with your own function implementations for the saving and fetching of pages. This is called a platform override and the workspace platform starter implementation exists here: [platform-override.ts](../client/src/framework/platform/platform-override.ts).

Instead of modifying this file directly we allow you to specify the destination and source of pages through config and the definition of [endpoints](./how-to-define-endpoints.md).

### Endpoint Ids

Endpoints support an action and request/response function (see [How To Defined Endpoints](./how-to-define-endpoints.md)). Workspace platform starter checks to see if you have specified the following endpoints:

- page-list
- page-get
- page-set
- page-remove

If you provide endpoints with these ids then workspace platform starter will use them instead of the default indexedDB implementation.

This frees you up to fetch and save your pages from/to anywhere in any way that works for you.

Endpoints have a default **fetch** implementation where you can just point to rest endpoints but you could also have a custom module (see [How To Add A Module](./how-to-add-a-module.md) that implements your own logic.

You can enable a development endpoint on the local server to emulate these endpoints by adding the following endpoint entries, this code should not be used in production. The server stores everything in memory, so it will be wiped if you restart it.

```json
"endpointProvider": {
    "endpoints": [
        {
            "id": "page-list",
            "type": "fetch",
            "options": {
                "method": "GET",
                "url": "http://localhost:8080/api/storage/page"
            }
        },
        {
            "id": "page-get",
            "type": "fetch",
            "options": {
                "method": "GET",
                "url": "http://localhost:8080/api/storage/page/[id]"
            }
        },
        {
            "id": "page-set",
            "type": "fetch",
            "options": {
                "method": "POST",
                "url": "http://localhost:8080/api/storage/page"
            }
        },
        {
            "id": "page-remove",
            "type": "fetch",
            "options": {
                "method": "DELETE",
                "url": "http://localhost:8080/api/storage/page/[id]"
            }
        }
    ]
}
```

## Do You Have An Example Of A Custom Implementation?

Our default example manifest ([manifest.fin.json](../public/manifest.fin.json)) doesn't override the default behavior. Our second manifest ([second.manifest.fin.json](../public/second.manifest.fin.json)) loads configuration through a rest endpoint (see [settings.json](../public/settings.json)) and that defines the endpoints listed above in the **endpointProvider** definition.

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
    "id": "page-list",
    "type": "module",
    "typeId": "local-storage",
    "options": {
     "method": "GET",
     "dataType": "page"
    }
   },
   {
    "id": "page-get",
    "type": "module",
    "typeId": "local-storage",
    "options": {
     "method": "GET",
     "dataType": "page"
    }
   },
   {
    "id": "page-set",
    "type": "module",
    "typeId": "local-storage",
    "options": {
     "method": "SET",
     "dataType": "page"
    }
   },
   {
    "id": "page-remove",
    "type": "module",
    "typeId": "local-storage",
    "options": {
     "method": "REMOVE",
     "dataType": "page"
    }
   }
  ]
 },
```

As you can see from the configuration above:

1. A custom endpoint module is defined that saves/gets data and uses localstorage as the source.
2. Each endpoint definition references that module using type and typeId and passes options specific to the particular endpoint.

If you use the live launch section on the [Main Page](../README.md) and launch the second example and save a page you will be able to use dev tools to see that it is saved to localstorage instead of indexedDB. You can then create your own endpoints with custom logic or use our fetch builtin implementation to save and fetch your pages.

## Data storage

The endpoint storage maps the page data to simplify it, you can disable this mapping by setting `disableStorageMapping` in platform storage.

```json
"customSettings": {
   "platformProvider": {
      "disableStorageMapping": true
    }
}
```

## Can I Manage Pages From Home?

We include support for doing page management from home in workspace platform starter. It is enabled by default as an integration provider.

![Home Page Management](./assets/home-page-management.png)

## Can I Manage Pages From Browser?

We provide an example of a module that extends the browser main menu with additional menu options for showing saved pages or deleting them:

### Menus Provider lets you include a module that returns menu entries dynamically

```json
 "menusProvider": {
   "modules": [
    {
     "id": "pages",
     "icon": "http://localhost:8080/favicon.ico",
     "title": "Pages",
     "description": "Provides additional menu options for pages.",
     "enabled": true,
     "url": "http://localhost:8080/js/modules/composite/pages.bundle.js",
     "data": {}
    }
   ]
  }
```

### Actions Provider lets you include actions that should respond to the menu entries returned by the menusProvider

```json
"actionsProvider": {
   "modules": [
    {
     "enabled": true,
     "id": "page-actions",
     "url": "http://localhost:8080/js/modules/composite/pages.bundle.js"
    }
   ]
  },
```

### I See A Sharing Button, How Is That Configured?

Please see [How To Workspace Platform Starter And Browser Page Sharing](./how-to-workspace-platform-starter-browser-page-sharing.md).

## Source Reference

- [platform-override.ts](../client/src/framework/platform/platform-override.ts)
- [platform-local-storage.ts](../client/src/modules/endpoint/local-storage/platform-local-storage.ts)
- [Pages Composite Module](../client/src/modules/composite/pages/)

[<- Back to Table Of Contents](../README.md)
