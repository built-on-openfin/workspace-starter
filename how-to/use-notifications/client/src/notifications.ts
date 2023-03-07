import type OpenFin from "@openfin/core";
import {
	ActionBodyClickType,
	addEventListener as addNotificationEventListener,
	ContainerTemplateFragment,
	create,
	deregisterPlatform,
	getNotificationsCount,
	hide as hideNotificationCenter,
	NotificationOptions,
	registerPlatform,
	show as showNotificationCenter,
	TemplateFragment,
	TextTemplateFragment,
	UpdatableNotificationOptions,
	update,
	VERSION
} from "@openfin/workspace/notifications";
import type * as CSS from "csstype";
import { addEventListener as providerEventListener } from "./provider-event-listener";
import { randomUUID } from "./uuid";

let loggingElement: HTMLElement;
let codeElement: HTMLTextAreaElement;
const updatableNotifications = {};
let updatableNotificationTimer: NodeJS.Timer;
let activePlatform;
let connected = false;
let connectedVersion = "";

window.addEventListener("DOMContentLoaded", async () => {
	console.log("Script loaded");

	await initDom();
	await initListener();
});

async function initDom() {
	loggingElement = document.querySelector("#logging");
	codeElement = document.querySelector("#code");

	const loggingContainer: HTMLDivElement = document.querySelector("#logging-container");
	const codeContainer: HTMLDivElement = document.querySelector("#code-container");

	loggingAddEntry(`Library Version: ${VERSION}`);

	const btnLoggingClear = document.querySelector("#btnLoggingClear");
	btnLoggingClear.addEventListener("click", () => {
		loggingElement.textContent = "";
	});

	const btnCodeCopy = document.querySelector("#btnCodeCopy");
	btnCodeCopy.addEventListener("click", async () => {
		await fin.Clipboard.writeText({ data: codeElement.value });
	});

	const btnCodeNotification = document.querySelector("#btnCodeNotification");
	btnCodeNotification.addEventListener("click", async () => {
		try {
			const notificationOptions: NotificationOptions = JSON.parse(codeElement.value);
			notificationOptions.id = randomUUID();
			codeShowExample(notificationOptions);
			await create(notificationOptions);
		} catch {}
	});

	codeElement.addEventListener("input", () => {
		try {
			JSON.parse(codeElement.value);
			codeElement.classList.remove("error");
		} catch {
			codeElement.classList.add("error");
		}
	});

	codeContainer.style.display = "none";

	const btnViewLogging = document.querySelector("#btnViewLogging");
	btnViewLogging.addEventListener("click", () => {
		loggingContainer.style.display = "flex";
		codeContainer.style.display = "none";
	});

	const btnViewCode = document.querySelector("#btnViewCode");
	btnViewCode.addEventListener("click", () => {
		loggingContainer.style.display = "none";
		codeContainer.style.display = "flex";
	});

	const customSettings = await getCustomSettings();

	const platform = {
		id: "workspace-starter-notification-platform",
		icon: customSettings.customProviderIcon,
		title: "Custom Platform"
	};

	const btnNotificationSimple = document.querySelector("#btnNotificationSimple");
	btnNotificationSimple.addEventListener("click", async () => showSimpleNotification());

	const btnNotificationBodyDismiss = document.querySelector("#btnNotificationBodyDismiss");
	btnNotificationBodyDismiss.addEventListener("click", async () => showSimpleNotificationBodyDismiss());

	const btnNotificationBodyDismissAction = document.querySelector("#btnNotificationBodyDismissAction");
	btnNotificationBodyDismissAction.addEventListener("click", async () =>
		showSimpleNotificationBodyDismissAction()
	);

	const btnNotificationActionable = document.querySelector("#btnNotificationActionable");
	btnNotificationActionable.addEventListener("click", async () => showActionableNotification());

	const btnNotificationForm = document.querySelector("#btnNotificationForm");
	btnNotificationForm.addEventListener("click", async () => showFormNotification());

	const btnNotificationUpdatable = document.querySelector("#btnNotificationUpdatable");
	btnNotificationUpdatable.addEventListener("click", async () => showUpdatableNotification());

	const btnNotificationCustom = document.querySelector("#btnNotificationCustom");
	btnNotificationCustom.addEventListener("click", async () => showCustomNotification());

	const btnNotificationWithSound = document.querySelector("#btnNotificationWithSound");
	btnNotificationWithSound.addEventListener("click", async () =>
		showSoundNotification(customSettings.notificationSoundUrl)
	);

	const btnPlatformRegister = document.querySelector("#btnPlatformRegister");
	btnPlatformRegister.addEventListener("click", async () => {
		await registerPlatform(platform);
		loggingAddEntry("Platform registered");
		activePlatform = platform.id;
	});

	const btnPlatformDeregister = document.querySelector("#btnPlatformDeregister");
	btnPlatformDeregister.addEventListener("click", async () => {
		await deregisterPlatform(platform.id);
		loggingAddEntry("Platform deregistered");
		activePlatform = undefined;
	});

	const btnNotificationsCenterShow: HTMLButtonElement = document.querySelector("#btnNotificationsCenterShow");
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

	const btnNotificationsCenterHide: HTMLButtonElement = document.querySelector("#btnNotificationsCenterHide");
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

	const btnNotificationStudioOpen: HTMLButtonElement = document.querySelector("#btnNotificationStudioOpen");
	btnNotificationStudioOpen.addEventListener("click", async () => {
		try {
			btnNotificationStudioOpen.disabled = true;
			await fin.Application.startFromManifest("https://cdn.openfin.co/studio/notification/app.json");
		} finally {
			btnNotificationStudioOpen.disabled = false;
		}
	});

	showNotificationCount(await getNotificationsCount());
}

async function initListener() {
	addNotificationEventListener("notification-created", (event) => {
		loggingAddEntry(`Created: ${event.notification.id}`);
	});

	addNotificationEventListener("notification-closed", (event) => {
		loggingAddEntry(`Closed: ${event.notification.id}`);

		if (updatableNotifications[event.notification.id]) {
			delete updatableNotifications[event.notification.id];
			if (Object.keys(updatableNotifications).length === 0) {
				clearInterval(updatableNotificationTimer);
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

	providerEventListener("connection-changed", (status) => {
		if (status.connected !== connected) {
			connected = status.connected;
			connectedVersion = status.version;
			updateConnectedState();
		}
	});
}

function loggingAddEntry(entry: string): void {
	loggingElement.textContent = `${entry}\n\n${loggingElement.textContent}`;
}

function codeShowExample(notificationOptions: NotificationOptions): void {
	codeElement.value = JSON.stringify(notificationOptions, undefined, "  ");
}

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

function showNotificationCount(count: number): void {
	const btnNotificationsCenterShow: HTMLElement = document.querySelector("#btnNotificationsCenterShow");
	btnNotificationsCenterShow.textContent = `Show [${count}]`;
}

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

async function showUpdatableNotification() {
	const notification: NotificationOptions = {
		title: "Updatable Notification",
		body: "This is an updatable notification",
		toast: "transient",
		category: "default",
		template: "markdown",
		customData: {
			count: 0
		},
		id: randomUUID(),
		platform: activePlatform
	};

	if (Object.keys(updatableNotifications).length === 0) {
		updatableNotificationTimer = setInterval(async () => {
			for (const id in updatableNotifications) {
				updatableNotifications[id].customData.count++;
				const notificationUpdate: UpdatableNotificationOptions = {
					template: "markdown",
					body: `This is an updatable notification ${updatableNotifications[id].customData.count}`,
					id
				};

				await update(notificationUpdate);
			}
		}, 1000);
	}

	codeShowExample(notification);
	await create(notification);

	updatableNotifications[notification.id] = notification;
}

async function showCustomNotification() {
	const templateData = {
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
	};

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
						layout: createContainer(
							"column",
							[
								createText("subTitle", 12, { fontWeight: "bold" }),
								createLabelledValue("firstValueTitle", "firstValue"),
								createLabelledValue("secondValueTitle", "secondValue"),
								createTable([
									["c0", "c1", "c2"],
									["d00", "d01", "d02"],
									["d10", "d11", "d12"]
								])
							],
							{
								gap: "10px"
							}
						)
					}
				]
			}
		},
		templateData
	};

	codeShowExample(notification);
	await create(notification);
}

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

async function playNotification(notificationSoundUrl: string) {
	const audio = new Audio(notificationSoundUrl);
	await audio.play();
}

function createContainer(
	containerType: "column" | "row",
	children: TemplateFragment[],
	style?: CSS.Properties
): ContainerTemplateFragment {
	return {
		type: "container",
		style: {
			display: "flex",
			flexDirection: containerType,
			...style
		},
		children
	};
}

function createText(dataKey: string, fontSize: number = 14, style?: CSS.Properties): TextTemplateFragment {
	return {
		type: "text",
		dataKey,
		style: {
			fontSize: `${fontSize ?? 14}px`,
			...style
		}
	};
}

export function createLabelledValue(
	labelKey: string,
	valueKey: string,
	style?: Record<string, string | number>
): ContainerTemplateFragment {
	return {
		type: "container",
		style: {
			display: "flex",
			flexDirection: "column",
			marginBottom: "10px",
			...style
		},
		children: [
			createText(labelKey, 12),
			createText(valueKey, undefined, {
				color: "var(--openfin-ui-brandPrimary)"
			})
		]
	};
}

export function createTable(tableData: string[][]): TemplateFragment {
	const cells: TemplateFragment[] = [];
	const colSpans = [];
	for (let col = 0; col < tableData[0].length; col++) {
		cells.push(
			createText(tableData[0][col], 10, {
				marginBottom: "10px",
				padding: "3px",
				whiteSpace: "nowrap",
				fontWeight: "bold",
				backgroundColor: "var(--openfin-ui-brandPrimary)"
			})
		);

		colSpans.push(1);
	}

	for (let row = 1; row < tableData.length; row++) {
		for (let col = 0; col < tableData[0].length; col++) {
			cells.push(
				createText(tableData[row][col], 10, {
					padding: "3px",
					whiteSpace: "nowrap"
				})
			);
		}
	}

	return createContainer("row", cells, {
		display: "grid",
		gridTemplateColumns: colSpans.map((s) => `${s}fr`).join(" "),
		marginBottom: "10px",
		overflow: "auto"
	});
}

async function getCustomSettings() {
	const app = await fin.Application.getCurrent();
	const manifest: OpenFin.Manifest & {
		customSettings?: {
			customProviderIcon: string;
			notificationSoundUrl: string;
		};
	} = await app.getManifest();

	return manifest.customSettings;
}
