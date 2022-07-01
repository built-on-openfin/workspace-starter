import { getDefaultFDC3ContextData } from '../../fdc3/fdc3-data.js';
import {
	systemSetContext,
	sessionSetContext,
	listenToSystemContext,
	listenToSessionContext
} from './interop-broadcast.js';
// -------------------------------------------------
// settings
// -------------------------------------------------
let contextData = getDefaultFDC3ContextData();
let customChannel = 'custom-app-channel';
let isCodePreview = true;
const SYSTEM_CONTEXT_GROUP = 'systemContextGroup';
const SESSION_CONTEXT_GROUP = 'sessionContextGroup';

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
	const contextGroupType = getContextGroupType();

	previewData.codePreview = `
// --------------------------------
// SetContext code
// --------------------------------  
if(window.fin !== undefined) {

	const context = ${context};
`;

	if (contextGroupType === SYSTEM_CONTEXT_GROUP) {
		previewData.codePreview += `
	try {

    	console.log(
      	"setting context on system contextual group",
      	context
    	);

    	fin.me.interop.setContext(context);

  	} catch(error) {
    
		console.warn(
      	"You are not bound to a system context group" +
      	" and are unable to set context",
      	error
		);

	}
`;
	} else if (customChannel !== undefined && contextGroupType === SESSION_CONTEXT_GROUP) {
		previewData.codePreview += `
	let sessionName = '${customChannel}';
 
  	let appSessionContextGroup = 
    await fin.me.interop.joinSessionContextGroup(sessionName);
 
	console.log(
    "Setting context on session context group " + sessionName,
    context
  	);

  	appSessionContextGroup.setContext(context);
`;
	}
	previewData.codePreview += `
}`;

	previewData.codePreview += `

// --------------------------------
// Listening code
// --------------------------------
if(window.fin !== undefined) {
`;

	if (contextGroupType === SYSTEM_CONTEXT_GROUP) {
		previewData.codePreview += `
	const systemHandler = (ctx) => {

    	console.log("System Context Received: ", ctx);
  
	};

  	const systemListener = 
    fin.me.interop.addContextHandler(systemHandler);
`;
	} else if (customChannel !== undefined && contextGroupType === SESSION_CONTEXT_GROUP) {
		previewData.codePreview += `
  	const appHandler = (ctx) => {

    	console.log("App Session Context Received: ", ctx);
  
	};

  	let sessionName = '${customChannel}';

  	let appSessionContextGroup = 
    await fin.me.interop.joinSessionContextGroup(sessionName);
      
  	console.log("Listening for app session context group: " + 
  	appSessionContextGroupName + " context.");

  	let appListener = 
    appSessionContextGroup.addContextHandler(appHandler);
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
	const channelType = document.querySelector('#contextGroupType');
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

function getContextGroupType() {
	const contextGroupType = document.querySelector('#contextGroupType');
	return contextGroupType.value;
}

async function logEnvironment() {
	if (window.fin !== undefined) {
		const contextGroups = await window.fin.me.interop.getContextGroups();
		if (Array.isArray(contextGroups)) {
			log('-- Available System Context Groups -- ');
			for (let i = 0; i < contextGroups.length; i++) {
				log(`- ${contextGroups[i].id}`);
			}
			log('-- Available System Context Groups -- ');
		}
	}
}

// -------------------------------------------------
// Init Functions
// -------------------------------------------------
async function init() {
	const btnSetContext = document.querySelector('#btnSetContext');
	btnSetContext.addEventListener('click', async () => {
		try {
			const ctx = getContextToSend();
			const contextGroupType = getContextGroupType();

			if (contextGroupType === SYSTEM_CONTEXT_GROUP) {
				await systemSetContext(log, ctx);
			} else if (contextGroupType === SESSION_CONTEXT_GROUP) {
				await sessionSetContext(log, customChannel, ctx);
			}
			showLogs();
		} catch (error) {
			console.error('Unable to set context', error);
			log('Unable to call setContext for the current context. Likely a JSON parsing error:', error);
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

	await logEnvironment();
	await applySettings();
	const dataTypes = Object.keys(contextData);
	bindFDC3Types(dataTypes);
	bindFDC3OnChange();
	showCodePreview();
	await listenToSystemContext(log, showLogs);
	await listenToSessionContext(log, customChannel, showLogs);
}

document.addEventListener('DOMContentLoaded', () => {
	try {
		init();
	} catch (error) {
		console.error(error);
	}
});
