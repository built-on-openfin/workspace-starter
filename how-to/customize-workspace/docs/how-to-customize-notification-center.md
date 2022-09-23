> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Customize Notification Center

The notification center is one of the standard components of OpenFin workspace, for an in depth look at the component see [Notification Center Overview](https://developers.openfin.co/of-docs/docs/overview-notifications) and [Connect A Workspace Platform to Notification Center](https://developers.openfin.co/of-docs/docs/connect-a-workspace-platform-to-notification-center).

The notification center will use the theming that you have configured for your platform, see [How To Theme Your Platform](./how-to-theme-your-platform.md)

## Enabling Notifications Center

To enable the notification center component the following settings in the manifest must be set.

```json
"bootstrap": {
    "notifications": true
}
```

For more details on the bootstrapping process see [How To Customize The Bootstrapping Process](./how-to-customize-the-bootstrapping-process.md)

## Configuring Notification Center

All of the notification center specific configuration options are stored in `notificationProvider`

As with the other workspace components you can set the `id`, `title` and `icon` used when the platform launches home e.g.

```json
"notificationProvider": {
    "id": "customize-workspace",
    "title": "Home Starter",
    "icon": "http://localhost:8080/favicon.ico"
}
```

The values will be passed in to the `register` method of the notifications.

## Source Reference

- [notifications.ts](../client/src/framework/workspace/notifications.ts)

[<- Back to Table Of Contents](../README.md)
