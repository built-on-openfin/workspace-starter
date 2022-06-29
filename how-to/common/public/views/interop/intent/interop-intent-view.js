import { getDefaultFDC3IntentData, getDefaultFDC3ContextData } from '../../fdc3/fdc3-data.js';
import { fireIntent, fireIntentForContext, listen } from './interop-intent.js';

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
	const intent = getIntentToRaise();

	previewData.codePreview = `
// --------------------------------
// Raising Intent code
// --------------------------------
if(window.fin !== undefined) {

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
  	context.metadata = {
    	target: app              
  	};

  	const intentResolver = 
  	await fin.me.interop.fireIntentForContext(context);
  
  	if(intentResolver !== undefined) {
 
		console.log("Intent resolver received: ", intentResolver);
  
	}
`;
		} else {
			previewData.codePreview += `
  	let intent = "${intent}";
  
  	const intentRequest = {
		name: intent,
		context,
		metadata: {
		target: app              
		}
  	};

  	const intentResolver = await fin.me.interop.fireIntent(intentRequest, app);
  
  	if(intentResolver !== undefined) {
 
		console.log("Intent resolver received: ", intentResolver);
  
	}
`;
		}
	} else if (isContextRequest) {
		previewData.codePreview += `
  	const intentResolver = 
  	await fin.me.interop.fireIntentForContext(context);

  	if(intentResolver !== undefined) {

    	console.log("Intent resolver received: ", intentResolver);
  
	}
  `;
	} else {
		previewData.codePreview += `
	let intent = "${intent}";
    
  	const intentRequest = {
    	name: intent,
    	context
  	};

  	const intentResolver = await fin.me.interop.fireIntent(intentRequest);

  	if(intentResolver !== undefined) {

		console.log("Intent resolver received: ", intentResolver);
  
	}
  `;
	}
	previewData.codePreview += `
}`;

	previewData.codePreview += `
	
// --------------------------------
// Listening code
// -------------------------------- 
if(window.fin !== undefined) {

	let intent = "${intent}";

  	await fin.me.interop.registerIntentHandler((passedIntent)=>{ 
  
		console.log("Received Context For Intent: " + passedIntent.name, passedIntent.context);
  
	}, intent);
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
	return getIntentRaiseType() === 'fireIntentForContext';
}

async function buildAppList() {
	let intents = [];
	const findByContext = isRaiseByContext();

	try {
		if (findByContext) {
			intents = await window.fin.me.interop.getInfoForIntentsByContext(getContextToSend());
		} else {
			const intentToRaise = getIntentToRaise();
			if(intentToRaise === "") {
				// no intent available to perform a search.
				return [];
			}
			const intent = await window.fin.me.interop.getInfoForIntent({
				name: getIntentToRaise()
			});
			intents.push(intent);
		}
	} catch (error) {
		if (findByContext) {
			log(
				`Unable to look up intents to build a supporting app list. It could be this platform does not have a custom Interop Broker with intent support or that there are no apps that support this context type: ${getContextToSend()}.`
			);
		} else if (error.toString().includes('NoAppsFound')) {
			log(
				`Unable to to build a supporting app list. There are no apps that support the intent: ${getIntentToRaise()}.`
			);
		} else {
			log(
				`Unable to to build a supporting app list. Your platform might not have a custom interop broker implementation that supports intents.`
			);
		}
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
	const btnFireIntent = document.querySelector('#btnFireIntent');
	const btnFireIntentForContext = document.querySelector('#btnFireIntentForContext');
	const customIntentContainer = document.querySelector('#customIntentContainer');
	const customIntent = document.querySelector('#customIntent');

	fdc3RaiseBy.addEventListener('change', async () => {
		const apps = await buildAppList();
		await bindApps(apps);
		updateCodePreview(specifiedContext.value);
		if (isRaiseByContext()) {
			btnFireIntent.style.display = 'none';
			btnFireIntentForContext.style.display = 'unset';
		} else {
			btnFireIntent.style.display = 'unset';
			btnFireIntentForContext.style.display = 'none';
		}
	});

	fdc3Intent.addEventListener('change', async () => {
		bindFDC3Types(getFDC3Types());
		const apps = await buildAppList();
		await bindApps(apps);
		const intent = fdc3Intent.value;
		if (intent === 'Custom') {
			customIntentContainer.style.display = 'flex';
		} else {
			customIntentContainer.style.display = 'none';
		}
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

	customIntent.addEventListener('change', () => {
		updateCodePreview(specifiedContext.value);
	});
}

function getContextToSend() {
	const contextInput = document.querySelector('#context');
	const context = contextInput.value;
	return JSON.parse(context);
}

function getIntentToRaise() {
	const selectedIntent = document.querySelector('#fdc3Intents');
	let intent = selectedIntent.value;
	if (intent === 'Custom') {
		const customIntent = document.querySelector('#customIntent');
		intent = customIntent.value;
	}
	return intent;
}

function getIntentRaiseType() {
	const intent = document.querySelector('#intentType');
	return intent.value;
}

function getAppSelection() {
	const intent = document.querySelector('#fdc3Apps');
	return intent.value;
}


function getFDC3Types() {
	let types = intentData[getIntentToRaise()];
	if (types === undefined) {
		types = intentData['Custom'];
	}
	return types;
}

// -------------------------------------------------
// Init Functions
// -------------------------------------------------
async function init() {
	const btnFireIntent = document.querySelector('#btnFireIntent');
	btnFireIntent.addEventListener('click', async () => {
		const ctx = getContextToSend();
		const intent = getIntentToRaise();
		try {
			let app = getAppSelection();
			if (app === 'none' || app === '') {
				app = undefined;
			}
			await fireIntent(log, intent, ctx, app);
			showLogs();
		} catch (error) {
			if (error.toString().includes('NoAppsFound')) {
				log(
					`Unable to fire intent. This platform does not support the intent ${intent}. No apps available to support it.`
				);
			} else {
				log(
					'Unable to fire intent. Likely a JSON parsing error or the platform does not have a broker implementation that supports intents:',
					error.message !== undefined ? error.message : error
				);
			}
			showLogs();
		}
	});

	const btnFireIntentForContext = document.querySelector('#btnFireIntentForContext');
	btnFireIntentForContext.addEventListener('click', async () => {
		try {
			const ctx = getContextToSend();
			let app = getAppSelection();
			if (app === 'none' || app === '') {
				app = undefined;
			}
			await fireIntentForContext(log, ctx, app);
			showLogs();
		} catch (error) {
			console.error('Unable to fire intent for context', error);
			log(
				'Unable to fire intent. Likely a JSON parsing error or this platform does not have a custom interop broker implementation that supports intents:',
				error.message !== undefined ? error.message : error
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
	bindFDC3Types(getFDC3Types());
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
