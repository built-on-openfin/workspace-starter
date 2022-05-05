<img src="../../assets/OpenFin-Workspace-Starter.png" width="100%" alt="OpenFin Workspace Example Application -- Adding your application the Content Discovery Service Via API" />

>**_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes. Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a  license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
OpenFin Workspace is currently **only supported on Windows**.

# OpenFin Setup Test Automation

Any application that requires front end test automation can be complicated to setup. The tests can also be convoluted using the out of the box automation APIs.

This example contains two packages which aim to simplify this process:

* @openfin/automation-helpers - A set of helper methods that can be used in tests to automate access to the OpenFin objects and UI.

* @openfin/automation-cli - A CLI which when passed a manifest and set of tests will launch the necessary processes to run the tests. The correct chromedriver version for the runtime from the manifest will be downloaded if required.

## To build

To build the packages.

```shell
npm install
npm run dist --workspaces
```

## To execute the example tests

There are some example tests written which use the `@openfin/automation-cli` and `@openfin/automation-helpers`, they are written to execute against the `how-to/register-with-home` e.g.

To run the tests against the hosted version of the `register-with-home` app using the mocha test framework you can run.

```shell
cd examples/register-with-home-js
npm install
npm run test-remote-mocha
```

Or if you already have a local version of the example running serving its manifest on `http://localhost:8080` then you can run.

```shell
cd examples
npm install
npm run test-local-mocha
```

There are also variants for the other test frameworks

```shell
npm run test-local-jasmine
npm run test-remote-jasmine
npm run test-local-jest
npm run test-remote-jest
```

In addition to the JavaScript test examples there is also a duplicate set of examples which can be found in the `examples/register-with-home-ts` folder. The same npm run scripts are available in this example but the tests are written in TypeScript.

## Running using CI

The examples can be run on CI, to use GitHub actions to run the tests there is an example workflow in [automation-tests.yaml](../../.github/workflows/automation-tests.yaml)

This workflow demonstrates Building the packages, then serving the manifest, finally using the automation cli to run the tests against the served manifest.

## Example running locally

![Setup Automation Tests Local](setup-automation-tests-local.gif)

## Example running GitHub action

<details>
  <summary>Log of GitHub Action run</summary>
  
  ```shell
start server "npm run server --prefix how-to/register-with-home" command "npm run server --prefix how-to/register-with-home"
waiting on "http://localhost:8080/manifest.fin.json" with timeout of 60 seconds
[command]C:\Windows\system32\cmd.exe /D /S /C "C:\hostedtoolcache\windows\node\16.14.2\x64\npm.cmd run server --prefix how-to/register-with-home"

> openfin-workspace--register-with-home@6.0.0 server
> node ./server/build/index.js

server is listening on port 8080

run command "npm run test-local-mocha --prefix how-to/setup-automation-tests/examples/register-with-home-js" 

command "npm run test-local-mocha --prefix how-to/setup-automation-tests/examples/register-with-home-js"
[command]C:\Windows\system32\cmd.exe /D /S /C "C:\hostedtoolcache\windows\node\16.14.2\x64\npm.cmd run test-local --prefix how-to/setup-automation-tests/examples/register-with-home-js"

> setup-automation-tests-register-with-home@1.0.0 test-local-mocha
> of-automation http://localhost:8080/manifest.fin.json ./tests/**/*.spec.js

🚀 OpenFin Automation

  ⚙️  Manifest Url http://localhost:8080/manifest.fin.json
  ⚙️  Test Glob Path ./tests/**/*.spec.js
  ⚙️  Log Level silent
  ⚙️  Dev Tools Port 9090
  ⚙️  Chrome Driver Port 4444
  ⚙️  Test Framework mocha
  ⚙️  Test Timeout 120
  ⚙️  Default Runtime Version stable
  ⚙️  Storage Folder ./storage/
  ⚙️  Offline false
  ⚙️  TypeScript false
_______________________________________________________

➡️  Loading manifest
   http://localhost:8080/manifest.fin.json

  ✅  Manifest loaded
_______________________________________________________

➡️  Resolving OpenFin runtime version
   Version 23.96.68.3

  ✅  Final Runtime version 23.96.68.3
_______________________________________________________

➡️  Get Chrome Driver
   Version 96

  ✅  Fetching Chrome Driver Version manifest https://chromedriver.storage.googleapis.com/
  ✅  Fetching Chrome Driver https://chromedriver.storage.googleapis.com/96.0.4664.18/chromedriver_win32.zip
  ✅  Unzipping Chrome Driver to D:\a\workspace-starter\workspace-starter\how-to\setup-automation-tests\examples\register-with-home-js\storage\chromedriver\96\chromedriver.exe
_______________________________________________________

➡️  Creating temp profile directory
   C:\Users\RUNNER~1\AppData\Local\Temp\openfin-test-1651746675708

  ✅  Directory created
_______________________________________________________

➡️  Cleaning up OpenFin instances

  ✅  Cleanup instances complete
_______________________________________________________

➡️  Downloading the OpenFinRVM

  ✅  Creating temp installer dir C:\Users\RUNNER~1\AppData\Local\Temp\openfin-installer-1651746675830
  ✅  Unzipping OpenFinRVM C:\Users\RUNNER~1\AppData\Local\Temp\openfin-installer-1651746675830\openfin-installer.exe
  ✅  Installing OpenFinRVM C:\Users\RUNNER~1\AppData\Local\Temp\openfin-installer-1651746675830\openfin-installer.exe
_______________________________________________________

➡️  Querying Desktop Owner Settings

❗ ERROR: The system was unable to find the specified registry key or value.
  ✅  Writing Temporary Desktop Owner Settings C:\Users\RUNNER~1\AppData\Local\Temp\openfin-dos-1651746693053.json
  ✅  Setting Desktop Owner Setting file:\\\C:\Users\RUNNER~1\AppData\Local\Temp\openfin-dos-1651746693053.json
_______________________________________________________

➡️  Running OpenFin
   C:\Users\runneradmin\AppData\Local\OpenFin\OpenFinRVM.exe

  ✅  Args --config=http://localhost:8080/manifest.fin.json,--working-dir="C:\Users\runneradmin\AppData\Local\OpenFin",--runtime-arguments="--remote-debugging-port=9090"
  ✅  OpenFinRVM Process 5152
_______________________________________________________

➡️  Starting Chrome Driver
   D:\a\workspace-starter\workspace-starter\how-to\setup-automation-tests\examples\register-with-home-js\storage\chromedriver\96\chromedriver.exe port 4444

  ✅  Chrome Driver Process 1452
  ✅  Waiting for Chrome Driver to be ready

Starting ChromeDriver 96.0.4664.18 (b8887b3d1742adb0873f871edc1d8d8c1d46bb96-refs/branch-heads/4664@{#236}) on port 4444
Only local connections are allowed.
Please see https://chromedriver.chromium.org/security-considerations for suggestions on keeping ChromeDriver safe.
ChromeDriver was started successfully.
_______________________________________________________

➡️  Running Tests using Mocha
   Version 9.2.2



  Register with Home
    ✔ The title should be set (910ms)
    ✔ The runtime version should be set
    ✔ Can open the home window (7049ms)
    ✔ Can search in the home window (2134ms)
    ✔ Can select entries in the home window by index (4125ms)
    ✔ Can select entries in the home window by id (2147ms)
    ✔ Can open the home window filters (145ms)
    ✔ Can get the filter ids (60ms)
    ✔ Set a filter by index
    ✔ Set a filter by id
    ✔ Can close the home window filters (3069ms)
    ✔ Can check selected entry content (44ms)
    ✔ Can open an entry in the home window (1082ms)
    ✔ Can clear entries in the home window (1856ms)
    ✔ Can close the home window (615ms)
    ✔ Can perform operation in the interop window (2108ms)


  16 passing (25s)

_______________________________________________________

➡️  Cleaning Up

  ✅  Closing Chrome Driver
  ✅  Restoring DOS
  ✅  Deleting Desktop Owner Setting 
  ✅  Removing temporary DOS Settings
  ✅  Cleaning up OpenFin instances
  ✅  Cleanup instances complete
  ✅  Removing temp data directory C:\Users\RUNNER~1\AppData\Local\Temp\openfin-test-1651746675708
_______________________________________________________

😀  Successfully ran the tests
```

</details>
