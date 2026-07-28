![HERE Core UI Example Application -- Adding your application to HERE Core UI (Home, Browser & Store)](../../assets/HERO-STARTER-HERE-CORE-UI.png)

> **_:information_source: HERE Core UI:_** [HERE Core UI](https://resources.here.io/docs/core/hc-ui/) is a commercial product and this repo is for evaluation purposes (See [LICENSE.MD](LICENSE.MD)). Use of the HERE Core Container and HERE Core UI components is only granted pursuant to a license from HERE (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation key or to discuss a production license.

# Use Browser Translation

This example demonstrates **page translation** in the HERE Browser component. When configured correctly, users can right-click a view tab on a foreign-language page and choose **Translate to English** (or revert the translation).

The sample launches a Browser window with three news sites already open:

- [Le Figaro](https://www.lefigaro.fr/) (French)
- [Der Spiegel](https://www.spiegel.de/) (German)
- [El País](https://elpais.com/) (Spanish)

Page translation is **not** enabled in application code. It uses Chromium’s Google Translate integration and requires a Google Cloud API key to be available to **HERE Runtime** at process startup via the `HERE_GOOGLE_API_KEY` environment variable.

This example assumes you have already [set up your development environment](https://resources.here.io/docs/core/develop/).

## Prerequisites

Before running the sample:

1. A [HERE Core UI development environment](https://resources.here.io/docs/core/develop/).
2. A Google Cloud project with the **Cloud Translation API** enabled and an API key (see below).
3. HERE Core UI workspace **45.1.11+** (this example pins that version via optional DOS setup).

## Step 1: Create a Google API key

Page translation needs a Google Cloud **API key** with the **Cloud Translation API** enabled. See [Chromium API Keys](https://www.chromium.org/developers/how-tos/api-keys/) for background.

1. Open [Google Cloud Console](https://console.cloud.google.com/) and create or select a project.
2. Enable **billing** on the project (usually required even for free-tier usage).
3. Go to **APIs & Services** → **Library**, search for **Cloud Translation API**, and click **Enable**.
4. Go to **APIs & Services** → **Credentials**, click **+ Create credentials** → **API key**, and copy the key.
5. (Recommended) Restrict the key to **Cloud Translation API** only.

Do not commit the key to git or share it in tickets or pull requests.

## Step 2: Set `HERE_GOOGLE_API_KEY` for Runtime

The environment variable must be named exactly `HERE_GOOGLE_API_KEY`. Runtime reads it **only at startup** — fully quit all HERE/OpenFin processes after changing it.

| Item                 | Value                                                      |
| -------------------- | ---------------------------------------------------------- |
| Environment variable | `HERE_GOOGLE_API_KEY`                                      |
| Who needs it         | **HERE Runtime** (not Node or the platform provider alone) |
| When it is read      | Runtime process start                                      |

### macOS

**Recommended for `npm run client`:** On macOS, the launch script opens the manifest via `fin://`, which does not inherit a plain `export` from your terminal. Use `launchctl`:

```bash
launchctl setenv HERE_GOOGLE_API_KEY 'PASTE_KEY_HERE'
launchctl getenv HERE_GOOGLE_API_KEY
```

Then quit all OpenFin/HERE processes (Activity Monitor or `npm run kill`) and relaunch.

For a temporary value in the current terminal only (works if Runtime is launched from that same shell):

```bash
export HERE_GOOGLE_API_KEY='PASTE_KEY_HERE'
```

After testing on macOS, you can remove the session variable:

```bash
launchctl unsetenv HERE_GOOGLE_API_KEY
```

### Windows

**Persistent (recommended for QA machines):**

1. Open **Start** → search **Environment Variables** → **Edit environment variables for your account**.
2. Under **User variables**, click **New**.
3. Variable name: `HERE_GOOGLE_API_KEY`, value: your API key.
4. Fully quit and relaunch OpenFin after saving.

Or in PowerShell:

```powershell
setx HERE_GOOGLE_API_KEY "PASTE_KEY_HERE"
```

Open a **new** terminal and confirm:

```powershell
echo $env:HERE_GOOGLE_API_KEY
```

**Temporary (current PowerShell window):**

```powershell
$env:HERE_GOOGLE_API_KEY = 'PASTE_KEY_HERE'
npm run client
```

## Step 3: Run the example

From this directory (`how-to/use-browser-translation`):

```shell
npm run setup
```

Optional on Windows — pin HERE Core UI workspace version via [Desktop Owner Settings](https://resources.here.io/docs/core/manage/desktops/dos/):

```shell
npm run dos
```

(**WARNING**: `npm run dos` kills all open HERE processes.)

Start the local dev server:

```shell
npm run start
```

Launch the platform:

```shell
npm run client
```

If `HERE_GOOGLE_API_KEY` is not set, the launch script prints a warning. The example still runs, but translation menu items stay hidden.

Build after code changes:

```shell
npm run build
```

## Step 4: Translate a page

1. Wait for the Browser window to load (three foreign-language tabs).
2. **Right-click the view tab** (not the page content) for Le Figaro, Der Spiegel, or El País.
3. Select **Translate to English**.
4. To restore the original page, right-click the tab again and choose **Display Default Language**.

If the translate menu item is missing, translation is not available — usually because Runtime did not receive `HERE_GOOGLE_API_KEY` at startup.

## Verify setup

1. Right-click **page content** (not the tab) and open **Inspect** to open DevTools for that View.
2. In the console, run:

```js
await fin.me.getTranslationState();
```

When setup is correct on a translatable page, you should see `translationEnabled: true` and a detected language (for example `fr`, `de`, or `es`).

**Note:** Running this on the browser chrome/window `fin.me` often returns `translationEnabled: false` even when the key is correct. Always check from the View page content DevTools.

## Troubleshooting

| Symptom                             | Likely cause                        | Fix                                             |
| ----------------------------------- | ----------------------------------- | ----------------------------------------------- |
| `{ translationEnabled: false }`     | Wrong variable name                 | Use `HERE_GOOGLE_API_KEY`, not `GOOGLE_API_KEY` |
| Still false after export            | Runtime already running             | Fully quit Runtime, set variable, relaunch      |
| False in DevTools console           | Wrong WebContents                   | Inspect the View page, not browser chrome       |
| False on English page               | Page not translatable               | Use one of the preloaded foreign-language tabs  |
| Translate menu missing              | Same as `translationEnabled: false` | Fix Runtime environment first                   |
| `INITIALIZATION_ERROR` on translate | Invalid or missing key at Runtime   | Confirm Runtime inherited the variable          |

### Confirm Runtime inherited the variable

**macOS** (after the app is running):

```bash
ps eww -p "$(pgrep -f OpenFin | head -n 1)" | tr ' ' '\n' | grep HERE_GOOGLE_API_KEY
```

If that prints nothing, Runtime did not inherit the key — use `launchctl setenv`, fully quit Runtime, and relaunch.

**Windows:**

```powershell
[System.Environment]::GetEnvironmentVariable('HERE_GOOGLE_API_KEY', 'User')
```

If this is empty, the persistent user variable was not set. If it is set but translation is still disabled, fully quit and relaunch OpenFin.

## Running the Sample (hosted)

- Clone this repo and follow the steps above to customize and learn from the APIs.
- After this example is published to the hosted workspace starter, a live launch link will be available from the root [README](../../README.md).

## Note About This Example

This is a headless platform application (`platform.autoShow: false` in the manifest). To debug the provider, set `platform.autoShow` to `true` in [manifest.fin.json](public/manifest.fin.json).

---
