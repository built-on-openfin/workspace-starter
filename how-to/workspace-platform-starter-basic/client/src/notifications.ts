import * as Notifications from "@openfin/workspace/notifications";
import type { PlatformSettings } from "./shapes";

/**
 * Register the notification provider.
 * @param platformSettings The platform settings from the manifest.
 * @returns The registration details for notifications.
 */
export async function register(
	platformSettings: PlatformSettings
): Promise<Notifications.NotificationsRegistration | undefined> {
	console.log("Initializing the notification provider.");

	try {
		const metaInfo = await Notifications.register({
			notificationsPlatformOptions: platformSettings
		});
		console.log(metaInfo);
		console.log("Notification provider initialized.");
		return metaInfo;
	} catch (err) {
		console.error("An error was encountered while trying to register the notifications provider", err);
	}
}
