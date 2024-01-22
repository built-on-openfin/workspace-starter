> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../../../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin. Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# Resize Event

If you are building content for Workspace Browsers or a Platform API Window and you wish to resize an event when the view is resized then there is a JavaScript event you can listen for. This will notify you when:

- The window is resized and that triggers a change in a view.
- The splitter in our layout system is used to resize content and that impacts your view.
- The view is dragged and dropped within the layout.
- The view is hidden by another tab and then the view's tab is selected.
- The view is dragged out of or into a window.

A window resize can trigger a lot of events so our example below includes some basic throttling logic.  

## Example code

This is an example. Please take this into consideration when reading and using this snippet:

```js
let throttleResizeTimer;

function onViewResize() {
    // Your event handling code goes here
    console.log("View Resized");
}

function throttleResizeEventHandler() {
    if (throttleResizeTimer) {
        clearTimeout(throttleResizeTimer);
    }

    throttleResizeTimer = setTimeout(onViewResize, 200); // Adjust this to suit your thresholds
}

// Attach the resize event handler this way.
addEventListener('resize', throttleResizeEventHandler);

// or you can assign the eventHandler this way:
visualViewport.onresize = throttleResizeEventHandler;
```

Additional information about this event can be found here: [https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport/resize_event](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport/resize_event).
