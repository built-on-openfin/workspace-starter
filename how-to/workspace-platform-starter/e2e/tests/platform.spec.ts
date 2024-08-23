import { OpenFinProxy, OpenFinSystem, OpenFinHome, WebDriver } from "@openfin/automation-helpers";

describe("Platform", () => {
	it("The runtime is ready", async () => {
		const isReady = await OpenFinSystem.waitForReady(10000);
		expect(isReady).toEqual(true);
	});

	it("The platform title should be set", async () => {
		const windows = await WebDriver.getWindows();
		expect(windows.length).toBeGreaterThan(0);
		const titles = windows.map((w) => w.title);
		expect(titles).toContain("Platform Provider");
	});

	it("The runtime version should be set", async () => {
		const fin = await OpenFinProxy.fin();
		const version = await fin.System.getVersion();
		expect(version).toEqual("38.126.82.69");
	});

	it("Can open the home window", async () => {
		const isShown = await OpenFinHome.show(20000);
		expect(isShown).toEqual(true);
	});
});
