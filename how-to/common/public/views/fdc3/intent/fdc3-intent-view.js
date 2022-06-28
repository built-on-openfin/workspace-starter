import { getDefaultFDC3IntentData, getDefaultFDC3ContextData } from '../fdc3-data.js';
import { raiseIntent, raiseIntentByContext, listen } from './fdc3-intent.js';

// -------------------------------------------------
// settings
// -------------------------------------------------
let contextData = getDefaultFDC3ContextData();
let intentData = getDefaultFDC3IntentData();

let isCodePreview = true;

const previewData = {
	codePreview: '',
	logs: ''
};

// -------------------------------------------------
// UI Functions
// -------------------------------------------------
async function applySettings() {
	const options = await fin.me.getOptions();
	const optionsData = options?.customData;

	if (optionsData?.contextData !== undefined && optionsData?.contextData !== null) {
		contextData = optionsData.contextData;
	}
	if (optionsData?.intentData !== undefined && optionsData?.intentData !== null) {
		intentData = optionsData.intentData;
	}
}

function updatePreview() {
	console.log('preview updated');
	if (isCodePreview) {
		showCodePreview();
	} else {
		showLogs();
	}
}

function showCodePreview() {
	isCodePreview = true;
	const preview = document.querySelector('#preview');
	preview.textContent = previewData.codePreview;
	const previewTitle = document.querySelector('#previewTitle');
	previewTitle.textContent = 'Code Preview';
}

function updateCodePreview(context) {
	previewData.codePreview = `
// --------------------------------
// Raising Intent code
// --------------------------------
if(window.fdc3 !== undefined) {
  
	let context = ${context};
`;

	const appSelection = getAppSelection();
	const isContextRequest = isRaiseByContext();

	if (appSelection !== 'none' && appSelection !== '') {
		previewData.codePreview += `
  	let app = "${appSelection}";
`;

		if (isContextRequest) {
			previewData.codePreview += `
  	await fdc3.raiseIntentForContext(context, app);
`;
		} else {
			previewData.codePreview += `
  	let intent = "${getIntentToRaise()}";
  
  	await fdc3.raiseIntent(intent, context, app);
`;
		}
	} else if (isContextRequest) {
		previewData.codePreview += `
  	await fdc3.raiseIntentForContext(context);
  `;
	} else {
		previewData.codePreview += `
  	let intent = "${getIntentToRaise()}";
    
  	await fdc3.raiseIntent(intent, context);
  `;
	}
	previewData.codePreview += `
}`;

	previewData.codePreview += `
	
// --------------------------------
// Listening code
// --------------------------------
if(window.fdc3 !== undefined) {

  	let intent = "${getIntentToRaise()}";

  	fdc3.addIntentListener(intent, (ctx)=> {
  
		console.log("Received Context For Intent: " + intent, ctx);
  
	}); 
`;
	previewData.codePreview += `
}`;

	updatePreview();
}

function showLogs() {
	isCodePreview = false;
	const preview = document.querySelector('#preview');
	preview.textContent = previewData.logs;
	const previewTitle = document.querySelector('#previewTitle');
	previewTitle.textContent = 'Logs';
}

function clearLogs() {
	previewData.logs = '';
	showLogs();
}

function log(text, data) {
	let logs = `
${new Date(Date.now()).toLocaleTimeString()}: ${text}`;

	if (data !== undefined) {
		logs += `
${JSON.stringify(data, null, 5)}`;
	}

	console.log(text, data);
	previewData.logs = logs + previewData.logs;
	updatePreview();
}

function bindFDC3Context(value) {
	const specifiedContext = document.querySelector('#context');
	specifiedContext.value = JSON.stringify(value, null, 5);
}

function bindFDC3Values(values) {
	const fdc3Value = document.querySelector('#fdc3Value');
	const fdc3ValueOptions = values
		.map((data, index) => `<option value=${index}>${data.name}</option>`)
		.join('\n');
	fdc3Value.innerHTML = fdc3ValueOptions;
	const context = values[0];
	bindFDC3Context(context);
	updateCodePreview(JSON.stringify(context, null, 5));
}

function bindFDC3Types(types) {
	const fdc3Type = document.querySelector('#fdc3Type');
	const fdc3TypeOptions = types.map((type) => `<option value=${type}>${type}</option>`).join('\n');
	fdc3Type.innerHTML = fdc3TypeOptions;
	bindFDC3Values(contextData[types[0]]);
}

function bindFDC3Intents(intents) {
	const fdc3Intent = document.querySelector('#fdc3Intents');
	const fdc3IntentOptions = intents.map((intent) => `<option value=${intent}>${intent}</option>`).join('\n');
	fdc3Intent.innerHTML = fdc3IntentOptions;
	buildAppList()
		.then((apps) => {
			bindApps(apps);
		})
		.catch((error) => console.error(error));
}

function bindApps(apps) {
	const fdc3Apps = document.querySelector('#fdc3Apps');
	apps.unshift({ appId: 'none', title: 'No Preference' }, { appId: 'wrong-app', title: 'Non Existent App' });
	const fdc3AppOptions = apps.map((app) => `<option value=${app.appId}>${app.title}</option>`).join('\n');
	fdc3Apps.innerHTML = fdc3AppOptions;
}

function getCombinedAppList(intents) {
	const combinedAppList = [];
	const combinedListOfAppIds = [];

	for (const intent of intents) {
		for (const app of intent.apps) {
			if (!combinedListOfAppIds.includes(app.appId)) {
				combinedAppList.push(app);
				combinedListOfAppIds.push(app.appId);
			}
		}
	}

	return combinedAppList;
}

function isRaiseByContext() {
	return getIntentRaiseType() === 'raiseByContext';
}

async function buildAppList() {
	let intents = [];
	const findByContext = isRaiseByContext();

	try {
		if (findByContext) {
			intents = await window.fdc3.findIntentsByContext(getContextToSend());
		} else {
			const intent = await window.fdc3.findIntent(getIntentToRaise());
			intents.push(intent);
		}
	} catch (error) {
		log(
			'Unable to look up intents to build a supporting app list. It could be this platform does not have a custom Interop Broker with intent support.'
		);
		console.error(error);
		return [];
	}

	return getCombinedAppList(intents);
}

function bindFDC3OnChange() {
	const fdc3RaiseBy = document.querySelector('#intentType');
	const fdc3Intent = document.querySelector('#fdc3Intents');
	const fdc3Type = document.querySelector('#fdc3Type');
	const fdc3Value = document.querySelector('#fdc3Value');
	const fdc3Apps = document.querySelector('#fdc3Apps');
	const specifiedContext = document.querySelector('#context');
	const btnRaiseIntent = document.querySelector('#btnRaiseIntent');
	const btnRaiseIntentByContext = document.querySelector('#btnRaiseIntentByContext');

	fdc3RaiseBy.addEventListener('change', async () => {
		const apps = await buildAppList();
		await bindApps(apps);
		updateCodePreview(specifiedContext.value);
		if (isRaiseByContext()) {
			btnRaiseIntent.style.display = 'none';
			btnRaiseIntentByContext.style.display = 'unset';
		} else {
			btnRaiseIntent.style.display = 'unset';
			btnRaiseIntentByContext.style.display = 'none';
		}
	});

	fdc3Intent.addEventListener('change', async () => {
		const getFDC3Types = intentData[getIntentToRaise()];
		bindFDC3Types(getFDC3Types);
		const apps = await buildAppList();
		await bindApps(apps);
	});

	fdc3Type.addEventListener('change', async () => {
		bindFDC3Values(contextData[fdc3Type.value]);
		const apps = await buildAppList();
		await bindApps(apps);
	});

	fdc3Value.addEventListener('change', () => {
		const context = contextData[fdc3Type.value][fdc3Value.value];
		bindFDC3Context(context);
		updateCodePreview(JSON.stringify(context, null, 5));
	});

	specifiedContext.addEventListener('change', () => {
		updateCodePreview(specifiedContext.value);
	});

	fdc3Apps.addEventListener('change', () => {
		updateCodePreview(specifiedContext.value);
	});
}

function getContextToSend() {
	const contextInput = document.querySelector('#context');
	const context = contextInput.value;
	return JSON.parse(context);
}

function getIntentToRaise() {
	const intent = document.querySelector('#fdc3Intents');
	return intent.value;
}

function getIntentRaiseType() {
	const intent = document.querySelector('#intentType');
	return intent.value;
}

function getAppSelection() {
	const intent = document.querySelector('#fdc3Apps');
	return intent.value;
}

// -------------------------------------------------
// Init Functions
// -------------------------------------------------
async function init() {
	const btnRaiseIntent = document.querySelector('#btnRaiseIntent');
	btnRaiseIntent.addEventListener('click', async () => {
		try {
			const ctx = getContextToSend();
			const intent = getIntentToRaise();
			let app = getAppSelection();
			if (app === 'none' || app === '') {
				app = undefined;
			}
			await raiseIntent(log, intent, ctx, app);
			showLogs();
		} catch (error) {
			console.error('Unable to raise intent', error);
			log(
				'Unable to raise intent. Likely a JSON parsing error or the platform does not have a broker implementation that supports intents:',
				error
			);
			showLogs();
		}
	});

	const btnRaiseIntentByContext = document.querySelector('#btnRaiseIntentByContext');
	btnRaiseIntentByContext.addEventListener('click', async () => {
		try {
			const ctx = getContextToSend();
			let app = getAppSelection();
			if (app === 'none' || app === '') {
				app = undefined;
			}
			await raiseIntentByContext(log, ctx, app);
			showLogs();
		} catch (error) {
			console.error('Unable to raise intent by context', error);
			log(
				'Unable to raise intent by context. Likely a JSON parsing error or the platform does not have a broker implementation that supports intents:',
				error
			);
			showLogs();
		}
	});

	const btnSeeCode = document.querySelector('#btnSeeCode');
	btnSeeCode.addEventListener('click', async () => {
		showCodePreview();
	});

	const btnSeeLogs = document.querySelector('#btnSeeLogs');
	btnSeeLogs.addEventListener('click', async () => {
		showLogs();
	});

	const btnClear = document.querySelector('#btnClear');
	btnClear.addEventListener('click', () => {
		clearLogs();
	});

	await applySettings();
	const intentTypes = Object.keys(intentData);
	bindFDC3Intents(intentTypes);
	bindFDC3Types(intentData[getIntentToRaise()]);
	bindFDC3OnChange();
	showCodePreview();
	await listen(log, intentTypes, showLogs);
}

document.addEventListener('DOMContentLoaded', () => {
	try {
		init();
	} catch (error) {
		console.error(error);
	}
});
