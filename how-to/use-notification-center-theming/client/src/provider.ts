import type OpenFin from "@openfin/core";
import {
	ColorSchemeOptionType,
	getCurrentSync,
	init,
	WindowType,
	type ThemeOptions,
	type WorkspacePlatformProvider
} from "@openfin/workspace-platform";
import * as Notifications from "@openfin/workspace/notifications";

const THEME_TOPIC = "notification-center-theming-scheme";
const TOGGLE_TOPIC = "notification-center-theming-toggle";
const REQUEST_TOPIC = "notification-center-theming-request";
const NOTIFICATION_ID = "themed-notification";
const EXIT_TOPIC = "notification-center-theming-exit";
const SNAPSHOT_TOPIC = "notification-center-theming-snapshot";

const PLATFORM_ID = "use-notification-center-theming";
const PLATFORM_TITLE = "Use Notification Center Theming";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";
const OPEN_NOTIFICATION_CENTER_TASK = "open-notification-center";

/**
 * The platform theme that Workspace turns into CSS for the Notification Center.
 * It defaults to the light scheme and provides generated palettes for the sample notification.
 */
const notificationCenterTheme: ThemeOptions = {
	label: "Notification Center Theme",
	default: ColorSchemeOptionType.Light,
	seed: {
		"brand.base.dark": "#111214",
		"brand.base.light": "#FFFFFF",
		"brand.accent.dark": "#0A76D3",
		"brand.accent.light": "#0A76D3"
	},
	overrides: {
		light: {
			"color.role.background.1": "#FFFFFF",
			"color.role.background.2": "#FAFBFE",
			"color.role.background.3": "#F3F5F8",
			"color.role.background.4": "#ECEEF1",
			"color.role.background.5": "#DDDFE4",
			"color.role.background.6": "#C9CBD2",
			"color.role.foreground.base": "#1E1F23",
			"color.role.foreground.soft": "#2F3136",
			"color.role.background.positive.base": "#207735",
			"color.role.background.warning.base": "#F48F00",
			"color.role.background.critical.base": "#F31818"
		},
		dark: {
			"color.role.background.1": "#111214",
			"color.role.background.2": "#1E1F23",
			"color.role.background.3": "#24262B",
			"color.role.background.4": "#2F3136",
			"color.role.background.5": "#383A40",
			"color.role.background.6": "#53565F",
			"color.role.foreground.base": "#FFFFFF",
			"color.role.foreground.soft": "#C9CBD2",
			"color.role.background.positive.base": "#207735",
			"color.role.background.warning.base": "#F48F00",
			"color.role.background.critical.base": "#F31818"
		}
	},
	// Only used by the Notification Center, custom colors notifications can target for their indicator
	notificationIndicatorColors: {
		brand: {
			light: {
				background: "#0A76D3",
				foreground: "#FFFFFF"
			}
		}
	}
};

window.addEventListener("DOMContentLoaded", async () => {
	await initializeWorkspacePlatform();
	await initializeNotifications();
});

/**
 * Initialize the HERE Core UI Platform.
 * Home, Store and Dock are not registered, the platform only launches the
 * browser windows defined in the manifest snapshot.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initializing HERE Core UI Platform");
	await init({
		overrideCallback,
		browser: {
			defaultWindowOptions: {
				// Replaces the default browser window with our own page (no min/max, theme toggle button)
				url: "http://localhost:8080/platform/window.html",
				icon: PLATFORM_ICON,
				workspacePlatform: {
					// A custom url is only used for "platform" windows, the default "browser" type ignores it
					windowType: WindowType.Platform,
					pages: [],
					favicon: PLATFORM_ICON
				}
			}
		},
		theme: [notificationCenterTheme]
	});
	await setupThemeToggle();
}

/**
 * Override methods in the platform.
 * @param WorkspacePlatformProvider The HERE Core UI Platform class to extend.
 * @returns The overridden class.
 */
function overrideCallback(
	WorkspacePlatformProvider: OpenFin.Constructor<WorkspacePlatformProvider>
): WorkspacePlatformProvider {
	/**
	 * Create a class which overrides the platform provider.
	 */
	class Override extends WorkspacePlatformProvider {
		/**
		 * Override getSnapshot to log a message before calling the default implementation.
		 * @param payload The payload for the snapshot.
		 * @param identity Identity of the entity that called getSnapshot.
		 * @returns The snapshot.
		 */
		public async getSnapshot(payload: undefined, identity: OpenFin.Identity): Promise<OpenFin.Snapshot> {
			console.log("Platform override: getSnapshot called");
			return super.getSnapshot(payload, identity);
		}
	}
	return new Override();
}

/**
 * Listen for the window's light bulb button and switch the platform color scheme,
 * the platform passes the change on to the Notification Center.
 */
async function setupThemeToggle(): Promise<void> {
	const platform = getCurrentSync();
	const appIdentity = { uuid: fin.me.uuid };

	/**
	 * Publish the active color scheme so platform windows can match it.
	 * @param scheme The scheme to publish.
	 */
	async function publishScheme(scheme: ColorSchemeOptionType): Promise<void> {
		await fin.InterApplicationBus.publish(THEME_TOPIC, { scheme });
	}

	// The platform may report "system", so track the scheme we apply explicitly
	let currentScheme = ColorSchemeOptionType.Light;
	await platform.Theme.setSelectedScheme(currentScheme);

	await fin.InterApplicationBus.subscribe(appIdentity, TOGGLE_TOPIC, async () => {
		currentScheme =
			currentScheme === ColorSchemeOptionType.Dark ? ColorSchemeOptionType.Light : ColorSchemeOptionType.Dark;
		await platform.Theme.setSelectedScheme(currentScheme);
		await publishScheme(currentScheme);
		// Existing notifications keep their colors, so replace the sample one with the new scheme colors
		await showThemedNotification(currentScheme);
	});
	await fin.InterApplicationBus.subscribe(appIdentity, REQUEST_TOPIC, async () =>
		publishScheme(currentScheme)
	);
	await fin.InterApplicationBus.subscribe(appIdentity, EXIT_TOPIC, async () => exitPlatform());
	// Platform.getSnapshot is routed through the platform provider, so this hits the getSnapshot override
	await fin.InterApplicationBus.subscribe(appIdentity, SNAPSHOT_TOPIC, async () => {
		console.log("Save Snapshot requested");
		try {
			const snapshot = await platform.getSnapshot();
			console.log("Snapshot saved", snapshot);
			await Notifications.create({
				id: "snapshot-saved",
				platform: PLATFORM_ID,
				title: "Snapshot Saved",
				toast: "transient",
				body: `Captured ${snapshot.windows.length} window(s).`
			});
		} catch (error) {
			console.error("Error saving snapshot", error);
		}
	});
}

/**
 * Tear down the Notification Center registration and quit the platform (closing all its windows).
 */
async function exitPlatform(): Promise<void> {
	console.log("Exiting platform");
	try {
		await Notifications.clear(NOTIFICATION_ID);
	} catch {
		// nothing to clear
	}
	try {
		await Notifications.deregister(PLATFORM_ID);
	} catch (error) {
		console.error("Error deregistering from the Notification Center", error);
	}
	await getCurrentSync().quit();
}

/**
 * Initialize the Notification Center.
 * It is not started automatically, registering the platform launches it and passes it the platform theme.
 */
async function initializeNotifications(): Promise<void> {
	console.log("Registering with the Notification Center");
	const registration = await Notifications.register({
		notificationsPlatformOptions: {
			id: PLATFORM_ID,
			icon: PLATFORM_ICON,
			title: PLATFORM_TITLE
		}
	});
	console.log("Notification Center registration", registration);

	await Notifications.addEventListener("notification-action", async (event) => {
		if (event?.result?.task === OPEN_NOTIFICATION_CENTER_TASK) {
			await Notifications.show();
		}
	});

	await showThemedNotification(ColorSchemeOptionType.Light);
}

/**
 * Show a notification whose colors come from the palette of the given scheme,
 * with a button that opens the Notification Center.
 * @param scheme The scheme to take the colors from.
 */
async function showThemedNotification(scheme: ColorSchemeOptionType): Promise<void> {
	const { light, dark } = await getCurrentSync().Theme.getGeneratedPalettes();
	const palette = scheme === ColorSchemeOptionType.Dark ? dark : light;
	const schemeName = scheme === ColorSchemeOptionType.Dark ? "dark" : "light";

	try {
		await Notifications.clear(NOTIFICATION_ID);
	} catch {
		// nothing to clear
	}

	await Notifications.create({
		id: NOTIFICATION_ID,
		platform: PLATFORM_ID,
		title: "Notification Center Ready",
		toast: "transient",
		template: "custom",
		templateOptions: {
			body: {
				compositions: [
					{
						minTemplateAPIVersion: "1",
						layout: {
							type: "container",
							style: {
								display: "flex",
								flexDirection: "column",
								padding: "10px",
								borderRadius: "4px",
								backgroundColor: palette["color.role.background.1"],
								color: palette["color.role.foreground.base"]
							},
							children: [
								{
									type: "text",
									dataKey: "content",
									style: { color: palette["color.role.foreground.base"] }
								}
							]
						}
					}
				]
			}
		},
		templateData: {
			content: `This notification is displayed using the ${schemeName} theme provided by the platform.`
		},
		indicator: {
			color: "brand",
			fallback: Notifications.IndicatorColor.BLUE,
			text: "Themed"
		},
		buttons: [
			{
				title: "Open NC",
				type: "button",
				cta: true,
				onClick: {
					task: OPEN_NOTIFICATION_CENTER_TASK
				}
			}
		]
	});
}
