import type {
	GlobalContextMenuOptionType,
	Workspace,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type {
	MenuEntry,
	Menus,
	RelatedMenuId,
	MenuType
} from "workspace-platform-starter/shapes/menu-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, isStringValue } from "workspace-platform-starter/utils";
import { DefaultWorkspaceStorage } from "./default-workspace-storage";
import type { DefaultWorkspaceProviderOptions } from "./shapes";

/**
 * Implementation for the set default workspace menus provider.
 */
export class SetDefaultWorkspaceProvider implements Menus<DefaultWorkspaceProviderOptions> {
	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * The helper methods to use.
	 * @internal
	 */
	private _settings?: DefaultWorkspaceProviderOptions;

	/**
	 * The means to get and set default workspaces
	 * @internal
	 * */
	private _defaultWorkspaceStorage: DefaultWorkspaceStorage | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<DefaultWorkspaceProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("SetDefaultWorkspaceProvider");
		this._settings = definition.data;
		this._logger.info("Initializing");
		this._defaultWorkspaceStorage = new DefaultWorkspaceStorage();
		await this._defaultWorkspaceStorage.initialize(definition?.data, helpers, this._logger);
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");
	}

	/**
	 * Get the menus from the module.
	 * @param menuType The type of menu to get the entries for.
	 * @param platform The current platform.
	 * @param relatedMenuId If available provide the related window identity the menu is showing on and page or view ids
	 * depending on the menu type.
	 * @returns Nothing.
	 */
	public async get(
		menuType: MenuType,
		platform: WorkspacePlatformModule,
		relatedMenuId?: RelatedMenuId
	): Promise<MenuEntry[] | undefined> {
		if (
			menuType === "global" &&
			!isEmpty(relatedMenuId?.windowIdentity) &&
			!isEmpty(this._defaultWorkspaceStorage)
		) {
			const currentDefaultWorkspace = await this._defaultWorkspaceStorage.getDefaultWorkspace();
			const useLastActiveWorkspaceSet: boolean = currentDefaultWorkspace.useLastActiveWorkspace;
			const savedDefaultWorkspaceId: string = currentDefaultWorkspace.workspaceId;

			const workspaces: Workspace[] = await platform.Storage.getWorkspaces();
			const currentWorkspace: Workspace = await platform.getCurrentWorkspace();
			workspaces.sort((a, b) => a.title.localeCompare(b.title));
			const defaultWorkspaceMenuEntry: MenuEntry = {
				include: true,
				label: this._settings?.defaultWorkspace?.menuLabel ?? "Default Workspace",
				icon: this._settings?.defaultWorkspace?.menuIcon,
				enabled: workspaces.length > 0,
				submenu: [],
				position: {
					type: "Downloads",
					operation: "before",
					customId: "DefaultWorkspace",
					...this._settings?.defaultWorkspace?.menuPosition
				}
			};
			const includeReset = this._settings?.reset?.include ?? true;
			defaultWorkspaceMenuEntry.submenu?.push({
				label: this._settings?.reset?.menuLabel ?? "None",
				icon: this._settings?.reset?.menuIcon,
				visible: includeReset,
				enabled: useLastActiveWorkspaceSet || isStringValue(savedDefaultWorkspaceId),
				checked: !useLastActiveWorkspaceSet && !isStringValue(savedDefaultWorkspaceId),
				type: "checkbox",
				data: {
					type: "Custom" as GlobalContextMenuOptionType.Custom,
					action: {
						id: "set-default-workspace",
						customData: {
							workspaceId: "",
							useLastActiveWorkspace: false
						}
					}
				}
			});
			const includeLastActive = this._settings?.lastActive?.include ?? true;
			defaultWorkspaceMenuEntry.submenu?.push({
				label: this._settings?.lastActive?.menuLabel ?? "Last Active Workspace",
				icon: this._settings?.lastActive?.menuIcon,
				visible: includeLastActive,
				checked: useLastActiveWorkspaceSet,
				enabled: !useLastActiveWorkspaceSet,
				type: "checkbox",
				data: {
					type: "Custom" as GlobalContextMenuOptionType.Custom,
					action: {
						id: "set-default-workspace",
						customData: {
							workspaceId: currentWorkspace?.workspaceId ?? "",
							useLastActiveWorkspace: true
						}
					}
				}
			});
			if (workspaces.length > 0) {
				const lastActiveWorkspaceLabel =
					this._settings?.lastActive?.lastActiveWorkspaceLabel ?? " [Active Workspace]";
				for (const workspace of workspaces) {
					defaultWorkspaceMenuEntry.submenu?.push({
						label:
							useLastActiveWorkspaceSet && workspace.workspaceId === savedDefaultWorkspaceId
								? `${workspace.title} ${lastActiveWorkspaceLabel}`
								: workspace.title,
						enabled: workspace.workspaceId !== savedDefaultWorkspaceId || useLastActiveWorkspaceSet,
						checked: !useLastActiveWorkspaceSet && workspace.workspaceId === savedDefaultWorkspaceId,
						type: "checkbox",
						data: {
							type: "Custom" as GlobalContextMenuOptionType.Custom,
							action: {
								id: "set-default-workspace",
								customData: {
									workspaceId: workspace.workspaceId,
									useLastActiveWorkspace: false
								}
							}
						}
					});
				}
			}
			const menuItemsToReturn: MenuEntry[] = [];
			menuItemsToReturn.push(defaultWorkspaceMenuEntry);
			return menuItemsToReturn;
		}
	}
}
