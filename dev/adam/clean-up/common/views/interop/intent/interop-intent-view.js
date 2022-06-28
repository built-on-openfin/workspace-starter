import {
  getDefaultFDC3IntentData,
  getDefaultFDC3ContextData,
} from "../../fdc3/fdc3-data.js";
import { fireIntent, fireIntentForContext, listen } from "./interop-intent.js";

// -------------------------------------------------
// settings
// -------------------------------------------------
let contextData = getDefaultFDC3ContextData();
let intentData = getDefaultFDC3IntentData();

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
    optionsData?.contextData !== undefined &&
    optionsData?.contextData !== null
  ) {
    contextData = optionsData.contextData;
  }
  if (
    optionsData?.intentData !== undefined &&
    optionsData?.intentData !== null
  ) {
    intentData = optionsData.intentData;
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
  // Raising Intent code
  // ----------------------------------------------------
  let context = ${context};
`;

  let appSelection = getAppSelection();
  let isContextRequest = isRaiseByContext();

  if (appSelection !== "none" && appSelection !== "") {
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
  let intent = "${getIntentToRaise()}";
  
  const intentRequest = {
    name: intent,
    context,
    metadata: {
      target: app              
    }
  };
  const intentResolver = await fin.me.interop.fireIntent(intentRequest, app);
  if(intentResolver !== undefined) {
    log("Intent resolver received: ", intentResolver);
  }
`;
    }
  } else {
    if (isContextRequest) {
      previewData.codePreview += `
  const intentResolver = 
  await fin.me.interop.fireIntentForContext(context);
  if(intentResolver !== undefined) {
    console.log("Intent resolver received: ", intentResolver);
  }
  `;
    } else {
      previewData.codePreview += `
  let intent = "${getIntentToRaise()}";
    
  const intentRequest = {
    name: intent,
    context
  };
  const intentResolver = await fin.me.interop.fireIntent(intentRequest);
  if(intentResolver !== undefined) {
    log("Intent resolver received: ", intentResolver);
  }
  `;
    }
  }
  previewData.codePreview += `
}`;

  previewData.codePreview += `

if(window.fin !== undefined) {

  // ----------------------------------------------------
  // Listening code
  // ----------------------------------------------------
  let intent = "${getIntentToRaise()}";
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

function bindFDC3Intents(intents) {
  const fdc3Intent = document.querySelector("#fdc3Intents");
  let fdc3IntentOptions = intents
    .map((intent) => `<option value=${intent}>${intent}</option>`)
    .join("\n");
  fdc3Intent.innerHTML = fdc3IntentOptions;
  buildAppList()
    .then((apps) => {
      bindApps(apps);
    })
    .catch((error) => console.error(error));
}

function bindApps(apps) {
  const fdc3Apps = document.querySelector("#fdc3Apps");
  apps.unshift(
    { appId: "none", title: "No Preference" },
    { appId: "wrong-app", title: "Non Existent App" }
  );
  let fdc3AppOptions = apps
    .map((app) => `<option value=${app.appId}>${app.title}</option>`)
    .join("\n");
  fdc3Apps.innerHTML = fdc3AppOptions;
}

function getCombinedAppList(intents) {
  let combinedAppList = [];
  let combinedListOfAppIds = [];

  intents.forEach((intent) => {
    intent.apps.forEach((app) => {
      if (combinedListOfAppIds.indexOf(app.appId) === -1) {
        combinedAppList.push(app);
        combinedListOfAppIds.push(app.appId);
      }
    });
  });

  return combinedAppList;
}

function isRaiseByContext() {
  return "fireIntentForContext" === getIntentRaiseType();
}

async function buildAppList() {
  let intents = [];
  let findByContext = isRaiseByContext();

  try {
    if (findByContext) {
      intents = await window.fin.me.interop.getInfoForIntentsByContext(
        getContextToSend()
      );
    } else {
      let intent = await window.fin.me.interop.getInfoForIntent({
        name: getIntentToRaise(),
      });
      intents.push(intent);
    }
  } catch (error) {
    log(
      "Unable to look up intents to build a supporting app list. It could be this platform does not have a custom Interop Broker with intent support."
    );
    console.error(error);
    return [];
  }
  return getCombinedAppList(intents);
}

function bindFDC3OnChange() {
  const fdc3RaiseBy = document.querySelector("#intentType");
  const fdc3Intent = document.querySelector("#fdc3Intents");
  const fdc3Type = document.querySelector("#fdc3Type");
  const fdc3Value = document.querySelector("#fdc3Value");
  const fdc3Apps = document.querySelector("#fdc3Apps");
  const specifiedContext = document.querySelector("#context");
  const btnFireIntent = document.querySelector("#btnFireIntent");
  const btnFireIntentForContext = document.querySelector(
    "#btnFireIntentForContext"
  );

  fdc3RaiseBy.onchange = async () => {
    let apps = await buildAppList();
    await bindApps(apps);
    updateCodePreview(specifiedContext.value);
    if (isRaiseByContext()) {
      btnFireIntent.style.display = "none";
      btnFireIntentForContext.style.display = "unset";
    } else {
      btnFireIntent.style.display = "unset";
      btnFireIntentForContext.style.display = "none";
    }
  };

  fdc3Intent.onchange = async () => {
    let getFDC3Types = intentData[getIntentToRaise()];
    bindFDC3Types(getFDC3Types);
    let apps = await buildAppList();
    await bindApps(apps);
  };

  fdc3Type.onchange = async () => {
    bindFDC3Values(contextData[fdc3Type.value]);
    let apps = await buildAppList();
    await bindApps(apps);
  };

  fdc3Value.onchange = () => {
    const context = contextData[fdc3Type.value][fdc3Value.value];
    bindFDC3Context(context);
    updateCodePreview(JSON.stringify(context, null, 5));
  };

  specifiedContext.onchange = () => {
    updateCodePreview(specifiedContext.value);
  };

  fdc3Apps.onchange = () => {
    updateCodePreview(specifiedContext.value);
  };
}

function getContextToSend() {
  const contextInput = document.querySelector("#context");
  const context = contextInput.value;
  return JSON.parse(context);
}

function getIntentToRaise() {
  const intent = document.querySelector("#fdc3Intents");
  return intent.value;
}

function getIntentRaiseType() {
  const intent = document.querySelector("#intentType");
  return intent.value;
}

function getAppSelection() {
  const intent = document.querySelector("#fdc3Apps");
  return intent.value;
}

// -------------------------------------------------
// Init Functions
// -------------------------------------------------
async function init() {
  const btnFireIntent = document.querySelector("#btnFireIntent");
  btnFireIntent.addEventListener("click", async () => {
    try {
      const ctx = getContextToSend();
      const intent = getIntentToRaise();
      let app = getAppSelection();
      if (app === "none" || app === "") {
        app = undefined;
      }
      await fireIntent(log, intent, ctx, app);
      showLogs();
    } catch (error) {
      console.error("Unable to fire intent", error);
      log(
        "Unable to fire intent. Likely a JSON parsing error or this platform does not have a custom interop broker implementation that supports intents:",
        error
      );
      showLogs();
    }
  });

  const btnFireIntentForContext = document.querySelector(
    "#btnFireIntentForContext"
  );
  btnFireIntentForContext.addEventListener("click", async () => {
    try {
      const ctx = getContextToSend();
      let app = getAppSelection();
      if (app === "none" || app === "") {
        app = undefined;
      }
      await fireIntentForContext(log, ctx, app);
      showLogs();
    } catch (error) {
      console.error("Unable to fire intent for context", error);
      log(
        "Unable to fire intent. Likely a JSON parsing error or this platform does not have a custom interop broker implementation that supports intents:",
        error
      );
      showLogs();
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
  const intentTypes = Object.keys(intentData);
  bindFDC3Intents(intentTypes);
  bindFDC3Types(intentData[getIntentToRaise()]);
  bindFDC3OnChange();
  showCodePreview();
  await listen(log, intentTypes, showLogs);
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    init();
  } catch (error) {
    console.error(error);
  }
});
