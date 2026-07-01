import type { OpenFin } from "@openfin/core";
import * as Snap from "@openfin/snap-sdk";
import type { ServerOptions } from "@openfin/snap-sdk";
import { doesAppAssetExist, downloadAppAsset } from "./app-asset";

const TEST_APP_WINDOW_ID = "snap-example-native-test-app-id";
const snapDefaultUrl = "https://cdn.openfin.co/release/snap/1.6.1/snap.zip";
const snapVersion = "1.6.1";
const snapAlias = "openfin-snap";
const snapTarget = "OpenFinSnap.exe";

// The DOM elements
let chkShowDebugWindow: HTMLInputElement | null;
let chkDisableShiftToUnsnap: HTMLInputElement | null;
let chkCtrlToSnap: HTMLInputElement | null;
let chkDisableGPUDragging: HTMLInputElement | null;
let chkDisableBlurDrop: HTMLInputElement | null;
let chkAutoHideClientTaskbarIcons: HTMLInputElement | null;

let chkHideTaskBarEntry: HTMLInputElement | null;
let chkCustomTaskBarIcon: HTMLInputElement | null;
let chkGroupWithPlatformTaskbarGroup: HTMLInputElement | null;
let chkDisableRuntimeHeartbeating: HTMLInputElement | null;
let chkCustomSnapAppAssetPath: HTMLInputElement | null;
let txtPrimaryUrl: HTMLInputElement | null;
let txtFallbackUrl: HTMLInputElement | null;
let fieldPrimaryUrl: HTMLElement | null;
let fieldFallbackUrl: HTMLElement | null;
let rowCustomSnapAppAssetPath: HTMLElement | null;

let btnStart: HTMLButtonElement | null;
let btnStop: HTMLButtonElement | null;
let btnNativeTestApp: HTMLButtonElement | null;
let btnWindowTestApp: HTMLButtonElement | null;
let btnShowHideDebugWindow: HTMLButtonElement | null;
let selAttachPosition: HTMLSelectElement | null;
let selSnapKey: HTMLSelectElement | null;
let selUnsnapKey: HTMLSelectElement | null;
let selResize: HTMLSelectElement | null;
let selTheme: HTMLSelectElement | null;
let btnAttachToWindow: HTMLButtonElement | null;
let btnDetachFromWindow: HTMLButtonElement | null;
let btnMinimizeGroup: HTMLButtonElement | null;
let btnGetLayout: HTMLButtonElement | null;
let btnGetAttached: HTMLButtonElement | null;
let btnGetGroups: HTMLButtonElement | null;
let btnGetGroupsForCurrentWindow: HTMLButtonElement | null;
let btnClearLog: HTMLButtonElement | null;
let serverStatus: HTMLParagraphElement | null;
let logging: HTMLPreElement | null;
let debugWindowShown = false;

let serverState: "starting" | "started" | "stopping" | "stopped" = "stopped";
let isWindowOpen = false;
let isWindowAttached = false;
let server: Snap.SnapServer | undefined;

/**
 * Custom logger that implements the Logger interface using logInformation and logError functions
 */
const customLogger = {
	info: (message: unknown, ...optionalParams: unknown[]): void => {
		logInformation(`${message}${optionalParams.length > 0 ? ` ${optionalParams.join(" ")}` : ""}`);
	},
	error: (message: unknown, ...optionalParams: unknown[]): void => {
		logError(`${message}${optionalParams.length > 0 ? ` ${optionalParams.join(" ")}` : ""}`);
	},
	warn: (message: unknown, ...optionalParams: unknown[]): void => {
		logError(`${message}${optionalParams.length > 0 ? ` ${optionalParams.join(" ")}` : ""}`);
	},
	trace: (message: unknown, ...optionalParams: unknown[]): void => {
		logInformation(`${message}${optionalParams.length > 0 ? ` ${optionalParams.join(" ")}` : ""}`);
	},
	debug: (message: unknown, ...optionalParams: unknown[]): void => {
		logInformation(`${message}${optionalParams.length > 0 ? ` ${optionalParams.join(" ")}` : ""}`);
	}
};

// Wait for the DOM to finish loading
window.addEventListener("DOMContentLoaded", async () => {
	// Platform has loaded so initialize the DOM
	await initializeDOM();
});

/**
 * Initialize the DOM elements.
 */
async function initializeDOM(): Promise<void> {
	chkShowDebugWindow = document.querySelector<HTMLInputElement>("#chkShowDebugWindow");
	chkDisableShiftToUnsnap = document.querySelector<HTMLInputElement>("#chkDisableShiftToUnsnap");
	chkCtrlToSnap = document.querySelector<HTMLInputElement>("#chkCtrlToSnap");
	chkDisableGPUDragging = document.querySelector<HTMLInputElement>("#chkDisableGPUDragging");
	chkDisableBlurDrop = document.querySelector<HTMLInputElement>("#chkDisableBlurDrop");
	chkHideTaskBarEntry = document.querySelector<HTMLInputElement>("#chkHideTaskBarEntry");
	chkCustomTaskBarIcon = document.querySelector<HTMLInputElement>("#chkCustomTaskBarIcon");
	chkGroupWithPlatformTaskbarGroup = document.querySelector<HTMLInputElement>(
		"#chkGroupWithPlatformTaskbarGroup"
	);

	chkAutoHideClientTaskbarIcons = document.querySelector<HTMLInputElement>("#chkAutoHideClientTaskbarIcons");
	chkDisableRuntimeHeartbeating = document.querySelector<HTMLInputElement>("#chkDisableRuntimeHeartbeating");
	chkCustomSnapAppAssetPath = document.querySelector<HTMLInputElement>("#chkCustomSnapAppAssetPath");
	txtPrimaryUrl = document.querySelector<HTMLInputElement>("#txtPrimaryUrl");
	txtFallbackUrl = document.querySelector<HTMLInputElement>("#txtFallbackUrl");
	fieldPrimaryUrl = document.querySelector<HTMLElement>("#fieldPrimaryUrl");
	fieldFallbackUrl = document.querySelector<HTMLElement>("#fieldFallbackUrl");
	rowCustomSnapAppAssetPath = document.querySelector<HTMLElement>("#rowCustomSnapAppAssetPath");

	btnStart = document.querySelector<HTMLButtonElement>("#btnStart");
	btnStop = document.querySelector<HTMLButtonElement>("#btnStop");
	serverStatus = document.querySelector<HTMLParagraphElement>("#serverStatus");
	btnNativeTestApp = document.querySelector<HTMLButtonElement>("#btnNativeTestApp");
	btnWindowTestApp = document.querySelector<HTMLButtonElement>("#btnWindowTestApp");
	selAttachPosition = document.querySelector<HTMLSelectElement>("#selAttachPosition");
	selSnapKey = document.querySelector<HTMLSelectElement>("#selKeyToSnap");
	selUnsnapKey = document.querySelector<HTMLSelectElement>("#selKeyToUnsnap");
	selResize = document.querySelector<HTMLSelectElement>("#selResizeBehaviour");
	selTheme = document.querySelector<HTMLSelectElement>("#selTheme");
	btnAttachToWindow = document.querySelector<HTMLButtonElement>("#btnAttachToWindow");
	btnDetachFromWindow = document.querySelector<HTMLButtonElement>("#btnDetachFromWindow");
	btnMinimizeGroup = document.querySelector<HTMLButtonElement>("#btnMinimizeGroup");
	btnGetLayout = document.querySelector<HTMLButtonElement>("#btnGetLayout");
	btnGetAttached = document.querySelector<HTMLButtonElement>("#btnGetAttached");
	btnGetGroups = document.querySelector<HTMLButtonElement>("#btnGetGroups");
	btnGetGroupsForCurrentWindow = document.querySelector<HTMLButtonElement>("#btnGetGroupsForCurrentWindow");
	logging = document.querySelector<HTMLPreElement>("#logging");
	btnClearLog = document.querySelector<HTMLButtonElement>("#btnClearLog");
	btnShowHideDebugWindow = document.querySelector<HTMLButtonElement>("#btnShowHideDebugWindow");

	if (
		chkShowDebugWindow &&
		chkDisableShiftToUnsnap &&
		chkCtrlToSnap &&
		chkDisableGPUDragging &&
		chkDisableBlurDrop &&
		chkHideTaskBarEntry &&
		chkCustomTaskBarIcon &&
		chkGroupWithPlatformTaskbarGroup &&
		chkAutoHideClientTaskbarIcons &&
		chkDisableRuntimeHeartbeating &&
		chkCustomSnapAppAssetPath &&
		txtPrimaryUrl &&
		txtFallbackUrl &&
		fieldPrimaryUrl &&
		fieldFallbackUrl &&
		rowCustomSnapAppAssetPath &&
		btnStart &&
		btnStop &&
		serverStatus &&
		btnNativeTestApp &&
		btnAttachToWindow &&
		btnDetachFromWindow &&
		btnMinimizeGroup &&
		btnGetLayout &&
		btnGetAttached &&
		btnGetGroups &&
		btnGetGroupsForCurrentWindow &&
		btnClearLog &&
		btnShowHideDebugWindow
	) {
		txtPrimaryUrl.value = "https://exampleofbadurl.com/snap.zip";
		txtFallbackUrl.value = snapDefaultUrl;
		chkCustomSnapAppAssetPath.addEventListener("change", () => {
			const display = chkCustomSnapAppAssetPath?.checked ? "" : "none";
			if (fieldPrimaryUrl) {
				fieldPrimaryUrl.style.display = display;
			}
			if (fieldFallbackUrl) {
				fieldFallbackUrl.style.display = display;
			}
		});
		const app = await fin.Application.getCurrent();
		const manifest = await app.getManifest();

		if (manifest.appAssets?.some((asset: { alias?: string }) => asset.alias === "openfin-snap")) {
			rowCustomSnapAppAssetPath.style.display = "none";
		}

		if (manifest.appAssets?.[0]?.src === "SNAP_ASSET_URL") {
			logError(
				"Please request the SNAP_ASSET_URL from HERE and update manifest.fin.json before running the sample"
			);
			updateServerStatus();
			chkShowDebugWindow.disabled = true;
			chkCtrlToSnap.disabled = true;
			chkDisableShiftToUnsnap.disabled = true;
			chkDisableGPUDragging.disabled = true;
			chkDisableBlurDrop.disabled = true;
			btnStart.disabled = true;
		} else {
			btnStart.addEventListener("click", async () => {
				try {
					serverState = "starting";
					updateServerStatus();

					logInformation(`Starting Snap Server with Id ${fin.me.identity.uuid}`);
					server = new Snap.SnapServer(fin.me.identity.uuid);
					let keyToSnap: undefined | "ctrl" | "shift" | boolean;
					let keyToUnsnap: undefined | "ctrl" | "shift";

					if (chkCtrlToSnap?.checked) {
						const snapKeyValue = selSnapKey?.value;
						if (snapKeyValue === "ctrl") {
							keyToSnap = "ctrl";
						} else if (snapKeyValue === "shift") {
							keyToSnap = "shift";
						}
					}

					if (!chkDisableShiftToUnsnap?.checked) {
						const keyToUnsnapValue = selUnsnapKey?.value;
						if (keyToUnsnapValue === "ctrl") {
							keyToUnsnap = "ctrl";
						} else if (keyToUnsnapValue === "shift") {
							keyToUnsnap = "shift";
						}
					}

					const options: ServerOptions = {
						showDebug: chkShowDebugWindow?.checked,
						disableUserUnstick: chkDisableShiftToUnsnap?.checked,
						keyToStick: keyToSnap,
						keyToUnstick: keyToUnsnap,
						disableGPUAcceleratedDragging: chkDisableGPUDragging?.checked,
						disableBlurDropPreview: chkDisableBlurDrop?.checked,
						hideTaskbarEntry: chkHideTaskBarEntry?.checked,
						taskbarIcon: chkCustomTaskBarIcon?.checked ? "https://openfin.co/favicon.ico" : undefined,
						taskbarIconGroup: chkGroupWithPlatformTaskbarGroup?.checked
							? `openfin_apps_group.${fin.me.identity.uuid}`
							: undefined,
						autoHideClientTaskbarIcons: chkAutoHideClientTaskbarIcons?.checked,
						disableRuntimeHeartbeating: chkDisableRuntimeHeartbeating?.checked,
						defaultResizingBehavior: selResize?.value as Snap.ResizingBehavior,
						theme: selTheme?.value as "snap-original" | "snap-light1" | "snap-dark1"
					};

					if (chkCustomSnapAppAssetPath?.checked) {
						const primaryUrl = txtPrimaryUrl?.value ?? "";
						const fallbackUrl = txtFallbackUrl?.value;

						const validatedAppAsset = await validateAppAssetSource(primaryUrl, fallbackUrl);
						if (!validatedAppAsset.success) {
							logError(
								"Failed to fetch the app asset from both primary and fallback URLs. Cannot start the Snap server with custom app asset path."
							);
							return;
						}
						options.customSnapAssetSource = validatedAppAsset.validatedUrl;
					}

					await server.start(options);

					if (chkShowDebugWindow?.checked) {
						debugWindowShown = true;
					} else {
						debugWindowShown = false;
					}
					await server.enableAutoWindowRegistration();

					server.addEventListener("client-registered", (event: Snap.ClientRegisteredEvent) => {
						logInformation(`Client Registered: ${JSON.stringify(event)}`);
					});
					server.addEventListener("client-unregistered", (event: Snap.ClientUnRegisteredEvent) => {
						logInformation(`Client Unregistered: ${JSON.stringify(event)}`);
						if (event.clientId === TEST_APP_WINDOW_ID) {
							isWindowOpen = false;
							isWindowAttached = false;
							updateWindowStatus();
						}
					});
					server.addEventListener("clients-attached", (event: Snap.ClientsAttachedEvent) => {
						logInformation(`Clients Attached: ${JSON.stringify(event)}`);
						if (event.attachedClientId === TEST_APP_WINDOW_ID) {
							isWindowAttached = true;
							updateWindowStatus();
						}
					});
					server.addEventListener("client-detached", (event: Snap.ClientDetachedEvent) => {
						logInformation(`Client Detached: ${JSON.stringify(event)}`);
						if (event.clientId === TEST_APP_WINDOW_ID) {
							isWindowAttached = false;
							updateWindowStatus();
						}
					});
					server.addEventListener("client-activated", (event: Snap.ClientActivatedEvent) => {
						logInformation(`Client Activated: ${JSON.stringify(event)}`);
					});
					server.addEventListener("client-deactivated", (event: Snap.ClientDeactivatedEvent) => {
						logInformation(`Client Deactivated: ${JSON.stringify(event)}`);
					});
					server.addEventListener("move-size-completed", (event: Snap.MoveSizeCompletedEvent) => {
						logInformation(`Move Size Completed: ${JSON.stringify(event)}`);
					});
					server.addEventListener("groups-changed", (event: Snap.GroupsChangedEvent) => {
						logInformation(`Groups Changed: ${JSON.stringify(event)}`);
					});

					logInformation("Started Snap Server");

					const win = fin.Window.getCurrentSync();
					const nativeId = await win.getNativeId();

					await server.registerWindow(fin.me.identity.uuid, nativeId);
					logInformation(
						`Registering Platform Window with Id ${fin.me.identity.uuid} and handle ${nativeId}`
					);

					serverState = "started";
				} catch (err) {
					logError(formatError(err));
				} finally {
					updateServerStatus();
				}
			});

			btnStop.addEventListener("click", async () => {
				try {
					serverState = "stopping";
					updateServerStatus();

					logInformation("Stopping Snap Server");
					if (server) {
						await server.detachFromGroup(TEST_APP_WINDOW_ID);
						await server.stop();
					}
					logInformation("Stopped Snap Server");
				} catch (err) {
					logError(formatError(err));
				} finally {
					server = undefined;
					serverState = "stopped";
					isWindowOpen = false;
					isWindowAttached = false;
					updateServerStatus();
				}
			});

			btnNativeTestApp.addEventListener("click", async () => {
				const runtimeInfo = await fin.System.getRuntimeInfo();
				const appAssetInfo = await fin.System.getAppAssetInfo({ alias: "snap-native-test-app" });
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const localAppUrl = (runtimeInfo.args as any)["local-startup-url"].replace("config.json", "");
				await launchApp(
					"Native Test App",
					TEST_APP_WINDOW_ID,
					`${localAppUrl}assets\\${appAssetInfo.alias}\\${appAssetInfo.version}\\${appAssetInfo.target}`,
					[],
					{
						type: "waitForWindowOfName",
						timeoutMs: 15000,
						matchRegex: "^Native Test App$"
					}
				);
				isWindowOpen = true;
				isWindowAttached = false;
				updateWindowStatus();
			});

			btnWindowTestApp?.addEventListener("click", async () => {
				await launchWindowOptionsApp();
				updateWindowStatus();
			});

			btnAttachToWindow.addEventListener("click", async () => {
				if (server && selAttachPosition) {
					const value = selAttachPosition.value;
					await server.attachWindows(fin.me.identity.uuid, TEST_APP_WINDOW_ID, value as Snap.AttachSide, 0);
					isWindowAttached = true;
					updateWindowStatus();
				}
			});

			btnDetachFromWindow.addEventListener("click", async () => {
				if (server) {
					await server.detachFromGroup(TEST_APP_WINDOW_ID);
					isWindowAttached = false;
					updateWindowStatus();
				}
			});

			btnMinimizeGroup.addEventListener("click", async () => {
				if (server) {
					const groupId = await server.getGroupIdForWindow(TEST_APP_WINDOW_ID);
					await server.minimizeGroup(groupId);
				}
			});

			btnClearLog.addEventListener("click", () => {
				logClear();
			});

			btnGetLayout.addEventListener("click", async () => {
				if (server) {
					const layout = await server.getLayout();
					logInformation("Layout");
					logInformation(JSON.stringify(layout, undefined, "  "));
				}
			});

			btnGetAttached.addEventListener("click", async () => {
				if (server) {
					const attached = await server.getAttached(fin.me.identity.uuid);
					logInformation("Attached");
					logInformation(JSON.stringify(attached, undefined, "  "));
				}
			});

			btnGetGroups.addEventListener("click", async () => {
				if (server) {
					const groups = await server.getAllGroupIds();
					logInformation("Group Ids");
					logInformation(JSON.stringify(groups, undefined, "  "));
				}
			});
			btnGetGroupsForCurrentWindow.addEventListener("click", async () => {
				if (server) {
					const groupId = await server.getGroupIdForWindow(fin.me.identity.name);
					logInformation(`Group Id For Current Window: ${groupId}`);
				}
			});
			btnShowHideDebugWindow.addEventListener("click", async () => {
				if (server) {
					debugWindowShown = !debugWindowShown;
					await server.showDebugWindow(debugWindowShown);
				}
			});
			updateServerStatus();
		}
	}
}

/**
 * Generate a short hash string from a URL to use as a version identifier.
 * @param url The URL to hash.
 * @returns A hex string hash of the URL.
 */
function hashUrl(url: string): string {
	let hash = 5381;
	const maxSafeHash = 4_294_967_291;
	for (let i = 0; i < url.length; i++) {
		const codePoint = url.charCodeAt(i);
		const multipliedHash = hash * 33;
		hash = (multipliedHash + codePoint) % maxSafeHash;
	}
	const hashHex = Math.floor(hash).toString(16);
	return hashHex.padStart(8, "0");
}

/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
function formatError(err: unknown): string {
	if (err instanceof Error) {
		return err.message;
	} else if (typeof err === "string") {
		return err;
	}
	return JSON.stringify(err);
}

/**
 * Update the DOM elements with the state of the connection.
 */
function updateServerStatus(): void {
	if (
		chkShowDebugWindow &&
		chkCtrlToSnap &&
		chkDisableShiftToUnsnap &&
		chkDisableGPUDragging &&
		chkDisableBlurDrop &&
		btnStart &&
		btnStop &&
		serverStatus &&
		btnNativeTestApp &&
		btnAttachToWindow &&
		btnDetachFromWindow &&
		selAttachPosition &&
		btnGetLayout &&
		btnGetAttached &&
		btnGetGroups &&
		btnGetGroupsForCurrentWindow &&
		btnShowHideDebugWindow
	) {
		if (serverState === "starting" || serverState === "stopping") {
			chkShowDebugWindow.disabled = true;
			chkCtrlToSnap.disabled = true;
			chkDisableShiftToUnsnap.disabled = true;
			chkDisableGPUDragging.disabled = true;
			chkDisableBlurDrop.disabled = true;
			btnStart.disabled = true;
			btnStop.disabled = true;
			btnGetLayout.disabled = true;
			btnGetAttached.disabled = true;
			btnGetGroups.disabled = true;
			btnGetGroupsForCurrentWindow.disabled = true;
			btnShowHideDebugWindow.disabled = true;
			serverStatus.textContent = `Snap Server is ${serverState}`;
		} else if (serverState === "started") {
			chkShowDebugWindow.disabled = true;
			chkCtrlToSnap.disabled = true;
			chkDisableShiftToUnsnap.disabled = true;
			chkDisableGPUDragging.disabled = true;
			chkDisableBlurDrop.disabled = true;
			btnStart.disabled = true;
			btnStop.disabled = false;
			btnGetLayout.disabled = false;
			btnGetAttached.disabled = false;
			btnGetGroups.disabled = false;
			btnGetGroupsForCurrentWindow.disabled = false;
			btnShowHideDebugWindow.disabled = false;
			serverStatus.textContent = "Snap Server is started";
		} else {
			chkShowDebugWindow.disabled = false;
			chkCtrlToSnap.disabled = false;
			chkDisableShiftToUnsnap.disabled = false;
			chkDisableGPUDragging.disabled = false;
			chkDisableBlurDrop.disabled = false;
			btnStart.disabled = false;
			btnStop.disabled = true;
			btnGetLayout.disabled = true;
			btnGetAttached.disabled = true;
			btnGetGroups.disabled = true;
			btnGetGroupsForCurrentWindow.disabled = true;
			btnShowHideDebugWindow.disabled = true;
			serverStatus.textContent = "Snap Server is stopped";
		}
	}
	updateWindowStatus();
}

/**
 * Update the UI based on the window state.
 */
function updateWindowStatus(): void {
	if (
		btnNativeTestApp &&
		selAttachPosition &&
		btnAttachToWindow &&
		btnDetachFromWindow &&
		btnMinimizeGroup &&
		btnWindowTestApp
	) {
		if (serverState === "starting" || serverState === "stopping") {
			btnNativeTestApp.disabled = true;
			btnWindowTestApp.disabled = true;
			selAttachPosition.disabled = true;
			btnAttachToWindow.disabled = true;
			btnDetachFromWindow.disabled = true;
			btnMinimizeGroup.disabled = true;
		} else if (serverState === "started" && isWindowOpen) {
			btnNativeTestApp.disabled = true;
			selAttachPosition.disabled = isWindowAttached;
			btnAttachToWindow.disabled = isWindowAttached;
			btnDetachFromWindow.disabled = !isWindowAttached;
			btnMinimizeGroup.disabled = !isWindowAttached;
		} else {
			btnNativeTestApp.disabled = serverState === "stopped";
			btnWindowTestApp.disabled = serverState === "stopped";
			selAttachPosition.disabled = true;
			btnAttachToWindow.disabled = true;
			btnDetachFromWindow.disabled = true;
			btnMinimizeGroup.disabled = true;
		}
	}
}

/**
 * Send information to the log display.
 * @param information The information to send.
 */
function logInformation(information: string): void {
	if (logging) {
		logging.textContent = `${logging.textContent}${information}\n\n`;
		logging.scrollTop = logging.scrollHeight;
	}
}

/**
 * Send error to the log display.
 * @param err The error to send.
 */
function logError(err: string): void {
	if (logging) {
		logging.textContent = `${logging.textContent}ERROR: ${err}\n\n`;
		logging.scrollTop = logging.scrollHeight;
	}
}

/**
 * Clear the log display.
 */
function logClear(): void {
	if (logging) {
		logging.textContent = "";
		logging.scrollTop = 0;
	}
}

/**
 * Launch an application using Snap.
 * @param appName The name of the app that is being launched.
 * @param clientId An Id to associate with the launched app.
 * @param path The path to the app to launch.
 * @param args Additional command line arguments for the launch.
 * @param strategy The strategy to launch the window with.
 */
async function launchApp(
	appName: string,
	clientId: string,
	path: string,
	args: string[],
	strategy: Snap.LaunchStrategy
): Promise<void> {
	try {
		if (server) {
			logInformation(`Launching ${appName}`);
			const launchResult = await server.launch({
				path,
				clientId,
				args,
				strategy
			});

			if (launchResult?.process_id) {
				logInformation(`${appName} launched with process id ${launchResult.process_id}`);
			}
		}
	} catch (err) {
		logError(formatError(err));
	}
}

/**
 * Launches a window that can be used to create child windows.
 */
async function launchWindowOptionsApp(): Promise<void> {
	if (serverState !== "started") {
		logError("Snap server is not started");
		return;
	}
	const windowOptionsName = "window-options-app";
	const optionsWindow = fin.Window.wrapSync({ uuid: fin.me.identity.uuid, name: windowOptionsName });

	try {
		await optionsWindow.getInfo();
		await optionsWindow.bringToFront();
	} catch {
		// window does not exist, so create it
		await fin.Window.create({
			name: windowOptionsName,
			autoShow: true,
			defaultHeight: 600,
			defaultWidth: 800,
			url: "https://built-on-openfin.github.io/container-starter/main/use-window-options/html/app.html"
		});
	}
}

/**
 * Validates the snap app asset from the provided primary and fallback URLs to ensure it is available before starting the Snap server.
 * @param primaryUrl The primary URL to validate the snap app asset from.
 * @param fallbackUrl An optional fallback URL to validate the snap app asset from if the primary URL fails.
 * @returns An object indicating whether the validation was successful, the validated URL if successful, and whether the fallback URL was used.
 */
async function validateAppAssetSource(
	primaryUrl: string,
	fallbackUrl?: string
): Promise<{ success: boolean; validatedUrl?: string; isFallbackUrl?: boolean }> {
	const snapAssetInfo: OpenFin.AppAssetInfo = {
		alias: snapAlias,
		src: snapDefaultUrl,
		version: snapVersion,
		target: snapTarget,
		mandatory: false
	};
	// before trying custom urls check to see if you already have snap
	const snapDownloadedAssetInfo: OpenFin.AppAssetInfo | undefined = await doesAppAssetExist(
		snapAssetInfo.alias,
		snapAssetInfo.version
	);

	if (snapDownloadedAssetInfo) {
		logInformation(
			`We have a snap asset that matches the alias and version. It has the following details: alias: ${snapDownloadedAssetInfo.alias}, version: ${snapDownloadedAssetInfo.version}, src: ${snapDownloadedAssetInfo.src}`
		);
		return {
			success: true,
			validatedUrl: snapDownloadedAssetInfo.src,
			isFallbackUrl: snapDownloadedAssetInfo.src === fallbackUrl
		};
	}

	// SNAP downloads a specific alias + version combination.
	// The runtime does not allow a retry of the same app asset if the only thing that has changed is the url.
	// Since we have no snap version we want to validate our primary url.
	logInformation(`Validating the primary asset url for the snap asset: ${primaryUrl}`);
	snapAssetInfo.alias = `${snapAlias}-validate-download`; // use a different alias for the validation download so that we can have different versions if needed without conflict with the actual snap asset alias

	snapAssetInfo.target = "NoOp"; // We don't want to actually run the snap asset during validation since we just want to check if the url is valid and the asset can be downloaded, so use a NoOp target that will not do anything if it is run for any reason during the validation process

	// Update asset info to target primary url
	snapAssetInfo.src = primaryUrl; // update the src to the primary url for the validation download
	snapAssetInfo.version = hashUrl(primaryUrl); // use the url hash as the version for the validation download so that if the url changes we will attempt to download again, but if the url is the same we will not attempt to download again since we have already validated it

	const validatedAppAssetPrimaryUrl = await fetchAppAsset(snapAssetInfo);
	let validatedAssetUrl: string | undefined;

	if (validatedAppAssetPrimaryUrl === undefined) {
		if (fallbackUrl) {
			// validate fallback url
			logInformation(`Validating the fallback asset url for the snap asset: ${fallbackUrl}`);
			snapAssetInfo.src = fallbackUrl; // update the src to the fallback url for the validation download
			snapAssetInfo.version = hashUrl(fallbackUrl); // use the url hash as the version for the validation download so that if the url changes we will attempt to download again, but if the url is the same we will not attempt to download again since we have already validated it
			const validatedAppAssetFallbackUrl = await fetchAppAsset(snapAssetInfo);

			if (validatedAppAssetFallbackUrl) {
				validatedAssetUrl = fallbackUrl;
			}
		}
	} else {
		validatedAssetUrl = primaryUrl;
	}

	if (validatedAssetUrl) {
		logInformation(
			`Successfully validated the url for the snap asset: ${validatedAssetUrl}. This url will be passed to Snap Options through the customSnapAssetSource setting.`
		);
		return {
			success: true,
			validatedUrl: validatedAssetUrl,
			isFallbackUrl: validatedAssetUrl === fallbackUrl
		};
	}
	return { success: false };
}

/**
 * Download and return app asset info for the provided app asset definition.
 * @param appAssetInfo The app asset definition to download.
 * @returns The app asset info if downloaded or found, otherwise undefined.
 */
async function fetchAppAsset(appAssetInfo: OpenFin.AppAssetInfo): Promise<OpenFin.AppAssetInfo | undefined> {
	const validatedAppAsset = await downloadAppAsset(appAssetInfo, {
		logger: customLogger,
		assetDownloadProgress: (progress: number, src: string, alias: string) => {
			// showing a difference as the download App Asset also logs the download progress using logInformation and logError through the custom logger.
			console.log(`Download progress for alias '${alias}' from '${src}': ${progress}%`);
		}
	});
	return validatedAppAsset;
}
