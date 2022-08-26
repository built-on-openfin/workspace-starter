import type {
	CLIFilter,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import type { BrowserWindowModule, Page } from "@openfin/workspace-platform";
import type { ModuleDefinition, ModuleImplementation, ModuleList } from "./module-shapes";

/**
 * Integration manager provides environment methods and data.
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
	 * Show the home UI.
	 */
	showHome?(): Promise<void>;
}

/**
 * Integration provider settings.
 */
export interface IntegrationProviderOptions extends ModuleList<IntegrationModuleDefinition> {
	/**
	 * Do you wish to expose an option of turning on/off integrations.
	 */
	isManagementEnabled?: boolean;

	/**
	 * What command should we look for in order to return the list of integrations
	 */
	command?: string;

	/**
	 * What description should accompany the command
	 */
	commandDescription?: string;

	/**
	 * An icon representing the top level integration provider
	 */
	icon?: string;
}

/**
 * Integration definition.
 */
export interface IntegrationModuleDefinition extends ModuleDefinition {
	/**
	 * Does the integration start automatically if enabled (default is true).
	 */
	autoStart?: boolean;
}

/**
 * The methods provided by the integration module.
 */
export interface IntegrationModule<O = unknown> extends ModuleImplementation<O, IntegrationHelpers> {
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
