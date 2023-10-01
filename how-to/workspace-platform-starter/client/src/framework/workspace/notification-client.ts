import {
	type NotificationOptions,
	type NotificationCreationOptions,
	type ShowOptions,
	type Notification,
	type UpdatableNotificationOptions,
	type NotificationCreatedEvent,
	create as notificationCreate,
	update as notificationUpdate,
	getAll as notificationGetAll,
	clear as notificationClear,
	show as notificationShow,
	hide as notificationHide,
	addEventListener as notificationAddEventListener,
	removeEventListener as notificationRemoveEventListener
} from "@openfin/workspace/notifications";
import { isEmpty, randomUUID } from "workspace-platform-starter/utils";
import type {
	NotificationClient as NotificationClientInterface,
	NotificationClientOptions
} from "../shapes/notification-shapes";
/**
 *
 */
export class NotificationClient implements NotificationClientInterface {
	private readonly _options: NotificationClientOptions;

	private readonly _idPrefix: string;

	private readonly _platformId: string;

	private _listenerRegister: { id: string; listener: never; wrappedListener: never }[] = [];

	/**
	 * Notification options.
	 * @param options Notification options.
	 * @param platformId The id of the current platform this client will belong to.
	 */
	constructor(options: NotificationClientOptions, platformId: string) {
		this._options = options;
		this._idPrefix = options.idPrefix ?? `${options.id}-`;
		this._platformId = platformId;
	}

	/**
	 * Create a notification.
	 * @param options the notification to create.
	 * @param creationOptions creationOptions for the notification.
	 * @returns created notification.
	 */
	public async create<T extends NotificationOptions>(
		options: T,
		creationOptions?: NotificationCreationOptions
	): Promise<Notification<T>> {
		if (!this.hasId(options.id)) {
			options.id = this.createId(options.id);
		}
		if (this._options.enforceIcon && !isEmpty(this._options.icon)) {
			options.icon = this._options.icon;
		}

		if (this._options.includeInPlatform) {
			options.platform = this._platformId;
		} else if (options.platform === this._platformId) {
			options.platform = undefined;
		}

		return notificationCreate(options, creationOptions);
	}

	/**
	 * Allows the updating of an existing notification.
	 * @param options the notification to update.
	 * @returns the updated notification.
	 */
	public async update<T extends UpdatableNotificationOptions>(options: T): Promise<Notification> {
		if (!this.hasId(options.id)) {
			options.id = this.createId(options.id);
		}

		return notificationUpdate(options);
	}

	/**
	 * Get all notifications.
	 * @returns all the notifications.
	 */
	public async getAll(): Promise<Notification[]> {
		const notifications = await notificationGetAll();
		return notifications.filter((entry) => entry.id.startsWith(this._idPrefix));
	}

	/**
	 * Clears a specific notification.
	 * @param id the id of the notification to clear.
	 * @returns whether the notification was cleared.
	 */
	public async clear(id: string): Promise<boolean> {
		const notificationToClear = this.createId(id);
		return notificationClear(notificationToClear);
	}

	/**
	 * Clear all notifications.
	 * @returns the number of notifications that was cleared.
	 */
	public async clearAll(): Promise<number> {
		const notifications = await this.getAll();
		let count = 0;
		for (const notification of notifications) {
			const removed = await this.clear(notification.id);
			if (removed) {
				count++;
			}
		}
		return count;
	}

	/**
	 * Shows the notification center.
	 * @param options the options to show.
	 */
	public async show(options?: ShowOptions | undefined): Promise<void> {
		await notificationShow(options);
	}

	/**
	 * The ability to hide the notification center.
	 */
	public async hide(): Promise<void> {
		await notificationHide();
	}

	// public async addEventListener(eventType: "notification-form-submitted", listener: (event: NotificationFormSubmittedEvent) => void): Promise<void>;
	// public async addEventListener(eventType: "notification-action", listener: (event: NotificationActionEvent) => void): Promise<void>;
	// public async addEventListener(eventType: "notification-created", listener: (event: NotificationCreatedEvent) => void): Promise<void>;
	// public async addEventListener(eventType: "notification-toast-dismissed", listener: (event: NotificationToastDismissedEvent) => void): Promise<void>;
	// public async addEventListener(eventType: "notification-closed", listener: (event: NotificationClosedEvent) => void): Promise<void>;
	// public async addEventListener(eventType: "notification-reminder-created", listener: (event: NotificationReminderCreatedEvent) => void): Promise<void>;
	// public async addEventListener(eventType: "notification-reminder-removed", listener: (event: NotificationReminderRemovedEvent) => void): Promise<void>;
	// public async addEventListener(eventType: "notification-count-changed", listener: (event: NotificationsCountChanged) => void): Promise<void>;
	/**
	 * Tells you when a notification was created.
	 * @param eventType the type of event to listen to
	 * @param listener the listener.
	 */
	public async addEventListener(
		eventType: "notification-created",
		listener: (event: NotificationCreatedEvent) => void
	): Promise<void> {
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		const mappedListener = {
			id: randomUUID(),
			listener,
			// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
			wrappedListener: (event: NotificationCreatedEvent) => {
				if (this.hasId(event.notification.id)) {
					listener(event);
				}
			}
		};
		await notificationAddEventListener(eventType, mappedListener.wrappedListener);
	}

	/**
	 * Removes an event listener.
	 * @param eventType the type of event to listen to
	 * @param listener the listener.
	 */
	public async removeEventListener(
		eventType: "notification-created",
		listener: (event: NotificationCreatedEvent) => void
	): Promise<void> {
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		const mappedListener = this._listenerRegister.find((entry) => entry.listener === listener);
		if (!isEmpty(mappedListener)) {
			await notificationRemoveEventListener(eventType, mappedListener.wrappedListener);
			this._listenerRegister = this._listenerRegister.filter((entry) => entry.id !== mappedListener.id);
		}
	}

	/**
	 * Does the current id of a notification match the specified definition already?
	 * @param id the id for a notification.
	 * @returns whether it includes the prefix for a notification id.
	 */
	private hasId(id: string | undefined): boolean {
		return !isEmpty(id) && id.startsWith(`${this._options.id}-`);
	}

	/**
	 * Does the current id of a notification match the specified definition already?
	 * @param id the id for a notification.
	 * @returns an id including the prefix if it doesn't exist.
	 */
	private createId(id: string | undefined): string {
		if (isEmpty(id) || !this.hasId(id)) {
			return `${this._idPrefix}-${id ?? randomUUID()}`;
		}
		return id;
	}

	//     export declare function removeEventListener(eventType: 'notification-form-submitted', listener: (event: NotificationFormSubmittedEvent) => void): Promise<void>;
	// export declare function removeEventListener(eventType: 'notification-action', listener: (event: NotificationActionEvent) => void): Promise<void>;
	// export declare function removeEventListener(eventType: 'notification-created', listener: (event: NotificationCreatedEvent) => void): Promise<void>;
	// export declare function removeEventListener(eventType: 'notification-toast-dismissed', listener: (event: NotificationToastDismissedEvent) => void): Promise<void>;
	// export declare function removeEventListener(eventType: 'notification-closed', listener: (event: NotificationClosedEvent) => void): Promise<void>;
	// export declare function removeEventListener(eventType: 'notifications-count-changed', listener: (event: NotificationsCountChanged) => void): Promise<void>;
	// export declare function removeEventListener(eventType: 'notification-reminder-created', listener: (event: NotificationReminderCreatedEvent) => void): Promise<void>;
	// export declare function removeEventListener(eventType: 'notification-reminder-removed', listener: (event: NotificationReminderRemovedEvent) => void): Promise<void>;
}
