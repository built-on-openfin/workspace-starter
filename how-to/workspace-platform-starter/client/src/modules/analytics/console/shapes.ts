import type { LogLevel } from "workspace-platform-starter/shapes/logger-shapes";

/**
 * Options for the console analytics module.
 */
export interface ConsoleAnalyticsOptions {
	/**
	 * The log level to use for the analytics.
	 */
	eventLogLevel: LogLevel;
}
