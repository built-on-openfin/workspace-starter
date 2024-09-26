import type OpenFin from "@openfin/core";
/**
 * Options for the example notification service lifecycle provider.
 */
export interface ExampleNotificationServiceProviderOptions {
	/**
	 * Notification source root endpoint id. It will use this root and append -create, -update, -clear, and -stream and use that as an endpoint. The default is notification-source as the root endpoint id.
	 */
	notificationSourceRootEndpointId?: string;
	/**
	 * does this service support notification requests as an intent.
	 * Default is true with CreateNotification as an intent name expecting an openfin.notification context object.
	 */
	intentHandler?: {
		/**
		 * Is the intent service enabled. Default is yes so you specify this if you wish to turn it off.
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
		 * Is the channel service enabled. Default is yes so you specify this if you wish to turn it off.
		 */
		enabled: boolean;
		/**
		 * Do you want to specify a custom channel name that gets appended to platform-uuid/ default is
		 * notification-service which will expose a create function. So the channel name is
		 * platform-uuid/notification-service.
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
 * Used for passing data from a Notification to a service
 */
export interface NotificationCustomData {
	/**
	 * The id of the app (if launching an app), intent, userChannel, appChannel or endpointId you wish to target
	 */
	id: string;
	/** The Context you wish to pass */
	context?: OpenFin.Context & { form?: { [key: string]: unknown } };
	/**
	 * The app related information you wish to launch or target. Used when raising an intent.
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
	/**
	 * If a request is specified then it will be sent as the request to the endpoint. Otherwise the context will be sent.
	 */
	endpointOptions?: { request?: unknown };
}
