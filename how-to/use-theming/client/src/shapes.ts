import { CustomPaletteSet } from "@openfin/workspace/common/src/api/theming";

export interface ThemeDisplayOptions {
	home?: boolean;
	store?: boolean;
	dock?: boolean;
	notifications?: boolean;
	browser?: boolean;
}

export interface ThemingPayload {
	palette: Partial<CustomPaletteSet>;
	options?: ThemeDisplayOptions;
}

export interface InitParams {
	action?: string;
	payload?: string;
}

export interface CustomUserAppArgs {
	userAppConfigArgs?: InitParams;
}
