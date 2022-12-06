interface DockButtonBase {
	tooltip?: string;
	iconUrl?: string;
}

interface DockButtonApp extends DockButtonBase {
	display: "individual" | "group";
	tags?: string[];
}

interface DockButtonAction extends DockButtonBase {
	appId?: string;
	action?: {
		id: string;
		customData: unknown;
	};
}

interface DockButtonDropdown extends DockButtonBase {
	options: {
		appId?: string;
		tooltip?: string;
		action?: {
			id: string;
			customData: unknown;
		};
	}[];
}

export interface DockProviderOptions {
	id: string;
	title: string;
	icon: string;
	workspaceComponents?: {
		hideHomeButton?: boolean;
		hideWorkspacesButton?: boolean;
		hideNotificationsButton?: boolean;
		hideStorefrontButton?: boolean;
	};
	apps?: DockButtonApp[];
	buttons?: (DockButtonAction | DockButtonDropdown)[];
}
