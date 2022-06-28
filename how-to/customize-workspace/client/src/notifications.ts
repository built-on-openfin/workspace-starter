import {
	register as registerPlatform,
	deregister as deregisterPlatform
} from "@openfin/workspace/notifications";
import { getSettings } from "./settings";
let notificationsRegistered = false;

export async function register() {
	if (!notificationsRegistered) {
		const settings = await getSettings();
		const notificationPlatform = settings.notificationProvider;
		if (notificationPlatform !== undefined) {
			try {
				await registerPlatform(settings.notificationProvider);
				notificationsRegistered = true;
				console.log("Registered notifications");
			} catch (error) {
				console.error("We were unable to register with Notification Center:", error);
			}
		} else {
			console.warn(
				"Unable to register notifications platform as we do not have it defined as part of settings."
			);
		}
	}
}

export async function deregister() {
	if (notificationsRegistered) {
		const settings = await getSettings();
		const notificationPlatform = settings.notificationProvider;
		if (notificationPlatform !== undefined) {
			await deregisterPlatform(notificationPlatform.id);
			console.log("Unregistered platform notifications.");
		} else {
			console.warn(
				"Unable to register platform notifications as we do not have notifications defined as part of settings."
			);
		}
	}
}
