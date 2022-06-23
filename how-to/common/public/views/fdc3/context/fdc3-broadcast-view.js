import { getDefaultFDC3ContextData } from "../fdc3-data.js";
import {
  systemBroadcast,
  appBroadcast,
  listenToSystemBroadcast,
  listenToAppBroadcast,
} from "./fdc3-broadcast.js";
// -------------------------------------------------
// settings
// -------------------------------------------------
let contextData = getDefaultFDC3ContextData();
let customChannel = "custom-app-channel";
let isCodePreview = true;

let previewData = {
  codePreview: "",
  logs: "",
};

// -------------------------------------------------
// UI Functions
// -------------------------------------------------
async function applySettings() {
  const options = await fin.me.getOptions();
  const optionsData = options?.customData;
  if (
    optionsData.contextData !== undefined &&
    optionsData.contextData !== null
  ) {
    contextData = optionsData.contextData;
  }

  if (
    optionsData?.customChannel !== undefined &&
    optionsData.customChannel !== null &&
    optionsData.customChannel !== ""
  ) {
    customChannel = optionsData.customChannel;
  }
}

function updatePreview() {
  console.log("preview updated");
  if (isCodePreview) {
    showCodePreview();
  } else {
    showLogs();
  }
}

function showCodePreview() {
  isCodePreview = true;
  const preview = document.querySelector("#preview");
  preview.textContent = previewData.codePreview;
  const previewTitle = document.querySelector("#previewTitle");
  previewTitle.innerText = "Code Preview";
}

function updateCodePreview(context) {
  previewData.codePreview = `
if(window.fdc3 !== undefined) {

// ----------------------------------------------------
// Broadcasting code
// ----------------------------------------------------

const context = ${context};

const systemChannel = await fdc3.getCurrentChannel();
if(systemChannel !== null) {
  console.log('broadcasting on ' + systemChannel.type + 
  ' channel: ' + systemChannel.id, context);
  fdc3.broadcast(context);
} else {
  console.log("You are not bound to a system channel");
}
`;
  if (customChannel !== undefined) {
    previewData.codePreview += `
// alternatively you may have an app specific channel
// instead of using a system channel
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

if(window.fdc3 !== undefined) {

// ----------------------------------------------------
// Listening code
// ----------------------------------------------------

const systemHandler = (ctx) => {
  console.log("System Context Received: ", ctx);
};

const systemListener = fdc3.addContextListener(null, systemHandler);
`;
  if (customChannel !== undefined) {
    previewData.codePreview += `
// listen to a defined application channel
const appHandler = (ctx) => {
  console.log("App Channel Context Received: ", ctx);
};
let channel = '${customChannel}';
let appChannel = await fdc3.getOrCreateChannel(channel);

// listen for new app channel messages
let appListener = appChannel.addContextListener(null, appHandler);
`;
  }
  previewData.codePreview += `
}`;

  updatePreview();
}

function showLogs() {
  isCodePreview = false;
  const preview = document.querySelector("#preview");
  preview.textContent = previewData.logs;
  const previewTitle = document.querySelector("#previewTitle");
  previewTitle.innerText = "Logs";
}

function clearLogs() {
  previewData.logs = "";
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
  const specifiedContext = document.querySelector("#context");
  specifiedContext.value = JSON.stringify(value, null, 5);
}

function bindFDC3Values(values) {
  const fdc3Value = document.querySelector("#fdc3Value");
  let fdc3ValueOptions = values
    .map((data, index) => `<option value=${index}>${data.name}</option>`)
    .join("\n");
  fdc3Value.innerHTML = fdc3ValueOptions;
  const context = values[0];
  bindFDC3Context(context);
  updateCodePreview(JSON.stringify(context, null, 5));
}

function bindFDC3Types(types) {
  const fdc3Type = document.querySelector("#fdc3Type");
  let fdc3TypeOptions = types
    .map((type) => `<option value=${type}>${type}</option>`)
    .join("\n");
  fdc3Type.innerHTML = fdc3TypeOptions;
  bindFDC3Values(contextData[types[0]]);
}

function bindFDC3OnChange() {
  const fdc3Type = document.querySelector("#fdc3Type");
  fdc3Type.onchange = () => {
    bindFDC3Values(contextData[fdc3Type.value]);
  };

  const fdc3Value = document.querySelector("#fdc3Value");
  fdc3Value.onchange = () => {
    const context = contextData[fdc3Type.value][fdc3Value.value];
    bindFDC3Context(context);
    updateCodePreview(JSON.stringify(context, null, 5));
  };

  const specifiedContext = document.querySelector("#context");
  specifiedContext.onchange = () => {
    updateCodePreview(specifiedContext.value);
  };
}

function getContextToSend() {
  const contextInput = document.querySelector("#context");
  const context = contextInput.value;
  return JSON.parse(context);
}

// -------------------------------------------------
// Init Functions
// -------------------------------------------------
async function init() {
  const btnBroadcast = document.querySelector("#btnBroadcast");
  btnBroadcast.addEventListener("click", async () => {
    try {
      const ctx = getContextToSend();
      await systemBroadcast(log, ctx);
      await appBroadcast(log, customChannel, ctx);
      showLogs();
    } catch (error) {
      console.error("Unable to broadcast context", error);
      log(
        "Unable to broadcast current context. Likely a JSON parsing error:",
        error
      );
    }
  });

  const btnSeeCode = document.querySelector("#btnSeeCode");
  btnSeeCode.addEventListener("click", async () => {
    showCodePreview();
  });

  const btnSeeLogs = document.querySelector("#btnSeeLogs");
  btnSeeLogs.addEventListener("click", async () => {
    showLogs();
  });

  const btnClear = document.querySelector("#btnClear");
  btnClear.addEventListener("click", () => {
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

document.addEventListener("DOMContentLoaded", () => {
  try {
    init();
  } catch (error) {
    console.error(error);
  }
});
