export interface HomeProviderOptions {
	id: string;
	title: string;
	icon: string;
	queryMinLength?: number;
	queryAgainst?: string[];
	enablePageIntegration?: boolean;
	enableWorkspaceIntegration?: boolean;
}
