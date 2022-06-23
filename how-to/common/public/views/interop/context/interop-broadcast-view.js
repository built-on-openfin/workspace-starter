import { getDefaultFDC3ContextData } from "../../fdc3/fdc3-data.js";
import {
  systemSetContext,
  sessionSetContext,
  listenToSystemContext,
  listenToSessionContext,
} from "./interop-broadcast.js";
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
if(window.fin !== undefined) {

  // ----------------------------------------------------
  // SetContext code
  // ----------------------------------------------------

  const context = ${context};

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
  if (customChannel !== undefined) {
    previewData.codePreview += `
  // alternatively you may have an app specific session 
  // context group instead of using a system contextual 
  // group
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

if(window.fin !== undefined) {

  // ----------------------------------------------------
  // Listening code
  // ----------------------------------------------------

  const systemHandler = (ctx) => {
    console.log("System Context Received: ", ctx);
  };

  const systemListener = 
    fin.me.interop.addContextHandler(systemHandler);
`;
  if (customChannel !== undefined) {
    previewData.codePreview += `
  // listen to a defined application session context group
  const appHandler = (ctx) => {
    console.log("App Session Context Received: ", ctx);
  };

  let sessionName = '${customChannel}';
  let appSessionContextGroup = 
    await fin.me.interop.joinSessionContextGroup(sessionName);
      
  // listen for new session context group messages
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
  const btnSetContext = document.querySelector("#btnSetContext");
  btnSetContext.addEventListener("click", async () => {
    try {
      const ctx = getContextToSend();
      await systemSetContext(log, ctx);
      await sessionSetContext(log, customChannel, ctx);
      showLogs();
    } catch (error) {
      console.error("Unable to set context", error);
      log(
        "Unable to call setContext for the current context. Likely a JSON parsing error:",
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
  await listenToSystemContext(log, showLogs);
  await listenToSessionContext(log, customChannel, showLogs);
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    init();
  } catch (error) {
    console.error(error);
  }
});
