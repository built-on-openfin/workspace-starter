> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# What Is A Platform Provider?

A Platform Provider is one of the personas you and your team may fall under (you can be more than one).

A Platform Provider is responsible for:

- The installation experience (OpenFin has a dedicated deployment team that can help you with your deployment related questions but we provide tools to help generate the installer if the desktop doesn't already have OpenFin installed)
- The platform is the host application and as such you influence the branding (logo and palette) and what Workspace features you wish to make available to your end users.
- The platform decides whether authentication is needed to launch the Workspace components (content providers may require users to authenticate themselves unless you all fall under SSO).
- The platform decides what browser buttons and menu options to make available.
- The platform decides whether it wants to allow the saving of pages and windows and whether that should be saved locally or to a server owned by the platform provider.
- The platform decides what apps can be listed and where that list of apps comes from.
- The platform decides if it wants to allow searching beyond searching for applications (e.g. searching back end data sources)
- The platform decides if it wants to allow the raising of intents and whether or not external applications should be able to connect in order to do contextual data sharing or to raise an intent.

These are some of the consideration the Platform Provider needs to consider. The platform is the host, the shell UI that the end user sees. The platform provides a consistent behavior to the end user and helps ensure that relevant content is presented.

Customize Workspace provides help in defining this experience through config and the guide section will walk you through some of the choices available to you (and how you can extend them).
