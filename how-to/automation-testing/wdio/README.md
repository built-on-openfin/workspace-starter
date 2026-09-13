# Automation testing: WebdriverIO

The same example suite as [default](../default), driven by a
[WebdriverIO](https://webdriver.io/) runner instead of the `here-automation` CLI. Use this
as the reference for **bringing your own WebDriver runner**: WDIO owns the test lifecycle
(Mocha), and [`@openfin/automation-helpers`](https://www.npmjs.com/package/@openfin/automation-helpers)
supplies both the HERE bring-up and the component helpers the specs call.

## Prerequisites

- Windows or macOS
- Node >= 24
- Ports **8080** (fixture platform), **9090** (DevTools) and **4444** (ChromeDriver) free
- `npm install` run from the repo root

## Running

```shell
npm test
```

Runs against the [fixture platform](../platform-fixture), started automatically. Versions,
ports and the fixture manifest come from
[`../here-automation.config.json`](../here-automation.config.json), read with the helpers'
`loadConfig`. To target another platform set `MANIFEST_URL` before running; the fixture is
only started for `localhost` manifests.

If a run is interrupted, `npm run kill` force-closes any HERE or ChromeDriver processes
left behind.

## How it works

Everything specific to HERE is in [`wdio.conf.mjs`](./wdio.conf.mjs):

- **`onPrepare`** -- runs once in the launcher process: starts the fixture platform (for a
  local manifest) and clears old screenshots. It does not launch HERE, because WDIO runs
  each spec file in its own worker process and state set here cannot reach a worker.
- **`beforeSession`** -- runs in the worker, once per attempt: `loadManifest` →
  `resolveRuntimeVersion` → `getChromeDriver` → `launchOpenFinRVM` → `startChromeDriver` →
  `waitForDevToolsPort` → `waitForProviderReady`, then holds a ChromeDriver session and
  waits for every DevTools target to answer before WDIO attaches. Each retry therefore
  gets a fresh runtime.
- **`capabilities`** -- attaches WDIO to the running HERE instance through
  `goog:chromeOptions.debuggerAddress`.
- **`before`** -- wraps WDIO's `browser` in `NodeWebDriver` so the helpers can drive it,
  starts the helper session and waits for `OpenFinSystem.waitForReady`.
- **`onComplete`** -- closes HERE and ChromeDriver and stops the fixture platform.

`maxInstances` is pinned to `1` because every spec shares one runtime and one ChromeDriver
port, and `specFileRetries` re-runs a spec file in a fresh runtime when bring-up flakes.
The comments in the config explain each wait and why it is there.

## Test structure

Mirrors [default](../default) file-for-file -- the same helper calls in the same order;
only the runner idioms differ (Mocha `before`/`after` and chai assertions instead of
Vitest globals). HERE Core UI components are driven only through their helpers; the
exception is `app-view.spec.mjs`, which shows the generic element API against `view1.html`.

| File                          | Description                                                                                                                 |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test/system.spec.mjs`        | Runtime ready, version and identity via the `fin` proxy, window list, active window title                                   |
| `test/home.spec.mjs`          | Home show/hide, search, result selection, filters                                                                           |
| `test/dock.spec.mjs`          | Dock show, list items, click an item, hide                                                                                  |
| `test/notifications.spec.mjs` | Notification Center show, hide, toggle                                                                                      |
| `test/store.spec.mjs`         | Storefront show, hide                                                                                                       |
| `test/app-view.spec.mjs`      | Create a view with `OpenFinView.create`, then element get/set attribute, property and style plus keyboard and mouse actions |
