import type { Logger, LoggerCreator } from "customize-workspace/shapes";
import type { AnalyticsModule, PlatformAnalyticsEvent } from "customize-workspace/shapes/analytics-shapes";
import type { ModuleDefinition, ModuleHelpers } from "customize-workspace/shapes/module-shapes";
import type { ExampleConsoleAnalyticsOptions } from "./shapes";

/**
 * Implement the log provider using the console.
 */
export class ExampleConsoleAnalyticsModule implements AnalyticsModule<ExampleConsoleAnalyticsOptions> {
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
		definition: ModuleDefinition<ExampleConsoleAnalyticsOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("ExampleConsoleAnalyticsModule");
		this._logger.info("ExampleConsoleAnalyticsModule initialized");
		this._logger.info("Session Id: ", helpers.sessionId);
		const logLevel = definition?.data?.eventLogLevel ?? "info";
		switch (logLevel) {
			case "trace": {
				this._logEvent = (message, events) => {
					// we don't want to trace the function so we log it as debug/verbose
					this._logger.debug(message, JSON.stringify(events));
				};
				break;
			}
			case "debug": {
				this._logEvent = (message, events) => {
					this._logger.debug(message, JSON.stringify(events));
				};
				break;
			}
			case "info": {
				this._logEvent = (message, events) => {
					this._logger.info(message, JSON.stringify(events));
				};
				break;
			}
			case "warn": {
				this._logEvent = (message, events) => {
					this._logger.warn(message, JSON.stringify(events));
				};
				break;
			}
			case "error": {
				this._logEvent = (message, events) => {
					this._logger.error(message, JSON.stringify(events));
				};
				break;
			}
		}
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
		this._logger.info("ConsoleAnalyticsModule closing down");
	}
}
