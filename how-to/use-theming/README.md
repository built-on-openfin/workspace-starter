![OpenFin Workspace Example Application -- Using Theming](../../assets/OpenFin-Workspace-Starter.png)

> **_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
> OpenFin Workspace is currently **only supported on Windows** although you can run the sample on a Mac for development purposes.

# Use Theming

OpenFin Theming allows you to style the workspace components with your own branding.

This application you are about to install is a simple example of plugging in your own content or app. This example assumes you have already [set up your development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment)

The example shows how you can override the default palette without a custom one.

## Running the Sample

To run this sample you can:

- Clone this repo and follow the instructions below. This will let you customize the sample to learn more about our APIs.
- Launch the Github hosted version of this sample to interact with it by going to the following link: [Github Workspace Starter Use Theming](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv9.0.0%2Fuse-theming%2Fmanifest.fin.json)

## Getting Started

1. Install dependencies and do an initial build. Note that these examples assume you are in the sub-directory for the example.

```shell
npm run setup
```

2. Optional (if you wish to pin the version of OpenFin Workspace to version 9.0.0 and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://developers.openfin.co/docs/desktop-owner-settings).
   This example runs a utility [desktop-owner-settings.bat](../common/desktop-owner-settings.bat) that adds the Windows registry key for you, pointing to a local desktop owner
   settings file so you can test these settings. If you already have a desktop owner settings file, this script prompts to overwrite the location. Be sure to capture the existing location so you can update the key when you are done using this example.

   (**WARNING**: This script kills all open OpenFin processes. **This is not something you should do in production to close apps as force killing processes could kill an application while it's trying to save state/perform an action**).

```shell
npm run dos
```

3. Start the test server in a new window.

```shell
npm run start
```

4. Start the demonstration application, by default the dark palette will be used.

```shell
npm run client
```

5. The palette can be provided from the command line, this is demonstrated by closing the application and running the alternate version which will show using the light theme.

```shell
npm run secondclient
```

The `secondclient` passed the palette to the command line with a base64 encoded version of the palette object i.e.

`http://localhost:8080/manifest.fin.json?$$palette=eyJicmFuZFByaW1hcnkiOiIj...sInRleHRJbmFjdGl2ZSI6IiM3RDgwOEEifQ==`

You could produce a similar encoding for your palette by doing the following:

```js
btoa(
  JSON.stringify({
    brandPrimary: '#504CFF',
    brandSecondary: '#1E1F23',
    backgroundPrimary: '#FAFBFE',
    background1: '#FFFFFF',
    background2: '#FAFBFE',
    background3: '#F3F5F8',
    background4: '#ECEEF1',
    background5: '#DDDFE4',
    background6: '#C9CBD2',
    statusSuccess: '#35C759',
    statusWarning: '#F48F00',
    statusCritical: '#BE1D1F',
    statusActive: '#0498FB',
    inputBackground: '#ECEEF1',
    inputColor: '#1E1F23',
    inputPlaceholder: '#383A40',
    inputDisabled: '#7D808A',
    inputFocused: '#C9CBD2',
    textDefault: '#1E1F23',
    textHelp: '#2F3136',
    textInactive: '#7D808A'
  })
);
```

Which outputs:

```shell
eyJicmFuZFByaW1hcnkiOiIjNTA0Q0ZGIiwiYnJhbmRTZWNvbmRhcnkiOiIjMUUxRjIzIiwiYmFja2dyb3VuZFByaW1hcnkiOiIjRkFGQkZFIiwiYmFja2dyb3VuZDEiOiIjRkZGRkZGIiwiYmFja2dyb3VuZDIiOiIjRkFGQkZFIiwiYmFja2dyb3VuZDMiOiIjRjNGNUY4IiwiYmFja2dyb3VuZDQiOiIjRUNFRUYxIiwiYmFja2dyb3VuZDUiOiIjRERERkU0IiwiYmFja2dyb3VuZDYiOiIjQzlDQkQyIiwic3RhdHVzU3VjY2VzcyI6IiMzNUM3NTkiLCJzdGF0dXNXYXJuaW5nIjoiI0Y0OEYwMCIsInN0YXR1c0NyaXRpY2FsIjoiI0JFMUQxRiIsInN0YXR1c0FjdGl2ZSI6IiMwNDk4RkIiLCJpbnB1dEJhY2tncm91bmQiOiIjRUNFRUYxIiwiaW5wdXRDb2xvciI6IiMxRTFGMjMiLCJpbnB1dFBsYWNlaG9sZGVyIjoiIzM4M0E0MCIsImlucHV0RGlzYWJsZWQiOiIjN0Q4MDhBIiwiaW5wdXRGb2N1c2VkIjoiI0M5Q0JEMiIsInRleHREZWZhdWx0IjoiIzFFMUYyMyIsInRleHRIZWxwIjoiIzJGMzEzNiIsInRleHRJbmFjdGl2ZSI6IiM3RDgwOEEifQ==
```

---

### Read more about [working with Workspace](https://developers.openfin.co/of-docs/docs/overview-of-workspace)
