import {
	AuthTokenExpiredError,
	connect,
	enableLogging,
	type ServiceNowConnection,
	type ServiceNowEntities
} from "@openfin/servicenow";
import { getCurrentSync, init } from "@openfin/workspace-platform";

// The INSTANCE_URL and CLIENT_ID need to be populated with values that can be
// used to access your ServiceNow deployment
const INSTANCE_URL: string = "";
const CLIENT_ID: string = "";

const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

// Connection and current list of contacts
let serviceNowConnection: ServiceNowConnection | undefined;
let contacts: ServiceNowEntities.Core.Contact[] = [];

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
	console.log("Initializing workspace platform");
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
		if (INSTANCE_URL === "" || CLIENT_ID === "") {
			errorStatus.textContent =
				"You must complete the INSTANCE_URL and CLIENT_ID in provider.ts before the example will function";
			btnConnect.disabled = true;
			return;
		}

		btnConnect.addEventListener("click", async () => {
			if (btnConnect && connectionStatus && username && errorStatus) {
				serviceNowConnection = undefined;
				updateConnectionStatus();

				try {
					errorStatus.textContent = "";
					contacts = [];
					btnConnect.disabled = true;
					connectionStatus.textContent = "ServiceNow is connecting";
					enableLogging();
					serviceNowConnection = await connect(INSTANCE_URL, CLIENT_ID);

					username.textContent = (serviceNowConnection.currentUser.name as string) ?? "Unknown name";
				} catch (err) {
					errorStatus.textContent = `Error connecting to ServiceNow\n${formatError(err)}`;
				}
				updateConnectionStatus();
			}
		});

		btnDisconnect.addEventListener("click", async () => {
			try {
				contacts = [];
				if (txtQuery) {
					txtQuery.value = "";
				}
				if (serviceNowConnection) {
					await serviceNowConnection.disconnect();
				}
			} catch {
			} finally {
				if (username) {
					username.textContent = "Not connected";
				}
			}
			serviceNowConnection = undefined;
			updateConnectionStatus();
		});

		btnQuery.addEventListener("click", async () => {
			if (btnQuery && txtQuery && errorStatus && serviceNowConnection) {
				try {
					btnQuery.disabled = true;
					txtQuery.disabled = true;
					errorStatus.textContent = "";

					contacts = [];
					updateContactsTable();

					const query = `nameLIKE${encodeURIComponent(txtQuery.value)}`;

					const response = await serviceNowConnection.executeApiRequest<ServiceNowEntities.Core.Contact[]>(
						`/api/now/v2/table/customer_contact?sysparm_query=${query}`
					);

					if (response.data?.length) {
						contacts = response.data;
						updateContactsTable();
					}
				} catch (err) {
					if (err instanceof AuthTokenExpiredError) {
						await serviceNowConnection.disconnect();
						errorStatus.textContent = "Session expired, please reconnect and try the operation again";
					} else {
						errorStatus.textContent = `Error querying ServiceNow\n${formatError(err)}`;
					}
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
		if (serviceNowConnection) {
			connectionStatus.textContent = "ServiceNow is connected";
			btnConnect.disabled = true;
			btnDisconnect.disabled = false;
			btnQuery.disabled = false;
			txtQuery.disabled = false;
		} else {
			connectionStatus.textContent = "ServiceNow is disconnected";
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
				nameCell.textContent = contact.name as string;

				const emailCell = document.createElement("td");
				emailCell.textContent = contact.email as string;

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
async function openContact(contact: ServiceNowEntities.Core.Contact): Promise<void> {
	const viewOptions = {
		url: `${INSTANCE_URL}nav_to.do?uri=customer_contact.do?sys_id=${contact.sys_id}`,
		fdc3InteropApi: "2.0",
		interop: {
			currentContextGroup: "green"
		}
	};

	const platform = getCurrentSync();
	await platform.createView(viewOptions);
}
