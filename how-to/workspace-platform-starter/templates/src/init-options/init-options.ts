import type { InitOptionsHandler } from "workspace-platform-starter/shapes/init-options-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { ExampleInitOptionsProviderOptions } from "./shapes";

/**
 * Implementation for the example init options provider.
 */
export class ExampleInitOptionsProvider implements InitOptionsHandler<ExampleInitOptionsProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<ExampleInitOptionsProviderOptions> | undefined;

	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: ModuleHelpers | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ExampleInitOptionsProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExampleInitOptionsProvider");
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
	 * Handle the init options action.
	 * @param requestedAction The requested action.
	 * @param payload The payload for the action.
	 * @returns Nothing.
	 */
	public async action(requestedAction: string, payload?: unknown): Promise<void> {
		// TODO: Handle the init options
	}
}
