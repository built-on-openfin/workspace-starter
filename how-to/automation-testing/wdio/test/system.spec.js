import { OpenFinProxy, OpenFinSystem, WebDriver } from "@openfin/automation-helpers";
import { expect } from "chai";

/**
 * System-level checks: the runtime is up, reachable, and its identity/version
 * are readable. Everything here goes through helpers — no DOM, no selectors.
 */
describe("System", () => {
	it("reports the runtime is ready", async () => {
		expect(await OpenFinSystem.waitForReady(60000)).to.equal(true);
	});

	it("exposes the runtime version via the fin proxy", async () => {
		const fin = await OpenFinProxy.fin();
		expect(fin).to.not.be.undefined;
		expect(await fin.System.getVersion()).to.match(/^\d+\.\d+\.\d+\.\d+$/);
	});

	it("exposes the current identity via the fin proxy", async () => {
		const fin = await OpenFinProxy.fin();
		expect(fin.me.identity.uuid).to.not.be.undefined;
		expect(fin.me.identity.name).to.not.be.undefined;
	});

	it("can enumerate the runtime windows", async () => {
		const windows = await WebDriver.getWindows();
		expect(windows.length).to.be.greaterThan(0);
	});

	it("can read the active window title and url", async () => {
		await WebDriver.waitForWindow("title", /.+/);
		expect(await WebDriver.getTitle()).to.not.be.undefined;
		expect(await WebDriver.getUrl()).to.not.be.undefined;
	});
});
