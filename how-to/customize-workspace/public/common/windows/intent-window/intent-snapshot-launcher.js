let lastContextGroupIndex = -1;

async function getLauncherSettings() {
	const options = await fin.me.getOptions();
	let settings = {};
	if (options?.customData?.settings !== undefined) {
		settings = Object.assign(settings, options.customData.settings);
		if (settings.snapshotUrl === undefined) {
			console.error('Unable to setup intent handler as we need a snapshotUrl setting passed to fetch.');
			return null;
		}
		if (settings.intentName === undefined) {
			console.error('Unable to setup intent handler as we need a intentName setting passed.');
			return null;
		}
	}
	return settings;
}

async function getContextGroupName(contextGroupName, contextGroupToken) {
	let targetContextGroupName = contextGroupName;
	if (targetContextGroupName !== undefined) {
		const availableContextGroups = await fin.me.interop.getContextGroups();
		if (targetContextGroupName === '*') {
			console.log('The specified context group is all (*) indicating the target group should be rotated.');
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
					'Passed contextGroupName is invalid and cannot be used for contextGroupToken replacement. Setting context group to first in available list:',
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

function updateIdToken(sourceText, idToken, idValue) {
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

async function manageIntent(intent, settings) {
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

			const targetContextGroupName = await getContextGroupName(
				settings.contextGroupName,
				settings.contextGroupToken
			);
			if (targetContextGroupName !== undefined && settings.contextGroupToken !== undefined) {
				text = text.replaceAll(settings.contextGroupToken, targetContextGroupName);
			}
			const snapshot = JSON.parse(text);
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
		const snapshotUrl = settings.snapshotUrl;
		const idName = settings.idName;
		const contextGroupName = settings.contextGroupName;
		const contextGroupToken = settings.contextGroupToken;
		const idToken = settings.idToken;
		const intentName = settings.intentName;

		await fin.me.interop.registerIntentHandler(async (intent) => {
			try {
				const response = await fetch(snapshotUrl, {
					headers: {
						Accept: 'application/json'
					}
				});
				if (response.status === 200) {
					console.log('Received snapshot response');
					let text = await response.text();
					if (
						idName !== undefined &&
						intent?.context?.id !== undefined &&
						intent.context.id[idName] !== undefined
					) {
						text = text.replaceAll(idToken, intent.context.id[idName]);
					}

					const targetContextGroupName = await getContextGroupName(contextGroupName, contextGroupToken);
					if (targetContextGroupName !== undefined && contextGroupToken !== undefined) {
						text = text.replaceAll(contextGroupToken, targetContextGroupName);
					}
					const snapshot = JSON.parse(text);
					const platform = fin.Platform.getCurrentSync();
					if (targetContextGroupName !== undefined) {
						await fin.me.interop.joinContextGroup(targetContextGroupName);
						await fin.me.interop.setContext(intent.context);
					}
					await platform.applySnapshot(snapshot);
				}
			} catch (error) {
				console.error('Error while trying to handle intent request for:', intent.name, error);
			}
		}, intentName);
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

window.addEventListener('DOMContentLoaded', launcherInit);
