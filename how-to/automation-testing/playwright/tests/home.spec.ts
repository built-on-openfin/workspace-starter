import { expect, test } from "../fixtures";

/**
 * Connection and DOM gestures live in the OpenFinHome page object; this spec
 * keeps the assertions, including values specific to the CDN workspace. The Home
 * page object comes from the shared worker-scoped `workspace` connection.
 */
test.describe("Register with Home (Playwright over CDP)", () => {
	test("the runtime version is set", async ({ workspace }) => {
		expect(await workspace.home.version()).toMatch(/^\d+\.\d+\.\d+\.\d+$/);
	});

	test("the Home window identity is set", async ({ workspace }) => {
		expect(await workspace.home.identity()).toMatchObject({ uuid: "openfin-workspace", name: "openfin-home" });
	});

	test("can get the info for the Home window", async ({ workspace }) => {
		// Home auto-hides on blur, so show it before reading its visible state.
		await workspace.home.show();
		const info = await workspace.home.info();
		expect(info.width).toBeGreaterThan(0);
		expect(info.height).toBeGreaterThan(0);
		expect(info.x).toBeGreaterThanOrEqual(0);
		expect(info.y).toBeGreaterThanOrEqual(0);
		expect(info.isShowing).toBe(true);
		expect(info.state).toBe("normal");
	});

	test("can get a list of windows", async ({ workspace }) => {
		const names = await workspace.home.windowNames();
		expect(names.length).toBeGreaterThan(0);
		expect(names).toContain("openfin-home");
	});

	test("can search in the Home window", async ({ workspace }) => {
		await workspace.home.search("interop");
		expect(await workspace.home.searchResultIds()).toEqual([
			"interop-broadcast-view",
			"interop-intent-view",
			"winform-interop-example"
		]);
	});

	test("can select a result by index", async ({ workspace }) => {
		await workspace.home.searchResultByIndex(1, "select");
		expect(await workspace.home.searchResultSelectedId()).toBe("interop-intent-view");

		await workspace.home.searchResultByIndex(0, "select");
		expect(await workspace.home.searchResultSelectedId()).toBe("interop-broadcast-view");
	});

	test("can select a result by id", async ({ workspace }) => {
		await workspace.home.searchResultById("interop-intent-view", "select");
		expect(await workspace.home.searchResultSelectedId()).toBe("interop-intent-view");
	});

	test("can read the selected result content", async ({ workspace }) => {
		await workspace.home.searchResultById("interop-intent-view", "select");

		expect(await workspace.home.searchResultSelectedItem()).toContain("Intents using Interop API");
		expect(await workspace.home.searchResultSelectedDetails()).toContain(
			"This is an example of firing and listening to intents using the interop api"
		);
	});

	test("can set/get/remove a property of an element", async ({ workspace }) => {
		const input = workspace.home.searchInput();
		await input.setProperty("data-prop", "foo");
		expect(await input.getProperty("data-prop")).toBe("foo");
		await input.removeProperty("data-prop");
		expect(await input.getProperty("data-prop")).toBeUndefined();
	});

	test("can set/get/remove an attribute of an element", async ({ workspace }) => {
		const input = workspace.home.searchInput();
		await input.setAttribute("disabled", "true");
		expect(await input.getAttribute("disabled")).toBe("true");
		await input.removeAttribute("disabled");
		expect(await input.getAttribute("disabled")).toBeNull();
	});

	test("can set/get/remove the style of an element", async ({ workspace }) => {
		const input = workspace.home.searchInput();
		// Assert the set/remove roundtrip rather than a hardcoded initial size, so
		// this is robust to font differences between workspace builds.
		const initial = await input.getStyleProperty("fontSize");

		await input.setStyle({ fontSize: "50px" });
		expect(await input.getStyleProperty("fontSize")).toBe("50px");

		await input.removeStyle(["fontSize"]);
		expect(await input.getStyleProperty("fontSize")).toBe(initial);
	});

	test("can type into and clear the search via the helper", async ({ workspace }) => {
		await workspace.home.search("interop");
		expect(await workspace.home.searchText()).toBe("interop");

		await workspace.home.searchClear();
		expect(await workspace.home.searchText()).toBe("");
	});

	test("can open the Home window filters", async ({ workspace }) => {
		// The available filter categories depend on the current results, so
		// re-establish the interop search (the actions test cleared it).
		await workspace.home.search("interop");
		await workspace.home.filtersOpen();
	});

	test("can get the filter ids", async ({ workspace }) => {
		const ids = await workspace.home.filterIds();

		// One category is brand-specific: the local fixture platform tags it
		// "openfin", the HERE-branded CDN workspace tags it "here". Assert the
		// brand-neutral categories exactly, plus that the branded one is present.
		expect(ids.filter((id) => id !== "openfin" && id !== "here")).toEqual([
			"appasset",
			"developer",
			"dock",
			"intent",
			"interop",
			"native",
			"tools",
			"view"
		]);
		expect(ids.some((id) => id === "openfin" || id === "here")).toBe(true);
	});

	test("can set a filter by index", async ({ workspace }) => {
		expect(await workspace.home.filterCheckedByIndex(4)).toBe(false);
		await workspace.home.setFilterByIndex(4, true);
		expect(await workspace.home.filterCheckedByIndex(4)).toBe(true);
	});

	test("can set a filter by id", async ({ workspace }) => {
		expect(await workspace.home.filterCheckedById("view")).toBe(false);
		await workspace.home.setFilterById("view", true);
		expect(await workspace.home.filterCheckedById("view")).toBe(true);
	});

	test("can close the Home window filters", async ({ workspace }) => {
		await workspace.home.filtersClose(true);
	});

	test("can open an entry in the Home window", async ({ workspace }) => {
		// The earlier filter tests left interop excluded; clear filters so results
		// are present again, then re-search and open an entry.
		await workspace.home.filtersClearAll();
		await workspace.home.search("interop");
		await workspace.home.searchResultById("interop-intent-view", "open");
		expect(await workspace.home.searchResultSelectedId()).toBe("interop-intent-view");
	});

	test("can clear the search", async ({ workspace }) => {
		await workspace.home.searchClear();
		expect(await workspace.home.searchText()).toBe("");
	});

	test("can hide the Home window", async ({ workspace }) => {
		await workspace.home.hide();
		expect(await workspace.home.isShowing()).toBe(false);
	});
});
