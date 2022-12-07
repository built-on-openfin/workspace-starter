> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# Managing Connections To Your Platform

How do you control who can connect to you and become a snapshot source, or to provide a list of apps for home/store that are included in the snapshot source? What if they also want to request a specific set of actions from your platform? What if you want to control who can connect to your interop broker (e.g. to share context or listen for context)?

We have a connection provider where you can define a list of identities (or a wildcard \*) along with a set of connection types that are supported for that a particular identity.

## Connection Types

### appSource

This connection type exists when you want your platform to support app entries provided by external apps (e.g. a native app). The native app in this example would connect to a specific channel (defined in your settings) and it would support two functions:

- **getApps**: This function is expected to return an array of apps in workspace App format. This can be standard app entries or it could be a special app type that is intended to be returned to the native app on selection. If the intention is that the request goes back to the connected client then the app needs to have manifestType: "**connection**" and manifest: "YourConnectionUUID" as part of the app entry.
- **launchApp**: This function will be passed the selected app that was passed to the workspace if the manifestType was **connection**. The goal should be that you launch a child view/window using the information within the app definition.

#### App Source Configuration

**Allow all supported manifest types:**

```json
{ "type": "appSource" }
```

**Only allow specific supported manifest types:**

```json
{ "type": "appSource", "manifestTypes": ["connection", "view"] }
```

### snapshotSource

An external application can be part of a snapshot source. It can connect to the connectionProvider and register itself as a [SnapshotSource JavaScript](https://developer.openfin.co/docs/javascript/stable/SnapshotSource.html), [SnapshotSource .NET](https://cdn.openfin.co/docs/csharp/latest/OpenfinDesktop/html/473E6D3D.htm). The connecting client will need to support the getSnapshot and applySnapshot functions to return data that can be saved as part of a snapshot and used to rehydrate the state of the connected client when the snapshot is applied.

If you want the workspace platform to support launching your application if it isn't connected but is part of a snapshot then you can provide a standard app definition in the root of your snapshot object. The workspace platform will try and launch that app if it's manifest type is supported.

In the case of a .NET app this may be a inline launch external process app definition which includes command line args that provide the .NET app with the information needed to rehydrate state (e.g. your standard snapshot object includes a guid that is used to lookup state within the .NET app and this is passed via a command line arg if the app isn't already running).

#### Snapshot Source Configuration

```json
{ "type": "snapshotSource" }
```

### actions

The workspace platform may expose certain actions that can be called by connected applications. At this time (Workspace 10+) the following actions are supported:

- show-home
- hide-home
- show-store
- hide-store
- show-dock
- minimize-dock
- show-notifications
- hide-notifications

This is useful if your native applications have icons to improve their integration with a workspace platform.

The supported actions can be defined at a top level (default for all connected clients that support the connection type actions) or they can be specified at a lower level (e.g. this application can only show/hide home).

The connected application can execute an action by calling the action function and specifying the action they wish to execute on the connection e.g:

```csharp
public async void ShowHome()
{
    await _connectionService.DispatchAsync("action", new ActionPayload { action = AvailableActions.ShowHome });
}
```

A connected client can check to see what actions they are allowed to perform:

```csharp
public async Task<bool> CanExecuteAction(string action)
{
    var response = await _connectionService.DispatchAsync<ActionCheck>("canAction", new ActionPayload { action = action });
    return response.result;
}
```

#### Action Configuration

**Allow all supported actions:**

```json
{ "type": "actions" }
```

**Only allow specific supported actions:**

```json
{ "type": "actions", "supportedActions": ["show-home", "hide-home"] }
```

### broker

The workspace platform has a broker implementation and that means that context can be shared across views/applications. A workspace platform may wish to control who can connect to their broker (the default is to allow all connections).

The connectionProvider has a function that is used to see if a connection is listed and valid. Our interop broker calls this to see if a connection (be it an internal view or window or external application) supports the connectionType "broker". You can allow all connections (which is the default broker behavior and can be accomplished by adding the broker connection type against a wildcard entry) or you could allow any connection from within your platform but require a payload from every other connection to verify the connection (see validating a connection below).

#### Broker Configuration

```json
{ "type": "broker" }
```

## What does the configuration of a connection provider look like?

```json
"connectionProvider": {
   "connectionId": "customize-workspace-workspace-connection",
   "connectionValidationEndpoint": "connection-verification",
   "supportedActions": [
    "show-home",
    "show-store",
    "show-dock",
    "show-notifications",
    "hide-home",
    "hide-store",
    "minimize-dock",
    "hide-notifications"
   ],
   "connections": [
    {
     "identity": { "uuid": "customize-workspace" },
     "validatePayload": false,
     "connectionTypes": [{ "type": "broker" }]
    },
    {
     "identity": { "uuid": "*" },
     "validatePayload": true,
     "connectionTypes": [
      { "type": "appSource" },
      { "type": "snapshotSource" },
      { "type": "actions" },
      { "type": "broker" }
     ]
    }
   ]
  }
 }

```

The settings are as follows:

- **connectionId**: This is the id of the channel api apps will connect to (apps do not need to connect to it for the broker connection if that is all they are doing). Connected clients can explicitly call a disconnect function to let the workspace platform they are disconnecting e.g.

```csharp
await _connectionService.DispatchAsync("disconnect");
```

- **connectionValidationEndpoint**: This is the id of an endpoint (see [how to define endpoints](./how-to-define-endpoints.md)) that will be used to validate the identity and payload of a connecting client (see [example connection validation endpoint module](../client/src/modules/endpoints/example-connection-validation/endpoint.ts) that is loaded but always returns true).
- **supportedActions**: An array of default supported actions.
- **connections**: An array of connections your platform supports (as you can see in the example above we have added an entry for workspace platform view/window connections and an entry to allow all other connections but require payload verification).

## Example of Connecting Clients

- [CSharp Starter - Integrate with Workspace](https://github.com/built-on-openfin/csharp-starter/tree/main/how-to/integrate-with-workspace)

[<- Back to Table Of Contents](../README.md)
