import {
	ColorSchemeOptionType,
	getCurrentSync,
	init,
	WindowType,
	type CustomThemeOptionsWithScheme
} from "@openfin/workspace-platform";
import * as Notifications from "@openfin/workspace/notifications";

const THEME_TOPIC = "notification-center-theming-scheme";
const TOGGLE_TOPIC = "notification-center-theming-toggle";
const REQUEST_TOPIC = "notification-center-theming-request";
const NOTIFICATION_ID = "themed-notification";
const EXIT_TOPIC = "notification-center-theming-exit";

const PLATFORM_ID = "use-notification-center-theming";
const PLATFORM_TITLE = "Use Notification Center Theming";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";
const OPEN_NOTIFICATION_CENTER_TASK = "open-notification-center";

/**
 * The theme used by the platform and passed on to the Notification Center.
 * The Notification Center does not start with its own theme, when the platform registers
 * with it the theme defined during platform initialization is sent to it, so this is where
 * we define the Notification Center look and feel. It defaults to the light scheme.
 */
const notificationCenterTheme: CustomThemeOptionsWithScheme = {
	label: "Notification Center Light",
	default: "light",
	palettes: {
		light: {
			brandPrimary: "#0A76D3",
			brandSecondary: "#DDDFE4",
			backgroundPrimary: "#FAFBFE",
			background1: "#FFFFFF",
			background2: "#FAFBFE",
			background3: "#F3F5F8",
			background4: "#ECEEF1",
			background5: "#DDDFE4",
			background6: "#C9CBD2",
			textDefault: "#1E1F23",
			textHelp: "#2F3136",
			textInactive: "#7D808A",
			statusSuccess: "#207735",
			statusWarning: "#F48F00",
			statusCritical: "#F31818",
			statusActive: "#0A76D3"
		},
		dark: {
			brandPrimary: "#0A76D3",
			brandSecondary: "#383A40",
			backgroundPrimary: "#1E1F23",
			background1: "#111214",
			background2: "#1E1F23",
			background3: "#24262B",
			background4: "#2F3136",
			background5: "#383A40",
			background6: "#53565F",
			textDefault: "#FFFFFF",
			textHelp: "#C9CBD2",
			textInactive: "#7D808A",
			statusSuccess: "#207735",
			statusWarning: "#F48F00",
			statusCritical: "#F31818",
			statusActive: "#0A76D3"
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
	const palette =
		scheme === ColorSchemeOptionType.Dark
			? notificationCenterTheme.palettes.dark
			: notificationCenterTheme.palettes.light;
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
								backgroundColor: palette.background1 ?? "#FFFFFF",
								color: palette.textDefault ?? "#1E1F23"
							},
							children: [
								{
									type: "text",
									dataKey: "content",
									style: { color: palette.textDefault ?? "#1E1F23" }
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
