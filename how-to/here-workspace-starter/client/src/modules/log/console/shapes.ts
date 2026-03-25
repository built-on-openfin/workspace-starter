import type { LogLevel } from "here-workspace-starter/shapes/logger-shapes";

/**
 * Options for the console log.
 */
export interface ConsoleLogOptions {
	/**
	 * The level to include in the logging.
	 */
	includeLevels?: LogLevel[];
}
