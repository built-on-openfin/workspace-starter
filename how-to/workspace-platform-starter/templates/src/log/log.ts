import type {
	Logger,
	LoggerCreator,
	LogLevel,
	LogProvider
} from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { ExampleLogProviderOptions } from "./shapes";

/**
 * Implementation for the example log provider.
 */
export class ExampleLogProvider implements LogProvider<ExampleLogProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<ExampleLogProviderOptions> | undefined;

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
		definition: ModuleDefinition<ExampleLogProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExampleLogProvider");
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
	 * Log data.
	 * @param identity The identity sending the message.
	 * @param group The group sending the log message.
	 * @param level The level of the message to log.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	public log(
		identity: string,
		group: string,
		level: LogLevel,
		message: unknown,
		...optionalParams: unknown[]
	): void {
		// TODO: Log the information
	}
}
