# Automation testing: Fixture platform

A minimal HERE Core UI platform that the automation testing examples in this folder run
against. It registers Home, Store, Dock and Notifications with a small, fixed set of
entries so the example tests have stable values to assert on.

You do not normally start it yourself: the [default](../default) and [wdio](../wdio)
examples start it automatically (via the `platform.preLaunch` command in
[`here-automation.config.json`](../here-automation.config.json)) when they target the
local manifest.

## Running it standalone

```shell
npm install
npm start
```

This starts a Vite dev server on port **8080** hosting the manifest. To launch the platform
in HERE:

```shell
npm run launch
```

Or open `fin://localhost:8080/manifest.fin.json`.

`npm run start:static` builds the platform and serves the static output on the same port,
which is what the examples use.
