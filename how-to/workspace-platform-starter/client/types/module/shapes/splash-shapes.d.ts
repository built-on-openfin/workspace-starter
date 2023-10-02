/**
 * The manifest settings for splash screen.
 */
export interface SplashScreenProviderOptions {
	/**
	 * If the disabled flag is set the splash screen will not be shown.
	 */
	disabled?: boolean;
	/**
	 * This defaults to manifest.shortcut.name if not provided.
	 */
	title?: string;
	/**
	 * This defaults to manifest.platform.icon if not provided.
	 */
	icon?: string;
	/**
	 * The width for the splash screen, defaults to 400.
	 */
	width?: number;
	/**
	 * The height for the splash screen, defaults to 130.
	 */
	height?: number;
	/**
	 * The background color, defaults to theme background.
	 */
	backgroundColor?: string;
	/**
	 * The text color, defaults to theme text.
	 */
	textColor?: string;
	/**
	 * The border color, defaults to theme border.
	 */
	borderColor?: string;
}
