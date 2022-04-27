import { expect } from 'chai';
import { OpenFinSystem, OpenFinWorkspace, WebDriver }  from '@openfin/automation-helpers';

describe('Register with Home', () => {
    it('The title should be set', async () => {
        const title = await WebDriver.getTitle();

        expect(title).to.equal('Platform Provider');
    });

    it('The runtime version should be set', async () => {
        const runtimeVersion = await OpenFinSystem.getVersion();

        expect(runtimeVersion).to.equal('23.96.68.3');
    });

    it('Can open the home window', async () => {
        await OpenFinWorkspace.homeShow(10000);
        await WebDriver.sleep(1000);
    });

    it('Can search in the home window', async () => {
        await OpenFinWorkspace.homeSearch("basic");
        await WebDriver.sleep(1000);

        const ids = await OpenFinWorkspace.homeSearchResultIds();

        expect(ids.length).equal(2);
        expect(ids[0]).equal("basic-interop-view");
        expect(ids[1]).equal("basic-fdc3-view");
    });

    it('Can select entries in the home window by index', async () => {
        await WebDriver.sleep(1000);
        await OpenFinWorkspace.homeSearchResultByIndex(1, "select");

        await WebDriver.sleep(1000);
        await OpenFinWorkspace.homeSearchResultByIndex(0, "select");
    });

    it('Can select entries in the home window by id', async () => {
        await WebDriver.sleep(1000);
        await OpenFinWorkspace.homeSearchResultById("basic-fdc3-view", "select");

        await WebDriver.sleep(1000);
        await OpenFinWorkspace.homeSearchResultById("basic-interop-view", "select");
    });

    it('Can open the home window filters', async () => {
        await OpenFinWorkspace.homeFiltersOpen();
    });

    it('Can get the filter ids', async () => {
        const filterIds = await OpenFinWorkspace.homeFiltersIds();
        expect(filterIds.length).equal(3);
        expect(filterIds[0]).equal("fdc3");
        expect(filterIds[1]).equal("interop");
        expect(filterIds[2]).equal("view");
    });

    it('Set a filter by index', async () => {
        const state = await OpenFinWorkspace.homeFiltersByIndexGet(1);
        expect(state).equal(false);

        await OpenFinWorkspace.homeFiltersByIndexSet(1, true);
        const state2 = await OpenFinWorkspace.homeFiltersByIndexGet(1);
        expect(state2).equal(true);
    });

    it('Set a filter by id', async () => {
        const state = await OpenFinWorkspace.homeFiltersByIdGet("view");
        expect(state).equal(false);

        await OpenFinWorkspace.homeFiltersByIdSet("view", true);
        const state2 = await OpenFinWorkspace.homeFiltersByIdGet("view");
        expect(state2).equal(true);
    });

    it('Can close the home window filters', async () => {
        await WebDriver.sleep(3000);
        await OpenFinWorkspace.homeFiltersClose(true);
    });

    it('Can check selected entry content', async () => {
        const itemHtml = await OpenFinWorkspace.homeSearchResultSelectedItem();
        expect(itemHtml).contains("Basic Interop View");

        const itemDescriptionHtml = await OpenFinWorkspace.homeSearchResultSelectedDetails();
        expect(itemDescriptionHtml).contains("This is an example of a basic OpenFin Interop View");
    });

    it('Can open an entry in the home window', async () => {
        await WebDriver.sleep(500);
        await OpenFinWorkspace.homeSearchResultById("basic-interop-view", "open");
        await WebDriver.sleep(500);
    });

    it('Can clear entries in the home window', async () => {
        await OpenFinWorkspace.homeSearchClear();
        await WebDriver.sleep(500);
        await OpenFinWorkspace.homeSearchClear();

        await WebDriver.sleep(1000);
        await OpenFinWorkspace.homeHide();
    });

    it('Can close the home window', async () => {
        await WebDriver.sleep(500);
        await OpenFinWorkspace.homeHide();
    });

    it('Can perform operation in the interop window', async () => {
        await WebDriver.switchToWindow("Interop Instrument Selection");

        await WebDriver.setElementAttributeByPath("//h1", "innerHTML", "My New Title");
        const value = await WebDriver.getElementAttributeByPath("//h1", "innerHTML");
        expect(value).eq("My New Title");

        await WebDriver.sleep(2000);
    });
});
