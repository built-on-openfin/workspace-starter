import type { ThemeOverrideMap, ThemeSeedMap } from "./theme-override-types";

/**
 * Options to decide which components to show on startup.
 */
export interface ThemeDisplayOptions {
	/**
	 * Show home.
	 */
	home?: boolean;
	/**
	 * Show store.
	 */
	store?: boolean;
	/**
	 * Show dock.
	 */
	dock?: boolean;
	/**
	 * Show notifications.
	 */
	notifications?: boolean;
	/**
	 * Show browser.
	 */
	browser?: boolean;
}

/**
 * Payload for operation to set the palette.
 */
export interface ThemingPayload {
	/**
	 * Seed token values used for seed-first theme generation.
	 */
	seed?: ThemeSeedMap;

	/**
	 * Token overrides per scheme.
	 */
	overrides?: {
		dark?: ThemeOverrideMap;
		light?: ThemeOverrideMap;
	};

	/**
	 * Option for displaying components.
	 */
	options?: ThemeDisplayOptions;
}

/**
 * Payload that might be passed on the command line.
 */
export interface InitParams {
	/**
	 * The action to take.
	 */
	action?: string;

	/**
	 * The payload encoded in base64.
	 */
	payload?: string;
}

/**
 * Custom user args which may contains init args.
 */
export interface CustomUserAppArgs {
	/**
	 * The init args.
	 */
	userAppConfigArgs?: InitParams;
}
