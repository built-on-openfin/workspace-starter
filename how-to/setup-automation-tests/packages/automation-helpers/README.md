# Automation Helpers

This package contains helper methods which can be use in automation testing to interact with the OpenFin ecosystem.

## Installation

Run `npm i @openfin/automation-helpers`.

## Code examples

These examples use `chai` as the testing framework, but you can chose any framework you like.

### Access the OpenFin system runtime

```typescript
import { expect } from "chai";
import { OpenFinBridgeSystem } from "@openfin/automation-helpers";

describe('Test Suite', () => {
    it('The runtime version should be set', async () => {
        const runtimeVersion = await OpenFinBridgeSystem.getVersion();

        expect(runtimeVersion).to.equal('23.96.68.3');
    });
});
```

### Search for a value in the Home component

```typescript
import { expect } from "chai";
import { OpenFinBridgeWorkspace } from "@openfin/automation-helpers";

describe('Test Suite', () => {
    it('Can search in the Home component', async () => {
        await OpenFinBridgeWorkspace.homeSearch("basic");
        await WebDriverHelper.sleep(1000);

        const ids = await OpenFinBridgeWorkspace.homeSearchResultIds();

        expect(ids.length).equal(2);
        expect(ids[0]).equal("basic-interop-view");
        expect(ids[1]).equal("basic-fdc3-view");
    });
});
```

### Use WebDriver command to interact with a window

```typescript
import { expect } from "chai";
import { WebDriverHelper } from "@openfin/automation-helpers";

describe('Test Suite', () => {
    it('Can perform operation in the interop window', async () => {
        await WebDriverHelper.switchToWindow("Interop Instrument Selection");

        await WebDriverHelper.setElementAttributeByPath("//h1", "innerHTML", "My New Title");
        const value = await WebDriverHelper.getElementAttributeByPath("//h1", "innerHTML");
        expect(value).eq("My New Title");

        await WebDriverHelper.sleep(2000);
    });
});
```
