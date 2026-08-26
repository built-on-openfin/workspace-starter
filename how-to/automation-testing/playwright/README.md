# Automation tests: Playwright

Example [Playwright](https://playwright.dev/) suite for HERE desktop applications,
connecting over CDP to a running OpenFin runtime.

Unlike the WebDriver-family suites (`tests/default`, `tests/wdio`), this suite
drives OpenFin via the CDP protocol using `@openfin/automation-cdp` for target
discovery and `@openfin/automation-playwright` for the `OpenFinHome` page object
and `PlaywrightElement` primitives.

## Prerequisites

- macOS or Windows
- Node >= 24
- OpenFin runtime installed (RVM manages versions)
- Ports available: **8080** (Vite dev server), **9090** (DevTools)
- Workspace packages built: `npm run dist --workspaces` from the repo root

## Running Tests

```bash
npm test
```

This automatically:

1. Starts the fixture platform Vite dev server on port 8080
2. Launches the OpenFin runtime with the platform manifest
3. Connects Playwright to the runtime over CDP (port 9090)
4. Runs the test suite via `@playwright/test`
5. Tears down everything on completion

## Test Structure

OpenFin components are driven only through their helpers -- no raw DOM selectors
against OpenFin's own windows. `app-view.spec.ts` demonstrates `PlaywrightElement`
primitives and keyboard/mouse actions against the client-owned `view1.html`.
`home.spec.ts` also exercises `PlaywrightElement` primitive methods
(`setProperty`/`getAttribute`/`setStyle` etc.) on the Home search input.

The App view, Home, Dock, Notifications, Store and System specs share **one** CDP
connection via the worker-scoped `workspace` fixture in `fixtures.ts` (see
`@openfin/automation-playwright`'s `connectToWorkspace`). Only
`cdp-connectivity.spec.ts` opens its own connection — establishing a CDP
connection is the thing it tests. Every extra `connectOverCDP` is another attach
that can hit the Workspace bring-up wedge, so the suite makes as few as possible.

| File | Description |
|------|-------------|
| `tests/cdp-connectivity.spec.ts` | CDP target discovery, Playwright connection, `fin` API access |
| `tests/home.spec.ts` | Home via `OpenFinHome`: search, results, filters, show/hide |
| `tests/dock.spec.ts` | Dock via `OpenFinDock`: show/hide, list items, click by title |
| `tests/notifications.spec.ts` | Notification center via `OpenFinNotifications`: show/hide/toggle |
| `tests/store.spec.ts` | Storefront via `OpenFinStore`: show/hide |
| `tests/system.spec.ts` | Runtime checks via `OpenFinSystem`: ready, version, identity, windows, active window title and url |
| `tests/app-view.spec.ts` | Open client-owned `view1` on the shared connection, then `PlaywrightElement` get/set attribute/style/property + keyboard/mouse |

## Configuration

CDP connection settings are loaded from `here-automation.config.json` (via
`@openfin/automation-core`'s `loadConfig`) in `openfin.cdp-config.ts`. The module
exports an async `loadOpenFinConfig()` function that resolves and caches the
config. Key fields:

- `devToolsPort` -- remote-debugging port (default 9090)
- `manifestUrl` -- platform manifest URL (default `http://localhost:8080/manifest.fin.json`, overridden by `MANIFEST_URL` env var)
- `preLaunchCommand` -- command to serve the fixture on port 8080
- `storageFolder` -- runtime/driver storage directory
- `workspaceVersion` / `notificationsVersion` -- version pins for DOS settings
