> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How to deploy your platform

The OpenFin website has a section dedicated to deployment:

[https://developers.openfin.co/of-docs/docs/deploying-applications](https://developers.openfin.co/of-docs/docs/deploying-applications)

## Installer

If you have a manifest setup to your liking (e.g. a local setup would be [manifest.fin.json](../public/manifest.fin.json)) then you can move onto creating an installer for that manifest:

- [https://install.openfin.co](https://install.openfin.co)

This page will take the url to your manifest (you can use localhost for testing) and give you a zipped installer. The zipped installer is our Runtime Version Manager (RVM see [installation with RVM](https://developers.openfin.co/of-docs/docs/installation-with-rvm)) and this will install without requiring admin rights and pull down the required OpenFin runtime from our CDN.

Your manifest can add specify settings that can customize the download screen (see [customizing dialog settings](https://developers.openfin.co/of-docs/docs/application-configuration#section-dialogsettings-properties)) as well as present a splash screen (see [splash screen settings in top level properties](https://developers.openfin.co/of-docs/docs/application-configuration#section-top-level-properties)).

You can then create installers for your other environments (e.g. DEV, UAT) if you wish to have others install and test your Workspace Platform.

## Detecting If OpenFin is installed

When you are deploying your application and an end user is visiting your site using a desktop browser you can now detect whether or not OpenFin is installed and if it is capable of launching applications using the fins link protocol (which is the default installation behavior).

With this knowledge you can present them with a link to click and launch if they are capable of doing so, or a download link so they can download and run the installer:

[https://developers.openfin.co/of-docs/docs/how-to-detect-openfin-in-your-app](https://developers.openfin.co/of-docs/docs/how-to-detect-openfin-in-your-app)
