import { OpenFinHome } from "@openfin/automation-helpers";

/**
 * Driving the Workspace Home component entirely through the OpenFinHome helper.
 * Fixture-specific values (result ids, filter ids) are asserted so this doubles
 * as real verification. No selectors or DOM should appear anywhere in this file.
 */
describe("Home", () => {
	beforeAll(async () => {
		// The CDN-served Home component can take a while to open on a cold runner.
		expect(await OpenFinHome.show(90000)).toBe(true);
	});

	afterAll(async () => {
		await OpenFinHome.hide();
	});

	it("returns the expected results for a search", async () => {
		await OpenFinHome.search("interop");
		expect(await OpenFinHome.searchResultIds()).toEqual([
			"interop-broadcast-view",
			"interop-intent-view",
			"winform-interop-example"
		]);
	});

	it("can select a result by index", async () => {
		await OpenFinHome.searchResultByIndex(1, "select");
		expect(await OpenFinHome.searchResultSelectedId()).toBe("interop-intent-view");
	});

	it("can select a result by id and read its content", async () => {
		await OpenFinHome.searchResultById("interop-intent-view", "select");
		expect(await OpenFinHome.searchResultSelectedItem()).toContain("Intents using Interop API");
		expect(await OpenFinHome.searchResultSelectedDetails()).toContain(
			"This is an example of firing and listening to intents using the interop api"
		);
	});

	it("exposes the filter categories", async () => {
		await OpenFinHome.filtersOpen();
		expect(await OpenFinHome.filtersIds()).toEqual([
			"appasset",
			"developer",
			"dock",
			"intent",
			"interop",
			"native",
			"openfin",
			"tools",
			"view"
		]);
	});

	it("can toggle a filter by id", async () => {
		expect(await OpenFinHome.filtersByIdGet("view")).toBe(false);
		await OpenFinHome.filtersByIdSet("view", true);
		expect(await OpenFinHome.filtersByIdGet("view")).toBe(true);
		await OpenFinHome.filtersClose(true);
	});

	it("can clear the search", async () => {
		await OpenFinHome.searchClear();
		expect(await OpenFinHome.searchResultIds()).toEqual([
			"view1",
			"interop-broadcast-view",
			"interop-intent-view",
			"winform-interop-example"
		]);
	});
});
