> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Customize Browser

The browser is the component of OF Workspace that displays your views, see [Browser Overview](https://developers.openfin.co/of-docs/docs/browser-sdk-overview) in the main developer docs for more details.

![Browser](./assets/browser-window.png)

## Customizing The Browser

In the customize example you can configure some features of the window, as well as the toolbar buttons and the menus.

To configure the `title` and `icon` for the window add the following:

```json
"browserProvider": {
    "windowOptions": {
        "title": "My Application",
        "icon": "http://localhost:8080/favicon.ico"
    }
}
```

In the title bar of the window the pages are listed, by default the plus button next to the pages is not visible, this can be configured to open a view by setting `newPageUrl`. The same is true of the views, the plus button next to the view tabs is hidden by default, but can be configured by setting `newTabUrl` to open a view.

```json
"browserProvider": {
    "windowOptions": {
        ...
        "newPageUrl": "http://localhost:8080/common/views/platform/new-page.html",
        "newTabUrl": "http://localhost:8080/common/views/platform/new-tab.html"
    }
}
```

The theming for the browser window is configured in the platform using a pallette, see [How To Theme Your Platform](./how-to-theme-your-platform.md).

## Menu And Buttons

In addition to the window itself the menus and buttons can be customized, see [How To Customize Browser Buttons](./how-to-customize-browser-buttons.md) and see [How To Customize Browser Menus](./how-to-customize-browser-menus.md).

## Source Reference

- [browser.ts](../client/src/framework/platform/browser.ts)

[<- Back to Table Of Contents](../README.md)
