import type {
	GlobalContextMenuOptionType,
	PageTabContextMenuOptionType,
	ToolbarButton,
	ViewTabMenuOptionType
} from "@openfin/workspace-platform";

export interface ToolbarButtonDefinition {
	id: string;
	include: boolean;
	themes?: { [key: string]: string };
	button: ToolbarButton & { iconUrl?: string };
	conditions?: string[];
}

export type MenuPositionOperation = "replaceLabel" | "before" | "after" | "delete" | "start" | "end";
export type MenuSeparatorPosition = "before" | "after";

export interface MenuEntry<T> {
	include: boolean;
	label: string;
	data?: {
		type: T;
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
