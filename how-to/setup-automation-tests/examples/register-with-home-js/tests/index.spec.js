const { expect } = require('chai');
const { OpenFinSystem, OpenFinHome, WebDriver } = require('@openfin/automation-helpers');

let providerWindowUrl;

describe('Register with Home', () => {
    it('The runtime is ready', async () => {
        const isReady = await OpenFinSystem.waitForReady(10000);
        expect(isReady).to.equal(true);
    });

    it('The title should be set', async () => {
        const title = await WebDriver.getTitle();
        expect(title).to.equal('Platform Provider');
    });

    it('The url should be set', async () => {
        providerWindowUrl = await WebDriver.getUrl();
        expect(providerWindowUrl).not.be.undefined;
    });

    it('The runtime version should be set', async () => {
        const runtimeVersion = await OpenFinSystem.getVersion();
        expect(runtimeVersion).to.equal('23.96.68.3');
    });

    it('Can open the home window', async () => {
        const isShown = await OpenFinHome.show(30000);
        expect(isShown).to.equal(true);
    });

    it('Can perform a conditional Node Webdriver specific test', async () => {
        if (globalThis.nodeWebDriver) {
            const elem = nodeWebDriver.findElement("xpath", "//*[@id='search-input']");
            expect(elem).to.exist;
        }
    });

    it('Can perform a conditional Selenium Webdriver specific test', async () => {
        if (globalThis.seleniumWebDriver) {
            const elem = seleniumWebDriver.findElement({
                using: 'xpath',
                value: "//*[@id='search-input']"
            });
            expect(elem).to.exist;
        }
    });

    it('Can search in the home window', async () => {
        await OpenFinHome.search("basic");
        await WebDriver.sleep(1000);

        const ids = await OpenFinHome.searchResultIds();

        expect(ids.length).equal(2);
        expect(ids[0]).equal("basic-interop-view");
        expect(ids[1]).equal("basic-fdc3-view");
    });

    it('Can select entries in the home window by index', async () => {
        await WebDriver.sleep(1000);
        await OpenFinHome.searchResultByIndex(1, "select");

        await WebDriver.sleep(1000);
        await OpenFinHome.searchResultByIndex(0, "select");
    });

    it('Can select entries in the home window by id', async () => {
        await WebDriver.sleep(1000);
        await OpenFinHome.searchResultById("basic-fdc3-view", "select");

        await WebDriver.sleep(1000);
        await OpenFinHome.searchResultById("basic-interop-view", "select");
    });

    it('Can open the home window filters', async () => {
        await OpenFinHome.filtersOpen();
    });

    it('Can get the filter ids', async () => {
        const filterIds = await OpenFinHome.filtersIds();
        expect(filterIds.length).equal(3);
        expect(filterIds[0]).equal("fdc3");
        expect(filterIds[1]).equal("interop");
        expect(filterIds[2]).equal("view");
    });

    it('Set a filter by index', async () => {
        const state = await OpenFinHome.filtersByIndexGet(1);
        expect(state).equal(false);

        await OpenFinHome.filtersByIndexSet(1, true);
        const state2 = await OpenFinHome.filtersByIndexGet(1);
        expect(state2).equal(true);
    });

    it('Set a filter by id', async () => {
        const state = await OpenFinHome.filtersByIdGet("view");
        expect(state).equal(false);

        await OpenFinHome.filtersByIdSet("view", true);
        const state2 = await OpenFinHome.filtersByIdGet("view");
        expect(state2).equal(true);
    });

    it('Can close the home window filters', async () => {
        await WebDriver.sleep(3000);
        await OpenFinHome.filtersClose(true);
    });

    it('Can check selected entry content', async () => {
        const itemHtml = await OpenFinHome.searchResultSelectedItem();
        expect(itemHtml).contains("Basic Interop View");

        const itemDescriptionHtml = await OpenFinHome.searchResultSelectedDetails();
        expect(itemDescriptionHtml).contains("This is an example of a basic OpenFin Interop View");
    });

    it('Can open an entry in the home window', async () => {
        await WebDriver.sleep(500);
        await OpenFinHome.searchResultById("basic-interop-view", "open");
        await WebDriver.sleep(500);
    });

    it('Can clear entries in the home window', async () => {
        await OpenFinHome.searchClear();
        await WebDriver.sleep(500);
        await OpenFinHome.searchClear();

        await WebDriver.sleep(1000);
        await OpenFinHome.hide();
    });

    it('Can close the home window', async () => {
        await WebDriver.sleep(500);
        await OpenFinHome.hide();
    });

    it('Can perform operation in the interop window', async () => {
        await WebDriver.switchToWindow("Interop Instrument Selection");

        await WebDriver.setElementAttributeByPath("//h1", "innerHTML", "My New Title");
        const value = await WebDriver.getElementAttributeByPath("//h1", "innerHTML");
        expect(value).eq("My New Title");

        await WebDriver.sleep(2000);
    });

    it('Can exit the runtime', async () => {
        const found = await WebDriver.switchToWindowByUrl(providerWindowUrl);
        expect(found).to.equal(true);
        await OpenFinSystem.exit();
    });
});
