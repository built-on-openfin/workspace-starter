import type { RegistrationMetaInfo } from "@openfin/workspace";
import {
	register as registerPlatform,
	deregister as deregisterPlatform,
	show as showNotifications,
	hide as hideNotifications,
	ShowOptions,
	provider,
	VERSION
} from "@openfin/workspace/notifications";
import { createLogger } from "../logger-provider";
import { getSettings } from "../settings";

const logger = createLogger("Notifications");

let notificationsRegistered = false;
let metaInfo: RegistrationMetaInfo;

export async function register(): Promise<RegistrationMetaInfo> {
	if (!notificationsRegistered) {
		const settings = await getSettings();
		const notificationPlatform = settings.notificationProvider;
		if (notificationPlatform !== undefined) {
			try {
				await registerPlatform(settings.notificationProvider);
				notificationsRegistered = true;
				logger.info("Registered notifications");
			} catch (error) {
				logger.error("We were unable to register with Notification Center", error);
			}
		} else {
			logger.warn(
				"Unable to register notifications platform as we do not have it defined as part of settings"
			);
		}
		const providerStatus = await provider.getStatus();
		metaInfo = {
			workspaceVersion: providerStatus.version,
			clientAPIVersion: VERSION
		};
	}
	return metaInfo;
}

export async function deregister() {
	if (notificationsRegistered) {
		notificationsRegistered = false;

		const settings = await getSettings();
		const notificationPlatform = settings.notificationProvider;
		if (notificationPlatform !== undefined) {
			await deregisterPlatform(notificationPlatform.id);
			logger.info("Unregistered platform notifications");
		} else {
			logger.warn(
				"Unable to register platform notifications as we do not have notifications defined as part of settings"
			);
		}
	}
}

export async function show(options?: ShowOptions): Promise<void> {
	return showNotifications(options);
}

export async function hide(): Promise<void> {
	return hideNotifications();
}
