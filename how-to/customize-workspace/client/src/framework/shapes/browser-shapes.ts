import type {
	BrowserButtonType,
	CustomActionSpecifier,
	CustomBrowserButtonConfig,
	GlobalContextMenuOptionType,
	PageTabContextMenuOptionType,
	ViewTabMenuOptionType
} from "@openfin/workspace-platform";

interface PreDefinedButtonConfig {
	/** Type of default browser button */
	type: BrowserButtonType;
	/** Button name text when hovered over */
	tooltip?: string;
	/** icon URL for icon image */
	iconUrl?: string;
	disabled?: boolean;
}

type ToolbarButton = CustomBrowserButtonConfig | PreDefinedButtonConfig;

export interface ToolbarButtonDefinition {
	id: string;
	include: boolean;
	button: ToolbarButton;
	conditions?: string[];
}

export type MenuPositionOperation = "replaceLabel" | "before" | "after" | "delete" | "start" | "end";
export type MenuSeparatorPosition = "before" | "after";

export interface MenuEntry<T> {
	include: boolean;
	label: string;
	data?: {
		type: T;
		action?: CustomActionSpecifier;
	};
	position?: {
		operation: MenuPositionOperation;
		type?: T;
		customId?: string;
	};
	conditions?: string[];
	separator?: MenuSeparatorPosition;
}

export interface BrowserProviderOptions {
	windowOptions: {
		title?: string;
		icon?: string;
		newTabUrl?: string;
		newPageUrl?: string;
	};
	toolbarButtons?: ToolbarButtonDefinition[];
	globalMenu?: MenuEntry<GlobalContextMenuOptionType>[];
	pageMenu?: MenuEntry<PageTabContextMenuOptionType>[];
	viewMenu?: MenuEntry<ViewTabMenuOptionType>[];
}
