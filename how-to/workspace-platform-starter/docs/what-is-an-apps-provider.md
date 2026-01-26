> **_:information_source: HERE Core UI:_** [HERE Core UI](https://resources.here.io/docs/core/hc-ui/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the HERE Core Container and HERE Core UI components is only granted pursuant to a license from HERE (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation key or to discuss a production license.

[<- Back to Table Of Contents](../README.md)

# What Is An Apps Provider?

An Apps Provider is one of the personas you and your team may fall under (you can be more than one).

You have seen what a [Content Provider](./what-is-a-content-provider.md) is. They define their content as an App Definition and provide it to the [Platform Provider](./what-is-a-platform-provider.md). In cases where a Platform Provider supports a number of teams and vendors they may wish to enable the importing of multiple App Directories (each controlled by an Apps Provider) so that they do not need to manage the list of applications and can instead import the feeds from various sources.

This is a choice the [Platform Provider](./what-is-a-platform-provider.md) makes but an Apps Provider is simply someone who aggregates and validates a list of App Definitions and makes them available to the [Platform Provider](./what-is-a-platform-provider.md).

HERE Core UI Platform Starter lets you easily define a single or multiple App Providers via an appProvider configuration. This supports the **Launcher** and **Aggregate View** use cases mentioned in the [FDC3 App Directory Overview](https://fdc3.finos.org/docs/app-directory/overview) and and you can learn more by reading the guide [How To Define Apps](./how-to-define-apps.md).

[<- Back to Table Of Contents](../README.md)
