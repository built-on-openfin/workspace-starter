> **_:information_source: HERE Core UI:_** [HERE Core UI](https://resources.here.io/docs/core/hc-ui/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the HERE Core Container and HERE Core UI components is only granted pursuant to a license from HERE (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# What Is Fdc3?

[FDC3](https://resources.here.io/docs/core/container/interop/fdc3/) is a standard that HERE contributed to [FinOS](https://www.finos.org/).

FDC3 provides a way of:

- Exchanging messages with content running within your platform
- Exchanging messages with external applications (if you allow them to connect to your platform)
- A way of triggering workflows (called Intents) and passing a contextual object to the target (e.g. Intent ViewChart and here is the Instrument contextual object).

The contextual objects you share can be custom (there is a type property where you can specify your own namespace) or it can be one of the agreed upon types (instrument, portfolio, organization, contact etc).

As a platform:

- You can decide who can connect to you
- Whether content should have the FDC3 api injected into the document
- How you present the list of possible intent handlers to your users

As a content creator:

- You can decide whether you wish to broadcast or listen to contextual objects
- Whether you content will listen for intent requests
- What intents you wish to declare that you support in your app definition

## Useful links

- <https://resources.here.io/docs/core/container/interop/fdc3/> - FDC3 related content on the HERE website
- <https://fdc3.finos.org> - The official fdc3 content.
- <https://training.linuxfoundation.org/express-learning/introduction-to-fdc3-lfel1000/> - Linux Foundation's free Introduction to FDC3 course.

## Enabling FDC3 in your Openfin Application

### Manifest

In your manifest you can define default Window Options and default View Options. You can specify that you wish FDC3 (and what version) enabled for all views and windows in your manifest:

```js
"platform": {
  "defaultWindowOptions": {
    "fdc3InteropApi" : '2.0'
  },
  "defaultViewOptions": {
    "fdc3InteropApi" : '2.0'
  }
}
```

In your manifest within the platform definition you can also enable/disable the FDC3/Interop console logging HERE does (it is true by default):

```js
"platform": {
 "interopBrokerConfiguration": {
   "logging": {
    "beforeAction": {
     "enabled": true
    },
    "afterAction": {
     "enabled": true
    }
   }
  }
}
```

### Window / View Options

If you do not globally enable the fdc3 API you can opt into FDC3 at the Window/View level via Window/View options.

#### Enabling the FDC3 API

```js
{
    "url": "http://yoururl",
    "fdc3InteropApi" : '2.0'
}
```

#### Defaulting to a user channel

You can have a view/window automatically join a user channel if it is specified in the View/Window Options

```js
{
 "url": "http://yoururl",
 "fdc3InteropApi": "2.0",
 "interop": {
  "currentContextGroup": "green"
 },
}
```

## Guides

We provide guides on [how to configure intents](./how-to-configure-fdc3-intents.md) for your HERE Core UI Platform and [how to add context support](./how-to-add-context-support-to-your-app.md), [how to add intent support](./how-to-add-intent-support-to-your-app.md) and [how to add fdc3 open support](./how-to-add-open-support-to-your-app.md) to your content/app. We recommend going through the concepts and working your way down the guides if you are new to HERE and HERE Core UI. We also provide a configured workspace (see [third.manifest.fin.json](../public/third.manifest.fin.json)) that is configured to use an FDC3 App Directory and only brings in FDC3 related tools.

[<- Back to Table Of Contents](../README.md)
