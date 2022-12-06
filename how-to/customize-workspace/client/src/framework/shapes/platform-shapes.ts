export interface PlatformProviderOptions {
	rootUrl: string;
	sharing: boolean;
	intentPicker?: {
		url: string;
		height?: number;
		width?: number;
	};
}
