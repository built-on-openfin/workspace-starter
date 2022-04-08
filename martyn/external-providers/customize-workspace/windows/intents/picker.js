let rejectAppSelection;
let resolveAppSelection;
let backBtn;
let launchBtn;
let cancelAppSelectionBtn;
let nextBtn;
let cancelIntentSelectionBtn;
let intentsContainer;
let appsContainer;
let intentSelectionContainer;
let appSelectionContainer;
let targetIntentLabel;
let targetContextLabel;

let intent;
let intents;
let apps;

function createEntry(name, label, value, checked = false) {
  let div = document.createElement("div");
  let radioButton = document.createElement("input");

  radioButton.type = "radio";
  radioButton.id = value;
  radioButton.value = value;
  radioButton.name = name;
  radioButton.checked = checked;

  let labelForRadioButton = document.createElement("label");
  labelForRadioButton.for = value;
  labelForRadioButton.innerText = label;

  div.appendChild(radioButton);
  div.appendChild(labelForRadioButton);
  return div;
}

function getSelection(name) {
  let entries = document.getElementsByName(name);

  for (let i = 0; i < entries.length; i++) {
    if (entries[i].checked) {
      return entries[i].value;
    }
  }
}

function setIntentVisibility(isVisible) {
  intentSelectionContainer.style.display = isVisible ? "unset" : "none";
}

function setAppVisibility(isVisible) {
  appSelectionContainer.style.display = isVisible ? "unset" : "none";
}

function setupIntentView(intents) {
  if (Array.isArray(intents)) {
    let listName = "intent";
    if(intent.context?.type !== undefined) {
      targetContextLabel.innerText = intent.context.type;
    }

    for (let i = 0; i < intents.length; i++) {
      let intentEntry = createEntry(listName, intents[i].intent.displayName, intents[i].intent.name, i === 0);
      intentsContainer.appendChild(intentEntry);
    }

    cancelIntentSelectionBtn.onclick = async ()=> {
        if(rejectAppSelection !== undefined) {
            rejectAppSelection("Application selection cancelled.");
        }
        fin.me.close(true);
    }

    nextBtn.onclick = () => {
      let selectedIntentName = getSelection("intent");
      let selectedIntent = intents.find(entry => {
        if(entry.intent.name === selectedIntentName) {
          intent.displayName = entry.intent.displayName;
          intent.name = entry.intent.name;
          return true; 
        }
        return false;
      });

      if(selectedIntent !== undefined){
        setIntentVisibility(false);
        setupAppView(selectedIntent.apps);
        setAppVisibility(true);
      }
    };

    setAppVisibility(false);
    setIntentVisibility(true);
  }
}

function setupAppView(apps) {
  if (Array.isArray(apps)) {
    let listName = "app";
    if(intent.name !== undefined) {
      targetIntentLabel.innerText = intent.name;
    }
    appsContainer.replaceChildren();

    for (let i = 0; i < apps.length; i++) {
      let appEntry = createEntry(listName, apps[i].title, apps[i].appId, i === 0);
      appsContainer.appendChild(appEntry);
    }

    backBtn.onclick = ()=> {
      setAppVisibility(false);
      setIntentVisibility(true);
    };

    cancelAppSelectionBtn.onclick = async ()=> {
        if(rejectAppSelection !== undefined) {
            rejectAppSelection("Application selection cancelled.");
        }
        fin.me.close(true);
    }

    launchBtn.onclick = async () => {
      resolveAppSelection({ appId: getSelection(listName), intent });
      fin.me.close(true);
    };

    setAppVisibility(true);
  }
}

async function init() {
  intentSelectionContainer = document.getElementById("intent-select-container");
  targetContextLabel = document.getElementById("target-context");
  intentsContainer = document.getElementById("intent-container");
  nextBtn = document.getElementById("next");
  cancelIntentSelectionBtn = document.getElementById("cancel-intent-selection");

  appSelectionContainer = document.getElementById("app-select-container");
  targetIntentLabel = document.getElementById("target-intent");
  appsContainer = document.getElementById("app-container");
  backBtn = document.getElementById("back");
  launchBtn = document.getElementById("launch");
  launchBtn.disabled = true;
  cancelAppSelectionBtn = document.getElementById("cancel");
  
  let data = await fin.me.getOptions();
  
  if (
    data.customData !== undefined 
  ) {
    apps = data.customData.apps;
    intent = data.customData.intent;
    intents = data.customData.intents;
  }

  if(intents !== undefined) {
    backBtn.style.display = "unset";
    setupIntentView(intents);
  } else {
    setupAppView(apps);
  }
}

// this function is called by the interopbroker.ts file in the src directory so that it waits to see whether the end user has made a selection or cancelled the intent request.
window["getIntentSelection"] = async () => {
  launchBtn.disabled = false;
  return new Promise(
    (resolve, reject) => {
      resolveAppSelection = resolve;
      rejectAppSelection = reject;
    }
  );
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
