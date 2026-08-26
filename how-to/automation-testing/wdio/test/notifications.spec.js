import { OpenFinNotifications } from "@openfin/automation-helpers";
import { expect } from "chai";

/**
 * Driving the Notification Center through the OpenFinNotifications helper. The
 * fixture platform registers notifications and emits one on start, so the
 * center has content to show.
 */
describe("Notifications", () => {
	it("can show the notification center", async () => {
		expect(await OpenFinNotifications.show()).to.equal(true);
	});

	it("can hide the notification center", async () => {
		expect(await OpenFinNotifications.hide()).to.equal(true);
	});

	it("can toggle the notification center", async () => {
		expect(await OpenFinNotifications.toggle()).to.equal(true);
		await OpenFinNotifications.hide();
	});
});
