import {
	connect,
	enableLogging,
	isBloombergTerminalReady,
	type BloombergConnection
} from "@openfin/bloomberg";
import type OpenFin from "@openfin/core";

let bbgConnection: BloombergConnection | undefined;

let selectedIntentType: string = "";
let selectedIntentValue: string = "";
let fdc3Denomination: string = "";
let bbgMnemonic: string = "";

let btnConnect: HTMLButtonElement | null;
let btnDisconnect: HTMLButtonElement | null;
let btnClearLogs: HTMLButtonElement | null;
let btnQuery: HTMLButtonElement | null;
let intentTypeElement: HTMLSelectElement | null;
let intentValueElement: HTMLSelectElement | null;
let logOutput: HTMLPreElement | null;

window.addEventListener("DOMContentLoaded", async () => {
	// Enable logging in the BBG package
	enableLogging();

	// Initialize the DOM elements.
	initializeDOM();
});

/**
 * Initialize the DOM.
 */
function initializeDOM(): void {
	btnConnect = document.querySelector<HTMLButtonElement>("#btnConnect");
	btnDisconnect = document.querySelector<HTMLButtonElement>("#btnDisconnect");
	btnClearLogs = document.querySelector<HTMLButtonElement>("#btnClear");
	btnQuery = document.querySelector<HTMLButtonElement>("#btnQuery");
	intentTypeElement = document.querySelector<HTMLSelectElement>("#intentType");
	intentValueElement = document.querySelector<HTMLSelectElement>("#intentValue");
	logOutput = document.querySelector<HTMLPreElement>("#logOutput");

	if (btnConnect) {
		btnConnect.addEventListener("click", async () => {
			if (btnConnect) {
				btnConnect.disabled = true;
			}
			await connectToBBGTerminal();
			updateState();
		});
	}
	if (btnDisconnect) {
		btnDisconnect.addEventListener("click", async () => {
			if (btnDisconnect) {
				btnDisconnect.disabled = true;
			}
			await disconnectFromBBGTerminal();
			updateState();
		});
	}
	if (btnClearLogs) {
		btnClearLogs.addEventListener("click", clearLogs);
	}
	if (btnQuery) {
		btnQuery.addEventListener("click", fireIntentForBBG);
	}

	if (intentTypeElement) {
		intentTypeElement.addEventListener("change", (event) => {
			if (intentTypeElement?.value) {
				if (btnQuery) {
					btnQuery.disabled = true;
				}
				switch (intentTypeElement?.value) {
					case "ViewChart":
						logInformation(
							"Intent to be fired is ViewChart. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: GP"
						);
						selectedIntentType = "ViewChart";
						fdc3Denomination = "fdc3.instrument";
						bbgMnemonic = "GP";
						populateSelect(intentValueElement, [
							{
								value: "ORCL",
								label: "Oracle Corp"
							},
							{
								value: "MSFT",
								label: "Microsoft"
							},
							{
								value: "IBM",
								label: "IBM"
							}
						]);
						break;
					case "ViewContact":
						logInformation(
							"Intent to be fired is ViewContact. Content Type is fdc3.contact. Bloomberg Terminal Mnemonic: BIO"
						);
						selectedIntentType = "ViewContact";
						fdc3Denomination = "fdc3.contact";
						bbgMnemonic = "BIO";
						populateSelect(intentValueElement, [
							{
								value: "William Henry Gates",
								label: "William Henry Gates"
							},
							{
								value: "Larry Ellison",
								label: "Larry Ellison"
							},
							{
								value: "Robert Iger",
								label: "Robert Iger"
							}
						]);
						break;
					case "ViewInstrument":
						logInformation(
							"Intent to be fired is ViewInstrument. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: DES"
						);
						selectedIntentType = "ViewInstrument";
						fdc3Denomination = "fdc3.instrument";
						bbgMnemonic = "DES";
						populateSelect(intentValueElement, [
							{
								value: "ORCL",
								label: "Oracle Corp"
							},
							{
								value: "MSFT",
								label: "Microsoft"
							},
							{
								value: "IBM",
								label: "IBM"
							}
						]);
						break;
					case "ViewQuote":
						logInformation(
							"Intent to be fired is ViewQuote. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: Q"
						);
						selectedIntentType = "ViewQuote";
						fdc3Denomination = "fdc3.instrument";
						bbgMnemonic = "Q";
						populateSelect(intentValueElement, [
							{
								value: "ORCL",
								label: "Oracle Corp"
							},
							{
								value: "MSFT",
								label: "Microsoft"
							},
							{
								value: "IBM",
								label: "IBM"
							}
						]);
						break;
				}
				updateState();
			}
		});
	}

	if (intentValueElement) {
		intentValueElement.addEventListener("change", () => {
			if (intentValueElement) {
				selectedIntentValue = intentValueElement.value;
				if (selectedIntentValue.length > 0) {
					logInformation(
						`action: ${selectedIntentType}, type: ${fdc3Denomination}, bbg mnemonic: ${bbgMnemonic}, search value: ${selectedIntentValue}`
					);
				}
				updateState();
			}
		});
	}

	updateState();
}

/**
 * Connect to Bloomberg Terminal.
 */
async function connectToBBGTerminal(): Promise<void> {
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
	} catch (error) {
		bbgConnection = undefined;
		console.log(error);
		logInformation(errorToString(error));
	}
}

/**
 * Disconnect from Bloomberg Terminal.
 */
async function disconnectFromBBGTerminal(): Promise<void> {
	if (bbgConnection) {
		try {
			logInformation("Disconnecting from Bloomberg Terminal");
			await bbgConnection.disconnect();
		} finally {
			bbgConnection = undefined;
			logInformation("Disconnected from Bloomberg Terminal");
		}
	}
}

/**
 * Fire an intent.
 */
async function fireIntentForBBG(): Promise<void> {
	if (bbgConnection) {
		try {
			logInformation(
				`action: ${selectedIntentType}, type: ${fdc3Denomination}, bbg mnemonic: ${bbgMnemonic}, search value: ${selectedIntentValue}`
			);

			let intent: OpenFin.Intent;

			switch (selectedIntentType) {
				case "ViewContact":
					intent = {
						name: selectedIntentType,
						context: {
							type: fdc3Denomination,
							name: selectedIntentValue,
							id: {}
						}
					};
					break;
				default:
					intent = {
						name: selectedIntentType,
						context: {
							type: fdc3Denomination,
							id: {
								ticker: selectedIntentValue
							}
						}
					};
					break;
			}

			await fin.me.interop.fireIntent(intent);
		} catch (error) {
			logInformation(`Error while trying to raise intent: ${errorToString(error)}`);
		}
	} else {
		logInformation("Not connected to the Bloomberg Terminal. Please check your status or log in again.");
	}
}

/**
 * Update the state of the DOM.
 */
function updateState(): void {
	const isConnected = bbgConnection !== undefined;
	if (btnConnect) {
		btnConnect.disabled = isConnected;
	}
	if (btnDisconnect) {
		btnDisconnect.disabled = !isConnected;
	}
	if (intentTypeElement) {
		intentTypeElement.disabled = !isConnected;
	}
	if (intentValueElement) {
		intentValueElement.disabled = !isConnected || selectedIntentType.length === 0;
	}
	if (btnQuery) {
		btnQuery.disabled = !isConnected || selectedIntentValue.length === 0;
	}
}

/**
 * Log information to the output element.
 * @param info The information to log.
 */
function logInformation(info: string): void {
	if (logOutput) {
		logOutput.textContent = `${logOutput.textContent}${info}\n\n`;
		logOutput.scrollTop = logOutput.scrollHeight;
	}
}

/**
 * Convert and error to a string.
 * @param err The error to convert.
 * @returns The error as a string.
 */
function errorToString(err: unknown): string {
	if (err instanceof Error) {
		return err.message;
	} else if (typeof err === "string") {
		return err;
	}

	return JSON.stringify(err);
}

/**
 * Clear the logs.
 */
function clearLogs(): void {
	if (logOutput) {
		logOutput.textContent = "";
		logOutput.scrollTop = 0;
	}
}

/**
 * Populate a select control with a list of items.
 * @param select The select element to populate.
 * @param values The values to populate the element with.
 */
function populateSelect(select: HTMLSelectElement | null, values: { value: string; label: string }[]): void {
	if (select) {
		select.innerHTML = "";
		const opt = document.createElement("option");
		opt.value = "";
		opt.text = "Please select value";
		opt.disabled = true;
		opt.selected = true;
		select.append(opt);

		for (const val of values) {
			const optVal = document.createElement("option");
			optVal.value = val.value;
			optVal.text = val.label;
			select.append(optVal);
		}
	}
}
