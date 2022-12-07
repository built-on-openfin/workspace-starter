> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Secure Your Platform

This provides some general guidance around things to consider when building a platform. Security considerations that you would consider for a Web Application still apply here and you need to ensure that you follow your organization's security guidelines.

## Security Permissions

OpenFin has a permission model where you can request the ability to perform certain actions (like launch an external process). This is useful for when you need to launch a native application that integrates with your platform but should be considered before opting into it.

The default samples request the following permissions:

```json
"permissions": {
   "System": {
    "launchExternalProcess": true,
    "terminateExternalProcess": true,
    "downloadAsset": true,
    "openUrlWithBrowser": {
     "enabled": true,
     "protocols": ["mailto"]
    }
   }
  },
```

These are required to demonstrate our native application integration but you should consider every permission your application will request when you have your own manifest. Do you need it? You should also review the permission you request at intervals to ensure that the requested permissions are still needed.

Please review our api security documentation to see the available permissions and how they can be secured: [API Security](https://developers.openfin.co/of-docs/docs/api-security)

## Security Realms

A security realm is a mechanism used for protecting your running web application from other OpenFin applications on the same machine. It gives you the ability to protect a resource with a defined security constraint and then define the ways that external applications can access the protected resource.

There are arguments you can specify that will isolate your application while still allowing it to communicate with other runtimes. Our second sample [second.manifest.fin.json](../public/second.manifest.fin.json) shows this setting in action:

```json
"runtime": {
  "arguments": "--v=1 --inspect --enable-mesh --security-realm=second-workspace-starter-how-to-customize-workspace",
  ...
 },
```

Please see our security page for more information about OpenFin Security: [Security Overview](https://developers.openfin.co/of-docs/docs/openfin-security)

## Manifest Host

Customize Workspace can fetch it's configuration solely from a manifest or from a manifest and a settings endpoint (see [How To Apply Entitlements](./how-to-apply-entitlements.md) defined in a manifest.

You may have your code on one server and your manifest coming from another. Customize Workspace code looks for a [manifest-hosts.json](../public/manifest-hosts.json) file to see if the host from which the manifest comes is in the list of trusted hosts. It will only continue to run if it finds a match.

The json file is currently configured to support localhost manifests and OpenFin related domains. Please update it to reflect your own host names.

### Secure who can connect to your platform

You may wish to allow other applications to connect to your broker, or provide apps or become part of a snapshot. An approach you can follow may be requiring a payload when someone connects to you alongside a UUID list. See [how to manage connections to your platform](./how-to-manage-connections-to-your-platform.md)

## General Web Security

As a platform is a web application please consider the same security guidelines that you would for a web application (e.g. trusting the JavaScript modules you import, using [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) etc).

## Updates To Container, Workspace And Code

It is a good idea to keep an eye out for Workspace releases, the runtime updates that come with them and the updates applied to this repo to reflect those updates.

[Workspace Versions](https://developer.openfin.co/versions/?product=Services#/?product=Workspace)

[<- Back to Table Of Contents](../README.md)
