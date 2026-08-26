> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../../../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin. Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

## Implementing an Auto-Save Feature in Here Core (formally Openfin Workspace)

The ability to auto-save a user's last known layout or page visited is common in every modern browser.  So much so that many users expect this behavior across all of their devices.  THe following guide will give you some options relating to saving a user's place in the Here Core Platform, which you will be able to add to your implementation for usage.

#### Important Notes on "Saving"

When implementing any "auto-save" feature, what we are doing at the core of this functionality is taking a snapshot of the entire platform and it's windows and content at a point in time using the [Platform.getSnapshot](https://developer.openfin.co/docs/javascript/stable/classes/OpenFin.Platform.html#getSnapshot) API functionality that Here Core provides.  Snapshots are JSON representations of what is displayed on a User's Desktop at a point in time, and can be saved to a database, locally, or stored as a blob on a storage volume for future usage.   A stored JSON Snapshot can then be applied to a User's Desktop by using the [Platform.applySnapshot](https://developer.openfin.co/docs/javascript/stable/classes/OpenFin.Platform.html#applySnapshot) function.

As an example, you would create a function like this to call the getSnapshot functionality:

```typescript
async function takeSnapshot(): Promise<void> {
    const platform = await fin.Platform.getCurrent();
    const snapshot = await platform.getSnapshot();
    // Do something with the snapshot object...
}
```

### Options for Auto-Saving

#### Option 1: Implement a timer on the Platform

Implementing a timer is the first choice for users, as it is easy to implement, and takes snapshots over a period of time.  We recommend using a tight timeframe like 1sec-5secs as it might affect performance if your Platform is also running memory-intensive applications.  This code would sit somewhere in your Platform implementation code, so that the interval is started on startup.  You could also pass a configuration value in here from the manifest file if you'd like.

```typescript
async function saveAtInterval(interval: int): Promise<void> {
    setInterval(async () => {
        await takeSnapshot();
    }, interval); // Interval in milliseconds. 
}
```

#### Option 2: Listen to View, Window, and Close Events from your Platform

The second option is creating listeners on your platform to decide when to save on demand.  Usually, this is done when a View, Window, or the entire Platform is closed, and you want to catch the state of the desktop before the User closes something. This can also be done from the Platform-level, and involves the [Platform.addListener](https://developer.openfin.co/docs/javascript/stable/classes/OpenFin.Platform.html#addListener) method.  Here are some examples for each:

##### Examples

```typescript

// For when a View is closed out.
const platform = await fin.Platform.getCurrent();
await platform.addListener("view-destroyed", async (e) => {
    await takeSnapshot();
});

// For when a Window is closed.
await platform.addListener("window-closed", async (e) => {
    await takeSnapshot();
});

// For when a User closes the whole Platform.
await platform.addListener("closed", async (e) => {
    await takeSnapshot();
});
```

It should be noted here that the Platform.addListener function has a long list of events that can also be added, such as "view-blurred", "view-url-changed", and "window-closing" to name a few. You should work with your business team to fit the functionality with your own unique requirements.

#### Wrapping Up

There are a few options with implementing Auto-Save for your Here Core Platform.  You might want to implement one or both of these options so that you're delivering a consistent experience for your users. It is important to consider how often and where you would like your snapshots to be saved for recollection later. If you have any questions, please contact [Here Support](mailto:support@here.io) or your assigned Solutions Engineer for a deeper dive into options and customizability.
