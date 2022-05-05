# Automation Helpers

This package contains helper methods which can be use in automation testing to interact with the OpenFin ecosystem.

They should be used in a test runner that has webdriver capabilities e.g. `@openfin/automation-cli`

## Installation

Run `npm i @openfin/automation-helpers`.

## Code examples

These examples use `chai` as the testing framework, but you can choose any framework you like.

### Access the OpenFin system runtime

```typescript
import { expect } from "chai";
import { OpenFinSystem, WebDriver } from "@openfin/automation-helpers";

describe('Test Suite', () => {
    it('The runtime version should be set', async () => {
        const runtimeVersion = await OpenFinSystem.getVersion();

        expect(runtimeVersion).to.equal('23.96.68.3');
    });
});
```

### Search for a value in the Home component

```typescript
import { expect } from "chai";
import { OpenFinWorkspace } from "@openfin/automation-helpers";

describe('Test Suite', () => {
    it('Can search in the Home component', async () => {
        await OpenFinWorkspace.homeSearch("basic");
        await WebDriver.sleep(1000);

        const ids = await OpenFinWorkspace.homeSearchResultIds();

        expect(ids.length).equal(2);
        expect(ids[0]).equal("basic-interop-view");
        expect(ids[1]).equal("basic-fdc3-view");
    });
});
```

### Use WebDriver command to interact with a window

```typescript
import { expect } from "chai";
import { WebDriver } from "@openfin/automation-helpers";

describe('Test Suite', () => {
    it('Can perform operation in the interop window', async () => {
        await WebDriver.switchToWindow("Interop Instrument Selection");

        await WebDriver.setElementAttributeByPath("//h1", "innerHTML", "My New Title");
        const value = await WebDriver.getElementAttributeByPath("//h1", "innerHTML");
        expect(value).eq("My New Title");

        await WebDriver.sleep(2000);
    });
});
```
