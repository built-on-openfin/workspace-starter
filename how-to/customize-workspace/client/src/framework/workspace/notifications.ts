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
		logger.info("Gathering notification center status and version.");
		const providerStatus = await provider.getStatus();
		metaInfo = {
			workspaceVersion: providerStatus.version,
			clientAPIVersion: VERSION
		};
		logger.info("Versioning information collected.", metaInfo);
		if (providerStatus.connected) {
			logger.info("Connected to the Notification Center. Registering platform with Notification Center.");
			const settings = await getSettings();
			const notificationPlatformSettings = settings?.notificationProvider;
			if (notificationPlatformSettings !== undefined) {
				// use a promise.then instead of await as we do not want to delay the start up of the platform
				registerPlatform(notificationPlatformSettings)
					.then(() => {
						notificationsRegistered = true;
						logger.info("Registered notifications");
						return true;
					})
					.catch((reason) => {
						logger.error("We were unable to register with Notification Center", reason);
					});
			} else {
				logger.warn(
					"Unable to register notifications platform as we do not have it defined as part of settings"
				);
			}
		} else {
			logger.info("Unable to register against notification center as the center wasn't connected.");
		}
	}
	return metaInfo;
}

export async function deregister() {
	if (notificationsRegistered) {
		notificationsRegistered = false;

		const settings = await getSettings();
		const notificationPlatform = settings.notificationProvider;
		if (notificationPlatform !== undefined) {
			logger.info("Deregister platform from notifications");
			try {
				await deregisterPlatform(notificationPlatform.id);
			} catch (error) {
				logger.error("Unable to deregister platform from notifications.", error);
			}
		} else {
			logger.warn(
				"Unable to deregister platform notifications as we do not have notifications defined as part of settings"
			);
		}
	}
}

export async function show(options?: ShowOptions): Promise<void> {
	logger.info("Show Notifications called.");
	return showNotifications(options);
}

export async function hide(): Promise<void> {
	logger.info("Hide Notifications called.");
	return hideNotifications();
}
