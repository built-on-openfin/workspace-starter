import type OpenFin from "@openfin/core";
import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type {
	ContentCreationEvent,
	ContentCreationRules
} from "workspace-platform-starter/shapes/content-creation-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, isStringValue } from "workspace-platform-starter/utils";
import type { ViewPositionContentCreationSettings } from "./shapes";

/**
 * Implementation for the view position content creation provider.
 */
export class ViewPositionContentCreationProvider
	implements ContentCreationRules<ViewPositionContentCreationSettings>
{
	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: ModuleHelpers | undefined;

	/**
	 * The settings for the menu.
	 * @internal
	 */
	private _settings: ViewPositionContentCreationSettings | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ViewPositionContentCreationSettings>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("ViewPositionContentCreationProvider");
		this._settings = definition.data;
		this._helpers = helpers;
	}

	/**
	 * Get a list of content creation rules for the module.
	 * @returns The list of content creation rules.
	 */
	public async getRules(): Promise<OpenFin.ContentCreationRule[]> {
		return this._settings?.rules ?? [];
	}

	/**
	 * Hand the content created event for a view to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the created view.
	 * @returns Nothing.
	 */
	public async handleViewCreated(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildViewCreatedEvent>
	): Promise<void> {
		this._logger?.info("View Created", event);

		// When we receive a view created event it is up to us to decide where
		// to add the view. Calling platform.createView does not re-create the view
		// if it already exists, but specifying a target means it will be added to that window
		// You can of course locate the view elsewhere as shown using the view-position
		// feature flag which could be passed to the window.open call
		let viewPosition = "";
		if (isStringValue(event.features)) {
			const pairs = event.features.split(",");
			for (const pair of pairs) {
				if (pair.startsWith("view-position=")) {
					viewPosition = pair.slice(14);
				}
			}
		}

		if (
			!isEmpty(event.viewIdentity) &&
			(viewPosition === "right" ||
				viewPosition === "left" ||
				viewPosition === "top" ||
				viewPosition === "bottom")
		) {
			const view: OpenFin.View = fin.View.wrapSync(event.viewIdentity);
			const parentTabStack: OpenFin.TabStack = await view.getCurrentStack();
			await parentTabStack.createAdjacentStack([event.childOptions], {
				position: viewPosition
			});
		} else if (
			!isEmpty(event.viewIdentity) &&
			(viewPosition === "stack-left" || viewPosition === "stack-right")
		) {
			const view: OpenFin.View = fin.View.wrapSync(event.viewIdentity);
			const parentTabStack: OpenFin.TabStack = await view.getCurrentStack();
			const siblingViewIds: OpenFin.Identity[] = await parentTabStack.getViews();
			const currentViewIndex = siblingViewIds.findIndex((id) => id.name === event.viewIdentity?.name);
			await parentTabStack.addView(event.childOptions, {
				index: viewPosition === "stack-left" ? currentViewIndex : currentViewIndex + 1
			});
		} else {
			await platform.createView(event.childOptions, event.target);
		}
	}

	/**
	 * Hand the content created event for a window to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the created window.
	 * @returns Nothing.
	 */
	public async handleWindowCreated(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildWindowCreatedEvent>
	): Promise<void> {
		this._logger?.info("Window Created", event);
	}

	/**
	 * Hand the content created event for a browser to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the created browser.
	 * @returns Nothing.
	 */
	public async handleBrowserCreated(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildContentOpenedInBrowserEvent>
	): Promise<void> {
		this._logger?.info("Browser Created", event);
	}

	/**
	 * Hand the content blocked event to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the blocked content.
	 * @returns Nothing.
	 */
	public async handleBlocked(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildContentBlockedEvent>
	): Promise<void> {
		this._logger?.info("Content Blocked", event);
	}
}
