import { expect, test } from "../fixtures";

/**
 * The fixture platform registers a minimal storefront. OpenFinStore has
 * no isShowing accessor, so this exercises the full show/hide lifecycle and
 * asserts on show() (hide() returns void).
 */
test.describe("Store (Playwright over CDP)", () => {
	test("can show and hide the storefront", async ({ workspace }) => {
		expect(await workspace.store.show(30000)).toBe(true);
		await workspace.store.hide();
	});
});
