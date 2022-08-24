/**
 * The default log levels.
 */
export type LogLevel = "info" | "error" | "warn" | "trace" | "debug";

export interface LogOptions {
	levels?: LogLevel[];
}

export interface LogProvider<T = unknown> {
	/**
	 * Optionally initialize the log provider.
	 * @param options The custom options for the log provider.
	 */
	initialize?(options: T): Promise<void>;

	/**
	 * Optionally close down the log provider.
	 */
	closedown?(): Promise<void>;

	/**
	 * Log data as information.
	 * @param identity The identity sending the message.
	 * @param group The group sending the log message.
	 * @param level The level of the message to log.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	log(identity: string, group: string, level: LogLevel, message: unknown, ...optionalParams: unknown[]): void;
}

export interface LogProviderModule {
	logProvider: LogProvider;
}

export interface LogProviderModuleDefinition {
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
	 * The modules to load the log providers from.
	 */
	modules?: LogProviderModuleDefinition[];
}

export interface Logger {
	/**
	 * Log data as information.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	info(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as error.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	error(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as warning.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	warn(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as trace.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	trace(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as debug.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	debug(message: unknown, ...optionalParams: unknown[]): void;
}

export type LoggerCreator = (group: string) => Logger;
