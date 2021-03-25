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
