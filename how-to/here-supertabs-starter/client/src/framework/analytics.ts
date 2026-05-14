import { createLogger } from "./logger-provider";
import { closedownModules, initializeModules, loadModules } from "./modules";
import {
	MODULE_ANALYTICS_SOURCE,
	type AnalyticsClient,
	type AnalyticsModule,
	type AnalyticsProviderOptions,
	type ModuleAnalyticsEvent,
	type PlatformAnalyticsEvent
} from "./shapes/analytics-shapes";
import type { ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";

let modules: ModuleEntry<AnalyticsModule>[] = [];
let isAnalyticsEnabled = false;
const logger = createLogger("Analytics");

/**
 * Initialize the analytics provider.
 * @param options The options for the analytics provider.
 * @param helpers Module helpers to pass to any loaded modules.
 */
export async function init(
	options: AnalyticsProviderOptions | undefined,
	helpers: ModuleHelpers
): Promise<void> {
	if (options) {
		logger.info("Initializing with options", options);
		modules = await loadModules<AnalyticsModule>(options, "analytics");
		// eslint-disable-next-line @typescript-eslint/unbound-method
		const { getAnalyticsClient, ...analyticsHelper } = helpers;

		if (getAnalyticsClient) {
			logger.info(
				"getAnalyticsClient is defined as part of helpers but not passed to analytics modules. This is to prevent an endless loop where an analytics module may be feeding events to itself."
			);
		}
		await initializeModules(modules, analyticsHelper);
		isAnalyticsEnabled = modules.length > 0;
	}
}

/**
 * Close down the analytics provider.
 */
export async function closedown(): Promise<void> {
	await closedownModules("analytics");
}

/**
 * Is the analytics provider enabled.
 * @returns True if analytics is enabled.
 */
export function isEnabled(): boolean {
	return isAnalyticsEnabled;
}

/**
 * Handle a list of analytics events.
 * @param events The events to handle.
 */
export async function handleAnalytics(events: PlatformAnalyticsEvent[]): Promise<void> {
	for (const analyticsModule of modules) {
		await analyticsModule.implementation.handleAnalytics(events);
	}
}

/**
 * Get analytics client.
 * @returns The analytics client.
 */
export async function getAnalyticsModuleClient(): Promise<AnalyticsClient | undefined> {
	if (!isEnabled()) {
		return;
	}
	return {
		handleAnalytics: async (events: ModuleAnalyticsEvent[]): Promise<void> => {
			if (Array.isArray(events)) {
				const platformAnalyticEvents: PlatformAnalyticsEvent[] = events.map<PlatformAnalyticsEvent>(
					(entry) => ({ ...entry, source: MODULE_ANALYTICS_SOURCE })
				);
				return handleAnalytics(platformAnalyticEvents);
			}
		}
	};
}

/**
 * Get analytics client for platform override use.
 * @returns The analytics client.
 */
export async function getAnalyticsPlatformClient(): Promise<AnalyticsClient | undefined> {
	if (!isEnabled()) {
		return;
	}
	return {
		handleAnalytics: async (events: PlatformAnalyticsEvent[]): Promise<void> => {
			if (Array.isArray(events)) {
				return handleAnalytics(events);
			}
		}
	};
}
