import type {
	NotificationsPlatform,
	create,
	getAll,
	clear,
	clearAll,
	update,
	show,
	hide,
	NotificationCreatedEvent
} from "@openfin/workspace/notifications";
/**
 * Notification Provider Options. Providing settings in order to register your platform against the notification center.
 */
export interface NotificationProviderOptions extends NotificationsPlatform {
	/**
	 * A collection of rules and settings for notification clients that fall under this platform.
	 */
	notificationClients: NotificationClients;
}
/**
 * A collection of rules and settings for notification clients that fall under this platform.
 */
export interface NotificationClients {
	/**
	 * Should the notification client be passed only to those
	 * listed or should all modules receive it but the list acts
	 * as an override. Default is false.
	 */
	restrictToListed?: boolean;
	/**
	 * What default options should be applied against this platform
	 */
	defaults?: NotificationClientDefaultOptions;
	/**
	 * If restricted to listed is true then an entry needs to exist for each module id
	 * that should be provided with a notification client. Otherwise all modules
	 * will be provided with a notification client using the default rules if provided.
	 * If restrictToListed is false the clients list can still be used to disable
	 * specific modules by specifying their id and enabled: false. It also allows you
	 * to specify overrides for specific modules regardless of the restrictToListed setting.
	 */
	clientOptions?: NotificationClientOptions[];
}
/**
 * A set of default options that will apply against all notification clients unless they
 * have a setting of their own.
 */
export interface NotificationClientDefaultOptions {
	/**
	 * Should this notification client be defaulted into the platform tab. Default is true
	 * unless a custom platform id is specified. If false then the current platform's id
	 * will not be allowed if passed
	 */
	includeInPlatform?: boolean;
	/**
	 * Should the icon if provided be used regardless of the icon sent by the client
	 */
	enforceIcon?: boolean;
}
/**
 * Options that allow you to influence the behavior of the notification client.
 */
export interface NotificationClientOptions extends NotificationClientDefaultOptions {
	/**
	 * The id that acts as the reference to a module id
	 */
	id: string;
	/**
	 * The prefix to assign to all notification ids for this client. It means you can
	 * have an id shared across different module ids as they may come from the same tea.
	 * Id is used by default if no prefix is provided.
	 */
	idPrefix?: string;
	/**
	 * An icon to enforce at the top of all of the notifications from this client
	 */
	icon?: string;
	/**
	 * An icon to enforce for all streams from this from this client
	 */
	streamIcon?: string;
	/**
	 * Should this module have a notification client. Default is true.
	 */
	enabled?: boolean;
}
/**
 * The notification client that provides the openfin notification client apis
 */
export interface NotificationClient {
	/**
	 * The ability to create notifications.
	 */
	create: typeof create;
	/**
	 * The ability to update notifications.
	 */
	update: typeof update;
	/**
	 *
	 */
	addEventListener: (
		eventType: "notification-created",
		listener: (event: NotificationCreatedEvent) => void
	) => Promise<void>;
	/**
	 *
	 */
	removeEventListener: (
		eventType: "notification-created",
		listener: (event: NotificationCreatedEvent) => void
	) => Promise<void>;
	/**
	 * Get all notifications from this notification client.
	 */
	getAll: typeof getAll;
	/**
	 * Clear notifications from this notification client.
	 */
	clear: typeof clear;
	/**
	 * Clear all notifications from this notification client.
	 */
	clearAll: typeof clearAll;
	/**
	 * Show the notification center.
	 */
	show: typeof show;
	/**
	 * Hide the notification center.
	 */
	hide: typeof hide;
}
