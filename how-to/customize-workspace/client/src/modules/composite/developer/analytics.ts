import type { InteropClient } from "@openfin/core/src/api/interop";
import type { Logger, LoggerCreator } from "customize-workspace/shapes";
import type { AnalyticsModule, PlatformAnalyticsEvent } from "customize-workspace/shapes/analytics-shapes";
import type { ModuleDefinition, ModuleHelpers } from "customize-workspace/shapes/module-shapes";
import type { DevAnalyticsOptions } from "./shapes";

/**
 * Implement the analytics module using the console.
 */
export class DevAnalyticsModule implements AnalyticsModule<DevAnalyticsOptions> {
	private _logger: Logger;

	private _interopClient: InteropClient;

	private _channel: OpenFin.SessionContextGroup;

	private _contextType: string;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<DevAnalyticsOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("DeveloperAnalyticsModule");
		this._logger.info("Initialized");
		this._logger.info("Session Id: ", helpers.sessionId);
		this._contextType = definition.data?.contextType ?? "fin.dev.platform.analytics";
		const channelName: string = definition.data?.sessionContextGroupName ?? "dev/platform/analytics";
		this._logger.info(
			`Using channel name: ${channelName} and contextType: ${this._contextType}. These can be customized by passing data settings: sessionContextGroupName and contextType in the module settings.`
		);
		if (helpers.getInteropClient !== undefined) {
			this._interopClient = await helpers.getInteropClient();
			this._channel = await this._interopClient.joinSessionContextGroup(channelName);
		} else {
			this._logger.warn(
				"This analytics module requires a session context group name, a context type and the ability to create an interop client. Unfortunately this criteria has not been met."
			);
		}
	}

	/**
	 * Handle Analytics. This example module simple console logs the events. You could batch the events and pass settings (number to batch etc, destination to send events) via the module definition.
	 * @param events one of more analytic events.
	 */
	public async handleAnalytics(events: PlatformAnalyticsEvent[]): Promise<void> {
		if (this._channel !== undefined) {
			const context = {
				type: this._contextType,
				name: "Analytic Events",
				events
			};
			await this._channel.setContext(context);
		}
	}

	/**
	 * Closedown the module. If this module had any cached events it needed to process it could try and flush them here.
	 */
	public async closedown?(): Promise<void> {
		this._logger.info("closing down");
	}
}
