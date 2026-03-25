import type OpenFin from "@openfin/core";
import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";
/**
 * A list of modules that provide content creation rules.
 */
export type ContentCreationProviderOptions = ModuleList;
/**
 * Extended event type for content creation events.
 */
export type ContentCreationEvent<T extends OpenFin.Events.WebContentsEvents.ContentCreationRulesEvent> = Omit<
	T,
	"type"
> & {
	target: OpenFin.Identity;
	viewIdentity?: OpenFin.Identity;
	parsedFeatures: Partial<OpenFin.WindowOptions> & {
		[id: string]: unknown;
	};
};
/**
 * The module definition for content creation rules.
 */
export interface ContentCreationRules<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	/**
	 * Get a list of content creation rules for the module.
	 * @returns The list of content creation rules.
	 */
	getRules?(): Promise<OpenFin.ContentCreationRule[]>;
	/**
	 * Hand the content created event for a view to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the created view.
	 * @param matchingRuleIndex Which of the modules rules does the event match, -1 if it does not match.
	 * @param attached Will be set if a previous handler has already attached the view.
	 * @returns True if the view has been attached.
	 */
	handleViewCreated?(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildViewCreatedEvent>,
		matchingRuleIndex: number,
		attached: boolean
	): Promise<boolean>;
	/**
	 * Hand the content created event for a window to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the created window.
	 * @param matchingRuleIndex Which of the modules rules does the event match, -1 if it does not match.
	 * @returns Nothing.
	 */
	handleWindowCreated?(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildWindowCreatedEvent>,
		matchingRuleIndex: number
	): Promise<void>;
	/**
	 * Hand the content created event for a browser to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the created browser.
	 * @param matchingRuleIndex Which of the modules rules does the event match, -1 if it does not match.
	 * @returns Nothing.
	 */
	handleBrowserCreated?(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildContentOpenedInBrowserEvent>,
		matchingRuleIndex: number
	): Promise<void>;
	/**
	 * Hand the content blocked event to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the blocked content.
	 * @param matchingRuleIndex Which of the modules rules does the event match, -1 if it does not match.
	 * @returns Nothing.
	 */
	handleBlocked?(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildContentBlockedEvent>,
		matchingRuleIndex: number
	): Promise<void>;
}
