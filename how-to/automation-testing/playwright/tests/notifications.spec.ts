import { expect, test } from "../fixtures";

/**
 * Driving the Notification Center over CDP with Playwright. The fixture platform
 * registers notifications and emits one on start, so the center has content to show.
 */
test.describe("Notifications (Playwright over CDP)", () => {
	test("can show the notification center", async ({ workspace }) => {
		expect(await workspace.notifications.show()).toBe(true);
	});

	test("can hide the notification center", async ({ workspace }) => {
		expect(await workspace.notifications.hide()).toBe(true);
	});

	test("can toggle the notification center", async ({ workspace }) => {
		expect(await workspace.notifications.toggle()).toBe(true);
		await workspace.notifications.hide();
	});
});
