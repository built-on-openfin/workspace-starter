const id = document.querySelector('#id');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const manifestType = document.querySelector('#manifest-type');
const manifestTypeDescription = document.querySelector('#manifest-type-description');
const helpLink = document.querySelector('#help-link');
const inlineManifest = document.querySelector('#inline-manifest');
const inlineManifestContainer = document.querySelector('#inline-manifest-container');
const manifest = document.querySelector('#manifest');
const manifestContainer = document.querySelector('#manifest-container');
const icon = document.querySelector('#icon');
const appImage = document.querySelector('#app-image');
const contactEmail = document.querySelector('#contact-email');
const supportEmail = document.querySelector('#support-email');
const publisher = document.querySelector('#publisher');
const tags = document.querySelector('#tags');
const availableIntents = document.querySelector('#intents');
const preview = document.querySelector('#preview');
const btnReset = document.querySelector('#btnReset');
const btnCopy = document.querySelector('#btnCopy');

let manifestTypes = [];
let intents = [];

// -------------------------------------------------
// UI Functions
// -------------------------------------------------
async function applySettings() {
	const options = await fin.me.getOptions();
	const optionsData = options?.customData;

	if (optionsData?.intents !== undefined && optionsData?.intents !== null) {
		const intentResponse = await fetch(optionsData.intents);
		intents = await intentResponse.json();
	}

	if (optionsData?.manifestTypes !== undefined && optionsData?.manifestTypes !== null) {
		const manifestResponse = await fetch(optionsData.manifestTypes);
		manifestTypes = await manifestResponse.json();
	}

	if (optionsData?.onlySupportedManifestTypes === true) {
		const app = await fin.Application.getCurrent();
		const appManifest = await app.getManifest();

		const supportedManifestTypes = appManifest?.customSettings?.appProvider?.manifestTypes;
		if (Array.isArray(supportedManifestTypes)) {
			manifestTypes = manifestTypes.filter((entry) => supportedManifestTypes.includes(entry.manifestType));
		}
	}
}

function getManifestType() {
	const manifestInfo = manifestTypes.find((entry) => entry.manifestType === manifestType.value);
	return manifestInfo;
}

async function getAppDefinition() {
	const selectedManifestType = getManifestType();

	const app = {
		appId: id.value,
		name: id.value,
		title: title.value,
		description: description.value,
		manifestType: selectedManifestType.manifestType
	};

	if (selectedManifestType.manifest === 'string') {
		app.manifest = manifest.value;
	} else if (selectedManifestType.manifest === 'object') {
		try {
			if (inlineManifest.value.trim() !== '') {
				app.manifest = JSON.parse(inlineManifest.value);
			} else {
				app.manifest = {};
			}
		} catch {
			// dynamically typing json. Do not update the setting until it is valid
			app.manifest = 'Invalid Inline Manifest. Please make it JSON compliant.';
		}
	}

	if (icon.value.startsWith('http')) {
		app.icons = [{ src: icon.value }];
	} else {
		app.icons = [];
	}

	if (appImage.value.startsWith('http')) {
		app.images = [{ src: appImage.value }];
	} else {
		app.images = [];
	}

	app.contactEmail = contactEmail.value;
	app.supportEmail = supportEmail.value;
	app.publisher = publisher.value;
	app.tags = tags.value.trim() === '' ? [] : tags.value.split(',').map((tag) => tag.trim());

	const selectedIntents = [...availableIntents.selectedOptions].map((option) => option.value);
	const mappedIntents = [];

	for (let i = 0; i < selectedIntents.length; i++) {
		const selectedIntent = intents.find((entry) => entry.name === selectedIntents[i]);
		if (selectedIntent !== undefined) {
			mappedIntents.push(selectedIntent);
		}
	}

	app.intents = mappedIntents;

	return app;
}

async function updateAppPreview() {
	const app = await getAppDefinition();

	preview.textContent = JSON.stringify(app, null, 4);
}

function bindManifestTypes() {
	const manifestTypeOptions = manifestTypes
		.map((data, index) => `<option value=${data.manifestType}>${data.displayName}</option>`)
		.join('\n');
	manifestType.innerHTML = manifestTypeOptions;
	bindManifestTypeDetails();
	updateAppPreview();
}

function bindManifestTypeDetails() {
	const manifestTypeInfo = getManifestType();
	manifestTypeDescription.textContent = manifestTypeInfo.description;
	if (manifestTypeInfo.helpLink !== undefined && manifestTypeInfo.helpLink !== '') {
		helpLink.href = manifestTypeInfo.helpLink;
		helpLink.style.display = 'unset';
	} else {
		helpLink.style.display = 'none';
	}
	if (manifestTypeInfo.manifest === 'string') {
		manifestContainer.style.display = 'unset';
		inlineManifestContainer.style.display = 'none';
	} else if (manifestTypeInfo.manifest === 'object') {
		manifestContainer.style.display = 'none';
		inlineManifestContainer.style.display = 'unset';
	}
}

function bindIntents() {
	const intentsOptions = intents
		.map((data, index) => `<option value=${data.name}>${data.displayName}</option>`)
		.join('\n');
	availableIntents.innerHTML = intentsOptions;
	updateAppPreview();
}

function reset() {
	id.value = '';
	title.value = '';
	description.value = '';
	bindManifestTypes();
	inlineManifest.value = `{ "url": "https://mydomain.com/", "fdc3InteropApi": "1.2" }`;
	icon.value = '';
	appImage.value = '';
	contactEmail.value = '';
	supportEmail.value = '';
	publisher.value = '';
	tags.value = '';
	bindIntents();
	updateAppPreview();
}

async function bindDomElements() {
	bindManifestTypes();
	bindIntents();
	btnReset.addEventListener('click', reset);
	btnCopy.addEventListener('click', async () => {
		const app = await getAppDefinition();
		await fin.Clipboard.writeText({ data: JSON.stringify(app, null, 4) });
	});
}

async function bindChangeEvent() {
	id.addEventListener('input', updateAppPreview);
	title.addEventListener('input', updateAppPreview);
	description.addEventListener('input', updateAppPreview);
	manifestType.addEventListener('input', () => {
		bindManifestTypeDetails();
		updateAppPreview();
	});
	inlineManifest.addEventListener('input', updateAppPreview);
	manifest.addEventListener('input', updateAppPreview);
	icon.addEventListener('input', updateAppPreview);
	appImage.addEventListener('input', updateAppPreview);
	contactEmail.addEventListener('input', updateAppPreview);
	supportEmail.addEventListener('input', updateAppPreview);
	publisher.addEventListener('input', updateAppPreview);
	tags.addEventListener('input', updateAppPreview);
	availableIntents.addEventListener('input', updateAppPreview);
}

async function init() {
	await applySettings();
	await bindDomElements();
	await bindChangeEvent();
	inlineManifest.value = `{ "url": "https://mydomain.com/", "fdc3InteropApi": "1.2" }`;
}
document.addEventListener('DOMContentLoaded', () => {
	try {
		init();
	} catch (error) {
		console.error(error);
	}
});
