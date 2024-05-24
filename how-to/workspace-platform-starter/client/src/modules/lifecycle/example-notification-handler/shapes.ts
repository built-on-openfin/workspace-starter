import type OpenFin from "@openfin/core";
/**
 * Options for the example notification handler lifecycle provider.
 */
export interface ExampleNotificationHandlerProviderOptions {
	/**
	 * Notification source endpoint id. If specified, the handler will only respond to notifications from this endpoint and push notifications to this endpoint.
	 * Default is notification-source.
	 */
	notificationSourceEndpointId?: string;
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
		 * Do you want a custom name for the intent. Default is CreateNotification.
		 */
		name?: string;
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
	broadcast?: { isUserChannel: boolean };
}
