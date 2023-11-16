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
> & { target: OpenFin.Identity; viewIdentity?: OpenFin.Identity };

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
	 * @returns Nothing.
	 */
	handleViewCreated?(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildViewCreatedEvent>
	): Promise<void>;

	/**
	 * Hand the content created event for a window to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the created window.
	 * @returns Nothing.
	 */
	handleWindowCreated?(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildWindowCreatedEvent>
	): Promise<void>;

	/**
	 * Hand the content created event for a browser to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the created browser.
	 * @returns Nothing.
	 */
	handleBrowserCreated?(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildContentOpenedInBrowserEvent>
	): Promise<void>;

	/**
	 * Hand the content blocked event to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the blocked content.
	 * @returns Nothing.
	 */
	handleBlocked?(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildContentBlockedEvent>
	): Promise<void>;
}
