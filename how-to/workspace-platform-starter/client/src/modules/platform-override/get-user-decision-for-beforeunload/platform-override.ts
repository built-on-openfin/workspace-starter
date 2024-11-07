// eslint-disable-next-line max-classes-per-file
import type OpenFin from "@openfin/core";
import type { ViewsPreventingUnloadPayload, WorkspacePlatformProvider } from "@openfin/workspace-platform";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import type {
	PlatformOverride,
	PlatformOverrideHelpers,
	PlatformOverrideOptions
} from "workspace-platform-starter/shapes/platform-shapes";
import type { GetUserDecisionForBeforeunloadOptions } from "./shapes";

/**
 * Implementation for the get user decision for beforeunload platform override.
 */
export class GetUserDecisionForBeforeunload
	implements PlatformOverride<GetUserDecisionForBeforeunloadOptions>
{
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<GetUserDecisionForBeforeunloadOptions> | undefined;

	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: PlatformOverrideHelpers | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<GetUserDecisionForBeforeunloadOptions>,
		loggerCreator: LoggerCreator,
		helpers: PlatformOverrideHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("GetUserDecisionForBeforeunload");
		this._helpers = helpers;

		this._logger.info("Initializing");
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");
	}

	/**
	 * Get the override constructor for the platform override (useful if you wish this implementation to be layered with other implementations and passed to the platform's initialization object as part of an array).
	 * @param options The options for the platform override defined as part of the platform.
	 * @returns The override constructor to be used in an array.
	 */
	public async getConstructorOverride(
		options: PlatformOverrideOptions
	): Promise<OpenFin.ConstructorOverride<WorkspacePlatformProvider>> {
		return (Base: OpenFin.Constructor<WorkspacePlatformProvider>) => {
			// use settings passed through the module definition in your override or the default options passed with the function call
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const moduleData = this._definition?.data ?? {};
			const logger = this._logger;
			const helpers = this._helpers;
			/**
			 * Extend the Platform Override.
			 */
			return class CustomPlatformOverride extends Base {
				/**
				 * Constructor for the interop override.
				 */
				constructor() {
					super();
					// this is just an example to show a reference to the options, module data and local reference to the passed helpers.
					logger?.info(
						`Options passed: ${JSON.stringify(options)} and module data: ${JSON.stringify(moduleData)} with session id: ${helpers?.sessionId}`
					);
				}

				/**
				 * Handle the decision of whether a Window, Page or specific View should close when trying to prevent an unload. This is meant to be overridden.
				 * Called in {@link WorkspacePlatformProvider.closeWindow} and {@link WorkspacePlatformProvider.closeView}.
				 *
				 * When closing a Page, this override is called by {@link WorkspacePlatformProvider.shouldPageClose}
				 * and page proceeds to close if all views passed in are determined to close. In this case, the `closeType` property will have `'page'` value.
				 *
				 * Normally you would use this method to show a dialog indicating that there are Views that are trying to prevent an unload.
				 * By default it will always return all Views passed into it as meaning to close.
				 * @param payload payload containing the views that are preventing an unload, views that are not, and the type of close operation
				 * @returns `Promise<{windowShouldClose: boolean, viewsToClose: OpenFin.Identity[]}>`
				 */
				public async getUserDecisionForBeforeUnload(
					payload: ViewsPreventingUnloadPayload
				): Promise<OpenFin.BeforeUnloadUserDecision> {
					logger?.info("getUserDecisionForBeforeUnload called:", payload);
					if (payload.viewsPreventingUnload.length > 0 && helpers?.getDialogClient) {
						const dialogClient = await helpers?.getDialogClient();
						let title = "Unsaved content changes";
						let message = "You have unsaved changes. Are you sure you want to close?";
						let cancelButtonLabel = "Cancel";
						let closeButtonLabel = "Close";

						if (moduleData?.title && moduleData.title.trim().length > 0) {
							title = moduleData.title;
						}
						if (moduleData?.message && moduleData.message.trim().length > 0) {
							message = moduleData.message.replace("{CLOSE_TYPE}", payload.closeType);
						} else if (payload.closeType === "window") {
							message =
								"You have unsaved changes in your content. Are you sure you want to close this window?";
						} else if (payload.closeType === "page") {
							message = "You have unsaved changes in your content. Are you sure you want to close this page?";
						} else if (payload.closeType === "view") {
							message = "You have unsaved changes. Are you sure you want to close this view?";
						}

						if (moduleData?.cancelButtonLabel && moduleData.cancelButtonLabel.trim().length > 0) {
							cancelButtonLabel = moduleData.cancelButtonLabel;
						}

						if (moduleData?.closeButtonLabel && moduleData.closeButtonLabel.trim().length > 0) {
							closeButtonLabel = moduleData.closeButtonLabel;
						}

						const result = await dialogClient?.showConfirmation(
							{
								title,
								message,
								buttons: [
									{
										label: cancelButtonLabel,
										id: "cancel"
									},
									{
										label: closeButtonLabel,
										id: "close"
									}
								]
							},
							payload.windowId
						);
						if (result) {
							if (result.id === "close") {
								const views = [...payload.viewsNotPreventingUnload, ...payload.viewsPreventingUnload];
								return {
									windowShouldClose: true,
									viewsToClose: views
								};
							}
							return { windowShouldClose: false, viewsToClose: [] };
						}
					}
					return super.getUserDecisionForBeforeUnload(payload);
				}
			};
		};
	}
}
