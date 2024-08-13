## Automation Test Example: Playwright

OpenFin automated testing example with [Playwright](https://playwright.dev/)

Playwright is a modern end-to-end testing framework that provides reliable and fast cross-browser testing by leveraging the Chromium DevTools Protocol (CDP). Unlike Selenium, which relies on the WebDriver protocol, Playwright directly communicates with browser engines via CDP, allowing for more precise control, faster execution, and deeper browser automation capabilities.

Note, this package does not use `@openfin/automation-helpers` as it is designed for the WebDriver protocol.

## Getting Started

`npm install`
`npm test`

### Playwright commands

`npx playwright test`
Runs the end-to-end tests.

`npx playwright test --ui`
Starts the interactive UI mode.

`npx playwright test --project=chromium`
Runs the tests only on Desktop Chrome.

`npx playwright test example`
Runs the tests in a specific file.

`npx playwright test --debug`
Runs the tests in debug mode.

`npx playwright codegen`
Auto generate tests with Codegen.
