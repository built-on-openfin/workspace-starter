/**
 * Options for the ExampleNotificationSourceProvider
 */
export interface ExampleNotificationSourceProviderOptions {
	/** How frequently should we check and empty the queue of notifications. Default is 1 second */
	intervalInSeconds: number;
	/**
	 * If an example websocket url is provided then the notification source will use this to fetch notifications.
	 */
	websocketUrl?: string;
	/**
	 * What should this sample notification service publish an example notification on? Default is true for all options.
	 */
	notifyOn?: NotificationEventSource;
}

/**
 * Events to listen to in order to simulate an incoming notification.
 */
export interface NotificationEventSource {
	/** Page Changed */
	pageChanged?: boolean;
	/** Workspace Changed */
	workspaceChanged?: boolean;
	/** Apps Changed */
	appsChanged?: boolean;
	/** Theme Changed */
	themeChanged?: boolean;
	/** Favorite Changed */
	favoriteChanged?: boolean;
}
