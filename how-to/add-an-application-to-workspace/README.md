<img src="../../assets/OpenFin-Workspace-Starter.png" width="100%" alt="OpenFin Workspace Example Application -- Adding your application the Content Discovery Service" />

OpenFin Workspace is currently **only supported on Windows**.

# Add an Application to OpenFin Workspace

The Workspace uses a **Content Discovery Service** to know which content and apps it can access through Home and Browser.

This micro application is a simple example of plugging your own content or app.
## Getting Started

1. Install dependencies.

```bash
$ npm install
```

2. Build the project.

```bash
$ npm run build
```

3. Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/docs/desktop-owner-settings).
   This example includes a utility that will add the Windows registry key for you.
   (WARNING: This will kill all open OpenFin processes)

```bash
$ npm run dos
```

4. Start the content discovery service server.

```bash
$ npm run start
```

5. Start the Home and Browser application.

```bash
$ npm run start:workspace
```

6. Navigate to the `Launch` or `Workspaces` view in the Home UI.
   You should see the [apps](public/apps.json) and [workspaces](public/workspaces.json) as described in their respective files.

## How it works

The Content Discovery Service in this example provides three different sets of content over HTTP GET.

- [A Desktop Owner Settings file](public/dos.json)
- [A list of applications](public/apps.json)
- [A list of workspaces](public/apps.json)

When Home starts up, it will first look at the Desktop Owner Settings file configured in step 3 for a overridden `appDirectoryUrl` and `workspacesUrl`.
If Home finds these configuration settings, it will request data from the URLs configured instead of its default endpoints.

In this example, the [Desktop Owner Settings file](public/dos.json) has its `appDirectoryUrl` configured to the
previously mentioned [list of applications](public/apps.json) and its `workspacesUrl` configured to the
[list of workspaces](public/workspaces.json). Hence, all of the content that Home renders is sourced from our
Content Discovery Service.

### Read more about [configuring content in Workspace](https://developers.openfin.co/of-docs/docs/add-your-content-to-workspace) in our docs
