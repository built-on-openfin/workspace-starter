import { OpenFinProxy, OpenFinSystem, OpenFinHome, WebDriver } from "@openfin/automation-helpers";

describe("Platform", () => {
	it("The runtime is ready", async () => {
		const isReady = await OpenFinSystem.waitForReady(10000);
		expect(isReady).toEqual(true);
	});

	it("The title should be set", async () => {
		const title = await WebDriver.getTitle();
		expect(title).toEqual("Platform Provider");
	});

	it("The runtime version should be set", async () => {
		const fin = await OpenFinProxy.fin();
		const version = await fin.System.getVersion();
		expect(version).toEqual("33.116.77.11");
	});

	it("Can open the home window", async () => {
		const isShown = await OpenFinHome.show(20000);
		expect(isShown).toEqual(true);
	});
});
