# Automation tests: HERE Enterprise Browser

Example tests for [HERE Enterprise Browser](https://resources.here.io/docs/core/hc-ui/) that
run against a browser you have already signed in to. The suite never sees HERE ID
credentials: you start the browser and sign in as you normally would, and the tests attach
to it.

## Prerequisites

- Windows or macOS
- Node >= 24
- Ports **9090** (DevTools) and **4444** (ChromeDriver) free
- `npm install` run from the repo root
- An Enterprise Browser environment, and an account you can sign in to it with

## Set your environment first

> **The suite will not run until you point it at your environment.** The
> `platform.manifestUrl` in [`here-automation.config.json`](./here-automation.config.json) is
> a placeholder (`https://your-environment.example.com/...`). Replace it with your
> environment's Enterprise Browser manifest before running anything.

```json
{
  "platform": {
    "manifestUrl": "https://<your-environment>/platform/api/platform.json"
  }
}
```

To try an environment without editing the file, set `MANIFEST_URL` for both commands
instead:

```bash
MANIFEST_URL=https://<your-environment>/platform/api/platform.json npm run launch
MANIFEST_URL=https://<your-environment>/platform/api/platform.json npm test
```

If the manifest pins a `devtools_port`, set `cli.devToolsPort` to the same value;
`npm run launch` stops and tells you if they differ.

## Running

```bash
npm run launch   # start Enterprise Browser with remote debugging on the suite's DevTools port
                 # sign in to HERE ID if it asks
npm test         # attach to the browser and run the tests
```

`npm run launch` starts the manifest through the OpenFin RVM, as a `fins://` link does, and
adds a DevTools port. Where the environment's browser is installed as an app, the RVM hands
the launch to that app, which reuses its saved sign-in. The script never kills anything:

- If the browser is already running on the DevTools port, it says so and exits.
- If the browser is running without the port, it stops and asks you to quit the browser
  from its menu first.
- If something else is using the port, it stops and asks you to close it or change
  `cli.devToolsPort`.

`npm test` runs `here-automation` in attach mode (`cli.attach` in the config). It starts its
own ChromeDriver, but never launches or closes the browser, so you can run it as often as you
like against the same one. The first run downloads the ChromeDriver that matches the
browser's Chromium version into `storage/`. Leave the browser alone while the tests run: they
open and close a tab, and focus the window.

Screenshots are written to `reports/screenshots/`.

## Configuration

Everything lives in this folder's
[`here-automation.config.json`](./here-automation.config.json). The CLI uses the nearest
config file it finds searching upward, so this one is used instead of the shared
[`../here-automation.config.json`](../here-automation.config.json); the two are not merged.
The CLI reads the `cli` and `platform` sections; the specs and the launch script also read
`enterpriseBrowser`.

| Setting                                   | Override         | Purpose                                                                                                                                                  |
| ----------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `platform.manifestUrl`                    | `MANIFEST_URL`   | **Required.** The environment, replacing the placeholder. The specs find the browser through this manifest's `platform.providerUrl` and `platform.uuid`. |
| `cli.attach`                              | `--no-attach`    | Attach to the running browser instead of launching the manifest. Leave it `true`.                                                                        |
| `cli.devToolsPort`                        | `--devToolsPort` | DevTools port the browser is launched with and the CLI attaches to. If the manifest sets `devtools_port`, this must match it; `launch` checks.           |
| `cli.chromeDriverPort`, `cli.testTimeout` |                  | As for any `here-automation` run.                                                                                                                        |
| `enterpriseBrowser.tabUrl`                | `EB_TAB_URL`     | The page the tab test opens. It must be allowed for the environment, or an "Access Blocked" page loads instead.                                          |
| `enterpriseBrowser.launchTimeoutSeconds`  |                  | How long `launch` waits for the browser.                                                                                                                 |

To use another port for one run, pass it to both commands. The specs use whichever port the
CLI attached to.

```bash
npm run launch -- --devToolsPort 9091
npm test -- --devToolsPort 9091
```

## Storage encryption blocks the DevTools port

From runtime 45.150.200, an official runtime refuses remote debugging while the manifest's
runtime arguments include `--storage-encryption=on`. It drops `--remote-debugging-port` (and
a manifest `devtools_port`) and records `"event":"remote-debugging-refused"` in the debug.log
of its cache folder (`%LOCALAPPDATA%\OpenFin\cache\<security realm>\<runtime version>\` on
Windows). `--storage-encryption-allow-remote-debugging` is ignored in official builds, so
nothing on the command line gets the port back.

So the suite cannot attach to an environment that runs such a runtime with storage
encryption on. When the port does not open and the manifest turns storage encryption on,
`launch` says so. Point `MANIFEST_URL` at an environment without storage encryption, or one
on an earlier runtime. Where the RVM hands the launch to an installed app on an earlier
runtime (as on macOS), the port still opens.

Launching from a `fins://` link never opens the port either, whatever the runtime: the RVM
drops `--runtime-arguments` for protocol launches. Use `npm run launch`.

## Tests

| File                    | What it checks                                                                                                       |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `tests/session.spec.ts` | The attached browser is the platform the manifest names, no HERE ID sign-in window is open, and a browser window is. |
| `tests/tabs.spec.ts`    | Opens a tab with **+**, enters `tabUrl` in the address bar, reads the page, and closes the tab.                      |

`environment.ts` reads the settings and the manifest, and lists pages over DevTools, for both
the launch script and the specs. `tests/support/enterprise-browser.ts` holds the shared test
steps: finding the platform provider, running `fin` calls in it, and listing the browser and
sign-in windows.

## Writing more tests

- **Locate browser controls by `data-testid`.** The browser ships them for its own controls
  (`enterprise-page-new-page-button`, `enterprise-nav-address-bar-input`, ...). Its class
  names change every build.
- **Don't look windows up while a page is loading.** Finding a window by url, title or
  identity (`WebDriver.switchToWindow`, `waitForWindow`) and `getWindows` make ChromeDriver
  attach to every page, and attaching to a view that is still navigating can block the
  driver for minutes. Wait with `listPages`, which only reads the DevTools page list, then
  switch by handle, which goes straight to the page (a page's `id` is its handle).
- **Focus the window before typing in the address bar.** It only acts on Enter while the
  browser window has focus, and only once its suggestions have loaded.
- **Close what you open.** The browser restores open tabs on its next launch. Select a tab
  before clicking its close button; the button does not respond on an unselected tab.
- **Don't log out.** Logging out ends the session the suite depends on, and the runtime with it.
