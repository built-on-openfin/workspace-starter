import { fin } from "@openfin/core";
import * as CSS from "csstype";
import {
  addEventListener as addNotificationEventListener,
  ContainerTemplateFragment,
  create,
  deregisterPlatform,
  getNotificationsCount,
  NotificationOptions,
  registerPlatform,
  TemplateFragment,
  TextTemplateFragment,
  toggleNotificationCenter,
  UpdatableNotificationOptions,
  update
} from "@openfin/workspace/notifications";

let loggingElement: HTMLElement;
const updatableNotifications = {};
let updatableNotificationTimer;
let activePlatform;

const platform = {
  id: "workspace-starter-notification-platform",
  icon: "http://localhost:8080/images/icon-dot.png",
  title: "Custom Platform"
};

window.addEventListener("DOMContentLoaded", async () => {
  console.log("Script loaded");

  await initDom();
  initListener();
});

async function initDom() {
  loggingElement = document.querySelector("#logging");

  const btnLoggingClear = document.querySelector("#btnLoggingClear");
  btnLoggingClear.addEventListener("click", () => {
    loggingElement.innerText = "";
  });

  loggingShowHide();

  const btnNotificationSimple = document.querySelector("#btnNotificationSimple");
  btnNotificationSimple.addEventListener("click", async () => showSimpleNotification());

  const btnNotificationActionable = document.querySelector("#btnNotificationActionable");
  btnNotificationActionable.addEventListener("click", async () => showActionableNotification());

  const btnNotificationForm = document.querySelector("#btnNotificationForm");
  btnNotificationForm.addEventListener("click", async () => showFormNotification());

  const btnNotificationUpdatable = document.querySelector("#btnNotificationUpdatable");
  btnNotificationUpdatable.addEventListener("click", async () => showUpdatableNotification());

  const btnNotificationCustom = document.querySelector("#btnNotificationCustom");
  btnNotificationCustom.addEventListener("click", async () => showCustomNotification());

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

  const btnNotificationsCenterToggle: HTMLButtonElement = document.querySelector("#btnNotificationsCenterToggle");
  btnNotificationsCenterToggle.addEventListener("click", async () => {
    try {
      btnNotificationsCenterToggle.disabled = true;
      await toggleNotificationCenter();
    } finally {
      btnNotificationsCenterToggle.disabled = false;
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

function initListener() {
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
    loggingAddEntry(`\tData: ${event?.result?.customData ? JSON.stringify(event.result.customData) : "None"}`);
    loggingAddEntry(`\tTask: ${event?.result?.task ?? "None"}`);
    loggingAddEntry(`Action: ${event.notification.id}`);
    console.log(event);
  });

  addNotificationEventListener("notification-form-submitted", (event) => {
    loggingAddEntry(`\tData: ${event?.form ? JSON.stringify(event.form) : "None"}`);
    loggingAddEntry(`Form: ${event.notification.id}`);
    console.log(event);
  });

  addNotificationEventListener("notifications-count-changed", (event) => {
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
    id: crypto.randomUUID(),
    platform: activePlatform
  };

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
    id: crypto.randomUUID(),
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
    d0_0: "50",
    d0_1: "150",
    d0_2: "250",
    d1_0: "550",
    d1_1: "650",
    d1_2: "750"
  };

  const notification: NotificationOptions = {
    title: "Custom Notification",
    toast: "transient",
    category: "default",
    template: "custom",
    id: crypto.randomUUID(),
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
                  ["d0_0", "d0_1", "d0_2"],
                  ["d1_0", "d1_1", "d1_2"]
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

  await create(notification);
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
    children: [createText(labelKey, 12), createText(valueKey, undefined, { color: "var(--openfin-ui-brandPrimary)" })]
  };
}

export function createTable(tableData: string[][]): TemplateFragment {
  const cells = [];
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
      cells.push(createText(tableData[row][col], 10, { padding: "3px", whiteSpace: "nowrap" }));
    }
  }

  return createContainer("row", cells, {
    display: "grid",
    gridTemplateColumns: colSpans.map((s) => `${s}fr`).join(" "),
    marginBottom: "10px",
    overflow: "auto"
  });
}
