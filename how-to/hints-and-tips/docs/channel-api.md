> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# [Channel API](https://developers.openfin.co/of-docs/docs/channels)

OpenFin’s Channel API on the InterApplicationBus (IAB) provides optionality for secure desktop messaging between your application and other OpenFin applications. The Channel API is used when building the equivalent of an SDK to expose functionality/data to other applications or other views/windows within your application. See [Channel API Documentation](https://developers.openfin.co/of-docs/docs/channels) or [Channel API SDK Documentation](https://developer.openfin.co/docs/javascript/stable/InterApplicationBus.Channel.html).

## Naming a Channel

When naming a channel you should ensure that it will be unique. If it is something common e.g. "data" then you may come across conflicts where other OpenFin applications have also called their channel "data". So you should ensure that it is unique.

### Suggestion

#### Use the uuid of your application

```js
const myChannelId = `${fin.me.identity.uuid}-data`;
const myChannel = await fin.InterApplicationBus.Channel.create(myChannelId);
```

This should give you a unique channel name even if you run an instances of your app for each environment (e.g. dev, uat, staging). Each environment's manifest should have a unique uuid if they are to be run side-by-side.

## Creating a Channel

When creating a channel you should have wrap the creation in a try/catch. This will ensure that an error (such as a channel with the same name already existing) will not break your application's flow.

```js
try {
  const myChannelId = `${fin.me.identity.uuid}-data`;
  const myChannel = await fin.InterApplicationBus.Channel.create(myChannelId);
} catch (err) {
  // manage and log the error
}
```
