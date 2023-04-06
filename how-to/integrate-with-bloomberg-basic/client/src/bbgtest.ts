import { BloombergConnection,
    BloombergConnectionConfig,
    connect,
    ContextActionMap,
    IntentActionMap,
    isBloombergTerminalReady } from "@openfin/bloomberg";
import { fin } from "@openfin/core";
import type { InteropClient } from "@openfin/core/src/api/interop";

const interopConfig = {
    currentContextGroup: "green"
};

let bbgConnection: BloombergConnection;
let client: InteropClient;
let isConnected = false;

// global vars
let selectedIntent = "";
let fdc3Denomination = "";
let bbgMnemonic = "";
let intentValue = "";

window.addEventListener("DOMContentLoaded", async () => {
	initDom();
});

const initDom = () => {
    const btnConnect = document.querySelector("#btnConnect");
    const btnClearLogs = document.querySelector("#btnClear");
    const btnQuery = document.querySelector("#btnQuery");
    const inputText = document.querySelector("#intentValue");
    const selectChoice = document.querySelector("#intentName");

    let selectOptions: HTMLSelectElement;
    selectOptions = document.querySelector<HTMLSelectElement>("#intentName");

    selectOptions.selectedIndex = -1;

    btnConnect.addEventListener("click", connectToBBGTerminal);
    btnClearLogs.addEventListener("click", clearLogs);
    btnQuery.addEventListener("click", createAndFireIntent);
    inputText.addEventListener("input", getInputValue);

    selectChoice.addEventListener("change", function handleChange(event) {
        console.log(event);
        switch(this.value) {
            case "ViewChart":
                // document.querySelector("#selectChoice").innerHTML = "Intent to be fired is ViewChart. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: GP";
                logInformation("Intent to be fired is ViewChart. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: GP");
                selectedIntent = "ViewChart";
                fdc3Denomination = "fdc3.instrument";
                bbgMnemonic = "GP";
                break;
            case "ViewContact":
                logInformation("Intent to be fired is ViewContact. Content Type is fdc3.contact. Bloomberg Terminal Mnemonic: BIO");
                selectedIntent = "ViewContact";
                fdc3Denomination = "fdc3.contact";
                bbgMnemonic = "BIO";
                break;
            case "ViewInstrument":
                logInformation("Intent to be fired is ViewInstrument. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: DES");
                selectedIntent = "ViewInstrument";
                fdc3Denomination = "fdc3.instrument";
                bbgMnemonic = "DES";
                break;
            case "ViewQuote":
                logInformation("Intent to be fired is ViewQuote. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: Q");
                selectedIntent = "ViewQuote";
                fdc3Denomination = "fdc3.instrument";
                bbgMnemonic = "Q";
                break;
        }
    });
};

// inputText element's addEventListener handler
const getInputValue = (e) => {
    const inputVal = e.target.value;
    intentValue = inputVal;
    console.log(inputVal);
};

// Connect to Bloomberg Terminal
const connectToBBGTerminal = async (): Promise<void> => {
    try {
        logInformation("Checking Bloomberg Terminal Status");

        if (!(await isBloombergTerminalReady())) {
            const error = new Error("Failed to connect to Bloomberg terminal.");
            console.log(error);
            logInformation("Failed to connect to Bloomberg terminal.");
            throw error;
          }

        bbgConnection = await connect();
        logInformation("Connection successful");
        isConnected = true;
    } catch (error) {
        console.log(error);
        logInformation(String(error.message));
        isConnected = false;
    }
};

// Connect to InterOp broker
const connectToBroker = async () => {
    const interopBroker = await fin.Interop.init("openfin");

    client = fin.Interop.connectSync("openfin", interopConfig);
};

const createAndFireIntent = (e: any) => {
    logInformation(`action: ${selectedIntent}, type: ${fdc3Denomination}, bbg mnemonic: ${bbgMnemonic}, search value: ${intentValue}`);
    // Define the intent to fire
    /*
    const intent = {
        action: "ViewChart",
        dataType: "Stock",
        data: {
          symbol: "AAPL"
        }
      };

      fireIntentforBBG(intent);
      */
};

// Fire an intent
const fireIntentforBBG = (intent: any) => {
    if(client) {
        client.fireIntent(intent);
    }
};

const logInformation = (info: string) => {
    const logElem = document.querySelector("#logOutput");

    if(logElem) {
        logElem.textContent = `${logElem.textContent + info}\n\n`;
	logElem.scrollTop = logElem.scrollHeight;
    }
};

const clearLogs = () => {
    const logElem = document.querySelector("#logOutput");

    if(logElem) {
        logElem.textContent = "";
	    logElem.scrollTop = 0;
    }
};

