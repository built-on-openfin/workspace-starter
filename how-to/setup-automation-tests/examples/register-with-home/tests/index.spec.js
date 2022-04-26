const { expect } = require('chai');
const { OpenFinBridgeSystem, OpenFinBridgeWorkspace, WebDriverHelper } = require('@openfin/automation-helpers');

describe('Register With Home', () => {
    it('The title should be set', async () => {
        const title = await WebDriverHelper.getTitle();

        expect(title).to.equal('Platform Provider2');
    });

    it('The runtime version should be set', async () => {
        const runtimeVersion = await OpenFinBridgeSystem.getVersion();

        expect(runtimeVersion).to.equal('23.96.68.3');
    });

    it('Can open the home window', async () => {
        await OpenFinBridgeWorkspace.homeShow(10000);
        await WebDriverHelper.sleep(1000);
    });

    it('Can search in the home window', async () => {
        await OpenFinBridgeWorkspace.homeSearch("basic");
        await WebDriverHelper.sleep(1000);

        const ids = await OpenFinBridgeWorkspace.homeSearchResultIds();

        expect(ids.length).equal(2);
        expect(ids[0]).equal("basic-interop-view");
        expect(ids[1]).equal("basic-fdc3-view");
    });

    it('Can select entries in the home window by index', async () => {
        await WebDriverHelper.sleep(1000);
        await OpenFinBridgeWorkspace.homeSearchResultByIndex(1, "select");

        await WebDriverHelper.sleep(1000);
        await OpenFinBridgeWorkspace.homeSearchResultByIndex(0, "select");
    });

    it('Can select entries in the home window by id', async () => {
        await WebDriverHelper.sleep(1000);
        await OpenFinBridgeWorkspace.homeSearchResultById("basic-fdc3-view", "select");

        await WebDriverHelper.sleep(1000);
        await OpenFinBridgeWorkspace.homeSearchResultById("basic-interop-view", "select");
    });

    it('Can open the home window filters', async () => {
        await OpenFinBridgeWorkspace.homeFiltersOpen();
    });

    it('Can get the filter ids', async () => {
        const filterIds = await OpenFinBridgeWorkspace.homeFiltersIds();
        expect(filterIds.length).equal(3);
        expect(filterIds[0]).equal("fdc3");
        expect(filterIds[1]).equal("interop");
        expect(filterIds[2]).equal("view");
    });

    it('Set a filter by index', async () => {
        const state = await OpenFinBridgeWorkspace.homeFiltersByIndexGet(1);
        expect(state).equal(false);

        await OpenFinBridgeWorkspace.homeFiltersByIndexSet(1, true);
        const state2 = await OpenFinBridgeWorkspace.homeFiltersByIndexGet(1);
        expect(state2).equal(true);
    });

    it('Set a filter by id', async () => {
        const state = await OpenFinBridgeWorkspace.homeFiltersByIdGet("view");
        expect(state).equal(false);

        await OpenFinBridgeWorkspace.homeFiltersByIdSet("view", true);
        const state2 = await OpenFinBridgeWorkspace.homeFiltersByIdGet("view");
        expect(state2).equal(true);
    });

    it('Can close the home window filters', async () => {
        await WebDriverHelper.sleep(3000);
        await OpenFinBridgeWorkspace.homeFiltersClose(true);
    });

    it('Can check selected entry content', async () => {
        const itemHtml = await OpenFinBridgeWorkspace.homeSearchResultSelectedItem();
        expect(itemHtml).contains("Basic Interop View");

        const itemDescriptionHtml = await OpenFinBridgeWorkspace.homeSearchResultSelectedDetails();
        expect(itemDescriptionHtml).contains("This is an example of a basic OpenFin Interop View");
    });

    it('Can open an entry in the home window', async () => {
        await WebDriverHelper.sleep(500);
        await OpenFinBridgeWorkspace.homeSearchResultById("basic-interop-view", "open");
        await WebDriverHelper.sleep(500);
    });

    it('Can clear entries in the home window', async () => {
        await OpenFinBridgeWorkspace.homeSearchClear();
        await WebDriverHelper.sleep(500);
        await OpenFinBridgeWorkspace.homeSearchClear();

        await WebDriverHelper.sleep(1000);
        await OpenFinBridgeWorkspace.homeHide(10000);
    });

    it('Can close the home window', async () => {
        await WebDriverHelper.sleep(500);
        await OpenFinBridgeWorkspace.homeHide(10000);
    });

    it('Can perform operation in the interop window', async () => {
        await WebDriverHelper.switchToWindow("Interop Instrument Selection");

        await WebDriverHelper.setElementAttributeByPath("//h1", "innerHTML", "My New Title");
        const value = await WebDriverHelper.getElementAttributeByPath("//h1", "innerHTML");
        expect(value).eq("My New Title");

        await WebDriverHelper.sleep(2000);
    });
});
