> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Use Notifications

This section is going to be broken down into two sections.

- Getting to know the Notifications API
- Patterns for Notification Usage

## Getting to know the Notifications API

If you are looking to learn how to use the notifications API please use the following two sources:

- [Notification Center Documentation](https://developers.openfin.co/of-docs/docs/connect-a-workspace-platform-to-notification-center) at developers.openfin.co.
- Example: [how-to/use-notifications](../../use-notifications/README.md)

These sources will let you explore what Notifications are capable of.

## Patterns for Notification Usage

This is an example of how you can use Notifications in our workspace platform starter example.

### Scenarios

#### 1 Platform and 1 source of notifications

In this scenario you might have:

1. A backend that provides notifications to your platform through e.g. server sent events or a websocket connection.
2. A [lifecycle module](./how-to-use-lifecycle-events.md) that is instantiated after the platform is bootstrapped.
3. Platform applications that need to publish notifications (these might be local notifications or server routed notifications).

##### Point 1

We are not going to specify any particular server technology or approach. The idea is that a server acts as a source of notifications and these notifications are fetched via some TypeScript/JavaScript code.

##### Point 2

A [lifecycle module](./how-to-use-lifecycle-events.md) is instantiated when the platform is bootstrapped.

In the initialize function of your lifecycle module you will be passed a helpers object that will contain an optional function called **getNotificationClient**. We have an example lifecycle module called [example-notification-service README.md](../client/src/modules/lifecycle/example-notification-service/README.md) that uses the notification client and simulates a trigger for notifications by subscribing to lifecycle events. We also have a second example lifecycle module that supports creating, updating and clearing notifications through a Channel API or FDC3/Interop Intents: [example-notification-handler README.md](../client/src/modules/lifecycle/example-notification-handler/README.md).

##### Point 3

The lifecycle module can use the notification client to add an event listener to react to interactions with a notification. Notifications can be informational (just display information and allow the user to dismiss) or it may have a call to action or a form to capture additional information:

Remote notifications (notifications coming from the server to the client and being pushed to the notification center):

- For informational notifications your module might just publish it using the notification client (although you may want to allow the backend to specify that a notification should be revoked)
- For Call To Action notifications your module might have a contract where actions are mapped to intents (e.g. on selection of an action the interopClient is used to raise an intent and pass the context object stored in the customData of a notification). Alternatively you might have an action that indicates that a context object (stored in the customData of a notification) should be broadcast on an app or user channel. The [example-notification-handler](../client/src/modules/lifecycle/example-notification-handler/README.md) has an example of this.
- For form based notifications you might pass the captured data to the backend.

Local notifications (notifications submitted by apps running on the desktop):

- Allow Views/Windows/Popups to connect to the notification service (in the lifecycle module) through a custom Channel API service that exposes a createNotification function. Responses to the notification will be handled by the lifecycle module.
- Expose a backend http service that will be called by Views/Windows/Popups for the publication of notifications. The message will be captured and audited by the server and then pushed down to all relevant clients (such as the notification service lifecycle module).

Why not add notification event listeners directly to a View/Popup/Window?

- They are generally temporary (a user will dismiss or close a popup, close a view or close a window).
- If the platform is closed and a user interacts with a notification in the notification center it will trigger the relaunch of a platform. You will want the event listeners to get registered on startup (e.g. like through a lifecycle module) instead of needing a view to be launched in order to react to the interaction with the notification.

#### 1 Platform and multiple sources of notifications

If you have more than one team or division under your platform then they may want to control their own logic for notifications. The pattern shown above could be applied by multiple teams. Each team could own their own notification service module and follow the rules above. The notification client returned by the helper will isolate the notifications so each module would only get events related to notifications they published (unless you wish to link them).

## Configuring the Notifications Provider

The notificationsProvider settings lets you specify settings that are passed onto the workspace notification registration (id, title and icon). It also includes additional settings specific to the workspace platform starter i.e. notificationClients.

```json
"notificationProvider": {
   "id": "workspace-platform-starter",
   "title": "Workspace Platform Starter",
   "icon": "http://localhost:8080/favicon.ico",
   "notificationClients": {
    "defaults": {
     "enforceIcon": false,
     "includeInPlatform": true
    },
    "restrictToListed": false,
    "clientOptions": [
     {
      "enabled": true,
      "enforceIcon": true,
      "icon": "http://localhost:8080/favicon.ico",
      "id": "example-notification-service",
      "idPrefix": "openfin-example-notifications",
      "includeInPlatform": true
     }
    ]
   }
  }
```

[<- Back to Table Of Contents](../README.md)
