import { createLogger } from "./logger-provider";
import { closedownModules, initializeModules, loadModules } from "./modules";
import type {
	AnalyticsModule,
	AnalyticsProviderOptions,
	PlatformAnalyticsEvent
} from "./shapes/analytics-shapes";
import type { ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";

/**
 * Multiple analytics modules to send analytics to.
 */
let analyticsModules: ModuleEntry<AnalyticsModule>[] = [];
let isAnalyticsEnabled = false;
const logger = createLogger("Analytics");

/**
 * Initialize the analytics provider.
 * @param options The provider options.
 */
export async function init(options: AnalyticsProviderOptions, helpers: ModuleHelpers): Promise<void> {
	logger.info("Initializing Analytics Provider with Options", JSON.stringify(options));
	analyticsModules = await loadModules<AnalyticsModule>(options, "analytics");
	await initializeModules(analyticsModules, helpers);
	isAnalyticsEnabled = analyticsModules.length > 0;
}

/**
 * Is the analytics provider enabled
 */
export function isEnabled(): boolean {
	return isAnalyticsEnabled;
}

/**
 * Close down the analytics provider.
 */
export async function closedown(): Promise<void> {
	await closedownModules("analytics");
}

export async function handleAnalytics(events: PlatformAnalyticsEvent[]): Promise<void> {
	for (const analyticsModule of analyticsModules) {
		if (analyticsModule.isInitialised) {
			await analyticsModule.implementation.handleAnalytics(events);
		}
	}
}
