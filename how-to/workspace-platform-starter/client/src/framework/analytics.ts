import { createLogger } from "./logger-provider";
import { closedownModules, initializeModules, loadModules } from "./modules";
import type {
	AnalyticsModule,
	AnalyticsProviderOptions,
	PlatformAnalyticsEvent
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
export async function init(options: AnalyticsProviderOptions | undefined, helpers: ModuleHelpers): Promise<void> {
	if (options) {
		logger.info("Initializing with options", options);
		modules = await loadModules<AnalyticsModule>(options, "analytics");
		await initializeModules(modules, helpers);
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
 * Is the analytics provider enabled
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
