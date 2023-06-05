export interface DevAnalyticsOptions {
	/**
	 * This setting lets you override the default channelName/sessionContextGroupName
	 * that analytics event context objects are posted to
	 */
	sessionContextGroupName: string;
	/**
	 * This setting lets you override the default contextType name that is used in the analytics event context object.
	 */
	contextType: string;
}
