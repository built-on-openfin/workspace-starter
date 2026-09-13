import { OpenFinNotifications } from "@openfin/automation-helpers";

/**
 * Driving the Notification Center through the OpenFinNotifications helper. The
 * fixture platform registers notifications and emits one on start, so the
 * center has content to show.
 */
describe("Notifications", () => {
	// The notification center service and the Workspace window the helper binds
	// to are both created after provider readiness, so allow for a cold runner.
	const timeout = 60000;

	it("can show the notification center", async () => {
		expect(await OpenFinNotifications.show(timeout)).toBe(true);
	});

	it("can hide the notification center", async () => {
		expect(await OpenFinNotifications.hide(timeout)).toBe(true);
	});

	it("can toggle the notification center", async () => {
		expect(await OpenFinNotifications.toggle(timeout)).toBe(true);
		await OpenFinNotifications.hide(timeout);
	});
});
