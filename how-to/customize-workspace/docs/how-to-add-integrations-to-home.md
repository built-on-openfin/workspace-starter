> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](../LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](../public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

[<- Back to Table Of Contents](../README.md)

# How To Add Integrations To Home ?

The [Home](./how-to-customize-home.md) components can be customized with additional sources that provide commands or search results when queried.

To add an integration you first need to create a module and configure the platform to load it, for more details on adding modules see [How To Add A Module](./how-to-add-a-module.md). In the case of home integrations you need to add the module to the `integrationProvider:modules` list.

```json
"integrationProvider": {
    "modules": [
        "enabled": true,
        "id": "my-integration",
        "url": "http://localhost:8080/js/modules/integrations/my-integration.bundle.js"
    ]
}
```

The module needs to implement the [IntegrationModule](../client/src/framework/shapes/integrations-shapes.ts#106) interface, and provide `entryPoints`.

```ts
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
  integrations: new MyIntegrationProvider()
};
```

## Implementation

To provide entries to the home component we need to implement two methods `getSearchResults` and `itemSelection`.

The `getSearchResults` will be passed the current `query` and any applied filters. This method can then construct any results it wants, with a custom template if required, or use one of the standard Home templates.

### Commands

We can return commands which have fixed results, the example below demonstrates a command that looks for a query starting `/open-site` and treats the rest of the query as a url.

```ts
public async getSearchResults(query: string, filters: CLIFilter[], lastResponse: HomeSearchListenerResponse): Promise<HomeSearchResponse> {
    const results: HomeSearchResult[] = [];

    if (query.startsWith("/open-site ")) {
        const url = query.replace("/open-site ", "");
        results.push({
            key: randomUUID(),
            title: `Open Web Site`,
            label: "Information",
            actions: [
                {
                    name: "open",
                    hotkey: "Enter"
                }
            ],
            data: {
                providerId: "my-integration",
                url
            },
            template: CLITemplate.Custom,
            templateContent: {
                layout: {
                    type: TemplateFragmentTypes.Text,
                    dataKey: "url",
                    style: {
                        fontSize: "10px"
                    }
                }),
                data: {
                    url
                }
            }
        });
    }

    return {
        results
    };
}
```

### Search Results

We can also have more dynamic results which interrogate other sources for their information.
The example below demonstrates a search that looks up data from a rest endpoint.

```ts
public async getSearchResults(query: string, filters: CLIFilter[], lastResponse: HomeSearchListenerResponse): Promise<HomeSearchResponse> {
    const results: HomeSearchResult[] = [];

    if (query.length > 5) {
        const results = await fetch(`https://my-custom-search/?${query}`);

        for (const result of results) {
            results.push({
                key: result.id,
                title: result.title,
                label: "Information",
                actions: [
                    {
                        name: "open",
                        hotkey: "Enter"
                    }
                ],
                data: {
                    providerId: "my-integration",
                    ...result
                },
                template: CLITemplate.Custom,
                templateContent: {
                    layout: {
                        type: TemplateFragmentTypes.Text,
                        dataKey: "description",
                        style: {
                            fontSize: "10px"
                        }
                    }),
                    data: {
                        description: result.description
                    }
                }
            });
        }
    }

    return {
        results
    };
}
```

### Selection

When an item is actioned in the results we need perform some processing, we do so by implementing the `itemSelection` method.

```ts
public async itemSelection(result: HomeDispatchedSearchResult, lastResponse: HomeSearchListenerResponse): Promise<boolean> {
    const data: { url?: string } = result.data;

    if (result.action.trigger === "user-action") {
        if (result.action.name === "open" && result.data.url) {
            await this._integrationHelpers.openUrl(data.url);
            return true;
        }
    }

    return false;
}
```

As you can see with very little code we can provide home entries with actions. For more in depth examples you can take a look at the `customize-home-templates` example.

## Help Query

You can provide help for your commands by implementing the `getHelpSearchEntries` method. If you also add the `populateQuery` property in the data object the help entry will auto fill the home search query box when hitting enter.

```ts
public async getHelpSearchEntries?(): Promise<HomeSearchResult[]> {
    return [
        {
            key: `open-site-help`,
            title: "/open-site",
            label: "Help",
            icon: "http://localhost:8080/favicon.ico,
            actions: [],
            data: {
                providerId: "my-integration",
                populateQuery: "/open-site"
            },
            template: CLITemplate.Custom,
            templateContent: await createHelp(
                "/open-site",
                [
                    "Open a new window with the url specified."
                ],
                ["/open-site www.google.com"]
            )
        }
    ];
}
```

## Custom Templates

For further information on customizing the home template see [Home To Customize Home Templates](./how-to-customize-home-templates.md).

## Available Home Integrations

We have a number of integrations we have built to allow you to configure customize workspace to your needs.

- [Apps integration](../client/src/modules/integrations/apps/integration.ts) - an apps module that fetches the available public applications (apps marked as private should not be displayed) that you can configured in your appsProvider, displays them via a dynamic templates and allows text filtering (home input) and tag filtering.

```json
{
  "id": "apps",
  "icon": "http://localhost:8080/favicon.ico",
  "title": "Apps",
  "description": "Search Applications",
  "enabled": true,
  "url": "http://localhost:8080/js/modules/integrations/apps.bundle.js",
  "data": {
    "manifestTypeMapping": {
      "view": { "entryLabel": "View", "actionName": "" },
      "inline-view": { "entryLabel": "View", "actionName": "" },
      "window": { "entryLabel": "Window", "actionName": "" },
      "inline-window": { "entryLabel": "Window", "actionName": "" },
      "snapshot": { "entryLabel": "Snapshot", "actionName": "Launch Snapshot" },
      "inline-snapshot": { "entryLabel": "Snapshot", "actionName": "Launch Snapshot" },
      "manifest": { "entryLabel": "App", "actionName": "Launch App" },
      "external": { "entryLabel": "Native App", "actionName": "Launch Native App" },
      "inline-external": { "entryLabel": "Native App", "actionName": "Launch Native App" },
      "desktop-browser": { "entryLabel": "Desktop Browser", "actionName": "" },
      "endpoint": { "entryLabel": "Endpoint", "actionName": "Launch" },
      "connection": { "entryLabel": "Connected App", "actionName": "Launch Connected App" }
    }
  }
}
```

- [Workspaces integration](../client/src/modules/integrations/workspaces/integration.ts) - a module that lets your manage your saved workspaces from within Home

```json
{
  "id": "workspaces",
  "icon": "http://localhost:8080/favicon.ico",
  "title": "Workspaces",
  "description": "Manage workspaces",
  "enabled": true,
  "url": "http://localhost:8080/js/modules/integrations/workspaces.bundle.js",
  "data": {
    "images": {
      "workspace": "http://localhost:8080/icons/{scheme}/workspace.svg"
    }
  }
}
```

- [Pages integration](../client/src/modules/integrations/pages/integration.ts) - a module that lets you manage your saved pages from within Home

```json
{
  "id": "pages",
  "icon": "http://localhost:8080/favicon.ico",
  "title": "Pages",
  "description": "Manage Pages",
  "enabled": true,
  "url": "http://localhost:8080/js/modules/integrations/pages.bundle.js",
  "data": {
    "images": {
      "page": "http://localhost:8080/icons/{scheme}/page.svg"
    }
  }
}
```

In our manifests we also give examples of plugging in our other how-tos (e.g. how-to/integrate-with-salesforce).

## Source Reference

- [home.ts](../client/src/framework/workspace/home.ts)
- [integrations.ts](../client/src/framework/integrations.ts)
- [integrations-shapes.ts](../client/src/framework/shapes/integrations-shapes.ts)
- [apps/integration.ts](../client/src/modules/integrations/apps/integration.ts)
- [workspaces/integration.ts](../client/src/modules/integrations/workspaces/integration.ts)
- [pages/integration.ts](../client/src/modules/integrations/pages/integration.ts)

[<- Back to Table Of Contents](../README.md)
