# Content Discovery Service Example

An example of plugging your own content, such as Apps and Workspaces, into OpenFin Home and Browser via a simple REST API.

## Getting Started

1. Install dependencies.

```bash
$ npm i
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

1. Start the Home and Browser application.

```bash
$ npm run start:hb
```

6. Navigate to the `Launch` or `Workspaces` view in the Home UI. 
   You should see the [apps](content-discovery-service/public/apps.json) and [workspaces](content-discovery-service/public/workspaces.json) as described in their respective files.

## How it works

The Content Discovery Service in this example provides three different sets of content over HTTP GET.
- [A Desktop Owner Settings file](content-discovery-service/public/dos.json)
- [A list of applications](content-discovery-service/public/apps.json)
- [A list of workspaces](content-discovery-service/public/apps.json)

When Home starts up, it will first look at the Desktop Owner Settings file configured in step 3 for a overridden `appDirectoryUrl` and `workspacesUrl`. 
If Home finds these configuration settings, it will request data from the URLs configured instead of its default endpoints.

In this example, the [Desktop Owner Settings file](content-discovery-service/public/dos.json) has its `appDirectoryUrl` configured to the 
previously mentioned [list of applications](content-discovery-service/public/apps.json) and its `workspacesUrl` configured to the 
[list of workspaces](content-discovery-service/public/workspaces.json). Hence, all of the content that Home renders is sourced from our
Content Discovery Service.

## Documentation

- [General Desktop Owner Settings information.](https://developers.openfin.co/docs/desktop-owner-settings)
- [Desktop Owner Settings for Home and Browser.](https://openfin-maker.readme.io/docs/use-your-own-content-discovery-service)
- [Create a Content Discovery Service](https://openfin-maker.readme.io/docs/create-a-content-discovery-service)
- [Content Discovery Service API Reference](https://openfin-maker.readme.io/reference/about-openfin-home-api)