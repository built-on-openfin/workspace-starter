import {
	ActionBodyClickType,
	VERSION,
	addEventListener as addNotificationEventListener,
	create,
	deregisterPlatform,
	getNotificationsCount,
	hide as hideNotificationCenter,
	provider,
	registerPlatform,
	show as showNotificationCenter,
	update,
	type NotificationOptions,
	type TemplateMarkdown,
	type UpdatableNotificationOptions,
	IndicatorColor
} from "@openfin/workspace/notifications";

const PLATFORM_ID = "use-notifications";
const PLATFORM_ICON = "http://localhost:8080/images/icon-dot.png";
const PLATFORM_TITLE = "Use Notifications";

const NOTIFICATION_SOUND_URL = "http://localhost:8080/assets/notification.mp3";

// Keep track of notifications we are updating
const updatableNotifications: { [id: string]: TemplateMarkdown & { customData: { count: number } } } = {};
let updatableNotificationTimer: number | undefined;

let loggingElement: HTMLElement | null;
let codeElement: HTMLTextAreaElement | null;

let activePlatform: string | undefined;
let connected: boolean = false;
let connectedVersion: string | null;
let statusIntervalId: number | undefined;
let lastConnectionStatus: boolean | undefined;

/**
 * Wait for the DOM to have been loaded before we connect the UI elements and listeners.
 */
window.addEventListener("DOMContentLoaded", async () => {
	await initializeDom();
	await initializeListeners();
});

/**
 * Initialize the DOM elements.
 */
async function initializeDom() {
	loggingElement = document.querySelector("#logging");
	codeElement = document.querySelector("#code");
	const loggingContainer: HTMLDivElement | null = document.querySelector("#logging-container");
	const codeContainer: HTMLDivElement | null = document.querySelector("#code-container");

	if (!codeElement || !loggingElement || !loggingContainer || !codeContainer) {
		return;
	}

	loggingAddEntry(`Library Version: ${VERSION}`);

	const btnLoggingClear = document.querySelector("#btnLoggingClear");
	if (btnLoggingClear) {
		btnLoggingClear.addEventListener("click", () => {
			if (loggingElement) {
				loggingElement.textContent = "";
			}
		});
	}

	const btnCodeCopy = document.querySelector("#btnCodeCopy");
	if (btnCodeCopy) {
		btnCodeCopy.addEventListener("click", async () => {
			if (codeElement) {
				await fin.Clipboard.writeText({ data: codeElement.value });
			}
		});
	}

	const btnCodeNotification = document.querySelector("#btnCodeNotification");
	if (btnCodeNotification) {
		btnCodeNotification.addEventListener("click", async () => {
			try {
				if (codeElement) {
					const notificationOptions: NotificationOptions = JSON.parse(codeElement.value);
					notificationOptions.id = randomUUID();
					codeShowExample(notificationOptions);
					await create(notificationOptions);
				}
			} catch {}
		});
	}

	codeElement.addEventListener("input", () => {
		if (codeElement) {
			try {
				JSON.parse(codeElement.value);
				codeElement.classList.remove("error");
			} catch {
				codeElement.classList.add("error");
			}
		}
	});

	codeContainer.style.display = "none";

	const btnPlatformRegister = document.querySelector("#btnPlatformRegister");
	if (btnPlatformRegister) {
		btnPlatformRegister.addEventListener("click", async () => {
			await registerPlatform({
				id: PLATFORM_ID,
				icon: PLATFORM_ICON,
				title: PLATFORM_TITLE
			});
			loggingAddEntry("Platform registered");
			activePlatform = PLATFORM_ID;
		});
	}

	const btnPlatformDeregister = document.querySelector("#btnPlatformDeregister");
	if (btnPlatformDeregister) {
		btnPlatformDeregister.addEventListener("click", async () => {
			await deregisterPlatform(PLATFORM_ID);
			loggingAddEntry("Platform deregistered");
			activePlatform = undefined;
		});
	}

	const btnViewLogging = document.querySelector("#btnViewLogging");
	if (btnViewLogging) {
		btnViewLogging.addEventListener("click", () => {
			loggingContainer.style.display = "flex";
			codeContainer.style.display = "none";
		});
	}

	const btnViewCode = document.querySelector("#btnViewCode");
	if (btnViewCode) {
		btnViewCode.addEventListener("click", () => {
			loggingContainer.style.display = "none";
			codeContainer.style.display = "flex";
		});
	}

	const btnNotificationSimple = document.querySelector("#btnNotificationSimple");
	if (btnNotificationSimple) {
		btnNotificationSimple.addEventListener("click", async () => showSimpleNotification());
	}

	const btnNotificationBodyDismiss = document.querySelector("#btnNotificationBodyDismiss");
	if (btnNotificationBodyDismiss) {
		btnNotificationBodyDismiss.addEventListener("click", async () => showSimpleNotificationBodyDismiss());
	}

	const btnNotificationBodyDismissAction = document.querySelector("#btnNotificationBodyDismissAction");
	if (btnNotificationBodyDismissAction) {
		btnNotificationBodyDismissAction.addEventListener("click", async () =>
			showSimpleNotificationBodyDismissAction()
		);
	}

	const btnNotificationActionable = document.querySelector("#btnNotificationActionable");
	if (btnNotificationActionable) {
		btnNotificationActionable.addEventListener("click", async () => showActionableNotification());
	}

	const btnNotificationForm = document.querySelector("#btnNotificationForm");
	if (btnNotificationForm) {
		btnNotificationForm.addEventListener("click", async () => showFormNotification());
	}

	const btnNotificationUpdatable = document.querySelector("#btnNotificationUpdatable");
	if (btnNotificationUpdatable) {
		btnNotificationUpdatable.addEventListener("click", async () => showUpdatableNotification());
	}

	const btnNotificationCustom = document.querySelector("#btnNotificationCustom");
	if (btnNotificationCustom) {
		btnNotificationCustom.addEventListener("click", async () => showCustomNotification());
	}

	const btnNotificationWithSound = document.querySelector("#btnNotificationWithSound");
	if (btnNotificationWithSound) {
		btnNotificationWithSound.addEventListener("click", async () =>
			showSoundNotification(NOTIFICATION_SOUND_URL)
		);
	}

	const btnNotificationWithIndicator = document.querySelector("#btnNotificationWithIndicator");
	if (btnNotificationWithIndicator) {
		btnNotificationWithIndicator.addEventListener("click", async () => showIndicatorNotification());
	}

	const btnNotificationsCenterShow = document.querySelector<HTMLButtonElement>("#btnNotificationsCenterShow");
	if (btnNotificationsCenterShow) {
		btnNotificationsCenterShow.addEventListener("click", async () => {
			try {
				btnNotificationsCenterShow.disabled = true;
				await showNotificationCenter();
			} catch (err) {
				loggingAddEntry(`${err}`);
			} finally {
				btnNotificationsCenterShow.disabled = false;
			}
		});
	}

	const btnNotificationsCenterHide = document.querySelector<HTMLButtonElement>("#btnNotificationsCenterHide");
	if (btnNotificationsCenterHide) {
		btnNotificationsCenterHide.addEventListener("click", async () => {
			try {
				btnNotificationsCenterHide.disabled = true;
				await hideNotificationCenter();
			} catch (err) {
				loggingAddEntry(`${err}`);
			} finally {
				btnNotificationsCenterHide.disabled = false;
			}
		});
	}

	const btnNotificationStudioOpen = document.querySelector<HTMLButtonElement>("#btnNotificationStudioOpen");
	if (btnNotificationStudioOpen) {
		btnNotificationStudioOpen.addEventListener("click", async () => {
			try {
				btnNotificationStudioOpen.disabled = true;
				await fin.Application.startFromManifest("https://cdn.openfin.co/studio/notification/app.json");
			} finally {
				btnNotificationStudioOpen.disabled = false;
			}
		});
	}

	showNotificationCount(await getNotificationsCount());
}

/**
 * Initialize the listeners for the events from the notification center.
 */
async function initializeListeners() {
	// Listen for new notifications being created
	addNotificationEventListener("notification-created", (event) => {
		loggingAddEntry(`Created: ${event.notification.id}`);
	});

	addNotificationEventListener("notification-closed", (event) => {
		loggingAddEntry(`Closed: ${event.notification.id}`);

		if (updatableNotifications[event.notification.id]) {
			delete updatableNotifications[event.notification.id];
			if (Object.keys(updatableNotifications).length === 0) {
				window.clearInterval(updatableNotificationTimer);
				updatableNotificationTimer = undefined;
			}
		}
	});

	addNotificationEventListener("notification-action", (event) => {
		if (event?.result?.BODY_CLICK === "dismiss_event") {
			if (event.notification?.customData?.action) {
				loggingAddEntry(
					`\tData: ${
						event?.notification?.customData ? JSON.stringify(event.notification.customData) : "None"
					}`
				);
			} else {
				loggingAddEntry("\tNo action");
			}
			loggingAddEntry("\tBody click dismiss");
		} else {
			loggingAddEntry(
				`\tData: ${event?.result?.customData ? JSON.stringify(event.result.customData) : "None"}`
			);
			loggingAddEntry(`\tTask: ${event?.result?.task ?? "None"}`);
			loggingAddEntry(`Action: ${event.notification.id}`);
		}

		console.log(event);
	});

	addNotificationEventListener("notification-toast-dismissed", (event) => {
		loggingAddEntry(`Toast Dismissed: ${event.notification.id}`);
	});

	addNotificationEventListener("notification-form-submitted", (event) => {
		loggingAddEntry(`\tData: ${event?.form ? JSON.stringify(event.form) : "None"}`);
		loggingAddEntry(`Form: ${event.notification.id}`);
		console.log(event);
	});

	addNotificationEventListener("notifications-count-changed", (event) => {
		showNotificationCount(event.count);
	});

	addConnectionChangedEventListener((status) => {
		if (status.connected !== connected) {
			connected = status.connected;
			connectedVersion = status.version;
			updateConnectedState();
		}
	});
}

/**
 * Add a new entry in to the logging window.
 * @param entry The entry to add.
 */
function loggingAddEntry(entry: string): void {
	if (loggingElement) {
		loggingElement.textContent = `${entry}\n\n${loggingElement.textContent}`;
	}
}

/**
 * Update the code example with the notification.
 * @param notificationOptions The options to show in the code example.
 */
function codeShowExample(notificationOptions: NotificationOptions): void {
	if (codeElement) {
		codeElement.value = JSON.stringify(notificationOptions, undefined, "  ");
	}
}

/**
 * Update the connected state on the view.
 */
function updateConnectedState(): void {
	loggingAddEntry(`Is Connected: ${connected}`);
	if (connected) {
		loggingAddEntry(`Connected Version: ${connectedVersion}`);
	}

	const buttons = document.querySelectorAll("button");
	for (const button of buttons) {
		button.disabled = !connected;
	}
}

/**
 * Update the notification count on the view.
 * @param count The new count to display.
 */
function showNotificationCount(count: number): void {
	const btnNotificationsCenterShow = document.querySelector("#btnNotificationsCenterShow");
	if (btnNotificationsCenterShow) {
		btnNotificationsCenterShow.textContent = `Show [${count}]`;
	}
}

/**
 * Display a very basic simple notification.
 */
async function showSimpleNotification() {
	const notification: NotificationOptions = {
		title: "Simple Notification",
		body: "This is a simple notification",
		toast: "transient",
		category: "default",
		template: "markdown",
		id: randomUUID(),
		platform: activePlatform
	};

	codeShowExample(notification);
	await create(notification);
}

/**
 * Show a notification which can be dismissed by clicking on the body.
 */
async function showSimpleNotificationBodyDismiss() {
	const notification: NotificationOptions = {
		title: "Simple Notification",
		body: "This is a simple notification that be dismissed by clicking the body",
		toast: "transient",
		category: "default",
		template: "markdown",
		id: randomUUID(),
		platform: activePlatform,
		onSelect: { BODY_CLICK: ActionBodyClickType.DISMISS_EVENT }
	};

	codeShowExample(notification);
	await create(notification);
}

/**
 * Show a notification which can be dismissed by clicking on the body and then trigger a custom action.
 */
async function showSimpleNotificationBodyDismissAction() {
	const notification: NotificationOptions = {
		title: "Simple Notification",
		body: "This is a simple notification that be dismissed by clicking the body and trigger custom action",
		toast: "transient",
		category: "default",
		template: "markdown",
		id: randomUUID(),
		platform: activePlatform,
		onSelect: { BODY_CLICK: ActionBodyClickType.DISMISS_EVENT },
		customData: {
			action: "custom-action",
			data: {
				message: "Body click custom action"
			}
		}
	};

	codeShowExample(notification);
	await create(notification);
}

/**
 * Show a notification which has action buttons, the events returned will
 * be handled the the notification-action listener.
 */
async function showActionableNotification() {
	const notification: NotificationOptions = {
		title: "Actionable Notification",
		body: "This is a notification that has an action",
		toast: "transient",
		category: "default",
		template: "markdown",
		id: randomUUID(),
		platform: activePlatform,
		buttons: [
			{
				title: "Acknowledged",
				type: "button",
				cta: true,
				onClick: {
					task: "acknowledge-task",
					customData: {
						message: "This is the response data"
					}
				}
			},
			{
				title: "Cancel",
				type: "button"
			}
		]
	};

	codeShowExample(notification);
	await create(notification);
}

/**
 * Show a notification which has form fields, the data from the form will
 * be returned to the notification-form-submitted listener.
 */
async function showFormNotification() {
	const notification: NotificationOptions = {
		title: "Form Notification",
		body: "This is a notification that has form data",
		toast: "transient",
		category: "default",
		template: "markdown",
		id: randomUUID(),
		platform: activePlatform,
		form: [
			{
				key: "amount",
				label: "Amount",
				type: "number",
				widget: {
					type: "Number",
					max: 100,
					min: 1
				},
				validation: {
					min: {
						arg: 1,
						invalidMessage: "Must be at least 1"
					},
					max: {
						arg: 100,
						invalidMessage: "Cannot be more than 100"
					},
					required: {
						arg: true
					}
				}
			}
		],
		buttons: [
			{
				title: "Save",
				type: "button",
				cta: true,
				submit: true
			},
			{
				title: "Cancel",
				type: "button"
			}
		]
	};

	codeShowExample(notification);
	await create(notification);
}

/**
 * Show a notification that can be updated.
 */
async function showUpdatableNotification() {
	const id = randomUUID();
	const notification: NotificationOptions & { customData: { count: number } } = {
		title: "Updatable Notification",
		body: "This is an updatable notification",
		toast: "transient",
		category: "default",
		template: "markdown",
		customData: {
			count: 0
		},
		id,
		platform: activePlatform
	};

	if (Object.keys(updatableNotifications).length === 0) {
		updatableNotificationTimer = window.setInterval(async () => {
			for (const notificationId in updatableNotifications) {
				updatableNotifications[notificationId].customData.count++;
				const notificationUpdate: UpdatableNotificationOptions = {
					template: "markdown",
					body: `This is an updatable notification ${updatableNotifications[notificationId].customData.count}`,
					id: notificationId
				};

				await update(notificationUpdate);
			}
		}, 1000);
	}

	codeShowExample(notification);
	await create(notification);

	updatableNotifications[id] = notification;
}

/**
 * Show a notification with custom content.
 */
async function showCustomNotification() {
	const notification: NotificationOptions = {
		title: "Custom Notification",
		toast: "transient",
		category: "default",
		template: "custom",
		id: randomUUID(),
		platform: activePlatform,
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
								gap: "10px"
							},
							children: [
								{
									type: "text",
									dataKey: "subTitle",
									style: {
										fontSize: "12px",
										fontWeight: "bold"
									}
								},
								{
									type: "container",
									style: {
										display: "flex",
										flexDirection: "column",
										marginBottom: "10px"
									},
									children: [
										{
											type: "text",
											dataKey: "firstValueTitle",
											style: {
												fontSize: "12px"
											}
										},
										{
											type: "text",
											dataKey: "firstValue",
											style: {
												fontSize: "14px",
												color: "var(--openfin-ui-brandPrimary)"
											}
										}
									]
								},
								{
									type: "container",
									style: {
										display: "flex",
										flexDirection: "column",
										marginBottom: "10px"
									},
									children: [
										{
											type: "text",
											dataKey: "secondValueTitle",
											style: {
												fontSize: "12px"
											}
										},
										{
											type: "text",
											dataKey: "secondValue",
											style: {
												fontSize: "14px",
												color: "var(--openfin-ui-brandPrimary)"
											}
										}
									]
								},
								{
									type: "container",
									style: {
										display: "grid",
										flexDirection: "row",
										gridTemplateColumns: "1fr 1fr 1fr",
										marginBottom: "10px",
										overflow: "auto"
									},
									children: [
										{
											type: "text",
											dataKey: "c0",
											style: {
												fontSize: "10px",
												marginBottom: "10px",
												padding: "3px",
												whiteSpace: "nowrap",
												fontWeight: "bold",
												backgroundColor: "var(--openfin-ui-brandPrimary)"
											}
										},
										{
											type: "text",
											dataKey: "c1",
											style: {
												fontSize: "10px",
												marginBottom: "10px",
												padding: "3px",
												whiteSpace: "nowrap",
												fontWeight: "bold",
												backgroundColor: "var(--openfin-ui-brandPrimary)"
											}
										},
										{
											type: "text",
											dataKey: "c2",
											style: {
												fontSize: "10px",
												marginBottom: "10px",
												padding: "3px",
												whiteSpace: "nowrap",
												fontWeight: "bold",
												backgroundColor: "var(--openfin-ui-brandPrimary)"
											}
										},
										{
											type: "text",
											dataKey: "d00",
											style: {
												fontSize: "10px",
												padding: "3px",
												whiteSpace: "nowrap"
											}
										},
										{
											type: "text",
											dataKey: "d01",
											style: {
												fontSize: "10px",
												padding: "3px",
												whiteSpace: "nowrap"
											}
										},
										{
											type: "text",
											dataKey: "d02",
											style: {
												fontSize: "10px",
												padding: "3px",
												whiteSpace: "nowrap"
											}
										},
										{
											type: "text",
											dataKey: "d10",
											style: {
												fontSize: "10px",
												padding: "3px",
												whiteSpace: "nowrap"
											}
										},
										{
											type: "text",
											dataKey: "d11",
											style: {
												fontSize: "10px",
												padding: "3px",
												whiteSpace: "nowrap"
											}
										},
										{
											type: "text",
											dataKey: "d12",
											style: {
												fontSize: "10px",
												padding: "3px",
												whiteSpace: "nowrap"
											}
										}
									]
								}
							]
						}
					}
				]
			}
		},
		templateData: {
			subTitle: "Sub Title 🚀",
			firstValueTitle: "First Value",
			firstValue: "100",
			secondValueTitle: "Second Value",
			secondValue: "200",
			c0: "Col 1",
			c1: "Col 2",
			c2: "Col 3",
			d00: "50",
			d01: "150",
			d02: "250",
			d10: "550",
			d11: "650",
			d12: "750"
		}
	};

	codeShowExample(notification);
	await create(notification);
}

/**
 * Show a notification and play a sound with it.
 * @param notificationSoundUrl The url of the sounds file to play.
 */
async function showSoundNotification(notificationSoundUrl: string) {
	const notification: NotificationOptions = {
		title: "Sound Notification",
		body: "This is a notification with sound 🔉",
		toast: "transient",
		category: "default",
		template: "markdown",
		id: randomUUID(),
		platform: activePlatform
	};

	codeShowExample(notification);
	await create(notification);
	await playNotification(notificationSoundUrl);
}

/**
 * Display a notification that has an indicator bar on the left.
 */
async function showIndicatorNotification() {
	const notification: NotificationOptions = {
		title: "Indicator Notification",
		toast: "transient",
		indicator: {
			text: "Limit"
		},
		category: "default",
		template: "custom",
		id: randomUUID(),
		platform: activePlatform,
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
								gap: "10px"
							},
							children: [
								{
									type: "text",
									dataKey: "content"
								}
							]
						}
					}
				]
			},
			indicator: {
				align: "left",
				color: IndicatorColor.RED
			}
		},
		templateData: {
			content: "This is a custom notification with a red indicator showing to the left of the toast"
		}
	};

	codeShowExample(notification);
	await create(notification);
}

/**
 * Play a sound.
 * @param notificationSoundUrl The url of the notification to play.
 */
async function playNotification(notificationSoundUrl: string) {
	const audio = new Audio(notificationSoundUrl);
	await audio.play();
}

/**
 * Add a listener which checks for the connection changed event.
 * @param callback The callback to call when the connection state changes.
 */
function addConnectionChangedEventListener(callback: (status: provider.ProviderStatus) => void) {
	if (statusIntervalId === undefined) {
		statusIntervalId = window.setInterval(async () => {
			const status = await provider.getStatus();
			if (status.connected !== lastConnectionStatus) {
				lastConnectionStatus = status.connected;
				callback(status);
			}
		}, 1000);
	}
}

/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
function randomUUID(): string {
	if ("randomUUID" in window.crypto) {
		// eslint-disable-next-line no-restricted-syntax
		return window.crypto.randomUUID();
	}
	// Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
	// we are still using window.crypto.getRandomValues which is always available
	// https://stackoverflow.com/a/2117523/2800218
	const getRandomHex = (c: string): string =>
		// eslint-disable-next-line no-bitwise, no-mixed-operators
		(Number(c) ^ (window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))).toString(
			16
		);
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}
