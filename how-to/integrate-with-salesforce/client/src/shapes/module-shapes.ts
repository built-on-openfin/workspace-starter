import type { CustomPaletteSet, CustomThemeOptions } from "@openfin/workspace/common/src/api/theming";
import type { LoggerCreator } from "./logger-shapes";

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
	 * Get the default themes.
	 */
	getDefaultPalettes(): Promise<{ [id: string]: CustomPaletteSet }>;

	/**
	 * Get the current theme.
	 */
	getCurrentTheme(): Promise<CustomThemeOptions>;
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
