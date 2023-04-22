import {
	connect,
	SalesforceRestApiSObjectContact,
	type SalesforceConnection,
	type SalesforceRestApiSearchResult
} from "@openfin/salesforce";
import { getCurrentSync, init as workspacePlatformInit } from "@openfin/workspace-platform";
import { CONSUMER_KEY, ORG_URL } from "./settings";

let salesforceConnection: SalesforceConnection;
let contacts: SalesforceRestApiSObjectContact[] = [];

let errorStatus: HTMLDivElement;
let btnConnect: HTMLButtonElement;
let btnDisconnect: HTMLButtonElement;
let connectionStatus: HTMLParagraphElement;
let btnQuery: HTMLButtonElement;
let txtQuery: HTMLInputElement;
let tableResults: HTMLTableElement;
let bodyResults: HTMLTableSectionElement;
let username: HTMLDivElement;

async function init() {
	await workspacePlatformInit({
		browser: {}
	});
	errorStatus = document.querySelector<HTMLDivElement>("#errorStatus");
	btnConnect = document.querySelector<HTMLButtonElement>("#btnConnect");
	btnDisconnect = document.querySelector<HTMLButtonElement>("#btnDisconnect");
	connectionStatus = document.querySelector<HTMLParagraphElement>("#connectionStatus");
	btnQuery = document.querySelector<HTMLButtonElement>("#btnQuery");
	txtQuery = document.querySelector<HTMLInputElement>("#txtQuery");
	tableResults = document.querySelector<HTMLTableElement>("#tableResults");
	bodyResults = document.querySelector<HTMLTableSectionElement>("#bodyResults");
	username = document.querySelector<HTMLDivElement>("#username");

	updateConnectionStatus();
	if (CONSUMER_KEY === "" || ORG_URL === "") {
		errorStatus.textContent =
			"You must complete the CONSUMER_KEY and ORG_URL in settings.ts before the example will function";
		btnConnect.disabled = true;
		return;
	}

	btnConnect.addEventListener("click", async () => {
		salesforceConnection = undefined;
		updateConnectionStatus();

		try {
			contacts = [];
			btnConnect.disabled = true;
			connectionStatus.textContent = "Salesforce is connecting";
			salesforceConnection = await connect(ORG_URL, CONSUMER_KEY);

			username.textContent = salesforceConnection.currentUser.Username;
		} catch (err) {
			errorStatus.textContent = `Error connecting to Salesforce\n${
				err instanceof Error ? err.message : JSON.stringify(err)
			}`;
		}
		updateConnectionStatus();
	});

	btnDisconnect.addEventListener("click", async () => {
		try {
			contacts = [];
			if (salesforceConnection) {
				await salesforceConnection.disconnect();
			}
		} catch {
		} finally {
			username.textContent = "Not connected";
		}
		salesforceConnection = undefined;
		updateConnectionStatus();
	});

	btnQuery.addEventListener("click", async () => {
		try {
			btnQuery.disabled = true;
			txtQuery.disabled = true;

			contacts = [];
			updateTable();

			const query = txtQuery.value;

			const sfQuery = `FIND {${query}} IN ALL FIELDS RETURNING Contact(Department, Email, Id, Name, Phone, Title) LIMIT 10`;

			const response = await salesforceConnection.executeApiRequest<
				SalesforceRestApiSearchResult<SalesforceRestApiSObjectContact>
			>(`/services/data/vXX.X/search?q=${encodeURIComponent(sfQuery)}`);

			if (response.data?.searchRecords?.length) {
				contacts = response.data.searchRecords;
				updateTable();
			}
		} catch (err) {
			errorStatus.textContent = `Error querying Salesforce\n${
				err instanceof Error ? err.message : JSON.stringify(err)
			}`;
		} finally {
			btnQuery.disabled = false;
			txtQuery.disabled = false;
		}
	});
}

function updateConnectionStatus() {
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
	updateTable();
}

function updateTable() {
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

async function openContact(contact: SalesforceRestApiSObjectContact) {
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

window.addEventListener("DOMContentLoaded", async () => {
	await init();
});
