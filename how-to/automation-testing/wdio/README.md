# Automation tests: WDIO

Example [WebdriverIO](https://webdriver.io/) suite for OpenFin (HERE Core / Workspace),
and the repo's **"bring your own runner"** reference.

Unlike `tests/default` — which runs through the batteries-included `here-automation`
CLI (Vitest) — this suite owns its WebDriver runner directly. It uses WDIO's own
lifecycle (Mocha) and calls the shared bring-up from
[`@openfin/automation-core`](../../packages/automation-core) inside its
`beforeSession` hook. That is the pattern to copy if you want to drive OpenFin
from a runner the CLI doesn't wrap.

## How it works

`wdio.conf.mjs`:

- **`onPrepare`** — runs once in the launcher process: logs config, starts the
  local fixture platform's HTTP server (when targeting a local manifest), and
  clears old screenshots. Does **not** launch the OpenFin runtime (see
  `beforeSession`).
- **`beforeSession`** — launches the environment in each worker process via
  `@openfin/automation-core`: `loadManifest` → `resolveRuntimeVersion` →
  `getChromeDriver` → `launchOpenFinRVM` → `startChromeDriver` →
  `waitForDevToolsPort`. This runs per-attempt (initial + every
  `specFileRetries` retry) so each attempt gets a fresh runtime.
- **`capabilities`** — attaches WDIO to the running OpenFin instance over the
  DevTools port via `goog:chromeOptions.debuggerAddress`.
- **`before`** — wraps the WDIO `browser` in `NodeWebDriver` from
  `@openfin/automation-helpers`, calls `startSession`, and waits for
  `OpenFinSystem.waitForReady`.
- **`onComplete`** — tears everything down: `closeOpenFinRVM`, kills
  ChromeDriver, and stops the fixture server.

Defaults: manifest = the local fixture platform (`http://localhost:8080`);
DevTools port `9090`; ChromeDriver port `4444`. These come from
`here-automation.config.json` via `loadConfig`, with hardcoded fallbacks in the
config file. Override the manifest with the `MANIFEST_URL` environment variable.

## Test Structure

One file per capability area, mirroring `tests/default` file-for-file (same
helper calls, same order — only the runner idioms differ: chai assertions instead
of Vitest globals). OpenFin components are driven only through their helpers — no
selectors, xpath, CSS, or DOM access. The sole exception is `app-view.spec.js`,
which demonstrates generic element primitives against the client-owned `view1.html`.

| File | Description |
|------|-------------|
| `test/system.spec.js` | Runtime ready, version, identity, `fin` via Proxy, window list |
| `test/home.spec.js` | Home show/hide, search, result selection, filters, launch a view |
| `test/dock.spec.js` | Dock show, list items, click item, hide |
| `test/notifications.spec.js` | Notification center show, hide, toggle |
| `test/store.spec.js` | Storefront show, hide |
| `test/app-view.spec.js` | Open `view1` via Home, then generic element get/set attribute/style/property + keyboard/mouse actions (**only file using primitives**) |

## Running

From the repo root, build the workspace packages first so the suite can resolve
the built `@openfin/automation-core` / `@openfin/automation-helpers` bundles at
runtime:

```shell
npm install
npm run dist          # builds the workspace packages (required)
```

### Local (default)

```shell
npm test --prefix tests/wdio
```

Runs against the local fixture platform. The suite reads `manifestUrl`, `preLaunch`,
and version pins from the `platform` section of `here-automation.config.json`
(searched upward from CWD). The pre-launch command starts the fixture on port **8080**
automatically.

### Remote (workspace-starter v23.2.0)

```shell
npm run test-remote --prefix tests/wdio
```

Runs against the public workspace-starter **v23.2.0** manifest via `MANIFEST_URL`.
No local platform is started (the pre-launch command is skipped for non-localhost
manifests).

### Any other manifest

Set `MANIFEST_URL` before running:

```shell
MANIFEST_URL=https://example.com/manifest.fin.json npm test --prefix tests/wdio
```

## Other scripts

| Script | Purpose |
|--------|---------|
| `npm test` | Run the WDIO suite locally against the fixture platform |
| `npm run test-remote` | Run against the workspace-starter v23.2.0 remote manifest |
| `npm run kill` | Force-kill stray OpenFin / ChromeDriver processes (manual escape hatch) |

On Windows, Desktop Owner Settings are provisioned automatically by `launchOpenFinRVM`
(from `automation-core`), using the Workspace/Notifications versions in
`here-automation.config.json`, and the previous settings are restored on completion — no
separate step is required.

## Platform status

The core-based launch is cross-platform: on macOS the suite launches OpenFin,
starts ChromeDriver, and connects a WebDriver session via `automation-core`.
Some individual specs still fail on functional assertions on macOS (e.g. interop
channel and element-count expectations carried over from Windows) — bringing the
specs themselves fully green on macOS is a tracked follow-up, separate from the
launch/runner wiring this suite demonstrates. The `before` hook also still passes
a Windows `LocalAppData` path to `startSession`; it does not block the session but
is part of that follow-up.
