import type {
	CLIFilter,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import type { BrowserCreateWindowRequest, BrowserWindowModule, Page } from "@openfin/workspace-platform";

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
	 * @param targetIdentity The optional target identity to launch with.
	 * @param targetView The optional target view to launch with.
	 * @returns The launched view.
	 */
	launchView?(
		view: OpenFin.PlatformViewCreationOptions | string,
		targetIdentity?: OpenFin.Identity,
		targetView?: OpenFin.Identity
	): Promise<OpenFin.View>;

	/**
	 * Is there a view in the specified window and page.
	 * @param windowIdentity The window to look in.
	 * @param pageId The page in the window to look.
	 * @param viewIdentity The identity of the view to find.
	 */
	findAndActivateView?(
		windowIdentity: OpenFin.Identity,
		pageId: string,
		viewIdentity: OpenFin.Identity
	): Promise<
		| {
				window?: BrowserWindowModule;
				page?: Page;
				view?: OpenFin.View;
		  }
		| undefined
	>;

	/**
	 * Launch a page in the workspace.
	 * @param page The page to launch.
	 * @param targetWindowIdentity The target window to add the page to.
	 * @returns The window created.
	 */
	launchPage?(page: Page, targetWindowIdentity?: OpenFin.Identity): Promise<BrowserWindowModule>;

	/**
	 * Launch a browser window in the workspace.
	 * @param options The window options.
	 * @param reuse Reuse a window with the same identity if it already exists.
	 * @returns The window created.
	 */
	launchWindow?(
		options: BrowserCreateWindowRequest,
		reuse?: boolean
	): Promise<BrowserWindowModule | undefined>;

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
