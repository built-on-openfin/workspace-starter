import { createOptionEntry, setElementVisibility } from './helper.js';

let rejectAppSelection;
let resolveAppSelection;
let launchBtn;
let cancelSelectionBtn;
let intentsContainer;
let appsContainer;
let intentSelectionContainer;
let appSelectionContainer;
let appInstanceSelectionContainer;
let appInstanceContainer;
let appSummaryContainer;
let targetLabel;
let targetLabelSet = false;

let intent;
let intents;
let apps;
let unregisteredAppId;
const appLookup = {};

async function setupIntentView(setupIntents) {
	if (Array.isArray(setupIntents) && setupIntents.length > 0) {
		if (intent.context?.type !== undefined) {
			targetLabel.textContent = `Select an Intent & Application to handle the ${intent.context.type} context: ${intent.context.name}`;
			targetLabelSet = true;
		}

		for (let i = 0; i < setupIntents.length; i++) {
			const intentEntry = createOptionEntry(
				setupIntents[i].intent.displayName,
				setupIntents[i].intent.name,
				i === 0
			);
			intentsContainer.append(intentEntry);
		}

		setElementVisibility(appSelectionContainer, false);
		setElementVisibility(appInstanceSelectionContainer, false);
		setElementVisibility(intentSelectionContainer, true);
		await onIntentSelection(setupIntents[0].intent.name);
	} else {
		setElementVisibility(intentSelectionContainer, false);
	}
}

async function setupAppView(applications, intentName) {
	setElementVisibility(appInstanceSelectionContainer, false);
	setElementVisibility(appSummaryContainer, false);
	appsContainer.options.length = 0;
	if (Array.isArray(applications) && applications.length > 0) {
		if (intentName !== undefined && !targetLabelSet) {
			targetLabel.textContent = `Select an application to handle the Intent ${intentName}`;
		}
		for (let i = 0; i < applications.length; i++) {
			if (applications[i].instanceId === undefined) {
				const appEntry = createOptionEntry(applications[i].title, applications[i].appId, i === 0);
				appsContainer.append(appEntry);
			}
		}
		setElementVisibility(appSelectionContainer, true);
		await onAppSelection(applications[0].appId);
	} else {
		setElementVisibility(appSelectionContainer, false);
	}
}

async function setupAppInstancesView(foundAppInstances, addNewInstanceOption = true) {
	setElementVisibility(appInstanceSelectionContainer, false);
	appInstanceContainer.options.length = 0;
	launchBtn.disabled = false;
	if (Array.isArray(foundAppInstances) && foundAppInstances.length > 0) {
		if (addNewInstanceOption) {
			const newInstanceEntry = createOptionEntry('New Instance', '', true);
			appInstanceContainer.append(newInstanceEntry);
		} else {
			await onAppInstanceSelection(foundAppInstances[0].appId, foundAppInstances[0].instanceId);
		}
		for (let i = 0; i < foundAppInstances.length; i++) {
			if (foundAppInstances[i].instanceId !== undefined) {
				const appMetadata = await fdc3.getAppMetadata(foundAppInstances[i]);
				let label = `${foundAppInstances[i].appId} (${i + 1})`;
				if (appMetadata?.instanceMetadata?.title !== undefined) {
					label = appMetadata.instanceMetadata.title;
				} else if (appMetadata?.title !== undefined) {
					label = `${appMetadata.title} (${i + 1})`;
				}
				const appInstanceEntry = createOptionEntry(label, foundAppInstances[i].instanceId);
				appInstanceContainer.append(appInstanceEntry);
			}
		}
		setElementVisibility(appInstanceSelectionContainer, true);
	}
}

async function onIntentSelection(targetIntent) {
	launchBtn.disabled = true;
	for (const availableIntent of intents) {
		if (availableIntent.intent.name === targetIntent) {
			intent.displayName = availableIntent.intent.displayName;
			intent.name = targetIntent;
			await setupAppView(availableIntent.apps, targetIntent);
			break;
		}
	}
}

async function onAppSelection(appId) {
	const selectedApp = appLookup[appId];
	await setupAppMetadata(appId);
	if (selectedApp?.instanceMode === undefined || selectedApp.instanceMode !== 'single') {
		const foundAppInstances = await fdc3.findInstances({ appId });
		const addNewInstanceOption = appId !== unregisteredAppId;
		await setupAppInstancesView(foundAppInstances, addNewInstanceOption);
	} else {
		// clear previous selections
		await setupAppInstancesView([]);
	}
}

async function onAppInstanceSelection(appId, instanceId) {
	const appPreviewImage = document.querySelector('#preview');
	setElementVisibility(appPreviewImage, false);
	const appMetadata = await fdc3.getAppMetadata({ appId, instanceId });
	let preview;
	if (appMetadata?.instanceMetadata !== undefined && appMetadata?.instanceMetadata?.preview !== undefined) {
		preview = appMetadata.instanceMetadata.preview;
		appPreviewImage.src = `data:image/jpg;base64,${preview}`;
		setElementVisibility(appPreviewImage, true);
	} else {
		loadAppPreview(appId);
	}
}

async function loadAppPreview(appId) {
	const appPreviewImage = document.querySelector('#preview');
	setElementVisibility(appPreviewImage, false);
	const appMetadata = appLookup[appId];
	if (Array.isArray(appMetadata?.images) && appMetadata.images.length > 0) {
		appPreviewImage.src = appMetadata.images[0].src;
		setElementVisibility(appPreviewImage, true);
	}
}

async function setupAppMetadata(appId) {
	const appMetadata = appLookup[appId];
	if (appMetadata !== undefined) {
		const appImage = document.querySelector('#logo');
		if (Array.isArray(appMetadata.icons) && appMetadata.icons.length > 0) {
			appImage.src = appMetadata.icons[0].src;
			setElementVisibility(appImage, true);
		} else {
			setElementVisibility(appImage, false);
		}

		const appDescription = document.querySelector('#description');
		if (appMetadata.description !== undefined && appMetadata.description.length > 0) {
			appDescription.textContent = appMetadata.description;
			setElementVisibility(appDescription, true);
		} else {
			setElementVisibility(appDescription, false);
		}
		loadAppPreview(appId);
		setElementVisibility(appSummaryContainer, true);
	} else {
		setElementVisibility(appSummaryContainer, false);
	}
}

async function init() {
	intentSelectionContainer = document.querySelector('#intent-container');
	intentsContainer = document.querySelector('#intents');
	intentsContainer.addEventListener('change', async (list) => {
		const targetIntent = list.target.value;
		await onIntentSelection(targetIntent);
	});
	targetLabel = document.querySelector('#target-type');
	cancelSelectionBtn = document.querySelector('#cancel');

	appSelectionContainer = document.querySelector('#app-container');
	appsContainer = document.querySelector('#applications');
	appsContainer.addEventListener('change', async (appList) => {
		const appId = appList.target.value;
		await onAppSelection(appId);
	});

	appInstanceSelectionContainer = document.querySelector('#app-instance-container');
	appInstanceContainer = document.querySelector('#instances');
	appInstanceContainer.addEventListener('change', async (instanceList) => {
		const instanceId = instanceList.target.value;
		await onAppInstanceSelection(appsContainer.value, instanceId);
	});
	appSummaryContainer = document.querySelector('#summary');
	setElementVisibility(appSummaryContainer, false);
	launchBtn = document.querySelector('#launch');

	const data = await fin.me.getOptions();

	if (data.customData !== undefined) {
		apps = data.customData.apps;
		intent = data.customData.intent;
		intents = data.customData.intents;
		unregisteredAppId = data.customData.unregisteredAppId;
		if (data.customData.title !== undefined) {
			const title = document.querySelector('#title');
			title.textContent = data.customData.title;
		}
	}

	if (Array.isArray(intents)) {
		for (const passedIntent of intents) {
			for (const intentApp of passedIntent.apps) {
				appLookup[intentApp.appId] = intentApp;
			}
		}
	}
	setupIntentView(intents);

	if (Array.isArray(apps)) {
		for (const app of apps) {
			appLookup[app.appId] = app;
		}
		await setupAppView(apps, intent.name);
	}

	cancelSelectionBtn.addEventListener('click', async () => {
		if (rejectAppSelection !== undefined) {
			rejectAppSelection('UserCancelledResolution');
		}
		fin.me.close(true);
	});

	launchBtn.addEventListener('click', async () => {
		let instanceId;
		if (appInstanceContainer.value !== '') {
			instanceId = appInstanceContainer.value;
		}
		const appId = appsContainer.value;

		resolveAppSelection({ appId, instanceId, intent });
		fin.me.close(true);
	});
}

// this function is called by the interop broker.ts file in the src directory so that it waits to see whether the end user has made a selection or cancelled the intent request.
window['getIntentSelection'] = async () => {
	launchBtn.disabled = false;
	return new Promise((resolve, reject) => {
		resolveAppSelection = resolve;
		rejectAppSelection = reject;
	});
};

document.addEventListener('DOMContentLoaded', () => {
	init();
});
