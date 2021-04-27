<img src="../../assets/OpenFin-Workspace-Starter.png" width="100%" alt="OpenFin Workspace Example Application -- Adding your application the Content Discovery Service" />

OpenFin Workspace is currently **only supported on Windows**.

# Launch your Content in OpenFin Workspace

OpenFin Workspace uses a **Content Discovery Service** to know which content and apps it can access.

This application you are about to install is a simple example of plugging in your own content or app. This example assumes you have already [set up your development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment)

## Getting Started

1. Install dependencies. Note that these examples assume you are in the subdirectory for the example.

```bash
$ npm install
```

2. Build the project.

```bash
$ npm run build
```

3. Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/docs/desktop-owner-settings).
   This example includes a utility (`desktop-owner-settings.bat`) that adds the Windows registry key for you, pointing to a local desktop owner 
   settings file so you can test these settings. If you already have a desktop owner settings file, this script prompts to overwrite the location. Be sure to capture the existing location so you can update the key when you are done using this example.

   (WARNING: This script kills all open OpenFin processes.)

```bash
$ npm run dos
```

4. Start the Content Discovery Service server in a new window.

```bash
$ start npm run start
```

5. Start Workspace.

```bash
$ npm run start:workspace
```

6. Navigate to the `Launch` or `Workspaces` view in the Home UI.
   The [apps](public/apps.json) and [workspaces](public/workspaces.json) are displayed as described in their respective files.

## How it works

The Content Discovery Service in this example provides three sets of content over HTTP GET.

- [A Desktop Owner Settings file](public/dos.json)
- [A list of applications](public/apps.json)
- [A list of workspaces](public/workspaces.json)

When Home starts, it first looks at the Desktop Owner Settings file, configured in step 3, for a overridden `appDirectoryUrl` and `workspacesUrl`.
If Home finds these configuration settings, it requests data from the URLs configured instead of its default endpoints.

In this example, the [Desktop Owner Settings file](public/dos.json) has its `appDirectoryUrl` configured to the
previously mentioned [list of applications](public/apps.json) and its `workspacesUrl` configured to the
[list of workspaces](public/workspaces.json). Hence, all of the content that Home renders is sourced from OpenFin's
Content Discovery Service.

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/workspace-overview). 
