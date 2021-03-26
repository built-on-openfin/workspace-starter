# Self Host OpenFin Workspace

This example showcases how to self host OpenFin Workspace's frontend assets.

## Getting Started

1. Install dependencies.

```bash
$ npm install
```

2. Build the project.

```bash
$ npm run build
```

3. Download the sample self hosted build of OpenFin Workspace.

```bash
$ npm run download
```

4. Start the sample server.

```bash
$ npm run start
```

5. Launch Home and Browser using the locally served assets.
   (Make sure Home and Browser are closed before executing command.)

```bash
$ npm run start:hosted
```

## How it works

1. OpenFin provides a zipped bundle of all of the OpenFin Workspace assets for self hosting. This example uses an example self hosted bundle downloaded from the OpenFin CDN. The link to the example self hosted bundle can be found [here](https://home-staging.openfin.co/assets/demo/hosted-workspace.zip).

2. The unzipped assets are then served from a self hosted server.

3. Users launch OpenFin using the app manifest served from the self hosted server.

## Some things to note

The relative path to frontend assets are hardcoded into the bundle.
By default this path is `/workspace`. If you wish to use a different path,
reach out to OpenFin support and they will provide a custom bundle with the path of your choosing.

Another thing to keep in mind, OpenFin app manifests cannot contain relative paths. It is up to you
to change the URLs within the manifest to point at your self hosted server manually, or add a route
to your server which automates this process (Like in this example).

## Caveats and alternatives

By self hosting, you are locked down to a very specific version of OpenFin Workspace.
In order to get the latest and greatest of OpenFin Workspace, you will have to request a new bundle from OpenFin.
You will also have to request a new bundle if a hotfix or patch needs to be applied to the frontend assets.

An alternative to self hosting is using a [reverse proxy](https://www.nginx.com/resources/glossary/reverse-proxy-server/#:~:text=A%20reverse%20proxy%20server%20is,traffic%20between%20clients%20and%20servers.). With a reverse proxy, requests from end user's machines
will never leave your network. Only your reverse proxy server will leave your network, in order to request assets from OpenFin's CDN. This method secures end user's machines while still supporting easy updates to OpenFin Workspace version.
