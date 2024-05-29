import type OpenFin from "@openfin/core";
import type { NotificationOptions, UpdatableNotificationOptions } from "@openfin/workspace/notifications";
/**
 * Options for the example notification handler lifecycle provider.
 */
export interface ExampleNotificationHandlerProviderOptions {
	/**
	 * Notification source root endpoint id. It will use this root and append -create, -update, -clear, and -stream and use that as an endpoint. The default is notification-source as the root endpoint id.
	 */
	notificationSourceRootEndpointId?: string;
	/**
	 * does this handler support notification requests as an intent.
	 * Default is true with CreateNotification as an intent name expecting an openfin.notification context object.
	 */
	intentHandler?: {
		/**
		 * Is the intent handler enabled. Default is yes so you specify this if you wish to turn it off.
		 */
		enabled: boolean;
		/**
		 * Do you want a custom name for the intent. Default is CreateNotification, UpdateNotification and ClearNotification.
		 */
		name?: {
			create: string;
			update: string;
			clear: string;
		};
	};

	/**
	 * Do you want to listen for notification requests via a channel.
	 */
	channelHandler?: {
		/**
		 * Is the channel handler enabled. Default is yes so you specify this if you wish to turn it off.
		 */
		enabled: boolean;
		/**
		 * Do you want to specify a custom channel name that gets appended to platform-uuid/ default is
		 * notification-handler which will expose a create function. So the channel name is
		 * platform-uuid/notification-handler.
		 */
		name?: string;
	};

	/**
	 * Options to support the raising of intents in response to notifications.
	 */
	intentLauncher?: {
		/**
		 * If an instanceId is provided and it is not found, should a new instance be created or should it fallback to an existing instance. The default is to use an existing instance.
		 */
		instanceIdFallback: "existing" | "new";
	};
}

/**
 * A notification event that is raised by the notification source.
 */
export interface NotificationSourceEvent {
	/**
	 * The different types of events
	 */
	eventId: "create" | "update" | "clear" | "close";
}
/**
 * A notification event for creating a notification.
 */
export interface NotificationSourceCreateEvent extends NotificationSourceEvent {
	/**
	 * The type of event
	 */
	eventId: "create";
	/**
	 * The notification options to create.
	 */
	notification: NotificationOptions;
}
/**
 * A notification event for updating a notification.
 */
export interface NotificationSourceUpdateEvent extends NotificationSourceEvent {
	/**
	 * The type of event
	 */
	eventId: "update";
	/**
	 * The notification options to update.
	 */
	notification: UpdatableNotificationOptions;
}

/**
 * A notification event for clearing a notification.
 */
export interface NotificationSourceClearEvent extends NotificationSourceEvent {
	/**
	 * The type of event
	 */
	eventId: "clear";
	/**
	 * The notification to clear.
	 */
	notificationId: string;
}

/**
 * A notification event for when a notification is closed (removed from the Notification Center).
 */
export interface NotificationSourceCloseEvent extends NotificationSourceEvent {
	/**
	 * The type of event
	 */
	eventId: "close";
	/**
	 * The notification to clear.
	 */
	notificationId: string;
}

/**
 * Used for passing data from a Notification to a handler
 */
export interface NotificationCustomData {
	/**
	 * The name of the intent, userChannel or appChannel you wish to target
	 */
	name: string;
	/** The Context you wish to pass */
	context: OpenFin.Context & { form?: { [key: string]: unknown } };
	/**
	 * The app related information you wish to launch or target
	 */
	target?: { appId: string; instanceId?: string };
	/**
	 * Information related about a broadcast you wish to do.
	 */
	broadcastOptions?: {
		/**
		 * Is the target specified for broadcast a user channel (colors) or an app channel. Default is user channel.
		 */
		isUserChannel: boolean;
	};
}
