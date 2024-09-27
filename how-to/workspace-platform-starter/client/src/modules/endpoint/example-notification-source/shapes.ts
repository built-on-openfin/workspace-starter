/**
 * Options for the ExampleNotificationSourceProvider
 */
export interface ExampleNotificationSourceProviderOptions {
	/** How frequently should we check and empty the queue of notifications. Default is 1 second */
	intervalInSeconds: number;
	/**
	 * If an example websocket url is provided then the notification source will use this to fetch notifications.
	 */
	websocket?: WebSocketSettings;
	/**
	 * If an example longpoll url is provided (and CORs is enabled) then the notification source will use this to fetch notifications. It is recommended to use either longpoll url or websockets but not both (if you are using our example node-starter sample).
	 */
	longpoll?: LongPollSettings;
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

/**
 * Provides settings related to longpolling
 */
interface LongPollSettings {
	/** The longpoll url */
	url: string;
	/** The longpoll interval */
	intervalInSeconds: number;
}

/**
 * Provides settings related to websockets
 */
interface WebSocketSettings {
	/** The websocket url */
	url: string;
}
