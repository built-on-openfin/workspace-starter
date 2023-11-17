import type OpenFin from "@openfin/core";
import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type {
	ContentCreationEvent,
	ContentCreationRules
} from "workspace-platform-starter/shapes/content-creation-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { ExampleContentCreationProviderOptions } from "./shapes";

/**
 * Implementation for the example content creation provider.
 */
export class ExampleContentCreationProvider
	implements ContentCreationRules<ExampleContentCreationProviderOptions>
{
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<ExampleContentCreationProviderOptions> | undefined;

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
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ExampleContentCreationProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExampleContentCreationProvider");
		this._helpers = helpers;

		this._logger.info("Initializing");

		// TODO: Add code here to allocate any module resources
		// You can access the configured options e.g. definition.data?.exampleProp
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");
		// TODO: Add code here to free up any module resources
	}

	/**
	 * Get a list of content creation rules for the module.
	 * @returns The list of content creation rules.
	 */
	public async getRules(): Promise<OpenFin.ContentCreationRule[]> {
		// TODO: Add code to define rules
		return [];
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
		this._logger?.info("View Created", event);

		// If the view has not already been attached we could attach it somewhere
		// or we could just modify the view
		if (!attached) {
			// When we receive a view created event it is up to us to decide where
			// to add the view. Calling platform.createView does not re-create the view
			// if it already exists, but specifying a target means it will be added to that window
			// by returning false the default logic will attach the view to the current target
			// returning true means we have attached the view somewhere
			// TODO: Add logic to position the view
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
		// TODO: There is rarely a need to add anything in this method, but it can be used
		// to manipulate window creations after the fact
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
		// TODO: There is rarely a need to add anything in this method, but can be used
		// to track when content was opened in the browser
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
		// TODO: There is rarely a need to add anything in this method, but can be used
		// to track when content was blocked
	}
}
