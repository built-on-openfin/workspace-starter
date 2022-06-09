/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
const showInstrument = document.querySelector('#selectInstrument');
let intentContainer;
let intentOptionsContainer;
let appContainer;
let apiContainer;
let actionContainer;
let contextSubscription;
let broadcastedInstrument;
let broadcastDataContainer;

const defaultFDC3InstrumentContext = {
  type: 'fdc3.instrument',
  id: {
    ticker: 'AAPL'
  }
};

showInstrument.addEventListener('click', async () => {
  document.querySelector('#myDropdown').classList.toggle('show');
});

async function onActionOrIntentSelection() {
  const useFDC3 = getTargetAPI() === 'fdc3';
  const useContext = getSelection() === defaultFDC3InstrumentContext.type;

  if (getAction() === 'broadcast') {
    if (useFDC3) {
      showInstrument.textContent = 'Broadcast Instrument using fdc3.broadcast';
    } else {
      showInstrument.textContent = 'Broadcast Instrument using interop.setContext';
    }
    broadcastDataContainer.style.display = 'unset';
    intentOptionsContainer.style.display = 'none';
  } else {
    if (useFDC3) {
      if (useContext) {
        showInstrument.textContent = 'Raise Intent By Context using fdc3.raiseIntentForContext';
      } else {
        showInstrument.textContent = 'Raise Intent using fdc3.raiseIntent';
      }
    } else if (useContext) {
      showInstrument.textContent = 'Raise Intent By Context using interop.fireIntentForContext';
    } else {
      showInstrument.textContent = 'Raise Intent using interop.fireIntent';
    }
    broadcastDataContainer.style.display = 'none';
    intentOptionsContainer.style.display = 'unset';
  }
}

async function onSelectionChange(radio) {
  if (radio !== undefined && radio !== null && radio.target !== undefined && radio.target !== null) {
    if (radio.target.name === 'intent') {
      await buildAppList();
      await onActionOrIntentSelection();
    }

    if (radio.target.name === 'api') {
      await buildActionList();
      await buildIntentList();
      await buildAppList();
      await listenToContext();
    }

    if (radio.target.name === 'action') {
      await onActionOrIntentSelection();
    }
  }
}

function createEntry(name, label, value, checked = false, addEventListener = false) {
  const div = document.createElement('div');
  const radioButton = document.createElement('input');

  radioButton.type = 'radio';
  radioButton.id = value;
  radioButton.value = value;
  radioButton.name = name;
  radioButton.checked = checked;
  if (addEventListener) {
    radioButton.addEventListener('change', onSelectionChange.bind(this));
  }

  const labelForRadioButton = document.createElement('label');
  labelForRadioButton.for = value;
  labelForRadioButton.textContent = label;

  div.append(radioButton);
  div.append(labelForRadioButton);
  return div;
}

function getSelection() {
  const intents = document.getElementsByName('intent');

  for (let i = 0; i < intents.length; i++) {
    if (intents[i].checked) {
      return intents[i].value;
    }
  }
}

function getAction() {
  const intents = document.getElementsByName('action');

  for (let i = 0; i < intents.length; i++) {
    if (intents[i].checked) {
      return intents[i].value;
    }
  }
}

function getAppPreference() {
  const apps = document.getElementsByName('app');
  let preferredApp;

  for (let i = 0; i < apps.length; i++) {
    if (apps[i].checked) {
      preferredApp = apps[i].value;
    }
  }

  if (preferredApp === 'none') {
    return;
  }
  return preferredApp;
}

function getTargetAPI() {
  const intents = document.getElementsByName('api');

  for (let i = 0; i < intents.length; i++) {
    if (intents[i].checked) {
      return intents[i].value;
    }
  }
}

function onContextChange(ctx) {
  console.log('Context Received:', ctx);
  if (ctx.type === 'instrument' || ctx.type === 'fdc3.instrument') {
    setInstrument(ctx);
  }
}

async function listenToContext() {
  const api = getTargetAPI();

  if (contextSubscription !== undefined) {
    contextSubscription.unsubscribe();
  }

  if (api === 'fdc3') {
    contextSubscription = window.fdc3.addContextListener(onContextChange.bind(this));
  } else {
    contextSubscription = window.fin.me.interop.addContextHandler(onContextChange.bind(this));
  }
}

async function fdc3Broadcast(context) {
  const fdc3Channel = await fdc3.getCurrentChannel();
  if (fdc3Channel !== null) {
    window.fdc3.broadcast(context);
    broadcastedInstrument.textContent = `Instrument (${context.id.ticker}) sent via fdc3.broadcast against the ${fdc3Channel.displayMetadata.name} channel.`;
  } else {
    broadcastedInstrument.textContent = `Instrument (${context.id.ticker}) not sent via fdc3.broadcast as you are not joined to an fdc3 channel.`;
  }
}

async function fdc3RaiseIntent(context) {
  const userSelection = getSelection();
  if (context.type === userSelection) {
    return await window.fdc3.raiseIntentForContext(context, getAppPreference());
  }
  return await window.fdc3.raiseIntent(userSelection, context, getAppPreference());
}

async function interopSetContext(context) {
  const contextGroup = await fdc3.getCurrentChannel();
  if (contextGroup !== null) {
    window.fin.me.interop.setContext(context);
    broadcastedInstrument.textContent = `Instrument (${context.id.ticker}) sent via interop.setContext against the ${contextGroup.displayMetadata.name} context group.`;
  } else {
    broadcastedInstrument.textContent = `Instrument (${context.id.ticker}) not sent via interop.setContext as you are not part of a context group.`;
  }
}

async function interopFireIntent(context) {
  const userSelection = getSelection();
  if (context.type === userSelection) {
    context.metadata = {
      target: getAppPreference()
    };
    intentResolver = await fin.me.interop.fireIntentForContext(context);
  } else {
    const intent = {
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
    console.log(`Instrument selected: ${selectedInstrument}`);
    if (window.fin !== undefined) {
      const targetApi = getTargetAPI();
      const action = getAction();
      let intentResolver;
      const context = {
        type: defaultFDC3InstrumentContext.type,
        id: { ticker: selectedInstrument }
      };

      if (targetApi === 'fdc3') {
        if (action === 'broadcast') {
          await fdc3Broadcast(context);
        } else {
          intentResolver = await fdc3RaiseIntent(context);
        }
      } else if (action === 'broadcast') {
        await interopSetContext(context);
      } else {
        intentResolver = await interopFireIntent(context);
      }
      if (intentResolver !== undefined) {
        console.log('Intent resolver received:', intentResolver);
      }
    }
  }
}

// Close the dropdown menu if the user clicks outside of it
window.addEventListener('click', async (event) => {
  if (!event.target.matches('.dropbtn')) {
    const selectedInstrument = event.target.dataset.ticker;

    if (selectedInstrument !== null) {
      await onInstrumentSelection(selectedInstrument);
    }
    const dropdowns = document.querySelectorAll('.dropdown-content');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
});

function setInstrument(ctx) {
  const container = document.querySelector('#instrument-container');
  const instrumentMap = {
    TSLA: 'TESLA',
    MSFT: 'Microsoft',
    AAPL: 'Apple'
  };
  const name = document.querySelector('#name');
  const ticker = document.querySelector('#ticker');
  const type = document.querySelector('#type');

  container.style.display = 'unset';
  if (ctx.id !== undefined && ctx.id.ticker !== undefined && instrumentMap[ctx.id.ticker] !== undefined) {
    name.textContent = instrumentMap[ctx.id.ticker];
    ticker.textContent = ctx.id.ticker;
    type.textContent = ctx.type;
  } else {
    name.textContent = '';
    ticker.textContent = '';
    type.textContent = '';
  }
}

async function buildApiList() {
  apiContainer.replaceChildren();
  const interopEntry = createEntry('api', 'Interop API', 'interop', false, true);
  const fdc3Entry = createEntry('api', 'FDC3 API', 'fdc3', true, true);
  apiContainer.append(fdc3Entry);
  apiContainer.append(interopEntry);
}

async function buildActionList() {
  actionContainer.replaceChildren();
  let intentEntry;
  let broadcastEntry;

  if (getTargetAPI() === 'fdc3') {
    intentEntry = createEntry('action', 'fdc3.raiseIntent / fdc3.raiseIntentForContext', 'raise-intent', true, true);
    broadcastEntry = createEntry('action', 'fdc3.broadcast / fdc3.addContextListener', 'broadcast', false, true);
  } else {
    intentEntry = createEntry(
      'action',
      'interop.fireIntent / interop.fireIntentForContext',
      'raise-intent',
      true,
      true
    );
    broadcastEntry = createEntry('action', 'interop.setContext / interop.addContextHandler', 'broadcast', false, true);
  }

  actionContainer.append(intentEntry);
  actionContainer.append(broadcastEntry);
  await onActionOrIntentSelection();
}

async function buildIntentList() {
  const api = getTargetAPI();
  const selection = getSelection();
  let intents;
  if (api === 'fdc3') {
    intents = await window.fdc3.findIntentsByContext(defaultFDC3InstrumentContext);
  } else {
    intents = await fin.me.interop.getInfoForIntentsByContext(defaultFDC3InstrumentContext);
  }
  if (Array.isArray(intents)) {
    intentContainer.replaceChildren();
    for (const intentResult of intents) {
      const entry = createEntry(
        'intent',
        intentResult.intent.displayName,
        intentResult.intent.name,
        intentResult.intent.name === selection,
        true
      );
      intentContainer.append(entry);
    }
  }
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

async function buildAppList() {
  const api = getTargetAPI();
  const selection = getSelection();
  const previousApp = getAppPreference();
  let previousAppMatchFound = false;
  let intents = [];
  const findByContext = selection === defaultFDC3InstrumentContext.type;
  if (api === 'fdc3') {
    if (findByContext) {
      intents = await window.fdc3.findIntentsByContext(defaultFDC3InstrumentContext);
    } else {
      const intent = await window.fdc3.findIntent(selection);
      intents.push(intent);
    }
  } else if (findByContext) {
    intents = await fin.me.interop.getInfoForIntentsByContext(defaultFDC3InstrumentContext);
  } else {
    const intent = await fin.me.interop.getInfoForIntent({ name: selection });
    intents.push(intent);
  }
  if (Array.isArray(intents) && intents.length > 0) {
    appContainer.replaceChildren();

    const apps = getCombinedAppList(intents);
    for (const app of apps) {
      if (previousApp === app.appId) {
        previousAppMatchFound = true;
      }
      const entry = createEntry('app', app.title, app.appId, app.appId === previousApp);
      appContainer.append(entry);
    }

    if (!previousAppMatchFound && previousApp !== 'appdoesnotexist') {
      const noPreferenceOption = document.querySelector('#none');
      noPreferenceOption.checked = true;
    }
  }
}

async function init() {
  if (window.fdc3 !== undefined) {
    intentContainer = document.querySelector('#intent-container');
    appContainer = document.querySelector('#app-container');
    apiContainer = document.querySelector('#api-container');
    broadcastedInstrument = document.querySelector('#broadcasted-instrument');
    const contextSelection = document.querySelector('#fdc3.instrument');
    contextSelection.addEventListener('change', onSelectionChange.bind(this));
    actionContainer = document.querySelector('#action-container');
    intentOptionsContainer = document.querySelector('#intent-options-container');
    broadcastDataContainer = document.querySelector('#broadcast-data-container');
    await buildApiList();
    await buildActionList();
    await buildIntentList();
    await buildAppList();
    await listenToContext();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
