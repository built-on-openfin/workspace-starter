import type { LogLevel } from "here-workspace-starter/shapes/logger-shapes";

/**
 * Options for the console analytics module.
 */
export interface ConsoleAnalyticsOptions {
	/**
	 * The log level to use for the analytics.
	 */
	eventLogLevel: LogLevel;
}
