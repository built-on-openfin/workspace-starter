![OpenFin Workspace Example Application -- Common Content](../../assets/OpenFin-Workspace-Starter.png)

> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

# Common Content

This folder contains common assets that apply across projects. If a sample needs them then it will reference them through the /common path. The local server will map that to this folder.

This lets each sample reference the examples they wish to make available without having to list all of them or duplicate the content. Common styling, images and snapshots can also be made available through this folder.

This folder supports building content written in TypeScript but a the majority of the examples are vanilla html, js and css to keep things simple and easy to tweak and refresh.

## Getting Started

1. Install dependencies. Note that these examples assume you are in the sub-directory for the example.

```shell
npm install
```

2. Build the project.

```shell
npm run build
```

If you build and start one of the other samples it will reference this project if needed.

---

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace)
