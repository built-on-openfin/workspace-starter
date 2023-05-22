import { createRadioEntry, getSelection, setElementVisibility } from './helper.js';

let rejectAppSelection;
let resolveAppSelection;
let backBtn;
let launchBtn;
let cancelAppSelectionBtn;
let nextBtn;
let cancelIntentSelectionBtn;
let intentsContainer;
let appsContainer;
let intentSelectionContainer;
let appSelectionContainer;
let targetIntentLabel;
let targetContextLabel;

let intent;
let intents;
let apps;

function setupIntentView(setupIntents) {
	if (Array.isArray(setupIntents)) {
		const listName = 'intent';
		if (intent.context?.type !== undefined) {
			targetContextLabel.textContent = intent.context.type;
		}

		for (let i = 0; i < setupIntents.length; i++) {
			const intentEntry = createRadioEntry(
				listName,
				setupIntents[i].intent.displayName,
				setupIntents[i].intent.name,
				i === 0
			);
			intentsContainer.append(intentEntry);
		}

		cancelIntentSelectionBtn.addEventListener('click', async () => {
			if (rejectAppSelection !== undefined) {
				rejectAppSelection('Application selection cancelled.');
			}
			fin.me.close(true);
		});

		nextBtn.addEventListener('click', () => {
			const selectedIntentName = getSelection('intent');
			const selectedIntent = setupIntents.find((entry) => {
				if (entry.intent.name === selectedIntentName) {
					intent.displayName = entry.intent.displayName;
					intent.name = entry.intent.name;
					return true;
				}
				return false;
			});

			if (selectedIntent !== undefined) {
				setElementVisibility(intentSelectionContainer, false);
				setupAppView(selectedIntent.apps);
				setElementVisibility(appSelectionContainer, true);
			}
		});

		setElementVisibility(appSelectionContainer, false);
		setElementVisibility(intentSelectionContainer, true);
	}
}

function setupAppView(applications) {
	if (Array.isArray(applications)) {
		const listName = 'app';
		if (intent.name !== undefined) {
			targetIntentLabel.textContent = intent.name;
		}
		appsContainer.replaceChildren();

		for (let i = 0; i < applications.length; i++) {
			const appEntry = createRadioEntry(listName, applications[i].title, applications[i].appId, i === 0);
			appsContainer.append(appEntry);
		}

		backBtn.addEventListener('click', () => {
			setElementVisibility(appSelectionContainer, false);
			setElementVisibility(intentSelectionContainer, true);
		});

		cancelAppSelectionBtn.addEventListener('click', async () => {
			if (rejectAppSelection !== undefined) {
				rejectAppSelection('UserCancelledResolution');
			}
			fin.me.close(true);
		});

		launchBtn.addEventListener('click', async () => {
			resolveAppSelection({ appId: getSelection(listName), intent });
			fin.me.close(true);
		});

		setElementVisibility(intentSelectionContainer, false);
		setElementVisibility(appSelectionContainer, true);
	}
}

async function init() {
	intentSelectionContainer = document.querySelector('#intent-select-container');
	targetContextLabel = document.querySelector('#target-context');
	intentsContainer = document.querySelector('#intent-container');
	nextBtn = document.querySelector('#move-next');
	cancelIntentSelectionBtn = document.querySelector('#cancel-intent-selection');

	appSelectionContainer = document.querySelector('#app-select-container');
	targetIntentLabel = document.querySelector('#target-intent');
	appsContainer = document.querySelector('#app-container');
	backBtn = document.querySelector('#back');
	launchBtn = document.querySelector('#launch');
	launchBtn.disabled = true;
	cancelAppSelectionBtn = document.querySelector('#cancel');

	const data = await fin.me.getOptions();

	if (data.customData !== undefined) {
		apps = data.customData.apps;
		intent = data.customData.intent;
		intents = data.customData.intents;
		if (data.customData.unregisteredAppId !== undefined) {
			// this intent picker does not support instances and an unregistered app entry is a placeholder
			// for any views/windows that register as intent handlers but are not linked to an app
			apps = apps.filter((app) => app.appId !== data.customData.unregisteredAppId);
		}
		if (data.customData.title !== undefined) {
			const title = document.querySelector('#title');
			title.textContent = data.customData.title;
		}
	}

	if (intents !== undefined) {
		backBtn.style.display = 'block';
		setupIntentView(intents);
	} else {
		backBtn.style.display = 'none';
		setupAppView(apps);
	}
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
