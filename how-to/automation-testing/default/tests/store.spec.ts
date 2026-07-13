import { OpenFinStore } from "@openfin/automation-helpers";

/**
 * Driving the Storefront component through the OpenFinStore helper. The fixture
 * platform registers a minimal storefront.
 */
describe("Store", () => {
	// OpenFinStore has no isShowing accessor, so this single test exercises the
	// full show/hide lifecycle and asserts on show() (hide() returns void).
	it("can show and hide the storefront", async () => {
		expect(await OpenFinStore.show(30000)).toBe(true);
		await OpenFinStore.hide();
	});
});
