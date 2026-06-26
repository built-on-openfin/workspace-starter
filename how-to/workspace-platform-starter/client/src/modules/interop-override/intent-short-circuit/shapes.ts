/**
 * A mapping from an intent name to the app that should handle it directly.
 */
export interface IntentAppMapping {
	/**
	 * The intent name to intercept (e.g. "CreateNotification").
	 */
	intentName: string;

	/**
	 * The appId to launch directly for this intent, bypassing the normal resolution flow.
	 */
	appId: string;
}

/**
 * Options for the intent short circuit interop override.
 */
export interface IntentShortCircuitOptions {
	/**
	 * A list of intent-to-app mappings that should bypass the standard intent resolution.
	 */
	intentMappings: IntentAppMapping[];
}
