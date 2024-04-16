import type { AnalyticsEvent } from "@openfin/workspace-platform";
import type { AnalyticsSource } from "@openfin/workspace/common/src/utils/usage-register";
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
export interface AnalyticsProviderOptions extends ModuleList {
	/**
	 * Send analytics to OpenFin.
	 */
	sendToOpenFin?: boolean;
}
/**
 * Additional source for workspace platform events.
 */
export declare const PLATFORM_ANALYTICS_SOURCE = "WorkspacePlatform";
/**
 * Additional source for module events.
 */
export declare const MODULE_ANALYTICS_SOURCE = "Module";
/**
 * The data for the analytics events that need to be handled. Extends the platform AnalyticsEvent with additional data
 * source.
 */
export interface PlatformAnalyticsEvent extends Omit<AnalyticsEvent, "source"> {
	/**
	 * The source of the event.
	 */
	source: typeof PLATFORM_ANALYTICS_SOURCE | typeof MODULE_ANALYTICS_SOURCE | AnalyticsSource;
	/**
	 * The timestamp for the event.
	 */
	timestamp: Date;
}
/**
 * The data for the analytics events that need to be handled. Extends the platform AnalyticsEvent but enforces source as
 * Module. Modules can use type (to specify module id) and use action, value and data to provide module specific information if required.
 */
export type ModuleAnalyticsEvent = Omit<PlatformAnalyticsEvent, "source" | "entityId">;
/**
 * Provides a client for handling analytics events.
 */
export interface AnalyticsClient {
	/**
	 * Handle a list of analytics events.
	 * @param events The events to handle.
	 * @returns Nothing.
	 */
	handleAnalytics(events: ModuleAnalyticsEvent[]): Promise<void>;
}
