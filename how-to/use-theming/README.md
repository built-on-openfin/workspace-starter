![HERE Core UI Example Application -- Using Theming](../../assets/HERO-STARTER-HERE-CORE-UI.png)

> **_:information_source: HERE Core UI:_** [HERE Core UI](https://resources.here.io/docs/core/hc-ui/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the HERE Core Container and HERE Core UI components is only granted pursuant to a license from HERE (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation key or to discuss a production license.

# Use Theming

HERE Theming allows you to style the HERE Core UI Components with your own branding.

This application you are about to install is a simple example of plugging in your own content or app. This example assumes you have already [set up your development environment](https://resources.here.io/docs/core/develop/)

The example shows how you can override the default palette without a custom one.

## Running the Sample

To run this sample you can:

- Clone this repo and follow the instructions below. This will let you customize the sample to learn more about our APIs.
- Launch the Github hosted version of this sample to interact with it by going to the following link: [Github Workspace Starter Use Theming](https://start.openfin.co/?manifest=https%3A%2F%2Fbuilt-on-openfin.github.io%2Fworkspace-starter%2Fworkspace%2Fv23.0.0%2Fuse-theming%2Fmanifest.fin.json)

## Getting Started

1. Install dependencies and do an initial build. Note that these examples assume you are in the sub-directory for the example.

```shell
npm run setup
```

2. Optional (if you wish to pin the version of HERE Core UI to version 23.0.0 and you are on Windows) - Set Windows registry key for [Desktop Owner Settings](https://resources.here.io/docs/core/manage/desktops/dos/).
   This example runs a utility [dos.mjs](./scripts/dos.mjs) that adds the Windows registry key for you, pointing to a local desktop owner
   settings file so you can test these settings. If you already have a desktop owner settings file, this script prompts to overwrite the location. Be sure to capture the existing location so you can update the key when you are done using this example.

   (**WARNING**: This script kills all open HERE processes. **This is not something you should do in production to close apps as force killing processes could kill an application while it's trying to save state/perform an action**).

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

5. A theme payload can be provided from the command line. This is demonstrated by closing the application and running the alternate version:

```shell
npm run secondclient
```

The `secondclient` passes action `apply-theme` and `payload` to the command line. The payload is base64-encoded JSON, for example:

`http://localhost:8080/manifest.fin.json?$$action=apply-theme&$$payload=eyJzZWVkIjp7ImJyYW5kLmJhc2UuZGFyayI6IiMxNDA2MTEifS4uLn0=`

You could produce a similar encoding for your theming by doing the following:
(`options` is optional; if omitted, all components are shown by default):

```js
btoa(
  JSON.stringify({
    seed: {
      'brand.base.dark': '#140611',
      'brand.accent.dark': '#FFD6D2',
      'brand.base.light': '#FFFFFF',
      'brand.accent.light': '#641E55'
    },
    overrides: {
      dark: {
        'icon.symbol': 'http://localhost:8080/common/images/favicon-32x32.png',
        'color.role.background.1': '#1a1a1a',
        'color.role.background.2': '#252525',
        'color.role.accent.base': '#4da6ff',
        'color.role.accent.hover': '#80bfff',
        'color.role.status.success': '#34d058',
        'color.role.status.warning': '#ffdf5d',
        'color.role.status.critical': '#f85149',
        'color.role.border.neutral': '#333333'
      },
      light: {
        'icon.symbol': 'http://localhost:8080/common/images/favicon-32x32.png',
        'color.role.background.1': '#fafafa',
        'color.role.background.2': '#f5f5f5',
        'color.role.accent.base': '#0066cc',
        'color.role.accent.hover': '#0052a3',
        'color.role.status.success': '#28a745',
        'color.role.status.warning': '#ffc107',
        'color.role.status.critical': '#dc3545',
        'color.role.border.neutral': '#e0e0e0'
      }
    },
    options: {
      home: true,
      store: true,
      dock: true,
      notifications: true,
      browser: true
    }
  })
);
```
