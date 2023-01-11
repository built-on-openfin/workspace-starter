## Automation Test Examples

There are some example tests written which use the `@openfin/automation-cli` and `@openfin/automation-helpers`, they are written to execute against the workspace starter `how-to/register-with-home` e.g.

To run the tests against the hosted version of the `register-with-home` app using the mocha test framework you can run.

```shell
cd register-with-home-js
npm install
npm run test-remote-mocha
```

Or if you already have a local version of the example running serving its manifest on `http://localhost:8080` then you can run.

```shell
cd register-with-home-js
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

In addition to the JavaScript test examples there is also a duplicate set of examples which can be found in the [register-with-home-ts](./register-with-home-ts) folder. The same npm run scripts are available in this example but the tests are written in TypeScript.

## Selenium

The `@openfin/automation-helpers` can also be used with a [Selenium](https://www.selenium.dev/) setup, see the [selenium](./examples/selenium/) example for more details.

## WebDriverIO

The `@openfin/automation-helpers` can also be used with a [WebDriverIO](https://webdriver.io/) setup, see the [wdio](./examples/wdio/) example for more details.
