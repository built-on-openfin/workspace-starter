import type { AnalyticsEvent } from "@openfin/workspace/common/src/utils/usage-register";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";

export interface PlatformAnalyticsEvent extends AnalyticsEvent {
	timestamp: Date;
}

export type AnalyticsProviderOptions = ModuleList;

export interface AnalyticsModule<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	handleAnalytics(events: PlatformAnalyticsEvent[]): Promise<void>;
}

export type LoggerProviderOptions = ModuleList;
