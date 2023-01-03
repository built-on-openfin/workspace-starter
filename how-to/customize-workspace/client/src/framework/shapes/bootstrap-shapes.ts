export type BootstrapComponents = "home" | "store" | "dock" | "none";

/**
 * Bootstrap provider options.
 * */
export interface BootstrapOptions {
	/**
	 * Should the platform register against the store component?
	 * */
	store: boolean;
	/**
	 * Should the platform register against the home component?
	 * */
	home: boolean;
	/**
	 * Should the platform register against the dock component?
	 * */
	dock: boolean;
	/**
	 * Should the platform register itself against the notification center
	 * and have a platform specific tab show up?
	 * */
	notifications: boolean;
	/**
	 * Which components should auto show after the bootstrapping process. As home vanishes
	 * on blur we suggest adding home last if you wish it to show.
	 * */
	autoShow: BootstrapComponents[];
}
