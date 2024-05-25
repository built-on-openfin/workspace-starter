/**
 * Options for the ExampleNotificationSourceProvider
 */
export interface ExampleNotificationSourceProviderOptions {
	/** How frequently should we check and empty the queue of notifications. Default is 1 second */
	intervalInSeconds: number;
}
