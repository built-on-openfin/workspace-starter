import {
	register as registerPlatform,
	deregister as deregisterPlatform
} from "@openfin/workspace/notifications";
import { logger } from "./logger-provider";
import { getSettings } from "./settings";

const LOGGER_GROUP = "Notifications";

let notificationsRegistered = false;

export async function register() {
	if (!notificationsRegistered) {
		const settings = await getSettings();
		const notificationPlatform = settings.notificationProvider;
		if (notificationPlatform !== undefined) {
			try {
				await registerPlatform(settings.notificationProvider);
				notificationsRegistered = true;
				logger.info(LOGGER_GROUP, "Registered notifications");
			} catch (error) {
				logger.error(LOGGER_GROUP, "We were unable to register with Notification Center", error);
			}
		} else {
			logger.warn(
				LOGGER_GROUP,
				"Unable to register notifications platform as we do not have it defined as part of settings"
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
			logger.info(LOGGER_GROUP, "Unregistered platform notifications");
		} else {
			logger.warn(
				LOGGER_GROUP,
				"Unable to register platform notifications as we do not have notifications defined as part of settings"
			);
		}
	}
}
