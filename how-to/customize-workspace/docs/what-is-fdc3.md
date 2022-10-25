> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# What Is Fdc3?

[FDC3](https://developers.openfin.co/of-docs/docs/fdc3-support-in-openfin) is a standard that OpenFin contributed to [FinOS](https://www.finos.org/).

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

We provide guides on [how to configure contextual groups](./how-to-configure-fdc3-context-groups.md) and [how to configure intents](./how-to-configure-fdc3-intents.md) for your workspace platform and [how to add context support](./how-to-add-context-support-to-your-app.md) and [how to add intent support](./how-to-add-intent-support-to-your-app.md) to your content/app. We recommend going through the concepts and working your way down the guides if you are new to OpenFin and OpenFin Workspace. We also provide a configured workspace (see [third.manifest.fin.json](../public/third.manifest.fin.json)) that is configured to use an FDC3 App Directory and only brings in FDC3 related tools.

[<- Back to Table Of Contents](../README.md)
