# Automation tests: Default test runner

Example test suite for HERE desktop applications using `here-automation` CLI.

## Prerequisites

- macOS or Windows
- Node >= 24
- OpenFin runtime installed (RVM manages versions)
- Ports available: **8080** (Vite dev server), **9090** (DevTools), **4444** (ChromeDriver)
- Workspace packages built: `npm run dist --workspaces` from the repo root

## Running Tests

### Local (default)

```bash
npm test
```

This automatically:

1. Starts the fixture platform Vite dev server on port 8080
2. Loads the manifest and resolves the OpenFin runtime version
3. Downloads ChromeDriver (cached in `./storage/`)
4. Launches OpenFin RVM with the platform manifest
5. Runs all `tests/*.spec.ts` files via Vitest
6. Tears down everything (WebDriver, ChromeDriver, OpenFin, Vite)

### Remote

```bash
npm run test-remote
```

Runs against the hosted [workspace-starter](https://built-on-openfin.github.io/workspace-starter/) register-with-home example. Note: test assertions (identity, runtime version) are tuned for the local fixture platform and may need adjusting for remote targets.

### Offline

```bash
npm run test-offline
```

Runs against the local platform using cached resources from `./offline-storage/`.

## Test Structure

One file per capability area, each self-contained (brings its component into the
needed state in `beforeAll`). OpenFin components are driven only through their
helpers — no selectors, xpath, CSS, or DOM access. The sole exception is
`app-view.spec.ts`, which demonstrates generic element primitives against the
client-owned `view1.html`.

| File | Description |
|------|-------------|
| `tests/system.spec.ts` | Runtime ready, version, identity, `fin` via Proxy, window list, active window title and url |
| `tests/home.spec.ts` | Home show/hide, search, result selection, filters, launch a view |
| `tests/dock.spec.ts` | Dock show, list items, click item, hide |
| `tests/notifications.spec.ts` | Notification center show, hide, toggle |
| `tests/store.spec.ts` | Storefront show, hide |
| `tests/app-view.spec.ts` | Create `view1` via `OpenFinView.create`, then generic element get/set attribute/style/property + keyboard/mouse actions (**only file using primitives**) |
| `automation-hooks.ts` | Global setup/teardown hooks (timing, custom global vars) |

Tests use Vitest globals (`describe`, `it`, `expect`) and helpers from `@openfin/automation-helpers`:

- `OpenFinSystem` -- runtime readiness, manifest launching
- `OpenFinHome` -- Home UI search, filters, result selection
- `OpenFinProxy` -- direct `fin` API access
- `OpenFinDock` -- Dock show/hide, item enumeration
- `OpenFinNotifications` -- Notification center show/hide/toggle
- `OpenFinStore` -- Storefront show/hide
- `OpenFinView` -- view creation and teardown via the Platform API
- `WebDriver` -- window switching, element interaction, screenshots, actions

## Linting

```bash
npm run build-lint
```

## Configuration

Test behaviour is controlled by CLI flags in the `test` scripts and by `here-automation.config.json` at the repo root. See `packages/automation-cli` for the full list of options.
