# Enterprise Browser automation example

A small Vitest suite that drives [HERE Enterprise Browser](https://resources.here.io/docs/core/hc-ui/) with
[`here-automation`](https://www.npmjs.com/package/@openfin/automation-cli) (`@openfin/automation-cli` /
`@openfin/automation-helpers` 2.x). It lives in `eb/` so `npm test` (the fixture-platform suite) does not run it.

The four steps share one browser session and run in order:

1. Launch Enterprise Browser from a manifest URL.
2. Sign in on the HERE ID page (email, then password).
3. Open an allowlisted URL as a new tab in the existing browser window, confirm the driver can switch onto it, then close that tab.
4. Log out, wait for the sign-in window to come back, and quit the app from inside so nothing is left running.

Steps 1, the HERE ID form itself, and opening and closing a tab are ordinary helper and `fin` calls. Three other parts are workarounds for how this CLI attaches to a hidden platform, and for how Enterprise Browser logs out. Those are called out below. Copy the ordinary parts freely. Treat the workarounds as known limits of the current CLI, and expect them to change if the CLI is fixed.

## Running

From `how-to/automation-testing/default`, with the repo's dependencies installed from the workspace root:

```shell
set -a
source eb/.env
set +a
npm run eb
```

`eb/.env` is not read by the CLI or by Vitest. The variables have to be in the shell before `here-automation` starts. Do not commit that file.

| Variable                    | Required | Purpose                                                                                                                                             |
| --------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MANIFEST_URL`              | yes      | Enterprise Browser manifest, for example `https://<host>/platform/api/platform.json`. The CLI launches this URL. It is not opened as a browser tab. |
| `HERE_ID_USER`              | yes      | HERE ID email. This example assumes email + password and no MFA.                                                                                    |
| `HERE_ID_PASSWORD`          | yes      | HERE ID password.                                                                                                                                   |
| `EB_VIEW_URL`               | no       | Page to open in step 3. Default `https://www.google.com/`. The host must already be allowed for that Enterprise Browser (see below).                |
| `EB_MENU_BUTTON_SELECTOR`   | no       | CSS selector for the top-right browser menu, if the built-in guess is wrong.                                                                        |
| `HERE_ID_LOGIN_URL_PATTERN` | no       | Override for the IdP host. Default matches `auth*.openfin.co`.                                                                                      |
| `EB_DEVTOOLS_PORT`          | no       | DevTools port of the runtime. Default `9090`, matching `here-automation.eb.config.json`.                                                            |

`eb/here-automation.eb.config.json` sets the runtime, Workspace, and Notifications versions to `stable`, so this run does not pin the fixture suite's component versions. On macOS the CLI does not write Desktop Owner Settings anyway.

Screenshots go to `reports/screenshots/` (`eb-01-launched`, `eb-02-logged-in`, `eb-03-google-tab`).

If a run is stopped with Ctrl+C, quit leftover processes from this directory:

```shell
npm run kill
```

That matches `Here SE-DEV` and `OpenFin Helper` as well as `OpenFin` / `chromedriver`. The stock `kill` script only matches the latter, so an Enterprise Browser window can survive it. The dock icon named after the shortcut can also remain after the processes are gone; that icon is the installed shortcut, not a running app.

## What each step actually does

**Launch.** The CLI starts the manifest, waits until a `provider.html` target exists, and holds a ChromeDriver session against the runtime's DevTools port. The spec then waits until some window has `fin`.

**Sign-in.** HERE ID is a normal page. The first screen has an email field (a hidden password input is already in the DOM; the test ignores it). The test clicks Continue, then types the password and clicks Log in. The inputs are not inside a `<form>`, so pressing Enter does nothing.

On success the same OpenFin window navigates to `/login/response?complete=true&success=true`. Enterprise Browser does not treat that navigation as "login finished" by itself. Its provider listens for `url-changed` on the login window, sees `success=true`, loads the user, and only then opens the browser. See the provider workaround below.

**Tab.** From the provider window the test dispatches the platform's `addPage` action at the existing browser window (a page with one view), then `setActivePage`. A page's view is created when the tab is shown, and Enterprise Browser may rename the view, so the test polls that window's views until one is on `EB_VIEW_URL`. `WebDriver.waitForWindow` then switches onto it. Closing the tab dispatches `detachPagesFromWindow` (what the tab's close button does) and checks the view is gone.

**Logout.** The test clicks the toolbar button `data-testid=enterprise-toolbar-global-menu-button`. On macOS that menu is a native menu, so the Logout item is not a DOM node and WebDriver cannot click it. The test then runs the menu item's own action, `logout-and-restart`. That saves the session, logs out of HERE ID, quits the runtime, and asks the RVM to relaunch the manifest. The new process shows the HERE ID window again. The test quits both Enterprise Browser and its notifications app from that window and waits until DevTools stops answering.

## Workarounds

These are the parts that are not "call the helper and assert." Each one is a response to a specific limit we hit. A client suite should keep them isolated, the way this example does, and drop them if a newer CLI removes the limit.

None of them reflect a problem with using Enterprise Browser by hand. Launch the same manifest from a `fins://` link, sign in, and the browser opens; log out from the menu and the sign-in window returns. Each workaround exists because of something the test harness adds: a WebDriver attached to the runtime, a native menu the driver cannot reach, a process restart the driver cannot follow, or a helper that does not wait for a Promise. Each section below starts with what a person sees and then what the test sees.

### The hidden provider is replaced with `about:blank` when the driver attaches

_Manually:_ sign in, the splash shows, the browser opens. The provider page is never touched.

_In the test:_ the same sign-in succeeds, but the browser never opens, because the driver attaching blanked the provider page before HERE ID finished.

Enterprise Browser's platform window is hidden (`autoShow: false`) and loads `provider.html`. That page registers the `url-changed` listener that finishes login. A normal launch keeps that page alive and continues into the browser.

Under `here-automation`, within about a second of the test's WebDriver connecting, that window's main frame becomes `about:blank`. The listener dies with the document. HERE ID still completes, and `/platform/api/user/me` returns 200, but the browser never opens. The DevTools target list after attach also no longer contains `provider.html`, so the test cannot read the provider console.

`restoreProviderPage()` runs only after the success page is up. From the login window (which still has `fin`) it navigates the provider window back to `provider.html`. The fresh load sees the session cookie and continues startup. The test then stays off that window for a few seconds, because switching onto it is what cleared it.

Do not close the login window to "get past" login. Enterprise Browser treats that close as a cancelled login and quits.

If a future CLI stops navigating the provider, delete `restoreProviderPage()` and the call in step 2. Until then, a suite that signs in to Enterprise Browser needs this or an equivalent.

### Logout replaces the runtime, and ChromeDriver stays on the old process

_Manually:_ choose Logout, the browser closes, and a moment later the sign-in window is back. Nothing looks like a restart.

_In the test:_ that restart is a new operating-system process. The driver was attached to the old one, so the test has to find the new login window another way.

`logout-and-restart` ends the runtime process. The RVM starts a new one with the same manifest and the same `--remote-debugging-port`. ChromeDriver is still attached to the process that just died. The next WebDriver call hangs, and the log shows `Unable to receive message from renderer`. That line is expected. It is not a failed assertion.

Step 4 sets a flag before it asserts, so `afterAll` does not touch WebDriver again. Waiting for the new login window and quitting are done with DevTools (`/json/list` on port 9090 and a short `Runtime.evaluate`), not with `@openfin/automation-helpers`.

Letting the CLI's `closeRuntime: "both"` kill the relaunched process instead will close it, but the kill is a SIGKILL. Enterprise Browser then shows a dialog: renderer terminated, reason killed, exit code 9. That dialog is the test runner ending the process, not a crash during the test. Quitting from inside avoids it. `npm run kill` can still produce the same dialog if it is what ends the runtime.

### `executeAsync` does not wait for a Promise

_Manually:_ not applicable. This is about the test helper, not the app.

_In the test:_ any `fin` call that returns a Promise has to report its result through a global on the page.

`WebDriver.executeAsync` wraps the script in a function that is not `async` and passes the return value straight to the callback. A script that uses `await`, or that returns a Promise, does not work (syntax error, or the callback receives a Promise the helper cannot use). Thrown errors are swallowed and the callback gets `undefined`.

The scripts in this example start the work, store the outcome on `window.__eb*`, and the test polls that global. That is a property of these helpers, not of Enterprise Browser.

### The Logout click is the menu's action, not the menu item

_Manually:_ open the top-right menu and click Logout.

_In the test:_ the menu button is clicked, but on macOS the menu that opens is a native menu with no DOM, so the test runs the action that the Logout item runs. The result is identical; only the trigger differs.

Opening the menu is a real click. Choosing Logout is not, on macOS. The test dispatches `invokeCustomActionInternal` with action id `logout-and-restart` and `callerType: "GlobalContextMenu"`, which is the payload the product's own menu item sends. If the menu is a web popup on another OS, a click on the item is preferable; the test already looks for a visible "Logout" / "Log out" node and only dispatches the action when it finds none.

`addPage`, `setActivePage`, and `detachPagesFromWindow` are the same kind of call: the workspace platform channel, not a click on the tab strip. They are the operations the browser UI uses. Prefer them to driving styled-components class names, which change every build. The menu button is the exception: it is clicked, and it has a stable `data-testid`.

## Gotchas when writing a similar suite

**Allow the URL first.** Enterprise Browser only shows content the admin console allows. A URL that is not allowed opens a blank window or an "Access Blocked" page (`access-blocked-enterprise?appId=...`). This example uses `https://www.google.com/` because that host was already allowed in the environment under test. Point `EB_VIEW_URL` at a host that is allowed for yours.

**Close test content before logout.** Logout persists the workspace and restores it on the next launch. A view this suite created is not an admin-console app, so it comes back as "Access Blocked", one browser window per leftover, and they accumulate. Step 3 closes its tab before logout. `closeEbContent()` also closes any leftover window or view whose name starts with `eb-` (names from earlier runs that start with `spike-` are closed too), using `fin.Platform.closeView` for views. `fin.View` has no `close()` method; calling one throws `view.close is not a function` and leaves the session dirty.

**A signed-in session skips the login window.** Step 2 then looks for a platform window and continues. That path does not reload `provider.html`. Sign out between runs if you need to exercise login. Step 4 is what makes back-to-back runs possible.

**Name the provider window on purpose.** After startup, `fin.Platform.getCurrentSync()` works from the login window too, and that window is often first in the list. Its renderer stops answering once login has finished, and creating a window from it hangs the driver ("Timed out receiving message from renderer"). Use the window whose name equals the app uuid and whose URL is `provider.html` (`se-dev-here-browser/se-dev-here-browser` in this environment). Skip notification windows (`<uuid>-notifications`), dialogs, and `here-find-in-page-view-*` targets.

**Apple Silicon and ChromeDriver.** The helpers download the mac-x64 ChromeDriver for the runtime's Chromium major. On an arm64 Mac without Rosetta, launching it fails with `spawn Unknown system error -86`. Replace `storage/chromedriver/<major>/chromedriver` with the `mac-arm64` build of that exact version from [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/). `storage/` is gitignored, and a new Chromium major downloads the x64 binary again. The helpers should select `mac-arm64` when `process.arch === "arm64"`.

**`OpenFinView.create` is a classic window.** It calls `fin.Window.create`. It does not create an Enterprise Browser tab. A tab is a platform page (`addPage`) or a `fin.Platform.createView` aimed at the browser window. This suite uses `addPage` so the page shows up as its own tab. `createView` without a target window opens a new browser window.

**Find-in-page targets.** Each browser window brings a `here-find-in-page-view-*` target. Older notes on these helpers say that target can stall `WebDriver.getWindowHandles`. Creating a real view in this suite did not stall it (the call returned in well under a second). Still avoid enumerating every window and running a script in each one; a single unresponsive renderer blocks the driver for its full script timeout.

**One manifest at a time.** The CLI cleanup and `npm run kill` are process-wide. Do not point this suite at a manifest while another HERE app you care about is running.
