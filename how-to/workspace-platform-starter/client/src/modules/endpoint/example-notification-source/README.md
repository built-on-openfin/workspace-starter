## Example Notification Source

This is an example of how you expose a stream of notifications that would be initialized after the bootstrapping process has completed. This logic could in theory listen for notifications from a back end service (either directly or via a web worker if it needs to do a lot of work and you want the listening and mapping of messages to be done off the main thread). To learn more about notifications in a platform please read [How to use notifications](../../../../../docs/how-to-use-notifications.md).

This is an example of a [endpoint module](../../../../../docs/how-to-define-endpoints.md).

You can add this to the endpointProvider modules list.

This module uses a number of endpoints that are provided by a single example endpoint module. This can be swapped out for another endpoint as long as it supports the action and requestStream methods and supports the same types.

**This is just an example and would need additional logic/defensive coding if you were going to build a real implementation**.

A stripped down endpoint provider that just shows the information related to this notification source is shown below:

```json
"endpointProvider": {
   "modules": [
    {
     "id": "example-notification-source",
     "icon": "http://localhost:8080/favicon.ico",
     "title": "Example Notification Source",
     "description": "Example Notification Source",
     "enabled": true,
     "url": "http://localhost:8080/js/modules/endpoint/example-notification-source.bundle.js",
     "data": {}
    }
   ],
   "endpoints": [
    {
     "id": "notification-source-create",
     "type": "module",
     "typeId": "example-notification-source",
     "options": {}
    },
    {
     "id": "notification-source-clear",
     "type": "module",
     "typeId": "example-notification-source",
     "options": {}
    },
    {
     "id": "notification-source-close",
     "type": "module",
     "typeId": "example-notification-source",
     "options": {}
    },
    {
     "id": "notification-source-update",
     "type": "module",
     "typeId": "example-notification-source",
     "options": {}
    },
    {
     "id": "notification-source-stream",
     "type": "module",
     "typeId": "example-notification-source",
     "options": {}
    }
   ],
   "endpointClients": {
    "clientOptions": [
     {
      "enabled": true,
      "id": "example-notification-service",
      "endpointIds": ["notification-source-create",
          "notification-source-clear",
          "notification-source-close",
          "notification-source-update",
          "notification-source-stream"]
     }
    ]
   }
  }
```

### Modules definition

The JavaScript module to load that contains all of the information needed for managing notification actions.

### Endpoint definition

Multiple entries for each of the actions we want to expose. This could have been a single entry and you could determine the request by the passed request object but we have split it into multiple endpoints so you can defined specific settings if you wanted to or if you wanted more granular permissions.

### Endpoint Clients

The platform supports an example of how you could determine which endpoints a module has access to. Here you can see that the example-notification-service has been given access just to the endpoints it requires.

### Endpoint Source Flow

This module is not listening to a websocket in order to fetch notifications but it is an example of returning a stream of notifications.

The notifications can be driven by two sources in this module:

- The notification-source-create endpoint will take a notification options object and add that to the queue of notifications to return from the stream (in a real implementation that might have resulted in a post to a server which in turn logs the notification and ensures it reaches all relevant clients including the one that sent it but here we just add the notification straight to the queue).
- Lifecycle events raised by the platform: This example module listens to a number of lifecycle events to simulate receiving data from a backend that requires a notification.

### Endpoint Notification Source Format

The data coming from the endpoint stream that represents a notification event source should match the following (the notification option and updatable options should include the format of notifications in the [example-notification-service](../../endpoint/example-notification-source/README.md) if you want the buttons to trigger supported functions).

Create a notification:

```js
{
 "eventId": "create",
 "payload": { } // This will be the NotificationOptions object used by the OpenFin Notification Library.
}
```

Update a notification:

```js
{
 "eventId": "update",
 "payload": { } // This will be the UpdatableNotificationOptions object used by the OpenFin Notification Library.
}
```

Clear a notification:

```js
{
 "eventId": "clear",
 "payload": { "id": "Id of the notification to clear"}
}
```

Notify that a notification has been closed so that you can clear a local notification:

```js
{
 "eventId": "close",
 "payload": { "id": "Id of the notification to clear"}
}
```

The example module has a few settings to allow for experimentation and to show how options can be passed:

## Module Settings

- intervalInSeconds - How long should the service wait before it processes the queue of notifications (default is 1 second)
- websocket - An example websocket that this example endpoint should try and connect to and it expects NotificationSourceEvent messages.
  - url - the websocket url to connect to
- longpoll - If you don't use websockets but you can use long polling then you can point to a url here to act as a feed for messages (must support CORs)
  - url - the url to poll
  - intervalInSeconds - the number of seconds before it checks the rest endpoint again
- notifyOn - What lifecycle events should trigger a notification?
  - pageChanged - if a page is changed (such as deleted)
  - workspaceChanged - if a workspace is switched out
  - appsChanged - if a new app has been added to the list of apps
  - themeChanged - if a theme/scheme (light/dark) has been changed
  - favoriteChanged - if a favorite has been added/removed

The notifyOn events depend on how your platform is configured (favorites might be disabled for example).

The main manifest [manifest.fin.json](../../../../../public/manifest.fin.json) includes a lifecycleProvider entry (example notification service) that uses this service.
