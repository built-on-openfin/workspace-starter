import {
	connect,
	enableLogging,
	type SalesforceConnection,
	type SalesforceRestApiSObjectContact,
	type SalesforceRestApiSearchResult
} from "@openfin/salesforce";
import { getCurrentSync, init } from "@openfin/workspace-platform";

// The CONSUMER_KEY and ORG_URL need to be populated with values that can be
// used to access your Salesforce deployment
const CONSUMER_KEY: string = "";
const ORG_URL: string = "";

const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

// Connection and current list of contacts
let salesforceConnection: SalesforceConnection | undefined;
let contacts: SalesforceRestApiSObjectContact[] = [];

// The DOM elements
let errorStatus: HTMLDivElement | null;
let btnConnect: HTMLButtonElement | null;
let btnDisconnect: HTMLButtonElement | null;
let connectionStatus: HTMLParagraphElement | null;
let btnQuery: HTMLButtonElement | null;
let txtQuery: HTMLInputElement | null;
let tableResults: HTMLTableElement | null;
let bodyResults: HTMLTableSectionElement | null;
let username: HTMLDivElement | null;

// Wait for the DOM to finish loading
window.addEventListener("DOMContentLoaded", async () => {
	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform();

	// Platform has loaded so initialize the DOM
	await initializeDOM();
});

/**
 * Initialize the workspace platform.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initialising workspace platform");
	await init({
		browser: {
			defaultWindowOptions: {
				icon: PLATFORM_ICON,
				workspacePlatform: {
					pages: [],
					favicon: PLATFORM_ICON
				}
			}
		},
		theme: [
			{
				label: "Default",
				default: "dark",
				palette: {
					brandPrimary: "#0A76D3",
					brandSecondary: "#383A40",
					backgroundPrimary: "#1E1F23"
				}
			}
		]
	});
}

/**
 * Initialize the DOM elements.
 */
async function initializeDOM(): Promise<void> {
	errorStatus = document.querySelector<HTMLDivElement>("#errorStatus");
	btnConnect = document.querySelector<HTMLButtonElement>("#btnConnect");
	btnDisconnect = document.querySelector<HTMLButtonElement>("#btnDisconnect");
	connectionStatus = document.querySelector<HTMLParagraphElement>("#connectionStatus");
	btnQuery = document.querySelector<HTMLButtonElement>("#btnQuery");
	txtQuery = document.querySelector<HTMLInputElement>("#txtQuery");
	tableResults = document.querySelector<HTMLTableElement>("#tableResults");
	bodyResults = document.querySelector<HTMLTableSectionElement>("#bodyResults");
	username = document.querySelector<HTMLDivElement>("#username");

	if (
		errorStatus &&
		btnConnect &&
		btnDisconnect &&
		connectionStatus &&
		btnQuery &&
		txtQuery &&
		tableResults &&
		bodyResults &&
		username
	) {
		updateConnectionStatus();
		if (CONSUMER_KEY === "" || ORG_URL === "") {
			errorStatus.textContent =
				"You must complete the CONSUMER_KEY and ORG_URL in settings.ts before the example will function";
			btnConnect.disabled = true;
			return;
		}

		btnConnect.addEventListener("click", async () => {
			if (btnConnect && connectionStatus && username && errorStatus) {
				salesforceConnection = undefined;
				updateConnectionStatus();

				try {
					errorStatus.textContent = "";
					contacts = [];
					btnConnect.disabled = true;
					connectionStatus.textContent = "Salesforce is connecting";
					enableLogging();
					salesforceConnection = await connect(ORG_URL, CONSUMER_KEY);

					username.textContent = salesforceConnection.currentUser.Username;
				} catch (err) {
					errorStatus.textContent = `Error connecting to Salesforce\n${formatError(err)}`;
				}
				updateConnectionStatus();
			}
		});

		btnDisconnect.addEventListener("click", async () => {
			try {
				contacts = [];
				if (salesforceConnection) {
					await salesforceConnection.disconnect();
				}
			} catch {
			} finally {
				if (username) {
					username.textContent = "Not connected";
				}
			}
			salesforceConnection = undefined;
			updateConnectionStatus();
		});

		btnQuery.addEventListener("click", async () => {
			if (btnQuery && txtQuery && errorStatus && salesforceConnection) {
				try {
					btnQuery.disabled = true;
					txtQuery.disabled = true;
					errorStatus.textContent = "";

					contacts = [];
					updateContactsTable();

					const query = txtQuery.value;

					const sfQuery = `FIND {${query}} IN ALL FIELDS RETURNING Contact(Department, Email, Id, Name, Phone, Title) LIMIT 10`;

					const response = await salesforceConnection.executeApiRequest<
						SalesforceRestApiSearchResult<SalesforceRestApiSObjectContact>
					>(`/services/data/vXX.X/search?q=${encodeURIComponent(sfQuery)}`);

					if (response.data?.searchRecords?.length) {
						contacts = response.data.searchRecords;
						updateContactsTable();
					}
				} catch (err) {
					errorStatus.textContent = `Error querying Salesforce\n${formatError(err)}`;
				} finally {
					btnQuery.disabled = false;
					txtQuery.disabled = false;
				}
			}
		});
	}
}

/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
function formatError(err: unknown): string {
	if (err instanceof Error) {
		return err.message;
	} else if (typeof err === "string") {
		return err;
	}
	return JSON.stringify(err);
}

/**
 * Update the DOM elements with the state of the connection.
 */
function updateConnectionStatus(): void {
	if (errorStatus && btnConnect && btnDisconnect && connectionStatus && btnQuery && txtQuery) {
		if (salesforceConnection) {
			connectionStatus.textContent = "Salesforce is connected";
			btnConnect.disabled = true;
			btnDisconnect.disabled = false;
			btnQuery.disabled = false;
			txtQuery.disabled = false;
		} else {
			connectionStatus.textContent = "Salesforce is disconnected";
			btnConnect.disabled = false;
			btnDisconnect.disabled = true;
			btnQuery.disabled = true;
			txtQuery.disabled = true;
		}
		updateContactsTable();
	}
}
/**
 * Update the table with the list of users.
 */
function updateContactsTable(): void {
	if (tableResults && bodyResults) {
		tableResults.style.display = contacts.length > 0 ? "table" : "none";

		if (contacts.length === 0) {
			bodyResults.innerHTML = "";
		} else {
			for (const contact of contacts) {
				const nameCell = document.createElement("td");
				nameCell.textContent = contact.Name;

				const emailCell = document.createElement("td");
				emailCell.textContent = contact.Email;

				const openButton = document.createElement("button");
				openButton.textContent = "Open";
				openButton.type = "button";
				openButton.classList.add("small");
				openButton.addEventListener("click", async () => {
					await openContact(contact);
				});

				const buttonCell = document.createElement("td");
				buttonCell.append(openButton);

				const row = document.createElement("tr");
				row.append(nameCell);
				row.append(emailCell);
				row.append(buttonCell);
				bodyResults.append(row);
			}
		}
	}
}

/**
 * Open a contact view.
 * @param contact The contact to view.
 */
async function openContact(contact: SalesforceRestApiSObjectContact): Promise<void> {
	const viewOptions = {
		url: `${ORG_URL}/${contact.Id}`,
		fdc3InteropApi: "1.2",
		interop: {
			currentContextGroup: "green"
		},
		customData: { buttonLabel: "Process Participant" },
		target: { name: "", url: "", uuid: "" }
	};

	const platform = getCurrentSync();
	await platform.createView(viewOptions);
}
