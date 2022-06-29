import { getDefaultFDC3ContextData } from '../fdc3-data.js';
import {
	systemBroadcast,
	appBroadcast,
	listenToSystemBroadcast,
	listenToAppBroadcast
} from './fdc3-broadcast.js';
// -------------------------------------------------
// settings
// -------------------------------------------------
let contextData = getDefaultFDC3ContextData();
let customChannel = 'custom-app-channel';
let isCodePreview = true;
const SYSTEM_CHANNEL = 'systemChannel';
const APP_CHANNEL = 'appChannel';

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

	if (
		optionsData?.customChannel !== undefined &&
		optionsData?.customChannel !== null &&
		optionsData?.customChannel !== ''
	) {
		customChannel = optionsData.customChannel;
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
	const channelType = getChannelType();
	previewData.codePreview = `
// --------------------------------
// Broadcasting code
// --------------------------------
if(window.fdc3 !== undefined) {

	const context = ${context};
`;

	if (channelType === SYSTEM_CHANNEL) {
		previewData.codePreview += `
	const systemChannel = await fdc3.getCurrentChannel();

	if(systemChannel !== null) {
	
  		console.log('broadcasting on ' + systemChannel.type + 
  		' channel: ' + systemChannel.id, context);
  
  		fdc3.broadcast(context);

	} else {
  
		console.log("You are not bound to a system channel");

	}
`;
	} else if (channelType === APP_CHANNEL && customChannel !== undefined) {
		previewData.codePreview += `
	let channel = '${customChannel}';

	let appChannel = await fdc3.getOrCreateChannel(channel);

	console.log('broadcasting on ' + appChannel.type + 
	' channel: ' + appChannel.id, context);

	appChannel.broadcast(context);
`;
	}
	previewData.codePreview += `
}`;

	previewData.codePreview += `
	
// --------------------------------
// Listening code
// --------------------------------
if(window.fdc3 !== undefined) {
`;

	if (channelType === SYSTEM_CHANNEL) {
		previewData.codePreview += `	
	const systemHandler = (ctx) => {

  		console.log("System Context Received: ", ctx);

	};

	const systemListener = fdc3.addContextListener(null, systemHandler);
`;
	} else if (channelType === APP_CHANNEL && customChannel !== undefined) {
		previewData.codePreview += `
	const appHandler = (ctx) => {
  
		console.log("App Channel Context Received: ", ctx);

	};

	let channel = '${customChannel}';

	let appChannel = await fdc3.getOrCreateChannel(channel);

	let appListener = appChannel.addContextListener(null, appHandler);
`;
	}
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

function bindFDC3OnChange() {
	const channelType = document.querySelector('#channelType');
	channelType.addEventListener('change', () => {
		const context = contextData[fdc3Type.value][fdc3Value.value];
		updateCodePreview(JSON.stringify(context, null, 5));
	});

	const fdc3Type = document.querySelector('#fdc3Type');
	fdc3Type.addEventListener('change', () => {
		bindFDC3Values(contextData[fdc3Type.value]);
	});

	const fdc3Value = document.querySelector('#fdc3Value');
	fdc3Value.addEventListener('change', () => {
		const context = contextData[fdc3Type.value][fdc3Value.value];
		bindFDC3Context(context);
		updateCodePreview(JSON.stringify(context, null, 5));
	});

	const specifiedContext = document.querySelector('#context');
	specifiedContext.addEventListener('change', () => {
		updateCodePreview(specifiedContext.value);
	});
}

function getContextToSend() {
	const contextInput = document.querySelector('#context');
	const context = contextInput.value;
	return JSON.parse(context);
}

function getChannelType() {
	const channelType = document.querySelector('#channelType');
	return channelType.value;
}

// -------------------------------------------------
// Init Functions
// -------------------------------------------------
async function init() {
	const btnBroadcast = document.querySelector('#btnBroadcast');
	btnBroadcast.addEventListener('click', async () => {
		try {
			const ctx = getContextToSend();
			const channelType = getChannelType();
			if (channelType === SYSTEM_CHANNEL) {
				await systemBroadcast(log, ctx);
			} else if (channelType === APP_CHANNEL) {
				await appBroadcast(log, customChannel, ctx);
			}
			showLogs();
		} catch (error) {
			console.error('Unable to broadcast context', error);
			log('Unable to broadcast current context. Likely a JSON parsing error:', error);
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
	const dataTypes = Object.keys(contextData);
	bindFDC3Types(dataTypes);
	bindFDC3OnChange();
	showCodePreview();
	await listenToSystemBroadcast(log, showLogs);
	await listenToAppBroadcast(log, customChannel, showLogs);
}

document.addEventListener('DOMContentLoaded', () => {
	try {
		init();
	} catch (error) {
		console.error(error);
	}
});
