import type { RegistrationMetaInfo } from "@openfin/workspace";
import * as Notifications from "@openfin/workspace/notifications";
import { createLogger } from "../logger-provider";
import { getSettings } from "../settings";
import type {
	NotificationClientDefaultOptions,
	NotificationClientOptions,
	NotificationProviderOptions,
	NotificationClient
} from "../shapes/notification-shapes";
import { isEmpty } from "../utils";
import { NotificationClientImplementation } from "./notification-client-implementation";

const logger = createLogger("Notifications");

let notificationsProviderOptions: NotificationProviderOptions | undefined;
let notificationsRegistered = false;
let metaInfo: RegistrationMetaInfo;
let allowNotificationClientCreation = true;
let restrictNotificationClientCreationToListed = false;
let notificationClientOptions: NotificationClientOptions[];
let notificationClientDefaults: NotificationClientDefaultOptions;
let notificationPlatformId: string;

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

		logger.info("Registering platform with Notification Center.");
		const settings = await getSettings();
		if (!isEmpty(settings) && !isEmpty(settings?.notificationProvider)) {
			const { notificationClients, notificationsCustomManifest, ...notificationsPlatformOptions } =
				settings.notificationProvider;
			notificationPlatformId = notificationsPlatformOptions?.id ?? fin.me.identity.uuid;
			notificationsPlatformOptions.id = notificationPlatformId;
			try {
				const registrationResponse = await Notifications.register({
					notificationsPlatformOptions,
					notificationsCustomManifest
				});

				metaInfo = {
					workspaceVersion: registrationResponse.notificationsVersion ?? "",
					clientAPIVersion: registrationResponse.clientAPIVersion
				};

				logger.info("Notifications registered and Versioning information collected.", metaInfo);

				notificationsRegistered = true;
				restrictNotificationClientCreationToListed = notificationClients?.restrictToListed ?? false;
				notificationClientOptions = notificationClients?.clientOptions ?? [];
				notificationClientDefaults = {
					enforceIcon: false,
					includeInPlatform: true,
					...notificationClients?.defaults
				};
				if (restrictNotificationClientCreationToListed) {
					if (!Array.isArray(notificationClientOptions)) {
						logger.warn(
							"You have specified that only listed clients should receive a notification client but the clientOptions setting is undefined. Please set to an empty array if you want no one to have clients or add the clients you wish to enable."
						);
						allowNotificationClientCreation = false;
					} else if (notificationClientOptions.length === 0) {
						allowNotificationClientCreation = false;
					}
				}
				logger.info("Registered notifications");
			} catch (error) {
				logger.error("We were unable to register with Notification Center", error);
			}
		} else {
			logger.warn(
				"Unable to register notifications platform as we do not have it defined as part of settings"
			);
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
				await Notifications.deregister(notificationsProviderOptions.id);
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
export async function show(options?: Notifications.ShowOptions): Promise<void> {
	logger.info("Show Notifications called.");
	return Notifications.show(options);
}

/**
 * Hide the notification center.
 * @returns Nothing.
 */
export async function hide(): Promise<void> {
	logger.info("Hide Notifications called.");
	return Notifications.hide();
}

/**
 * Toggle the notification center.
 * @returns Nothing.
 */
export async function toggle(): Promise<void> {
	logger.info("Toggle Notifications called.");
	return Notifications.toggleNotificationCenter();
}

/**
 * Returns a restricted notification client that helps isolate the notifications that
 * can be read, updated and cleared by a client inside of a platform.
 * @param options The options to help with the client restriction.
 * @returns The notification client.
 */
export async function getNotificationClient(
	options: NotificationClientOptions
): Promise<NotificationClient | undefined> {
	if (!notificationsRegistered) {
		logger.warn(
			"A notification client was requested before the notification provider was registered.",
			options
		);
		return undefined;
	}

	if (!allowNotificationClientCreation) {
		logger.warn(
			"Notification client creation is disabled. If you this is not expected please check you Notification Provider -> Notification Clients settings."
		);
		return undefined;
	}

	const listedClientOptions = notificationClientOptions.find((optionEntry) => optionEntry.id === options.id);

	if (restrictNotificationClientCreationToListed && isEmpty(listedClientOptions)) {
		logger.warn(
			`Notification client creation is limited to those listed in the notification clients section of the notification provider. We have been unable to find an entry with the id: ${options.id}. `
		);
		return undefined;
	}

	if (!isEmpty(listedClientOptions) && listedClientOptions.enabled === false) {
		logger.warn(
			`The options passed to create a notification client was a listed entry and it's enabled setting is set to false so a notification client will not be created. Id: ${options.id}`
		);
		return undefined;
	}

	if (!isEmpty(listedClientOptions) && listedClientOptions.restricted === false) {
		logger.info(
			`The options passed to create a notification client requests a non-scoped notification client for the module with Id: ${options.id}`
		);
		return Notifications;
	}

	const clientOptions = Object.assign(options, notificationClientDefaults, listedClientOptions ?? {});

	if (isEmpty(clientOptions.icon)) {
		logger.info(
			`No default icon was specified for ${options.id}, providing notification platform default icon of: ${notificationsProviderOptions?.icon} for cases where an icon was not provided.`
		);
		clientOptions.icon = notificationsProviderOptions?.icon;
	}
	return new NotificationClientImplementation(clientOptions, notificationPlatformId);
}
