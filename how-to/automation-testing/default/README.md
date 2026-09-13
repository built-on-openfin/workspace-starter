# Automation testing: here-automation CLI

Example test suite for a HERE Core UI platform, run with the `here-automation` CLI from
[`@openfin/automation-cli`](https://www.npmjs.com/package/@openfin/automation-cli). The CLI
does the whole bring-up for you -- fixture platform, HERE runtime, ChromeDriver -- and runs
the specs with [Vitest](https://vitest.dev/).

## Prerequisites

- Windows or macOS
- Node >= 24
- Ports **8080** (fixture platform), **9090** (DevTools) and **4444** (ChromeDriver) free
- `npm install` run from the repo root

## Running

```shell
npm test
```

This:

1. Reads [`../here-automation.config.json`](../here-automation.config.json) for the version
   pins, ports and the fixture manifest URL
2. Starts the [fixture platform](../platform-fixture) on port 8080 (the config's
   `platform.preLaunch` command)
3. Resolves the runtime version from the manifest and downloads the matching ChromeDriver
   into `./storage/` (reused on later runs)
4. Launches HERE with the fixture manifest
5. Runs every `tests/*.spec.ts` file with Vitest, re-running a failed spec file up to twice
   with a fresh runtime (`--testRetryCount 2`)
6. Closes HERE, ChromeDriver and the fixture platform

To run against a different platform, pass its manifest URL as the first argument:

```shell
npx here-automation https://example.com/manifest.fin.json ./tests/**/*.spec.ts
```

The specs assert values registered by the fixture platform (search result ids, filter
ids, dock item titles), so expect assertion failures against other platforms -- the point
of the suite is to show the helper APIs, not to be portable as-is.

### Offline

```shell
npm run test-offline
```

Runs with `--offline`: nothing is downloaded, and the ChromeDriver for the runtime is
expected to already be in `./offline-storage/` alongside an `offline-versions.json` that
maps labelled runtime versions to real ones. See the `@openfin/automation-cli` README for
the file format. Populate the folder with an online run first
(`--storageFolder=./offline-storage`).

### Cleaning up

If a run is interrupted, `npm run kill` force-closes any HERE or ChromeDriver processes
left behind.

## Test structure

One file per component. Each file is self-contained: it brings its component into the
state it needs in `beforeAll` and returns it in `afterAll`. HERE Core UI components are
driven only through their helpers -- no selectors, XPath or DOM access. The exceptions
are `app-view.spec.ts` and `popup-window.spec.ts`, which show the generic element API
against content the platform owns (`view1.html` and its popup).

| File                          | Description                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/system.spec.ts`        | Runtime ready, version and identity via the `fin` proxy, window list, active window title and url                                           |
| `tests/home.spec.ts`          | Home show/hide, search, result selection, filters                                                                                           |
| `tests/dock.spec.ts`          | Dock show, list items, click an item, hide                                                                                                  |
| `tests/notifications.spec.ts` | Notification Center show, hide, toggle                                                                                                      |
| `tests/store.spec.ts`         | Storefront show, hide                                                                                                                       |
| `tests/app-view.spec.ts`      | Create a view with `OpenFinView.create`, then element get/set attribute, property and style plus keyboard and mouse actions                 |
| `tests/popup-window.spec.ts`  | Find and drive a `showPopupWindow()` popup by diffing window handles (a popup closes on blur, so it cannot be found by enumerating windows) |
| `automation-hooks.ts`         | Global setup/teardown hooks the CLI discovers by filename                                                                                   |

Specs use Vitest globals (`describe`, `it`, `expect`, `beforeAll`, `afterAll`) and these
helpers from `@openfin/automation-helpers`:

- `OpenFinSystem` -- runtime readiness
- `OpenFinProxy` -- direct `fin` API access from the test
- `OpenFinHome` -- Home search, filters and result selection
- `OpenFinDock` -- Dock show/hide and item enumeration
- `OpenFinNotifications` -- Notification Center show/hide/toggle
- `OpenFinStore` -- Storefront show/hide
- `OpenFinView` -- create and close views through the Platform API
- `WebDriver` -- window switching, element interaction, actions and screenshots

## Configuration

CLI defaults come from [`../here-automation.config.json`](../here-automation.config.json);
any flag passed on the command line overrides it. Run `npx here-automation --help` for the
full list.
