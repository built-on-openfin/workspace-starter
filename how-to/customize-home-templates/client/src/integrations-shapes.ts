import type {
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	CLIFilter,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import type { BrowserWindowModule, Page } from "@openfin/workspace-platform";

/**
 * Integration helpers provides environment methods and data.
 */
export interface IntegrationHelpers {
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
	 * Set the home search query.
	 * @param query The query to set.
	 */
	setSearchQuery?(query: string): Promise<void>;
}

/**
 * Integration provider settings.
 */
export interface IntegrationProviderOptions {
	/**
	 * The list of integrations.
	 */
	modules?: ModuleDefinition[];
}

/**
 * Integration details.
 */
export interface ModuleDefinition<O = unknown> {
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
	url?: string;

	/**
	 * The data specific to the integration.
	 */
	data?: O;
}

/**
 * The methods provided by the integration module.
 */
export interface IntegrationModule<O = unknown> {
	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	initialize?(
		definition: ModuleDefinition<O>,
		loggerCreator: () => void,
		helpers: IntegrationHelpers
	): Promise<void>;

	/**
	 * The module is being closed down.
	 * @returns Nothing.
	 */
	closedown?(): Promise<void>;

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @returns The list of results and new filters.
	 */
	getSearchResults?(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse
	): Promise<HomeSearchResponse>;

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	getHelpSearchEntries?(): Promise<HomeSearchResult[]>;

	/**
	 * An entry has been selected.
	 * @param result The dispatched result.
	 * @param lastResponse The last response.
	 * @returns True if the item was handled.
	 */
	itemSelection?(
		result: HomeDispatchedSearchResult,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean>;
}
