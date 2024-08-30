// eslint-disable-next-line max-classes-per-file
import type OpenFin from "@openfin/core";
import type { WorkspacePlatformProvider } from "@openfin/workspace-platform";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import type {
	PlatformOverride,
	PlatformOverrideHelpers,
	PlatformOverrideOptions
} from "workspace-platform-starter/shapes/platform-shapes";
import type { ExamplePlatformOverrideOptions } from "./shapes";

/**
 * Implementation for the example platform override.
 */
export class ExamplePlatformOverride implements PlatformOverride<ExamplePlatformOverrideOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<ExamplePlatformOverrideOptions> | undefined;

	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: PlatformOverrideHelpers | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ExamplePlatformOverrideOptions>,
		loggerCreator: LoggerCreator,
		helpers: PlatformOverrideHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExamplePlatformOverride");
		this._helpers = helpers;

		this._logger.info("Initializing");

		// TODO: Add code here to allocate any module resources
		// You can access the configured options e.g. definition.data?.exampleProp
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");

		// TODO: Add code here to free up any module resources
	}

	/**
	 * Get the override constructor for the platform override (useful if you wish this implementation to be layered with other implementations and passed to the platform's initialization object as part of an array).
	 * @param options The options for the platform override defined as part of the platform.
	 * @returns The override constructor to be used in an array.
	 */
	public async getConstructorOverride(
		options: PlatformOverrideOptions
	): Promise<OpenFin.ConstructorOverride<WorkspacePlatformProvider>> {
		return (Base: OpenFin.Constructor<WorkspacePlatformProvider>) => {
			// use settings passed through the module definition in your override or the default options passed with the function call
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const moduleData = this._definition?.data ?? {};
			const logger = this._logger;
			const helpers = this._helpers;
			/**
			 * Extend the Platform Override.
			 */
			return class CustomPlatformOverride extends Base {
				/**
				 * Constructor for the interop override.
				 */
				constructor() {
					super();
					// this is just an example to show a reference to the options, module data and local reference to the passed helpers.
					logger?.info(
						`Options passed: ${JSON.stringify(options)} and module data: ${JSON.stringify(moduleData)} with session id: ${helpers?.sessionId}`
					);
				}
			};
		};
	}
}
