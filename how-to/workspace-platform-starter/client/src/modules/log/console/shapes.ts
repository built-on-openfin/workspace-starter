import type { LogLevel } from "workspace-platform-starter/shapes/logger-shapes";

/**
 * Options for the console log.
 */
export interface ConsoleLogOptions {
	/**
	 * The level to include in the logging.
	 */
	includeLevels?: LogLevel[];
}
