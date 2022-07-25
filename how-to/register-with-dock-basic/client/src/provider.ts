import OpenFin from "@openfin/core";
import { CustomActionPayload, CustomDropdownItemActionPayload, getCurrentSync, init as workspacePlatformInit, WorkspacePlatformModule } from "@openfin/workspace-platform";
import { register, deregister, show, minimize } from "./dock";

async function init() {
    await workspacePlatformInit({
        browser: {},
        customActions: {
            "launch-google": async (payload: CustomActionPayload) => {
                await launchView("https://www.google.com");
            },
            "launch-bing": async (payload: CustomActionPayload) => {
                await launchView("https://www.bing.com");
            },
            "launch-tools": async (payload: CustomDropdownItemActionPayload) => {
                if (payload.customData === "twitter") {
                    await launchView("https://www.twitter.com");
                } else if (payload.customData === "facebook") {
                    await launchView("https://www.facebook.com");
                }
            }
        }
    });

    const registerDock = document.querySelector<HTMLButtonElement>("#register");
    const showDock = document.querySelector<HTMLButtonElement>("#show");
    const minimizeDock = document.querySelector<HTMLButtonElement>("#minimize");
    const deregisterDock = document.querySelector<HTMLButtonElement>("#deregister");

    showDock.disabled = true;
    minimizeDock.disabled = true;
    deregisterDock.disabled = true;
    registerDock.disabled = false;

    registerDock.addEventListener("click", async () => {
        await register();
        showDock.disabled = false;
        minimizeDock.disabled = false;
        deregisterDock.disabled = false;
        registerDock.disabled = true;
    });

    deregisterDock.addEventListener("click", async () => {
        showDock.disabled = true;
        minimizeDock.disabled = true;
        deregisterDock.disabled = true;
        registerDock.disabled = false;
        await deregister();
    });

    showDock.addEventListener("click", async () => {
        await show();
    });

    minimizeDock.addEventListener("click", async () => {
        await minimize();
    });
}

export async function launchView(
	view: OpenFin.PlatformViewCreationOptions | string,
	targetIdentity?: OpenFin.Identity
) {
    const platform: WorkspacePlatformModule = getCurrentSync();

	let viewOptions: OpenFin.PlatformViewCreationOptions;
	if (typeof view === "string") {
		viewOptions = { url: view, target: null };
	} else {
		viewOptions = view;
	}

    return platform.createView(viewOptions, targetIdentity);
}


window.addEventListener("DOMContentLoaded", async () => {
    await init();
});
