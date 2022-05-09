import {
    addEventListener as addNotificationEventListener,
    create,
    getNotificationsCount,
    toggleNotificationCenter,
    NotificationOptions,
} from 'openfin-notifications';
import { fin } from "@openfin/core";

let loggingElement: HTMLElement;

window.addEventListener('DOMContentLoaded', async () => {
    console.log("Script loaded");

    await initDom();
    initListener();
});

async function initDom() {
    loggingElement = document.querySelector("#logging");

    const btnLoggingClear = document.querySelector("#btnLoggingClear");
    btnLoggingClear.addEventListener("click", () => {
        loggingElement.innerText = "";
    })

    loggingShowHide();

    const btnNotificationSimple = document.querySelector("#btnNotificationSimple");
    btnNotificationSimple.addEventListener("click", async () => showSimpleNotification())

    const btnNotificationActionable = document.querySelector("#btnNotificationActionable");
    btnNotificationActionable.addEventListener("click", async () => showActionableNotification())

    const btnNotificationForm = document.querySelector("#btnNotificationForm");
    btnNotificationForm.addEventListener("click", async () => showFormNotification())

    const btnNotificationsCenterToggle = document.querySelector("#btnNotificationsCenterToggle");
    btnNotificationsCenterToggle.addEventListener("click", async () => toggleNotificationCenter());

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

function initListener() {
    addNotificationEventListener("notification-created", event => {
        loggingAddEntry(`Created: ${event.notification.id}`);
    });

    addNotificationEventListener("notification-closed", event => {
        loggingAddEntry(`Closed: ${event.notification.id}`);
    });

    addNotificationEventListener("notification-action", event => {
        loggingAddEntry(`\tData: ${event?.result?.customData ? JSON.stringify(event.result.customData) : "None"}`);
        loggingAddEntry(`\tTask: ${event?.result?.task ?? "None"}`);
        loggingAddEntry(`Action: ${event.notification.id}`);
        console.log(event);
    });

    addNotificationEventListener("notification-form-submitted", event => {
        loggingAddEntry(`\tData: ${event?.form ? JSON.stringify(event.form) : "None"}`);
        loggingAddEntry(`Form: ${event.notification.id}`);
        console.log(event)
    });

    addNotificationEventListener("notifications-count-changed", event => {
        showNotificationCount(event.count);
    });
}

function loggingShowHide(): void {
    const loggingContainer: HTMLElement = document.querySelector("#logging-container");
    loggingContainer.style.display = loggingElement.innerText.length === 0 ? "none" : "flex";
}

function loggingAddEntry(entry: string): void {
    loggingElement.innerHTML = `${entry}\n\n` + loggingElement.innerHTML;
    loggingShowHide();
}

function showNotificationCount(count: number): void {
    const btnNotificationsCenterToggle: HTMLElement = document.querySelector("#btnNotificationsCenterToggle");
    btnNotificationsCenterToggle.innerText = `Notifications Center [${count}]`;
}

async function showSimpleNotification() {
    const notification: NotificationOptions = {
        title: "Simple Notification",
        body: "This is a simple notification",
        toast: "transient",
        category: "default",
        template: "markdown",
        id: crypto.randomUUID()
    }

    await create(notification);
}

async function showActionableNotification() {
    const notification: NotificationOptions = {
        title: "Actionable Notification",
        body: "This is a notification that has an action",
        toast: "transient",
        category: "default",
        template: "markdown",
        id: crypto.randomUUID(),
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
    }

    await create(notification);
}

async function showFormNotification() {
    const notification: NotificationOptions = {
        title: "Form Notification",
        body: "This is a notification that has form data",
        toast: "transient",
        category: "default",
        template: "markdown",
        id: crypto.randomUUID(),
        form: [
            {
                key: 'amount',
                label: 'Amount',
                type: 'number',
                widget: {
                    type: 'Number',
                    max: 100,
                    min: 1
                },
                validation: {
                    min: {
                        arg: 1,
                        invalidMessage: 'Must be at least 1'
                    },
                    max: {
                        arg: 100,
                        invalidMessage: 'Cannot be more than 100'
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
    }

    await create(notification);
}

