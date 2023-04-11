import { BloombergConnection,
    BloombergConnectionConfig,
    connect,
    ContextActionMap,
    enableLogging,
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
    enableLogging();
	initDom();
});

const initDom = () => {
    const btnConnect = document.querySelector("#btnConnect");
    const btnDisconnect = document.querySelector("#btnDisconnect");
    const btnClearLogs = document.querySelector("#btnClear");
    const btnQuery = document.querySelector("#btnQuery");
    const inputText = document.querySelector("#intentValue");
    const selectChoice = document.querySelector("#intentName");

    let selectOptions: HTMLSelectElement;
    selectOptions = document.querySelector<HTMLSelectElement>("#intentName");

    selectOptions.selectedIndex = -1;

    btnConnect.addEventListener("click", connectToBBGTerminal);
    btnDisconnect.addEventListener("click", disconnectFromBBGTerminal);
    btnClearLogs.addEventListener("click", clearLogs);
    btnQuery.addEventListener("click", fireIntentforBBG);
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
    // console.log(inputVal);
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

// Disconnect from Bloomberg Terminal
const disconnectFromBBGTerminal = async () => {
    if(bbgConnection) {
        await bbgConnection.disconnect();
        bbgConnection = undefined;
        isConnected = false;
        logInformation("Disconnected from Bloomberg Terminal");
    }
};

// Fire an intent
const fireIntentforBBG = async () => {
    if(isConnected && bbgConnection) {
        try {
            logInformation(`action: ${selectedIntent}, type: ${fdc3Denomination}, bbg mnemonic: ${bbgMnemonic}, search value: ${intentValue}`);

            let intent: OpenFin.Intent;

            switch (selectedIntent) {
                case "ViewChart": 
                    intent = {
                        name: selectedIntent,
                        context: {
                            type: fdc3Denomination,
                            id: {
                                ticker: intentValue
                            }
                        }
                    };
                    break;
                case "ViewContact":
                    intent = {
                        name: selectedIntent,
                        context: {
                            type: fdc3Denomination,
                            name: intentValue,
                            id: {}
                        }
                    };
                    break;
                default:
                    intent = {
                        name: selectedIntent,
                        context: {
                            type: fdc3Denomination,
                            id: {
                                ticker: intentValue
                            }
                        }
                    };
                    break;
            }

            await fin.me.interop.fireIntent(intent);
        } catch (error) {
            logInformation(`Error while trying to raise intent: ${String(error.message)}`);
        }
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

