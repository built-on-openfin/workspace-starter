import { expect, test } from "../fixtures";

/**
 * System-level checks driven over CDP with Playwright. The runtime is up and reachable,
 * and its identity/version are readable. Everything goes through the OpenFinSystem page object — no raw selectors.
 */
test.describe("System (Playwright over CDP)", () => {
	test("reports the runtime is ready", async ({ workspace }) => {
		expect(await workspace.system.waitForReady(60000)).toBe(true);
	});

	test("exposes the runtime version", async ({ workspace }) => {
		expect(await workspace.system.version()).toMatch(/^\d+\.\d+\.\d+\.\d+$/);
	});

	test("exposes the current identity", async ({ workspace }) => {
		const identity = await workspace.system.identity();
		expect(identity?.uuid).toBeTruthy();
		expect(identity?.name).toBeTruthy();
	});

	test("can enumerate the runtime windows", async ({ workspace }) => {
		const names = await workspace.system.windowNames();
		expect(names.length).toBeGreaterThan(0);
	});

	test("can read the active window title and url", async ({ workspace }) => {
		expect(await workspace.system.activeTitle()).not.toBeUndefined();
		expect(workspace.system.activeUrl()).not.toBeUndefined();
	});
});
