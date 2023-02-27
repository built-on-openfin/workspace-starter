import type OpenFin from "@openfin/core";

interface LauncherSettings {
	intentName?: string;
	snapshotUrl?: string;
	idToken?: string;
	idName?: string;
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

async function launcherInit() {
	const settings = await getLauncherSettings();

	if (settings !== null) {
		const snapshotUrl: string = settings.snapshotUrl;
		const idName: string = settings.idName;
		const contextGroupName: string = settings.contextGroupName;
		const contextGroupToken: string = settings.contextGroupToken;
		const idToken: string = settings.idToken;
		const intentName: string = settings.intentName;

		await fin.me.interop.registerIntentHandler(async (intent) => {
			try {
				const response = await fetch(snapshotUrl, {
					headers: {
						Accept: "application/json"
					}
				});
				if (response.status === 200) {
					console.log("Received snapshot response");
					let text = await response.text();
					if (
						idName !== undefined &&
						intent?.context?.id !== undefined &&
						intent.context.id[idName] !== undefined
					) {
						text = text.replaceAll(idToken, intent.context.id[idName]);
					}

					const targetContextGroupName: string = await getContextGroupName(
						contextGroupName,
						contextGroupToken
					);
					if (targetContextGroupName !== undefined && contextGroupToken !== undefined) {
						text = text.replaceAll(contextGroupToken, targetContextGroupName);
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
		}, intentName);
	}
}

window.addEventListener("DOMContentLoaded", launcherInit);
