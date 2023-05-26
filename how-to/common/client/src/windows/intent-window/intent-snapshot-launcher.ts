import type OpenFin from "@openfin/core";

interface LauncherSettings {
	intentName?: string;
	snapshotUrl?: string;
	idToken?: string;
	idName?: string;
	idTokens?: { idToken: string; idName: string }[];
	contextGroupName?: string;
	contextGroupToken?: string;
}
let lastContextGroupIndex: number = -1;

async function getLauncherSettings(): Promise<LauncherSettings> {
	const options = await fin.me.getOptions();
	let settings: LauncherSettings = {};
	if (options?.customData?.settings !== undefined) {
		settings = Object.assign(settings, options.customData.settings);
		if (settings.snapshotUrl === undefined) {
			console.error("Unable to setup intent handler as we need a snapshotUrl setting passed to fetch.");
			return null;
		}
		if (settings.intentName === undefined) {
			console.error("Unable to setup intent handler as we need a intentName setting passed.");
			return null;
		}
	}
	return settings;
}

async function getContextGroupName(contextGroupName: string, contextGroupToken: string): Promise<string> {
	let targetContextGroupName = contextGroupName;
	if (targetContextGroupName !== undefined) {
		const availableContextGroups = await fin.me.interop.getContextGroups();
		if (targetContextGroupName === "*") {
			console.log("The specified context group is all (*) indicating the target group should be rotated.");
			lastContextGroupIndex++;
			if (lastContextGroupIndex > availableContextGroups.length) {
				lastContextGroupIndex = 0;
			}
			targetContextGroupName = availableContextGroups[lastContextGroupIndex].id;
		}
		const targetContextGroup = availableContextGroups.find((entry) => entry.id === targetContextGroupName);
		if (targetContextGroup === undefined) {
			if (contextGroupToken !== undefined) {
				console.warn(
					"Passed contextGroupName is invalid and cannot be used for contextGroupToken replacement. Setting context group to first in available list:",
					availableContextGroups[0].id
				);
				targetContextGroupName = availableContextGroups[0].id;
			} else {
				console.warn(
					"The passed context group name is not valid and isn't used in the snapshot so will not be used or defaulted."
				);
				targetContextGroupName = undefined;
			}
		}
	}
	return targetContextGroupName;
}

function updateIdToken(sourceText: string, idToken: string, idValue: string): string {
	if (
		idToken === undefined ||
		idToken === null ||
		idToken.trim().length === 0 ||
		idValue === undefined ||
		idValue === null ||
		idValue.trim().length === 0
	) {
		return sourceText;
	}
	sourceText = sourceText.replaceAll(idToken, idValue);
	return sourceText;
}

async function manageIntent(intent: OpenFin.Intent, settings: LauncherSettings) {
	try {
		const response = await fetch(settings.snapshotUrl, {
			headers: {
				Accept: "application/json"
			}
		});
		if (response.status === 200) {
			console.log("Received snapshot response");
			let text = await response.text();
			if (intent?.context?.id !== undefined) {
				text = updateIdToken(text, settings.idToken, intent.context.id[settings.idName]);
				if (Array.isArray(settings.idTokens)) {
					for (const idTokenEntry of settings.idTokens) {
						text = updateIdToken(text, idTokenEntry.idToken, intent.context.id[idTokenEntry.idName]);
					}
				}
			}

			const targetContextGroupName: string = await getContextGroupName(
				settings.contextGroupName,
				settings.contextGroupToken
			);
			if (targetContextGroupName !== undefined && settings.contextGroupToken !== undefined) {
				text = text.replaceAll(settings.contextGroupToken, targetContextGroupName);
			}
			const snapshot: OpenFin.Snapshot = JSON.parse(text);
			const platform = fin.Platform.getCurrentSync();
			if (targetContextGroupName !== undefined) {
				await fin.me.interop.joinContextGroup(targetContextGroupName);
				await fin.me.interop.setContext(intent.context);
			}
			await platform.applySnapshot(snapshot);
		}
	} catch (error) {
		console.error("Error while trying to handle intent request for:", intent.name, error);
	}
}

async function launcherInit() {
	const settings = await getLauncherSettings();

	if (settings !== null) {
		await fin.me.interop.registerIntentHandler((intent) => {
			manageIntent(intent, settings)
				.then((_) => {
					console.log(`Intent ${settings.intentName} managed.`);
					return true;
				})
				.catch((err) => {
					console.error(`Error received while trying to resolve intent ${settings.intentName}`, err);
				});
		}, settings.intentName);
	}
}

window.addEventListener("DOMContentLoaded", launcherInit);
