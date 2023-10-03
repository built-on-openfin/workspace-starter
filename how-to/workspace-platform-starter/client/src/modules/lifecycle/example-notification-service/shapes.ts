/**
 * Options for the example notification service lifecycle provider.
 */
export interface ExampleNotificationServiceProviderOptions {
	/**
	 * This is just an example to show that information can be specified via settings that gets passed to the module.
	 */
	exampleServerUrl?: string;

	/**
	 * What should this sample notification service publish an example notification on? Default is true for all options.
	 */
	notifyOn?: {
		pageChanged?: boolean;
		workspaceChanged?: boolean;
		appsChanged?: boolean;
		themeChanged?: boolean;
		favoriteChanged?: boolean;
	};
}
