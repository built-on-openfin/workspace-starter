import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";
/**
 * The default log levels.
 */
export type LogLevel = "info" | "error" | "warn" | "trace" | "debug";
export interface LogOptions {
	levels?: LogLevel[];
}
export interface LogProvider<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
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
/** Logger Provider Options - A list of modules that will act as loggers that can receive logging information sent by the platform */
export type LoggerProviderOptions = ModuleList;
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
