import { BloombergConnection,
    BloombergConnectionConfig,
    connect,
    ContextActionMap,
    IntentActionMap,
    isBloombergTerminalReady } from "@openfin/bloomberg";
import { fin } from "@openfin/core";
// import { getCurrentSync, init as workspacePlatformInit } from "@openfin/workspace-platform";
import { init as initialisePlatform } from "./platform";


const interopConfig = {
    currentContextGroup: "green"
};

let bbgConnection;
let client;
let isConnected = false;

window.addEventListener("DOMContentLoaded", async () => {
	const platform = fin.Platform.getCurrentSync();

	// await platform.once("platform-api-ready", async () => bootstrap());

	initDom();

	await initialisePlatform();
});

const initDom = () => {
    const btnConnect = document.querySelector("#btnConnect");
    const btnClearLogs = document.querySelector("#btnClear");
    const selectChoice = document.querySelector("#intentName");

    let selectOptions: HTMLSelectElement;
    selectOptions = document.querySelector<HTMLSelectElement>("#intentName");

    selectOptions.selectedIndex = -1;

    btnConnect.addEventListener("click", connectToBBGTerminal);
    btnClearLogs.addEventListener("click", clearLogs);
    selectChoice.addEventListener("change", function handleChange(event) {
        switch(this.value) {
            case "ViewChart":
                // document.querySelector("#selectChoice").innerHTML = "Intent to be fired is ViewChart. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: GP";
                logInformation("Intent to be fired is ViewChart. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: GP");
                break;
            case "ViewContact":
                // document.querySelector("#selectChoice").innerHTML = "Intent to be fired is ViewContact. Content Type is fdc3.contact. Bloomberg Terminal Mnemonic: BIO";
                logInformation("Intent to be fired is ViewContact. Content Type is fdc3.contact. Bloomberg Terminal Mnemonic: BIO");
                break;
            case "ViewInstrument":
                // document.querySelector("#selectChoice").innerHTML = "Intent to be fired is ViewInstrument. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: DES";
                logInformation("Intent to be fired is ViewInstrument. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: DES");
                break;
            case "ViewQuote":
                // document.querySelector("#selectChoice").innerHTML = "Intent to be fired is ViewQuote. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: Q";
                logInformation("Intent to be fired is ViewQuote. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: Q");
                break;
        }
    });
};


// Connect to Bloomberg Terminal
const connectToBBGTerminal = async (): Promise<void> => {
    try {
        if (!(await isBloombergTerminalReady())) {
            const error = new Error("Failed to connect to Bloomberg terminal.");
            console.log(error);
            logInformation("Failed to connect to Bloomberg terminal.");
            throw error;
          }

        bbgConnection = await connect();

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


// Fire an intent
const fireIntentforBBG = (intent) => {
    if(client) {
        client.fireIntent(intent);
    }
};

export function logInformation(info: string) {
    const logElem = document.querySelector("#logOutput");

    if(logElem) {
        logElem.textContent = `${logElem.textContent + info}\n\n`;
	logElem.scrollTop = logElem.scrollHeight;
    }
}

const clearLogs = () => {
    const logElem = document.querySelector("#logOutput");

    if(logElem) {
        logElem.textContent = "";
	    logElem.scrollTop = 0;
    }
};

