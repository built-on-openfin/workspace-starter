/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
let showInstrument = document.getElementById("selectInstrument");
let intentContainer;
let intentOptionsContainer;
let appContainer;
let apiContainer;
let actionContainer;
let contextSubscription;
let broadcastedInstrument;
let broadcastDataContainer;

let defaultFDC3InstrumentContext = {
  "type": "fdc3.instrument",
  "id": {
    "ticker": "AAPL"
  }
};

showInstrument.onclick = async () => {
  document.getElementById("myDropdown").classList.toggle("show");
};

async function onActionOrIntentSelection() {
  let useFDC3 = getTargetAPI() === "fdc3";
  let useContext = getSelection() === defaultFDC3InstrumentContext.type;

  if(getAction() === "broadcast") {
    if(useFDC3) {
      showInstrument.innerText = "Broadcast Instrument using fdc3.broadcast";
    } else {
      showInstrument.innerText = "Broadcast Instrument using interop.setContext";
    }
    broadcastDataContainer.style.display = "unset";
    intentOptionsContainer.style.display = "none";
  } else {
    if(useFDC3) {
      if(useContext) {
        showInstrument.innerText = "Raise Intent By Context using fdc3.raiseIntentForContext";
      } else {
        showInstrument.innerText = "Raise Intent using fdc3.raiseIntent";
      }
    } else {
      if(useContext) {
        showInstrument.innerText = "Raise Intent By Context using interop.fireIntentForContext";
      } else {
        showInstrument.innerText = "Raise Intent using interop.fireIntent";
      }
    }
    broadcastDataContainer.style.display = "none";
    intentOptionsContainer.style.display = "unset";
  }
}

async function onSelectionChange(radio) {
  if(radio !== undefined && radio !== null && radio.target !== undefined && radio.target !== null) {
    if(radio.target.name === "intent") {
      await buildAppList();
      await onActionOrIntentSelection();
    }

    if(radio.target.name === "api") {
      await buildActionList();
      await buildIntentList();
      await buildAppList();
      await listenToContext();
    }

    if(radio.target.name === "action") {
      await onActionOrIntentSelection();
    }
  }
}

function createEntry(name, label, value, checked = false, addEventListener = false)  {
  let div = document.createElement("div");
  let radioButton = document.createElement("input");

  radioButton.type = "radio";
  radioButton.id = value;
  radioButton.value = value;
  radioButton.name = name;
  radioButton.checked = checked;
  if(addEventListener) {
    radioButton.addEventListener("change", onSelectionChange.bind(this));
  }

  let labelForRadioButton = document.createElement("label");
  labelForRadioButton.for = value;
  labelForRadioButton.innerText = label;

  div.appendChild(radioButton);
  div.appendChild(labelForRadioButton);
  return div;
}


function getSelection() {
  let intents = document.getElementsByName("intent");

  for (let i = 0; i < intents.length; i++) {
    if (intents[i].checked) {
      return intents[i].value;
    }
  }
}

function getAction() {
  let intents = document.getElementsByName("action");

  for (let i = 0; i < intents.length; i++) {
    if (intents[i].checked) {
      return intents[i].value;
    }
  }
}

function getAppPreference() {
  let apps = document.getElementsByName("app");
  let preferredApp;

  for (let i = 0; i < apps.length; i++) {
    if (apps[i].checked) {
      preferredApp = apps[i].value;
    }
  }

  if(preferredApp === "none") {
    return undefined;
  }
  return preferredApp;
}

function getTargetAPI() {
  let intents = document.getElementsByName("api");

  for (let i = 0; i < intents.length; i++) {
    if (intents[i].checked) {
      return intents[i].value;
    }
  }
}

function onContextChange(ctx) {
  console.log("Context Received: ", ctx);
  if (ctx.type === "instrument" || ctx.type === "fdc3.instrument") {
    setInstrument(ctx);
  }
}

async function listenToContext() {
  let api = getTargetAPI();

  if(contextSubscription !== undefined) {
    contextSubscription.unsubscribe();
  }

  if(api === "fdc3") {
    contextSubscription = window.fdc3.addContextListener(onContextChange.bind(this));
  } else {
    contextSubscription = window.fin.me.interop.addContextHandler(onContextChange.bind(this));
  }
}

async function fdc3Broadcast(context) {
  let fdc3Channel = await fdc3.getCurrentChannel();
  if(fdc3Channel !== null) {
    window.fdc3.broadcast(context);
    broadcastedInstrument.innerText = "Instrument (" + context.id.ticker + ") sent via fdc3.broadcast against the " + fdc3Channel.displayMetadata.name + " channel.";
  } else {
    broadcastedInstrument.innerText = "Instrument (" + context.id.ticker + ") not sent via fdc3.broadcast as you are not joined to an fdc3 channel.";
  }
}

async function fdc3RaiseIntent(context) {
  let userSelection = getSelection();
  if(context.type === userSelection) {
    return await window.fdc3.raiseIntentForContext(context, getAppPreference());
  } else {
    return await window.fdc3.raiseIntent(userSelection, context, getAppPreference());
  }
}

async function interopSetContext(context) {
  let contextGroup = await fdc3.getCurrentChannel();
  if(contextGroup !== null) {
    window.fin.me.interop.setContext(context);
    broadcastedInstrument.innerText = "Instrument (" + context.id.ticker + ") sent via interop.setContext against the " + contextGroup.displayMetadata.name + " context group.";
  } else {
    broadcastedInstrument.innerText = "Instrument (" + context.id.ticker + ") not sent via interop.setContext as you are not part of a context group.";
  }
}

async function interopFireIntent(context) {
  let userSelection = getSelection();
  if(context.type === userSelection) {
    context.metadata = {
      target: getAppPreference()              
    };
    intentResolver = await fin.me.interop.fireIntentForContext(context);
  } else {
    let intent = {
      name: userSelection,
      context,
      metadata: {
        target: getAppPreference()              
      }
    };
    intentResolver = await fin.me.interop.fireIntent(intent, getAppPreference());
  }
}

async function onInstrumentSelection(selectedInstrument) {
  if (selectedInstrument !== undefined && selectedInstrument !== null) {
    console.log("Instrument selected: " + selectedInstrument);
    if (window.fin !== undefined) {
      let targetApi = getTargetAPI();
      let action = getAction();
      let intentResolver;
      let context = {
        type: defaultFDC3InstrumentContext.type,
        id: { ticker: selectedInstrument },
      };

      if (targetApi === "fdc3") {
        if(action === "broadcast") {
          await fdc3Broadcast(context);
        } else {
          intentResolver = await fdc3RaiseIntent(context);
        }
      } else {
        if(action === "broadcast") {
          await interopSetContext(context);
        } else {
          intentResolver = await interopFireIntent(context);
        } 
      }
      if(intentResolver !== undefined) {
        console.log("Intent resolver received: ", intentResolver);
      }
    }
  }
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = async function (event) {
  if (!event.target.matches(".dropbtn")) {
    let selectedInstrument = event.target.getAttribute("data-ticker");

    if (selectedInstrument !== null) {
      await onInstrumentSelection(selectedInstrument);
    }
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function setInstrument(ctx) {
  let container = document.getElementById("instrument-container");
  let instrumentMap = {
    TSLA: "TESLA",
    MSFT: "Microsoft",
    AAPL: "Apple",
  };
  let name = document.getElementById("name");
  let ticker = document.getElementById("ticker");
  let type = document.getElementById("type");

  container.style.display = "unset";
  if (
    ctx.id !== undefined &&
    ctx.id.ticker !== undefined &&
    instrumentMap[ctx.id.ticker] !== undefined
  ) {
    name.innerText = instrumentMap[ctx.id.ticker];
    ticker.innerText = ctx.id.ticker;
    type.innerText = ctx.type;
  } else {
    name.innerText = "";
    ticker.innerText = "";
    type.innerText = "";
  }
}

async function buildApiList() {
  apiContainer.replaceChildren();
  let interopEntry = createEntry("api", "Interop API", "interop", false, true);
  let fdc3Entry = createEntry("api", "FDC3 API", "fdc3", true, true);
  apiContainer.appendChild(fdc3Entry);
  apiContainer.appendChild(interopEntry);
}

async function buildActionList() {
  actionContainer.replaceChildren();
  let intentEntry;
  let broadcastEntry;
  
  if(getTargetAPI() === "fdc3") {
    intentEntry = createEntry("action", "fdc3.raiseIntent / fdc3.raiseIntentForContext", "raise-intent", true, true);  
    broadcastEntry = createEntry("action", "fdc3.broadcast / fdc3.addContextListener", "broadcast", false, true);  
  } else {
    intentEntry = createEntry("action", "interop.fireIntent / interop.fireIntentForContext", "raise-intent", true, true);
    broadcastEntry = createEntry("action", "interop.setContext / interop.addContextHandler", "broadcast", false, true);  
  }

  actionContainer.appendChild(intentEntry);
  actionContainer.appendChild(broadcastEntry);
  await onActionOrIntentSelection();
}

async function buildIntentList() {
  let api = getTargetAPI();
  let selection = getSelection();
  let intents;
  if(api === "fdc3") {
    intents = await window.fdc3.findIntentsByContext(defaultFDC3InstrumentContext);
  } else {
    intents = await fin.me.interop.getInfoForIntentsByContext(defaultFDC3InstrumentContext);
  }
  if(Array.isArray(intents)) {
    intentContainer.replaceChildren();
    intents.forEach(intentResult => {
      let entry =  createEntry("intent", intentResult.intent.displayName, intentResult.intent.name, intentResult.intent.name === selection, true );
      intentContainer.appendChild(entry);
    });
  }
}

function getCombinedAppList(intents) {
    let combinedAppList = [];
    let combinedListOfAppIds = [];

    intents.forEach(intent => {
        intent.apps.forEach(app => {
          if(combinedListOfAppIds.indexOf(app.appId) === -1) {
            combinedAppList.push(app);
            combinedListOfAppIds.push(app.appId);
          }
        });
    });

    return combinedAppList;
}

async function buildAppList() {
  let api = getTargetAPI();
  let selection = getSelection();
  let previousApp = getAppPreference();
  let previousAppMatchFound = false;
  let intents = [];
  let findByContext = selection === defaultFDC3InstrumentContext.type;
  if(api === "fdc3") {

    if(findByContext) {
      intents = await window.fdc3.findIntentsByContext(defaultFDC3InstrumentContext);
    } else {
      let intent = await window.fdc3.findIntent(selection);
      intents.push(intent);
    }

  } else {
    if(findByContext) {
      intents = await fin.me.interop.getInfoForIntentsByContext(defaultFDC3InstrumentContext);
    } else {
      let intent = await fin.me.interop.getInfoForIntent({name: selection});
      intents.push(intent);
    }
  }
  if(Array.isArray(intents) && intents.length > 0) {
    appContainer.replaceChildren();
  
    let apps = getCombinedAppList(intents);
    apps.forEach(app => {
      if(previousApp === app.appId) {
        previousAppMatchFound = true;
      }
      let entry =  createEntry("app", app.title, app.appId, app.appId === previousApp);
      appContainer.appendChild(entry);
    });

    if(!previousAppMatchFound && previousApp !== "appdoesnotexist") {
      let noPreferenceOption = document.getElementById("none");
      noPreferenceOption.checked = true;
    }
  }
}

async function init() {
  if (window.fdc3 !== undefined) {
    
    intentContainer = document.getElementById("intent-container");
    appContainer = document.getElementById("app-container");
    apiContainer = document.getElementById("api-container");
    broadcastedInstrument = document.getElementById("broadcasted-instrument");
    let contextSelection = document.getElementById("fdc3.instrument");
    contextSelection.addEventListener("change", onSelectionChange.bind(this));
    actionContainer = document.getElementById("action-container");
    intentOptionsContainer = document.getElementById("intent-options-container");
    broadcastDataContainer = document.getElementById("broadcast-data-container");
    await buildApiList();
    await buildActionList();
    await buildIntentList();
    await buildAppList();
    await listenToContext();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
