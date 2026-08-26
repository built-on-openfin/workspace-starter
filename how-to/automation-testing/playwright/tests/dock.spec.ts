import { expect, test } from "../fixtures";

/**
 * Driving the Dock over CDP with Playwright. The
 * dock button titles come from the fixture platform registration.
 */
test.describe("Dock (Playwright over CDP)", () => {
	test.beforeAll(async ({ workspace }) => {
		// The dock is registered by the (CDN-served) workspace platform during
		// provider init; on a cold runner registration can exceed 30s, so allow a
		// generous budget here.
		expect(await workspace.dock.show(60000)).toBe(true);
	});

	test.afterAll(async ({ workspace }) => {
		await workspace.dock.hide();
	});

	test("lists the registered dock items", async ({ workspace }) => {
		const items = await workspace.dock.getItems();
		expect(items).toContain("View 1");
		expect(items).toContain("OpenFin");
	});

	test("can click a dock item by title", async ({ workspace }) => {
		expect(await workspace.dock.clickItem("View 1")).toBe(true);
	});
});
