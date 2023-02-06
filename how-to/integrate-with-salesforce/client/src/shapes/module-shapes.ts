import type { InteropClient } from "@openfin/core/src/api/interop";
import type { CustomPaletteSet } from "@openfin/workspace-platform";
import type { LoggerCreator } from "./logger-shapes";
import type { ColorSchemeMode } from "./theme-shapes";

/**
 * List of modules.
 */
export interface ModuleList<T extends ModuleDefinition = ModuleDefinition> {
	/**
	 * The list of modules.
	 */
	modules?: T[];
}

/**
 * The definition of a module with generic data for options.
 */
export interface ModuleDefinition<O = unknown> {
	/**
	 * The id of the module.
	 */
	id: string;

	/**
	 * The title of the module.
	 */
	title?: string;

	/**
	 * The description of the module.
	 */
	description?: string;

	/**
	 * Url to more information.
	 */
	info?: string;

	/**
	 * The icon for the module.
	 */
	icon?: string;

	/**
	 * The url to load the module from.
	 */
	url: string;

	/**
	 * Is the module enabled.
	 */
	enabled?: boolean;

	/**
	 * Custom data for the module.
	 */
	data?: O;
}

/**
 * Helper methods and data to pass to the modules during initialization.
 */
export interface ModuleHelpers {
	/**
	 * The root url for the provider.
	 */
	rootUrl?: string;

	/**
	 * Returns an interop client that can be used to broadcast context and raise intents. The
	 * function could be undefined if you are not allowed to use the function or the returned
	 * InteropClient could be undefined if you try to fetch it before the broker is fully initialized.
	 * Please listen for the life cycle event 'after-bootstrap' before trying to call this function.
	 * If you need to handle data before bootstrapping is complete then you can cache it and use it
	 * once the application is bootstrapped and ready.
	 */
	getInteropClient?(): Promise<InteropClient | undefined>;

	/**
	 * Get the current palette.
	 */
	getCurrentPalette(): Promise<CustomPaletteSet>;

	/**
	 * Get the current color scheme.
	 */
	getCurrentColorSchemeMode(): Promise<ColorSchemeMode>;
}

/**
 * The implementation of the module with generic options and helpers.
 */
export interface ModuleImplementation<O = unknown, H = ModuleHelpers> {
	/**
	 * Initialise the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	initialize?(definition: ModuleDefinition<O>, loggerCreator: LoggerCreator, helpers: H): Promise<void>;

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	closedown?(): Promise<void>;
}

/**
 * The possible module types.
 */
export type ModuleTypes =
	| "actions"
	| "auth"
	| "endpoint"
	| "log"
	| "initOptions"
	| "integrations"
	| "conditions"
	| "lifecycle";

/**
 * The definition of a module with typed entry points.
 */
export interface Module<D = unknown, H = ModuleHelpers> {
	/**
	 * The entry points for the module.
	 */
	entryPoints: {
		[type in ModuleTypes]?: ModuleImplementation<D, H>;
	};
}

/**
 * Module entry.
 */
export interface ModuleEntry<
	M extends ModuleImplementation<O, H> = unknown,
	H = ModuleHelpers,
	O = unknown,
	D extends ModuleDefinition<O> = ModuleDefinition<O>
> {
	definition: D;
	implementation: M;
	isInitialised: boolean;
}

/**
 * Collection of module entries by type.
 */
export type ModuleEntryTypes = { [moduleType in ModuleTypes]?: ModuleEntry };
