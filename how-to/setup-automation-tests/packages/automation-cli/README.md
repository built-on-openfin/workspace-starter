# Automation CLI

> Note: This application currently only supports Windows

This package contains a command line application that can be used to run automation tests within the OpenAPI ecosystem.

The CLI is run by providing the location of the OpenFin application manifest and a set of test files.

During the execution of the CLI it will retrieve the required OpenFin runtimes as well as the correct version of the chromedriver to use with the runtime.

The CLI can also run in offline more where the OpenFin runtimes and chromedriver are already expected to be available locally. An `offline-versions.json` file is also expected to exist in the storage folder to define the real version numbers for labelled runtimes (see example below)

Currently Jasmine, Mocha and Jest are provided as in-built test runners.

When the test frameworks run they will automatically determine if your tests are written with JavaScript and TypeScript and behave accordingly.

The CLI process will exit with 1 if any of the tests failed.

## Installation

Run `npm i @openfin/automation-cli`.

## Command Line Options

```shell
Usage: of-automation [options] <manifestUrl <string>> <testGlob <string>>

Run Automation Tests using Chrome Driver with an OpenFin UI

Arguments:
  manifestUrl <string>              The url of the manifest to fetch
  testGlob <string>                 A glob pointing to the tests to run

Options:
  -V, --version                     output the version number
  --logLevel <level>                The log level for the webdriver (choices: "debug", "silent", default: "silent")
  --devToolsPort <number>           The port to run the dev tools on (default: 9090)
  --chromeDriverPort <number>       The port to run the chromedriver on (default: 4444)
  --storageFolder <path>            The path to store any downloaded or offline data (default: "./storage/")
  --offline                         In offline mode no resources are retrieved, they are expected to be in the storageFolder
  --testTimeout <number>            The timeout in seconds for running tests (default: 120)
  --defaultRuntimeVersion <string>  The OpenFin runtime version to use if not specified in manifest (default: "stable")
  --framework <jasmine>             The test framework to run the tests with (choices: "mocha", "jasmine", default: "mocha")
  -h, --help                        display help for command
```

## Execution example

For information on writing tests to access the OpenFin ecosystem see the `@openfin/automation-helpers` package.

Assuming your manifest is already being served at `http://localhost:8080/manifest.fin.json` and your files are stored in `./tests`.

```shell
of-automation http://localhost:8080/manifest.fin.json ./tests/**/*.spec.js
```

You should see a summary similar to that show below:

<details>
  <summary>CLI Output</summary>

OpenFin Automation

* Manifest Url http://localhost:8080/manifest.fin.json
* Test Glob Path ./tests/\*_/_.spec.js
* Log Level silent
* Dev Tools Port 9090
* Chrome Driver Port 4444
* Test Framework mocha
* Test Timeout 120
* Default Runtime Version stable
* Storage Folder ./storage/
* Offline false

---

Loading manifest http://localhost:8080/manifest.fin.json

Manifest loaded

---

Resolving runtime version 23.96.68.3

Final Runtime version 23.96.68.3

---

Chromium runtime version 96

Chrome Driver already exists .\storage\chromedriver\96\chromedriver.exe

---

Creating temp profile dir <tempfolder>\openfin-test-1650963275529

Cleaning up existing OpenFin instances

Cleanup complete

---

Querying Desktop Owner Settings

HKEY_CURRENT_USER\Software\OpenFin\RVM\Settings

DesktopOwnerSettings REG_SZ file:\\\<tempfolder>openfin-dos-1650633984598.json

Writing Temporary Desktop Owner Settings <tempfolder>openfin-dos-1650963275620.json

Setting Desktop Owner Setting file:\\\<tempfolder>openfin-dos-1650963275620.json

Value DesktopOwnerSettings exists, overwrite(Yes/No)? The operation completed successfully.

Current Desktop Owner Setting file:\\\<tempfolder>openfin-dos-1650633984598.json

---

Running OpenFin <openfindir>\OpenFinRVM.exe

Args --config=http://localhost:8080/manifest.fin.json,--working-dir="<openfindir>",--runtime-arguments="--remote-debugging-port=9090"

OpenFinRVM Process 11564

---

Starting Chrome Driver \storage\chromedriver\96\chromedriver.exe port 4444  

Chrome Driver Process 16948

Waiting for Chrome Driver to be ready

Starting ChromeDriver 96.0.4664.18 (b8887b3d1742adb0873f871edc1d8d8c1d46bb96-refs/
branch-heads/4664@{#236}) on port 4444

Only local connections are allowed.

ChromeDriver was started successfully.

Waiting for Chrome Driver to connect to OpenFin platform...

---

Running Tests using Mocha

Register With Home

✔ The title should be set

✔ The runtime version should be set

✔ Can open the home window (7316ms)

✔ Can search in the home window (1172ms)

✔ Can select entries in the home window by index (2091ms)

✔ Can select entries in the home window by id (2050ms)

✔ Can open the home window filters

✔ Can get the filter ids

✔ Set a filter by index

✔ Set a filter by id

✔ Can close the home window filters (3036ms)

✔ Can check selected entry content

✔ Can open an entry in the home window (1039ms)

✔ Can clear entries in the home window (1675ms)

✔ Can close the home window (519ms)

✔ Can perform operation in the interop window (2061ms)

16 passing (21s)

---

Closing Chrome Driver

SUCCESS: The process with PID 16948 (child process of PID 4512) has been terminated.

Restoring DOS

Setting Desktop Owner Setting file:\\\<tempfolder>\openfin-dos-1650633984598.json

Value DesktopOwnerSettings exists, overwrite(Yes/No)? The operation completed successfully.

Removing temporary DOS Settings

Cleaning up existing OpenFin instances

SUCCESS: The process with PID 15644 (child process of PID 12776) has been terminated.

Cleanup complete

---

Removing temp data dir <tempfolder>openfin-test-1650963275529
</details>

### offline-versions.json

Example file for `offline-versions.json` required if running in offline mode.

```json
{
    "stable": "25.100.69.6",
    "community": "25.100.69.6",
    "release-candidate": "25.100.69.6",
    "beta": "26.102.70.3",
    "canary": "27.102.70.2",
    "stable-v24": "24.98.69.6",
    "stable-v23": "23.96.68.5",
    "stable-v22": "22.94.67.6",
    "stable-v21": "21.93.65.4",
    "stable-v20": "20.91.64.4",
    "stable-v19": "19.89.61.8",
    "stable-v18": "18.87.57.42",
    "stable-v17": "17.85.55.40",
    "stable-v16": "16.83.53.27",
    "stable-v15": "15.80.50.34",
    "stable-v14": "14.78.48.16",
    "stable-v13": "13.76.45.15",
    "stable-v12": "12.69.43.22",
    "stable-v11": "11.69.42.29",
    "stable-v10": "10.66.41.18",
    "stable-v9": "9.61.38.43",
    "stable-v8": "8.56.30.71",
    "stable-v7": "7.53.23.23",
    "stable-v6": "6.49.21.24"
}
```
