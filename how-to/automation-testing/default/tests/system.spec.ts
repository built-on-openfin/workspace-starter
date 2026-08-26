import { OpenFinProxy, OpenFinSystem, WebDriver } from "@openfin/automation-helpers";

/**
 * System-level checks: the runtime is up, reachable, and its identity/version
 * are readable. Everything here goes through helpers — no DOM, no selectors.
 */
describe("System", () => {
	it("reports the runtime is ready", async () => {
		expect(await OpenFinSystem.waitForReady(60000)).toBe(true);
	});

	it("exposes the runtime version via the fin proxy", async () => {
		const fin = await OpenFinProxy.fin();
		expect(fin).toBeDefined();
		expect(await fin!.System.getVersion()).toMatch(/^\d+\.\d+\.\d+\.\d+$/);
	});

	it("exposes the current identity via the fin proxy", async () => {
		const fin = await OpenFinProxy.fin();
		expect(fin!.me.identity.uuid).toBeDefined();
		expect(fin!.me.identity.name).toBeDefined();
	});

	it("can enumerate the runtime windows", async () => {
		const windows = await WebDriver.getWindows();
		expect(windows.length).toBeGreaterThan(0);
	});

	it("can read the active window title and url", async () => {
		await WebDriver.waitForWindow("title", /.+/);
		expect(await WebDriver.getTitle()).toBeDefined();
		expect(await WebDriver.getUrl()).toBeDefined();
	});
});
