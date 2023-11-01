import type OpenFin from "@openfin/core";
import { validateIdToken } from "@openfin/openid-connect";
import type { CustomSettings } from "./shapes";

window.addEventListener("DOMContentLoaded", async () => {
	const btnClose = document.querySelector("#btnClose");
	if (btnClose) {
		btnClose.addEventListener("click", async () => {
			const currentWin = await fin.Window.getCurrent();
			await currentWin.close();
		});
	}

	let token;

	// Check if the token was passed in customData when the window was launched
	const options = await fin.me.getOptions();
	if (options?.customData?.idToken !== undefined) {
		token = options.customData.idToken;
	} else {
		// No token in customData so this was probably launched from the manifest
		// so we need to check initArgs instead
		const app = fin.Application.getCurrentSync();
		const appInfo = await app.getInfo();
		const customInitOptions = appInfo.initialOptions as OpenFin.ApplicationCreationOptions & {
			userAppConfigArgs: { idToken?: string };
		};

		if (customInitOptions?.userAppConfigArgs?.idToken !== undefined) {
			token = customInitOptions.userAppConfigArgs.idToken;
		}
	}

	const idToken = document.querySelector("#idToken");
	if (idToken) {
		idToken.textContent = token ?? "No Token";
	}

	let validResponse;
	let authenticatedAs;

	if (token) {
		const customSettings = await getManifestCustomSettings();
		if (customSettings.auth?.clientId) {
			try {
				validResponse = await validateIdToken(
					token,
					customSettings.auth?.clientId,
					customSettings.auth?.providerUrl
				);

				authenticatedAs = validResponse?.name;
			} catch (err) {
				console.error(err);
			}
		}
	}

	const isValid = document.querySelector<HTMLInputElement>("#isValid");
	if (isValid) {
		isValid.value = validResponse?.valid ? "Yes" : "No";
	}

	const authenticatedUser = document.querySelector<HTMLInputElement>("#authenticatedUser");
	if (authenticatedUser) {
		authenticatedUser.value = authenticatedAs ?? "Unknown";
	}
});

/**
 * Read the custom settings from the manifest.fin.json.
 * @returns The custom settings from the manifest.
 */
async function getManifestCustomSettings(): Promise<CustomSettings> {
	// Get the manifest for the current application
	const app = await fin.Application.getCurrent();

	// Extract the custom settings for this application
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();
	return manifest.customSettings ?? {};
}
