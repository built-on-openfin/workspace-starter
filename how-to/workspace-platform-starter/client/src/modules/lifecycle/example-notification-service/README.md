## Example Notification Service

This is an example of how you can create a module that would be initialized after the bootstrapping process has completed. This logic could in theory listen for notifications from a back end service (either directly or via a web worker if it needs to do a lot of work and you want the listening and mapping of messages to be done off the main thread). To learn more about notifications in a platform please read [How to use notifications](../../../../../docs/how-to-use-notifications.md).

This is an example of a [lifecycle module](../../../../../docs/how-to-use-lifecycle-events.md).

You can add this to the lifecycleProvider modules list:

```json
 "lifecycleProvider": {
   "modules": [
    {
     "id": "example-notification-service",
     "icon": "http://localhost:8080/favicon.ico",
     "title": "example notification service",
     "description": "example notification service",
     "enabled": true,
     "url": "http://localhost:8080/js/modules/lifecycle/example-notification-service.bundle.js",
     "data": {
      "exampleServerUrl": "http://fake/notifications",
      "notifyOn": {
        "pageChanged": true,
        "workspaceChanged": true,
        "appsChanged": true,
        "themeChanged": true,
        "favoriteChanged": true
       }
     }
    }
   ]
  }
```

The list will be read of started and each module can specify what lifecycle events should trigger it's logic E.g this module is specifying logic that should run after the platform has bootstrapped all it's components and is ready to run:

```js
/**
  * Get the lifecycle events.
  * @returns The map of lifecycle events.
  */
 public async get(): Promise<LifecycleEventMap> {
  const lifecycleMap: LifecycleEventMap = {};

  // TODO: Add handlers for lifecycle events
  lifecycleMap["after-bootstrap"] = async (
   platform: WorkspacePlatformModule,
   customData?: unknown
  ): Promise<void> => {
   await this.startNotificationService();
  };

  return lifecycleMap;
 }
```

This example lifecycle module shows fetching the notification client (to listen to and publish notifications) and it listens to a number of lifecycle events to simulate receiving data from a backend that requires a notification.

The example module has a few settings to allow for experimentation (you might have two instances with different ids, listening to different lifecycle events) and to show how options can be passed:

## Module Settings

- exampleServerUrl - the module will just log out the url entered here it is just to show that you can re-use a module across instances of a platform and provide different configuration such as server address (e.g. dev, uat, staging, prod etc)
- notifyOn - What lifecycle events should trigger a notification?
  - pageChanged - if a page is changed (such as deleted)
  - workspaceChanged - if a workspace is switched out
  - appsChanged - if a new app has been added to the list of apps
  - themeChanged - if a theme/scheme (light/dark) has been changed
  - favoriteChanged - if a favorite has been added/removed

The notifyOn events depend on how your platform is configured (favorites might be disabled for example).
