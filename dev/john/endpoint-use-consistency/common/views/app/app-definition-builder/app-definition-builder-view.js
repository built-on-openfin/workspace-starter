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
const defaultInlineManifest = { url: 'https://www.mydomain.com', fdc3InteropApi: '1.2' };
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
		manifestContainer.style.display = 'flex';
		inlineManifestContainer.style.display = 'none';
	} else if (manifestTypeInfo.manifest === 'object') {
		manifestContainer.style.display = 'none';
		inlineManifestContainer.style.display = 'flex';
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
	inlineManifest.value = JSON.stringify(defaultInlineManifest);
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

function applyAppDefinition(app) {
	if (app.appId !== undefined) {
		id.value = app.appId;
	}

	if (app.title !== undefined) {
		title.value = app.title;
	}

	if (app.description !== undefined) {
		description.value = app.description;
	}

	if (app.manifestType !== undefined) {
		manifestType.value = app.manifestType;
	}

	if (typeof app.manifest === 'string') {
		manifest.value = app.manifest;
	} else {
		inlineManifest.value = JSON.stringify(app.manifest, null, 4);
	}
	bindManifestTypeDetails();

	if (Array.isArray(app.icons) && app.icons.length > 0) {
		icon.value = app.icons[0].src;
	}

	if (Array.isArray(app.images) && app.images.length > 0) {
		appImage.value = app.images[0].src;
	}

	if (Array.isArray(app.tags) && app.tags.length > 0) {
		tags.value = app.tags.join(', ');
	}

	if (app.publisher !== undefined) {
		publisher.value = app.publisher;
	}

	if (app.supportEmail !== undefined) {
		supportEmail.value = app.supportEmail;
	}

	if (app.contactEmail !== undefined) {
		contactEmail.value = app.contactEmail;
	}

	bindIntents();

	if (Array.isArray(app.intents) && app.intents.length > 0) {
		const intentsToSet = [];

		for (let i = 0; i < app.intents.length; i++) {
			if (intents.some((entry) => entry.name === app.intents[i].name)) {
				intentsToSet.push(app.intents[i].name);
			}
		}
		console.log(intentsToSet);

		if (intentsToSet.length > 0) {
			const options = Array.from(availableIntents.options);
			for (let i = 0; i < options.length; i++) {
				options[i].selected = intentsToSet.includes(options[i].value);
			}
		}
	}

	updateAppPreview();
}

async function init() {
	await applySettings();
	await bindDomElements();
	await bindChangeEvent();
	inlineManifest.value = JSON.stringify(defaultInlineManifest);
	if (window.fdc3 !== undefined) {
		const intent = 'CreateAppDefinition';
		fdc3.addIntentListener(intent, (ctx) => {
			if (ctx.type === 'openfin.app') {
				try {
					applyAppDefinition(ctx.app);
				} catch (error) {
					console.error('Error while trying to apply the following intent context:', ctx, error);
				}
			}
		});
	}
}
document.addEventListener('DOMContentLoaded', () => {
	try {
		init();
	} catch (error) {
		console.error(error);
	}
});
