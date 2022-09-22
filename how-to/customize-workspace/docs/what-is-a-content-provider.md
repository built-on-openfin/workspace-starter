> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# What Is A Content Provider?

A Content Provider is one of the personas you and your team may fall under (you can be more than one).

A Content Provider is mainly concerned with:

- Building html content that provides value and business functionality (this could be a single page application or more likely a collection of Micro UIs)
- Using feature detection to determine if they want to take advantage of the FDC3 API to provide context data sharing or intent workflow support.
- Using feature detection to determine if they want to take advantage of the Fin API to provide an enhanced experience.
- Deciding if they want to take advantage of the Notification Center registered by the host platform.
- Providing registration data so that their content can be discovered in Home, Store and Dock and whether it will participate in Intent based workflows.

A Content Provider is mainly concerned about providing content (generally in a micro UI format) that can be used by one or more platforms or run within a Browser or native app using an embedded view.
