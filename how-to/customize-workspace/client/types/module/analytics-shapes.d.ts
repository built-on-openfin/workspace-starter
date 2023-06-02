import type { AnalyticsEvent, AnalyticsSource } from "@openfin/workspace/common/src/utils/usage-register";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";
export interface PlatformAnalyticsEvent extends Omit<AnalyticsEvent, "source"> {
	source: typeof PLATFORM_ANALYTICS_SOURCE | AnalyticsSource;
	timestamp: Date;
}
declare const PLATFORM_ANALYTICS_SOURCE = "WorkspacePlatform";
/** A list of modules that will be loaded and then called when analytical events come in from the platform or workspace components. */
export type AnalyticsProviderOptions = ModuleList;
export interface AnalyticsModule<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	handleAnalytics(events: PlatformAnalyticsEvent[]): Promise<void>;
}
export type LoggerProviderOptions = ModuleList;
export {};
