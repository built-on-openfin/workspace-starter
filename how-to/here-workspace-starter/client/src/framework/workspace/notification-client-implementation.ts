import {
	type NotificationOptions,
	type NotificationCreationOptions,
	type ShowOptions,
	type Notification,
	type UpdatableNotificationOptions,
	create as notificationCreate,
	update as notificationUpdate,
	getAll as notificationGetAll,
	clear as notificationClear,
	show as notificationShow,
	hide as notificationHide,
	addEventListener as notificationAddEventListener,
	removeEventListener as notificationRemoveEventListener
} from "@openfin/workspace/notifications";
import { createLogger } from "workspace-platform-starter/logger-provider";
import { isEmpty, randomUUID } from "workspace-platform-starter/utils";
import type {
	NotificationClient,
	NotificationClientOptions,
	NotificationsEventMap
} from "../shapes/notification-shapes";
/**
 * Notification client for use by modules to be able to create, remove and update notifications against a platform.
 */
export class NotificationClientImplementation implements NotificationClient {
	private readonly _options: NotificationClientOptions;

	private readonly _idPrefix: string;

	private readonly _platformId: string;

	private _currentCount: number;

	private _isCountTracked: boolean;

	private readonly _logger;

	private _listenerRegister: {
		id: string;
		eventType: string;
		listener: (event: NotificationsEventMap[keyof NotificationsEventMap]) => void;
		wrappedListener: (event: NotificationsEventMap[keyof NotificationsEventMap]) => void;
	}[] = [];

	/**
	 * Notification options.
	 * @param options Notification options.
	 * @param platformId The id of the current platform this client will belong to.
	 */
	constructor(options: NotificationClientOptions, platformId: string) {
		this._options = options;
		this._idPrefix = options.idPrefix ?? `${options.id}`;
		this._platformId = platformId;
		this._listenerRegister = [];
		this._currentCount = 0;
		this._isCountTracked = false;
		this._logger = createLogger(`Notification Client:${this._idPrefix}`);
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
		if ((this._options.enforceIcon === true || isEmpty(options.icon)) && !isEmpty(this._options.icon)) {
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
	public async show(options?: ShowOptions): Promise<void> {
		await notificationShow(options);
	}

	/**
	 * The ability to hide the notification center.
	 */
	public async hide(): Promise<void> {
		await notificationHide();
	}

	/**
	 * The ability to add an event listener.
	 * @param eventType The event to listen to.
	 * @param listener The listener that should receive the event.
	 * @returns nothing.
	 */
	public async addEventListener<K extends keyof NotificationsEventMap>(
		eventType: K,
		listener: (event: NotificationsEventMap[K]) => void
	): Promise<void> {
		if (eventType === "notifications-count-changed" && !this._isCountTracked) {
			this._isCountTracked = true;
			await this.trackCount();
		}
		const mappedListener: {
			id: string;
			eventType: string;
			listener: (event: NotificationsEventMap[K]) => void;
			wrappedListener: (event: NotificationsEventMap[K]) => void;
		} = {
			id: randomUUID(),
			eventType,
			listener,
			wrappedListener: (event: NotificationsEventMap[K]) => {
				if ("notification" in event && this.hasId(event.notification.id)) {
					listener(event);
				} else if (event.type === "notifications-count-changed") {
					event.count = this._currentCount;
					listener(event);
				}
			}
		};
		this._listenerRegister.push(
			mappedListener as {
				id: string;
				eventType: string;
				listener: (event: NotificationsEventMap[keyof NotificationsEventMap]) => void;
				wrappedListener: (event: NotificationsEventMap[keyof NotificationsEventMap]) => void;
			}
		);
		notificationAddEventListener(eventType as never, mappedListener.wrappedListener as never);
	}

	/**
	 * Removes an event listener.
	 * @param eventType the type of event to listen to
	 * @param listener the listener.
	 */
	public async removeEventListener<K extends keyof NotificationsEventMap>(
		eventType: K,
		listener: (event: NotificationsEventMap[K]) => void
	): Promise<void> {
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		const mappedListener = this._listenerRegister.find((entry) => entry.listener === listener);
		if (!isEmpty(mappedListener)) {
			await notificationRemoveEventListener(eventType as never, mappedListener.wrappedListener);
			this._listenerRegister = this._listenerRegister.filter((entry) => entry.id !== mappedListener.id);
			if (eventType === "notifications-count-changed") {
				const countListeners = this._listenerRegister.filter((entry) => entry.eventType === eventType);
				if (countListeners.length === 1) {
					this._logger.info(
						"Removing the count tracking as there are no more listeners for notification count."
					);
					await this.removeEventListener(eventType, countListeners[0].listener);
					this._isCountTracked = false;
				}
			}
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

	/**
	 * Sets up the relevant listeners to try and have a correct count for this notification client.
	 */
	private async trackCount(): Promise<void> {
		const notifications = await this.getAll();
		this._currentCount = notifications.length;
		// eslint-disable-next-line @typescript-eslint/unbound-method
		await this.addEventListener("notifications-count-changed", this._updateTrackedCount);
	}

	/**
	 * Update the locally stored count of all outstanding notifications to be shared by all event listeners.
	 */
	private readonly _updateTrackedCount: () => Promise<void> = async () => {
		const latestNotifications = await this.getAll();
		this._currentCount = latestNotifications.length;
	};
}
