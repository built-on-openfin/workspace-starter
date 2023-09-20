> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# How To Customize the Splash Screen

When the platform is starting a splash screen is displayed, the splash screen automatically updates based on the component that is currently being initialized.

![Splash Screen](./assets/splash-screen.png)

You can disable the splash screen with the following option.

```json
{
   "splashScreenProvider": {
      ...
      "disabled": true,
   }
}
```

The following properties can be configured to change the style and content of the splash screen. All of the properties have sensible defaults, and do not need to be configured.

```json
{
   "splashScreenProvider": {
     ...
     "title": "My Platform", // Defaults to platform title
     "icon": "http://localhost:8080/favicon.png", // Defaults to platform icon
     "width": 200, // Defaults to 400
     "height": 200, // Defaults to 130
     "backgroundColor": "#FFFFFF", // Defaults to platform theme backgroundPrimary
     "textColor": "#000000", // Defaults to platform theme textDefault
     "borderColor": "#EEEEEE" // Defaults to platform theme background4
   }
}
```

If you want to change the layout of the splash screen completely you could modify [../public/platform/splash.html](../public/platform/splash.html)

## Source Reference

- [platform-splash.ts](../client/src/framework/platform/platform-splash.ts)

[<- Back to Table Of Contents](../README.md)
