> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../../../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin. Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# Window Level App Channel

If you want to share information across all views in a window then you can use an FDC3 app channel or an Interop Session Context Group to share that information.

The important piece is to have a common key shared across all views (and panels if you are using the Browser Fixed panel support). Views are created and initially assigned to your provider window until the target window is created and the view is moved.

If you request the parent window early from a view (e.g. inside of a preload script or early on in the process) then you may initially see the provider id as the window identity which is not what you want.

```js
/**
  * Get the identity of the window containing a view.
  * @param view The view to get the containing window identity.
  * @returns The identity of the containing window.
  */
 private async getViewWindowIdentity(view: OpenFin.View): Promise<OpenFin.Identity> {
  const currentWindow = await view.getCurrentWindow();

  // If the view is not yet attached to a window, wait for the
  // target-changed event which means it has been attached
  if (currentWindow.identity.name === undefined || currentWindow.identity.name === currentWindow.identity.uuid) {
   return new Promise<OpenFin.Identity>((resolve, reject) => {
    // eslint-disable-next-line jsdoc/require-jsdoc
    async function hostWindowChanged(): Promise<void> {
     const hostWindow = await view.getCurrentWindow();
     if (hostWindow.identity.name !== hostWindow.identity.uuid) {
      await view.removeListener("target-changed", hostWindowChanged);
      resolve(hostWindow.identity);
     }
    }
    view
     .on("target-changed", hostWindowChanged)
     .catch(() => {});
   });
  }
  return currentWindow.identity;
 }
```
