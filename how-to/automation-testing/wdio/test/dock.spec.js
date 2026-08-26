import { OpenFinDock } from "@openfin/automation-helpers";
import { expect } from "chai";

/**
 * Driving the Dock component through the OpenFinDock helper. The dock button
 * titles come from the fixture platform registration.
 */
describe("Dock", () => {
	before(async () => {
		// The dock is registered by the (CDN-served) workspace platform during
		// provider init; on a cold runner registration can exceed 30s
		expect(await OpenFinDock.show(60000)).to.equal(true);
	});

	after(async () => {
		await OpenFinDock.hide();
	});

	it("lists the registered dock items", async () => {
		const items = await OpenFinDock.getItems();
		expect(items).to.include("View 1");
		expect(items).to.include("OpenFin");
	});

	it("can click a dock item by title", async () => {
		expect(await OpenFinDock.clickItem("View 1")).to.equal(true);
	});
});
