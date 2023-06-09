import type { RegistrationMetaInfo } from "@openfin/workspace";
import {
	VERSION,
	deregister as deregisterPlatform,
	hide as hideNotifications,
	provider,
	register as registerPlatform,
	show as showNotifications,
	type ShowOptions
} from "@openfin/workspace/notifications";
import { createLogger } from "../logger-provider";
import { getSettings } from "../settings";
import type { NotificationProviderOptions } from "../shapes/notification-shapes";
import { isEmpty } from "../utils";

const logger = createLogger("Notifications");

let notificationsProviderOptions: NotificationProviderOptions | undefined;
let notificationsRegistered = false;
let metaInfo: RegistrationMetaInfo;

/**
 * Register the home component.
 * @param options The options for the home provider.
 * @returns The registration.
 */
export async function register(
	options: NotificationProviderOptions | undefined
): Promise<RegistrationMetaInfo> {
	if (!notificationsRegistered) {
		notificationsProviderOptions = options;
		logger.info("Gathering notification center status and version.");

		const providerStatus = await provider.getStatus();
		metaInfo = {
			workspaceVersion: providerStatus.version ?? "",
			clientAPIVersion: VERSION
		};

		logger.info("Versioning information collected.", metaInfo);

		if (providerStatus.connected) {
			logger.info("Connected to the Notification Center. Registering platform with Notification Center.");
			const settings = await getSettings();
			const notificationPlatformSettings = settings?.notificationProvider;
			if (!isEmpty(notificationPlatformSettings)) {
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

/**
 * Deregister the notifications component.
 */
export async function deregister(): Promise<void> {
	if (notificationsRegistered) {
		notificationsRegistered = false;

		if (!isEmpty(notificationsProviderOptions)) {
			logger.info("Deregister platform from notifications");
			try {
				await deregisterPlatform(notificationsProviderOptions.id);
			} catch (error) {
				logger.error("Unable to deregister platform from notifications.", error);
			}
			notificationsProviderOptions = undefined;
		} else {
			logger.warn(
				"Unable to deregister platform notifications as we do not have notifications defined as part of settings"
			);
		}
	}
}

/**
 * Show the notification center.
 * @param options The options for showing.
 * @returns Nothing.
 */
export async function show(options?: ShowOptions): Promise<void> {
	logger.info("Show Notifications called.");
	return showNotifications(options);
}

/**
 * Hide the notification center.
 * @returns Nothing.
 */
export async function hide(): Promise<void> {
	logger.info("Hide Notifications called.");
	return hideNotifications();
}
