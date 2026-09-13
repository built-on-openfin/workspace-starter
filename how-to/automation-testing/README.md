# Automation Testing

End-to-end tests for HERE Core UI platforms, written in TypeScript or JavaScript and run
against the real HERE runtime, using
[`@openfin/automation-cli`](https://www.npmjs.com/package/@openfin/automation-cli) and
[`@openfin/automation-helpers`](https://www.npmjs.com/package/@openfin/automation-helpers).

This folder is both a working example and the template for adding these tests to your own
platform. Start by running the examples, then read [Using this in your project](#using-this-in-your-project).

| Folder                                 | What it is                                                                                                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [default](./default)                   | The suite to copy. TypeScript specs run by the `here-automation` CLI, which launches everything and runs them with [Vitest](https://vitest.dev/). Start here. |
| [wdio](./wdio)                         | The same specs under a [WebdriverIO](https://webdriver.io/) runner you own. The reference if you already have a WebDriver-based framework.                    |
| [platform-fixture](./platform-fixture) | A tiny HERE Core UI platform the examples run against, with fixed Home, Store, Dock and Notifications content so the assertions are stable.                   |

Shared settings -- runtime, Workspace and Notifications versions, ports, and how to start
the fixture -- live in [`here-automation.config.json`](./here-automation.config.json).

## Running the examples

Windows or macOS, Node >= 24, and ports **8080**, **9090** and **4444** free. Linux is not
supported for e2e testing with the HERE runtime.

```shell
npm install
npm run test --prefix how-to/automation-testing/default
npm run test --prefix how-to/automation-testing/wdio
```

The first run downloads the ChromeDriver that matches the runtime version in the manifest
into a `storage/` folder beside the suite; later runs reuse it. If a run is interrupted and
leaves HERE or ChromeDriver behind, each suite has `npm run kill`.

## What the libraries do

**`@openfin/automation-helpers`** is the library your tests import. It has two halves:

- **Component helpers** -- `OpenFinHome`, `OpenFinDock`, `OpenFinStore`,
  `OpenFinNotifications`, `OpenFinView`, `OpenFinSystem` and `OpenFinProxy`. Each exposes
  the gestures a user or a platform makes against a HERE component: show and hide Home,
  type a search and read the result ids, open the filters and toggle one, list the dock
  items and click one, create a view, read the runtime version. Behind each call is the
  window switching, DOM interaction and settle-waiting needed to make it reliable.
- **Environment bring-up** -- `loadConfig`, `loadManifest`, `resolveRuntimeVersion`,
  `getChromeDriver`, `launchOpenFinRVM`, `startChromeDriver`, `waitForDevToolsPort`,
  `waitForProviderReady`, `preLaunch` and `closeOpenFinRVM`. Everything needed to get from
  "a manifest URL" to "a running platform with a driver attached", and to tear it down.

It also exports the generic `WebDriver` facade -- find elements, read and set attributes,
properties and styles, send keys, mouse and keyboard actions, screenshots, window handles --
for driving **your own** application windows.

**`@openfin/automation-cli`** (`here-automation`) is the batteries-included runner. Given a
manifest URL and a spec glob it runs the whole bring-up above, runs your specs with Vitest,
and cleans up. Most teams need nothing else. If you already have a WebDriver-based runner,
skip the CLI and call the bring-up functions from your own hooks -- that is what
[wdio](./wdio) shows.

## How these tests work

HERE is built on Chromium, so every HERE window -- your platform provider, your views,
and the Workspace components -- is a browser target that ChromeDriver can drive. The
pieces are:

```text
  your spec (Vitest / Mocha)
       │  OpenFinHome.search("interop")            ┐
       ▼                                            │ @openfin/automation-helpers
  component helpers  ──►  WebDriver facade         ┘
       │  WebDriver protocol (HTTP, port 4444)
       ▼
  ChromeDriver  ── matched to the runtime's Chromium version
       │  DevTools protocol (port 9090)
       ▼
  HERE runtime, launched by the RVM with --remote-debugging-port
       ├─ platform provider window   (your code)
       ├─ your views and windows      (your code)
       └─ Workspace: Home, Dock, Store, Notification Center
```

1. The runner reads your manifest, resolves the runtime version it names, and downloads
   the ChromeDriver whose major version matches that runtime's Chromium. On Windows it
   also writes the Desktop Owner Settings that pin the Workspace and Notifications
   versions, and restores the previous settings afterwards.
2. It launches HERE through the RVM with the DevTools port open, then waits -- for the
   port, for the provider page to be a live target, and for ChromeDriver to hold a
   session -- before any test runs. Those waits exist because every one of them was once a
   race that produced an intermittent failure.
3. Your specs run. Every helper call becomes WebDriver commands: switch to the right
   window, find an element, send keys, read state, or evaluate a `fin.*` call inside a
   window.
4. Everything is shut down, including any local server the runner started for you.

Test files are ordinary Vitest (or Mocha, under WDIO) specs. `describe`, `it` and
`expect` are globals; the only import is the helpers.

## Why it is built this way

**Drive HERE components only through the helpers.** Home, Dock, Store and the
Notification Center are HERE-owned UIs. Their DOM, element ids and internal APIs are not a
contract and do change between Workspace versions. Workspace 24, for example, removed the
`fin.Workspace` client that earlier versions injected into their windows; the helpers
detect which surface is present and use the runtime window API instead, so specs written
as `OpenFinHome.show()` did not change. A spec that had reached in with a selector would
have. The [default](./default) specs contain no selectors, XPath or DOM access against
any HERE component -- if you find yourself needing one, that is a gap in the helpers, not
something to work around in a test.

**Use the element API for your own application.** `app-view.spec.ts` and
`popup-window.spec.ts` show the other side: `WebDriver.findElementById`, attributes,
properties, styles and input actions against `view1.html`, which the platform owns. Your
DOM is your contract, so testing it directly is fine.

**Assert on outcomes, not mechanics.** `OpenFinHome.search("interop")` returns once the
result list has settled; `OpenFinHome.searchResultIds()` gives you the ids to assert on.
The helpers own the waiting and the polling. Specs that `sleep()` between steps are
guessing at timing that the helpers already know.

**Use the `fin` API from the test where it fits.** `OpenFinProxy.fin()` returns a proxy
that forwards `fin.*` calls into a runtime window and returns the results, so platform
state -- identity, version, windows -- is one async call away, with no DOM involved.
`OpenFinView.create()` is the same idea for setting up the window a test needs.

**One runtime per run, spec files in sequence.** The CLI runs Vitest with one reused
worker, no file parallelism and no concurrent tests. HERE is a single desktop process
with shared windows and focus; parallel specs fighting over it produce failures that have
nothing to do with your platform. Each spec file should leave the platform as it found it
(`afterAll` hides what `beforeAll` showed) so files stay order-independent.

**Retry the file, not the test.** Runtime bring-up is occasionally flaky in ways a test
cannot fix (Workspace not appearing on a cold start, a driver attach lost to a renderer
race). `--testRetryCount` re-runs a failed spec _file_ against a freshly launched runtime;
Vitest's own `retry` re-runs the `it` but not the `beforeAll`, which is where those
failures land.

**Configuration is a file, not a set of flags.** `here-automation.config.json` holds the
version pins, ports, manifest and pre-launch command in one place that both the CLI and a
runner you bring yourself read. Flags still exist and override it, but they are the
secondary option -- see [Configuration](#configuration).

## Using this in your project

1. **Install** the packages as dev dependencies of your platform project:

   ```shell
   npm install --save-dev @openfin/automation-cli @openfin/automation-helpers vitest
   ```

   `vitest` is listed so its globals type-check in your editor; the CLI runs it for you.

2. **Add `here-automation.config.json`** next to your `package.json`, pinning the versions
   your platform is built against and pointing at your manifest -- see
   [Configuration](#configuration) for the file and the alternatives.

3. **Copy** [`default/tests`](./default/tests), [`default/tsconfig.json`](./default/tsconfig.json)
   and, if you want global hooks, [`default/automation-hooks.ts`](./default/automation-hooks.ts).
   Keep `system.spec.ts` as-is -- it is a good smoke test for any platform. Replace the
   fixture-specific values in the others (search terms, result ids, filter ids, dock item
   titles, view URLs) with your platform's, and delete what does not apply.

4. **Add the scripts**:

   ```json
   {
     "test": "here-automation ./tests/**/*.spec.ts --testRetryCount 2",
     "kill": "fkill -f -s OpenFin.exe OpenFinRVM.exe chromedriver.exe OpenFin OpenFinRVM chromedriver"
   }
   ```

   Run `npx here-automation --help` for the full option list.

5. **In CI**, use a Windows runner. macOS works for local development, but Windows is
   the platform HERE targets and the one these suites are validated on in CI; Linux is
   not supported for automaton tests, and would have limited value, as it would not exercise
   a realistic HERE runtime scenario. Make sure nothing else holds the three ports, and run
   `npm run kill` before the suite so a previous job's runtime cannot interfere. Both
   example [workflows](../../.github/workflows/automation-testing.yml) in this repo do
   exactly that.

Then write tests the way the examples do: one file per component or feature, bring the
component into the state you need in `beforeAll`, assert through the helpers, and put it
back in `afterAll`.

### Configuration

**Primary: `here-automation.config.json`.** Put it next to your `package.json` (the CLI
searches upward from the working directory, so one file can serve several test folders,
as it does here). It pins the versions your platform is built against and says where the
manifest is and how to serve it:

```json
{
  "versions": {
    "runtime": "44.146.101.7",
    "workspace": "24.0.24",
    "notifications": "2.15.3"
  },
  "cli": {
    "devToolsPort": 9090,
    "chromeDriverPort": 4444,
    "testTimeout": 120
  },
  "platform": {
    "manifestUrl": "http://localhost:8080/manifest.fin.json",
    "preLaunch": "npm run start"
  }
}
```

- `versions` -- runtime, Workspace and Notifications versions. The runtime version in the
  manifest takes precedence for the runtime itself; the Workspace and Notifications pins
  are what the CLI writes to Desktop Owner Settings on Windows.
- `cli` -- defaults for the CLI flags of the same names (`closeRuntime` and `verbosity`
  are also accepted).
- `platform.manifestUrl` -- the manifest to launch. `platform.preLaunch` -- any command
  that serves it; it runs before HERE launches (only for `localhost` manifests) and is
  stopped afterwards. Point `manifestUrl` at a hosted manifest instead and nothing is
  started.

Pass `--config <path>` to use a specific file instead of the upward search. A runner you
bring yourself reads the same file with `loadConfig` from `@openfin/automation-helpers`,
which is how [wdio](./wdio) shares it with the CLI suite.

**Secondary: flags in your `package.json` scripts.** Every setting above is also a CLI
flag, and a flag you pass explicitly wins over the file. That suits one-off variants --
a script that targets a hosted manifest, or a different Workspace version -- without
touching the shared config:

```json
{
  "scripts": {
    "test": "here-automation ./tests/**/*.spec.ts --testRetryCount 2",
    "test-hosted": "here-automation https://example.com/manifest.fin.json ./tests/**/*.spec.ts --workspace 24.0.24"
  }
}
```

The manifest URL can also come from a `MANIFEST_URL` environment variable. Precedence is:
positional argument or explicit flag, then `MANIFEST_URL` (for the manifest), then the
config file, then the built-in default. Pinning every version on every script, as the v1
examples did, still works -- it is just the pattern the config file replaces.

### Finding out more

- The package READMEs on npm --
  [`@openfin/automation-helpers`](https://www.npmjs.com/package/@openfin/automation-helpers)
  for the full helper API with examples (including driving popup windows), and
  [`@openfin/automation-cli`](https://www.npmjs.com/package/@openfin/automation-cli) for
  every flag, the config file format, hooks, reporters and offline mode.
- The helpers ship TypeScript declarations, so the API is a Ctrl+Space away in your editor.
- Each package's `CHANGELOG.md` records what changed and why.
- [HERE debugging](https://developers.openfin.co/of-docs/docs/debugging) for inspecting a
  running platform when a test does something you did not expect.

### Bringing your own runner

If you already use WebdriverIO (or another WebDriver-based framework), you do not need the
CLI. [`wdio/wdio.conf.mjs`](./wdio/wdio.conf.mjs) shows the pattern: call the bring-up
functions from your runner's session hooks, attach through `goog:chromeOptions.debuggerAddress`,
wrap the framework's browser object in `NodeWebDriver` so the helpers can drive it, and
tear down in the completion hook. The specs themselves are unchanged apart from the
runner's own idioms. The comments in that file explain each wait and why it is there;
read them before removing any.

## Changes from v1

v1 published the same two packages (`1.3.1`). If you have v1 tests, the migration is
mostly mechanical:

| v1                                                                                    | v2                                                                                                                                                         |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `of-automation` binary                                                                | `here-automation`. The old name still works as a deprecated alias that prints a notice, and will be removed in a future major.                             |
| `--framework mocha \| jasmine \| jest`                                                | Vitest only; the flag is gone. `describe` / `it` are unchanged, assertions move from chai to Vitest's `expect` (`to.equal` becomes `toBe`, and so on).     |
| `--driver node \| selenium`                                                           | Node WebDriver only; the flag, the `Selenium*` classes and the `selenium-webdriver` peer dependency are gone. `By` locators become `LocatorTypes` strings. |
| Any Node version                                                                      | Node >= 24.                                                                                                                                                |
| Version pins repeated in every script (`--workspace 23.0.22` on each `test-*` script) | `here-automation.config.json`, found by upward search. Flags still override it.                                                                            |
| `webdriver@8`                                                                         | `webdriver@9`.                                                                                                                                             |
| Bring-up lived inside the CLI                                                         | Bring-up is exported from `@openfin/automation-helpers`, so other runners can use it (see [wdio](./wdio)).                                                 |
| `switchToWindow` returned `true` whenever ChromeDriver accepted the command           | Returns `true` only when the context actually moved. A previously green assertion that goes red here was silently wrong before.                            |

**Selenium removed.** In v1 `--driver selenium` was a second WebDriver client bound to
the same ChromeDriver as the default driver: the same transport, the same capabilities,
just a different client library (`selenium-webdriver` instead of `webdriver`) with its own
copies of the element and window wrappers to keep in step. It added nothing you could
not do with the default driver. Removing it halves the surface the helpers have to keep working and drops a peer
dependency. If you were using Selenium's `By` locators, `WebDriver.findElement` and
similar take a `LocatorTypes` string (`"xpath"`, `"css selector"`, and so on) and every
gesture the Selenium wrapper exposed is on `WebDriver` and `IWebDriverElement` already.
If you have a wider Selenium-based framework of your own, the
[bring-your-own-runner](#bringing-your-own-runner) path still applies: the bring-up
functions do not care which client attaches to ChromeDriver. The component helpers do --
they drive through the `IWebDriver` interface, so they need `NodeWebDriver` (wrapping the
`webdriver` package) or your own implementation of that interface.

New in v2, all optional: `--testRetryCount` (re-run failed spec files on a fresh runtime),
`WebDriver.getWindowHandles()` (find windows that close on blur, such as popups, without
enumerating), and `OpenFinView.create()` / `close()` for setting up views from a test.

The helper method signatures -- `OpenFinHome`, `OpenFinDock`, `OpenFinStore`,
`OpenFinNotifications`, `OpenFinProxy`, `OpenFinSystem`, `WebDriver` -- are unchanged
from v1, as are the CLI's positional arguments, `--offline`, the DOS flags, the port
flags and hook file discovery.
