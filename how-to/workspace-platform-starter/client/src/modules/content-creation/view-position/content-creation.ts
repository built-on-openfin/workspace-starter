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
	 * @param matchingRuleIndex Which of the modules rules does the event match, -1 if it does not match.
	 * @param attached Will be set if a previous handler has already attached the view.
	 * @returns True if the view has been attached.
	 */
	public async handleViewCreated(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildViewCreatedEvent>,
		matchingRuleIndex: number,
		attached: boolean
	): Promise<boolean> {
		this._logger?.info("View Created", event, matchingRuleIndex, attached);

		// Only perform the positioning if it matches one of our rules
		// and its not already attached
		if (matchingRuleIndex >= 0 && !attached) {
			// When we receive a view created event it is up to us to decide where
			// to add the view. Calling platform.createView does not re-create the view
			// if it already exists, but specifying a target means it will be added to that window
			// By returning false for the attached flag the default handling will just attach
			// to the specified target

			// You can of course locate the view elsewhere as shown using the view-position
			// feature flag which could be passed to the window.open call
			const viewPosition = event.parsedFeatures["view-position"];
			if (isStringValue(viewPosition) && !isEmpty(event.viewIdentity)) {
				if (
					viewPosition === "right" ||
					viewPosition === "left" ||
					viewPosition === "top" ||
					viewPosition === "bottom"
				) {
					const view: OpenFin.View = fin.View.wrapSync(event.viewIdentity);
					const parentTabStack: OpenFin.TabStack = await view.getCurrentStack();
					await parentTabStack.createAdjacentStack([event.childOptions], {
						position: viewPosition
					});
					return true;
				} else if (viewPosition === "stack-left" || viewPosition === "stack-right") {
					const view: OpenFin.View = fin.View.wrapSync(event.viewIdentity);
					const parentTabStack: OpenFin.TabStack = await view.getCurrentStack();
					const siblingViewIds: OpenFin.Identity[] = await parentTabStack.getViews();
					const currentViewIndex = siblingViewIds.findIndex((id) => id.name === event.viewIdentity?.name);
					await parentTabStack.addView(event.childOptions, {
						index: viewPosition === "stack-left" ? currentViewIndex : currentViewIndex + 1
					});
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Hand the content created event for a window to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the created window.
	 * @param matchingRuleIndex Which of the modules rules does the event match, -1 if it does not match.
	 * @returns Nothing.
	 */
	public async handleWindowCreated(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildWindowCreatedEvent>,
		matchingRuleIndex: number
	): Promise<void> {
		this._logger?.info("Window Created", event, matchingRuleIndex);
	}

	/**
	 * Hand the content created event for a browser to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the created browser.
	 * @param matchingRuleIndex Which of the modules rules does the event match, -1 if it does not match.
	 * @returns Nothing.
	 */
	public async handleBrowserCreated(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildContentOpenedInBrowserEvent>,
		matchingRuleIndex: number
	): Promise<void> {
		this._logger?.info("Browser Created", event, matchingRuleIndex);
	}

	/**
	 * Hand the content blocked event to the module to process it.
	 * @param platform The current platform.
	 * @param event The event details for the blocked content.
	 * @param matchingRuleIndex Which of the modules rules does the event match, -1 if it does not match.
	 * @returns Nothing.
	 */
	public async handleBlocked(
		platform: WorkspacePlatformModule,
		event: ContentCreationEvent<OpenFin.Events.WebContentsEvents.ChildContentBlockedEvent>,
		matchingRuleIndex: number
	): Promise<void> {
		this._logger?.info("Content Blocked", event, matchingRuleIndex);
	}
}
