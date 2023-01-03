export interface PlatformProviderOptions {
	rootUrl: string;
	sharing: boolean;
	initUrl?: string;
	intentPicker?: {
		url: string;
		height?: number;
		width?: number;
	};
}
