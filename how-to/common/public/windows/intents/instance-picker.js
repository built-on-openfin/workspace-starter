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

let intent;
let intents;
let apps;

async function setupIntentView(setupIntents) {
	if (Array.isArray(setupIntents) && setupIntents.length > 0) {
		if (intent.context?.type !== undefined) {
			targetLabel.textContent = intent.context.type;
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
	if (Array.isArray(applications) && applications.length > 0) {
		if (intentName !== undefined) {
			targetLabel.textContent = intentName;
		}

		appsContainer.options.length = 0;
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

async function setupAppInstancesView(foundAppInstances) {
	setElementVisibility(appInstanceSelectionContainer, false);
	launchBtn.disabled = false;
	if (Array.isArray(foundAppInstances) && foundAppInstances.length > 0) {
		appInstanceContainer.options.length = 0;
		const newInstanceEntry = createOptionEntry('New Instance', '', true);
		appInstanceContainer.append(newInstanceEntry);
		for (let i = 0; i < foundAppInstances.length; i++) {
			if (foundAppInstances[i].instanceId !== undefined) {
				const appInstanceEntry = createOptionEntry(
					`${foundAppInstances[i].appId} ${i + 1}`,
					foundAppInstances[i].instanceId
				);
				appInstanceContainer.append(appInstanceEntry);
			}
		}
		setElementVisibility(appInstanceSelectionContainer, true);
	}
}

async function setupAppMetadata(appId, instanceId) {
	const identifier = { appId, instanceId };
	const appMetaData = await fdc3.getAppMetadata(identifier);
	if (appMetaData !== undefined && appMetaData !== null) {
		const appImage = document.querySelector('#logo');
		if (Array.isArray(appMetaData.icons) && appMetaData.icons.length > 0) {
			appImage.src = appMetaData.icons[0].src;
			setElementVisibility(appImage, true);
		} else {
			setElementVisibility(appImage, false);
		}

		const appDescription = document.querySelector('#description');
		if (appMetaData.description !== undefined && appMetaData.description.length > 0) {
			appDescription.textContent = appMetaData.description;
			setElementVisibility(appDescription, true);
		} else {
			setElementVisibility(appDescription, false);
		}
		setElementVisibility(appSummaryContainer, true);
	} else {
		setElementVisibility(appSummaryContainer, false);
	}
}

async function onIntentSelection(targetIntent) {
	launchBtn.disabled = true;
	const appsForIntent = await fdc3.findIntent(targetIntent);
	intent = appsForIntent.intent;
	await setupAppView(appsForIntent.apps, targetIntent);
}

async function onAppSelection(appId) {
	const foundAppInstances = await fdc3.findInstances({ appId });

	await setupAppMetadata(appId);
	await setupAppInstancesView(foundAppInstances);
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
	appSummaryContainer = document.querySelector('#summary');
	setElementVisibility(appSummaryContainer, false);
	launchBtn = document.querySelector('#launch');

	const data = await fin.me.getOptions();

	if (data.customData !== undefined) {
		apps = data.customData.apps;
		intent = data.customData.intent;
		intents = data.customData.intents;
	}
	setupIntentView(intents);
	await setupAppView(apps, intent.name);

	cancelSelectionBtn.addEventListener('click', async () => {
		if (rejectAppSelection !== undefined) {
			rejectAppSelection('Application selection cancelled.');
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

// this function is called by the interopbroker.ts file in the src directory so that it waits to see whether the end user has made a selection or cancelled the intent request.
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
