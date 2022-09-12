> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# What is an Integration Provider?

An Integration Provider is one of the personas you and your team may fall under (you can be more than one).

The Home Workspace Component is a Search UI where users can enter queries and apply filters. The results can be a list of entries and these entries can have custom templates displayed when an entry is highlighted.

Out of the box a [Platform Provider](./what-is-a-platform-provider.md) can list the application definitions that it supports and allow the user to filter them by typing in characters or using the tag filter. A platform provider may also decide to allow saved Workspaces and Pages to be launched by using the Home UI to find and manage one via the buttons exposed on the template for a particular entry.

If a [Platform Provider](./what-is-a-platform-provider.md) wants to extend this capability to allow the searching of data (e.g. SalesForce data or data from within a legacy system) or the execution of commands e.g. /buy 10m cable (and use the templating mechanism to make actions available) then they can either build JavaScript modules to add this functionality or allow other teams to build the JavaScript modules. This modules can be defined via settings and could be entitlement based.

This is the role of an Integration Provider. They can expose data or commands and have the entry listed against one or more Workspace Platforms by having them include their JavaScript Integration module via the Workspace Platform's settings.
