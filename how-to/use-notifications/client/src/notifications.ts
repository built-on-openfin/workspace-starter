import { getCurrentSync } from '@openfin/workspace-platform';
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

    const btnNotificationCenterToggle = document.querySelector("#btnNotificationCenterToggle");
    btnNotificationCenterToggle.addEventListener("click", async () => toggleNotificationCenter());

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
        loggingAddEntry(`Created ${event.notification.id}`);
    });

    addNotificationEventListener("notification-closed", event => {
        loggingAddEntry(`Closed ${event.notification.id}`);
    });

    addNotificationEventListener("notification-action", event => {
        loggingAddEntry(`Action ${event.notification.id}`);
    });

    addNotificationEventListener("notification-form-submitted", event => {
        loggingAddEntry(`Action ${event.notification.id}`);
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
    loggingElement.innerText = `${entry}\n\n` + loggingElement.innerText;
    loggingShowHide();
}

function showNotificationCount(count: number): void {
    const notificationCountElement: HTMLElement = document.querySelector("#notificationCount");
    notificationCountElement.innerText = `Notification Count: ${count}`;
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

