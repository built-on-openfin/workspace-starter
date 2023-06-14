import type { LoggerCreator, LogLevel, LogProvider } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { ExampleLogProviderOptions } from "./shapes";

/**
 * Implementation for the example log provider.
 */
export class ExampleLogProvider implements LogProvider<ExampleLogProviderOptions> {
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
		// Add code here to initialize the provider
		// You can access the configured options e.g. definition.data?.exampleProp
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
		// Log the information
	}
}
