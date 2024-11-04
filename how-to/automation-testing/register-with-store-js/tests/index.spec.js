const { OpenFinProxy, OpenFinSystem, OpenFinStore, WebDriver } = require('@openfin/automation-helpers');
const { expect } = require('chai');

describe('Register with Store', () => {
	it('The runtime is ready', async () => {
		const isReady = await OpenFinSystem.waitForReady(10000);
		expect(isReady).to.equal(true);
	});

	it('The title should be set', async () => {
		const title = await WebDriver.getTitle();
		expect(title).to.equal('Platform Provider');
	});

	it('The runtime version should be set', async () => {
		const fin = await OpenFinProxy.fin();
		const version = await fin.System.getVersion();
		expect(version).to.equal('38.126.83.79');
	});

	it('Can open the store window', async () => {
		const isShown = await OpenFinStore.show(60000);
		expect(isShown).to.equal(true);
	});
});
