export type BootstrapComponents = "home" | "store" | "dock" | "none";

export interface BootstrapOptions {
	store: boolean;
	home: boolean;
	dock: boolean;
	notifications: boolean;
	autoShow: BootstrapComponents[];
}
