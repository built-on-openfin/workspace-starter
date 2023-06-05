import type OpenFin from "@openfin/core";
import type { InteropClient } from "@openfin/core/src/api/interop";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes";
import type { AnalyticsModule, PlatformAnalyticsEvent } from "workspace-platform-starter/shapes/analytics-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { DevAnalyticsOptions } from "./shapes";

/**
 * Implement the analytics module using the interop channels as the means of publishing the events.
 */
export class DevAnalyticsModule implements AnalyticsModule<DevAnalyticsOptions> {
	private _logger: Logger;

	private _interopClient: InteropClient;

	private _channel: OpenFin.SessionContextGroup;

	private _contextType: string;

	private _cachedAnalyticEvents: PlatformAnalyticsEvent[] = [];

	private _helpers: ModuleHelpers;

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
		this._helpers = helpers;
		this._contextType = definition.data?.contextType ?? "fin.dev.platform.analytics";
		const channelName: string = definition.data?.sessionContextGroupName ?? "dev/platform/analytics";
		this._logger.info(
			`Using channel name: ${channelName} and contextType: ${this._contextType}. These can be customized by passing data settings: sessionContextGroupName and contextType in the module settings.`
		);
		if (helpers.getInteropClient !== undefined && helpers.subscribeLifecycleEvent !== undefined) {
			this._logger.info("Subscribing to the after bootstrap event.");
			const lifeCycleAfterBootstrapSubscriptionId = this._helpers.subscribeLifecycleEvent(
				"after-bootstrap",
				async (_platform) => {
					this._logger.info("After bootstrap lifecycle event received. Getting interop client.");
					this._interopClient = await helpers.getInteropClient();
					this._channel = await this._interopClient.joinSessionContextGroup(channelName);
					if (this._helpers.unsubscribeLifecycleEvent !== undefined) {
						this._helpers.unsubscribeLifecycleEvent(lifeCycleAfterBootstrapSubscriptionId, "after-bootstrap");
					}
				}
			);
		} else {
			this._logger.warn(
				"This analytics module requires a session context group name, a context type, the ability to create an interop client and the ability to listen for lifecycle events. Unfortunately this criteria has not been met."
			);
		}
	}

	/**
	 * Handle Analytics. This example module simple console logs the events. You could batch the events and pass settings (number to batch etc, destination to send events) via the module definition.
	 * @param events one of more analytic events.
	 */
	public async handleAnalytics(events: PlatformAnalyticsEvent[]): Promise<void> {
		if (!Array.isArray(events)) {
			this._logger.warn("We were not passed an array of analytical events.");
			return;
		}
		if (this._channel !== undefined) {
			let platformAnalyticEvents: PlatformAnalyticsEvent[] = [];
			if (this._cachedAnalyticEvents.length > 0) {
				this._logger.info(`Adding ${this._cachedAnalyticEvents.length} analytic events.`);
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				platformAnalyticEvents.push(...this._cachedAnalyticEvents);
				this._cachedAnalyticEvents = [];
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			platformAnalyticEvents.push(...events);
			const eventCount = platformAnalyticEvents.length;
			platformAnalyticEvents = platformAnalyticEvents.filter(
				(entry) => !(entry.type.toLowerCase() === "interop" && entry.source.toLowerCase() !== "browser")
			);
			const filteredCount = platformAnalyticEvents.length;

			if (eventCount !== filteredCount) {
				this._logger.info(
					`Filtered out ${
						eventCount - filteredCount
					} events as they were of type interop and not from the browser and we send events out over interop`
				);
			}

			const context = {
				type: this._contextType,
				name: "Analytic Events",
				events: platformAnalyticEvents
			};
			await this._channel.setContext(context);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			this._cachedAnalyticEvents.push(...events);
		}
	}

	/**
	 * Close down the module. If this module had any cached events it needed to process it could try and flush them here.
	 */
	public async closedown?(): Promise<void> {
		this._logger.info("closing down");
	}
}
