<img src="../../assets/OpenFin-Workspace-Starter.png" width="100%" alt="OpenFin Workspace Example Application -- Adding your application the Content Discovery Service Via API" />

>**_:information_source: OpenFin Workspace:_** [OpenFin Workspace](https://www.openfin.co/workspace/) is a commercial product and this repo is for evaluation purposes. Use of the OpenFin Container and OpenFin Workspace components is only granted pursuant to a  license from OpenFin (see [manifest](public/manifest.fin.json)). Please [**contact us**](https://www.openfin.co/workspace/poc/) if you would like to request a developer evaluation key or to discuss a production license.
OpenFin Workspace is currently **only supported on Windows**.

# OpenFin Setup Test Automation

Any application that requires front end test automation can be complicated to setup. The tests can also be convoluted using the out of the box automation APIs.

This example contains two packages which aim to simplify this process:

* openfin-test-helpers - A set of helper methods that can be used in tests to automate access to the OpenFin objects and UI.

* openfin-test-runner - A CLI which when passed a manifest and set of tests will launch the necessary processes to run the tests. The correct chromedriver version for the runtime from the manifest will be downloaded if required.

## To build

To build the packages.

```shell
npm install
npm run dist --workspaces
```

## To execute the example tests

There are some example tests written which use the `openfin-test-runner` and `openfin-test-helpers`, they are written to execute against the `how-to/register-with-home` e.g.

To run the tests against the hosted version of the `register-with-home` app you can run.

```shell
cd examples
npm install
npm run test-register-with-home-remote
```

Or if you already have a local version of the example running serving its manifest on `http://localhost:8080` then you can run.

```shell
cd examples
npm install
npm run test-register-with-home-local
```

## Running using CI

The examples can be run on CI, to use GitHub actions to run the tests there is an example workflow in [automation-tests.yaml](../../.github/workflows/automation-tests.yaml)

This workflow demonstrates Building the packages, then serving the manifest, finally using the test runner to run the tests against the served manifest.
