> **_:information_source: HERE Core UI:_** [HERE Core UI](https://resources.here.io/docs/core/hc-ui/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the HERE Core Container and HERE Core UI components is only granted pursuant to a license from HERE (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Customize Notification Center

The notification center is one of the standard components of HERE workspace, for an in depth look at the component see [Notification Center Overview](https://resources.here.io/docs/core/hc-ui/notifications/) and [Connect A HERE Core UI Platform to Notification Center](https://resources.here.io/docs/core/addenda/deprecated/notifications-hc-ui-platform/).

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

As with the other HERE Core UI Components you can set the `id`, `title` and `icon` used when the platform launches home e.g.

```json
"notificationProvider": {
    "id": "workspace-platform-starter",
    "title": "HERE Core UI Platform Starter",
    "icon": "http://localhost:8080/favicon.ico"
}
```

The values will be passed in to the `register` method of the notifications.

## Source Reference

- [notifications.ts](../client/src/framework/workspace/notifications.ts)

[<- Back to Table Of Contents](../README.md)
