import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes";
import type { AnalyticsModule, PlatformAnalyticsEvent } from "workspace-platform-starter/shapes/analytics-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { ConsoleAnalyticsOptions } from "./shapes";

/**
 * Implement the analytics module using the console.
 */
export class ConsoleAnalyticsModule implements AnalyticsModule<ConsoleAnalyticsOptions> {
	private _logger: Logger;

	private _logEvent: (message: string, events: PlatformAnalyticsEvent[]) => void;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ConsoleAnalyticsOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("ConsoleAnalyticsModule");
		this._logger.info("Initialized");
		this._logger.info("Session Id: ", helpers.sessionId);
		const logLevel =
			definition?.data?.eventLogLevel === "trace" ? "debug" : definition?.data?.eventLogLevel ?? "info";
		this._logEvent = (message, events) => {
			// we don't want to trace the function so we log it as debug/verbose
			this._logger[logLevel](message, JSON.stringify(events));
		};
	}

	/**
	 * Handle Analytics. This example module simple console logs the events. You could batch the events and pass settings (number to batch etc, destination to send events) via the module definition.
	 * @param events one of more analytic events.
	 */
	public async handleAnalytics(events: PlatformAnalyticsEvent[]): Promise<void> {
		this._logEvent("Received the following analytics events", events);
	}

	/**
	 * Closedown the module. If this module had any cached events it needed to process it could try and flush them here.
	 */
	public async closedown?(): Promise<void> {
		this._logger.info("closing down");
	}
}
