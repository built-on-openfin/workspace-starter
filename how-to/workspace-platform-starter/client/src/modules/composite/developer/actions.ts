import type OpenFin from "@openfin/core";
import type {
	CustomActionPayload,
	CustomActionsMap,
	Page,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import {
	CustomActionCallerType,
	type ActionHelpers,
	type Actions
} from "workspace-platform-starter/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, isStringValue, randomUUID } from "workspace-platform-starter/utils";
import { MANIFEST_TYPES } from "../../../framework/manifest-types";

/**
 * Implement the actions.
 */
export class DeveloperActions implements Actions {
	/**
	 * The helper methods to use.
	 */
	private _helpers?: ActionHelpers;

	/**
	 * The helper methods to use.
	 */
	private _logger?: Logger;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition,
		loggerCreator: LoggerCreator,
		helpers: ActionHelpers
	): Promise<void> {
		this._logger = loggerCreator("DeveloperActions");
		this._helpers = helpers;
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 * @returns The map of custom actions.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["developer-inspect"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.ViewTabContextMenu) {
				for (let i = 0; i < payload.selectedViews.length; i++) {
					const identity: OpenFin.Identity = payload.selectedViews[i];
					const view = fin.View.wrapSync(identity);
					await view.showDeveloperTools();
				}
			} else if (payload.callerType === CustomActionCallerType.PageTabContextMenu) {
				const pageWindowIdentity: OpenFin.Identity = payload.windowIdentity;
				const pageWindow = fin.Window.wrapSync(pageWindowIdentity);
				await pageWindow.showDeveloperTools();
			} else if (payload.callerType === CustomActionCallerType.GlobalContextMenu) {
				const target = payload?.customData?.target === "platform" ? "platform" : "window";
				const targetIdentity: OpenFin.Identity =
					target === "window"
						? payload.windowIdentity
						: { uuid: payload.windowIdentity.uuid, name: payload.windowIdentity.uuid };
				const targetWindow = fin.Window.wrapSync(targetIdentity);
				await targetWindow.showDeveloperTools();
			}
		};

		actionMap["developer-get-snapshot"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.PageTabContextMenu) {
				const pageWindowIdentity: OpenFin.Identity = payload.windowIdentity;
				const pageWindow = fin.Window.wrapSync(pageWindowIdentity);
				const options = await pageWindow.getOptions();
				// start off with the assumption there is a single page
				let targetPage: Page | undefined = options.workspacePlatform.pages[0];
				if (options.workspacePlatform.pages.length > 1) {
					targetPage = options.workspacePlatform.pages.find((page: Page) => page.pageId === payload.pageId);
				}
				if (targetPage) {
					const newPageId = randomUUID();
					// we replace all pages with the target page
					options.workspacePlatform.pages = [targetPage];
					options.layout = targetPage.layout;
					const layoutContainerId = (targetPage as unknown as { layoutContainerKey: string })
						.layoutContainerKey;
					options.layoutSnapshot.layouts[layoutContainerId] = targetPage.layout;
					(options.layoutSnapshot as { pages?: Page[] }).pages = options.workspacePlatform.pages;
					// we collect all the page id and layout container id
					// and replace them with new ones so that the snapshot can be copied
					let targetWindowString = JSON.stringify(options, replaceName, 2);
					targetWindowString = targetWindowString.replaceAll(targetPage.pageId, newPageId);
					targetWindowString = targetWindowString.replaceAll(layoutContainerId, randomUUID());
					await fin.Clipboard.writeText({ data: targetWindowString });
					this._logger?.info(
						`Copied page snapshot for page ${targetPage.pageId} with new pageId ${newPageId} to clipboard`,
						JSON.parse(targetWindowString)
					);
				} else {
					this._logger?.warn(`No page found with id ${payload.pageId} in window ${pageWindow.identity.name}`);
				}
			} else if (payload.callerType === CustomActionCallerType.GlobalContextMenu) {
				const targetIdentity: OpenFin.Identity = payload.windowIdentity;
				const targetWindow = fin.Window.wrapSync(targetIdentity);
				const options = await targetWindow.getOptions();
				const pageIdTracker: { [key: string]: string } = {};
				const layoutContainerIdTracker: { [key: string]: string } = {};

				// we collect all the page ids and layout container ids
				// and replace them with new ones so that the snapshot can be copied
				// these are internal and not typed so may be subject to change.
				// You don't necessarily need to do layoutContainerId replacement but
				// we are trying to avoid any issues with the layoutContainerKey
				for (let i = 0; i < options.workspacePlatform.pages.length; i++) {
					const newPageId = randomUUID();
					const newLayoutContainerId = randomUUID();
					const layoutContainerId = (
						options.workspacePlatform.pages[i] as unknown as { layoutContainerKey: string }
					).layoutContainerKey;
					pageIdTracker[options.workspacePlatform.pages[i].pageId] = newPageId;
					layoutContainerIdTracker[layoutContainerId] = newLayoutContainerId;
				}

				let windowOptionsString = JSON.stringify(options, replaceName, 2);

				const pageIds = Object.keys(pageIdTracker);
				for (let i = 0; i < pageIds.length; i++) {
					windowOptionsString = windowOptionsString.replaceAll(pageIds[i], pageIdTracker[pageIds[i]]);
				}
				const layoutContainerIds = Object.keys(layoutContainerIdTracker);
				for (let i = 0; i < layoutContainerIds.length; i++) {
					windowOptionsString = windowOptionsString.replaceAll(
						layoutContainerIds[i],
						layoutContainerIdTracker[layoutContainerIds[i]]
					);
				}

				await fin.Clipboard.writeText({ data: windowOptionsString });
				this._logger?.info(
					`Copied page snapshot for window ${targetWindow.identity.name} to clipboard`,
					JSON.parse(windowOptionsString)
				);
			}
		};

		actionMap["raise-create-app-definition-intent"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.ViewTabContextMenu) {
				const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
				for (let i = 0; i < payload.selectedViews.length; i++) {
					const viewIdentity = payload.selectedViews[i];
					const intentName = "CreateAppDefinition";
					try {
						const view = fin.View.wrapSync(viewIdentity);
						const options = await view.getOptions();
						const info = await view.getInfo();
						const name = options.name;
						const fdc3InteropApi = isStringValue(options.fdc3InteropApi) ? options.fdc3InteropApi : "2.0";
						const preloads =
							Array.isArray(options.preloadScripts) && options.preloadScripts.length > 0
								? options.preloadScripts
								: undefined;
						const manifest = {
							url: info.url,
							fdc3InteropApi,
							interop: options.interop,
							customData: options.customData,
							preloadScripts: preloads
						};
						const icons = [];
						const favicons = info.favicons || [];
						for (let f = 0; f < favicons.length; f++) {
							icons.push({ src: favicons[f] });
						}
						const app = {
							appId: name,
							name,
							title: info.title,
							description: info.title,
							manifestType: MANIFEST_TYPES.InlineView.id,
							manifest,
							tags: [MANIFEST_TYPES.View.id],
							icons,
							images: [],
							publisher: "",
							contactEmail: "",
							supportEmail: "",
							intents: []
						};
						const intent = {
							name: intentName,
							context: {
								type: "openfin.app",
								app
							}
						};
						await brokerClient.fireIntent(intent);
					} catch (error) {
						this._logger?.error(
							`Error while trying to raise intent ${intentName} for view ${viewIdentity.name}`,
							error
						);
					}
				}
			}
		};

		actionMap["copy-url"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.ViewTabContextMenu) {
				const urls: string[] = [];
				for (let i = 0; i < payload.selectedViews.length; i++) {
					const viewIdentity = payload.selectedViews[i];
					try {
						const view = fin.View.wrapSync(viewIdentity);
						const info = await view.getInfo();
						urls.push(info.url);
					} catch (error) {
						this._logger?.error(
							`Error while trying to capture view url for view ${viewIdentity.name}`,
							error
						);
					}
				}
				if (urls.length > 0) {
					const url = urls.join("\n");
					await fin.Clipboard.writeText({
						data: url
					});
				}
			}
		};

		return actionMap;
	}
}

/**
 * Used when stringifying a window to ensure that all names are unique
 * and not the same as the original name.
 * This is used to ensure that the name is unique when creating a new view
 * or window from a snapshot.
 * @param _ The first parameter is not used, but is required for the function signature.
 * @param nestedValue The nested value that contains the name and url.
 * @param nestedValue.name the name to check and potentially modify.
 * @param nestedValue.url ensure it has a url field to check against.
 * @returns The modified nested value with a unique name if applicable.
 */
export function replaceName(_: unknown, nestedValue: { name?: string; url?: string }): unknown {
	// check to ensure that we have a name field and that we also have a url field in this object (in case name was added to a random part of the layout)
	if (isStringValue(nestedValue?.name) && !isEmpty(nestedValue.url)) {
		if (/\/[\d,a-z-]{36}$/.test(nestedValue.name)) {
			nestedValue.name = nestedValue.name.replace(/([\d,a-z-]{36}$)/, randomUUID());
		}
		// case: internal-generated-view-<uuid>
		if (/-[\d,a-z-]{36}$/.test(nestedValue.name)) {
			nestedValue.name = nestedValue.name.replace(/(-[\d,a-z-]{36}$)/, randomUUID());
		}
	}
	return nestedValue as unknown;
}
