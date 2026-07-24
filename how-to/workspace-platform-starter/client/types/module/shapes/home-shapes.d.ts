import type { OpenFin } from "@openfin/core";
import type { HomeRegistration, SearchProviderInfo } from "@openfin/workspace";
/**
 * HomeProvider Options
 */
export type HomeProviderOptions = Omit<
	SearchProviderInfo,
	"identity" | "dispatchFocusEvents" | "clientAPIVersion"
> & {
	/**
	 * The type of home to target. The "workspace" version is the original home that is provided as part
	 * of the @openfin/workspace package. The "platform" version is the new platform specific home
	 * (HomeVpw) that is registered through @openfin/workspace-platform. The default is "workspace".
	 */
	homeType?: "workspace" | "platform";
	/**
	 * How many characters need to be entered before filtering the available apps
	 */
	queryMinLength?: number;
	/**
	 * What do you wish to run the query against when filtering apps. An array of entries. If not specified it will
	 * default to ["title"]. Since we store the app definition inside of a cli search result's data field you can add
	 * data.tags to the array so that it will see if the query matches the start of a tag e.g. ["title","data.tags"]
	 */
	queryAgainst?: string[];
	/**
	 * Options for the source filters displayed in home.
	 */
	sourceFilter?: {
		/**
		 * Should we disable the source filters, defaults to false.
		 */
		disabled?: boolean;
		/**
		 * The label to display in home, defaults to Source.
		 */
		label?: string;
	};
};
/**
 * Common interface implemented by each home version (workspace and platform), so that the facade in
 * `home.ts` can delegate to whichever implementation is selected by `homeType` without needing to know
 * its internals. See home-shared.ts for the search logic shared by both implementations.
 */
export interface HomeImplementation {
	/**
	 * Register the home component.
	 * @param options The options for the home provider.
	 * @returns The registration.
	 */
	register(options: HomeProviderOptions): Promise<HomeRegistration | undefined>;
	/**
	 * Deregister the home component.
	 * @returns Nothing.
	 */
	deregister(): Promise<void>;
	/**
	 * Show the home component.
	 * @returns Nothing.
	 */
	show(): Promise<void>;
	/**
	 * Hide the home component.
	 * @returns Nothing.
	 */
	hide(): Promise<void>;
	/**
	 * Get the identity of the home window for this implementation.
	 * @returns The identity of the home window.
	 */
	getIdentity(): OpenFin.Identity;
}
