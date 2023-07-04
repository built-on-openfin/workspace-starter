import type { AnalyticsEvent, AnalyticsSource } from "@openfin/workspace/common/src/utils/usage-register";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";
/**
 * Definition of an analytics module.
 */
export interface AnalyticsModule<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	/**
	 * Handle a list of analytics events.
	 * @param events The events to handle.
	 * @returns Nothing.
	 */
	handleAnalytics(events: PlatformAnalyticsEvent[]): Promise<void>;
}
/**
 * A list of modules that will be loaded and then called when analytical events come in from the platform or workspace
 * components.
 */
export type AnalyticsProviderOptions = ModuleList;
/**
 * Additional source for workspace platform events.
 */
export declare const PLATFORM_ANALYTICS_SOURCE = "WorkspacePlatform";
/**
 * The data for the analytics events that need to be handled. Extends the platform AnalyticsEvent with additional data
 * source.
 */
export interface PlatformAnalyticsEvent extends Omit<AnalyticsEvent, "source"> {
	/**
	 * The source of the event.
	 */
	source: typeof PLATFORM_ANALYTICS_SOURCE | AnalyticsSource;
	/**
	 * The timestamp for the event.
	 */
	timestamp: Date;
}
