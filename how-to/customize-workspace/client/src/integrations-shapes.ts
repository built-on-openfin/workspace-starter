import type {
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	CLIFilter,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import type { BrowserWindowModule, Page } from "@openfin/workspace-platform";

/**
 * Integration manager provides environment methods and data.
 */
export interface IntegrationManager {
	/**
	 * The root url for the provider.
	 */
	rootUrl?: string;

	/**
	 * Launch a view in the workspace.
	 * @param view The view to launch.
	 * @param targetIdentity The optional target identity of the launch with.
	 * @returns The launched view.
	 */
	launchView?(
		view: OpenFin.PlatformViewCreationOptions | string,
		targetIdentity?: OpenFin.Identity
	): Promise<OpenFin.View>;

	/**
	 * Launch a page in the workspace.
	 * @param page The page to launch.
	 * @param bounds The optional bounds for the page.
	 * @returns The window created.
	 */
	launchPage?(page: Page, bounds?: OpenFin.Bounds): Promise<BrowserWindowModule>;

	/**
	 * Launch a snapshot.
	 * @param snapshotUrl The snapshot url
	 */
	launchSnapshot?(snapshotUrl: string): Promise<OpenFin.Identity[]>;

	/**
	 * Open a url with the browser.
	 * @param url The url to open.
	 */
	openUrl?(url: string): Promise<void>;

	/**
	 * Show the home UI.
	 */
	showHome?(): Promise<void>;
}

/**
 * Integration provider settings.
 */
export interface IntegrationProviderOptions {
	/**
	 * The list of integrations.
	 */
	integrations?: Integration<unknown>[];
}

/**
 * Integration details.
 */
export interface Integration<T> {
	/**
	 * The id of the integration.
	 */
	id: string;

	/**
	 * The title of the integration.
	 */
	title: string;

	/**
	 * The icon of the integration.
	 */
	icon: string;

	/**
	 * Is the integration enabled.
	 */
	enabled: boolean;

	/**
	 * Module url to use if loading the module remotely.
	 */
	moduleUrl?: string;

	/**
	 * The data specific to the integration.
	 */
	data?: T;
}

/**
 * The methods provided by the integration module.
 */
export interface IntegrationModule<T> {
	/**
	 * The module is being registered.
	 * @param integrationManager The manager for the integration.
	 * @param integration The integration details.
	 * @returns Nothing.
	 */
	register?(integrationManager: IntegrationManager, integration: Integration<T>): Promise<void>;

	/**
	 * The module is being deregistered.
	 * @param integration The integration details.
	 * @returns Nothing.
	 */
	deregister?(integration: Integration<T>): Promise<void>;

	/**
	 * Get a list of search results based on the query and filters.
	 * @param integration The integration details.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @returns The list of results and new filters.
	 */
	getSearchResults?(
		integration: Integration<T>,
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse
	): Promise<HomeSearchResponse>;

	/**
	 * Get a list of the static help entries.
	 * @param integration The integration details.
	 * @returns The list of help entries.
	 */
	getHelpSearchEntries?(integration: Integration<T>): Promise<HomeSearchResult[]>;

	/**
	 * An entry has been selected.
	 * @param integration The integration details.
	 * @param result The dispatched result.
	 * @param lastResponse The last response.
	 * @returns True if the item was handled.
	 */
	itemSelection?(
		integration: Integration<T>,
		result: HomeDispatchedSearchResult,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean>;
}
