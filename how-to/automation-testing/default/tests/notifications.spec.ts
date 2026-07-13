import { OpenFinNotifications } from "@openfin/automation-helpers";

/**
 * Driving the Notification Center through the OpenFinNotifications helper. The
 * fixture platform registers notifications and emits one on start, so the
 * center has content to show.
 */
describe("Notifications", () => {
	it("can show the notification center", async () => {
		expect(await OpenFinNotifications.show()).toBe(true);
	});

	it("can hide the notification center", async () => {
		expect(await OpenFinNotifications.hide()).toBe(true);
	});

	it("can toggle the notification center", async () => {
		expect(await OpenFinNotifications.toggle()).toBe(true);
		await OpenFinNotifications.hide();
	});
});
