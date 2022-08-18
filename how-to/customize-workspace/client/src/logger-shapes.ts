export interface Logger<T = unknown> {
	/**
	 * Optionally initialize the logger.
	 * @param options The custom options for the logger.
	 */
	initialize?(options: T): Promise<void>;

	/**
	 * Optionally close down the logger.
	 */
	closedown?(): Promise<void>;

	/**
	 * Log data as information.
	 * @param group The group sending the log message.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	info(group: string, message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as error.
	 * @param group The group sending the log message.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	error(group: string, message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as warning.
	 * @param group The group sending the log message.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	warn(group: string, message: unknown, ...optionalParams: unknown[]): void;
}

export interface LoggerModule {
	logger: Logger;
}

export interface LoggerModuleDefinition {
	/**
	 * The id of the module.
	 */
	id: string;

	/**
	 * The url to load the module from.
	 */
	url: string;

	/**
	 * Is the integration enabled.
	 */
	enabled: boolean;

	/**
	 * Custom data for the module.
	 */
	data?: unknown;
}

export interface LoggerProviderOptions {
	/**
	 * The modules to load the loggers from.
	 */
	modules?: LoggerModuleDefinition[];
}
