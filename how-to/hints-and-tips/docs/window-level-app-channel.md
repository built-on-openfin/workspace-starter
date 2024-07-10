> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../../../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin. Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# Window Level App Channel

If you want to share information in a custom way e.g. across all views in a window then you can use an FDC3 app channel or an Interop Session Context Group to share that information. Alternatively you can look at creating a custom implementation using a custom interop broker to create user groups per window and ensuring the views are assigned and removed from those groups as they get added and removed from a window.

This example uses app channels and the window name as the key. This logic could be packaged as reusable packages for your views. The important piece is to have a common key shared across all views (and panels if you are using the Browser Fixed panel support). Views are created and initially assigned to your provider window until the target window is created and the view is moved.

## Listening for window level messages

```js
let windowLevelChannelListener;

async function listenToWindowLevelChannel(contextType, callbackToReceiveContext) {
  if(window.fdc3 !== undefined && window.fin !== undefined) {
    if(windowLevelChannelListener !== undefined) {
      // We are currently listening to something. Lets dispose of this as we ay be setting up
      // a new listener.
      console.log("Unsubscribing from previous channel.");
      windowLevelChannelListener.unsubscribe();
    }
    try {
      const currentWindow = await fin.me.getCurrentWindow();
      const windowIdentity = currentWindow.identity;
      if(windowIdentity.name !== undefined && windowIdentity.name !== windowIdentity.uuid) {
        // the view has been assigned to a window, start listening.
        console.log("Creating or fetching app channel with name:", windowIdentity.name);
        const appChannel = await window.fdc3.getOrCreateChannel(windowIdentity.name);
        // start listening
        windowLevelChannelListener = appChannel.addContextListener(contextType, callbackToReceiveContext);
      }
    } catch (err){
      //app could not register the channel
      console.error("Error registering the window channel", err);
      windowLevelChannelListener = undefined;
    }
  } else {
    console.warn("Unable to listen to window level context as the fdc3 and/or fin api is not available.");
  }
}

async function contextHandler(ctx) {
  console.log("This is the function that would be passed the window level context", ctx);
}

async function init() {
  // listen for messages sent to the window.
  // this is using fdc3.contact as an example. You can pass null if you want to listen for all messages
  await listenToWindowLevelChannel("fdc3.contact", contextHandler);

  // listen for times that the view is moved from one window to another and update
  // your listener.
  fin.me.on("target-changed", async ()=> {
    // this is using fdc3.contact as an example. You can pass null if you want to listen for all messages
    await listenToWindowLevelChannel("fdc3.contact", contextHandler);
  });
}

// trigger the init call e.g. when the document is loaded.
await init();
```

## Publishing window level messages

```js
let windowChannel;

async function assignWindowLevelChannel() {
  if(window.fdc3 !== undefined && window.fin !== undefined) {
    try {
      const currentWindow = await fin.me.getCurrentWindow();
      const windowIdentity = currentWindow.identity;
      if(windowIdentity.name !== undefined && windowIdentity.name !== windowIdentity.uuid) {
        // the view has been assigned to a window, get a channel to use for broadcasting.
        console.log("Creating or fetching app channel with name:", windowIdentity.name);
        windowChannel = await window.fdc3.getOrCreateChannel(windowIdentity.name);
      }
    } catch (err){
      //app could not register the channel
      console.error("Error getting or retrieving the channel", err);
      windowChannel = undefined;
    }
  } else {
    console.warn("Unable to create a window level channel as fdc3 is not available.");
  }
}

async function init() {
  // create the window level channel
  await assignWindowLevelChannel();

  // listen for times that the view is moved from one window to another and update
  // the window level channel.
  fin.me.on("target-changed", async ()=> {
    await assignWindowLevelChannel();
  });
}

async function broadcastContext(contact){
  // this is using fdc3.contact as an example but you could be sending any context type.
  if(windowChannel !== undefined) {
    console.log("Broadcasting context:", contact);
    windowChannel.broadcast(contact);
  } else {
    console.warn("Window level channel is not available yet. Ensure you have called the init function before trying to broadcast.");
  }
}

// initialize your code e.g. on document load
await init();
// in your code you might have something that is listening for a contact selection from a 
// grid and then triggers the broadcast like the following:

const selectedContact = {
     type: "fdc3.contact",
     name: "Joe Smith",
     id: {
         email: "joe@example.com"
     }
   };
broadcastContext(selectedContact);
```
